import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';

export const devicesRouter = Router();

const bodySchema = z.object({
  token: z.string().min(1),
  platform: z.enum(['ios', 'android']).optional(),
});

/** POST /devices — register/refresh an Expo push token for the signed-in user. */
devicesRouter.post('/devices', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const db = supabaseForUser(req.accessToken!);
  const { error } = await db.from('device_tokens').upsert(
    {
      user_id: req.userId!,
      token: parsed.data.token,
      platform: parsed.data.platform ?? null,
      last_seen: new Date().toISOString(),
    },
    { onConflict: 'token' },
  );
  if (error) return res.status(500).json({ error: 'Could not register device' });
  res.json({ ok: true });
});
