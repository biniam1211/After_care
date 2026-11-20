// ───────────────────────────────────────────────────────────
// AfterCare — national crisis fallbacks + intent detection
//
// These ALWAYS surface in the Panic Button and chat crisis path,
// independent of the resource catalog, CMS, DB, or network.
// Ported from api/src/lib/crisis.ts + crisisDetect.ts so the live
// web product has the same safety net as the dormant Express API.
// ───────────────────────────────────────────────────────────

/**
 * Hardcoded national crisis lines. Phone numbers live here — not only
 * in RESOURCES — so a missing catalog id, Sanity override, or failed
 * fetch can never blank out the Panic Button.
 *
 * @type {ReadonlyArray<{ id: string, name: string, phone: string, sms?: string, url?: string, note: string }>}
 */
export const NATIONAL_CRISIS = Object.freeze([
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    sms: "Text 988",
    url: "https://988lifeline.org",
    note: "Free, 24/7. Call or text if you are in crisis or just need to talk.",
  },
  {
    id: "covenant",
    name: "Covenant House (youth homelessness)",
    phone: "1-800-388-3888",
    url: "https://www.covenanthouse.org",
    note: "Nationwide crisis line and shelters for youth with nowhere to sleep.",
  },
  {
    id: "trevor",
    name: "The Trevor Project (LGBTQ+ youth)",
    phone: "1-866-488-7386",
    sms: "Text START to 678-678",
    url: "https://www.thetrevorproject.org",
    note: "24/7 support for LGBTQ+ young people in crisis.",
  },
]);

/** Always-available emergency number — never depends on a resource row. */
export const EMERGENCY_911 = Object.freeze({
  id: "911",
  name: "Emergency services",
  phone: "911",
  note: "If you are in immediate danger, call 911 now.",
});

/** Resource ids the chat endpoint injects when crisis intent fires. */
export const CRISIS_RESOURCE_IDS = Object.freeze(
  NATIONAL_CRISIS.map((r) => r.id)
);

/**
 * Lightweight crisis intent detection. High-recall safety net — better to
 * nudge toward help once too often than to miss a youth in crisis.
 *
 * @param {string} message
 * @returns {boolean}
 */
export function detectCrisis(message) {
  if (typeof message !== "string" || !message.trim()) return false;
  return CRISIS_PATTERNS.some((re) => re.test(message));
}

const CRISIS_PATTERNS = [
  /\b(kill|hurt|harm)(ing)?\s+myself\b/i,
  /\bsuicid(e|al)\b/i,
  /\bwant to die\b/i,
  /\bend (it|my life)\b/i,
  /\bnowhere to (sleep|go|stay)\b/i,
  /\bhomeless\b/i,
  /\bkicked out\b/i,
  /\bbeing (hurt|abused|hit|beaten)\b/i,
  /\b(he|she|they)\s+(hits|hurts|beats)\s+me\b/i,
  /\bevict(ed|ion)\b/i,
  /\bnot safe\b/i,
  /\brun(ning)? away\b/i,
];

/** Prepended to the model reply when crisis intent is detected. */
export const CRISIS_PREFIX = [
  "It sounds like this might be an emergency. You're not alone and help is free, right now:",
  "• 988 — Suicide & Crisis Lifeline (call or text, 24/7)",
  "• Covenant House — 1-800-388-3888 (youth shelter, 24/7)",
  "• The Trevor Project — 1-866-488-7386 (LGBTQ+ youth, 24/7)",
  "• If you are in immediate danger, call 911.",
  "• Tap the red Panic button for a step-by-step plan.",
  "",
].join("\n");

/**
 * Merge crisis hotlines into a reply's resources list (catalog ids only).
 * Crisis ids are placed first so the UI shows them even if the model
 * returned other resources.
 *
 * @param {string[]} resources
 * @param {string[]} allowedIds
 * @param {boolean} panic
 * @returns {string[]}
 */
export function ensureCrisisResources(resources, allowedIds, panic) {
  const allowed = new Set(allowedIds);
  const cleaned = (Array.isArray(resources) ? resources : [])
    .filter((id) => typeof id === "string" && allowed.has(id));
  if (!panic) return cleaned.slice(0, 3);
  const crisis = CRISIS_RESOURCE_IDS.filter((id) => allowed.has(id));
  const rest = cleaned.filter((id) => !crisis.includes(id));
  return [...crisis, ...rest].slice(0, 3);
}

/**
 * Apply crisis prefix to an answer when detection fired and 988 is not
 * already mentioned.
 *
 * @param {string} answer
 * @param {boolean} crisisDetected
 * @returns {string}
 */
export function applyCrisisPrefix(answer, crisisDetected) {
  const text = typeof answer === "string" ? answer : "";
  if (!crisisDetected) return text;
  if (/\b988\b/.test(text) && /911/.test(text)) return text;
  return `${CRISIS_PREFIX}${text}`.trim();
}
