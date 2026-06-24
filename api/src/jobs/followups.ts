import { supabaseAdmin } from '../lib/supabase.js';
import { sendSms } from '../lib/twilio.js';

/**
 * Opt-in 6-hour "You good?" follow-up for panic events.
 *
 * Finds unresolved panic events older than 6 hours that haven't had a follow-up,
 * texts the user (if they have a phone), and marks followup_sent_at. Idempotent:
 * safe to run on a schedule (Railway cron / Fly machines / GitHub Action).
 */
export async function runPanicFollowups(now = new Date()): Promise<{ processed: number; sent: number }> {
  const cutoff = new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString();

  const { data: events, error } = await supabaseAdmin
    .from('panic_events')
    .select('id, user_id')
    .is('followup_sent_at', null)
    .eq('resolved', false)
    .lt('created_at', cutoff)
    .limit(100);

  if (error) {
    console.error('[followups] query failed:', error.message);
    return { processed: 0, sent: 0 };
  }

  let sent = 0;
  for (const ev of events ?? []) {
    if (ev.user_id) {
      const { data: user } = await supabaseAdmin
        .from('users')
        .select('phone')
        .eq('id', ev.user_id)
        .maybeSingle();
      if (user?.phone) {
        const r = await sendSms(user.phone, 'Hey, it’s AfterCare checking in — you good? Reply anytime, or tap the app if you still need help. 💙');
        if (r.sent) sent++;
      }
    }
    await supabaseAdmin
      .from('panic_events')
      .update({ followup_sent_at: now.toISOString() })
      .eq('id', ev.id);
  }

  return { processed: events?.length ?? 0, sent };
}
