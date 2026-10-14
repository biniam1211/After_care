import Link from "next/link";
import { OrgArt } from "@/components/org-art";
import { OrgPhoto } from "@/components/org-photo";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
} from "@/components/site-chrome";
import { Contact } from "@/components/legal-page";
import "../marketing.css";

export const metadata = {
  title: "Stories",
  description:
    "Real stories from the AfterCare community, in people's own words — with nothing invented and nothing published without permission.",
};

// The three featured slots below are EMPTY FRAMES, not stories.
// No names, no quotes, no photos here are real — each slot waits for a
// real person to share their photo and words with permission. Do not
// fill them with invented stories, stock photos, or fake testimonials.
const FEATURED_SLOTS = [
  {
    num: "01",
    title: "Your story here",
    body: "A real photo and real words from someone in the community — coming once they share it with us and give permission to publish.",
  },
  {
    num: "02",
    title: "Your story here",
    body: "A real photo and real words from someone in the community — coming once they share it with us and give permission to publish.",
  },
  {
    num: "03",
    title: "Your story here",
    body: "A real photo and real words from someone in the community — coming once they share it with us and give permission to publish.",
  },
];

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
            This page is waiting for the community&rsquo;s stories — real
            photos, real words, with permission. Nothing here is invented,
            and nothing goes up without the person who lived it saying so.
          </p>
          <div style={{ marginTop: 28 }}>
            <OrgPhoto
              src="/images/community-friends.jpg"
              alt="Three young adult friends walking together down a city street with coffee, smiling and chatting"
              caption="Community. The people you walk with."
              photographer="Keira Burton"
            />
          </div>
        </div>
      </header>

      {/* ── Featured stories: three EMPTY placeholder frames ── */}
      <section className="mk-section" id="featured">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — Featured stories</p>
          <h2 className="mk-h2">Three frames, waiting to be filled.</h2>
          <p className="mk-lead">
            Every slot below is an empty frame — not a story. No names, no
            quotes, and no photos in these slots are real yet. The first real
            stories will come from the community, with permission.
          </p>
          <div className="mk-ledger">
            {FEATURED_SLOTS.map((s) => (
              <div className="mk-ledger-row" key={s.num}>
                <div className="mk-ledger-num">{s.num}</div>
                <div>
                  <h3>
                    {s.title}{" "}
                    <span className="mk-badge mk-badge-roadmap">
                      Placeholder
                    </span>
                  </h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mk-caption" style={{ marginTop: 18 }}>
            <b>Why placeholders, not stock photos?</b> Stock photos of
            children would pretend to be real people. An honest empty frame
            is better than a fake story. (The hero photo above is licensed
            stock of adults, labeled illustrative — it is not an AfterCare
            youth.)
          </p>
        </div>
      </section>

      {/* ── What a story is: letter figure + plain explanation ── */}
      <section className="mk-section" id="what">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — What a story is</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">Your experience, told your way.</h2>
              <p className="mk-lead">
                A story here is one person&rsquo;s own experience — what
                happened, what helped, what they want someone coming after
                them to know. It is not a testimonial we wrote, and it is
                not a case study with the names changed. The person owns
                their story, start to finish.
              </p>
              <p className="mk-lead">
                We do not publish last names, locations, or contact details
                without explicit agreement — and we never publish anyone
                else&rsquo;s private details as part of your story.
              </p>
            </div>
            <aside>
              <figure className="mk-art" aria-hidden="true">
                <OrgArt kind="letter" />
                <figcaption>
                  <b>Fig. 1 —</b> A story is a letter, not an ad. Written
                  by the person who lived it.
                </figcaption>
              </figure>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Share your story: what we need ── */}
      <section className="mk-section" id="share">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — Share your story</p>
          <h2 className="mk-h2">Here is what we need from you.</h2>
          <p className="mk-lead">
            Three things, plus one rule for anyone under 18. Send them when
            you are ready — there is no deadline, and you can change your
            mind at any point.
          </p>
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
            <strong>To share your story,</strong> reach out to{" "}
            <Contact /> with your photo, your words, and your permission —
            and, if you are under 18, your parent or guardian&rsquo;s
            permission too.
          </div>
          <div className="mk-cta-row">
            <Link href="/get-involved" className="mk-btn mk-btn-primary">
              Other ways to get involved →
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
