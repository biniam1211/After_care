// ───────────────────────────────────────────────────────────
// AfterCare — simple in-memory rate limiter (server-only)
//
// Good enough for a single Node process / Vercel isolate. Not a
// substitute for edge/WAF limits at scale — see PRODUCTION-READINESS.md.
// ───────────────────────────────────────────────────────────

/**
 * @typedef {{ limit: number, windowMs: number }} RateLimitOptions
 * @typedef {{ ok: true, remaining: number } | { ok: false, remaining: 0, retryAfterSec: number }} RateLimitResult
 */

/** @type {Map<string, { count: number, resetAt: number }>} */
const buckets = new Map();

const MAX_KEYS = 5000;

/**
 * Consume one unit against `key` within a sliding fixed window.
 *
 * @param {string} key
 * @param {RateLimitOptions} opts
 * @returns {RateLimitResult}
 */
export function rateLimit(key, opts) {
  const limit = Math.max(1, opts.limit | 0);
  const windowMs = Math.max(1000, opts.windowMs | 0);
  const now = Date.now();
  let entry = buckets.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    if (buckets.size >= MAX_KEYS) prune(now);
    buckets.set(key, entry);
  }

  entry.count += 1;
  if (entry.count > limit) {
    return {
      ok: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { ok: true, remaining: Math.max(0, limit - entry.count) };
}

/**
 * Client IP for rate-limit keys. Prefer platform-forwarded headers;
 * never trust alone for auth — only for abuse throttling.
 *
 * @param {Request} req
 * @returns {string}
 */
export function clientIp(req) {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) {
    const first = xf.split(",")[0].trim();
    if (first) return first.slice(0, 80);
  }
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim().slice(0, 80);
  return "unknown";
}

/**
 * Standard 429 response for API routes.
 *
 * @param {number} retryAfterSec
 * @returns {Response}
 */
export function tooManyRequests(retryAfterSec) {
  return Response.json(
    { error: "rate_limited", retryAfterSec },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    }
  );
}

/** @param {number} now */
function prune(now) {
  for (const [k, v] of buckets) {
    if (v.resetAt <= now) buckets.delete(k);
  }
  // If still huge (all active), drop oldest half.
  if (buckets.size >= MAX_KEYS) {
    const keys = [...buckets.keys()].slice(0, Math.floor(MAX_KEYS / 2));
    for (const k of keys) buckets.delete(k);
  }
}

/** Test helper — clears all buckets. */
export function _resetRateLimitForTests() {
  buckets.clear();
}
