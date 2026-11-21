/**
 * Map free-text chat input to a scripted CHAT_REPLIES key.
 * Specific life-domain matchers run before the broader transition/age-out
 * matcher so questions like Medi-Cal after aging out still hit health.
 *
 * @param {string} text
 * @param {(t: string) => boolean} detectCrisis
 * @returns {string}
 */
export function matchChatReply(text, detectCrisis) {
  if (detectCrisis(text)) return "crisis";
  const t = text.toLowerCase();
  if (/\b(kicked out|nowhere to (sleep|go|stay)|homeless|evict|being (hurt|abused))\b/.test(t)) {
    return "kicked";
  }
  if (/(bank|account|debit|checking|direct deposit)/.test(t)) return "bank";
  if (/(college|university|fafsa|school|degree)/.test(t)) return "college";
  if (/(chafee|grant|scholarship|free money|tuition)/.test(t)) return "chafee";
  if (/(health|insurance|medi|medical|doctor|medicaid)/.test(t)) return "health";
  if (/(transition plan|tilp|independent living plan|\bage.?ing out\b|\bage.?out\b)/.test(t)) {
    return "transition";
  }
  return "default";
}
