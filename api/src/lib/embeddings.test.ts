import { describe, expect, it } from 'vitest';
import { embed, usingFakeEmbeddings } from './embeddings.js';

describe('embeddings (stub mode, no key)', () => {
  it('runs in fake mode during tests', () => {
    expect(usingFakeEmbeddings).toBe(true);
  });

  it('returns a vector of the configured dimension', async () => {
    const v = await embed('I need housing in Anaheim');
    expect(v).toHaveLength(1536);
  });

  it('is deterministic for the same input', async () => {
    const a = await embed('open a bank account');
    const b = await embed('open a bank account');
    expect(a).toEqual(b);
  });

  it('differs for different input', async () => {
    const a = await embed('housing');
    const b = await embed('credit score');
    expect(a).not.toEqual(b);
  });
});
