import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const dir = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(dir).filter((f) => f.endsWith('.json'));

const REQUIRED_STEP_FIELDS = ['step', 'title', 'what', 'why', 'action', 'ai_check'] as const;

describe('quest seed files', () => {
  it('has at least the flagship + 3 added quests', () => {
    expect(files.length).toBeGreaterThanOrEqual(4);
  });

  for (const file of files) {
    describe(file, () => {
      const quest = JSON.parse(readFileSync(join(dir, file), 'utf8'));

      it('has slug, title, and a non-empty steps array', () => {
        expect(quest.slug).toMatch(/^[a-z0-9-]+$/);
        expect(typeof quest.title).toBe('string');
        expect(Array.isArray(quest.steps)).toBe(true);
        expect(quest.steps.length).toBeGreaterThan(0);
      });

      it('has sequential steps with all required fields', () => {
        quest.steps.forEach((step: Record<string, unknown>, i: number) => {
          for (const field of REQUIRED_STEP_FIELDS) {
            expect(step[field], `${file} step ${i + 1} missing ${field}`).toBeDefined();
          }
          expect(step.step, `${file} steps must be 1-indexed and ordered`).toBe(i + 1);
        });
      });
    });
  }
});
