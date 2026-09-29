import { describe, expect, it } from "vitest";
import { validEmail, newToken, sessionCookie, siteOrigin, SESSION_COOKIE } from "./auth";

// Build a minimal Request-like object with a header getter.
function fakeReq(headers = {}, url = "https://fallback.example/app") {
  const lower = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  return { headers: { get: (k) => lower[k.toLowerCase()] ?? null }, url };
}

describe("validEmail", () => {
  it("accepts normal addresses (and trims surrounding space)", () => {
    expect(validEmail("kid@example.com")).toBe(true);
    expect(validEmail("  a.b-c@sub.domain.org  ")).toBe(true);
  });

  it("rejects malformed or non-string input", () => {
    for (const bad of ["", "no-at", "no@dot", "a b@c.com", "a@b c.com", "@x.com", "a@.com", null, undefined, 42]) {
      expect(validEmail(bad)).toBe(false);
    }
  });
});

describe("newToken", () => {
  it("is a 64-char hex string", () => {
    expect(newToken()).toMatch(/^[0-9a-f]{64}$/);
  });

  it("is unique across calls", () => {
    const tokens = new Set(Array.from({ length: 100 }, () => newToken()));
    expect(tokens.size).toBe(100);
  });
});

describe("sessionCookie", () => {
  it("sets the hardened flags a session cookie needs", () => {
    const c = sessionCookie("abc123");
    expect(c.startsWith(`${SESSION_COOKIE}=abc123;`)).toBe(true);
    expect(c).toContain("Path=/");
    expect(c).toContain("HttpOnly"); // not readable from JS → XSS can't steal it
    expect(c).toContain("SameSite=Lax"); // CSRF mitigation
    expect(c).toContain("Max-Age=");
  });

  it("defaults to a 30-day lifetime and honors a custom one", () => {
    expect(sessionCookie("t")).toContain(`Max-Age=${30 * 24 * 3600}`);
    expect(sessionCookie("t", 3600)).toContain("Max-Age=3600");
  });

  it("omits Secure outside production (so local http dev works)", () => {
    // vitest runs with NODE_ENV=test, not production.
    expect(sessionCookie("t")).not.toContain("Secure");
  });

  it("url-encodes the token value", () => {
    expect(sessionCookie("a b/c")).toContain(`${SESSION_COOKIE}=a%20b%2Fc;`);
  });
});

describe("siteOrigin", () => {
  it("prefers APP_URL and strips a trailing slash", () => {
    process.env.APP_URL = "https://aftercare.app/";
    expect(siteOrigin(fakeReq())).toBe("https://aftercare.app");
    delete process.env.APP_URL;
  });

  it("derives from proxy headers when APP_URL is unset (Vercel case)", () => {
    const req = fakeReq({ "x-forwarded-proto": "https", "x-forwarded-host": "www.aftercare.app" });
    expect(siteOrigin(req)).toBe("https://www.aftercare.app");
  });

  it("falls back to the request URL origin", () => {
    expect(siteOrigin(fakeReq({}, "https://host.example/app/x"))).toBe("https://host.example");
  });
});
