import { describe, expect, it } from "vitest";
import { decodeShare, encodeShare, emptyPlan, normalizePlan } from "./my-plan.js";

describe("my-plan share encoding", () => {
  it("round-trips non-PII plan fields", () => {
    const plan = normalizePlan({
      age: "17",
      county: "Orange",
      resources: ["211", "988"],
      quests: ["drivers-license"],
      checklist: ["Get learner's permit"],
    });
    const token = encodeShare(plan);
    const back = decodeShare(token);
    expect(back.age).toBe("17");
    expect(back.county).toBe("Orange");
    expect(back.resources).toEqual(["211", "988"]);
    expect(back.quests).toEqual(["drivers-license"]);
  });

  it("rejects garbage tokens", () => {
    expect(decodeShare("not-valid")).toBeNull();
  });

  it("empty plan has version 1", () => {
    expect(emptyPlan().version).toBe(1);
  });
});
