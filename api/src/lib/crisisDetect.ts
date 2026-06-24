/**
 * Lightweight, fast crisis intent detection for chat messages.
 *
 * This is a safety net, not a diagnosis. When it fires, the chat route prepends
 * the Panic recommendation + 988 to the reply and tags the message so the app
 * can surface an "Open Panic" button. Intentionally high-recall (better to nudge
 * toward help once too often than to miss a kid in crisis).
 */

const PATTERNS: RegExp[] = [
  /\b(kill|hurt|harm)(ing)?\s+myself\b/i,
  /\bsuicid(e|al)\b/i,
  /\bwant to die\b/i,
  /\bend (it|my life)\b/i,
  /\bnowhere to (sleep|go|stay)\b/i,
  /\bhomeless\b/i,
  /\bkicked out\b/i,
  /\bbeing (hurt|abused|hit|beaten)\b/i,
  /\b(he|she|they)\s+(hits|hurts|beats)\s+me\b/i,
  /\bevict(ed|ion)\b/i,
  /\bnot safe\b/i,
  /\brun(ning)? away\b/i,
];

export function detectCrisis(message: string): boolean {
  return PATTERNS.some((re) => re.test(message));
}

/** Prepended to the model reply when crisis intent is detected. */
export const CRISIS_PREFIX = [
  "It sounds like this might be an emergency. You're not alone and help is free, right now:",
  '• 988 — Suicide & Crisis Lifeline (call or text, 24/7)',
  '• Tap the red Panic button below for a plan with local help in seconds.',
  '',
].join('\n');
