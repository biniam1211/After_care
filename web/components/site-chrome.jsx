// ───────────────────────────────────────────────────────────
// AfterCare — shared org-site chrome (marketing surfaces only)
//
// One nav / footer / crisis strip for every org page (/, /privacy,
// /terms, /download, 404) so the org site and the product app can't
// drift apart. These components use the `mk-*` classes from
// `web/app/marketing.css` — every page that renders them must import
// that stylesheet (landing, legal, download, 404 all do).
//
// This is the ORG chrome. The product app (/app) has its own in-app
// shell (components/app-shell.jsx) and deliberately does NOT use this.
// The services directory (/services) keeps its own `sv-*` chrome in
// services.css. See docs/ARCHITECTURE-SEPARATION.md for the split.
//
// Verification language (single source of truth):
// `verified: true` on a resource means its official page was confirmed
// to resolve to the correct organisation (see supabase/seed/README.md).
// It does NOT mean the phone line was tested live or that the org
// serves your ZIP. Never write "phone-verified" for it, and never
// render a Verified badge for a row with verified === false.
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

export function OrgNav() {
  return (
    <nav className="mk-nav">
      <div className="mk-wrap mk-nav-inner">
        <Link href="/" className="mk-brand">
          <Logo size={34} r={10} />
          AfterCare
        </Link>
        <div className="mk-nav-links">
          <Link href="/services" style={{ fontWeight: 700, color: "var(--sky)" }}>
            Find services
          </Link>
          <Link href="/#problem">The problem</Link>
          <Link href="/#what">What it does</Link>
          <Link href="/#story">Our story</Link>
          <Link href="/download">Download the app</Link>
        </div>
        <Link href="/app" className="mk-btn mk-btn-ghost" style={{ marginLeft: "auto" }}>
          Open the app
        </Link>
      </div>
    </nav>
  );
}

export function OrgFooter() {
  return (
    <footer className="mk-footer">
      <div className="mk-wrap mk-footer-inner">
        <span>
          © {new Date().getFullYear()} AfterCare · Free forever for foster
          youth · {ORG_STATUS}
        </span>
        <span>
          <Link href="/services">Find Services</Link>
          <Link href="/download">Download the app</Link>
          <Link href="/app">Open the app</Link>
          <Link href="/#story">Our story</Link>
          <Link href="/privacy">Privacy (draft)</Link>
          <Link href="/terms">Terms (draft)</Link>
        </span>
      </div>
      <div className="mk-wrap" style={{ paddingBottom: 18 }}>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.55, color: "rgba(255,255,255,.6)" }}>
          Privacy &amp; Terms are plain-English drafts, not yet reviewed by a
          lawyer. Resource listings marked “Unverified — call to confirm”
          have not had their details confirmed yet — call ahead before you
          rely on one.
        </p>
      </div>
    </footer>
  );
}
