// GET /api/auth/verify?token=... → redeem the magic link, set the session
// cookie, and redirect home. Invalid/expired links redirect with ?auth=invalid.
import { dbConfigured } from "@/lib/db";
import { redeemLoginToken, sessionCookie, siteOrigin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const origin = siteOrigin(req);
  if (!dbConfigured()) return Response.redirect(`${origin}/`, 302);

  const token = new URL(req.url).searchParams.get("token") || "";
  if (!token) return Response.redirect(`${origin}/?auth=invalid`, 302);

  try {
    const result = await redeemLoginToken(token);
    if (!result) return Response.redirect(`${origin}/?auth=invalid`, 302);
    return new Response(null, {
      status: 302,
      headers: { Location: `${origin}/?auth=ok`, "Set-Cookie": sessionCookie(result.token) },
    });
  } catch {
    return Response.redirect(`${origin}/?auth=error`, 302);
  }
}
