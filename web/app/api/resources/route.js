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
// ───────────────────────────────────────────────────────────
import { RESOURCES } from "@/components/data";
import { logError } from "@/lib/log";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const GROQ = `*[_type == "resource" && defined(slug.current)]{
  "id": slug.current, name, cat, catColor, blurb, meta, phone, tag
}`;

export async function GET() {
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

    const r = await fetch(url, { headers, cache: "no-store" });
    if (!r.ok) throw new Error(`sanity ${r.status}`);
    const j = await r.json();
    const rows = Array.isArray(j.result) ? j.result : [];

    const resources = {};
    for (const row of rows) {
      if (!row || !row.id || !row.name) continue;
      resources[row.id] = {
        name: row.name,
        cat: row.cat || "All-in-one",
        catColor: row.catColor || "harbor",
        blurb: row.blurb || "",
        meta: row.meta || "",
        phone: row.phone || null,
        tag: row.tag || "",
      };
    }
    // Merge over the seed so crisis/chat resources always resolve.
    return Response.json({ source: "sanity", resources: { ...RESOURCES, ...resources } });
  } catch (e) {
    logError("resources_sanity_failed", { detail: String(e?.message || e) });
    return Response.json({ source: "seed", resources: RESOURCES });
  }
}
