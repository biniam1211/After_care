import { describe, expect, it } from 'vitest';
import { buildSystemPrompt, buildResourcesBlock } from './system.js';

describe('buildSystemPrompt', () => {
  it('injects user context', () => {
    const p = buildSystemPrompt({ zip: '92805', state: 'CA', age: 17, fosterStatus: 'extended_care' });
    expect(p).toContain('ZIP: 92805');
    expect(p).toContain('State: CA');
    expect(p).toContain('Age: 17');
    expect(p).toContain('Status: extended_care');
  });

  it('falls back to "unknown" for missing context', () => {
    const p = buildSystemPrompt({});
    expect(p).toContain('ZIP: unknown');
    expect(p).toContain('Status: unknown');
  });

  it('always enforces the 3-part format and RAG-only rule', () => {
    const p = buildSystemPrompt({});
    expect(p).toMatch(/SHORT ANSWER/);
    expect(p).toMatch(/NEXT 3 STEPS/);
    expect(p).toMatch(/RESOURCES/);
    expect(p).toMatch(/NEVER invent/i);
  });
});

describe('buildResourcesBlock', () => {
  it('renders resources inside a <resources> block', () => {
    const block = buildResourcesBlock([
      { name: 'Orangewood', category: 'housing', phone: '714-619-0200', description: 'Drop-in center', url: null, address: null },
    ]);
    expect(block).toContain('<resources>');
    expect(block).toContain('Orangewood');
    expect(block).toContain('714-619-0200');
    expect(block).toContain('</resources>');
  });

  it('signals empty so the model uses national fallbacks only', () => {
    const block = buildResourcesBlock([]);
    expect(block).toContain('national fallbacks only');
  });
});
