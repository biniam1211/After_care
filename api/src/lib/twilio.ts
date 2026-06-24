import twilio from 'twilio';
import { env } from './env.js';

const configured = !!(env.twilioAccountSid && env.twilioAuthToken && env.twilioFromNumber);
const client = configured ? twilio(env.twilioAccountSid, env.twilioAuthToken) : null;

export const usingFakeSms = !configured;

export interface SmsResult {
  sent: boolean;
  sid?: string;
  reason?: string;
}

/**
 * Send an SMS. With no Twilio creds (dev/CI), logs and returns sent:false so
 * callers degrade gracefully — the Panic flow never depends on SMS succeeding.
 */
export async function sendSms(to: string, body: string): Promise<SmsResult> {
  if (!client) {
    console.log(`[sms:fake] to=${to} body=${JSON.stringify(body)}`);
    return { sent: false, reason: 'twilio_not_configured' };
  }
  try {
    const msg = await client.messages.create({ to, from: env.twilioFromNumber, body });
    return { sent: true, sid: msg.sid };
  } catch (err) {
    console.error('[sms] send failed:', (err as Error).message);
    return { sent: false, reason: (err as Error).message };
  }
}
