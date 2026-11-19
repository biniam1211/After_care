// GET /api/auth/verify?token=... → redeem the magic link, set the session
// cookie, and redirect home. Invalid/expired links redirect with ?auth=invalid.
import { dbConfigured } from "@/lib/db";
import { redeemLoginToken, sessionCookie, siteOrigin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req) {
  const origin = siteOrigin(req);
  // Land in the product app (/app) so the native WebView shell and PWA both
  // pick up the session cookie in the right place.
  const dest = (q) => `${origin}/app?auth=${q}`;
  if (!dbConfigured()) return Response.redirect(`${origin}/app`, 302);

  const token = new URL(req.url).searchParams.get("token") || "";
  if (!token) return Response.redirect(dest("invalid"), 302);

  try {
    const result = await redeemLoginToken(token);
    if (!result) return Response.redirect(dest("invalid"), 302);
    return new Response(null, {
      status: 302,
      headers: { Location: dest("ok"), "Set-Cookie": sessionCookie(result.token) },
    });
  } catch {
    return Response.redirect(dest("error"), 302);
  }
}
