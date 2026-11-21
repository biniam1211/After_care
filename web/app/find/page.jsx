import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { NeedsFinder } from "@/components/needs-finder";
import "../marketing.css";

export const metadata = {
  title: "What do you need right now?",
  description:
    "Pick your age, situation, and need — AfterCare builds a California foster youth checklist on your device. No personal info collected.",
};

export default function FindPage() {
  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Needs finder</p>
          <h1 className="mk-h1">
            Tell us the moment. <em>We&rsquo;ll map the next steps.</em>
          </h1>
          <p className="mk-deck">
            Age band + situation + need. Runs entirely in your browser — we do
            not ask for your name, case number, or address.
          </p>
        </div>
      </header>
      <section className="mk-section">
        <div className="mk-wrap" style={{ maxWidth: 880 }}>
          <NeedsFinder />
        </div>
      </section>
      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
