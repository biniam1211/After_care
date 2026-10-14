import Link from "next/link";
import { OrgArt } from "@/components/org-art";
import { OrgPhoto } from "@/components/org-photo";
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
          <p className="mk-kicker">Get involved</p>
          <h1 className="mk-h1">
            There&rsquo;s a place for you <em>in this.</em>
          </h1>
          <p className="mk-deck">
            Three doors in. Pick the one that&rsquo;s yours.
          </p>
        </div>
      </header>

      {/* ── For youth: split with figure ── */}
      <section className="mk-section" id="youth">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">Door one — For youth</p>
            <h2 className="mk-h2">Start with one finished thing.</h2>
            <p className="mk-deck">
              If you are the young person: you don&rsquo;t need a referral,
              a caseworker, or an account. Open the app, ask the first thing
              on your mind, and finish one real task today.
            </p>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-primary">
                Open the app →
              </Link>
              <Link href="/services" className="mk-btn mk-btn-ghost">
                Find services
              </Link>
            </div>
          </div>
          <figure className="mk-art" aria-hidden="true">
            <OrgArt kind="sunrise" />
            <figcaption>
              <b>Fig. 1 —</b> Morning. The first day after the system
              stops calling is still a morning.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Photo: studying ── */}
      <section className="mk-section" id="studying-photo" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="mk-wrap">
          <OrgPhoto
            src="/images/studying.jpg"
            alt="A young adult woman studying in a library with books and a laptop"
            caption="One finished thing at a time. School, study, a step forward."
            photographer="Yan Krukau"
          />
        </div>
      </section>

      {/* ── For caring adults: figure + checklist ── */}
      <section className="mk-section" id="adults">
        <div className="mk-wrap mk-split flip">
          <figure className="mk-art" aria-hidden="true">
            <OrgArt kind="community" />
            <figcaption>
              <b>Fig. 2 —</b> The table again. Showing up is mostly
              staying consistent.
            </figcaption>
          </figure>
          <div>
            <p className="mk-kicker">Door two — For caring adults</p>
            <h2 className="mk-h2">Show up — and point the way.</h2>
            <p className="mk-lead">
              If you are the adult: the most powerful thing you can do for a
              young person aging out is stay consistent — and put the right
              tool in their hands.
            </p>
            <ul className="mk-checklist">
              <li>Share AfterCare with a young person who could use it.</li>
              <li>Help them finish one task: ID, bank account, benefits, housing.</li>
              <li>When a listing looks out of date, tell us — the directory only stays honest if people flag it.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Photo: mentorship ── */}
      <section className="mk-section" id="mentorship-photo" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="mk-wrap">
          <OrgPhoto
            src="/images/mentorship.jpg"
            alt="Two professional women collaborating at a table in a bright office"
            caption="Someone in your corner. Guidance from people who show up."
            photographer="Kaboompics"
          />
        </div>
      </section>

      {/* ── For orgs & partners: full-width essay + note ── */}
      <section className="mk-section" id="partners">
        <div className="mk-wrap">
          <p className="mk-kicker">Door three — For orgs &amp; partners</p>
          <h2 className="mk-h2">Build the nationwide map with us.</h2>
          <p className="mk-lead" style={{ maxWidth: "36em" }}>
            If your organization serves foster youth, we want your program in
            the directory — accurately listed, honestly labeled. And if you
            work in housing, health, education, or employment, the road to
            every ZIP code is a road we walk together.
          </p>
          <p className="mk-lead" style={{ maxWidth: "36em" }}>
            <Link href="/programs">See the programs and roadmap →</Link>
          </p>
          <div className="mk-note" style={{ maxWidth: "36em" }}>
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
