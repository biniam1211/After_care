import { describe, expect, it } from "vitest";
import { matchChatReply } from "./match-chat-reply.js";

const noCrisis = () => false;

describe("matchChatReply", () => {
  it("routes Medi-Cal after aging out to health, not transition", () => {
    expect(matchChatReply("How do I keep Medi-Cal after I age out?", noCrisis)).toBe("health");
    expect(matchChatReply("health insurance when aging out of foster care", noCrisis)).toBe(
      "health"
    );
  });

  it("routes transition-plan questions to transition", () => {
    expect(matchChatReply("What should be in my transition plan?", noCrisis)).toBe("transition");
    expect(matchChatReply("help with my TILP", noCrisis)).toBe("transition");
  });

  it("still matches bare age-out when no domain keyword is present", () => {
    expect(matchChatReply("I am about to age out — what do I do?", noCrisis)).toBe("transition");
    expect(matchChatReply("I'm aging out — what do I do?", noCrisis)).toBe("transition");
    expect(matchChatReply("I'm ageing out next month", noCrisis)).toBe("transition");
  });
});
