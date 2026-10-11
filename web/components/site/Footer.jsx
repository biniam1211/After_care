import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <Link href="/" className="brand" aria-label="AfterCare home">
              <Logo onDark />
              AfterCare
            </Link>
            <p className="mission">
              The AI life navigator built by foster kids, for foster kids. Money, housing,
              school, health — figured out, step by step.
            </p>
          </div>

          <div>
            <h4>Product</h4>
            <Link href="/features">Features</Link>
            <Link href="/app">Open the app</Link>
            <Link href="/faq">FAQ</Link>
          </div>

          <div>
            <h4>About</h4>
            <Link href="/about">Our mission</Link>
            <Link href="/partners">For partners</Link>
            <Link href="/contact">Contact</Link>
          </div>

          <div>
            <h4>Legal</h4>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {year} AfterCare. Made with care.</span>
          <span>
            In a crisis, call <strong>911</strong> or <strong>988</strong> (Suicide &amp; Crisis Lifeline).
          </span>
        </div>
      </div>
    </footer>
  );
}
