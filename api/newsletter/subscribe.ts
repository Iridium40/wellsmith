import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHmac } from 'node:crypto';
import { z } from 'zod';
import {
  SITE_URL,
  WELCOME_SUBJECT,
  getWelcomeEmailHtml,
  getWelcomeEmailText,
} from '../../server/emails/welcome';

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
const DEFAULT_FROM = 'Kayce Smith <kayce@smithhealthwellness.com>';

/*
 * Resend rejects the whole send with a 422 if `from` is not exactly
 * "email@domain" or "Name <email@domain>" — and a malformed
 * NEWSLETTER_FROM_EMAIL (missing angle brackets, a trailing newline from a
 * paste) then breaks every welcome email while the contact is still created,
 * leaving subscribers on the list with nothing in their inbox. Validate the
 * override and fall back to the known-good default rather than failing.
 */
function resolveFrom(): string {
  const raw = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!raw) return DEFAULT_FROM;

  const bare = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
  const named = /^[^<>]+<[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+>$/;
  if (bare.test(raw) || named.test(raw)) return raw;

  console.warn(
    `NEWSLETTER_FROM_EMAIL is not a valid sender ("${raw}") — ` +
      `falling back to ${DEFAULT_FROM}. Expected "email@domain" or "Name <email@domain>".`,
  );
  return DEFAULT_FROM;
}

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

/*
 * One-click unsubscribe (RFC 8058).
 *
 * A one-click POST carries only "List-Unsubscribe=One-Click" in the body — the
 * recipient is identified entirely by the URL. So the address is signed here
 * and verified in api/newsletter/unsubscribe.ts, which must use the same
 * algorithm and secret.
 *
 * Without UNSUBSCRIBE_SECRET we cannot sign, so List-Unsubscribe-Post is
 * omitted and the header points at the page instead. Declaring one-click
 * against a URL that cannot honour it is worse than not declaring it: the mail
 * provider reports success to the reader while nothing is unsubscribed.
 */
function unsubscribeHeaders(email: string): Record<string, string> {
  const secret = process.env.UNSUBSCRIBE_SECRET;
  const mailto = `<mailto:kayce@smithhealthwellness.com?subject=Unsubscribe>`;

  if (!secret) {
    return {
      'List-Unsubscribe': `${mailto}, <${SITE_URL}/unsubscribe>`,
    };
  }

  const token = createHmac('sha256', secret).update(email).digest('hex').slice(0, 32);
  const url =
    `${SITE_URL}/api/newsletter/unsubscribe` +
    `?e=${encodeURIComponent(email)}&t=${token}`;

  return {
    'List-Unsubscribe': `${mailto}, <${url}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
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
