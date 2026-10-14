"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui";
import { Logo } from "@/components/onboarding";
import { RESOURCES, RESOURCE_CATEGORIES } from "@/components/data";
import { VerificationBadge } from "@/components/site-chrome";
import "./services.css";

const ZIP_PRESETS = [
  { label: "All California", zip: "" },
  { label: "Orange County (92868)", zip: "92868" },
  { label: "Los Angeles (90012)", zip: "90012" },
  { label: "San Diego (92101)", zip: "92101" },
  { label: "Bay Area (94103)", zip: "94103" },
  { label: "Sacramento (95814)", zip: "95814" },
];

const FAQS = [
  {
    q: "How do I find local resources for foster youth?",
    a: "Start by entering your ZIP code in the search bar above or selecting your region. You can filter across 8 core categories like Housing, Healthcare, College Aid, and Money. Each program card shows phone numbers, direct website links, and an 'Ask AfterCare AI' option to get personalized application guidance. Listings marked “Verified” had their official page confirmed; the rest say “Unverified — call to confirm.”",
  },
  {
    q: "Do I need to prove my foster care status to access these services?",
    a: "No! The resource directory is completely open and free for anyone to browse. Many services (like food banks, shelters, and crisis lines) assist anyone in need. For foster-specific benefits (like the Chafee Grant or FFY Medi-Cal), the program will explain what simple verification (such as a ward-of-the-court letter) is required, and AfterCare can help you request it from your county.",
  },
  {
    q: "What is Former Foster Youth Medi-Cal to 26?",
    a: "If you were in foster care in California on your 18th birthday, you may be entitled to free Medi-Cal coverage until age 26. Most foster youth never find out they qualify. Confirm your own eligibility with your county Medi-Cal office — AfterCare can help you figure out what to ask.",
  },
  {
    q: "What is the California Chafee Grant and how do I apply?",
    a: "The California Chafee Grant provides up to $5,000 per academic year for college, university, or trade school that you never have to pay back. If you were in foster care at least one day between ages 16 and 18 and are under 26, you qualify. Submit your FAFSA or CA Dream Act first, then submit the Chafee application at chafee.csac.ca.gov.",
  },
  {
    q: "What should I do if I am homeless or facing eviction tonight?",
    a: "Do not wait. Tap the red 'SOS Emergency' button or call 211 / Covenant House California at 1-800-388-3888 (free, open 24/7). Emergency shelter help is available — call now. If you are under 21 in extended foster care (AB 12), your caseworker or county ILP may be able to arrange immediate crisis placement.",
  },
  {
    q: "Is AfterCare and this directory free to use?",
    a: "Yes, 100% free forever for all current and former foster youth. There are no paywalls, no trials, and no selling of your data. The platform is built by foster care alumni to make sure no young person has to navigate independence alone.",
  },
];

export default function ServicesPage() {
  const [zipInput, setZipInput] = useState("");
  const [activeZip, setActiveZip] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterVerified, setFilterVerified] = useState(false);
  const [filter247, setFilter247] = useState(false);
  const [filterSavedOnly, setFilterSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [screenerOpen, setScreenerOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  // Benefits screener state — start unanswered ("") so the results
  // below never assert a match before the youth has answered anything.
  const [screenerAge, setScreenerAge] = useState("");
  const [screenerInCare13, setScreenerInCare13] = useState("");
  const [screenerInCare18, setScreenerInCare18] = useState("");
  const [screenerNeed, setScreenerNeed] = useState("housing");

  // Load saved bookmarks from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("aftercare_saved_resources");
      if (stored) setSavedIds(JSON.parse(stored));
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Save bookmarks to localStorage
  const toggleSave = (id) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem("aftercare_saved_resources", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const handleZipSubmit = (e) => {
    e?.preventDefault();
    setActiveZip(zipInput.trim());
  };

  const handlePresetZip = (z) => {
    setZipInput(z);
    setActiveZip(z);
  };

  // Convert resources object to list with category mapping
  const allResources = useMemo(() => {
    return Object.entries(RESOURCES).map(([id, r]) => ({
      id,
      ...r,
      is247:
        (r.tag && r.tag.includes("24/7")) ||
        (r.blurb && r.blurb.includes("24/7")) ||
        (r.meta && r.meta.includes("24/7")),
    }));
  }, []);

  // Filtered resources based on user selections
  const filteredResources = useMemo(() => {
    return allResources.filter((item) => {
      // Category filter
      if (selectedCat !== "all") {
        if (selectedCat === "Housing" && item.cat !== "Housing") return false;
        if (selectedCat === "Money & Jobs" && item.cat !== "Money & Jobs") return false;
        if (selectedCat === "Health" && item.cat !== "Health") return false;
        if (selectedCat === "Education" && item.cat !== "Education") return false;
        if (selectedCat === "Legal" && item.cat !== "Legal") return false;
        if (selectedCat === "Crisis" && item.cat !== "Crisis") return false;
        if (selectedCat === "Essentials" && item.cat !== "Essentials") return false;
        if (selectedCat === "All-in-one" && item.cat !== "All-in-one") return false;
      }

      // Saved only toggle
      if (filterSavedOnly && !savedIds.includes(item.id)) {
        return false;
      }

      // Verified toggle — the `verified` boolean is the ONLY signal.
      // Never fall back to the tag string: tags are descriptive copy
      // ("Open 24/7", "Free"), not verification.
      if (filterVerified && !item.verified) {
        return false;
      }

      // 24/7 toggle
      if (filter247 && !item.is247) {
        return false;
      }

      // ZIP / Area filter
      if (activeZip) {
        const text = `${item.meta || ""} ${item.blurb || ""} ${item.name || ""} ${item.address || ""}`.toLowerCase();
        // If Orange County ZIPs (928xx, 926xx)
        if (activeZip.startsWith("928") || activeZip.startsWith("926")) {
          const matchOC = text.includes("orange") || text.includes("oc") || text.includes("statewide") || text.includes("nationwide") || text.includes("california");
          if (!matchOC) return false;
        }
        // If LA County ZIPs (900xx - 918xx)
        else if (activeZip.startsWith("90") || activeZip.startsWith("91")) {
          const matchLA = text.includes("la") || text.includes("los angeles") || text.includes("hollywood") || text.includes("statewide") || text.includes("nationwide") || text.includes("california");
          if (!matchLA) return false;
        }
        // If San Diego ZIPs (919xx - 921xx)
        else if (activeZip.startsWith("919") || activeZip.startsWith("920") || activeZip.startsWith("921")) {
          const matchSD = text.includes("san diego") || text.includes("statewide") || text.includes("nationwide") || text.includes("california");
          if (!matchSD) return false;
        }
        // If Bay Area ZIPs (94xxx)
        else if (activeZip.startsWith("94")) {
          const matchBay = text.includes("bay") || text.includes("san francisco") || text.includes("oakland") || text.includes("alameda") || text.includes("statewide") || text.includes("nationwide") || text.includes("california");
          if (!matchBay) return false;
        }
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const fullContent = `${item.name} ${item.blurb} ${item.cat} ${item.meta || ""} ${item.tag || ""}`.toLowerCase();
        if (!fullContent.includes(q)) return false;
      }

      return true;
    });
  }, [allResources, selectedCat, filterSavedOnly, savedIds, filterVerified, filter247, activeZip, searchQuery]);

  return (
    <div className="services-page">
      {/* ── Top accent gradient stripe ── */}
      <div className="sv-accent-bar" />

      {/* ── Navigation ── */}
      <nav className="sv-nav">
        <div className="sv-nav-inner">
          <Link href="/" className="sv-brand">
            <Logo size={32} r={10} />
            AfterCare
            <span className="sv-brand-tag">Services</span>
          </Link>

          <div className="sv-nav-links">
            <Link href="/" className="sv-nav-link">
              Home
            </Link>
            <Link href="/services" className="sv-nav-link active">
              Find Services
            </Link>
            <Link href="/app" className="sv-nav-link">
              AI Navigator
            </Link>
            <Link href="/programs" className="sv-nav-link">
              Programs
            </Link>
            <Link href="/about" className="sv-nav-link">
              Our Story
            </Link>
          </div>

          <div className="sv-nav-actions">
            <Link href="/app" className="sv-btn-sos">
              <Icon name="shield" size={16} color="var(--fg-panic)" sw={2.2} />
              SOS Panic
            </Link>
            <Link href="/app" className="sv-btn-app">
              Open App <Icon name="arrowR" size={16} color="#fff" sw={2.5} />
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <header className="sv-hero">
        <div className="sv-hero-mesh" />
        <div className="sv-hero-glow-1" />
        <div className="sv-hero-glow-2" />

        <div className="sv-hero-content">
          <div className="sv-badge">
            <Icon name="sparkle" size={16} color="var(--fg-orange)" sw={2.2} />
            <span>AI-Powered Resource Navigator · Curated for Foster Youth</span>
          </div>

          <h1 className="sv-h1">Find Local Services Near You</h1>

          <p className="sv-hero-sub">
            Search free and low-cost programs for food, housing, healthcare, employment, college grants, and legal rights. Your ZIP code connects you directly to help in your community. Listings marked “Verified” had their official page confirmed — the rest say “Unverified — call to confirm.”
          </p>
        </div>
      </header>

      {/* ── Interactive Search & Filter Section ── */}
      <main className="sv-container">
        <section className="sv-search-section">
          <div className="sv-search-card">
            {/* Search Input Controls */}
            <form onSubmit={handleZipSubmit} className="sv-search-inputs">
              {/* ZIP Input */}
              <div className="sv-input-wrap">
                <span className="sv-input-icon">
                  <Icon name="pin" size={22} color="var(--fg-text-faint)" sw={2} />
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Enter ZIP code (e.g. 92868)"
                  className="sv-input"
                  value={zipInput}
                  onChange={(e) => setZipInput(e.target.value)}
                  maxLength={10}
                />
              </div>

              {/* Keyword Search */}
              <div className="sv-input-wrap">
                <span className="sv-input-icon">
                  <Icon name="search" size={20} color="var(--fg-text-faint)" sw={2} />
                </span>
                <input
                  type="text"
                  placeholder="Search by keyword, topic, or provider (e.g. FAFSA, shelter, dental)..."
                  className="sv-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Search button */}
              <button type="submit" className="sv-btn-search">
                <Icon name="search" size={18} color="#fff" sw={2.2} />
                Find Programs
              </button>
            </form>

            {/* Quick ZIP Presets */}
            <div className="sv-presets">
              <span className="sv-presets-label">Popular Areas:</span>
              {ZIP_PRESETS.map((p) => {
                const isActive = activeZip === p.zip;
                return (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePresetZip(p.zip)}
                    className={`sv-preset-btn ${isActive ? "active" : ""}`}
                  >
                    {p.label}
                  </button>
                );
              })}
              {activeZip && (
                <button
                  type="button"
                  onClick={() => handlePresetZip("")}
                  style={{ fontSize: 12, color: "var(--fg-panic)", fontWeight: 700, marginLeft: 6 }}
                >
                  Clear ZIP ×
                </button>
              )}
            </div>

            {/* Category Selector Pills */}
            <div className="sv-categories">
              {RESOURCE_CATEGORIES.map((cat) => {
                const active = selectedCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCat(cat.id)}
                    className={`sv-category-pill ${active ? "active" : ""}`}
                  >
                    <Icon
                      name={cat.icon || "grid"}
                      size={18}
                      color={active ? "#ffffff" : "currentColor"}
                      sw={active ? 2.2 : 2}
                    />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Sub-filters & Benefits Screener Trigger */}
            <div className="sv-subfilters">
              <div className="sv-filter-toggles">
                <button
                  type="button"
                  onClick={() => setFilterVerified(!filterVerified)}
                  className={`sv-filter-chip ${filterVerified ? "on" : ""}`}
                >
                  ✓ Verified Only
                </button>
                <button
                  type="button"
                  onClick={() => setFilter247(!filter247)}
                  className={`sv-filter-chip ${filter247 ? "on" : ""}`}
                >
                  ⚡ Open 24/7
                </button>
                <button
                  type="button"
                  onClick={() => setFilterSavedOnly(!filterSavedOnly)}
                  className={`sv-filter-chip ${filterSavedOnly ? "on" : ""}`}
                >
                  ★ Saved ({savedIds.length})
                </button>
              </div>

              <button
                type="button"
                onClick={() => setScreenerOpen(true)}
                className="sv-screener-cta-btn"
              >
                <Icon name="sparkle" size={16} color="var(--fg-orange-deep)" sw={2.2} />
                Quick Benefits Screener (60s Quiz)
              </button>
            </div>
          </div>
        </section>

        {/* ── Results Header ── */}
        <div className="sv-results-header">
          <div className="sv-results-count">
            Showing <b>{filteredResources.length}</b> programs
            {activeZip ? ` near ${activeZip}` : " in California & Nationwide"}
            {selectedCat !== "all" ? ` · Category: ${selectedCat}` : ""}
            {" · "}
            {allResources.filter((r) => r.verified).length} verified listings in the full catalog — the rest are marked “Unverified — call to confirm.”
          </div>

          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {savedIds.length > 0 && (
              <button
                type="button"
                onClick={() => setFilterSavedOnly(!filterSavedOnly)}
                className="sv-saved-count-pill"
              >
                ★ {savedIds.length} Saved {filterSavedOnly ? "(Active)" : ""}
              </button>
            )}
          </div>
        </div>

        {/* ── Program Cards Grid ── */}
        {filteredResources.length === 0 ? (
          <div className="sv-empty">
            <Icon name="search" size={44} color="var(--fg-text-faint)" sw={1.5} />
            <h3 className="sv-empty-title">No matching programs found</h3>
            <p className="sv-empty-sub">
              Try broadening your search, clearing active filters, or asking AfterCare AI directly for assistance.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
                setActiveZip("");
                setZipInput("");
                setFilterVerified(false);
                setFilter247(false);
                setFilterSavedOnly(false);
              }}
              className="sv-btn-search"
              style={{ display: "inline-flex" }}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="sv-grid">
            {filteredResources.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const toneClass = item.catColor || "harbor";

              return (
                <div key={item.id} className="sv-card">
                  <div className="sv-card-top">
                    <div className="sv-card-badges">
                      <span className={`sv-badge-cat ${toneClass}`}>
                        {item.cat || "Resource"}
                      </span>
                      {item.verified ? (
                        <span className="sv-badge-verified">
                          ✓ Verified
                        </span>
                      ) : (
                        <VerificationBadge verified={false} />
                      )}
                      {item.tag && item.tag !== "Verified" && (
                        <span className="sv-badge-cat harbor">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleSave(item.id)}
                      className={`sv-card-bookmark ${isSaved ? "saved" : ""}`}
                      title={isSaved ? "Remove from saved" : "Save resource"}
                    >
                      <Icon
                        name={isSaved ? "star" : "heart"}
                        size={18}
                        color={isSaved ? "var(--fg-orange-deep)" : "currentColor"}
                        fill={isSaved ? "var(--fg-orange-deep)" : "none"}
                        sw={2}
                      />
                    </button>
                  </div>

                  <h3 className="sv-card-title">{item.name}</h3>
                  <p className="sv-card-desc">{item.blurb}</p>

                  <div className="sv-card-meta">
                    <Icon name="pin" size={15} color="var(--fg-text-faint)" sw={2} />
                    <span>{item.meta || "California Statewide"}</span>
                  </div>

                  <div className="sv-card-actions">
                    {item.phone ? (
                      <a href={`tel:${item.phone}`} className="sv-card-btn sv-card-btn-call">
                        <Icon name="phone" size={16} color="currentColor" sw={2} />
                        Call {item.phone.length <= 4 ? item.phone : "Now"}
                      </a>
                    ) : (
                      <span className="sv-card-btn sv-card-btn-call" style={{ opacity: 0.6 }}>
                        Online Only
                      </span>
                    )}

                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sv-card-btn sv-card-btn-web"
                      >
                        Visit Site <Icon name="arrowR" size={15} color="currentColor" sw={2.2} />
                      </a>
                    ) : (
                      <Link href="/app" className="sv-card-btn sv-card-btn-web">
                        Details in App
                      </Link>
                    )}

                    <Link
                      href={`/app`}
                      className="sv-card-btn sv-card-btn-ai"
                      title="Open AfterCare AI for step-by-step guidance on this program"
                    >
                      <Icon name="sparkle" size={16} color="var(--fg-orange)" sw={2} />
                      Ask AfterCare AI About This
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ── Benefits Screener Modal ── */}
      {screenerOpen && (
        <div className="sv-screener-backdrop" onClick={() => setScreenerOpen(false)}>
          <div className="sv-screener-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="sv-screener-close"
              onClick={() => setScreenerOpen(false)}
            >
              ✕
            </button>

            <h2 className="sv-screener-h2">Quick Benefits Screener</h2>
            <p className="sv-screener-sub">
              Answer 4 quick questions to see which state and federal programs are worth checking next.
            </p>

            <div className="sv-screener-q">
              <label className="sv-screener-label">1. How old are you?</label>
              <div className="sv-screener-options">
                {["16-17", "18-20", "21-25", "26+"].map((age) => (
                  <button
                    key={age}
                    type="button"
                    onClick={() => setScreenerAge(age)}
                    className={`sv-screener-opt ${screenerAge === age ? "selected" : ""}`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            <div className="sv-screener-q">
              <label className="sv-screener-label">2. Were you in foster care at or after age 13?</label>
              <div className="sv-screener-options">
                <button
                  type="button"
                  onClick={() => setScreenerInCare13("yes")}
                  className={`sv-screener-opt ${screenerInCare13 === "yes" ? "selected" : ""}`}
                >
                  Yes, after 13
                </button>
                <button
                  type="button"
                  onClick={() => setScreenerInCare13("no")}
                  className={`sv-screener-opt ${screenerInCare13 === "no" ? "selected" : ""}`}
                >
                  No or Unsure
                </button>
              </div>
            </div>

            <div className="sv-screener-q">
              <label className="sv-screener-label">3. Were you in foster care on your 18th birthday?</label>
              <div className="sv-screener-options">
                <button
                  type="button"
                  onClick={() => setScreenerInCare18("yes")}
                  className={`sv-screener-opt ${screenerInCare18 === "yes" ? "selected" : ""}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setScreenerInCare18("no")}
                  className={`sv-screener-opt ${screenerInCare18 === "no" ? "selected" : ""}`}
                >
                  No or Unsure
                </button>
              </div>
            </div>

            <div className="sv-screener-q">
              <label className="sv-screener-label">4. What is your most urgent priority right now?</label>
              <div className="sv-screener-options">
                {[
                  { id: "housing", label: "Housing & Shelter" },
                  { id: "money", label: "Banking & Income" },
                  { id: "college", label: "College / FAFSA" },
                  { id: "health", label: "Healthcare / Medi-Cal" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setScreenerNeed(item.id)}
                    className={`sv-screener-opt ${screenerNeed === item.id ? "selected" : ""}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Calculated Benefits Result — gated on the answers above.
                Nothing here is an eligibility determination: each item is
                "worth checking" given what the youth answered, with the
                condition stated. If an answer rules a program out, it is
                not shown as a match. */}
            <div className="sv-screener-results">
              <h4 style={{ fontSize: 16, fontWeight: 800, color: "var(--fg-navy)", marginBottom: 12 }}>
                Programs worth checking, based on your answers:
              </h4>

              {(!screenerAge || !screenerInCare13 || !screenerInCare18) && (
                <p style={{ fontSize: 13.5, color: "var(--fg-text-muted)", lineHeight: 1.5 }}>
                  Answer the three questions above and matches will appear here.
                </p>
              )}

              {screenerInCare13 === "yes" && screenerAge !== "26+" && (
                <div className="sv-screener-benefit-item">
                  <div className="sv-screener-benefit-icon">✓</div>
                  <div>
                    <b style={{ fontSize: 14.5, color: "var(--fg-navy)" }}>
                      California Chafee Grant (Up to $5,000/year)
                    </b>
                    <p style={{ fontSize: 13, color: "var(--fg-text-muted)", marginTop: 2 }}>
                      Free money for college, university, or career training that you never repay — for youth who were in care between 16 and 18 and are under 26. Confirm at chafee.csac.ca.gov.
                    </p>
                  </div>
                </div>
              )}

              {screenerInCare18 === "yes" && screenerAge !== "26+" && (
                <div className="sv-screener-benefit-item">
                  <div className="sv-screener-benefit-icon">✓</div>
                  <div>
                    <b style={{ fontSize: 14.5, color: "var(--fg-navy)" }}>
                      Former Foster Youth Medi-Cal to Age 26
                    </b>
                    <p style={{ fontSize: 13, color: "var(--fg-text-muted)", marginTop: 2 }}>
                      Free comprehensive healthcare with no income limit, for youth who were in foster care on their 18th birthday. Confirm your own coverage with your county Medi-Cal office.
                    </p>
                  </div>
                </div>
              )}

              {screenerInCare13 === "yes" && (
                <div className="sv-screener-benefit-item">
                  <div className="sv-screener-benefit-icon">✓</div>
                  <div>
                    <b style={{ fontSize: 14.5, color: "var(--fg-navy)" }}>
                      FAFSA Independent Student Status ($0 Expected Family Contribution)
                    </b>
                    <p style={{ fontSize: 13, color: "var(--fg-text-muted)", marginTop: 2 }}>
                      No parental tax forms needed. You may unlock maximum federal Pell Grant aid — confirm on studentaid.gov.
                    </p>
                  </div>
                </div>
              )}

              {(screenerAge === "16-17" || screenerAge === "18-20") && screenerInCare18 === "yes" && (
                <div className="sv-screener-benefit-item">
                  <div className="sv-screener-benefit-icon">✓</div>
                  <div>
                    <b style={{ fontSize: 14.5, color: "var(--fg-navy)" }}>
                      AB 12 Extended Foster Care &amp; THP-Plus Housing
                    </b>
                    <p style={{ fontSize: 13, color: "var(--fg-text-muted)", marginTop: 2 }}>
                      You may be eligible for housing placement support and monthly independent living help through age 21. Ask your caseworker or county ILP office — availability varies by county.
                    </p>
                  </div>
                </div>
              )}

              {screenerAge && screenerInCare13 && screenerInCare18 && !(screenerInCare13 === "yes" || screenerInCare18 === "yes") && (
                <p style={{ fontSize: 13.5, color: "var(--fg-text-muted)", lineHeight: 1.5 }}>
                  Based on your answers, these foster-youth-specific programs are probably not a fit — but 211, food banks, shelters, and crisis lines in this directory serve all youth. Ask AfterCare AI or call 211 for what fits you.
                </p>
              )}

              <p style={{ fontSize: 12.5, color: "var(--fg-text-muted)", lineHeight: 1.5, marginTop: 14 }}>
                General information only — not an eligibility determination. Confirm with the program or your county before you rely on it.
              </p>
            </div>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Link
                href="/app"
                className="sv-btn-app"
                style={{ width: "100%", justifyContent: "center", padding: "14px 24px" }}
              >
                Claim These Benefits with AfterCare AI <Icon name="arrowR" size={18} color="#fff" sw={2.4} />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ── "How It Works" Section ── */}
      <section className="sv-how-section">
        <div className="sv-container">
          <h2 className="sv-section-title">How It Works</h2>

          <div className="sv-how-grid">
            <div className="sv-how-card">
              <div className="sv-how-num">1</div>
              <h3 className="sv-how-h3">Enter Your ZIP or Area</h3>
              <p className="sv-how-p">
                We localize the catalog immediately to programs in your county and across California. Verified listings had their official page confirmed; the rest say “Unverified — call to confirm.”
              </p>
            </div>

            <div className="sv-how-card">
              <div className="sv-how-num">2</div>
              <h3 className="sv-how-h3">Pick What You Need</h3>
              <p className="sv-how-p">
                Filter by Housing, Health, Money, School, or Legal Rights. Zero fluff, just the resources that actually answer.
              </p>
            </div>

            <div className="sv-how-card">
              <div className="sv-how-num">3</div>
              <h3 className="sv-how-h3">Take Real Action with AI</h3>
              <p className="sv-how-p">
                Call directly, save programs to your board, or let AfterCare AI draft your caseworker outreach in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Callout Banner Section ── */}
      <section className="sv-cta-banner">
        <div className="sv-container">
          <div className="sv-cta-box">
            <div className="sv-cta-icon-wrap">
              <Icon name="sparkle" size={36} color="var(--fg-blue-deep)" sw={2.2} />
            </div>

            <h2 className="sv-cta-h2">Get Help Finding &amp; Claiming Resources!</h2>

            <p className="sv-cta-sub">
              Not sure where to start? Don&apos;t navigate alone. Chat with AfterCare AI—the conversational navigator built by foster alumni who understand every step.
            </p>

            <div className="sv-cta-actions">
              <Link href="/app" className="sv-cta-btn-main">
                Talk to AfterCare AI <Icon name="arrowR" size={18} color="#fff" sw={2.4} />
              </Link>
            </div>

            <p className="sv-cta-note">
              Free forever for all current and former foster youth · No account required
            </p>
          </div>
        </div>
      </section>

      {/* ── Interactive FAQ Section ── */}
      <section className="sv-faq-section">
        <div className="sv-container">
          <h2 className="sv-section-title">Frequently Asked Questions</h2>

          <div className="sv-faq-list">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className={`sv-faq-item ${isOpen ? "open" : ""}`}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="sv-faq-btn"
                  >
                    <span>{faq.q}</span>
                    <span className="sv-faq-icon">+</span>
                  </button>
                  {isOpen && <div className="sv-faq-answer">{faq.a}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Privacy Note ── */}
      <div className="sv-privacy-strip">
        <Icon name="heart" size={16} color="var(--fg-panic)" sw={2} fill="var(--fg-panic)" />
        <span>
          Your privacy matters. Browsing the directory needs no sign-in, and saved programs stay on your device. Basic server logs (whether a page worked) exist — see Privacy for what is and isn&rsquo;t collected.
        </span>
      </div>

      {/* ── Crisis Emergency Strip ── */}
      <div className="sv-crisis-strip">
        <div className="sv-container">
          <b>In crisis right now?</b> Call or text <b>988</b> (Suicide &amp; Crisis Lifeline, 24/7). For immediate emergency youth shelter in California, call Covenant House at <b>1-800-388-3888</b>. If in physical danger, call <b>911</b>.
        </div>
      </div>

      {/* ── Comprehensive Footer ── */}
      <footer className="sv-footer">
        <div className="sv-container">
          <div className="sv-footer-top">
            <Link href="/app" className="sv-footer-btn-white">
              Launch AfterCare AI Navigator
            </Link>
            <Link href="/" className="sv-footer-btn-outline">
              Read Our Story
            </Link>
          </div>

          <div className="sv-footer-grid">
            <div className="sv-footer-col">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <Logo size={28} r={8} />
                <span style={{ fontSize: 20, fontWeight: 800, fontFamily: "var(--display)" }}>AfterCare</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,.7)", maxWidth: 300 }}>
                The AI life navigator built by foster kids, for foster kids. Guiding transition-age youth from 16 to 24 through every adulting moment.
              </p>
            </div>

            <div className="sv-footer-col">
              <h4>Programs</h4>
              <ul>
                <li><Link href="/services">Housing &amp; Shelter</Link></li>
                <li><Link href="/services">Healthcare to 26</Link></li>
                <li><Link href="/services">Chafee Grants &amp; College</Link></li>
                <li><Link href="/services">Bank Accounts &amp; Credit</Link></li>
                <li><Link href="/services">Legal Aid &amp; Rights</Link></li>
              </ul>
            </div>

            <div className="sv-footer-col">
              <h4>Tools</h4>
              <ul>
                <li><Link href="/services">Resource Directory</Link></li>
                <li><Link href="/app">AI Navigator</Link></li>
                <li><Link href="/app">Interactive Quests</Link></li>
                <li><Link href="/app">Emergency Panic SOS</Link></li>
                <li><button type="button" onClick={() => setScreenerOpen(true)} style={{ color: "rgba(255,255,255,.7)", fontSize: 13.5, textAlign: "left" }}>Benefits Screener</button></li>
              </ul>
            </div>

            <div className="sv-footer-col">
              <h4>About</h4>
              <ul>
                <li><Link href="/about">Our Story</Link></li>
                <li><Link href="/research">Research</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="sv-footer-col">
              <h4>Emergency</h4>
              <ul>
                <li><a href="tel:988">988 Crisis Lifeline</a></li>
                <li><a href="tel:1-800-388-3888">Covenant House CA</a></li>
                <li><a href="tel:1-866-488-7386">The Trevor Project</a></li>
                <li><a href="tel:211">211 Resource Line</a></li>
              </ul>
            </div>
          </div>

          <div className="sv-footer-bottom">
            <span>© {new Date().getFullYear()} AfterCare · Free forever for foster youth · A social-impact project working toward nonprofit status.</span>
            <span>Privacy &amp; Terms are drafts, not yet reviewed by a lawyer. Listings marked “Unverified — call to confirm” have not been checked yet.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
