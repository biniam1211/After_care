// ───────────────────────────────────────────────────────────
// AfterCare — shared org-site chrome (marketing surfaces only)
//
// One nav / footer / crisis strip for every org page so the org
// site and the product app can't drift apart. These components use
// the `mk-*` classes from `web/app/marketing.css`.
//
// This is the ORG chrome. The product app (/app) has its own in-app
// shell (components/app-shell.jsx) and deliberately does NOT use this.
// The services directory (/services) keeps its own `sv-*` chrome in
// services.css. See docs/ARCHITECTURE-SEPARATION.md for the split.
//
// LINK RULE: every nav/footer link must point at a real page that
// exists. No dead links, no anchor-only nav, no placeholders.
// ───────────────────────────────────────────────────────────
import Link from "next/link";
import { Logo } from "@/components/onboarding";

// Honest org status. There is no 501(c)(3) / EIN / registration doc in
// the repo, so no page may call AfterCare a registered nonprofit.
export const ORG_STATUS =
  "A social-impact project working toward nonprofit status.";

export const VERIFIED_MEANING =
  "Verified means we confirmed the organisation's official page. It does not mean the phone line was tested live — hours and who they serve still change, so call ahead.";

export const UNVERIFIED_LABEL = "Unverified — call to confirm";

// Small status pill for a resource row. `verified` is a boolean from
// the resource catalog (CSV `verified` column). Unverified rows ALWAYS
// get the explicit "Unverified — call to confirm" label — never a
// Verified badge, never silence.
export function VerificationBadge({ verified }) {
  if (verified) {
    return (
      <span
        style={{
          background: "#dff6e8",
          color: "#0c7a5a",
          fontWeight: 700,
          fontSize: 12,
          padding: "5px 11px",
          borderRadius: 99,
          letterSpacing: 0.1,
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
        background: "#fff3e0",
        color: "#9a5a22",
        fontWeight: 700,
        fontSize: 12,
        padding: "5px 11px",
        borderRadius: 99,
        letterSpacing: 0.1,
        whiteSpace: "nowrap",
      }}
    >
      {UNVERIFIED_LABEL}
    </span>
  );
}

export function CrisisStrip() {
  return (
    <div className="mk-crisis">
      <div className="mk-wrap">
        <b>In danger right now?</b> Call or text <b>988</b> (Suicide &amp;
        Crisis Lifeline, 24/7). If you have nowhere to sleep tonight,
        Covenant House California is <b>1-800-388-3888</b>. If someone is
        being hurt, call <b>911</b>.
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/research", label: "Research" },
  { href: "/impact", label: "Impact" },
  { href: "/get-involved", label: "Get involved" },
  { href: "/services", label: "Find services" },
  { href: "/download", label: "Download" },
];

export function OrgNav() {
  return (
    <nav className="mk-nav">
      <div className="mk-wrap mk-nav-inner">
        <Link href="/" className="mk-brand">
          <Logo size={34} r={10} />
          AfterCare
        </Link>
        <div className="mk-nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link href="/app" className="mk-btn mk-btn-ghost mk-nav-cta">
          Open the app
        </Link>
        {/* CSS-only mobile menu: <details> needs no JS and every link
            below is a real page. */}
        <details className="mk-menu">
          <summary className="mk-menu-btn" aria-label="Open menu">
            Menu
          </summary>
          <div className="mk-menu-panel">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link href="/app">Open the app</Link>
          </div>
        </details>
      </div>
    </nav>
  );
}

const FOOTER_COLS = [
  {
    heading: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About us" },
      { href: "/programs", label: "Programs" },
      { href: "/research", label: "Research" },
      { href: "/impact", label: "Impact" },
    ],
  },
  {
    heading: "Get help",
    links: [
      { href: "/services", label: "Find services" },
      { href: "/app", label: "Open the app" },
      { href: "/download", label: "Download the app" },
    ],
  },
  {
    heading: "Get involved",
    links: [
      { href: "/get-involved", label: "Get involved" },
      { href: "/get-involved#youth", label: "For youth" },
      { href: "/get-involved#adults", label: "For caring adults" },
      { href: "/get-involved#partners", label: "For orgs & partners" },
    ],
  },
  {
    heading: "About this site",
    links: [
      { href: "/privacy", label: "Privacy (draft)" },
      { href: "/terms", label: "Terms (draft)" },
    ],
  },
];

export function OrgFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-wrap">
        <div className="mk-footer-cols">
          <div className="mk-footer-brand">
            <span className="mk-brand">
              <Logo size={34} r={10} />
              AfterCare
            </span>
            <p>
              The life navigator for foster youth — for everyone, every ZIP
              code, every day. {ORG_STATUS}
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.heading} className="mk-footer-col">
              <b>{col.heading}</b>
              {col.links.map((l) => (
                <Link key={l.href + l.label} href={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mk-footer-base">
          <span>© {new Date().getFullYear()} AfterCare · Free forever for foster youth</span>
          <p>
            Privacy &amp; Terms are plain-English drafts, not yet reviewed by a
            lawyer. Resource listings marked “Unverified — call to confirm”
            have not had their details confirmed yet — call ahead before you
            rely on one.
          </p>
        </div>
      </div>
    </footer>
  );
}
