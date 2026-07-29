// POST { kind, hours, message } → schedule a follow-up check-in for the signed-in
// user (e.g. the Panic Button's "I'll check in on you in 6 hours"). No-ops with
// no DB or no session, so the client can fire it best-effort.
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  if (!dbConfigured()) return Response.json({ configured: false });
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  try {
    const user = await getSessionUser(req);
    if (!user) return Response.json({ configured: true, authenticated: false });
    await ensureSchema();
    const kind = String(body?.kind || "checkin").slice(0, 40);
    const hours = Math.min(Math.max(Number(body?.hours) || 6, 1), 168);
    const message = String(
      body?.message || "Just checking in — are you okay? I'm here whenever you need me."
    ).slice(0, 500);
    await q(
      `INSERT INTO checkins (user_id, email, kind, message, due_at)
         VALUES ($1, $2, $3, $4, now() + ($5 || ' hours')::interval)`,
      [user.id, user.email, kind, message, String(hours)]
    );
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ configured: true, error: String(e?.message || e) }, { status: 502 });
  }
}
