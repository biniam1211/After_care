import { describe, expect, it } from "vitest";
import {
  detectCrisis,
  ensureCrisisResources,
  applyCrisisPrefix,
  NATIONAL_CRISIS,
  EMERGENCY_911,
  CRISIS_RESOURCE_IDS,
  CRISIS_PREFIX,
} from "./crisis.js";

describe("detectCrisis", () => {
  it("flags emergency phrasing", () => {
    expect(detectCrisis("my foster mom kicked me out and I have nowhere to sleep tonight")).toBe(true);
    expect(detectCrisis("I want to die")).toBe(true);
    expect(detectCrisis("he hits me")).toBe(true);
    expect(detectCrisis("I'm about to be evicted")).toBe(true);
    expect(detectCrisis("thinking about suicide")).toBe(true);
    expect(detectCrisis("I am not safe here")).toBe(true);
  });

  it("does not flag ordinary questions", () => {
    expect(detectCrisis("how do I open a bank account?")).toBe(false);
    expect(detectCrisis("what is the Chafee grant?")).toBe(false);
    expect(detectCrisis("I need help with FAFSA")).toBe(false);
  });

  it("handles empty input", () => {
    expect(detectCrisis("")).toBe(false);
    expect(detectCrisis(null)).toBe(false);
  });
});

describe("NATIONAL_CRISIS", () => {
  it("always includes 988, Covenant House, Trevor Project phones", () => {
    const phones = NATIONAL_CRISIS.map((r) => r.phone);
    expect(phones).toContain("988");
    expect(phones).toContain("1-800-388-3888");
    expect(phones).toContain("1-866-488-7386");
    expect(EMERGENCY_911.phone).toBe("911");
  });

  it("exposes crisis resource ids for chat injection", () => {
    expect(CRISIS_RESOURCE_IDS).toEqual(["988", "covenant", "trevor"]);
  });
});

describe("ensureCrisisResources", () => {
  const allowed = ["988", "covenant", "trevor", "211", "bank-foo", "evil"];

  it("filters unknown ids when not in panic", () => {
    expect(ensureCrisisResources(["not-allowed", "211", "nope"], allowed, false)).toEqual(["211"]);
  });

  it("forces national crisis ids first when panic", () => {
    expect(ensureCrisisResources(["211"], allowed, true)).toEqual([
      "988",
      "covenant",
      "trevor",
    ]);
  });

  it("never returns ids outside the allowlist", () => {
    const out = ensureCrisisResources(["invented-hotline", "988"], ["988", "covenant"], true);
    expect(out.every((id) => ["988", "covenant"].includes(id))).toBe(true);
    expect(out).not.toContain("invented-hotline");
  });
});

describe("applyCrisisPrefix", () => {
  it("prepends national lines when crisis detected and answer lacks them", () => {
    const out = applyCrisisPrefix("We can talk about housing.", true);
    expect(out.startsWith(CRISIS_PREFIX.trim().slice(0, 20))).toBe(true);
    expect(out).toContain("988");
    expect(out).toContain("911");
  });

  it("leaves non-crisis answers alone", () => {
    expect(applyCrisisPrefix("Open a Chime account.", false)).toBe("Open a Chime account.");
  });
});
