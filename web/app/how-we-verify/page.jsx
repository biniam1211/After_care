import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { UntranslatedBannerClient } from "@/components/untranslated-banner-client";
import { VERIFIED_MEANING } from "@/lib/trust-copy";
import "../marketing.css";

export const metadata = {
  title: "How we verify",
  description:
    "How AfterCare marks resource listings verified: official pages and the CDSS county roster — not live phone tests. Public trust page.",
};

export default function HowWeVerifyPage() {
  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <UntranslatedBannerClient />
          <p className="mk-kicker">Trust</p>
          <h1 className="mk-h1">
            How we <em>verify</em> listings.
          </h1>
          <p className="mk-deck">
            Foster youth deserve sources they can check. Here is exactly what
            our badges mean — and what they do not mean.
          </p>
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-wrap-narrow">
          <h2 className="mk-h2">Verified</h2>
          <p className="mk-lead">{VERIFIED_MEANING}</p>
          <ul className="mk-checklist">
            <li>Official organization or government page confirmed (or CDSS county ILP roster).</li>
            <li>Source URL stored on the listing with a “last verified” date.</li>
            <li>Automated link checks run in CI; broken verified links are flagged.</li>
          </ul>

          <h2 className="mk-h2">Needs review</h2>
          <p className="mk-lead">
            The listing may still be useful, but we have not confirmed the
            official page yet — or the link failed a check. Call ahead before
            you rely on it. Use “Report outdated info” on any card.
          </p>

          <h2 className="mk-h2">What we never do</h2>
          <ul className="mk-checklist">
            <li>Invent organizations, phone numbers, statistics, or testimonials.</li>
            <li>Claim 501(c)(3) / tax-deductible status we do not have.</li>
            <li>Store names, emails, or case details from search or My Plan.</li>
            <li>Give clinical diagnoses or legal strategy — we point to real help.</li>
          </ul>

          <h2 className="mk-h2">Stale data monitor</h2>
          <p className="mk-lead">
            A repository script flags listings older than 90 days or with broken
            links so maintainers can re-verify. See{" "}
            <code>web/scripts/stale-resources.mjs</code> and the{" "}
            <code>stale-resources</code> GitHub Action.
          </p>

          <div className="mk-cta-row">
            <Link href="/directory" className="mk-btn mk-btn-primary">
              Open the directory
            </Link>
            <Link href="/research" className="mk-btn mk-btn-ghost">
              Research notes
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
