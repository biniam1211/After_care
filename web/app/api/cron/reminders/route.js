// ───────────────────────────────────────────────────────────
// AfterCare — scheduled reminders (Vercel Cron or GitHub Actions).
//
// GET/POST /api/cron/reminders
//   Sends: (1) due panic check-ins scheduled via /api/checkin, and
//          (2) gentle nudges to users with a quest left in progress.
//
// Protected by CRON_SECRET via Authorization: Bearer only.
// In production (or whenever DATABASE_URL is set), a missing secret
// fails closed. Query-string ?secret= is rejected (leaks via logs/Referer).
// ───────────────────────────────────────────────────────────
import { dbConfigured, q, ensureSchema } from "@/lib/db";
import { QUESTS } from "@/components/data";
import { logInfo } from "@/lib/log";
import { isProduction } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RESEND_TIMEOUT_MS = 10_000;

async function sendEmail(to, subject, text) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const from = process.env.RESEND_FROM || "AfterCare <onboarding@resend.dev>";
  try {
    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), RESEND_TIMEOUT_MS);
    try {
      const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
        body: JSON.stringify({ from, to, subject, text }),
        signal: ac.signal,
      });
      return r.ok;
    } finally {
      clearTimeout(timer);
    }
  } catch {
    return false;
  }
}

/**
 * @param {Request} req
 * @returns {boolean}
 */
function authorized(req) {
  const secret = process.env.CRON_SECRET;
  // Fail closed when a database exists or we are in production — an open
  // cron with Resend configured could spam every signed-in youth.
  if (!secret) {
    if (isProduction() || dbConfigured()) return false;
    return true; // local demo with no DB and no secret
  }
  const auth = req.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

async function run(req) {
  if (!authorized(req)) return new Response("unauthorized", { status: 401 });
  if (!dbConfigured()) return Response.json({ configured: false, checkins: 0, nudges: 0 });
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
