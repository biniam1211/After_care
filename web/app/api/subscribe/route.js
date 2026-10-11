import { NextResponse } from "next/server";
import { q, dbConfigured } from "@/lib/db";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// Newsletter / "keep me posted" sign-ups. Stores the email when a database is
// configured; otherwise accepts it gracefully so the UX still works in preview.
export async function POST(req) {
  let email = "";
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  email = String(email || "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  if (!dbConfigured()) {
    // No DB yet — don't fail the user; just acknowledge.
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    await q(
      "create table if not exists subscribers (email text primary key, created_at timestamptz default now())"
    );
    await q("insert into subscribers (email) values ($1) on conflict do nothing", [email]);
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error("[subscribe] failed:", e?.message);
    return NextResponse.json({ error: "Could not save" }, { status: 500 });
  }
}
