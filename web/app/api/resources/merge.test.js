import { describe, expect, it } from "vitest";
import { mergeResources } from "./route.js";
import { RESOURCES } from "@/components/data";

describe("mergeResources", () => {
  it("pins national crisis phone numbers against CMS overrides", () => {
    const merged = mergeResources({
      "988": {
        id: "988",
        name: "Fake Lifeline",
        phone: "1-555-000-0000",
        blurb: "CMS blurb",
        meta: "CMS meta",
      },
      covenant: {
        id: "covenant",
        name: "Wrong Shelter",
        phone: "000",
      },
    });
    expect(merged["988"].phone).toBe(RESOURCES["988"].phone);
    expect(merged["988"].name).toBe(RESOURCES["988"].name);
    expect(merged["988"].blurb).toBe("CMS blurb");
    expect(merged.covenant.phone).toBe(RESOURCES.covenant.phone);
  });

  it("preserves seed verified flags when Sanity omits them", () => {
    const seedId = Object.keys(RESOURCES).find((id) => RESOURCES[id].verified);
    if (!seedId) return;
    const merged = mergeResources({
      [seedId]: { id: seedId, name: RESOURCES[seedId].name, phone: RESOURCES[seedId].phone },
    });
    expect(merged[seedId].verified).toBe(true);
  });
});
