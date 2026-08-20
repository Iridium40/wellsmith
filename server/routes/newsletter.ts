import { RequestHandler } from "express";
import { z } from "zod";
import { verifyTurnstile, clientIp } from "../lib/turnstile";

// Public site origin. Used for every link in outgoing email — these land in
// inboxes we cannot edit later, so they must point at the live domain.
const SITE_URL = "https://www.smithhealthwellness.com";

// Validation schema
const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
  turnstileToken: z.string().optional(),
});

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
    const validation = subscribeSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: "Please enter a valid email address",
      });
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
      `https://api.resend.com/audiences/${audienceId}/contacts/${encodeURIComponent(validation.data.email)}`,
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
        from:
          process.env.NEWSLETTER_FROM_EMAIL ||
          "Kayce Smith <kayce@smithhealthwellness.com>",
        to: [email],
        subject: "Welcome — I'm glad you're here",
        html: `
          <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header. Light only: both logo variants are dark ink and vanish
                 on a dark or saturated band. -->
            <div style="text-align: center; padding: 32px 24px 8px; background-color: #ffffff;">
              <img src="${SITE_URL}/wellsmith-logo.png" alt="Smith Health &amp; Wellness" style="max-width: 220px; height: auto; display: block; margin: 0 auto;" />
            </div>

            <!-- Body -->
            <div style="background-color: #F5F0E6; padding: 36px 32px; border-radius: 12px; margin: 16px 20px;">
              <h1 style="color: #5B8C5A; font-size: 30px; line-height: 1.25; margin: 0 0 20px; font-weight: normal;">
                I'm so glad you're here.
              </h1>

              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.65; color: #3a3a3a; margin: 0 0 16px;">
                I'm Kayce — and before I was anyone's coach, I was the person
                starting over on a Monday for the hundredth time. So I know what
                it takes to actually make something stick.
              </p>

              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.65; color: #3a3a3a; margin: 0 0 16px;">
                Every couple of weeks I'll send you something useful: a Lean
                &amp; Green recipe worth repeating, a small habit that's easier
                than it sounds, and honest notes from coaching real people
                through real weeks. No lectures, no before-and-after theatrics.
              </p>

              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.65; color: #3a3a3a; margin: 0 0 28px;">
                It won't always be easy — but it does get easier, and you don't
                have to figure it out alone.
              </p>

              <!-- CTA. 19px bold clears the WCAG large-text threshold, so sage
                   on white meets AA here. -->
              <div style="text-align: center; margin: 0 0 8px;">
                <a href="${SITE_URL}/book-assessment"
                   style="display: inline-block; background-color: #5B8C5A; color: #ffffff; padding: 16px 34px; text-decoration: none; border-radius: 8px; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 19px;">
                  Book a free health assessment
                </a>
              </div>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; line-height: 1.6; color: #6b6257; text-align: center; margin: 12px 0 0;">
                Thirty minutes, no pressure — just a conversation about where
                you are and what would actually help.
              </p>
            </div>

            <!-- Signature -->
            <div style="padding: 8px 32px 24px;">
              <div style="border-top: 2px solid #E8A87C; width: 48px; margin: 16px 0 20px;"></div>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #3a3a3a; margin: 0;">
                Talk soon,<br />
                <strong style="color: #5B8C5A; font-size: 18px;">Kayce Smith</strong><br />
                <span style="color: #6b6257; font-size: 14px;">Independent Trilivy Certified Health Coach</span>
              </p>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 32px 32px; border-top: 1px solid #e6ded0; text-align: center;">
              <!-- Required health disclaimer. Keep verbatim. -->
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color: #6b6257; margin: 0 0 16px; text-align: left;">
                This content is provided by an independent Trilivy health coach
                and is for general informational purposes only. It is not medical
                advice, and your coach is not a medical provider. The Trilivy
                5&amp;1 Reset is not appropriate for everyone &mdash; it is not
                intended for women who are pregnant or nursing, people under 18,
                sedentary adults 65+, people with gout, or those managing Type 1
                diabetes. Consult your healthcare provider before starting this
                or any weight-loss program, especially if you take medications
                for diabetes, blood pressure, or thyroid conditions, or
                medications such as Coumadin (warfarin), lithium, or diuretics.
                Individual results vary. If you experience unusual symptoms or
                unusually rapid weight loss, stop and contact your healthcare
                provider.
              </p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color: #6b6257; margin: 0 0 8px;">
                You're getting this because you subscribed at
                smithhealthwellness.com. You can unsubscribe at any time.
              </p>
              <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; line-height: 1.6; color: #6b6257; margin: 0;">
                <a href="${SITE_URL}" style="color: #247b69; text-decoration: none;">smithhealthwellness.com</a>
                &nbsp;|&nbsp;
                <a href="${SITE_URL}/unsubscribe" style="color: #247b69; text-decoration: underline;">Unsubscribe</a>
                &nbsp;|&nbsp;
                <a href="${SITE_URL}/privacy" style="color: #247b69; text-decoration: none;">Privacy Policy</a>
              </p>
            </div>
          </div>
        `,
        text: `I'm so glad you're here.

I'm Kayce — and before I was anyone's coach, I was the person starting over on a Monday for the hundredth time. So I know what it takes to actually make something stick.

Every couple of weeks I'll send you something useful: a Lean & Green recipe worth repeating, a small habit that's easier than it sounds, and honest notes from coaching real people through real weeks. No lectures, no before-and-after theatrics.

It won't always be easy — but it does get easier, and you don't have to figure it out alone.

Book a free health assessment:
${SITE_URL}/book-assessment

Thirty minutes, no pressure — just a conversation about where you are and what would actually help.

Talk soon,
Kayce Smith
Independent Trilivy Certified Health Coach

---

This content is provided by an independent Trilivy health coach and is for general informational purposes only. It is not medical advice, and your coach is not a medical provider. The Trilivy 5&1 Reset is not appropriate for everyone — it is not intended for women who are pregnant or nursing, people under 18, sedentary adults 65+, people with gout, or those managing Type 1 diabetes. Consult your healthcare provider before starting this or any weight-loss program, especially if you take medications for diabetes, blood pressure, or thyroid conditions, or medications such as Coumadin (warfarin), lithium, or diuretics. Individual results vary. If you experience unusual symptoms or unusually rapid weight loss, stop and contact your healthcare provider.

You're getting this because you subscribed at smithhealthwellness.com. You can unsubscribe at any time.

smithhealthwellness.com: ${SITE_URL}
Unsubscribe: ${SITE_URL}/unsubscribe
Privacy Policy: ${SITE_URL}/privacy
`,
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
