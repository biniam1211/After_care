// ───────────────────────────────────────────────────────────
// AfterCare — caseworker notification endpoint (email via Resend)
//
// POST { to, message, subject? }
//  → { configured: true,  sent: true }              (email delivered via Resend)
//  → { configured: false, sent: false }             (no RESEND_API_KEY or no recipient — client keeps its optimistic "sent" state)
//  → { configured: true,  sent: false, error }       (Resend call failed)
//
// The client always shows an optimistic "sent" first (never block a youth in a
// crisis), then this fires the real send best-effort when configured.
// Uses Resend's REST API directly — no extra dependency.
// ───────────────────────────────────────────────────────────
import { logInfo, logError } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req) {
  const key = process.env.RESEND_API_KEY;

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const to = typeof body?.to === "string" ? body.to.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const subject = body?.subject ? String(body.subject).slice(0, 140) : "A message from AfterCare";
  if (!message) {
    return Response.json({ error: "message required" }, { status: 400 });
  }

  // Not configured, or no valid recipient → the client already showed "sent" optimistically.
  if (!key || !to || !EMAIL_RE.test(to)) {
    return Response.json({ configured: false, sent: false });
  }

  try {
    const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        subject,
        text: `${message}\n\n— Sent on behalf of a young person through AfterCare.`,
      }),
    });
    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      logError("caseworker_email_failed", { detail: detail.slice(0, 300) });
      return Response.json(
        { configured: true, sent: false, error: "send_failed", detail: detail.slice(0, 300) },
        { status: 502 }
      );
    }
    const j = await r.json().catch(() => ({}));
    logInfo("caseworker_email_sent", {});
    return Response.json({ configured: true, sent: true, id: j.id });
  } catch (e) {
    logError("caseworker_email_upstream", { detail: String(e?.message || e) });
    return Response.json(
      { configured: true, sent: false, error: "upstream", detail: String(e?.message || e) },
      { status: 502 }
    );
  }
}
