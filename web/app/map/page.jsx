import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { CountyMap } from "@/components/county-map";
import { UntranslatedBannerClient } from "@/components/untranslated-banner-client";
import "../marketing.css";

export const metadata = {
  title: "County map",
  description:
    "Tap any California county to see its CDSS ILP contact plus food, housing, and legal help from the verified AfterCare directory.",
};

export default function MapPage() {
  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <UntranslatedBannerClient />
          <p className="mk-kicker">All 58 counties</p>
          <h1 className="mk-h1">
            Find your county. <em>Then call.</em>
          </h1>
          <p className="mk-deck">
            Every stamp opens real CDSS Independent Living Program contacts and
            statewide help you can cite — not invented numbers.
          </p>
        </div>
      </header>
      <section className="mk-section">
        <div className="mk-wrap">
          <CountyMap />
        </div>
      </section>
      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
