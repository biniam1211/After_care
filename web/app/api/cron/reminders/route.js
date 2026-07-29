// ───────────────────────────────────────────────────────────
// AfterCare — scheduled reminders (Vercel Cron or GitHub Actions).
//
// GET/POST /api/cron/reminders
//   Sends: (1) due panic check-ins scheduled via /api/checkin, and
//          (2) gentle nudges to users with a quest left in progress.
//
// Protected by CRON_SECRET (Bearer header or ?secret=). Vercel Cron injects
// `Authorization: Bearer $CRON_SECRET` automatically when CRON_SECRET is set.
// No DB → { configured: false }. No RESEND key → it still marks work done but
// sends nothing. Everything is bounded so the endpoint can't run away.
// ───────────────────────────────────────────────────────────
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { QUESTS } from "@/components/data";
import { logInfo } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function sendEmail(to, subject, text) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to, subject, text }),
    });
    return r.ok;
  } catch {
    return false;
  }
}

function authorized(req) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // no secret configured → allow (dev / self-hosted)
  const auth = req.headers.get("authorization") || "";
  const qs = new URL(req.url).searchParams.get("secret");
  return auth === `Bearer ${secret}` || qs === secret;
}

async function run(req) {
  if (!dbConfigured()) return Response.json({ configured: false, checkins: 0, nudges: 0 });
  if (!authorized(req)) return new Response("unauthorized", { status: 401 });
  await ensureSchema();

  let checkins = 0;
  let nudges = 0;

  // 1) Due panic check-ins.
  const due = await q(
    `SELECT id, email, message FROM checkins
       WHERE sent_at IS NULL AND due_at <= now()
       ORDER BY due_at LIMIT 200`
  );
  for (const row of due.rows) {
    const ok = await sendEmail(row.email, "AfterCare — checking in on you", row.message);
    // Mark processed either way so a failing address can't loop forever.
    await q(`UPDATE checkins SET sent_at = now() WHERE id = $1`, [row.id]);
    if (ok) checkins++;
  }

  // 2) Quest nudges — onboarded users with a quest left partway, gone quiet.
  const stepCount = Object.fromEntries(
    QUESTS.filter((x) => x.steps).map((x) => [x.slug, x.steps.length])
  );
  const cand = await q(
    `SELECT u.email, s.user_id, s.profile, s.quest_progress
       FROM app_state s JOIN users u ON u.id = s.user_id
       WHERE s.onboarded = true
         AND s.updated_at < now() - interval '2 days'
         AND (s.last_nudge_at IS NULL OR s.last_nudge_at < now() - interval '3 days')
       LIMIT 200`
  );
  for (const row of cand.rows) {
    const qp = row.quest_progress || {};
    const entry = Object.entries(qp).find(
      ([slug, v]) => stepCount[slug] && v > 0 && v < stepCount[slug]
    );
    if (!entry) continue;
    const quest = QUESTS.find((x) => x.slug === entry[0]);
    const name = row.profile && row.profile.name ? String(row.profile.name).split(" ")[0] : "friend";
    const ok = await sendEmail(
      row.email,
      "Pick up where you left off",
      `Hey ${name}, you're partway through "${quest.title}" on AfterCare. Whenever you're ready, I'll walk you through the next step — no rush, one step at a time.`
    );
    await q(`UPDATE app_state SET last_nudge_at = now() WHERE user_id = $1`, [row.user_id]);
    if (ok) nudges++;
  }

  logInfo("cron_reminders", { checkins, nudges });
  return Response.json({ configured: true, checkins, nudges });
}

export async function GET(req) {
  return run(req);
}
export async function POST(req) {
  return run(req);
}
