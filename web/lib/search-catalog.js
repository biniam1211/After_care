/**
 * Client-side search catalog: programs + resources + FAQ snippets.
 * Synonym map + simple typo tolerance (edit distance ≤ 1 on tokens ≥ 4).
 * No PII — pure functions over static data.
 */

import { PROGRAMS } from "@/components/programs-data";
import { RESOURCES } from "@/components/data";

/** @type {Record<string, string[]>} */
export const SEARCH_SYNONYMS = {
  sleep: ["homeless", "shelter", "housing", "kicked"],
  kicked: ["homeless", "shelter", "housing", "evict"],
  homeless: ["shelter", "housing", "211", "covenant"],
  food: ["calfresh", "snap", "ebt", "hungry", "meal"],
  hungry: ["food", "calfresh", "snap"],
  id: ["documents", "identification", "birth", "ssn", "license", "dmv"],
  documents: ["id", "birth", "ssn", "passport", "vital"],
  money: ["bank", "cash", "budget", "credit", "job", "work"],
  job: ["work", "employment", "resume", "hire"],
  court: ["lawyer", "attorney", "judge", "hearing", "legal"],
  lawyer: ["court", "attorney", "legal"],
  school: ["college", "fafsa", "chafee", "education", "credits"],
  college: ["fafsa", "chafee", "school", "university"],
  health: ["medi-cal", "medicaid", "doctor", "therapy", "insurance"],
  medical: ["medi-cal", "health", "doctor"],
  "medi-cal": ["health", "medicaid", "insurance", "ffy"],
  credit: ["identity", "theft", "report", "freeze"],
  rights: ["bill of rights", "ombudsperson", "grievance"],
  ab12: ["extended", "efc", "silp", "thp"],
  "ab 12": ["extended", "efc", "silp"],
  spanish: ["español", "espanol", "bilingual"],
};

/**
 * @param {string} a
 * @param {string} b
 */
function editDistance(a, b) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > 1) return 2;
  const m = a.length;
  const n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

/**
 * Expand query tokens with synonyms.
 * @param {string} q
 * @returns {string[]}
 */
export function expandQuery(q) {
  const raw = q.toLowerCase().replace(/[^\w\s-]/g, " ").split(/\s+/).filter(Boolean);
  const out = new Set(raw);
  for (const t of raw) {
    const syns = SEARCH_SYNONYMS[t];
    if (syns) syns.forEach((s) => out.add(s));
    for (const [key, vals] of Object.entries(SEARCH_SYNONYMS)) {
      if (key === t || vals.includes(t)) {
        out.add(key);
        vals.forEach((s) => out.add(s));
      }
    }
  }
  return [...out];
}

/**
 * @typedef {{ id: string, type: 'program'|'resource'|'task', title: string, blurb: string, href: string, haystack: string }} SearchDoc
 */

/** @returns {SearchDoc[]} */
export function buildSearchDocs() {
  /** @type {SearchDoc[]} */
  const docs = [];

  for (const p of PROGRAMS) {
    docs.push({
      id: `prog:${p.slug}`,
      type: "program",
      title: p.title,
      blurb: p.tagline,
      href: `/programs/${p.slug}`,
      haystack: [p.title, p.shortTitle, p.tagline, p.summary, ...(p.highlights || []), p.category]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const [id, r] of Object.entries(RESOURCES)) {
    docs.push({
      id: `res:${id}`,
      type: "resource",
      title: r.name,
      blurb: r.blurb,
      href: `/directory#${id}`,
      haystack: [r.name, r.blurb, r.cat, r.meta, r.phone, r.county, ...(r.keywords || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase(),
    });
  }

  const tasks = [
    { id: "sleep", title: "I need a place to sleep", href: "/directory?need=housing", blurb: "Shelter, 211, Covenant House" },
    { id: "money", title: "I need money", href: "/directory?need=money", blurb: "Bank, CalFresh, jobs, Chafee" },
    { id: "docs", title: "I need my documents", href: "/programs/vital-documents", blurb: "Birth certificate, SSN, ID" },
    { id: "job", title: "I need a job", href: "/programs/jobs", blurb: "First job, work permits, Job Corps" },
    { id: "court", title: "I'm in trouble with court", href: "/programs/court-and-lawyer", blurb: "Lawyer, hearings, rights" },
    { id: "talk", title: "I need to talk to someone", href: "/directory?need=crisis", blurb: "988, Trevor, Crisis Text" },
  ];
  for (const t of tasks) {
    docs.push({
      id: `task:${t.id}`,
      type: "task",
      title: t.title,
      blurb: t.blurb,
      href: t.href,
      haystack: `${t.title} ${t.blurb}`.toLowerCase(),
    });
  }

  return docs;
}

/**
 * @param {string} query
 * @param {{ limit?: number }} [opts]
 * @returns {SearchDoc[]}
 */
export function searchCatalog(query, opts = {}) {
  const limit = opts.limit ?? 12;
  const q = (query || "").trim();
  if (q.length < 1) return [];
  const tokens = expandQuery(q);
  const docs = buildSearchDocs();

  const scored = docs.map((doc) => {
    let score = 0;
    const words = doc.haystack.split(/\s+/);
    for (const t of tokens) {
      if (doc.haystack.includes(t)) score += t.length >= 4 ? 3 : 2;
      else if (t.length >= 4) {
        for (const w of words) {
          if (w.length >= 4 && editDistance(t, w) <= 1) {
            score += 1;
            break;
          }
        }
      }
    }
    if (doc.title.toLowerCase().includes(q.toLowerCase())) score += 5;
    return { doc, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.doc);
}
