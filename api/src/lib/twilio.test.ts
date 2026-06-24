import { describe, expect, it } from 'vitest';
import { sendSms, usingFakeSms } from './twilio.js';

describe('sendSms (no Twilio creds)', () => {
  it('runs in fake mode during tests', () => {
    expect(usingFakeSms).toBe(true);
  });

  it('degrades gracefully without throwing', async () => {
    const r = await sendSms('+15551234567', 'test');
    expect(r.sent).toBe(false);
    expect(r.reason).toBe('twilio_not_configured');
  });
});
