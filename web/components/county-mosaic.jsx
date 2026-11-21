"use client";

/**
 * Interactive stamp wall of all 58 California counties → directory ILP filter.
 * Client-only; remembers last county in localStorage (no PII beyond county name).
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { CA_COUNTIES } from "@/lib/ca-counties";

/**
 * @returns {JSX.Element}
 */
export function CountyMosaic() {
  const [active, setActive] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("aftercare_county");
      if (saved && CA_COUNTIES.includes(saved)) setActive(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const pick = (county) => {
    setActive(county);
    try {
      localStorage.setItem("aftercare_county", county);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="mk-mosaic">
      <div className="mk-mosaic-head">
        <p className="mk-kicker">Tap your county</p>
        <h2 className="mk-h2">
          All <em>58</em> California counties.
        </h2>
        <p className="mk-lead">
          Each stamp opens the verified Independent Living Program contact from
          the CDSS roster for that county.
        </p>
      </div>
      <ul className="mk-mosaic-grid" aria-label="California counties">
        {CA_COUNTIES.map((c, i) => (
          <li key={c} style={{ animationDelay: `${Math.min(i, 40) * 0.012}s` }}>
            <Link
              href={`/directory?need=ilp&focus=${encodeURIComponent(`ilp-${c.toLowerCase().replace(/\s+/g, "-")}`)}`}
              className={active === c ? "is-on" : ""}
              onClick={() => pick(c)}
            >
              {c}
            </Link>
          </li>
        ))}
      </ul>
      {active && (
        <p className="mk-mosaic-note" role="status">
          Saved <strong>{active}</strong> on this device for directory filters.
        </p>
      )}
    </div>
  );
}
