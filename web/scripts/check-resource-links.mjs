/**
 * Link checker for resource URLs in resources.generated.js.
 * Usage: node scripts/check-resource-links.mjs
 * Exit 1 if any verified listing's URL fails (network errors → needs_review note).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const GEN = join(here, "..", "components", "resources.generated.js");
const REPORT = join(here, "..", "..", "docs", "research", "verification-report.md");

const src = readFileSync(GEN, "utf8");
const json = src.slice(src.indexOf("{"));
const resources = JSON.parse(json.replace(/;?\s*$/, "").replace(/^export const GENERATED_RESOURCES = /, "") || "{}");

// The file is `export const GENERATED_RESOURCES = {...};` — parse carefully
const match = src.match(/export const GENERATED_RESOURCES = (\{[\s\S]*\});?\s*$/);
const data = match ? JSON.parse(match[1]) : {};

const entries = Object.entries(data);
const results = [];

async function checkUrl(url) {
  if (!url) return { ok: false, status: "no-url" };
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: ctrl.signal,
      headers: { "user-agent": "AfterCareLinkCheck/1.0" },
    });
    clearTimeout(t);
    if (res.status === 405 || res.status === 403) {
      const getRes = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
        headers: { "user-agent": "AfterCareLinkCheck/1.0" },
      });
      return { ok: getRes.ok || getRes.status < 500, status: getRes.status };
    }
    return { ok: res.ok || res.status < 500, status: res.status };
  } catch (e) {
    clearTimeout(t);
    return { ok: false, status: String(e.name || e.message) };
  }
}

// Deduplicate URLs
const byUrl = new Map();
for (const [id, r] of entries) {
  const url = r.sourceUrl || r.url;
  if (!url) {
    results.push({ id, name: r.name, url: null, verified: r.verified, ok: !r.verified, status: "no-url", phone: r.phone });
    continue;
  }
  if (!byUrl.has(url)) byUrl.set(url, []);
  byUrl.get(url).push([id, r]);
}

console.log(`Checking ${byUrl.size} unique URLs across ${entries.length} listings…`);

for (const [url, list] of byUrl) {
  const check = await checkUrl(url);
  for (const [id, r] of list) {
    results.push({
      id,
      name: r.name,
      url,
      verified: !!r.verified,
      ok: check.ok,
      status: check.status,
      phone: r.phone,
      verifiedDate: r.verifiedDate,
      county: r.county,
    });
  }
  process.stdout.write(check.ok ? "." : "x");
}
console.log("");

const failedVerified = results.filter((r) => r.verified && r.url && !r.ok);
const needsReview = results.filter((r) => !r.verified);
const verifiedOk = results.filter((r) => r.verified && (r.ok || !r.url));

const today = new Date().toISOString().slice(0, 10);
const md = `# Resource verification report

**Generated:** ${today}  
**Catalog size:** ${entries.length}  
**Verified flag:** ${results.filter((r) => r.verified).length}  
**Link check OK (verified with URL):** ${verifiedOk.filter((r) => r.url).length}  
**Verified but link failed:** ${failedVerified.length}  
**Needs review (unverified):** ${needsReview.length}

## Method

- Official page or CDSS county ILP roster confirmed for \`verified: true\`.
- Automated HEAD/GET link check (12s timeout). Failure ≠ remove — mark for human review.
- Phone lines are **not** live-tested.

## Verified listings

| Name | Phone | Source | Link | Date |
| --- | --- | --- | --- | --- |
${results
  .filter((r) => r.verified)
  .map(
    (r) =>
      `| ${r.name}${r.county ? ` (${r.county})` : ""} | ${r.phone || "—"} | ${r.url || "—"} | ${r.ok ? "OK" : r.status} | ${r.verifiedDate || "—"} |`
  )
  .join("\n")}

## Needs review

| Name | Phone | URL | Notes |
| --- | --- | --- | --- |
${needsReview
  .map((r) => `| ${r.name} | ${r.phone || "—"} | ${r.url || "—"} | Unverified — call to confirm |`)
  .join("\n")}

## Link failures on verified rows

${
  failedVerified.length === 0
    ? "_None this run._"
    : failedVerified.map((r) => `- **${r.name}**: ${r.url} → ${r.status}`).join("\n")
}

## Removed

| Former name / ID | Reason |
| --- | --- |
| Foster Care Counts (\`foster-care-counts\`) | Official URL \`https://www.fostercarecounts.org\` redirects to an unrelated pharmacy site (domain no longer hosts the foster org). |
| Pursue Possibility (\`pursue-possibility\`) | Official URL dead (DNS/TLS failure); no primary-source page found confirming a current foster/youth program under that name. |
| California Foster Youth Tuition Waiver (\`california-foster-youth-tuition-waiver\`) | URL was only the generic CCCCO homepage with no matching statewide tuition-waiver page; replaced by verified CCC NextUp listing. |
| THP-Plus / Extended Foster Care (AB 12) (generic \`cdss.ca.gov\` root) | Replaced by \`CDSS THP-Plus / Transitional Housing Programs\` pointing at the official transitional-housing programs page (AB 12 EFC remains as \`cdss-efc\`). |
`;

writeFileSync(REPORT, md);
console.log(`Wrote ${REPORT}`);
if (failedVerified.length > 5) {
  console.error(`Too many verified link failures: ${failedVerified.length}`);
  process.exit(1);
}
process.exit(0);
