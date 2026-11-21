import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const css = readFileSync(join(here, "../app/marketing.css"), "utf8");

/**
 * Lightweight a11y smoke checks without adding axe deps mid-PR.
 * Prefer semantic patterns already required in marketing CSS.
 */
describe("a11y smoke", () => {
  it("keeps reduced-motion overrides", () => {
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
  });

  it("defines visible focus styles for interactive elements", () => {
    expect(css).toMatch(/:focus-visible/);
    expect(css).toMatch(/outline:\s*3px solid/);
  });

  it("keeps touch-friendly search clear control sizing", () => {
    expect(css).toMatch(/min-height:\s*44px/);
  });
});
