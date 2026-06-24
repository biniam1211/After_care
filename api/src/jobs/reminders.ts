import { supabaseAdmin } from '../lib/supabase.js';
import { sendPush } from '../lib/expoPush.js';
import { sendSms } from '../lib/twilio.js';

const STALL_HOURS = 48;

/**
 * Nudge users who started a quest but haven't advanced in STALL_HOURS.
 * Prefers a push notification; falls back to SMS when there's no device token.
 * Idempotent via user_quests.last_nudged_at. Runs on a schedule via /internal/cron.
 */
export async function runQuestReminders(now = new Date()): Promise<{ nudged: number }> {
  const cutoff = new Date(now.getTime() - STALL_HOURS * 60 * 60 * 1000).toISOString();

  // Stalled, incomplete quests not nudged since the cutoff.
  const { data: stalled, error } = await supabaseAdmin
    .from('user_quests')
    .select('id, user_id, quest_id, last_nudged_at, started_at, quests(title)')
    .is('completed_at', null)
    .lt('started_at', cutoff)
    .or(`last_nudged_at.is.null,last_nudged_at.lt.${cutoff}`)
    .limit(200);

  if (error) {
    console.error('[reminders] query failed:', error.message);
    return { nudged: 0 };
  }

  let nudged = 0;
  for (const uq of stalled ?? []) {
    const title = (uq as { quests?: { title?: string } }).quests?.title ?? 'your quest';
    const body = `Still here when you're ready to pick "${title}" back up. One small step today. 💪`;

    const { data: tokens } = await supabaseAdmin
      .from('device_tokens')
      .select('token')
      .eq('user_id', uq.user_id);

    let delivered = false;
    for (const t of tokens ?? []) {
      if (await sendPush(t.token, 'AfterCare', body)) { delivered = true; break; }
    }

    if (!delivered) {
      const { data: user } = await supabaseAdmin.from('users').select('phone').eq('id', uq.user_id).maybeSingle();
      if (user?.phone) delivered = (await sendSms(user.phone, `AfterCare: ${body}`)).sent;
    }

    await supabaseAdmin.from('user_quests').update({ last_nudged_at: now.toISOString() }).eq('id', uq.id);
    if (delivered) nudged++;
  }

  return { nudged };
}
