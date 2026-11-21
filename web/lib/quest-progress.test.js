import { describe, expect, it } from "vitest";
import { migrateQuestProgress } from "./quest-progress.js";

describe("migrateQuestProgress", () => {
  it("returns empty object for nullish input", () => {
    expect(migrateQuestProgress(null)).toEqual({});
    expect(migrateQuestProgress(undefined)).toEqual({});
  });

  it("maps license progress onto drivers-license", () => {
    expect(migrateQuestProgress({ license: 3, "first-bank-account": 2 })).toEqual({
      "drivers-license": 3,
      "first-bank-account": 2,
    });
  });

  it("keeps the higher step when both keys exist", () => {
    expect(migrateQuestProgress({ license: 2, "drivers-license": 5 })).toEqual({
      "drivers-license": 5,
    });
    expect(migrateQuestProgress({ license: 4, "drivers-license": 1 })).toEqual({
      "drivers-license": 4,
    });
  });
});
