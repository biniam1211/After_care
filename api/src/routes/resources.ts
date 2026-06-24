import { Router, type Response } from 'express';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';

export const resourcesRouter = Router();

/**
 * GET /resources?category=housing&state=CA&zip=92805
 * Lightweight, location-aware list for the Resource Finder screen.
 */
resourcesRouter.get('/resources', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);
  const { category, state, zip } = req.query as Record<string, string | undefined>;

  let q = db
    .from('resources')
    .select('id, name, category, description, phone, url, address, zip_codes, states')
    .order('name', { ascending: true })
    .limit(100);

  if (category) q = q.eq('category', category);
  if (state) q = q.contains('states', [state]);
  if (zip) q = q.contains('zip_codes', [zip]);

  const { data, error } = await q;
  if (error) return res.status(500).json({ error: 'Could not load resources' });

  res.json({ resources: data ?? [] });
});
