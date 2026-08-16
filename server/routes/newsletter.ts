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
        subject: "Welcome to WellSmith - Your Health Journey Starts Here!",
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to WellSmith</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #1babe0; font-size: 28px; margin-bottom: 10px;">Welcome to WellSmith!</h1>
                <p style="font-size: 18px; color: #666;">Your health journey starts here</p>
              </div>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
                <h2 style="color: #1d4388; margin-top: 0;">Hi there!</h2>
                <p>Thank you for joining the WellSmith community! I'm Kayce Smith, your Independent Trilivy Certified Health Coach, and I'm thrilled to have you on this journey with us.</p>
                
                <p>As a subscriber, you'll receive:</p>
                <ul style="color: #555;">
                  <li>Weekly health tips and insights</li>
                  <li>Delicious Lean & Green recipes</li>
                  <li>Motivation and accountability support</li>
                  <li>GLP-1 lifestyle guidance</li>
                  <li>Exclusive coaching resources</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${SITE_URL}/my-story" style="background-color: #1babe0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">Read My Story</a>
              </div>
              
              <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
                <p style="font-size: 14px; color: #666; text-align: center;">
                  Ready to start your transformation?<br>
                  <a href="${SITE_URL}/book-assessment" style="color: #1babe0;">Book a consultation with me</a>
                </p>
              </div>
              
              <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="font-size: 12px; color: #999;">
                  WellSmith | Independent Trilivy Certified Health Coach<br>
                  <a href="${SITE_URL}" style="color: #1babe0;">smithhealthwellness.com</a> | 
                  <a href="https://instagram.com/smithkayce" style="color: #1babe0;">@smithkayce</a>
                </p>
                <p style="font-size: 12px; color: #999; margin-top: 10px;">
                  <a href="${SITE_URL}/unsubscribe" style="color: #999;">Unsubscribe</a> | 
                  <a href="${SITE_URL}/privacy" style="color: #999;">Privacy Policy</a>
                </p>
              </div>
            </body>
          </html>
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
