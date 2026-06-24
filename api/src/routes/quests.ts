import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';

export const questsRouter = Router();

/** GET /quests — list all available quests with the user's progress merged in. */
questsRouter.get('/quests', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);

  const [{ data: quests }, { data: progress }] = await Promise.all([
    db.from('quests').select('id, slug, title, description, steps'),
    db.from('user_quests').select('quest_id, current_step, completed_at, started_at').eq('user_id', req.userId!),
  ]);

  const progressByQuest = new Map((progress ?? []).map((p) => [p.quest_id, p]));
  const result = (quests ?? []).map((q) => ({
    ...q,
    progress: progressByQuest.get(q.id) ?? null,
  }));

  res.json({ quests: result });
});

/** GET /quests/:slug — single quest detail + progress. */
questsRouter.get('/quests/:slug', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);

  const { data: quest, error } = await db
    .from('quests')
    .select('id, slug, title, description, steps')
    .eq('slug', req.params.slug)
    .single();
  if (error || !quest) return res.status(404).json({ error: 'Quest not found' });

  const { data: progress } = await db
    .from('user_quests')
    .select('current_step, completed_at, started_at')
    .eq('user_id', req.userId!)
    .eq('quest_id', quest.id)
    .maybeSingle();

  res.json({ ...quest, progress: progress ?? null });
});

const advanceSchema = z.object({ currentStep: z.number().int().min(1) });

/**
 * POST /quests/:slug/progress — start or advance a quest.
 * Upserts the user_quests row; marks complete when the last step is reached.
 */
questsRouter.post('/quests/:slug/progress', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = advanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const db = supabaseForUser(req.accessToken!);

  const { data: quest, error } = await db
    .from('quests')
    .select('id, steps')
    .eq('slug', req.params.slug)
    .single();
  if (error || !quest) return res.status(404).json({ error: 'Quest not found' });

  const totalSteps = Array.isArray(quest.steps) ? quest.steps.length : 0;
  const completed = parsed.data.currentStep > totalSteps;

  const { data, error: upsertError } = await db
    .from('user_quests')
    .upsert(
      {
        user_id: req.userId!,
        quest_id: quest.id,
        current_step: Math.min(parsed.data.currentStep, totalSteps),
        completed_at: completed ? new Date().toISOString() : null,
      },
      { onConflict: 'user_id,quest_id' },
    )
    .select('current_step, completed_at, started_at')
    .single();

  if (upsertError) return res.status(500).json({ error: 'Could not update progress' });
  res.json({ progress: data, completed });
});
