import { describe, expect, it } from 'vitest';
import { NATIONAL_CRISIS, SCENARIO_CATEGORIES } from './crisis.js';

describe('national crisis fallbacks', () => {
  it('always includes 988', () => {
    expect(NATIONAL_CRISIS.some((r) => r.phone === '988')).toBe(true);
  });

  it('includes youth-homelessness and LGBTQ+ lines', () => {
    const names = NATIONAL_CRISIS.map((r) => r.name).join(' ');
    expect(names).toMatch(/Covenant House/);
    expect(names).toMatch(/Trevor Project/);
  });
});

describe('scenario → category mapping', () => {
  it('maps every panic scenario to at least one resource category', () => {
    for (const cats of Object.values(SCENARIO_CATEGORIES)) {
      expect(cats.length).toBeGreaterThan(0);
    }
  });

  it('routes housing emergencies to housing/shelter', () => {
    expect(SCENARIO_CATEGORIES.homeless).toContain('housing');
  });
});
