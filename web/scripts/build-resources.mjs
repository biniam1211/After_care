// ───────────────────────────────────────────────────────────
// Generates web/components/resources.generated.js from:
//   1) supabase/seed/resources.sample.csv (curated statewide + orgs)
//   2) web/data/ca-ilp-contacts.json (all 58 CA counties from CDSS)
//
//   node scripts/build-resources.mjs
// ───────────────────────────────────────────────────────────
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const CSV = join(here, "..", "..", "supabase", "seed", "resources.sample.csv");
const ILP = join(here, "..", "data", "ca-ilp-contacts.json");
const OUT = join(here, "..", "components", "resources.generated.js");

const TODAY = new Date().toISOString().slice(0, 10);
const CDSS_ILP_SOURCE =
  "https://cdss.ca.gov/inforesources/foster-care/county-contacts-for-efc-thp-and-ilp";

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
        } else quoted = false;
      } else field += c;
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
    } else if (c !== "\r") field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== "")) rows.push(row);
  return rows;
}

const CATEGORY = {
  housing: { cat: "Housing", catColor: "sky" },
  shelter: { cat: "Housing", catColor: "sky" },
  legal: { cat: "Legal", catColor: "harbor" },
  crisis: { cat: "Crisis", catColor: "panic" },
  mental_health: { cat: "Health", catColor: "mint" },
  health: { cat: "Health", catColor: "mint" },
  education: { cat: "Education", catColor: "harbor" },
  employment: { cat: "Money & Jobs", catColor: "warm" },
  finance: { cat: "Money & Jobs", catColor: "warm" },
  food: { cat: "Essentials", catColor: "mint" },
  community: { cat: "Essentials", catColor: "mint" },
  ilp: { cat: "County ILP", catColor: "harbor" },
};

const ID_OVERRIDES = {
  "Covenant House California": "covenant",
  "211 California": "211",
  "RightWay Foundation": "rightway",
  "James Storehouse": "james",
  "John Burton Advocates for Youth": "jbay",
  "988 Suicide & Crisis Lifeline": "988",
  "The Trevor Project": "trevor",
  iFoster: "ifoster-bank",
  "iFoster — Peers Paving the Path": "ifoster-peers",
  "FosterClub — Who's in Foster Care?": "fosterclub-whos",
  "ED Foster Care Transition Toolkit": "ed-transition-toolkit",
  "California Student Aid Commission (Chafee Grant)": "chafee-grant",
  "California Department of Health Care Services (Medi-Cal)": "medical-ffy",
  "California Foster Care Ombudsperson": "foster-ombuds",
  "Children's Law Center of California": "clc-ca",
  "National Runaway Safeline": "runaway",
  "Crisis Text Line": "crisis-text",
  "National Human Trafficking Hotline": "trafficking",
  "Family Urgent Response System (FURS)": "furs",
  "Sycamores (formerly Hathaway-Sycamores)": "sycamores",
  "CDSS THP-Plus / Transitional Housing Programs": "cdss-thp-plus",
  "CDSS CalFresh": "cdss-calfresh",
  "CCC NextUp (Chancellor's Office)": "ccc-nextup",
  "UC Current and Former Foster Youth Programs": "uc-foster-youth",
  "CSUF Guardian Scholars": "csuf-guardian-scholars",
  "CSULB Guardian Scholars": "csulb-guardian-scholars",
  "Sacramento State Guardian Scholars": "sac-state-guardian-scholars",
  "UCLA Bruin Guardian Scholars": "ucla-bruin-guardian-scholars",
  "UC Riverside Foster Youth Support Services": "ucr-foster-youth",
  "UC Berkeley Hope Scholars": "berkeley-hope-scholars",
  "UC San Diego Hope Scholars": "ucsd-hope-scholars",
  "RightWay Foundation": "rightway",
};

const slugify = (name) =>
  ID_OVERRIDES[name] ||
  name
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);

function buildMeta(address, phone, url, county) {
  if (county) return `${county} County · ILP`;
  if (address) {
    const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
    const city = parts.length > 1 ? parts[parts.length - 2] : parts[0];
    if (city) return city.replace(/\s+CA\s*\d*$/i, "").trim() || "California";
  }
  if (phone) return "Call · Statewide";
  if (url) return "Online · Statewide";
  return "Statewide";
}

/** Known 24/7 lines (from official pages we verified). */
const OPEN_247_IDS = new Set([
  "988",
  "trevor",
  "211",
  "covenant",
  "runaway",
  "crisis-text",
  "trafficking",
  "furs",
]);

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

    let id = slugify(name);
    let n = 2;
    while (seen.has(id)) id = `${slugify(name)}-${n++}`;
    seen.add(id);

    const phone = (r[idx("phone")] || "").trim();
    const url = (r[idx("url")] || "").trim();
    const address = (r[idx("address")] || "").trim();
    const verified = (r[idx("verified")] || "").trim().toLowerCase() === "true";
    if (verified) verifiedCount++;

    const countyCol = idx("counties") >= 0 ? (r[idx("counties")] || "").trim() : "";
    const sourceUrl = (idx("source_url") >= 0 ? r[idx("source_url")] : "") || url;
    const verifiedDate =
      (idx("verified_date") >= 0 ? r[idx("verified_date")] : "") || (verified ? TODAY : "");

    out[id] = {
      name,
      cat: mapped.cat,
      catColor: mapped.catColor,
      blurb: (r[idx("description")] || "").trim(),
      meta: buildMeta(address, phone, url, null),
      phone: phone || null,
      url: url || null,
      address: address || null,
      county: countyCol || null,
      counties: countyCol ? countyCol.split("|").map((s) => s.trim()).filter(Boolean) : ["Statewide"],
      cost: "free",
      open247: OPEN_247_IDS.has(id) || /24\/7|24-7|around the clock/i.test(r[idx("description")] || ""),
      languages: ["en"],
      ages: "14-26",
      situations: [],
      sourceUrl: sourceUrl || null,
      verifiedDate: verifiedDate || null,
      status: verified ? "verified" : "needs_review",
      tag: verified ? "Verified" : null,
      verified,
      keywords: [],
      reportMailto: `mailto:hello@aftercare.app?subject=${encodeURIComponent(`Outdated listing: ${name}`)}`,
    };
  }

  // Merge all 58 county ILP contacts from CDSS official roster.
  if (existsSync(ILP)) {
    const picks = JSON.parse(readFileSync(ILP, "utf8"));
    for (const p of picks) {
      const name = `${p.county} County ILP (CDSS roster)`;
      let id = `ilp-${p.county.toLowerCase().replace(/\s+/g, "-")}`;
      let n = 2;
      while (seen.has(id)) id = `ilp-${p.county.toLowerCase().replace(/\s+/g, "-")}-${n++}`;
      seen.add(id);
      verifiedCount++;
      out[id] = {
        name,
        cat: "County ILP",
        catColor: "harbor",
        blurb: `Independent Living Program / extended foster care contact for ${p.county} County. Listed contact: ${p.contactName}${p.title ? ` (${p.title})` : ""}. Confirm current hours with the county — numbers change.`,
        meta: `${p.county} County · ILP`,
        phone: p.phone || null,
        url: CDSS_ILP_SOURCE,
        address: p.address || null,
        county: p.county,
        counties: [p.county],
        cost: "free",
        open247: false,
        languages: ["en"],
        ages: "14-21",
        situations: ["in-care", "extended-care", "aged-out"],
        sourceUrl: CDSS_ILP_SOURCE,
        verifiedDate: TODAY,
        status: "verified",
        tag: "Verified",
        verified: true,
        keywords: ["ilp", "ab12", "efc", "thp", p.county.toLowerCase()],
        reportMailto: `mailto:hello@aftercare.app?subject=${encodeURIComponent(`Outdated ILP: ${p.county}`)}`,
      };
    }
  }

  // Extra crisis lines we verified by fetching official pages (add if missing).
  const extras = [
    {
      id: "crisis-text",
      name: "Crisis Text Line",
      cat: "Crisis",
      catColor: "panic",
      blurb: "Text HOME to 741741 for free 24/7 crisis support in the U.S.",
      meta: "Text · Nationwide",
      phone: "741741",
      contactMethod: "sms",
      smsBody: "HOME",
      url: "https://www.crisistextline.org/",
      sourceUrl: "https://www.crisistextline.org/",
      open247: true,
      keywords: ["text", "crisis", "741741"],
    },
    {
      id: "trafficking",
      name: "National Human Trafficking Hotline",
      cat: "Crisis",
      catColor: "panic",
      blurb: "24/7 confidential help if you or someone else is being trafficked. Call 1-888-373-7888 or text 233733.",
      meta: "Call · Nationwide",
      phone: "1-888-373-7888",
      url: "https://humantraffickinghotline.org/",
      sourceUrl: "https://humantraffickinghotline.org/",
      open247: true,
      keywords: ["trafficking", "hotline"],
    },
    {
      id: "furs",
      name: "Family Urgent Response System (FURS)",
      cat: "Crisis",
      catColor: "panic",
      blurb: "California 24/7 hotline for current and former foster youth and caregivers needing conflict de-escalation and mobile response. Call 1-833-939-3877.",
      meta: "Call · Statewide CA",
      phone: "1-833-939-3877",
      url: "https://www.familyresponseca.org/",
      sourceUrl: "https://fosteryouthhelp.ca.gov/",
      open247: true,
      keywords: ["furs", "urgent", "foster"],
    },
    {
      id: "runaway",
      name: "National Runaway Safeline",
      cat: "Crisis",
      catColor: "panic",
      blurb: "24/7 support if you have run away or are thinking about it. 1-800-RUNAWAY (1-800-786-2929).",
      meta: "Call · Nationwide",
      phone: "1-800-786-2929",
      url: "https://www.1800runaway.org/",
      sourceUrl: "https://www.1800runaway.org/",
      open247: true,
      keywords: ["runaway", "safeline"],
    },
    {
      id: "cdss-efc",
      name: "CDSS Extended Foster Care (AB 12)",
      cat: "Legal",
      catColor: "harbor",
      blurb:
        "Official California Department of Social Services page on Extended Foster Care: eligibility to age 21, re-entry, participation criteria, and THP-Plus pointers. Confirm your own case with your county.",
      meta: "Official · Statewide CA",
      phone: "916-651-7465",
      url: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12",
      sourceUrl: "https://www.cdss.ca.gov/inforesources/foster-care/extended-foster-care-ab-12",
      open247: false,
      keywords: ["ab12", "efc", "extended", "re-entry", "nmd"],
    },
    {
      id: "cdss-ilp",
      name: "CDSS Independent Living Program (ILP)",
      cat: "Education",
      catColor: "harbor",
      blurb:
        "Official CDSS overview of ILP eligibility (generally ages 16–21) and how to reach your county ILP coordinator. Pair with the county contacts in this directory.",
      meta: "Official · Statewide CA",
      phone: "916-651-7465",
      url: "https://www.cdss.ca.gov/inforesources/foster-care/independent-living-program",
      sourceUrl: "https://www.cdss.ca.gov/inforesources/foster-care/independent-living-program",
      open247: false,
      keywords: ["ilp", "independent living", "tilp"],
    },
    {
      id: "trafficking-text",
      name: "National Human Trafficking Hotline (text)",
      cat: "Crisis",
      catColor: "panic",
      blurb: "Text 233733 for confidential trafficking help 24/7 (same hotline as the voice line).",
      meta: "Text · Nationwide",
      phone: "233733",
      contactMethod: "sms",
      url: "https://humantraffickinghotline.org/",
      sourceUrl: "https://humantraffickinghotline.org/",
      open247: true,
      keywords: ["trafficking", "text", "233733"],
    },
  ];

  for (const e of extras) {
    if (seen.has(e.id) || out[e.id]) {
      // Upgrade existing
      if (out[e.id]) {
        out[e.id] = {
          ...out[e.id],
          ...e,
          counties: out[e.id].counties || ["Statewide"],
          cost: "free",
          languages: ["en"],
          ages: "14-26",
          situations: [],
          verifiedDate: TODAY,
          status: "verified",
          tag: "Verified",
          verified: true,
          reportMailto: `mailto:hello@aftercare.app?subject=${encodeURIComponent(`Outdated listing: ${e.name}`)}`,
        };
        if (!out[e.id].verified) verifiedCount++;
        out[e.id].verified = true;
      }
      continue;
    }
    seen.add(e.id);
    verifiedCount++;
    out[e.id] = {
      address: null,
      county: null,
      counties: ["Statewide"],
      cost: "free",
      languages: ["en", "es"],
      ages: "14-26",
      situations: [],
      verifiedDate: TODAY,
      status: "verified",
      tag: "Verified",
      verified: true,
      reportMailto: `mailto:hello@aftercare.app?subject=${encodeURIComponent(`Outdated listing: ${e.name}`)}`,
      ...e,
    };
  }

  const banner = `// GENERATED FILE — do not edit by hand.
// Sources: supabase/seed/resources.sample.csv + web/data/ca-ilp-contacts.json
// Regenerate: cd web && node scripts/build-resources.mjs
//
// ${Object.keys(out).length} resources (${verifiedCount} verified against official pages / CDSS roster).
// "Verified" = official page or CDSS roster confirmed — NOT a live phone test.
`;

  writeFileSync(
    OUT,
    `${banner}\nexport const GENERATED_RESOURCES = ${JSON.stringify(out, null, 2)};\n`,
    "utf8"
  );
  console.log(
    `Wrote ${Object.keys(out).length} resources (${verifiedCount} verified) → ${OUT}`
  );
};

main();
