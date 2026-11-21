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

  it("routes seal / AB 12 / court before broad school keywords", () => {
    expect(matchChatReply("Can I seal my juvenile record for school?", noCrisis)).toBe("seal");
    expect(matchChatReply("Can I stay in care under AB 12 while in school?", noCrisis)).toBe(
      "ab12"
    );
    expect(matchChatReply("How do I talk to my lawyer at my court hearing?", noCrisis)).toBe(
      "court"
    );
  });

  it("routes credit-check questions to credit, not bank", () => {
    expect(matchChatReply("How do I do a credit check at 16?", noCrisis)).toBe("credit");
    expect(matchChatReply("I think I have identity theft on my credit report", noCrisis)).toBe(
      "credit"
    );
    expect(matchChatReply("check my credit", noCrisis)).toBe("credit");
    expect(matchChatReply("there's a fake account on my credit file", noCrisis)).toBe("credit");
    expect(matchChatReply("I need to open a bank account", noCrisis)).toBe("bank");
  });

  it("does not confuse school credits or credit unions with credit reports", () => {
    expect(matchChatReply("How do I get my credits for school?", noCrisis)).toBe("college");
    expect(matchChatReply("Do I get partial credits under AB 490?", noCrisis)).toBe("college");
    expect(matchChatReply("Can I open an account at a credit union?", noCrisis)).toBe("bank");
  });

  it("routes credit-union fraud questions to credit, not bank", () => {
    expect(
      matchChatReply("There's fraud on my Equifax report from a credit union account", noCrisis)
    ).toBe("credit");
    expect(
      matchChatReply("I need a credit freeze but I bank at a credit union", noCrisis)
    ).toBe("credit");
  });
});
