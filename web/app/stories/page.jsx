import Link from "next/link";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { Contact } from "@/components/legal-page";
import {
  FounderFigure,
  FounderStoryPlaceholder,
  FOUNDER_JOURNEY,
} from "@/components/founder-photos";
import "../marketing.css";

export const metadata = {
  title: "Stories",
  description:
    "Real stories from the AfterCare community, in people's own words — with nothing invented and nothing published without permission.",
  openGraph: {
    title: "Stories · AfterCare",
    description:
      "Real stories from the AfterCare community, in people's own words — with nothing invented and nothing published without permission.",
    type: "website",
  },
};

const SHARE_STEPS = [
  {
    num: "01",
    title: "Your photo",
    body: "A photo of you — or a place or object that matters to your story. Never a photo of someone else without their permission.",
  },
  {
    num: "02",
    title: "Your words, in your own voice",
    body: "Write it the way you would tell it. We do not rewrite your story, and we do not put words in your mouth.",
  },
  {
    num: "03",
    title: "Your permission to publish",
    body: "You say yes to exactly what goes up — the photo and the words. And you can ask us to take it down any time.",
  },
  {
    num: "04",
    title: "Under 18? A parent or guardian must give permission",
    body: "If you are under 18, a parent or guardian has to give permission before anything of yours is published here. No exceptions.",
  },
];

export default function Stories() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">Stories</p>
          <h1 className="mk-h1">
            Real stories, in real people&rsquo;s <em>own words.</em>
          </h1>
          <p className="mk-deck">
            Stories from the AfterCare community, in people&rsquo;s own words.
            Nothing here is invented, and nothing goes up without the person who
            lived it saying so.
          </p>
        </div>
      </header>

      <section className="mk-section" id="featured">
        <div className="mk-wrap">
          <p className="mk-kicker">Featured</p>
          <h2 className="mk-h2">The founder&rsquo;s journey</h2>
          <p className="mk-lead">
            Real photos from Biniam Efrem&rsquo;s life as a foster youth —
            graduation, family, first job, first car. Captions are simple; the
            long-form story is reserved for him to write.
          </p>
          <FounderStoryPlaceholder />
          <div className="mk-journey" style={{ marginTop: 28 }}>
            {FOUNDER_JOURNEY.map((j) => (
              <div className="mk-journey-step" key={j.step}>
                <span className="mk-step-num">{j.step} — {j.title}</span>
                <FounderFigure photoId={j.photoId} sizes="(max-width: 800px) 100vw, 25vw" />
              </div>
            ))}
          </div>
          <p className="mk-lead">
            <Link href="/about#story">More on the About page →</Link>
          </p>
        </div>
      </section>

      <section className="mk-section mk-section-alt" id="what">
        <div className="mk-wrap">
          <p className="mk-kicker">What a story is</p>
          <h2 className="mk-h2">Your experience, told your way.</h2>
          <p className="mk-lead">
            A story here is a photo and a few sentences in your own voice. We do
            not invent testimonials, and we do not publish without permission.
          </p>
        </div>
      </section>

      <section className="mk-section" id="share">
        <div className="mk-wrap">
          <p className="mk-kicker">Share your story</p>
          <h2 className="mk-h2">Here is what we need from you.</h2>
          <div className="mk-ledger">
            {SHARE_STEPS.map((s) => (
              <div className="mk-ledger-row" key={s.num}>
                <div className="mk-ledger-num">{s.num}</div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mk-note" style={{ marginTop: 28 }}>
            <strong>How to reach us.</strong> To share a story, <Contact />.
            Read the consent rules above first.
          </div>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn mk-btn-primary">
              Get involved
            </Link>
            <Link href="/about" className="mk-btn mk-btn-ghost">
              About AfterCare
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
