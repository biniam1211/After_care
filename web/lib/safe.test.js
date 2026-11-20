import { describe, expect, it } from "vitest";
import { safeChatProfile, safeNotifyMessage, safeJsonObject } from "./safe.js";

describe("safeChatProfile", () => {
  it("allowlists only learningStyle, feeling, zip", () => {
    const out = safeChatProfile({
      name: "Alex",
      caseworkerEmail: "cw@example.org",
      age: "17",
      status: "in care",
      learningStyle: "simple",
      feeling: "overwhelmed",
      zip: "90210-1234",
    });
    expect(out).toEqual({
      learningStyle: "simple",
      feeling: "overwhelmed",
      zip: "902101234",
    });
    expect(out).not.toHaveProperty("name");
    expect(out).not.toHaveProperty("caseworkerEmail");
  });
});

describe("safeNotifyMessage", () => {
  it("trims and caps length", () => {
    expect(safeNotifyMessage("  hi  ")).toBe("hi");
    expect(safeNotifyMessage("x".repeat(2000)).length).toBe(800);
  });
});

describe("safeJsonObject", () => {
  it("rejects non-objects and oversized payloads", () => {
    expect(safeJsonObject(null)).toEqual({});
    expect(safeJsonObject([1, 2])).toEqual({});
    expect(safeJsonObject({ a: 1 })).toEqual({ a: 1 });
    expect(safeJsonObject({ big: "y".repeat(20_000) })._truncated).toBe(true);
  });
});
