/**
 * Welcome email for the newsletter.
 *
 * Single source of truth: imported by both the Vercel function
 * (api/newsletter/subscribe.ts) and the dev route (server/routes/newsletter.ts),
 * which previously carried divergent copies of this markup.
 */

export const SITE_URL = "https://www.smithhealthwellness.com";

export const WELCOME_SUBJECT = "Welcome — I'm glad you're here";

const BRAND = {
  /** --accent in global.css. 9.4:1 on white, so it carries text and buttons. */
  navy: "#1d4388",
  /** --primary in global.css. 2.6:1 on white — decorative only, never text. */
  cyan: "#1babe0",
  panel: "#EFF7FB",
  body: "#3A3A3A",
  muted: "#6B6257",
  rule: "#E4E9EE",
};

const SANS = "Arial, Helvetica, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

/** Required health disclaimer. Keep verbatim. */
const DISCLOSURE =
  "This content is provided by an independent Trilivy health coach and is for general informational purposes only. It is not medical advice, and your coach is not a medical provider. The Trilivy 5&1 Reset is not appropriate for everyone — it is not intended for women who are pregnant or nursing, people under 18, sedentary adults 65+, people with gout, or those managing Type 1 diabetes. Consult your healthcare provider before starting this or any weight-loss program, especially if you take medications for diabetes, blood pressure, or thyroid conditions, or medications such as Coumadin (warfarin), lithium, or diuretics. Individual results vary. If you experience unusual symptoms or unusually rapid weight loss, stop and contact your healthcare provider.";

export function unsubscribeUrl(email: string): string {
  return `${SITE_URL}/unsubscribe?email=${encodeURIComponent(email)}`;
}

export function getWelcomeEmailHtml(email: string): string {
  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>Welcome to the WellSmith newsletter</title>
</head>
<body style="margin:0;padding:0;background-color:#F7F9FA;">
  <div lang="en" dir="ltr" style="margin:0;padding:0;">

    <!-- Preheader: shown in the inbox preview, hidden in the body. -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all;">
      Honest notes from coaching real people through real weeks. No lectures.
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#F7F9FA;">
      <tr>
        <td align="center" style="padding:24px 12px;">

          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="width:600px;max-width:600px;background-color:#FFFFFF;border-radius:12px;">

            <!-- Header. Light only: the logo is dark ink and vanishes on a dark
                 or saturated band. -->
            <tr>
              <td align="center" style="padding:32px 32px 8px 32px;">
                <a href="${SITE_URL}" style="text-decoration:none;">
                  <img src="${SITE_URL}/wellsmith-logo.png" width="160" height="160" alt="WellSmith" style="display:block;width:160px;height:160px;border:0;outline:none;">
                </a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:8px 32px 0 32px;">
                <h1 style="margin:0;font-family:${SERIF};font-size:30px;line-height:1.25;font-weight:normal;color:${BRAND.navy};">
                  I'm so glad you're here.
                </h1>
              </td>
            </tr>

            <!-- Accent rule -->
            <tr>
              <td align="center" style="padding:18px 32px 0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr><td style="width:56px;height:3px;background-color:${BRAND.cyan};border-radius:2px;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:24px 32px 0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:${BRAND.panel};border-radius:10px;">
                  <tr>
                    <td style="padding:26px 24px;font-family:${SANS};font-size:16px;line-height:1.65;color:${BRAND.body};">
                      <p style="margin:0 0 16px 0;">
                        I'm Kayce — and before I was anyone's coach, I was the person
                        starting over on a Monday for the hundredth time. So I know what
                        it takes to actually make something stick.
                      </p>
                      <p style="margin:0 0 16px 0;">
                        Every couple of weeks I'll send you something useful: a Lean
                        &amp; Green recipe worth repeating, a small habit that's easier
                        than it sounds, and honest notes from coaching real people
                        through real weeks. No lectures, no before-and-after theatrics.
                      </p>
                      <p style="margin:0;">
                        It won't always be easy — but it does get easier, and you don't
                        have to figure it out alone.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- CTA: navy, white text, rounded -->
            <tr>
              <td align="center" style="padding:26px 32px 0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" style="background-color:${BRAND.navy};border-radius:8px;">
                      <a href="${SITE_URL}/book-assessment" style="display:inline-block;padding:16px 34px;font-family:${SANS};font-size:19px;line-height:1.2;font-weight:bold;color:#FFFFFF;text-decoration:none;">
                        Book a free health assessment
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:14px 32px 0 32px;font-family:${SANS};font-size:14px;line-height:1.6;color:${BRAND.muted};">
                Thirty minutes, no pressure — just a conversation about where
                you are and what would actually help.
              </td>
            </tr>

            <!-- Signature -->
            <tr>
              <td style="padding:28px 32px 32px 32px;font-family:${SANS};font-size:16px;line-height:1.6;color:${BRAND.body};">
                <p style="margin:0;">Talk soon,</p>
                <p style="margin:4px 0 0 0;font-weight:bold;font-size:18px;color:${BRAND.navy};">Kayce Smith</p>
                <p style="margin:2px 0 0 0;font-size:14px;color:${BRAND.muted};">Independent Trilivy Certified Health Coach</p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:0 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                  <tr><td style="height:1px;background-color:${BRAND.rule};font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:24px 32px 0 32px;">
                <img src="${SITE_URL}/wellsmith-logo.png" width="56" height="56" alt="" style="display:block;width:56px;height:56px;border:0;outline:none;">
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:12px 32px 0 32px;font-family:${SANS};font-size:13px;line-height:1.6;color:${BRAND.muted};">
                <a href="${SITE_URL}" style="color:${BRAND.muted};text-decoration:underline;">smithhealthwellness.com</a>
                &nbsp;|&nbsp;
                <a href="${SITE_URL}/privacy" style="color:${BRAND.muted};text-decoration:underline;">Privacy Policy</a>
              </td>
            </tr>

            <tr>
              <td align="center" style="padding:10px 32px 0 32px;font-family:${SANS};font-size:13px;line-height:1.6;color:${BRAND.muted};">
                You're getting this because you subscribed at ${email}.<br>
                <a href="${unsubscribeUrl(email)}" style="color:${BRAND.muted};text-decoration:underline;">Unsubscribe from these emails</a>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 32px 32px 32px;font-family:${SANS};font-size:12px;line-height:1.6;color:${BRAND.muted};">
                ${DISCLOSURE}
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

export function getWelcomeEmailText(email: string): string {
  return `I'm so glad you're here.

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

${DISCLOSURE}

You're getting this because you subscribed at ${email}.

smithhealthwellness.com: ${SITE_URL}
Unsubscribe: ${unsubscribeUrl(email)}
Privacy Policy: ${SITE_URL}/privacy
`;
}
