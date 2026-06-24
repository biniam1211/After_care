import { describe, expect, it } from 'vitest';
import { runChat, usingFakeClaude } from './claude.js';

describe('runChat fake responder (no API key)', () => {
  it('is in fake mode during tests', () => {
    expect(usingFakeClaude).toBe(true);
  });

  it('returns a reply in the AfterCare 3-part format', async () => {
    const reply = await runChat({
      system: 'sys',
      messages: [{ role: 'user', content: 'How do I open a bank account?' }],
    });
    expect(reply).toMatch(/SHORT ANSWER/);
    expect(reply).toMatch(/NEXT 3 STEPS/);
    expect(reply).toMatch(/RESOURCES/);
  });
});
