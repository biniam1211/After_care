import Link from "next/link";
import { Icon } from "@/components/ui";
import { OrgArt } from "@/components/org-art";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "Get involved",
  description:
    "Get involved with AfterCare: for youth, for caring adults, and for orgs & partners.",
};

export default function GetInvolved() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <span className="mk-eyebrow">
            <span className="mk-dot" />
            Get involved
          </span>
          <h1 className="mk-h1">
            There&rsquo;s a place for you <em>in this.</em>
          </h1>
          <p className="mk-sub">
            Whether you&rsquo;re a young person who needs help, an adult who
            wants to show up, or an organization that serves youth — you
            belong here.
          </p>
        </div>
      </header>

      {/* ── For youth ── */}
      <section className="mk-section" id="youth">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">For youth</p>
            <h2 className="mk-h2">Start with one finished thing.</h2>
            <p className="mk-lead">
              You don&rsquo;t need a referral, a caseworker, or an account.
              Open the app, ask the first thing on your mind, and finish one
              real task today.
            </p>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-sky">
                Open the app <Icon name="arrowR" size={19} color="#fff" sw={2.6} />
              </Link>
              <Link href="/services" className="mk-btn" style={{ background: "#fff", color: "var(--harbor)", height: 50, padding: "0 24px", fontSize: 16, boxShadow: "var(--shadow-card)" }}>
                Find services
              </Link>
            </div>
          </div>
          <div className="mk-art">
            <OrgArt kind="sunrise" />
          </div>
        </div>
      </section>

      {/* ── For caring adults ── */}
      <section className="mk-section mk-band-mint" id="adults">
        <div className="mk-wrap mk-split">
          <div className="mk-art">
            <OrgArt kind="community" />
          </div>
          <div>
            <p className="mk-kicker">For caring adults</p>
            <h2 className="mk-h2">Show up — and point the way.</h2>
            <p className="mk-lead">
              The most powerful thing an adult can do for a young person
              aging out is stay consistent — and put the right tool in their
              hands.
            </p>
            <ul className="mk-checklist">
              <li>Share AfterCare with a young person who could use it.</li>
              <li>Help them finish one task: ID, bank account, benefits, housing.</li>
              <li>When a listing looks out of date, tell us — the directory only stays honest if people flag it.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── For orgs & partners ── */}
      <section className="mk-section" id="partners">
        <div className="mk-wrap">
          <p className="mk-kicker">For orgs &amp; partners</p>
          <h2 className="mk-h2">Build the nationwide map with us.</h2>
          <p className="mk-lead">
            If your organization serves foster youth, we want your program in
            the directory — accurately listed, honestly labeled. And if you
            work in housing, health, education, or employment, the road to
            every ZIP code is a road we walk together.
          </p>
          <p className="mk-lead">
            <Link href="/programs" style={{ fontWeight: 700 }}>See the programs and roadmap →</Link>
          </p>
          <div className="mk-note">
            <strong>No donations page yet.</strong> AfterCare is a
            social-impact project working toward nonprofit status. We do not
            collect tax-deductible donations, and there is no Donate button
            until the filing is real.
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
