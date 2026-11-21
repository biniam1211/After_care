"use client";

/**
 * Prominent “What do you need?” search — client-side, no PII.
 */
import { useDeferredValue, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { searchCatalog } from "@/lib/search-catalog";

/**
 * @param {{ compact?: boolean, autoFocus?: boolean, className?: string }} props
 */
export function SiteSearch({ compact = false, autoFocus = false, className = "" }) {
  const [q, setQ] = useState("");
  const deferred = useDeferredValue(q);
  const [open, setOpen] = useState(false);
  const results = deferred.trim() ? searchCatalog(deferred, { limit: 10 }) : [];
  const listId = useId();
  const wrapRef = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className={`mk-search ${compact ? "mk-search-compact" : ""} ${className}`.trim()} ref={wrapRef}>
      {!compact && (
        <label className="mk-search-label" htmlFor={listId + "-input"}>
          What do you need?
        </label>
      )}
      <div className="mk-search-box">
        <span className="mk-search-icon" aria-hidden="true">
          ⌕
        </span>
        <input
          id={listId + "-input"}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          autoFocus={autoFocus}
          placeholder={compact ? "What do you need?" : "Try: kicked out, ID, food, Medi-Cal, court…"}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {q && (
          <button
            type="button"
            className="mk-search-clear"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
          >
            ×
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <ul className="mk-search-results" id={listId} role="listbox">
          {results.map((r) => (
            <li key={r.id} role="option">
              <Link
                href={r.href}
                onClick={() => setOpen(false)}
              >
                <span className="mk-search-type">{r.type}</span>
                <strong>{r.title}</strong>
                <span className="mk-search-blurb">{r.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {open && deferred.trim().length > 1 && results.length === 0 && (
        <div className="mk-search-empty" role="status">
          Nothing matched. Try <Link href="/directory?need=crisis">crisis lines</Link>,{" "}
          <Link href="/directory">the directory</Link>, or dial <a href="tel:211">211</a>.
        </div>
      )}
      <p className="mk-search-privacy">Search stays on this device — we don&rsquo;t save what you type.</p>
    </div>
  );
}
