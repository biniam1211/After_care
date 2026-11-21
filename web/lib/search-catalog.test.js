import { describe, expect, it } from "vitest";
import { expandQuery, searchCatalog } from "./search-catalog.js";

describe("searchCatalog", () => {
  it("maps kicked out / sleep to housing-related results", () => {
    const hits = searchCatalog("kicked out");
    expect(hits.length).toBeGreaterThan(0);
    const hay = hits.map((h) => `${h.title} ${h.blurb} ${h.href}`).join(" ").toLowerCase();
    expect(hay).toMatch(/sleep|shelter|housing|homeless|covenant|211/);
  });

  it("maps ID / documents synonyms", () => {
    const hits = searchCatalog("ID");
    expect(hits.some((h) => /document|vital|id|license/i.test(h.title + h.blurb))).toBe(true);
  });

  it("maps food to CalFresh / essentials", () => {
    const hits = searchCatalog("food");
    expect(hits.length).toBeGreaterThan(0);
  });

  it("expands synonyms", () => {
    const tokens = expandQuery("hungry");
    expect(tokens).toEqual(expect.arrayContaining(["food", "calfresh"]));
  });
});
