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
        subject: "Welcome to WellSmith! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <!-- Logo Section -->
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="${SITE_URL}/wellsmith-logo.png" alt="WellSmith" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" />
            </div>
            
            <!-- Welcome Content -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #00C0C0; font-size: 32px; margin-bottom: 20px; font-weight: 300;">Welcome!</h1>
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 20px;">
                Thank you for subscribing to our newsletter. You'll receive health tips, recipes, and coaching insights delivered to your inbox.
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin-bottom: 30px;">
                We're excited to be part of your wellness journey!
              </p>
              
              <!-- Call to Action Button -->
              <div style="margin: 30px 0;">
                <a href="${SITE_URL}/book-assessment" 
                   style="display: inline-block; background-color: #00C0C0; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  Start Your Journey Today!
                </a>
              </div>
            </div>
            
            <!-- Signature -->
            <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
              <p style="font-size: 16px; color: #333; margin: 0;">
                Best regards,<br>
                <strong style="color: #00C0C0;">Kayce Smith</strong><br>
                <em style="color: #666;">Independent Trilivy Certified Health Coach</em>
              </p>
            </div>
            
            <!-- Footer -->
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            <div style="text-align: center;">
              <p style="font-size: 12px; color: #666; margin: 0;">
                You can unsubscribe at any time.
              </p>
              <p style="font-size: 12px; color: #666; margin: 10px 0 0 0;">
                <a href="${SITE_URL}" style="color: #00C0C0; text-decoration: none;">smithhealthwellness.com</a> |
                <a href="${SITE_URL}/unsubscribe" style="color: #666; text-decoration: underline;">Unsubscribe</a> |
                <a href="${SITE_URL}/privacy" style="color: #00C0C0; text-decoration: none;">Privacy Policy</a>
              </p>
            </div>
          </div>
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
