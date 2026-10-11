"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const LINKS = [
  { href: "/features", label: "Features" },
  { href: "/about", label: "About" },
  { href: "/partners", label: "For Partners" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="brand" aria-label="AfterCare home">
          <Logo />
          <span className="brand-name">AfterCare</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-cta">
          <Link href="/contact" className="btn btn-ghost btn-text-hide">
            Contact
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
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}
