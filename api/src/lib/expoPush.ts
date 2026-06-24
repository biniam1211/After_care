/**
 * Send a push notification via Expo's push service.
 * No SDK needed — it's a single HTTPS POST. Returns false on any failure so
 * callers can fall back to SMS.
 */
export async function sendPush(token: string, title: string, body: string): Promise<boolean> {
  try {
    const res = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ to: token, title, body, sound: 'default' }),
    });
    if (!res.ok) {
      console.error('[push] send failed:', res.status);
      return false;
    }
    const json = (await res.json()) as { data?: { status?: string } };
    return json.data?.status === 'ok';
  } catch (err) {
    console.error('[push] error:', (err as Error).message);
    return false;
  }
}
