import { describe, expect, it } from "vitest";
import { buildChatReply } from "./route.js";
import { RESOURCES } from "@/components/data";

describe("buildChatReply resource lock", () => {
  it("strips unknown resource ids", () => {
    const reply = buildChatReply(
      {
        answer: "Try this bank.",
        steps: ["Open Chime"],
        resources: ["not-a-real-id", "ifoster-bank"],
        followup: "",
        quest: "first-bank-account",
        panic: false,
      },
      "how do I open a bank account?"
    );
    expect(reply.resources.every((id) => Object.prototype.hasOwnProperty.call(RESOURCES, id))).toBe(true);
    expect(reply.resources).not.toContain("not-a-real-id");
    expect(reply.panic).toBe(false);
  });

  it("forces panic + national crisis resources on crisis messages even if model says otherwise", () => {
    const reply = buildChatReply(
      {
        answer: "That sounds hard.",
        steps: [],
        resources: ["ifoster-bank"],
        followup: "",
        quest: "",
        panic: false,
      },
      "I want to die"
    );
    expect(reply.panic).toBe(true);
    expect(reply.resources).toEqual(["988", "covenant", "trevor"]);
    expect(reply.answer).toContain("988");
    expect(reply.answer).toContain("911");
  });

  it("drops invalid quest slugs", () => {
    const reply = buildChatReply(
      {
        answer: "ok",
        steps: [],
        resources: [],
        followup: "",
        quest: "made-up-quest",
        panic: false,
      },
      "hello"
    );
    expect(reply.quest).toBeUndefined();
  });
});
