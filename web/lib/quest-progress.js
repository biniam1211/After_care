/**
 * Quest progress key migration helpers.
 *
 * When a Quest slug is renamed, saved progress under the old key (localStorage
 * or server state) must be remapped so mid-quest users do not reset to step 0.
 */

/** @type {Record<string, string>} */
export const QUEST_PROGRESS_ALIASES = {
  license: "drivers-license",
};

/**
 * Remap renamed quest slugs in a progress map.
 * Keeps the higher step count when both old and new keys exist.
 * @param {Record<string, number> | null | undefined} progress
 * @returns {Record<string, number>}
 */
export function migrateQuestProgress(progress) {
  if (!progress || typeof progress !== "object") return {};
  const next = { ...progress };
  for (const [from, to] of Object.entries(QUEST_PROGRESS_ALIASES)) {
    if (next[from] == null) continue;
    const fromVal = Number(next[from]) || 0;
    const toVal = Number(next[to]) || 0;
    next[to] = Math.max(fromVal, toVal);
    delete next[from];
  }
  return next;
}
