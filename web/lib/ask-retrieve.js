/**
 * Lightweight retrieval over verified RESOURCES + PROGRAMS for Ask answers.
 * Prefer verified hits; never invent ids. Used by scripted Ask + evals.
 */
import { RESOURCES } from "@/components/data";
import { PROGRAMS } from "@/components/programs-data";
import { expandQuery } from "@/lib/search-catalog";

/**
 * @typedef {{ id: string, kind: 'resource'|'guide', title: string, blurb: string, href: string, sourceUrl?: string|null, verifiedDate?: string|null, verified?: boolean, score: number }} AskHit
 */

/**
 * Score a haystack against expanded query tokens.
 * @param {string} hay
 * @param {string[]} tokens
 */
function scoreHay(hay, tokens) {
  const h = hay.toLowerCase();
  let score = 0;
  for (const tok of tokens) {
    if (!tok || tok.length < 2) continue;
    if (h.includes(tok)) score += tok.length > 4 ? 3 : 2;
  }
  return score;
}

/**
 * Retrieve catalog + guide hits for a youth question.
 * @param {string} query
 * @param {{ limit?: number, preferVerified?: boolean, county?: string }} [opts]
 * @returns {AskHit[]}
 */
export function retrieveAskHits(query, opts = {}) {
  const limit = opts.limit ?? 5;
  const preferVerified = opts.preferVerified !== false;
  const tokens = expandQuery(query);
  /** @type {AskHit[]} */
  const hits = [];

  for (const [id, r] of Object.entries(RESOURCES)) {
    if (opts.county) {
      const counties = r.counties || (r.county ? [r.county] : ["Statewide"]);
      const ok =
        counties.includes("Statewide") ||
        counties.includes(opts.county) ||
        r.county === opts.county;
      if (!ok) continue;
    }
    const hay = `${r.name} ${r.blurb} ${r.cat} ${(r.keywords || []).join(" ")}`;
    let score = scoreHay(hay, tokens);
    if (preferVerified && r.verified) score += 2;
    // Require a real token hit before the verified bonus can surface noise.
    if (scoreHay(hay, tokens) <= 0) continue;
    if (score <= 0) continue;
    hits.push({
      id,
      kind: "resource",
      title: r.name,
      blurb: r.blurb,
      href: `/directory?focus=${encodeURIComponent(id)}`,
      sourceUrl: r.sourceUrl || r.url || null,
      verifiedDate: r.verifiedDate || null,
      verified: !!r.verified,
      score,
    });
  }

  for (const p of PROGRAMS) {
    const hay = `${p.title} ${p.shortTitle || ""} ${p.tagline || ""} ${p.category || ""}`;
    const score = scoreHay(hay, tokens);
    if (score <= 0) continue;
    hits.push({
      id: p.slug,
      kind: "guide",
      title: p.shortTitle || p.title,
      blurb: p.tagline || "",
      href: `/programs/${p.slug}`,
      sourceUrl: null,
      verifiedDate: null,
      verified: true,
      score,
    });
  }

  hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  return hits.slice(0, limit);
}

/**
 * Build a grounded scripted answer with citations — refuses to guess.
 * @param {string} query
 * @param {{ county?: string, age?: string, situation?: string }} [ctx]
 */
export function buildCitedAskReply(query, ctx = {}) {
  const hits = retrieveAskHits(query, { limit: 4, county: ctx.county }).filter(
    (h) => h.score >= 4
  );
  const verifiedHits = hits.filter((h) => h.kind === "guide" || h.verified);
  const usable = verifiedHits.length ? verifiedHits : hits.filter((h) => h.kind === "guide");

  if (!usable.length) {
    return {
      answer:
        "I don’t have a verified listing that matches that yet — I won’t guess a phone number. Dial 211, or open the directory and filter by what you need. If you’re in danger now, call or text 988.",
      steps: [
        "Open the directory and try Crisis, Housing, or Food filters.",
        "Call 211 for local routing.",
        "If you’re unsafe tonight, use the Panic help in the app or call 988.",
      ],
      resources: ["211", "988"],
      citations: [],
      followups: [
        "How old are you (14–17, 18–20, or 21–26)?",
        "Which California county are you in?",
        "Is this about housing, money, school, health, or court?",
      ],
      refuseGuess: true,
    };
  }

  const resourceIds = usable.filter((h) => h.kind === "resource").map((h) => h.id).slice(0, 3);
  const citations = usable.map((h) => ({
    id: h.id,
    kind: h.kind,
    title: h.title,
    href: h.href,
    sourceUrl: h.sourceUrl || null,
    verifiedDate: h.verifiedDate || null,
  }));

  const ageBit = ctx.age ? ` For age ${ctx.age},` : "";
  const countyBit = ctx.county ? ` in ${ctx.county} County,` : "";

  return {
    answer: `Here’s what I can cite from our verified catalog${countyBit}${ageBit} based on what you asked. Confirm hours and eligibility yourself — we don’t invent numbers.`,
    steps: usable.slice(0, 3).map((h) =>
      h.kind === "resource"
        ? `Open ${h.title}${h.verifiedDate ? ` (verified ${h.verifiedDate})` : ""} and call or visit the official link.`
        : `Read the guide “${h.title}” for step-by-step next moves.`
    ),
    resources: resourceIds.length ? resourceIds : ["211"],
    citations,
    followups: [
      ctx.age ? "" : "How old are you?",
      ctx.county ? "" : "Which county are you in?",
      ctx.situation ? "" : "Is this about housing, school, health, money, or court?",
    ].filter(Boolean),
    refuseGuess: false,
  };
}
