// POST { email } → email a one-time sign-in link (via Resend).
//  configured:false when there's no database — the app stays on localStorage.
//  devLink is returned ONLY outside production when email isn't configured, so
//  you can still complete sign-in while testing.
import { dbConfigured } from "@/lib/db";
import { validEmail, createLoginToken, siteOrigin } from "@/lib/auth";
import { logInfo, logError } from "@/lib/log";
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_TIMEOUT_MS = 10_000;

export async function POST(req) {
  const ip = clientIp(req);
  const limited = rateLimit(`auth-request:${ip}`, { limit: 5, windowMs: 15 * 60_000 });
  if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

  if (!dbConfigured()) return Response.json({ configured: false });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!validEmail(email)) return Response.json({ error: "valid email required" }, { status: 400 });

  // Per-email throttle (anti-inbox flooding) — same opaque response either way.
  const emailLimited = rateLimit(`auth-email:${email}`, { limit: 3, windowMs: 15 * 60_000 });
  if (!emailLimited.ok) {
    // Do not reveal that the email exists; look like a normal "sent" attempt.
    return Response.json({ configured: true, sent: false });
  }

  try {
    const token = await createLoginToken(email);
    let link;
    try {
      link = `${siteOrigin(req)}/api/auth/verify?token=${token}`;
    } catch (e) {
      logError("signin_origin", { detail: String(e?.message || e).slice(0, 200) });
      return Response.json({ configured: true, error: "misconfigured" }, { status: 503 });
    }

    const resendKey = process.env.RESEND_API_KEY;
    let sent = false;
    if (resendKey) {
      const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
      const ac = new AbortController();
      const timer = setTimeout(() => ac.abort(), RESEND_TIMEOUT_MS);
      try {
        const r = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
          body: JSON.stringify({
            from,
            to: email,
            subject: "Your AfterCare sign-in link",
            text: `Tap to sign in to AfterCare — this link works once and expires in 20 minutes:\n\n${link}\n\nIf you didn't request this, you can ignore it.`,
          }),
          signal: ac.signal,
        });
        sent = r.ok;
      } finally {
        clearTimeout(timer);
      }
    }

    logInfo("signin_requested", { sent });
    const out = { configured: true, sent };
    // Dev convenience only: no email provider + not production → hand back the link.
    if (!resendKey && process.env.NODE_ENV !== "production") out.devLink = link;
    return Response.json(out);
  } catch (e) {
    logError("signin_request_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: true, error: "upstream" }, { status: 502 });
  }
}
