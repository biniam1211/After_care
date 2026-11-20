// ───────────────────────────────────────────────────────────
// AfterCare — resource directory, optionally sourced from Sanity CMS.
//
// GET → { source: "sanity"|"seed", resources: { [id]: {...} } }
//
// When SANITY_PROJECT_ID + SANITY_DATASET are set, this queries Sanity's HTTP
// query API (GROQ) so non-devs can edit the directory in Sanity Studio. With no
// config (or any error), it returns the bundled seed — the app never breaks.
//
// Expected Sanity document (type "resource"):
//   slug (id), name, cat, catColor, blurb, meta, phone, tag
// Sanity rows do NOT carry `verified` — when a Sanity row overrides a seed
// row, the seed's verified flag is preserved (see below). A listing is
// only "verified" when the seed CSV says so.
// ───────────────────────────────────────────────────────────
import { RESOURCES } from "@/components/data";
import { logError } from "@/lib/log";
import { NATIONAL_CRISIS } from "@/lib/crisis";
import { rateLimit, clientIp, tooManyRequests } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const GROQ = `*[_type == "resource" && defined(slug.current)]{
  "id": slug.current, name, cat, catColor, blurb, meta, phone, tag
}`;

/** National crisis ids whose name/phone must never be overridden by CMS. */
const PINNED_CRISIS = new Set(NATIONAL_CRISIS.map((r) => r.id));

/**
 * Merge Sanity rows over the seed, but pin national crisis phones/names
 * and preserve seed `verified` flags.
 * @param {Record<string, object>} sanityRows
 */
export function mergeResources(sanityRows) {
  const resources = { ...RESOURCES };
  for (const [id, row] of Object.entries(sanityRows || {})) {
    if (!id || !row || !row.name) continue;
    const seed = RESOURCES[id];
    if (PINNED_CRISIS.has(id) && seed) {
      // Keep seed identity for crisis lines; allow blurb/meta refresh only.
      resources[id] = {
        ...seed,
        blurb: row.blurb || seed.blurb,
        meta: row.meta || seed.meta,
        tag: row.tag || seed.tag,
        verified: Boolean(seed.verified),
      };
      continue;
    }
    resources[id] = {
      name: row.name,
      cat: row.cat || "All-in-one",
      catColor: row.catColor || "harbor",
      blurb: row.blurb || "",
      meta: row.meta || "",
      phone: row.phone || null,
      tag: row.tag || "",
      url: row.url || seed?.url || null,
      address: row.address || seed?.address || null,
      verified:
        typeof row.verified === "boolean"
          ? row.verified
          : Boolean(seed?.verified),
    };
  }
  return resources;
}

export async function GET(req) {
  const limited = rateLimit(`resources:${clientIp(req)}`, { limit: 60, windowMs: 60_000 });
  if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

  const project = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  if (!project || !dataset) {
    return Response.json({ source: "seed", resources: RESOURCES });
  }

  try {
    const apiVersion = process.env.SANITY_API_VERSION || "v2021-10-21";
    const url = `https://${project}.api.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(GROQ)}`;
    const headers = { "content-type": "application/json" };
    if (process.env.SANITY_TOKEN) headers.Authorization = `Bearer ${process.env.SANITY_TOKEN}`;

    const ac = new AbortController();
    const timer = setTimeout(() => ac.abort(), 8_000);
    let r;
    try {
      r = await fetch(url, { headers, cache: "no-store", signal: ac.signal });
    } finally {
      clearTimeout(timer);
    }
    if (!r.ok) throw new Error(`sanity ${r.status}`);
    const j = await r.json();
    const rows = Array.isArray(j.result) ? j.result : [];

    const sanityRows = {};
    for (const row of rows) {
      if (!row || !row.id || !row.name) continue;
      sanityRows[row.id] = row;
    }
    return Response.json({ source: "sanity", resources: mergeResources(sanityRows) });
  } catch (e) {
    logError("resources_sanity_failed", { detail: String(e?.message || e).slice(0, 200) });
    return Response.json({ source: "seed", resources: RESOURCES });
  }
}
