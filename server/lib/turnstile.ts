const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export interface TurnstileResult {
  /** True when the request may proceed. */
  ok: boolean;
  /** Present only when ok is false. Safe to log, not to show a visitor. */
  reason?: string;
}

/**
 * Verifies a Cloudflare Turnstile token server-side.
 *
 * When TURNSTILE_SECRET_KEY is unset the check is skipped and the request is
 * allowed through, so the form keeps working before the key is configured.
 * That means protection is only live once the secret is set — the warning
 * below is the signal that it is not yet.
 */
export async function verifyTurnstile(
  token: unknown,
  remoteip?: string,
): Promise<TurnstileResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.warn(
      "TURNSTILE_SECRET_KEY is not set — skipping bot verification. " +
        "The form is unprotected until this is configured.",
    );
    return { ok: true };
  }

  if (typeof token !== "string" || !token) {
    return { ok: false, reason: "missing-token" };
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteip) body.set("remoteip", remoteip);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!res.ok) {
      return { ok: false, reason: `siteverify-http-${res.status}` };
    }

    const data = (await res.json()) as {
      success?: boolean;
      "error-codes"?: string[];
    };

    if (data.success) return { ok: true };
    return {
      ok: false,
      reason: (data["error-codes"] || ["unknown"]).join(","),
    };
  } catch (error) {
    // Cloudflare unreachable. Fail closed: a bot check that errors open is
    // not a bot check.
    console.error("Turnstile verification error:", error);
    return { ok: false, reason: "verification-unavailable" };
  }
}

/** Best-effort client IP from proxy headers, for Turnstile's remoteip field. */
export function clientIp(headers: Record<string, unknown>): string | undefined {
  const raw = headers["x-forwarded-for"];
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (typeof value !== "string") return undefined;
  return value.split(",")[0]?.trim() || undefined;
}
