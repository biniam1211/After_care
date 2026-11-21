"use client";

/**
 * Interactive California county map — tap a county to open ILP + local filters.
 * Uses a stamp-grid fallback (accessible) with an SVG outline for visual wow.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { CA_COUNTIES } from "@/lib/ca-counties";
import { RESOURCES } from "@/components/data";
import { useLocale } from "@/lib/i18n/locale-context";

function countyHits(county) {
  const ilpId = `ilp-${county.toLowerCase().replace(/\s+/g, "-")}`;
  const rows = Object.entries(RESOURCES).filter(([, r]) => {
    const counties = r.counties || (r.county ? [r.county] : []);
    return (
      r.county === county ||
      counties.includes(county) ||
      (counties.includes("Statewide") &&
        /food|shelter|housing|legal|crisis|medi/i.test(`${r.cat} ${r.name} ${r.blurb}`))
    );
  });
  const pick = (pred) => rows.filter(([, r]) => pred(r)).slice(0, 4);
  return {
    ilpId,
    ilp: RESOURCES[ilpId] || null,
    food: pick((r) => /food|calfresh|snap|meal/i.test(`${r.name} ${r.blurb}`)),
    housing: pick((r) => r.cat === "Housing" || /shelter|housing|thp/i.test(`${r.name} ${r.blurb}`)),
    legal: pick((r) => r.cat === "Legal" || /legal|attorney|ombud/i.test(`${r.name} ${r.blurb}`)),
  };
}

/**
 * @returns {JSX.Element}
 */
export function CountyMap() {
  const { t } = useLocale();
  const [county, setCounty] = useState("");
  const hits = useMemo(() => (county ? countyHits(county) : null), [county]);

  return (
    <div className="mk-map">
      <div className="mk-map-head">
        <p className="mk-kicker">{t("map.title")}</p>
        <h2 className="mk-h2">
          California, <em>county by county.</em>
        </h2>
        <p className="mk-lead">{t("map.deck")}</p>
      </div>

      <div className="mk-map-layout">
        <div className="mk-map-visual" aria-hidden="true">
          <svg viewBox="0 0 200 240" role="presentation" className="mk-map-svg">
            <path
              d="M40 20 L160 18 L175 70 L170 140 L150 200 L90 220 L50 180 L30 110 Z"
              fill="#1f5a4a"
              opacity="0.85"
            />
            <path
              d="M55 40 L145 38 L155 90 L148 150 L120 190 L70 195 L48 140 Z"
              fill="#d63a22"
              opacity="0.35"
            />
            <text x="100" y="120" textAnchor="middle" fill="#f3e6cc" fontSize="14" fontFamily="Georgia, serif">
              CA
            </text>
          </svg>
          <p className="mk-map-hint">Use the stamp list — every county is a real CDSS ILP link.</p>
        </div>

        <ul className="mk-mosaic-grid mk-map-stamps" aria-label="California counties">
          {CA_COUNTIES.map((c) => (
            <li key={c}>
              <button
                type="button"
                className={county === c ? "is-on" : ""}
                onClick={() => {
                  setCounty(c);
                  try {
                    localStorage.setItem("aftercare_county", c);
                  } catch {
                    /* ignore */
                  }
                }}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {hits && (
        <div className="mk-map-panel" role="region" aria-live="polite">
          <h3>{county} County</h3>
          {hits.ilp ? (
            <p>
              <strong>ILP:</strong> {hits.ilp.name}
              {hits.ilp.phone ? ` · ${hits.ilp.phone}` : ""}{" "}
              <Link href={`/directory?need=ilp&focus=${encodeURIComponent(hits.ilpId)}`}>
                Open ILP →
              </Link>
            </p>
          ) : (
            <p>No ILP id found — browse the directory by county.</p>
          )}
          <div className="mk-map-cols">
            <div>
              <h4>Food</h4>
              <ul>
                {hits.food.map(([id, r]) => (
                  <li key={id}>
                    <Link href={`/directory?focus=${encodeURIComponent(id)}`}>{r.name}</Link>
                  </li>
                ))}
                {!hits.food.length && <li>Try GetCalFresh / 211 statewide</li>}
              </ul>
            </div>
            <div>
              <h4>Housing</h4>
              <ul>
                {hits.housing.map(([id, r]) => (
                  <li key={id}>
                    <Link href={`/directory?focus=${encodeURIComponent(id)}`}>{r.name}</Link>
                  </li>
                ))}
                {!hits.housing.length && <li>Try Covenant House / 211</li>}
              </ul>
            </div>
            <div>
              <h4>Legal</h4>
              <ul>
                {hits.legal.map(([id, r]) => (
                  <li key={id}>
                    <Link href={`/directory?focus=${encodeURIComponent(id)}`}>{r.name}</Link>
                  </li>
                ))}
                {!hits.legal.length && <li>Try foster ombudsperson / 211</li>}
              </ul>
            </div>
          </div>
          <div className="mk-cta-row">
            <Link
              href={`/directory?need=ilp&focus=${encodeURIComponent(hits.ilpId)}`}
              className="mk-btn mk-btn-primary"
            >
              Open {county} in directory
            </Link>
            <Link href="/my-plan" className="mk-btn mk-btn-ghost">
              Save to My Plan
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
