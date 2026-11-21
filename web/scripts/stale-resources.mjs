#!/usr/bin/env node
/**
 * Flags resource listings that are stale (>90 days) or have broken links.
 * Exit 0 always when run locally; prints a markdown report.
 * CI can open an issue from the report output.
 *
 *   node scripts/stale-resources.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const GEN = join(here, "..", "components", "resources.generated.js");
const OUT = join(here, "..", "..", "docs", "research", "stale-resources.md");
const DAYS = 90;

const src = readFileSync(GEN, "utf8");
const match = src.match(/export const GENERATED_RESOURCES = (\{[\s\S]*\});?\s*$/);
const data = match ? JSON.parse(match[1]) : {};
const now = Date.now();
const cutoff = now - DAYS * 24 * 60 * 60 * 1000;

async function checkUrl(url) {
  if (!url) return { ok: false, status: "no-url" };
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(12000),
      headers: { "user-agent": "AfterCareStaleCheck/1.0" },
    });
    if (res.status === 405 || res.status === 403) {
      const getRes = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(12000),
        headers: { "user-agent": "AfterCareStaleCheck/1.0" },
      });
      return { ok: getRes.ok || getRes.status < 500, status: getRes.status };
    }
    return { ok: res.ok || res.status < 500, status: res.status };
  } catch (e) {
    return { ok: false, status: String(e.name || e.message) };
  }
}

const stale = [];
const broken = [];

for (const [id, r] of Object.entries(data)) {
  if (!r.verified) continue;
  const d = r.verifiedDate ? Date.parse(r.verifiedDate) : NaN;
  if (!Number.isFinite(d) || d < cutoff) {
    stale.push({ id, name: r.name, verifiedDate: r.verifiedDate || "missing", url: r.sourceUrl || r.url });
  }
}

const urls = new Map();
for (const row of stale) {
  if (!row.url) continue;
  if (!urls.has(row.url)) urls.set(row.url, []);
  urls.get(row.url).push(row);
}

// Also spot-check a sample of verified URLs for breakage
for (const [id, r] of Object.entries(data)) {
  if (!r.verified) continue;
  const url = r.sourceUrl || r.url;
  if (!url) continue;
  if (!urls.has(url)) urls.set(url, [{ id, name: r.name, verifiedDate: r.verifiedDate, url }]);
}

let checked = 0;
for (const [url, list] of urls) {
  if (checked > 40) break; // keep CI light; full check is check-resource-links
  const res = await checkUrl(url);
  checked++;
  if (!res.ok) {
    for (const row of list) broken.push({ ...row, status: res.status });
  }
}

const md = `# Stale / broken resource monitor

**Generated:** ${new Date().toISOString().slice(0, 10)}  
**Policy:** verified listings should be re-checked within ${DAYS} days.

## Stale verified dates (${stale.length})

${
  stale.length
    ? stale
        .map((s) => `| ${s.name} | ${s.verifiedDate} | ${s.url || "—"} |`)
        .join("\n")
        .replace(/^/, "| Name | Verified date | URL |\n| --- | --- | --- |\n")
    : "_None._"
}

## Broken links spotted this run (${broken.length})

${
  broken.length
    ? broken
        .map((s) => `| ${s.name} | ${s.status} | ${s.url || "—"} |`)
        .join("\n")
        .replace(/^/, "| Name | Status | URL |\n| --- | --- | --- |\n")
    : "_None in sample._"
}

## Action

Maintainers should re-verify stale rows (update \`verified_date\` / CSV) or mark needs_review.
`;

writeFileSync(OUT, md, "utf8");
console.log(`Wrote ${OUT} (stale=${stale.length}, broken_sample=${broken.length})`);

if (process.env.GITHUB_STEP_SUMMARY) {
  writeFileSync(process.env.GITHUB_STEP_SUMMARY, md, { flag: "a" });
}

// Non-zero only when explicitly requested (CI issue opener can key off output).
if (process.env.STALE_FAIL === "1" && (stale.length || broken.length)) {
  process.exit(1);
}
