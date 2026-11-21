/**
 * Quest progress key migration helpers.
 *
 * When a Quest slug is renamed or steps are inserted, saved progress under the
 * old key (localStorage or server state) must be remapped so mid-quest users
 * do not reset, skip new work incorrectly, or redo steps they already finished.
 */

/** @type {Record<string, string>} */
export const QUEST_PROGRESS_ALIASES = {
  license: "drivers-license",
};

/**
 * Old `license` quest had 5 steps. The renamed `drivers-license` quest inserts
 * "Driver's ed (if under 18)" at index 1, shifting every later step by +1.
 * Progress is a completed-prefix count (0 … stepCount).
 *
 * Mapping: progress ≤ insert index stays put (next step is the new one);
 * progress past the insert is bumped by 1 so completed later steps stay aligned
 * and a finished old quest (5) becomes finished on the new quest (6).
 */
const LICENSE_DRIVERS_ED_INSERT_AT = 1;

/**
 * Remap a completed-step count when a step was inserted into a quest.
 * @param {number} oldProgress
 * @param {number} insertAt - Index of the newly inserted step
 * @returns {number}
 */
export function remapProgressAfterInsert(oldProgress, insertAt) {
  const n = Number(oldProgress) || 0;
  if (n <= insertAt) return n;
  return n + 1;
}

/**
 * Remap renamed quest slugs in a progress map, adjusting step counts when the
 * renamed quest also inserted steps.
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
    const remapped =
      from === "license"
        ? remapProgressAfterInsert(fromVal, LICENSE_DRIVERS_ED_INSERT_AT)
        : fromVal;
    const toVal = Number(next[to]) || 0;
    next[to] = Math.max(remapped, toVal);
    delete next[from];
  }
  return next;
}
