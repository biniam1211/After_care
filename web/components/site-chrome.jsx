"use client";

/**
 * AfterCare — shared org-site chrome (marketing surfaces only).
 *
 * One nav / footer / crisis strip for every org page. The product app
 * (/app) uses components/app-shell.jsx and deliberately does NOT use this.
 * See docs/ARCHITECTURE-SEPARATION.md.
 */
import Link from "next/link";
import { SiteSearch } from "@/components/site-search";
import { QuickExit } from "@/components/quick-exit";
import { useLocale } from "@/lib/i18n/locale-context";
import {
  ORG_STATUS,
  UNVERIFIED_LABEL,
  VERIFIED_MEANING,
} from "@/lib/trust-copy";

export { ORG_STATUS, UNVERIFIED_LABEL, VERIFIED_MEANING };

/**
 * Resource verification label.
 * @param {{ verified: boolean }} props
 */
export function VerificationBadge({ verified }) {
  if (verified) {
    return (
      <span
        style={{
          border: "2px solid #1a120c",
          color: "#1a120c",
          background: "#f7e7b8",
          fontWeight: 800,
          fontSize: 12,
          padding: "5px 10px",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}
      >
        ✓ Verified listing
      </span>
    );
  }
  return (
    <span
      style={{
        border: "2px solid #9b1d1d",
        color: "#9b1d1d",
        fontWeight: 800,
        fontSize: 12,
        padding: "5px 10px",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {UNVERIFIED_LABEL}
    </span>
  );
}

/** Persistent crisis numbers on every org page. */
export function CrisisStrip() {
  const { t } = useLocale();
  return (
    <div className="mk-crisis" role="region" aria-label="Crisis hotlines">
      <div className="mk-wrap">{t("crisis.strip")}</div>
    </div>
  );
}

/** Sticky org navigation with Get help CTA. */
export function OrgNav() {
  const { t, locale, setLocale } = useLocale();
  const navLinks = [
    { href: "/directory", label: t("nav.directory") },
    { href: "/find", label: t("nav.finder") },
    { href: "/programs", label: t("nav.guides") },
    { href: "/my-plan", label: t("nav.plan") },
    { href: "/map", label: t("nav.map") },
    { href: "/for-supporters", label: t("nav.supporters") },
    { href: "/about", label: t("nav.about") },
    { href: "/get-involved", label: t("nav.involved") },
  ];

  return (
    <nav className="mk-nav" aria-label="Primary">
      <div className="mk-nav-crisis">{t("crisis.banner")}</div>
      <div className="mk-wrap">
        <div className="mk-nav-inner">
          <Link href="/" className="mk-brand">
            AfterCare<i>.</i>
          </Link>
          <span className="mk-brand-tag">{t("nav.tag")}</span>
          <div className="mk-nav-search">
            <SiteSearch compact />
          </div>
          <ul className="mk-nav-links">
            {navLinks.slice(0, 6).map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mk-lang-toggle"
            onClick={() => setLocale(locale === "es" ? "en" : "es")}
            aria-label={locale === "es" ? "Switch to English" : "Cambiar a español"}
          >
            {t("lang.toggle")}
          </button>
          <Link href="/app" className="mk-btn mk-btn-primary mk-nav-cta">
            {t("nav.ask")}
          </Link>
          <details className="mk-nav-menu">
            <summary aria-label="Open menu">Menu</summary>
            <div className="mk-nav-menu-panel">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ))}
              <Link href="/how-we-verify">How we verify</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/app">Ask AfterCare</Link>
            </div>
          </details>
        </div>
      </div>
      <QuickExit />
    </nav>
  );
}

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/directory", label: "Resource directory" },
      { href: "/map", label: "County map" },
      { href: "/my-plan", label: "My Plan" },
      { href: "/find", label: "What do you need?" },
      { href: "/programs", label: "All guides" },
      { href: "/about", label: "About" },
      { href: "/for-supporters", label: "For supporters" },
    ],
  },
  {
    heading: "Get help",
    links: [
      { href: "/app", label: "Ask AfterCare" },
      { href: "/directory?need=crisis", label: "Crisis lines" },
      { href: "/directory?need=ilp", label: "County ILP contacts" },
      { href: "/programs/drivers-license", label: "Driver's license" },
      { href: "/programs/foster-youth-bill-of-rights", label: "Bill of Rights" },
      { href: "/programs/extended-foster-care", label: "AB 12" },
      { href: "/how-we-verify", label: "How we verify" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/get-involved", label: "Volunteer & partner" },
      { href: "/get-involved#donate", label: "Donate (placeholder)" },
      { href: "/contact", label: "Contact" },
      { href: "/faq", label: "FAQ" },
      { href: "/privacy", label: "Privacy (draft)" },
      { href: "/terms", label: "Terms (draft)" },
    ],
  },
];

/** Site footer for org pages. */
export function OrgFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-wrap">
        <div className="mk-footer-grid">
          <div>
            <span className="mk-brand" style={{ color: "#f3e6cc" }}>
              AfterCare<i>.</i>
            </span>
            <p style={{ marginTop: 12 }}>
              The life navigator built by foster kids, for foster youth — every
              &ldquo;how do I adult&rdquo; step in one place. {ORG_STATUS} Free
              forever for foster youth.
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <h4>{col.heading}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mk-footer-meta">
          <span>
            © {new Date().getFullYear()} AfterCare · Founded by Biniam Efrem ·
            Free forever for foster youth
          </span>
          <p>
            Privacy &amp; Terms are plain-English drafts, not yet reviewed by a
            lawyer. Resource listings marked &ldquo;Unverified — call to
            confirm&rdquo; have not had their details confirmed yet — call ahead
            before you rely on one. AfterCare does not provide clinical or legal
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
