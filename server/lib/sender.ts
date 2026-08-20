/**
 * Resolves the `from` address for outgoing mail.
 *
 * Shared by the Vercel functions and the Express routes. Import it from api/
 * with the .js extension — this package is "type": "module", so Node resolves
 * relative specifiers literally and an extensionless one fails at runtime.
 */

/** The only domain verified for sending in Resend. */
export const SENDING_DOMAIN = "smithhealthwellness.com";

export const DEFAULT_FROM = `Kayce Smith <kayce@${SENDING_DOMAIN}>`;

const BARE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;
const NAMED = /^[^<>]+<([^\s@<>]+@[^\s@<>]+\.[^\s@<>]+)>$/;

/**
 * Two ways NEWSLETTER_FROM_EMAIL breaks a send, both seen in production:
 *
 *  - Malformed: Resend 422s the whole request unless the value is exactly
 *    "email@domain" or "Name <email@domain>". A trailing newline from a paste
 *    is enough.
 *  - Wrong domain: a well-formed address on an unverified domain 403s. The
 *    typo "smithheathwellness.com" (no "l") is well-formed and passes every
 *    format check, so format validation alone does not catch it.
 *
 * Either way the contact has already been added to the audience by the time
 * the send fails, leaving subscribers on the list with nothing in their inbox.
 * So fall back to the known-good default and warn, rather than fail.
 */
export function resolveFrom(): string {
  const raw = process.env.NEWSLETTER_FROM_EMAIL?.trim();
  if (!raw) return DEFAULT_FROM;

  const named = raw.match(NAMED);
  const address = named ? named[1] : BARE.test(raw) ? raw : null;

  if (!address) {
    console.warn(
      `NEWSLETTER_FROM_EMAIL is not a valid sender ("${raw}") — using ` +
        `${DEFAULT_FROM}. Expected "email@domain" or "Name <email@domain>".`,
    );
    return DEFAULT_FROM;
  }

  const domain = address.slice(address.lastIndexOf("@") + 1).toLowerCase();
  if (domain !== SENDING_DOMAIN) {
    console.warn(
      `NEWSLETTER_FROM_EMAIL uses "${domain}", which is not verified in ` +
        `Resend — using ${DEFAULT_FROM}. Check for a typo in the domain.`,
    );
    return DEFAULT_FROM;
  }

  return raw;
}
