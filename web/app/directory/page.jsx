"use client";

/**
 * Resource directory — filters for county, need, verified, 24/7.
 * ZIP/county preference stored in localStorage only (no server PII).
 */
import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  VerificationBadge,
} from "@/components/site-chrome";
import { SiteSearch } from "@/components/site-search";
import { RESOURCES } from "@/components/data";
import { CA_COUNTIES, countyFromZip } from "@/lib/ca-counties";
import { contactHref } from "@/lib/contact-href";
import "../marketing.css";

const NEED_FILTERS = [
  { id: "all", label: "All" },
  {
    id: "crisis",
    label: "Crisis",
    match: (r) =>
      r.cat === "Crisis" ||
      r.id === "211" ||
      /\b211\b|crisis|988|hotline|safeline|trafficking|741741/i.test(
        `${r.name} ${r.blurb} ${r.phone || ""}`
      ),
  },
  { id: "housing", label: "Place to sleep", cats: ["Housing"] },
  { id: "money", label: "Money & jobs", cats: ["Money & Jobs"] },
  { id: "health", label: "Health", cats: ["Health"] },
  { id: "education", label: "School", cats: ["Education"] },
  { id: "legal", label: "Legal / court", cats: ["Legal"] },
  { id: "ilp", label: "My county ILP", cats: ["County ILP"] },
  {
    id: "food",
    label: "Food",
    match: (r) =>
      /food|calfresh|snap|ebt|meal|hungry|nutrition|farmers market/i.test(
        `${r.name} ${r.blurb}`
      ),
  },
];

function matchesNeed(needId, id, r) {
  const needDef = NEED_FILTERS.find((f) => f.id === needId);
  if (!needDef || needId === "all") return true;
  if (typeof needDef.match === "function") return needDef.match({ ...r, id });
  if (needDef.cats) return needDef.cats.includes(r.cat);
  return true;
}

function DirectoryFallback() {
  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Directory</p>
          <h1 className="mk-h1">
            Real help. <em>Near you.</em>
          </h1>
          <p className="mk-deck">Loading filters…</p>
        </div>
      </header>
      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}

function DirectoryInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const needParam = searchParams.get("need") || "all";
  const focusId = searchParams.get("focus") || "";
  const need = NEED_FILTERS.some((f) => f.id === needParam) ? needParam : "all";

  const [county, setCounty] = useState("");
  const [zip, setZip] = useState("");
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [only247, setOnly247] = useState(false);
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
      else localStorage.removeItem("aftercare_county");
      if (zip) localStorage.setItem("aftercare_zip", zip);
      else localStorage.removeItem("aftercare_zip");
    } catch {
      /* ignore */
    }
  }, [county, zip, mounted]);

  useEffect(() => {
    if (!focusId || !mounted) return;
    const el = document.getElementById(focusId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [focusId, mounted, need, county]);

  const entries = useMemo(() => {
    return Object.entries(RESOURCES).filter(([id, r]) => {
      // Always surface a search deep-link target even if filters would hide it.
      if (focusId && id === focusId) return true;
      if (onlyVerified && !r.verified) return false;
      if (only247 && !r.open247) return false;
      if (!matchesNeed(need, id, r)) return false;
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
  }, [need, county, onlyVerified, only247, q, focusId]);

  const applyZip = () => {
    const c = countyFromZip(zip);
    if (c) setCounty(c);
  };

  const setNeed = (id) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("need");
    else params.set("need", id);
    // Changing need clears a prior focus so filters stay honest.
    params.delete("focus");
    const qs = params.toString();
    router.replace(qs ? `/directory?${qs}` : "/directory", { scroll: false });
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
                onClick={() => setNeed(f.id)}
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
            {entries.map(([id, r]) => {
              const contact = contactHref(r);
              return (
                <article
                  key={id}
                  id={id}
                  className={`mk-dir-card${focusId === id ? " is-focus" : ""}`}
                >
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
                    {contact && (
                      <a className="mk-btn mk-btn-primary" href={contact.href}>
                        {contact.label}
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
              );
            })}
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

export default function DirectoryPage() {
  return (
    <Suspense fallback={<DirectoryFallback />}>
      <DirectoryInner />
    </Suspense>
  );
}
