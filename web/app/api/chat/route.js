// ───────────────────────────────────────────────────────────
// AfterCare — live AI chat endpoint (Claude API)
//
// POST { message, history: [{role:"user"|"ai", content}], profile }
//  → { configured: true,  reply: { answer, steps[], resources[], followup?, quest?, panic } }
//  → { configured: false }                          (no API key set — client uses scripted replies)
//  → { configured: true, error: "upstream" }        (Claude call failed — client uses scripted replies)
//
// Safety guarantees (must hold even when Claude / network fails upstream —
// client scripted path also runs detectCrisis):
//   1. Resource ids are enum-locked in the JSON schema AND re-filtered here.
//   2. Crisis intent forces panic:true + 988 / Covenant / Trevor resource ids.
//   3. Only learningStyle / feeling / zip reach the model (no name / email).
//   4. Clinical/legal advice is forbidden in the system prompt.
// ───────────────────────────────────────────────────────────
import Anthropic from "@anthropic-ai/sdk";
import { RESOURCES, QUESTS } from "@/components/data";
import { logInfo, logError } from "@/lib/log";
import {
  detectCrisis,
  ensureCrisisResources,
  applyCrisisPrefix,
} from "@/lib/crisis";
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit";
import { safeChatProfile } from "@/lib/safe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Default to the latest Opus; override with ANTHROPIC_MODEL (e.g. claude-sonnet-5
// or claude-haiku-4-5) to trade cost/latency for scale.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";
const CLAUDE_TIMEOUT_MS = 25_000;

const RESOURCE_IDS = Object.keys(RESOURCES);
const QUEST_SLUGS = QUESTS.map((q) => q.slug);

// Compact catalog the model chooses resources/quests from. The verified
// flag travels with each line so the model knows what has been checked —
// and the prompt below forbids it from calling anything "verified" that
// isn't, or from claiming a listing's phone line was tested live.
const RESOURCE_CATALOG = RESOURCE_IDS.map(
  (id) =>
    `- ${id}: ${RESOURCES[id].name} — ${RESOURCES[id].cat} — verified: ${RESOURCES[id].verified ? "yes (official page confirmed)" : "no (unverified — tell the youth to call to confirm)"}`
).join("\n");
const QUEST_CATALOG = QUESTS.map((q) => `- ${q.slug}: ${q.title}`).join("\n");

/**
 * @param {{ learningStyle: string, feeling: string, zip: string }} profile
 */
function systemPrompt(profile) {
  const style = profile.learningStyle || "detailed";
  const feeling = profile.feeling || "okay";
  const zip = profile.zip ? ` Their ZIP is ${profile.zip}.` : "";
  return `You are AfterCare — a warm, trustworthy AI navigator built for foster youth aged 16–24, by people who've been through foster care. You help with the "I don't know how to adult" moments: money, banking, housing, school, health, benefits, paperwork, and emergencies.

Voice and values:
- Talk like a caring older sibling who's been there. Plain, direct, ~8th-grade reading level. Never condescending, never judgmental.
- Give real, concrete, actionable answers — specific programs, numbers, and next steps, not vague encouragement.
- Foster-youth facts to lean on when relevant: youth in care after 13 count as "independent" on the FAFSA; the California Chafee Grant is up to $5,000/yr; former foster youth keep free Medi-Cal to age 26; you can open a no-fee bank account at 18 with no co-signer.
- You are not a lawyer, doctor, therapist, or caseworker. Never give definitive clinical diagnoses, medication advice, or legal strategy. Point to the real resources below and encourage talking to a qualified professional.
- NEVER invent a hotline, program, address, or phone number. You may ONLY cite resource ids from the catalog below. If nothing fits, return an empty resources array and suggest the Panic Button or 988.
- Verification honesty: the catalog marks each resource verified yes/no. "Verified" means only that its official page was confirmed — NOT that its phone line was tested live. Never call a resource "verified" unless its catalog line says verified: yes, and never promise a phone number will answer. If you cite an unverified resource, add "call to confirm" in your answer.

SAFETY — this matters most:
- If the person is in danger or crisis right now (nowhere to sleep tonight, being kicked out, being hurt/abused, eviction, self-harm, suicidal thoughts, or any immediate emergency), set "panic": true, lead your answer with reassurance and safety, mention that they can call or text 988 any time, and include the 988 / covenant / trevor resource ids when available. Keep them calm and get them to the fastest help.
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

/**
 * Build the sanitized reply object (shared shape for success path).
 * Exported for unit tests.
 *
 * @param {unknown} data
 * @param {string} message
 */
export function buildChatReply(data, message) {
  const crisis = detectCrisis(message);
  const raw = data && typeof data === "object" ? /** @type {Record<string, unknown>} */ (data) : {};
  const panic = crisis || !!raw.panic;
  const resources = ensureCrisisResources(
    Array.isArray(raw.resources) ? raw.resources.map(String) : [],
    RESOURCE_IDS,
    panic
  );
  const quest = QUEST_SLUGS.includes(/** @type {string} */ (raw.quest)) ? raw.quest : "";
  const steps = (Array.isArray(raw.steps) ? raw.steps : [])
    .map((s) => String(s).slice(0, 500))
    .slice(0, 6);
  const answer = applyCrisisPrefix(
    typeof raw.answer === "string" ? raw.answer.slice(0, 4000) : "",
    crisis
  );
  return {
    answer,
    steps,
    resources,
    followup: raw.followup ? String(raw.followup).slice(0, 500) : undefined,
    quest: quest || undefined,
    panic,
  };
}

export async function POST(req) {
  const limited = rateLimit(`chat:${clientIp(req)}`, { limit: 30, windowMs: 60_000 });
  if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // No key configured — tell the client to use its built-in scripted replies.
    // Client still runs detectCrisis on the scripted path.
    return Response.json({ configured: false });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  const message = typeof body?.message === "string" ? body.message.trim().slice(0, 4000) : "";
  if (!message) {
    return Response.json({ error: "message required" }, { status: 400 });
  }
  const profile = safeChatProfile(body?.profile);
  const history = Array.isArray(body?.history) ? body.history : [];

  // Build a clean, alternating message list ending on the new user turn.
  const priorTurns = history
    .filter((m) => m && (m.role === "user" || m.role === "ai") && m.content)
    .slice(-10)
    .map((m) => ({
      role: m.role === "ai" ? "assistant" : "user",
      content: String(m.content).slice(0, 4000),
    }));
  const messages = [...priorTurns, { role: "user", content: message }];
  while (messages.length && messages[0].role !== "user") messages.shift();

  const client = new Anthropic({ apiKey, timeout: CLAUDE_TIMEOUT_MS });

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
      // Even on refusal, if crisis was detected, return a minimal safe reply
      // so the client does not have to guess.
      if (detectCrisis(message)) {
        return Response.json({
          configured: true,
          reply: buildChatReply(
            {
              answer: "I'm going to focus on getting you help right now.",
              steps: [
                "Call or text 988 — free, 24/7.",
                "Tap the red Panic Button for a shelter and caseworker plan.",
                "If you are in immediate danger, call 911.",
              ],
              resources: [],
              followup: "",
              quest: "",
              panic: true,
            },
            message
          ),
        });
      }
      return Response.json({ configured: true, error: "refusal" }, { status: 502 });
    }

    const textBlock = resp.content.find((b) => b.type === "text");
    let data = {};
    try {
      data = JSON.parse(textBlock?.text || "{}");
    } catch {
      data = {};
    }

    const reply = buildChatReply(data, message);
    logInfo("chat_reply", { model: MODEL, panic: reply.panic, resources: reply.resources.length });
    return Response.json({ configured: true, reply });
  } catch (e) {
    // Any upstream failure → client falls back to scripted replies.
    // Do not echo SDK / network internals to the client.
    logError("chat_upstream", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ configured: true, error: "upstream" }, { status: 502 });
  }
}
