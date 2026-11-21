"use client";

/**
 * Client providers for org + product shells.
 */
import { LocaleProvider } from "@/lib/i18n/locale-context";

/**
 * @param {{ children: import('react').ReactNode }} props
 */
export function Providers({ children }) {
  return <LocaleProvider>{children}</LocaleProvider>;
}
