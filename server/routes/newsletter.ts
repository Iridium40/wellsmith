import { RequestHandler } from "express";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  SITE_URL,
  WELCOME_SUBJECT,
  getWelcomeEmailHtml,
  getWelcomeEmailText,
} from "../emails/welcome";
import { z } from "zod";
import { resolveFrom } from "../lib/sender";
import { verifyTurnstile, clientIp } from "../lib/turnstile";

// Public site origin. Used for every link in outgoing email — these land in
// inboxes we cannot edit later, so they must point at the live domain.

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  turnstileToken: z.string().optional(),
});

/*
 * One-click unsubscribe (RFC 8058). A one-click POST carries only
 * "List-Unsubscribe=One-Click" in the body, so the address travels in the URL
 * and must be signed. Mirrors api/newsletter/{subscribe,unsubscribe}.ts —
 * the algorithm and secret must match across all of them.
 *
 * Without UNSUBSCRIBE_SECRET we cannot sign, so List-Unsubscribe-Post is
 * omitted and the header points at the page. Declaring one-click against a URL
 * that cannot honour it is worse than not declaring it: the provider reports
 * success while nothing is unsubscribed.
 */
function signEmail(email: string, secret: string): string {
  return createHmac("sha256", secret).update(email).digest("hex").slice(0, 32);
}

function unsubscribeHeaders(email: string): Record<string, string> {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  const mailto = `<mailto:kayce@smithhealthwellness.com?subject=Unsubscribe>`;

  if (!secret) {
    return { "List-Unsubscribe": `${mailto}, <${SITE_URL}/unsubscribe>` };
  }

  const url =
    `${SITE_URL}/api/newsletter/unsubscribe` +
    `?e=${encodeURIComponent(email)}&t=${signEmail(email, secret)}`;

  return {
    "List-Unsubscribe": `${mailto}, <${url}>`,
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  };
}

function verifiedOneClickEmail(query: unknown): string | null {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  if (!secret) return null;

  const q = (query || {}) as Record<string, unknown>;
  const email = typeof q.e === "string" ? q.e : null;
  const token = typeof q.t === "string" ? q.t : null;
  if (!email || !token) return null;

  const a = Buffer.from(token);
  const b = Buffer.from(signEmail(email, secret));
  if (a.length !== b.length || !timingSafeEqual(a, b)) {
    console.warn("One-click unsubscribe: signature mismatch");
    return null;
  }
  return email;
}


export const handleNewsletterSubscribe: RequestHandler = async (req, res) => {
  try {
    console.log("Newsletter subscription request received:", {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    // Validate request body
    const validation = subscribeSchema.safeParse(req.body);
    if (!validation.success) {
      console.log("Validation failed:", validation.error);
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const { email, turnstileToken } = validation.data;

    // Bot check before anything that costs money or writes state.
    const turnstile = await verifyTurnstile(
      turnstileToken,
      clientIp(req.headers as Record<string, unknown>),
    );
    if (!turnstile.ok) {
      console.warn("Turnstile rejected a subscription:", turnstile.reason);
      return res.status(403).json({
        success: false,
        message: "Could not verify that you are human. Please try again.",
      });
    }

    // Send welcome email via Resend
    const resendResult = await sendWelcomeEmail(email);
    console.log("Resend result:", resendResult);

    if (resendResult.success) {
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
      });
    } else {
      console.error("Newsletter subscription failed:", resendResult);
      res.status(502).json({
        success: false,
        message: "Could not send the welcome email. Please try again.",
      });
    }
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Marks a contact unsubscribed in the Resend audience.
 *
 * Resolves by email address rather than contact id, so no lookup is needed.
 * A 404 means the address was never subscribed — the same end state from the
 * caller's point of view, so it is reported as success.
 */
export const handleNewsletterUnsubscribe: RequestHandler = async (req, res) => {
  try {
    // Two callers: the mail provider's one-click POST (signed address in the
    // URL) and the on-site form (JSON body).
    const oneClick = verifiedOneClickEmail(req.query);

    let email: string;
    if (oneClick) {
      email = oneClick;
    } else {
      const validation = subscribeSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: "Please enter a valid email address",
        });
      }
      email = validation.data.email;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (!resendApiKey || !audienceId) {
      return res.status(502).json({
        success: false,
        error: "We could not process that just now. Please try again.",
      });
    }

    const response = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(email)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ unsubscribed: true }),
      },
    );

    if (!response.ok && response.status !== 404) {
      console.error(
        "Resend unsubscribe failed:",
        response.status,
        await response.text(),
      );
      return res.status(502).json({
        success: false,
        error: "We could not process that just now. Please try again.",
      });
    }

    // Deliberately uniform: never reveal whether an address was on the list.
    res.json({ success: true, message: "You have been unsubscribed." });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

async function sendWelcomeEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      throw new Error("Resend API key not configured");
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resolveFrom(),
        to: [email],
        headers: unsubscribeHeaders(email),
        subject: WELCOME_SUBJECT,
        html: getWelcomeEmailHtml(email),
        text: getWelcomeEmailText(email),
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      const errorData = await response.json();
      throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    console.error("Resend integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
