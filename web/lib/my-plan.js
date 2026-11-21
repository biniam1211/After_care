/**
 * Browser-only personal plan helpers (no accounts, no PII).
 * Share links encode only age band, county, saved resource ids, and quest slugs.
 */

export const MY_PLAN_STORAGE_KEY = "aftercare_my_plan_v1";

/**
 * @typedef {{
 *   version: 1,
 *   age: string,
 *   county: string,
 *   resources: string[],
 *   quests: string[],
 *   checklist: string[],
 *   updatedAt: string,
 * }} MyPlan
 */

/** @returns {MyPlan} */
export function emptyPlan() {
  return {
    version: 1,
    age: "",
    county: "",
    resources: [],
    quests: [],
    checklist: [],
    updatedAt: new Date().toISOString(),
  };
}

/**
 * @param {unknown} raw
 * @returns {MyPlan}
 */
export function normalizePlan(raw) {
  const base = emptyPlan();
  if (!raw || typeof raw !== "object") return base;
  const o = /** @type {Record<string, unknown>} */ (raw);
  return {
    version: 1,
    age: typeof o.age === "string" ? o.age.slice(0, 8) : "",
    county: typeof o.county === "string" ? o.county.slice(0, 40) : "",
    resources: Array.isArray(o.resources)
      ? [...new Set(o.resources.filter((x) => typeof x === "string").map(String))].slice(0, 40)
      : [],
    quests: Array.isArray(o.quests)
      ? [...new Set(o.quests.filter((x) => typeof x === "string").map(String))].slice(0, 20)
      : [],
    checklist: Array.isArray(o.checklist)
      ? [...new Set(o.checklist.filter((x) => typeof x === "string").map(String))].slice(0, 40)
      : [],
    updatedAt: typeof o.updatedAt === "string" ? o.updatedAt : base.updatedAt,
  };
}

/** @returns {MyPlan} */
export function loadPlan() {
  if (typeof window === "undefined") return emptyPlan();
  try {
    const raw = localStorage.getItem(MY_PLAN_STORAGE_KEY);
    if (!raw) return emptyPlan();
    return normalizePlan(JSON.parse(raw));
  } catch {
    return emptyPlan();
  }
}

/** @param {MyPlan} plan */
export function savePlan(plan) {
  if (typeof window === "undefined") return;
  const next = normalizePlan({ ...plan, updatedAt: new Date().toISOString() });
  try {
    localStorage.setItem(MY_PLAN_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next;
}

/**
 * Compact share payload — no names, phones, or free-text notes.
 * @param {MyPlan} plan
 * @returns {string}
 */
export function encodeShare(plan) {
  const compact = {
    a: plan.age || undefined,
    c: plan.county || undefined,
    r: plan.resources.length ? plan.resources : undefined,
    q: plan.quests.length ? plan.quests : undefined,
    k: plan.checklist.length ? plan.checklist : undefined,
  };
  const json = JSON.stringify(compact);
  if (typeof btoa === "function") {
    return btoa(unescape(encodeURIComponent(json)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return Buffer.from(json, "utf8").toString("base64url");
}

/**
 * @param {string} token
 * @returns {MyPlan | null}
 */
export function decodeShare(token) {
  try {
    const b64 = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = b64 + "=".repeat((4 - (b64.length % 4)) % 4);
    const json =
      typeof atob === "function"
        ? decodeURIComponent(escape(atob(pad)))
        : Buffer.from(pad, "base64").toString("utf8");
    const compact = JSON.parse(json);
    return normalizePlan({
      age: compact.a || "",
      county: compact.c || "",
      resources: compact.r || [],
      quests: compact.q || [],
      checklist: compact.k || [],
    });
  } catch {
    return null;
  }
}

/**
 * @param {MyPlan} plan
 * @param {string} resourceId
 * @returns {MyPlan}
 */
export function toggleResource(plan, resourceId) {
  const set = new Set(plan.resources);
  if (set.has(resourceId)) set.delete(resourceId);
  else set.add(resourceId);
  return savePlan({ ...plan, resources: [...set] });
}

/**
 * @param {MyPlan} plan
 * @param {string} questSlug
 * @returns {MyPlan}
 */
export function toggleQuest(plan, questSlug) {
  const set = new Set(plan.quests);
  if (set.has(questSlug)) set.delete(questSlug);
  else set.add(questSlug);
  return savePlan({ ...plan, quests: [...set] });
}
