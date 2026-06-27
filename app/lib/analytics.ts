import { supabase } from './supabase';

/**
 * Privacy-first analytics via PostHog's HTTP capture API (no SDK, no native dep).
 * No-ops when EXPO_PUBLIC_POSTHOG_KEY is unset. We only ever send the event name
 * and non-PII properties — never message content, documents, or contact info.
 */
const KEY = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

export type AnalyticsEvent =
  | 'onboard_complete'
  | 'demo_login'
  | 'chat_sent'
  | 'quest_step_done'
  | 'panic_triggered'
  | 'doc_uploaded';

export async function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}): Promise<void> {
  if (!KEY) return;
  try {
    const { data } = await supabase.auth.getUser();
    const distinctId = data.user?.id ?? 'anon';
    await fetch(`${HOST}/capture/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ api_key: KEY, event, distinct_id: distinctId, properties }),
    });
  } catch {
    // analytics must never break the app
  }
}
