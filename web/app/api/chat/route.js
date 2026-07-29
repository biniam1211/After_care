// ───────────────────────────────────────────────────────────
// AfterCare — live AI chat endpoint (Claude API)
//
// POST { message, history: [{role:"user"|"ai", content}], profile }
//  → { configured: true,  reply: { answer, steps[], resources[], followup?, quest?, panic } }
//  → { configured: false }                          (no API key set — client uses scripted replies)
//  → { configured: true, error: "upstream" }        (Claude call failed — client uses scripted replies)
//
// The key never leaves the server. With no key the app still works as a
// self-contained demo via the scripted CHAT_REPLIES fallback on the client.
// ───────────────────────────────────────────────────────────
import Anthropic from "@anthropic-ai/sdk";
import { RESOURCES, QUESTS } from "@/components/data";
import { logInfo, logError } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Default to the latest Opus; override with ANTHROPIC_MODEL (e.g. claude-sonnet-5
// or claude-haiku-4-5) to trade cost/latency for scale.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";

const RESOURCE_IDS = Object.keys(RESOURCES);
const QUEST_SLUGS = QUESTS.map((q) => q.slug);

// Compact catalog the model chooses resources/quests from.
const RESOURCE_CATALOG = RESOURCE_IDS.map(
  (id) => `- ${id}: ${RESOURCES[id].name} — ${RESOURCES[id].cat}`
).join("\n");
const QUEST_CATALOG = QUESTS.map((q) => `- ${q.slug}: ${q.title}`).join("\n");

function systemPrompt(profile = {}) {
  const style = profile.learningStyle || "detailed";
  const feeling = profile.feeling || "okay";
  const zip = profile.zip ? ` Their ZIP is ${profile.zip}.` : "";
  return `You are AfterCare — a warm, trustworthy AI navigator built for foster youth aged 16–24, by people who've been through foster care. You help with the "I don't know how to adult" moments: money, banking, housing, school, health, benefits, paperwork, and emergencies.

Voice and values:
- Talk like a caring older sibling who's been there. Plain, direct, ~8th-grade reading level. Never condescending, never judgmental.
- Give real, concrete, actionable answers — specific programs, numbers, and next steps, not vague encouragement.
- Foster-youth facts to lean on when relevant: youth in care after 13 count as "independent" on the FAFSA; the California Chafee Grant is up to $5,000/yr; former foster youth keep free Medi-Cal to age 26; you can open a no-fee bank account at 18 with no co-signer.
- You are not a lawyer, doctor, or caseworker — point to the real resources below rather than giving definitive legal/medical advice.

SAFETY — this matters most:
- If the person is in danger or crisis right now (nowhere to sleep tonight, being kicked out, being hurt/abused, eviction, self-harm, or any immediate emergency), set "panic": true, lead your answer with reassurance and safety, and mention that they can call or text 988 any time. Keep them calm and get them to the fastest help.
- If it's not an emergency, set "panic": false.

Personalize:
- Learning style "${style}": simple → keep it short, just the steps. detailed → briefly explain why each step matters. examples → include a concrete real-world example.
- Feeling "${feeling}": overwhelmed → be extra gentle, emphasize one step at a time. confident → be efficient and direct.${zip}

Answer format — you MUST return the structured JSON object:
- "answer": 2–4 warm sentences that directly answer the question.
- "steps": 2–4 short, concrete next steps (empty array if a plain answer needs none).
- "resources": 0–3 ids chosen ONLY from this list (use the id exactly; [] if none fit):
${RESOURCE_CATALOG}
- "followup": one friendly follow-up question offering to go deeper, or "" if none.
- "quest": if a step-by-step guide fits, one slug from this list, else "":
${QUEST_CATALOG}
- "panic": true only for an active emergency (see SAFETY), otherwise false.`;
}

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    answer: { type: "string" },
    steps: { type: "array", items: { type: "string" } },
    resources: { type: "array", items: { type: "string", enum: RESOURCE_IDS } },
    followup: { type: "string" },
    quest: { type: "string", enum: [...QUEST_SLUGS, ""] },
    panic: { type: "boolean" },
  },
  required: ["answer", "steps", "resources", "followup", "quest", "panic"],
};

export async function POST(req) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — tell the client to use its built-in scripted replies.
    return Response.json({ configured: false });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) {
    return Response.json({ error: "message required" }, { status: 400 });
  }
  const profile = body?.profile && typeof body.profile === "object" ? body.profile : {};
  const history = Array.isArray(body?.history) ? body.history : [];

  // Build a clean, alternating message list ending on the new user turn.
  const priorTurns = history
    .filter((m) => m && (m.role === "user" || m.role === "ai") && m.content)
    .slice(-10)
    .map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: String(m.content).slice(0, 4000),
    }));
  const messages = [...priorTurns, { role: "user", content: message.slice(0, 4000) }];
  while (messages.length && messages[0].role !== "user") messages.shift();

  const client = new Anthropic({ apiKey });

  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: systemPrompt(profile),
      output_config: { effort: "low", format: { type: "json_schema", schema: SCHEMA } },
      messages,
    });

    if (resp.stop_reason === "refusal") {
      logError("chat_refusal", { model: MODEL });
      return Response.json({ configured: true, error: "refusal" }, { status: 502 });
    }

    const textBlock = resp.content.find((b) => b.type === "text");
    const data = JSON.parse(textBlock?.text || "{}");

    // Sanitize against known ids so the UI only ever renders real resources/quests.
    const resources = (Array.isArray(data.resources) ? data.resources : [])
      .filter((id) => RESOURCE_IDS.includes(id))
      .slice(0, 3);
    const quest = QUEST_SLUGS.includes(data.quest) ? data.quest : "";
    const steps = (Array.isArray(data.steps) ? data.steps : [])
      .map((s) => String(s))
      .slice(0, 6);

    logInfo("chat_reply", { model: MODEL, panic: !!data.panic, resources: resources.length });
    return Response.json({
      configured: true,
      reply: {
        answer: typeof data.answer === "string" ? data.answer : "",
        steps,
        resources,
        followup: data.followup ? String(data.followup) : undefined,
        quest: quest || undefined,
        panic: !!data.panic,
      },
    });
  } catch (e) {
    // Any upstream failure → client falls back to scripted replies.
    logError("chat_upstream", { detail: String(e?.message || e) });
    return Response.json(
      { configured: true, error: "upstream", detail: String(e?.message || e) },
      { status: 502 }
    );
  }
}
