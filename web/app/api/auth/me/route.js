// GET /api/auth/me → { configured, user? }
import { dbConfigured } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  if (!dbConfigured()) return Response.json({ configured: false });
  try {
    const user = await getSessionUser(req);
    return Response.json({ configured: true, user: user ? { email: user.email } : null });
  } catch (e) {
    return Response.json({ configured: true, user: null, error: String(e?.message || e) }, { status: 502 });
  }
}
