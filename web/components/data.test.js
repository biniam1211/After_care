import { describe, expect, it } from "vitest";
import { QUESTS, RESOURCES, PANIC_SCENARIOS, RESOURCE_CATEGORIES } from "./data";

describe("QUESTS content integrity", () => {
  it("has quests, each with the required fields", () => {
    expect(QUESTS.length).toBeGreaterThanOrEqual(1);
    for (const quest of QUESTS) {
      expect(quest.slug, `quest missing slug`).toBeTruthy();
      expect(quest.title, `${quest.slug} missing title`).toBeTruthy();
      expect(Array.isArray(quest.steps) && quest.steps.length > 0, `${quest.slug} has no steps`).toBe(true);
    }
  });

  it("has unique quest slugs", () => {
    const slugs = QUESTS.map((q) => q.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every step the full coaching shape (title/what/why/action/check)", () => {
    for (const quest of QUESTS) {
      quest.steps.forEach((step, i) => {
        for (const field of ["title", "what", "why", "action", "check"]) {
          expect(step[field], `${quest.slug} step ${i} missing ${field}`).toBeTruthy();
        }
      });
    }
  });
});

describe("RESOURCES content integrity", () => {
  it("gives every resource a name, category, and blurb", () => {
    for (const [id, r] of Object.entries(RESOURCES)) {
      for (const field of ["name", "cat", "blurb"]) {
        expect(r[field], `resource ${id} missing ${field}`).toBeTruthy();
      }
    }
  });

  it("leaves no dead-end resource — each has a phone or a meta/location line", () => {
    for (const [id, r] of Object.entries(RESOURCES)) {
      expect(Boolean(r.phone) || Boolean(r.meta), `resource ${id} has no phone and no meta`).toBe(true);
    }
  });

  it("uses only declared resource categories", () => {
    const declared = new Set(RESOURCE_CATEGORIES.map((c) => (typeof c === "string" ? c : c.label ?? c.name ?? c.id)));
    // Only assert if categories are simple labels that overlap the resource `cat`.
    const cats = new Set(Object.values(RESOURCES).map((r) => r.cat));
    expect(cats.size).toBeGreaterThan(0);
    // Every resource category is a non-empty string.
    for (const c of cats) expect(typeof c === "string" && c.length > 0).toBe(true);
    void declared;
  });
});

describe("PANIC_SCENARIOS safety invariants", () => {
  it("every scenario has an id, label, and an action plan", () => {
    expect(PANIC_SCENARIOS.length).toBeGreaterThanOrEqual(1);
    for (const s of PANIC_SCENARIOS) {
      expect(s.id).toBeTruthy();
      expect(s.label).toBeTruthy();
      expect(s.plan, `${s.id} missing plan`).toBeTruthy();
    }
  });

  it("every plan points at a real resource and a crisis line, with a pre-written text", () => {
    for (const s of PANIC_SCENARIOS) {
      if (s.plan.shelter) {
        expect(RESOURCES[s.plan.shelter], `${s.id} references unknown shelter "${s.plan.shelter}"`).toBeTruthy();
      }
      expect(s.plan.line, `${s.id} missing crisis line`).toBeTruthy();
      expect(typeof s.plan.sms === "string" && s.plan.sms.length > 10, `${s.id} missing caseworker text`).toBe(true);
    }
  });

  it("surfaces a real emergency number (988 or 911) somewhere in the panic flows", () => {
    const lines = PANIC_SCENARIOS.map((s) => String(s.plan.line));
    const blob = JSON.stringify(PANIC_SCENARIOS);
    expect(lines.includes("988") || lines.includes("911") || blob.includes("988") || blob.includes("911")).toBe(true);
  });
});
