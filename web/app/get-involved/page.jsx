import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import { FounderFigure } from "@/components/founder-photos";
import "../marketing.css";

export const metadata = {
  title: "Get involved",
  description:
    "Volunteer, partner, or support AfterCare. Donation placeholder only — we do not claim tax-deductible status yet.",
  openGraph: {
    title: "Get involved · AfterCare",
    description:
      "For youth, caring adults, partners, and future donors — honest doors in.",
    type: "website",
  },
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
            Youth, caring adults, partners, and future supporters — pick the
            door that&rsquo;s yours.
          </p>
        </div>
      </header>

      <section className="mk-section" id="youth">
        <div className="mk-wrap mk-split">
          <div>
            <p className="mk-kicker">For youth</p>
            <h2 className="mk-h2">Start with one finished thing.</h2>
            <p className="mk-deck">
              You don&rsquo;t need a referral, a caseworker, or an account. Open
              the app, ask the first thing on your mind, and finish one real
              task today.
            </p>
            <div className="mk-cta-row">
              <Link href="/app" className="mk-btn mk-btn-primary">
                Get help now
              </Link>
              <Link href="/programs/drivers-license" className="mk-btn mk-btn-ghost">
                Driver&rsquo;s license help
              </Link>
            </div>
          </div>
          <FounderFigure photoId="grad-mom" sizes="(max-width: 860px) 100vw, 480px" />
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="adults">
        <div className="mk-wrap mk-split flip">
          <FounderFigure photoId="christmas" sizes="(max-width: 860px) 100vw, 480px" />
          <div>
            <p className="mk-kicker">For caring adults</p>
            <h2 className="mk-h2">Show up — and point the way.</h2>
            <p className="mk-lead">
              The most powerful thing you can do for a young person aging out is
              stay consistent — and put a real tool in their hands.
            </p>
            <ul className="mk-checklist">
              <li>Share AfterCare with a young person who could use it.</li>
              <li>Help them finish one task: ID, permit, bank account, benefits, housing.</li>
              <li>When a listing looks out of date, tell us through the app chat.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mk-section" id="partners">
        <div className="mk-wrap">
          <p className="mk-kicker">For orgs &amp; partners</p>
          <h2 className="mk-h2">Build the map with us.</h2>
          <p className="mk-lead" style={{ maxWidth: "36em" }}>
            If your organization serves foster youth, we want your program in
            the directory — accurately listed, honestly labeled. Reach us through
            the app chat to partner.
          </p>
          <div className="mk-cta-row">
            <Link href="/contact" className="mk-btn mk-btn-ghost">
              Contact
            </Link>
            <Link href="/programs" className="mk-btn mk-btn-ghost">
              See programs
            </Link>
          </div>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="donate">
        <div className="mk-wrap">
          <p className="mk-kicker">Donate</p>
          <h2 className="mk-h2">Support is coming — honestly.</h2>
          <div className="mk-note">
            <strong>Donation placeholder — not live.</strong> {ORG_STATUS}{" "}
            There is no donation processor connected yet, and we do{" "}
            <strong>not</strong> claim that gifts are tax-deductible. When
            nonprofit filing and a real processor are ready, this section will
            be updated. Until then, the best support is sharing AfterCare with
            youth and partners.
          </div>
          <p className="mk-lead">
            Want to be notified when giving is available? Reach us through the{" "}
            <Link href="/contact">contact page</Link> / app chat and say you
            want donor updates — we will not invent a mailing list signup that
            does not exist.
          </p>
        </div>
      </section>

      <section className="mk-section mk-section-harbor">
        <div className="mk-wrap">
          <h2 className="mk-h2">Ready to help a young person today?</h2>
          <div className="mk-cta-row">
            <Link href="/app" className="mk-btn mk-btn-on-dark">
              Open the app
            </Link>
            <Link href="/about" className="mk-btn mk-btn-ghost-on-dark">
              Meet the founder
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
