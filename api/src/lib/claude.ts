import Anthropic from '@anthropic-ai/sdk';
import { env } from './env.js';

export const anthropic = new Anthropic({ apiKey: env.anthropicApiKey });

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Run a chat completion against Claude.
 *
 * The system prompt is large and reusable. To cut cost ~90% on repeated system
 * tokens, enable Anthropic prompt caching by passing the system prompt as a
 * structured block with `cache_control: { type: 'ephemeral' }` once you bump the
 * SDK to a version that types it (and add the prompt-caching beta header).
 */
export async function runChat(opts: {
  system: string;
  messages: ChatTurn[];
  maxTokens?: number;
}): Promise<string> {
  const response = await anthropic.messages.create({
    model: env.claudeModel,
    max_tokens: opts.maxTokens ?? 1024,
    system: opts.system,
    messages: opts.messages.map((m) => ({ role: m.role, content: m.content })),
  });

  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === 'text')
    .map((block) => block.text)
    .join('\n');
}
