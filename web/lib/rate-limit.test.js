import { describe, expect, it, beforeEach } from "vitest";
import { rateLimit, _resetRateLimitForTests } from "./rate-limit.js";

describe("rateLimit", () => {
  beforeEach(() => _resetRateLimitForTests());

  it("allows up to the limit then blocks", () => {
    const key = "test:a";
    expect(rateLimit(key, { limit: 2, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimit(key, { limit: 2, windowMs: 60_000 }).ok).toBe(true);
    const blocked = rateLimit(key, { limit: 2, windowMs: 60_000 });
    expect(blocked.ok).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
  });

  it("isolates keys", () => {
    expect(rateLimit("a", { limit: 1, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimit("b", { limit: 1, windowMs: 60_000 }).ok).toBe(true);
    expect(rateLimit("a", { limit: 1, windowMs: 60_000 }).ok).toBe(false);
  });
});
