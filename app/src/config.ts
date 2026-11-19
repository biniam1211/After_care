import Constants from "expo-constants";

/**
 * Live web product URL loaded by the WebView.
 * Prefer expo.extra.appUrl; keep a sensible production default.
 */
export const APP_URL =
  (Constants.expoConfig?.extra?.appUrl as string | undefined) ??
  "https://aftercare-biniam1211s-projects.vercel.app/app";

export const APP_ORIGIN = (() => {
  try {
    const u = new URL(APP_URL);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "https://aftercare-biniam1211s-projects.vercel.app";
  }
})();

export const APP_HOST = (() => {
  try {
    return new URL(APP_URL).host;
  } catch {
    return "";
  }
})();

/** Ocean navy — matches the web welcome screen (no white flash). */
export const HARBOR = "#06283d";

/** Schemes the OS dialer / maps should handle, not the WebView. */
export const EXTERNAL_SCHEMES = [
  "tel:",
  "sms:",
  "mailto:",
  "maps:",
  "geo:",
  "intent:",
] as const;
