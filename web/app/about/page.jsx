import Link from "next/link";
import { OrgArt } from "@/components/org-art";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  ORG_STATUS,
} from "@/components/site-chrome";
import "../marketing.css";

export const metadata = {
  title: "About us",
  description:
    "AfterCare's story, organization background, goals, and honest status — a social-impact project working toward nonprofit status.",
  openGraph: {
    title: "About us · AfterCare",
    description:
      "AfterCare's story, organization background, goals, and honest status — a social-impact project working toward nonprofit status.",
    type: "website",
  },
};

const GOALS = [
  {
    title: "No young person ages out alone",
    body: "Every young person leaving care has a guide in their pocket — answers, steps, and a plan, any hour of the day.",
  },
  {
    title: "Help that reaches every ZIP code",
    body: "A directory that starts in California and grows state by state until help near home is findable anywhere in America.",
  },
  {
    title: "Finished things, not just information",
    body: "Success is a bank account opened, a grant applied for, a shelter reached — not another page read.",
  },
  {
    title: "Built with lived experience, not about it",
    body: "Designed by someone who went through foster care, shaped by the people it serves — never a lecture from the outside.",
  },
];

const TRANSPARENCY = [
  {
    claim: "501(c)(3) status, tax-deductible donations, registered-nonprofit standing",
    status: "None of those exist yet — and we do not claim them.",
  },
  {
    claim: "Privacy & Terms",
    status: "Plain-English drafts, not yet reviewed by a lawyer.",
  },
  {
    claim: "Directory listings",
    status: "Labeled plainly: verified, or “Unverified — call to confirm.”",
  },
  {
    claim: "Impact numbers",
    status: "We do not publish impact numbers we have not measured.",
  },
];

export default function About() {
  return (
    <div className="mk">
      <OrgNav />

      <header className="mk-page-hero">
        <div className="mk-wrap">
          <p className="mk-kicker">About AfterCare</p>
          <h1 className="mk-h1">
            Built by someone who went through it, <em>for the people coming after him.</em>
          </h1>
          <p className="mk-deck">
            AfterCare is a social-impact project for foster youth ages 16–24 —
            and for the adults and organizations who show up for them.
          </p>
        </div>
      </header>

      {/* ── Our story: long-form with drop cap ── */}
      <section className="mk-section" id="story">
        <div className="mk-wrap">
          <p className="mk-kicker">01 — Our story</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">This isn&rsquo;t charity work.</h2>
              <p className="mk-lead mk-dropcap">
                AfterCare is being built by someone who went through foster
                care and is building the thing he needed when he was in it.
                Youth can tell instantly when something was designed by
                someone who&rsquo;s never been where they are. The tone, the
                questions it asks first, what it refuses to lecture you about —
                all of that comes from lived experience, not a focus group.
              </p>
            </div>
            <aside>
              <figure className="mk-art" aria-hidden="true">
                <OrgArt kind="table" />
                <figcaption>
                  <b>Fig. 1 —</b> Help that happens at a table, not in a
                  portal. A cup, a key, a page of paperwork, made plain.
                </figcaption>
              </figure>
              <p className="mk-caption" style={{ marginTop: 18 }}>
                <b>Editor&rsquo;s note.</b> This section says only what
                Binyam has stated himself.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Organization background: essay with margin ── */}
      <section className="mk-section" id="background">
        <div className="mk-wrap">
          <p className="mk-kicker">02 — Organization background</p>
          <div className="mk-split">
            <div>
              <h2 className="mk-h2">What AfterCare is.</h2>
              <p className="mk-lead">
                AfterCare is an AI life navigator plus a services directory for
                foster youth. The navigator answers questions and walks a young
                person through real tasks — housing, health, work, money, and
                paperwork — one finished thing at a time. The directory lists
                real programs near them, with honest labels about what has and
                hasn&rsquo;t been verified yet.
              </p>
              <p className="mk-lead">
                The work is built for everyone, every ZIP code, every day. The
                directory covers California today and grows from there — the
                goal is a young person anywhere in America finding help near
                home.
              </p>
              <div className="mk-cta-row">
                <Link href="/programs" className="mk-btn mk-btn-primary">
                  Explore programs →
                </Link>
                <Link href="/research" className="mk-btn mk-btn-ghost">
                  See the research
                </Link>
              </div>
            </div>
            <aside>
              <p className="mk-kicker">At a glance</p>
              <p className="mk-lead" style={{ marginTop: 0 }}>
                <b style={{ color: "var(--ink)" }}>Who it serves:</b> foster
                youth ages 16–24, and the adults and organizations who show
                up for them.
              </p>
              <p className="mk-lead">
                <b style={{ color: "var(--ink)" }}>What it is:</b> a
                navigator app plus a services directory. One guide, one map.
              </p>
              <p className="mk-lead">
                <b style={{ color: "var(--ink)" }}>What it costs:</b> nothing.
                Free forever for foster youth.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── Our goals: numbered ledger ── */}
      <section className="mk-section" id="goals">
        <div className="mk-wrap">
          <p className="mk-kicker">03 — Our goals</p>
          <h2 className="mk-h2">What we&rsquo;re working toward.</h2>
          <div className="mk-ledger">
            {GOALS.map((g, i) => (
              <div className="mk-ledger-row" key={g.title}>
                <div className="mk-ledger-num">0{i + 1}</div>
                <div>
                  <h3>{g.title}</h3>
                  <p>{g.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transparency: claim / status table ── */}
      <section className="mk-section" id="transparency">
        <div className="mk-wrap">
          <p className="mk-kicker">04 — Transparency</p>
          <h2 className="mk-h2">The honest status.</h2>
          <p className="mk-deck">
            {ORG_STATUS} That is the honest status: the work is real, the
            product is live in your browser, and the formal nonprofit filing
            is still ahead of us.
          </p>
          <table className="mk-table">
            <thead>
              <tr>
                <th>Claim</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TRANSPARENCY.map((t) => (
                <tr key={t.claim}>
                  <td style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 16, color: "var(--ink)" }}>{t.claim}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mk-cta-row">
            <Link href="/impact" className="mk-btn">
              How we measure impact →
            </Link>
          </div>
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}
