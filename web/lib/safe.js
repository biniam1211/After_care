// ───────────────────────────────────────────────────────────
// AfterCare — request sanitizers shared by API routes
// ───────────────────────────────────────────────────────────

/**
 * Strip profile down to fields the model may see. Name, caseworker
 * email, age, and foster status must never reach Anthropic.
 *
 * @param {unknown} profile
 * @returns {{ learningStyle: string, feeling: string, zip: string }}
 */
export function safeChatProfile(profile) {
  const p = profile && typeof profile === "object" ? /** @type {Record<string, unknown>} */ (profile) : {};
  const learningStyle = typeof p.learningStyle === "string" ? p.learningStyle.slice(0, 40) : "";
  const feeling = typeof p.feeling === "string" ? p.feeling.slice(0, 40) : "";
  const zipRaw = typeof p.zip === "string" ? p.zip : "";
  const zip = zipRaw.replace(/\D/g, "").slice(0, 10);
  return { learningStyle, feeling, zip };
}

/**
 * Cap and sanitize a free-text message for caseworker notify.
 *
 * @param {unknown} message
 * @param {number} [max=800]
 * @returns {string}
 */
export function safeNotifyMessage(message, max = 800) {
  if (typeof message !== "string") return "";
  return message.trim().slice(0, max);
}

/**
 * Cap quest progress / profile blobs stored in app_state.
 *
 * @param {unknown} obj
 * @param {number} [maxBytes=16384]
 * @returns {Record<string, unknown>}
 */
export function safeJsonObject(obj, maxBytes = 16384) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
  const raw = JSON.stringify(obj);
  if (raw.length > maxBytes) {
    return { _truncated: true };
  }
  return /** @type {Record<string, unknown>} */ (obj);
}
