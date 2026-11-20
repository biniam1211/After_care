// ───────────────────────────────────────────────────────────
// AfterCare — register Expo push tokens for the native shell
//
// POST { token, platform?, kind? }
//  → { ok: true } when a signed-in user stores/updates a device
//  → { configured: false } when no DB
//  → { authenticated: false } when guest (token not stored server-side)
//
// Tokens are used by /api/cron/reminders to send Expo push alongside email.
// ───────────────────────────────────────────────────────────
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOKEN_RE = /^ExponentPushToken\[[A-Za-z0-9_-]+\]$/;

export async function POST(req) {
  const limited = rateLimit(`devices:${clientIp(req)}`, { limit: 20, windowMs: 60_000 });
  if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

  if (!dbConfigured()) return Response.json({ configured: false });

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!token || token.length > 200 || !TOKEN_RE.test(token)) {
    return Response.json({ error: "valid expo push token required" }, { status: 400 });
  }
  const platform = String(body?.platform || "").slice(0, 20);
  const kind = String(body?.kind || "expo").slice(0, 20);

  try {
    const user = await getSessionUser(req);
    if (!user) {
      return Response.json({ configured: true, authenticated: false });
    }
    await ensureSchema();
    await q(
      `INSERT INTO devices (user_id, token, platform, kind, updated_at)
         VALUES ($1, $2, $3, $4, now())
       ON CONFLICT (token) DO UPDATE
         SET user_id = EXCLUDED.user_id,
             platform = EXCLUDED.platform,
             kind = EXCLUDED.kind,
             updated_at = now()`,
      [user.id, token, platform, kind]
    );
    return Response.json({ ok: true });
  } catch (e) {
    logError("device_register_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: true, error: "upstream" }, { status: 502 });
  }
}

export async function DELETE(req) {
  if (!dbConfigured()) return Response.json({ configured: false });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  const token = typeof body?.token === "string" ? body.token.trim() : "";
  if (!token) return Response.json({ error: "token required" }, { status: 400 });
  try {
    const user = await getSessionUser(req);
    if (!user) return Response.json({ configured: true, authenticated: false }, { status: 401 });
    await ensureSchema();
    await q(`DELETE FROM devices WHERE user_id = $1 AND token = $2`, [user.id, token]);
    return Response.json({ ok: true });
  } catch (e) {
    logError("device_delete_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ error: "upstream" }, { status: 502 });
  }
}
