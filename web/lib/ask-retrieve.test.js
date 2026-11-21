import { describe, expect, it } from "vitest";
import { buildCitedAskReply, retrieveAskHits } from "./ask-retrieve.js";

describe("retrieveAskHits", () => {
  it("returns housing-related hits for kicked-out style questions", () => {
    const hits = retrieveAskHits("I got kicked out and need a place to sleep");
    expect(hits.length).toBeGreaterThan(0);
    const hay = hits.map((h) => `${h.title} ${h.blurb}`).join(" ").toLowerCase();
    expect(hay).toMatch(/shelter|housing|covenant|sleep|homeless|211/);
  });

  it("returns Medi-Cal / health hits", () => {
    const hits = retrieveAskHits("How do I keep Medi-Cal after aging out?");
    expect(hits.length).toBeGreaterThan(0);
  });
});

describe("buildCitedAskReply", () => {
  it("includes citations for food questions", () => {
    const reply = buildCitedAskReply("I'm hungry and need food stamps");
    expect(reply.refuseGuess).toBe(false);
    expect(reply.citations.length).toBeGreaterThan(0);
    expect(reply.followups.length).toBeGreaterThan(0);
  });

  it("refuses to guess when nothing matches", () => {
    const reply = buildCitedAskReply("xyzzy qqq plugh zorblax");
    expect(reply.refuseGuess).toBe(true);
    expect(reply.resources).toEqual(expect.arrayContaining(["211", "988"]));
  });

  it("answers kid-style Chafee questions with citations", () => {
    const reply = buildCitedAskReply("is there free money for college if I was in foster care?");
    expect(reply.citations.length + reply.resources.length).toBeGreaterThan(0);
  });

  it("answers ID / documents kid-style questions", () => {
    const reply = buildCitedAskReply("I need my birth certificate and social security card");
    expect(reply.steps.length).toBeGreaterThan(0);
  });
});
