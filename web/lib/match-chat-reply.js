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
  // Specific legal / housing / ID intents before broad school|college.
  if (/(seal|sealing|expunge|juvenile record)/.test(t)) return "seal";
  if (/(ab\s*12|extended foster|stay in care|efc)/.test(t)) return "ab12";
  if (/(attorney|court hearing|judge|dependency court|my lawyer)/.test(t)) return "court";
  if (/(bill of rights|ombudsperson|grievance|my rights)/.test(t)) return "rights";
  // Credit-report / identity-theft intent before bank.
  // Word boundaries + exclusions so "my credits", "credit union", and
  // "credit hours" do not steal college/bank replies.
  if (/\bcredit union\b/.test(t)) {
    // fall through — credit unions are banking
  } else if (
    !/\b(credit hours?|course credits?|college credits?|partial credits?|my credits)\b/.test(t) &&
    (/\bcheck (?:my )?credit\b/.test(t) ||
      /\bmy credit\b(?!\s+union)/.test(t) ||
      /\bcredit (?:check|report|score|file|history|freeze)\b/.test(t) ||
      /\bbad credit\b/.test(t) ||
      /\b(identity theft|annualcreditreport|equifax|experian|transunion|fraud alert)\b/.test(t))
  ) {
    return "credit";
  }
  if (
    /(bank|debit|checking|direct deposit|open an account|bank account|credit union)/.test(t)
  ) {
    return "bank";
  }
  if (/(chafee|grant|scholarship|free money|tuition)/.test(t)) return "chafee";
  if (/(college|university|fafsa|school|degree|partial credits?|ab\s*490|ab\s*216)/.test(t)) {
    return "college";
  }
  if (/(health|insurance|medi|medical|doctor|medicaid)/.test(t)) return "health";
  if (
    /(transition plan|tilp|independent living plan|\baging out\b|\bageing out\b|\bage.?out\b)/.test(
      t
    )
  ) {
    return "transition";
  }
  return "default";
}
