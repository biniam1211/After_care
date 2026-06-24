import { Router, type Request, type Response } from 'express';
import { env } from '../lib/env.js';
import { runPanicFollowups } from '../jobs/followups.js';
import { runQuestReminders } from '../jobs/reminders.js';

export const internalRouter = Router();

/**
 * POST /internal/cron — triggered by a scheduler (Railway cron / GitHub Action).
 * Protected by the CRON_SECRET bearer token. Runs background jobs.
 */
internalRouter.post('/internal/cron', async (req: Request, res: Response) => {
  const header = req.header('authorization') ?? '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!env.cronSecret || token !== env.cronSecret) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const [followups, reminders] = await Promise.all([runPanicFollowups(), runQuestReminders()]);
  res.json({ ok: true, followups, reminders });
});
