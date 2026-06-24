import { Router, type Response } from 'express';
import { z } from 'zod';
import { requireAuth, type AuthedRequest } from '../lib/auth.js';
import { supabaseForUser } from '../lib/supabase.js';
import { runChat, type ChatTurn } from '../lib/claude.js';
import { retrieveResources } from '../lib/rag.js';
import { buildSystemPrompt, buildResourcesBlock } from '../prompts/system.js';

export const chatRouter = Router();

const bodySchema = z.object({
  message: z.string().min(1).max(4000),
  conversationId: z.string().uuid().optional(),
});

/**
 * POST /chat
 *
 * Flow:
 *   1. Load (or create) the conversation + prior messages.
 *   2. Retrieve curated, location-filtered resources for this message (RAG).
 *   3. Ask Claude with the AfterCare system prompt + <resources> block.
 *   4. Persist both turns, return the assistant reply + cited resources.
 */
chatRouter.post('/chat', requireAuth, async (req: AuthedRequest, res: Response) => {
  const parsed = bodySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  const { message } = parsed.data;
  const db = supabaseForUser(req.accessToken!);

  // Profile → user context for the prompt + location filter.
  const { data: profile } = await db
    .from('users')
    .select('zip_code, state, age, foster_status')
    .eq('id', req.userId!)
    .single();

  // Ensure a conversation exists.
  let conversationId = parsed.data.conversationId;
  if (!conversationId) {
    const { data: conv, error } = await db
      .from('conversations')
      .insert({ user_id: req.userId! })
      .select('id')
      .single();
    if (error) return res.status(500).json({ error: 'Could not start conversation' });
    conversationId = conv.id;
  }

  // Prior turns for context.
  const { data: history } = await db
    .from('messages')
    .select('role, content')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  // RAG retrieval.
  const resources = await retrieveResources({
    query: message,
    state: profile?.state,
    zip: profile?.zip_code,
  });

  const system = buildSystemPrompt({
    zip: profile?.zip_code,
    state: profile?.state,
    age: profile?.age,
    fosterStatus: profile?.foster_status,
  });

  const priorTurns: ChatTurn[] = (history ?? []).map((m) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  // Inject the resources block into the current user turn.
  const userTurn: ChatTurn = {
    role: 'user',
    content: `${message}\n\n${buildResourcesBlock(resources)}`,
  };

  let reply: string;
  try {
    reply = await runChat({ system, messages: [...priorTurns, userTurn] });
  } catch (err) {
    console.error('[chat] Claude error:', err);
    return res.status(502).json({ error: 'The navigator is unavailable right now. Try again in a sec.' });
  }

  const citedResources = resources.map((r) => ({ id: r.id, name: r.name, phone: r.phone, url: r.url }));

  // Persist both turns (store the raw user message, not the resource-augmented one).
  await db.from('messages').insert([
    { conversation_id: conversationId, role: 'user', content: message },
    { conversation_id: conversationId, role: 'assistant', content: reply, resources_cited: citedResources },
  ]);

  res.json({ conversationId, reply, resources: citedResources });
});
