// ───────────────────────────────────────────────────────────
// Generates web/components/resources.generated.js from the curated resource
// list in supabase/seed/resources.sample.csv.
//
// The CSV is the source of truth — it is the list that gets phone-verified
// (see supabase/seed/README.md). This script exists so the web app ships that
// same list instead of a hand-written handful, and so re-verifying is a matter
// of editing the CSV and re-running:
//
//   node scripts/build-resources.mjs
//
// The AI chat picks resources from an enum of these ids and the server
// re-validates every id it returns, so anything not in here cannot be
// recommended to a youth. That is the safety property; this script is how the
// list behind it gets big enough to be useful.
// ───────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const CSV = join(here, "..", "..", "supabase", "seed", "resources.sample.csv");
const OUT = join(here, "..", "components", "resources.generated.js");

/** Minimal RFC-4180 parser: handles quoted fields containing commas. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      if (row.some((f) => f.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") {
      field += c;
    }
  }

  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

// CSV category → the app's display category + tone.
const CATEGORY = {
  housing: { cat: "Housing", catColor: "sky" },
  shelter: { cat: "Housing", catColor: "sky" },
  legal: { cat: "Legal", catColor: "harbor" },
  crisis: { cat: "Crisis", catColor: "panic" },
  mental_health: { cat: "Health", catColor: "mint" },
  health: { cat: "Health", catColor: "mint" },
  education: { cat: "Education", catColor: "grad" },
  employment: { cat: "Money & Jobs", catColor: "warm" },
  finance: { cat: "Money & Jobs", catColor: "warm" },
  food: { cat: "Essentials", catColor: "mint" },
  community: { cat: "Essentials", catColor: "mint" },
};

// "Education" has no tone of its own in the palette; harbor reads closest.
const TONE_FALLBACK = { grad: "harbor" };

// Rows that describe the same organisation as a hand-written entry in data.js
// are pinned to that entry's id, so the curated copy overrides the CSV row
// instead of the app listing the same place twice under two names.
const ID_OVERRIDES = {
  "Covenant House California": "covenant",
  "211 California": "211",
  "RightWay Foundation": "rightway",
  "James Storehouse": "james",
  "John Burton Advocates for Youth": "jbay",
  "988 Suicide & Crisis Lifeline": "988",
  "The Trevor Project": "trevor",
  iFoster: "ifoster-bank",
  "California Student Aid Commission (Chafee Grant)": "chafee-grant",
  "California Department of Health Care Services (Medi-Cal)": "medical-ffy",
};

const slugify = (name) =>
  ID_OVERRIDES[name] ||
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

/** A short, scannable second line: where it is, or how you reach it. */
function buildMeta(address, phone, url) {
  if (address) {
    // Keep the city/neighbourhood, drop the street number noise.
    const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
    const city = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    if (city) return city.replace(/\s+CA\s*\d*$/i, "").trim() || "California";
  }
  if (phone) return "Call · Statewide";
  if (url) return "Online · Statewide";
  return "Statewide";
}

const main = () => {
  const rows = parseCsv(readFileSync(CSV, "utf8"));
  const header = rows[0].map((h) => h.trim());
  const idx = (k) => header.indexOf(k);

  const seen = new Set();
  const out = {};
  let verifiedCount = 0;

  for (const r of rows.slice(1)) {
    const name = (r[idx("name")] || "").trim();
    if (!name) continue;

    const rawCat = (r[idx("category")] || "").trim().toLowerCase();
    const mapped = CATEGORY[rawCat] || { cat: "Essentials", catColor: "mint" };
    const catColor = TONE_FALLBACK[mapped.catColor] || mapped.catColor;

    let id = slugify(name);
    let n = 2;
    while (seen.has(id)) id = `${slugify(name)}-${n++}`;
    seen.add(id);

    const phone = (r[idx("phone")] || "").trim();
    const url = (r[idx("url")] || "").trim();
    const address = (r[idx("address")] || "").trim();
    const verified = (r[idx("verified")] || "").trim().toLowerCase() === "true";
    if (verified) verifiedCount++;

    out[id] = {
      name,
      cat: mapped.cat,
      catColor,
      blurb: (r[idx("description")] || "").trim(),
      meta: buildMeta(address, phone, url),
      phone: phone || null,
      url: url || null,
      address: address || null,
      // Surfaced in the UI so a youth can tell a phone-checked number from one
      // that is merely listed.
      tag: verified ? "Verified" : null,
      verified,
    };
  }

  const banner = `// GENERATED FILE — do not edit by hand.
// Source: supabase/seed/resources.sample.csv
// Regenerate: cd web && node scripts/build-resources.mjs
//
// ${Object.keys(out).length} resources (${verifiedCount} phone-verified).
`;

  writeFileSync(
    OUT,
    `${banner}\nexport const GENERATED_RESOURCES = ${JSON.stringify(out, null, 2)};\n`,
    "utf8"
  );

  console.log(
    `Wrote ${Object.keys(out).length} resources (${verifiedCount} verified) to ${OUT}`
  );
};

main();
