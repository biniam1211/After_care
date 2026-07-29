import { Router, type Request, type Response } from 'express';
import { randomBytes } from 'node:crypto';
import { createClient } from '@supabase/supabase-js';
import { supabaseAdmin } from '../lib/supabase.js';
import { env } from '../lib/env.js';

/**
 * Demo/guest sessions for the hosted preview.
 *
 * Supabase's built-in anonymous sign-in is a dashboard toggle the project
 * doesn't have enabled, so we implement the same idea server-side: each call
 * creates a fresh throwaway account (random email + random password, confirmed
 * via the admin API), pre-seeds a California profile so quests/panic/resources
 * are populated, and returns the session tokens for the client to adopt with
 * supabase.auth.setSession(). No shared credentials ever reach the client.
 *
 * Guests are identifiable by the @demo.aftercare.test email domain, so they can
 * be purged in bulk. Remove this route before a public launch.
 */
export const demoRouter = Router();

// Naive in-memory rate limit: max sessions per IP per hour (resets on deploy).
const LIMIT_PER_HOUR = 10;
const hits = new Map<string, { n: number; reset: number }>();

demoRouter.post('/demo/session', async (req: Request, res: Response) => {
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || req.ip || 'unknown';
  const now = Date.now();
  const h = hits.get(ip);
  if (h && now < h.reset) {
    if (h.n >= LIMIT_PER_HOUR) {
      return res.status(429).json({ error: 'Too many demo sessions from this network. Try again in an hour.' });
    }
    h.n += 1;
  } else {
    hits.set(ip, { n: 1, reset: now + 60 * 60 * 1000 });
  }

  const email = `guest-${randomBytes(6).toString('hex')}@demo.aftercare.test`;
  const password = randomBytes(18).toString('base64url');

  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (createErr || !created.user) {
    console.error('[demo] createUser failed:', createErr?.message);
    return res.status(500).json({ error: 'Could not create a demo session right now.' });
  }

  // Pre-seed a CA profile so the guest lands in a populated app.
  const { error: profileErr } = await supabaseAdmin.from('users').upsert(
    { id: created.user.id, zip_code: '92805', state: 'CA', age: 19, foster_status: 'aged_out' },
    { onConflict: 'id' },
  );
  if (profileErr) console.error('[demo] profile seed failed:', profileErr.message);

  const pub = createClient(env.supabaseUrl, env.supabaseAnonKey, { auth: { persistSession: false } });
  const { data: signin, error: signinErr } = await pub.auth.signInWithPassword({ email, password });
  if (signinErr || !signin.session) {
    console.error('[demo] signIn failed:', signinErr?.message);
    return res.status(500).json({ error: 'Could not start the demo session.' });
  }

  res.json({
    access_token: signin.session.access_token,
    refresh_token: signin.session.refresh_token,
  });
});
