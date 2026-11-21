/**
 * Parse a saved CDSS county contacts markdown table into one ILP pick per county.
 * Input: path to fetched markdown. Output: JSON array.
 */
import { readFileSync, writeFileSync } from "node:fs";

const input = process.argv[2];
const output = process.argv[3] || "/tmp/ca-ilp-picks.json";
const text = readFileSync(input, "utf8");
const lines = text
  .split("\n")
  .filter((l) => l.startsWith("|") && !l.includes("---") && !l.includes("County / Program"));

/** @type {Record<string, { contacts: object[] }>} */
const counties = {};
let current = null;

for (const line of lines) {
  const cols = line
    .split("|")
    .map((c) => c.trim())
    .filter((_, i, a) => i > 0 && i < a.length - 1);
  if (cols.length < 6) continue;
  const [prog, name, title, address, email, phone, notes] = cols;

  const looksLikeCounty =
    (!name || name === "") &&
    prog &&
    /^[A-Z]/.test(prog) &&
    !/ILP|EFC|THP|Website|web page|email|http/i.test(prog) &&
    prog === prog.toUpperCase().replace(/COUNTY/i, "COUNTY");

  // County headers are ALL CAPS names like ALAMEDA, LOS ANGELES
  // (sometimes CDSS puts a note like "No ILP page" in the next cell).
  const progTrim = (prog || "").trim();
  const isCountyHeader =
    progTrim &&
    /^[A-Z][A-Z\s\.]+$/.test(progTrim) &&
    !/ILP|EFC|THP|WEB|EMAIL|PAGE|HTTP|FOR GENERAL|OFFICE MAIN/i.test(progTrim) &&
    (!name || name === "" || /no ilp|n\/a|none/i.test(name));
  if (isCountyHeader) {
    current = progTrim;
    if (!counties[current]) counties[current] = { contacts: [] };
    continue;
  }
  if (!current) continue;
  if (/website|web page|web information|emailbox/i.test(prog) && !/\d{3}/.test(phone || "")) continue;
  if (!phone || !/\d{3}/.test(phone)) continue;

  const isIlp = /ILP/i.test(prog) || /ILP|Independent Living/i.test(title || "");
  counties[current].contacts.push({
    prog,
    name,
    title,
    address,
    email,
    phone: String(phone).replace(/Desk:\s*/i, "").split(/Cell:/i)[0].trim(),
    notes: notes || "",
    isIlp,
  });
}

function formatPhone(raw) {
  // Take the first 10-digit NANP number; ignore extensions.
  const match = String(raw).match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
  if (!match) return null;
  const digits = match[0].replace(/\D/g, "");
  if (digits.length !== 10) return null;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const picks = [];
for (const [county, data] of Object.entries(counties)) {
  const ilps = data.contacts.filter((c) => c.isIlp);
  const pick =
    ilps.find((c) => /coordinator/i.test(c.title || "")) || ilps[0] || data.contacts[0];
  if (!pick) continue;
  const phone = formatPhone(pick.phone);
  if (!phone) continue;
  const pretty = county
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
  picks.push({
    county: pretty,
    contactName: pick.name || "ILP office",
    title: pick.title || "ILP contact",
    phone,
    address: pick.address || "",
    email: pick.email || "",
  });
}

writeFileSync(output, JSON.stringify(picks, null, 2));
console.log(`Wrote ${picks.length} county ILP picks → ${output}`);
console.log(picks.map((p) => p.county).join(", "));
