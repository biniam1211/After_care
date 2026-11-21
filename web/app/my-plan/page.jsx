"use client";

/**
 * My Plan — browser-only saved resources/quests/checklist.
 * Share links encode non-PII choices only (age, county, ids).
 */
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  OrgNav,
  OrgFooter,
  CrisisStrip,
  VerificationBadge,
} from "@/components/site-chrome";
import { UntranslatedBanner, useLocale } from "@/lib/i18n/locale-context";
import { RESOURCES, QUESTS } from "@/components/data";
import { MILESTONES } from "@/components/age-milestones";
import {
  decodeShare,
  emptyPlan,
  encodeShare,
  loadPlan,
  savePlan,
  toggleQuest,
  toggleResource,
} from "@/lib/my-plan";
import { Suspense } from "react";
import "../marketing.css";

function MyPlanInner() {
  const { t } = useLocale();
  const searchParams = useSearchParams();
  const [plan, setPlan] = useState(emptyPlan);
  const [shareNote, setShareNote] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = searchParams.get("share");
    if (token) {
      const shared = decodeShare(token);
      if (shared) {
        const saved = savePlan(shared);
        setPlan(saved);
        setShareNote("Loaded a shared plan on this device (no name was included).");
        return;
      }
    }
    const ageParam = searchParams.get("age");
    const loaded = loadPlan();
    if (ageParam && /^\d{1,2}$/.test(ageParam)) {
      setPlan(savePlan({ ...loaded, age: ageParam }));
      return;
    }
    setPlan(loaded);
  }, [searchParams]);

  const savedResources = useMemo(
    () => plan.resources.map((id) => [id, RESOURCES[id]]).filter(([, r]) => r),
    [plan.resources]
  );
  const savedQuests = useMemo(
    () => QUESTS.filter((q) => plan.quests.includes(q.slug)),
    [plan.quests]
  );
  const milestone = MILESTONES.find((m) => String(m.age) === String(plan.age));

  const onAge = (age) => {
    const next = savePlan({ ...plan, age });
    setPlan(next);
    if (age) {
      const m = MILESTONES.find((x) => String(x.age) === String(age));
      if (m?.href?.includes("/programs/")) {
        /* age unlocks stay as checklist suggestions */
      }
    }
  };

  const copyShare = async () => {
    const url = `${window.location.origin}/my-plan?share=${encodeShare(plan)}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareNote("Share link copied — it only includes age, county, and saved ids.");
    } catch {
      setShareNote(url);
    }
  };

  if (!mounted) {
    return (
      <div className="mk">
        <OrgNav />
        <header className="mk-page-hero">
          <div className="mk-wrap">
            <h1 className="mk-h1">{t("plan.title")}</h1>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="mk">
      <OrgNav />
      <header className="mk-page-hero">
        <div className="mk-wrap">
          <UntranslatedBanner />
          <p className="mk-kicker">No account · stays in your browser</p>
          <h1 className="mk-h1">
            {t("plan.title")}. <em>Yours only.</em>
          </h1>
          <p className="mk-deck">{t("plan.deck")}</p>
          <div className="mk-cta-row">
            <button type="button" className="mk-btn mk-btn-primary" onClick={() => window.print()}>
              {t("plan.export")}
            </button>
            <button type="button" className="mk-btn mk-btn-ghost" onClick={copyShare}>
              {t("plan.share")}
            </button>
            <button
              type="button"
              className="mk-btn mk-btn-ghost"
              onClick={() => {
                const cleared = savePlan(emptyPlan());
                setPlan(cleared);
                setShareNote("");
              }}
            >
              {t("plan.clear")}
            </button>
          </div>
          {shareNote && (
            <p className="mk-lead" role="status">
              {shareNote}
            </p>
          )}
        </div>
      </header>

      <section className="mk-section">
        <div className="mk-wrap mk-plan-grid">
          <label>
            Age
            <select value={plan.age} onChange={(e) => onAge(e.target.value)}>
              <option value="">Select…</option>
              {MILESTONES.map((m) => (
                <option key={m.age} value={String(m.age)}>
                  {m.age}
                </option>
              ))}
            </select>
          </label>
          <label>
            County
            <input
              value={plan.county}
              onChange={(e) => setPlan(savePlan({ ...plan, county: e.target.value }))}
              placeholder="e.g. Orange"
              maxLength={40}
            />
          </label>
        </div>
      </section>

      {milestone && (
        <section className="mk-section mk-section-alt" id="age-plan">
          <div className="mk-wrap">
            <p className="mk-kicker">You’re {milestone.age}</p>
            <h2 className="mk-h2">
              Here&rsquo;s what to do <em>this year.</em>
            </h2>
            <ul className="mk-checklist">
              {milestone.unlocks.map((u) => (
                <li key={u}>
                  <label>
                    <input
                      type="checkbox"
                      checked={plan.checklist.includes(u)}
                      onChange={() => {
                        const set = new Set(plan.checklist);
                        if (set.has(u)) set.delete(u);
                        else set.add(u);
                        setPlan(savePlan({ ...plan, checklist: [...set] }));
                      }}
                    />{" "}
                    {u}
                  </label>
                </li>
              ))}
            </ul>
            <Link href={milestone.href} className="mk-btn mk-btn-ghost">
              Open related guide →
            </Link>
          </div>
        </section>
      )}

      <section className="mk-section" id="saved">
        <div className="mk-wrap">
          <h2 className="mk-h2">Saved resources</h2>
          {savedResources.length === 0 ? (
            <p className="mk-lead">
              {t("plan.empty")}{" "}
              <Link href="/directory">Open the directory</Link>.
            </p>
          ) : (
            <div className="mk-dir-list">
              {savedResources.map(([id, r]) => (
                <article key={id} className="mk-dir-card">
                  <div className="mk-dir-card-top">
                    <VerificationBadge verified={!!r.verified} />
                  </div>
                  <h3>{r.name}</h3>
                  <p>{r.blurb}</p>
                  <div className="mk-dir-actions">
                    <Link href={`/directory?focus=${encodeURIComponent(id)}`} className="mk-btn mk-btn-primary">
                      Open
                    </Link>
                    <button
                      type="button"
                      className="mk-btn mk-btn-ghost"
                      onClick={() => setPlan(toggleResource(plan, id))}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <h2 className="mk-h2" style={{ marginTop: 40 }}>
            Quests on your plan
          </h2>
          <ul className="mk-checklist">
            {QUESTS.map((q) => (
              <li key={q.slug}>
                <label>
                  <input
                    type="checkbox"
                    checked={plan.quests.includes(q.slug)}
                    onChange={() => setPlan(toggleQuest(plan, q.slug))}
                  />{" "}
                  {q.title}
                </label>
              </li>
            ))}
          </ul>
          {savedQuests.length > 0 && (
            <p className="mk-lead">
              Finish Quests in the{" "}
              <Link href="/app">Ask AfterCare app</Link>.
            </p>
          )}
        </div>
      </section>

      <CrisisStrip />
      <OrgFooter />
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <Suspense
      fallback={
        <div className="mk">
          <OrgNav />
          <header className="mk-page-hero">
            <div className="mk-wrap">
              <h1 className="mk-h1">My Plan</h1>
            </div>
          </header>
        </div>
      }
    >
      <MyPlanInner />
    </Suspense>
  );
}
