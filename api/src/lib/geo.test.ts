import { describe, expect, it } from 'vitest';
import { zipToState } from './geo.js';

describe('zipToState', () => {
  it('maps California ZIPs to CA', () => {
    expect(zipToState('92805')).toBe('CA'); // Anaheim
    expect(zipToState('90001')).toBe('CA'); // LA
    expect(zipToState('94103')).toBe('CA'); // SF
  });

  it('maps other states correctly', () => {
    expect(zipToState('10001')).toBe('NY');
    expect(zipToState('73301')).toBe('TX');
    expect(zipToState('33101')).toBe('FL');
  });

  it('handles ZIP+4 and stray characters', () => {
    expect(zipToState('92805-1234')).toBe('CA');
    expect(zipToState(' 90001 ')).toBe('CA');
  });

  it('returns null for invalid input', () => {
    expect(zipToState('')).toBeNull();
    expect(zipToState(null)).toBeNull();
    expect(zipToState('1')).toBeNull();
  });
});
