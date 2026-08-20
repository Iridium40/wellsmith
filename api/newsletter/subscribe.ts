import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// Email validation schema
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
  turnstileToken: z.string().optional(),
});

/*
 * Turnstile verification is duplicated here rather than imported from
 * server/lib/turnstile.ts on purpose.
 *
 * Vercel compiles each file under api/ into its own function but does not
 * bundle sources from outside that directory, so importing across the
 * boundary resolves to a path that does not exist in the deployed function
 * and the module fails to load — taking the whole endpoint down with
 * ERR_MODULE_NOT_FOUND before the handler ever runs. Keep this file
 * self-contained. server/lib/turnstile.ts remains the copy the Express
 * route uses; changes belong in both.
 */
const TURNSTILE_VERIFY_URL =
  'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function verifyTurnstile(
  token: unknown,
  remoteip?: string,
): Promise<{ ok: boolean; reason?: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      'TURNSTILE_SECRET_KEY is not set — skipping bot verification. ' +
        'The form is unprotected until this is configured.',
    );
    return { ok: true };
  }

  if (typeof token !== 'string' || !token) {
    return { ok: false, reason: 'missing-token' };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set('remoteip', remoteip);

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    if (!res.ok) return { ok: false, reason: `siteverify-http-${res.status}` };

    const data = (await res.json()) as {
      success?: boolean;
      'error-codes'?: string[];
    };
    if (data.success) return { ok: true };
    return { ok: false, reason: (data['error-codes'] || ['unknown']).join(',') };
  } catch (error) {
    // Cloudflare unreachable. Fail closed: a bot check that errors open is
    // not a bot check.
    console.error('Turnstile verification error:', error);
    return { ok: false, reason: 'verification-unavailable' };
  }
}

/** Best-effort client IP from proxy headers, for Turnstile's remoteip field. */
function clientIp(headers: Record<string, unknown>): string | undefined {
  const raw = headers['x-forwarded-for'];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== 'string') return undefined;
  return value.split(',')[0]?.trim() || undefined;
}

// Public site origin. Used for every link in outgoing email — these land in
// inboxes we cannot edit later, so they must point at the live domain.
const SITE_URL = 'https://www.smithhealthwellness.com';
const DEFAULT_FROM = 'Kayce Smith <kayce@smithhealthwellness.com>';

// Resend contact management - add to audience
async function addToResendAudience(email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  
  if (!resendKey) {
    throw new Error('Resend API key not configured');
  }

  try {
    const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        unsubscribed: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Contact added to Resend audience successfully:", data);
      return { success: true, contactId: data.id };
    } else {
      const errorData = await response.text();
      console.error("Resend audience error:", errorData);
      
      // If contact already exists in audience, that's still success
      if (response.status === 409) {
        console.log("Contact already exists in audience - that's fine");
        return { success: true, contactId: 'existing' };
      }
      
      throw new Error(`Resend audience failed: ${response.statusText} - ${errorData}`);
    }
  } catch (error) {
    console.error("Resend audience integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

// Resend integration
async function sendWelcomeEmail(email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  
  if (!resendKey) {
    throw new Error('Resend API key not configured');
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.NEWSLETTER_FROM_EMAIL || DEFAULT_FROM,
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
      const errorData = await response.text();
      throw new Error(`Resend failed: ${response.statusText} - ${errorData}`);
    }
  } catch (error) {
    console.error("Resend integration error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    console.log('Newsletter API handler called:', {
      method: req.method,
      body: req.body,
      headers: req.headers,
    });

    // Check environment variables
    const resendKey = process.env.RESEND_API_KEY;
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL;

    if (!resendKey || !audienceId) {
      console.error('Missing required environment variables:', {
        hasResendKey: !!resendKey,
        hasAudienceId: !!audienceId,
        hasFromEmail: !!fromEmail,
      });
      return res.status(500).json({
        success: false,
        error: 'Server configuration error',
        details: 'Missing required environment variables (RESEND_API_KEY and RESEND_AUDIENCE_ID)'
      });
    }

    // Validate request method
    if (req.method !== 'POST') {
      return res.status(405).json({
        success: false,
        error: 'Method not allowed',
        details: 'Only POST requests are supported'
      });
    }

    // Validate request body
    const validation = emailSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        success: false,
        error: 'Invalid request',
        details: validation.error.errors[0]?.message || 'Invalid email address'
      });
    }

    const { email, turnstileToken } = validation.data;

    // Bot check before anything that costs money or writes state.
    const turnstile = await verifyTurnstile(
      turnstileToken,
      clientIp(req.headers as Record<string, unknown>),
    );
    if (!turnstile.ok) {
      console.warn('Turnstile rejected a subscription:', turnstile.reason);
      return res.status(403).json({
        success: false,
        error: 'Could not verify that you are human. Please try again.',
      });
    }

    // Add to Resend audience
    const audienceResult = await addToResendAudience(email);
    console.log("Resend audience result:", audienceResult);
    
    // Send welcome email via Resend
    const emailResult = await sendWelcomeEmail(email);
    console.log("Resend email result:", emailResult);

    if (audienceResult.success && emailResult.success) {
      res.json({
        success: true,
        message: "Successfully subscribed to newsletter",
        audience: audienceResult,
        email: emailResult,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Newsletter subscription failed",
        details: {
          audience: audienceResult,
          email: emailResult,
        },
      });
    }

  } catch (error) {
    console.error('Newsletter API handler error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
