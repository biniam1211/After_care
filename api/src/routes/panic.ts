import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';
import { NATIONAL_CRISIS, SCENARIO_CATEGORIES, type PanicScenario } from '../lib/crisis.js';

export const panicRouter = Router();

const bodySchema = z.object({
  scenario: z.enum(['homeless', 'kicked_out', 'abuse', 'eviction', 'other']),
});

/**
 * POST /panic
 *
 * Critical: this must work even with ZERO account data. National crisis lines
 * always come back first; local resources (ZIP/state-filtered) are layered on
 * top when we have a profile. Every tap is logged to panic_events.
 */
panicRouter.post('/panic', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const scenario = parsed.data.scenario as PanicScenario;
  const db = supabaseForUser(req.accessToken!);

  const { data: profile } = await db
    .from('users')
    .select('state, zip_code')
    .eq('id', req.userId!)
    .maybeSingle();

  // Local resources for this scenario's categories (best-effort).
  let localResources: unknown[] = [];
  if (profile?.state) {
    const { data } = await db
      .from('resources')
      .select('id, name, category, description, phone, url, address')
      .in('category', SCENARIO_CATEGORIES[scenario])
      .contains('states', [profile.state])
      .limit(5);
    localResources = data ?? [];
  }

  // National fallbacks are ALWAYS present.
  const plan = {
    scenario,
    national: NATIONAL_CRISIS,
    local: localResources,
  };

  // Log the event (fire-and-forget; never block the crisis response on logging).
  db.from('panic_events')
    .insert({
      user_id: req.userId!,
      scenario,
      resources_shown: plan,
      resolved: false,
    })
    .then(({ error }) => {
      if (error) console.error('[panic] log failed:', error.message);
    });

  res.json(plan);
});
