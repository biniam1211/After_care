import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';
import { zipToState } from '../lib/geo.js';

export const authRouter = Router();

/**
 * Phone-OTP itself is handled client-side via the Supabase SDK
 * (supabase.auth.signInWithOtp / verifyOtp). The backend only needs to manage
 * the AfterCare profile row once the user is authenticated.
 */

const profileSchema = z.object({
  zip_code: z.string().min(3).max(10).optional(),
  state: z.string().length(2).optional(),
  age: z.number().int().min(14).max(26).optional(),
  foster_status: z.enum(['in_care', 'aged_out', 'extended_care']).optional(),
  age_out_date: z.string().optional(),
  emergency_contact_name: z.string().max(120).optional(),
  emergency_contact_phone: z.string().max(20).optional(),
});

/** GET /me — the signed-in user's profile. */
authRouter.get('/me', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);
  const { data, error } = await db.from('users').select('*').eq('id', req.userId!).maybeSingle();
  if (error) return res.status(500).json({ error: 'Could not load profile' });
  res.json({ user: data });
});

/** POST /me — create/update profile during onboarding. */
authRouter.post('/me', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = profileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // Derive state from ZIP so RAG + panic can filter to in-state resources.
  const derivedState = parsed.data.zip_code ? zipToState(parsed.data.zip_code) : undefined;

  const db = supabaseForUser(req.accessToken!);
  const { data, error } = await db
    .from('users')
    .upsert(
      { id: req.userId!, ...parsed.data, ...(derivedState ? { state: derivedState } : {}) },
      { onConflict: 'id' },
    )
    .select('*')
    .single();

  if (error) return res.status(500).json({ error: 'Could not save profile' });
  res.json({ user: data });
});
