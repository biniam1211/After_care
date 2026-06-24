import { describe, expect, it } from 'vitest';
import { detectCrisis } from './crisisDetect.js';

describe('detectCrisis', () => {
  it('flags emergency phrasing', () => {
    expect(detectCrisis('my foster mom kicked me out and I have nowhere to sleep tonight')).toBe(true);
    expect(detectCrisis('I want to die')).toBe(true);
    expect(detectCrisis('he hits me')).toBe(true);
    expect(detectCrisis("I'm about to be evicted")).toBe(true);
  });

  it('does not flag ordinary questions', () => {
    expect(detectCrisis('how do I open a bank account?')).toBe(false);
    expect(detectCrisis('what is the Chafee grant?')).toBe(false);
  });
});
