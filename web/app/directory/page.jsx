"use client";

/**
 * Resource directory — filters for county, need, verified, 24/7.
 * ZIP/county preference stored in localStorage only (no server PII).
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  VerificationBadge,
} from "@/components/site-chrome";
import { SiteSearch } from "@/components/site-search";
import { RESOURCES } from "@/components/data";
import { CA_COUNTIES, countyFromZip } from "@/lib/ca-counties";
import "../marketing.css";

const NEED_FILTERS = [
  { id: "all", label: "All" },
  { id: "crisis", label: "Crisis", cats: ["Crisis"] },
  { id: "housing", label: "Place to sleep", cats: ["Housing"] },
  { id: "money", label: "Money & jobs", cats: ["Money & Jobs"] },
  { id: "health", label: "Health", cats: ["Health"] },
  { id: "education", label: "School", cats: ["Education"] },
  { id: "legal", label: "Legal / court", cats: ["Legal"] },
  { id: "ilp", label: "My county ILP", cats: ["County ILP"] },
  { id: "food", label: "Food", cats: ["Essentials"] },
];

function readNeedFromUrl() {
  if (typeof window === "undefined") return "all";
  const n = new URLSearchParams(window.location.search).get("need");
  return NEED_FILTERS.some((f) => f.id === n) ? n : "all";
}

export default function DirectoryPage() {
  const [need, setNeed] = useState("all");
  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [only247, setOnly247] = useState(false);
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setNeed(readNeedFromUrl());
    try {
      const saved = localStorage.getItem("aftercare_county");
      const savedZip = localStorage.getItem("aftercare_zip");
      if (saved) setCounty(saved);
      if (savedZip) setZip(savedZip);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      if (county) localStorage.setItem("aftercare_county", county);
      if (zip) localStorage.setItem("aftercare_zip", zip);
    } catch {
      /* ignore */
    }
  }, [county, zip, mounted]);

  const entries = useMemo(() => {
    const needDef = NEED_FILTERS.find((f) => f.id === need);
    return Object.entries(RESOURCES).filter(([, r]) => {
      if (onlyVerified && !r.verified) return false;
      if (only247 && !r.open247) return false;
      if (needDef?.cats && !needDef.cats.includes(r.cat)) return false;
      if (county) {
        const counties = r.counties || (r.county ? [r.county] : ["Statewide"]);
        const ok =
          counties.includes("Statewide") ||
          counties.includes(county) ||
          r.county === county ||
          (r.meta || "").includes(county);
        if (!ok) return false;
      }
      if (q) {
        const hay = `${r.name} ${r.blurb} ${r.cat} ${r.phone || ""}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [need, county, onlyVerified, only247, q]);

  const applyZip = () => {
    const c = countyFromZip(zip);
    if (c) setCounty(c);
  };

  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Directory · {Object.keys(RESOURCES).length}+ listings</p>
          <h1 className="mk-h1">
            Real help. <em>Near you.</em>
          </h1>
          <p className="mk-deck">
            Filter by what you need and your county. ZIP stays in your browser.
            Every listing shows a source and a &ldquo;last verified&rdquo; date when we
            have one.
          </p>
          <SiteSearch />
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap">
          <div className="mk-dir-filters">
            <label>
              County
              <select value={county} onChange={(e) => setCounty(e.target.value)}>
                <option value="">All California</option>
                {CA_COUNTIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              ZIP (optional)
              <div className="mk-dir-zip">
                <input
                  value={zip}
                  onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                  inputMode="numeric"
                  placeholder="92805"
                  aria-label="ZIP code"
                />
                <button type="button" className="mk-btn mk-btn-ghost" onClick={applyZip}>
                  Use ZIP
                </button>
              </div>
            </label>
            <label>
              Filter list
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Name or phone…"
              />
            </label>
          </div>

          <div className="mk-cat-nav" role="tablist" aria-label="Need">
            {NEED_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={need === f.id ? "is-on" : ""}
                onClick={() => {
                  setNeed(f.id);
                  const url = new URL(window.location.href);
                  if (f.id === "all") url.searchParams.delete("need");
                  else url.searchParams.set("need", f.id);
                  window.history.replaceState({}, "", url);
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="mk-dir-toggles">
            <label>
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
              />{" "}
              Verified only
            </label>
            <label>
              <input
                type="checkbox"
                checked={only247}
                onChange={(e) => setOnly247(e.target.checked)}
              />{" "}
              Open 24/7
            </label>
            <span className="mk-dir-count">
              {entries.length} result{entries.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mk-dir-list">
            {entries.map(([id, r]) => (
              <article key={id} id={id} className="mk-dir-card">
                <div className="mk-dir-card-top">
                  <VerificationBadge verified={!!r.verified} />
                  {r.open247 && <span className="mk-badge">24/7</span>}
                  {r.cost === "free" && <span className="mk-badge mk-badge-live">Free</span>}
                </div>
                <h2>{r.name}</h2>
                <p className="mk-dir-meta">
                  {r.cat}
                  {r.meta ? ` · ${r.meta}` : ""}
                  {r.county ? ` · ${r.county}` : ""}
                </p>
                <p>{r.blurb}</p>
                <div className="mk-dir-actions">
                  {r.phone && (
                    <a className="mk-btn mk-btn-primary" href={`tel:${String(r.phone).replace(/\D/g, "")}`}>
                      Call {r.phone}
                    </a>
                  )}
                  {r.url && (
                    <a
                      className="mk-btn mk-btn-ghost"
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Website
                    </a>
                  )}
                  <button
                    type="button"
                    className="mk-btn mk-btn-ghost"
                    onClick={() => window.print()}
                  >
                    Print
                  </button>
                </div>
                <p className="mk-dir-verify">
                  {r.verifiedDate ? (
                    <>
                      Last verified {r.verifiedDate}
                      {r.sourceUrl && (
                        <>
                          {" · "}
                          <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">
                            Source
                          </a>
                        </>
                      )}
                    </>
                  ) : (
                    <span>Needs review — call to confirm</span>
                  )}
                  {" · "}
                  <a href={r.reportMailto || "mailto:hello@aftercare.app?subject=Outdated%20listing"}>
                    Report outdated info
                  </a>
                </p>
              </article>
            ))}
            {entries.length === 0 && (
              <p className="mk-lead">
                Nothing matched. Try another county, dial <a href="tel:211">211</a>, or{" "}
                <Link href="/find">use the needs finder</Link>.
              </p>
            )}
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
