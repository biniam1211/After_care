import { Router, type Response } from 'express';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';

export const conversationsRouter = Router();

/**
 * GET /conversations/latest
 * Returns the user's most recent conversation and its messages so the Chat
 * screen can restore history across app launches. Returns null when there's none.
 */
conversationsRouter.get('/conversations/latest', requireAuth, async (req: AuthedRequest, res: Response) => {
  const db = supabaseForUser(req.accessToken!);

  const { data: conv } = await db
    .from('conversations')
    .select('id, created_at')
    .eq('user_id', req.userId!)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!conv) return res.json({ conversation: null, messages: [] });

  const { data: messages } = await db
    .from('messages')
    .select('id, role, content, resources_cited, created_at')
    .eq('conversation_id', conv.id)
    .order('created_at', { ascending: true });

  res.json({ conversation: conv, messages: messages ?? [] });
});
