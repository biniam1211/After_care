import { describe, expect, it } from "vitest";
import { migrateQuestProgress, remapProgressAfterInsert } from "./quest-progress.js";

describe("remapProgressAfterInsert", () => {
  it("leaves progress at or before the insert index unchanged", () => {
    expect(remapProgressAfterInsert(0, 1)).toBe(0);
    expect(remapProgressAfterInsert(1, 1)).toBe(1);
  });

  it("bumps progress past the insert so later steps stay aligned", () => {
    expect(remapProgressAfterInsert(2, 1)).toBe(3);
    expect(remapProgressAfterInsert(3, 1)).toBe(4);
    expect(remapProgressAfterInsert(4, 1)).toBe(5);
    expect(remapProgressAfterInsert(5, 1)).toBe(6);
  });
});

describe("migrateQuestProgress", () => {
  it("returns empty object for nullish input", () => {
    expect(migrateQuestProgress(null)).toEqual({});
    expect(migrateQuestProgress(undefined)).toEqual({});
  });

  it("maps license docs-only progress onto drivers-license without skipping driver's ed", () => {
    expect(migrateQuestProgress({ license: 1, "first-bank-account": 2 })).toEqual({
      "drivers-license": 1,
      "first-bank-account": 2,
    });
  });

  it("shifts license progress after the inserted driver's ed step", () => {
    // Old progress 2 = docs + study. New quest inserts driver's ed at 1, so
    // bump by 1 → 3 keeps study marked and avoids redoing the permit next.
    expect(migrateQuestProgress({ license: 2 })).toEqual({
      "drivers-license": 3,
    });
    expect(migrateQuestProgress({ license: 3 })).toEqual({
      "drivers-license": 4,
    });
  });

  it("marks a finished old license quest complete on the 6-step quest", () => {
    expect(migrateQuestProgress({ license: 5 })).toEqual({
      "drivers-license": 6,
    });
  });

  it("keeps the higher step when both keys exist (after remapping)", () => {
    expect(migrateQuestProgress({ license: 2, "drivers-license": 5 })).toEqual({
      "drivers-license": 5,
    });
    // remapped license 4 → 5 beats existing 1
    expect(migrateQuestProgress({ license: 4, "drivers-license": 1 })).toEqual({
      "drivers-license": 5,
    });
  });
});
