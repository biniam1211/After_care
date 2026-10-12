"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";

const LINKS = [
  { href: "/what-we-do", label: "What We Do" },
  { href: "/resources", label: "Resources" },
  { href: "/approach", label: "Our Approach" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/stories", label: "Stories" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Utility bar */}
      <div className="utility-bar">
        <div className="wrap">
          <div className="u-left">
            <span className="u-tag hide-sm">
              <Icon name="heart" size={15} style={{ color: "#ff9ea8" }} /> Built by foster kids, for foster kids
            </span>
          </div>
          <div className="u-right">
            <Link href="/get-involved" className="u-hide-sm">Get Involved</Link>
            <Link href="/get-involved#donate" className="u-hide-sm">Donate</Link>
            <Link href="/get-help" className="pill-help">Get Help</Link>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="wrap bar">
          <Link href="/" className="brand" aria-label="AfterCare home">
            <Logo />
            <span>
              AfterCare
              <small className="brand-name-sub">Stronger after care</small>
            </span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="header-cta">
            <Link href="/get-involved#donate" className="btn btn-donate btn-text-hide">
              Donate
            </Link>
            <Link href="/app" className="btn btn-primary">
              Open the app
            </Link>
            <button
              className="menu-btn"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <nav className="mobile-nav" aria-label="Mobile">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/get-help" onClick={() => setOpen(false)}>Get Help</Link>
            <Link href="/get-involved#donate" onClick={() => setOpen(false)}>Donate</Link>
          </nav>
        )}
      </header>
    </>
  );
}
