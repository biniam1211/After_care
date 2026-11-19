// Server-side persistence for a signed-in user's app state.
//  GET → { configured, authenticated, state? }
//  PUT { onboarded, profile, questProgress } → upsert, { ok }
// When there's no DB or no session, the client keeps using localStorage.
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { safeJsonObject } from "@/lib/safe";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!dbConfigured()) return Response.json({ configured: false, authenticated: false });
  try {
    const user = await getSessionUser(req);
    if (!user) return Response.json({ configured: true, authenticated: false });
    const { rows } = await q(
      `SELECT onboarded, profile, quest_progress FROM app_state WHERE user_id = $1`,
      [user.id]
    );
    const row = rows[0];
    const state = row
      ? { onboarded: row.onboarded, profile: row.profile || {}, questProgress: row.quest_progress || {} }
      : null;
    return Response.json({ configured: true, authenticated: true, email: user.email, state });
  } catch (e) {
    logError("state_get_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: true, authenticated: false, error: "upstream" }, { status: 502 });
  }
}

export async function PUT(req) {
  if (!dbConfigured()) return Response.json({ configured: false });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  try {
    const user = await getSessionUser(req);
    if (!user) return Response.json({ configured: true, authenticated: false }, { status: 401 });
    await ensureSchema();
    const onboarded = !!body?.onboarded;
    const profile = safeJsonObject(body?.profile);
    const questProgress = safeJsonObject(body?.questProgress);
    if (profile._truncated || questProgress._truncated) {
      return Response.json({ error: "payload_too_large" }, { status: 413 });
    }
    await q(
      `INSERT INTO app_state (user_id, onboarded, profile, quest_progress, updated_at)
         VALUES ($1, $2, $3::jsonb, $4::jsonb, now())
       ON CONFLICT (user_id) DO UPDATE
         SET onboarded = EXCLUDED.onboarded,
             profile = EXCLUDED.profile,
             quest_progress = EXCLUDED.quest_progress,
             updated_at = now()`,
      [user.id, onboarded, JSON.stringify(profile), JSON.stringify(questProgress)]
    );
    return Response.json({ ok: true });
  } catch (e) {
    logError("state_put_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: true, error: "upstream" }, { status: 502 });
  }
}
