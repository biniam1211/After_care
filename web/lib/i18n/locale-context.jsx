"use client";

/**
 * Client locale toggle (en/es). Preference in localStorage — no PII.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DICT } from "@/lib/i18n/dictionaries";

const STORAGE_KEY = "aftercare_locale";

function readStoredLocale() {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* ignore */
  }
  return "en";
}

/** @type {import('react').Context<{ locale: 'en'|'es', setLocale: (l:'en'|'es')=>void, t: (key:string)=>string }>} */
const LocaleContext = createContext({
  locale: "en",
  setLocale: () => {},
  t: (k) => k,
});

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    } catch {
      /* ignore */
    }
  }, [locale]);

  const setLocale = useCallback((l) => {
    if (l === "en" || l === "es") setLocaleState(l);
  }, []);

  const t = useCallback(
    (key) => {
      const table = DICT[locale] || DICT.en;
      return table[key] || DICT.en[key] || key;
    },
    [locale]
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  return useContext(LocaleContext);
}

/**
 * Banner for pages that are not fully translated.
 */
export function UntranslatedBanner() {
  const { locale, t } = useLocale();
  if (locale !== "es") return null;
  return (
    <p className="mk-untranslated" role="status">
      {t("untranslated")}
    </p>
  );
}
