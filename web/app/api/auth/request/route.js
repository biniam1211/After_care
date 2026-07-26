// POST { email } → email a one-time sign-in link (via Resend).
//  configured:false when there's no database — the app stays on localStorage.
//  devLink is returned ONLY outside production when email isn't configured, so
//  you can still complete sign-in while testing.
import { dbConfigured } from "@/lib/db";
import { validEmail, createLoginToken, siteOrigin } from "@/lib/auth";
import { logInfo } from "@/lib/log";

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
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!validEmail(email)) return Response.json({ error: "valid email required" }, { status: 400 });

  try {
    const token = await createLoginToken(email);
    const link = `${siteOrigin(req)}/api/auth/verify?token=${token}`;

    const resendKey = process.env.RESEND_API_KEY;
    let sent = false;
    if (resendKey) {
      const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from,
          to: email,
          subject: "Your AfterCare sign-in link",
          text: `Tap to sign in to AfterCare — this link works once and expires in 20 minutes:\n\n${link}\n\nIf you didn't request this, you can ignore it.`,
        }),
      });
      sent = r.ok;
    }

    logInfo("signin_requested", { sent });
    const out = { configured: true, sent };
    // Dev convenience only: no email provider + not production → hand back the link.
    if (!resendKey && process.env.NODE_ENV !== "production") out.devLink = link;
    return Response.json(out);
  } catch (e) {
    return Response.json({ configured: true, error: "upstream", detail: String(e?.message || e) }, { status: 502 });
  }
}
