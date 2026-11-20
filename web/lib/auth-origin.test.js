import { describe, expect, it, afterEach } from "vitest";
import { siteOrigin, validEmail } from "./auth.js";

describe("validEmail", () => {
  it("accepts normal emails and rejects junk", () => {
    expect(validEmail("youth@example.org")).toBe(true);
    expect(validEmail("not-an-email")).toBe(false);
    expect(validEmail("")).toBe(false);
  });
});

describe("siteOrigin", () => {
  const prevAppUrl = process.env.APP_URL;
  const prevNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    if (prevAppUrl === undefined) delete process.env.APP_URL;
    else process.env.APP_URL = prevAppUrl;
    process.env.NODE_ENV = prevNodeEnv;
  });

  it("prefers APP_URL when set", () => {
    process.env.APP_URL = "https://aftercare.example.org/";
    const req = new Request("https://evil.example/api/auth/request", {
      headers: { host: "evil.example", "x-forwarded-host": "evil.example" },
    });
    expect(siteOrigin(req)).toBe("https://aftercare.example.org");
  });

  it("throws in production without APP_URL", () => {
    delete process.env.APP_URL;
    process.env.NODE_ENV = "production";
    const req = new Request("https://evil.example/api/auth/request", {
      headers: { host: "evil.example" },
    });
    expect(() => siteOrigin(req)).toThrow(/APP_URL/);
  });
});
