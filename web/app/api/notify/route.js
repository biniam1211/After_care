// ───────────────────────────────────────────────────────────
// AfterCare — caseworker notification endpoint (email via Resend)
//
// POST { message, subject? }
//  → { configured: true,  sent: true }              (email delivered via Resend)
//  → { configured: false, sent: false }             (no key / no session / no caseworker on file)
//  → { configured: true,  sent: false, error }       (Resend call failed)
//
// SECURITY: the recipient is NEVER taken from the request body. It must
// come from the signed-in user's server-stored profile.caseworkerEmail.
// The client still shows optimistic "sent" first (never block a youth in
// crisis); this fires the real send best-effort when configured.
// ───────────────────────────────────────────────────────────
import { logInfo, logError } from "@/lib/log";
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit";
import { safeNotifyMessage } from "@/lib/safe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const RESEND_TIMEOUT_MS = 10_000;

export async function POST(req) {
  const limited = rateLimit(`notify:${clientIp(req)}`, { limit: 10, windowMs: 60_000 });
  if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

  const key = process.env.RESEND_API_KEY;

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const message = safeNotifyMessage(body?.message);
  const subject = body?.subject ? String(body.subject).slice(0, 140) : "A message from AfterCare";
  if (!message) {
    return Response.json({ error: "message required" }, { status: 400 });
  }

  // Without Resend or a database there is nowhere safe to send.
  if (!key || !dbConfigured()) {
    return Response.json({ configured: false, sent: false });
  }

  let to = "";
  try {
    const user = await getSessionUser(req);
    if (!user) {
      // Guest / unsigned — refuse real send (closes the open relay).
      return Response.json({ configured: false, sent: false, reason: "auth_required" });
    }
    await ensureSchema();
    const { rows } = await q(
      `SELECT profile FROM app_state WHERE user_id = $1`,
      [user.id]
    );
    const profile = rows[0]?.profile || {};
    to = typeof profile.caseworkerEmail === "string" ? profile.caseworkerEmail.trim() : "";
  } catch (e) {
    logError("caseworker_lookup_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: false, sent: false });
  }

  if (!to || !EMAIL_RE.test(to)) {
    return Response.json({ configured: false, sent: false, reason: "no_caseworker" });
  }

  try {
    const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), RESEND_TIMEOUT_MS);
    let r;
    try {
      r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({
          from,
          to,
          subject,
          text: `${message}\n\n— Sent on behalf of a young person through AfterCare.`,
        }),
        signal: ac.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      logError("caseworker_email_failed", { detail: detail.slice(0, 200) });
      return Response.json(
        { configured: true, sent: false, error: "send_failed" },
        { status: 502 }
      );
    }
    const j = await r.json().catch(() => ({}));
    logInfo("caseworker_email_sent", {});
    return Response.json({ configured: true, sent: true, id: j.id });
  } catch (e) {
    logError("caseworker_email_upstream", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json(
      { configured: true, sent: false, error: "upstream" },
      { status: 502 }
    );
  }
}
