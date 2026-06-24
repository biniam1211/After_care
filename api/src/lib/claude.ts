import Anthropic from '@anthropic-ai/sdk';
import { env } from './env.js';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Live client is only constructed when a key is present. */
const anthropic = env.anthropicApiKey ? new Anthropic({ apiKey: env.anthropicApiKey }) : null;

/** True when we have no Anthropic key (dev/test) — falls back to the fake responder. */
export const usingFakeClaude = !anthropic;

/**
 * Run a chat completion against Claude.
 *
 * The system prompt is large and reusable. To cut cost ~90% on repeated system
 * tokens, enable Anthropic prompt caching by passing the system prompt as a
 * structured block with `cache_control: { type: 'ephemeral' }` once you bump the
 * SDK to a version that types it (and add the prompt-caching beta header).
 *
 * With no API key (local dev / CI), this returns a deterministic stub in the
 * AfterCare 3-part format so the app and tests still work end-to-end.
 */
export async function runChat(opts: {
  system: string;
  messages: ChatTurn[];
  maxTokens?: number;
}): Promise<string> {
  if (!anthropic) {
    return fakeReply(opts.messages);
  }

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

/** Deterministic stand-in used when ANTHROPIC_API_KEY is unset. */
function fakeReply(messages: ChatTurn[]): string {
  const last = [...messages].reverse().find((m) => m.role === 'user')?.content ?? '';
  const topic = last.split('\n')[0].slice(0, 80);
  return [
    `[dev mode — no Anthropic key set]`,
    ``,
    `SHORT ANSWER: I hear you on "${topic}". Here's how I'd start.`,
    ``,
    `NEXT 3 STEPS:`,
    `1. Break it into the smallest next action you can do today.`,
    `2. Gather any IDs or info you'll need.`,
    `3. Check the resources below and reach out to one.`,
    ``,
    `RESOURCES: see the curated list provided for your area. If it's an emergency, hit the Panic button — 988 is always there.`,
  ].join('\n');
}
