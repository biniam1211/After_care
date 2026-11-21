"use client";

import { UntranslatedBanner } from "@/lib/i18n/locale-context";

/** Client wrapper so server pages can show the Spanish incomplete banner. */
export function UntranslatedBannerClient() {
  return <UntranslatedBanner />;
}
