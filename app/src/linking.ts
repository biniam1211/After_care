/**
 * Deep / universal link helpers for magic-link sign-in.
 *
 * Supported:
 * - https://<APP_HOST>/api/auth/verify?token=...
 * - aftercare://auth/verify?token=...
 * - aftercare://app  (open product)
 */
import * as Linking from "expo-linking";
import { APP_HOST, APP_ORIGIN, APP_URL } from "./config";

export function isAppHost(url: string): boolean {
  try {
    const host = new URL(url).host;
    return !!APP_HOST && host === APP_HOST;
  } catch {
    return false;
  }
}

/**
 * Resolve an incoming deep link to a WebView URL, or null if unrelated.
 */
export function resolveDeepLink(url: string): string | null {
  if (!url) return null;

  // Custom scheme: aftercare://auth/verify?token=...
  if (url.startsWith("aftercare://")) {
    try {
      const parsed = Linking.parse(url);
      const path = (parsed.path || "").replace(/^\//, "");
      if (path === "auth/verify" || path === "auth") {
        const token = typeof parsed.queryParams?.token === "string"
          ? parsed.queryParams.token
          : "";
        if (token) {
          return `${APP_ORIGIN}/api/auth/verify?token=${encodeURIComponent(token)}`;
        }
      }
      if (path === "app" || path === "" || path === "crisis") {
        return APP_URL;
      }
    } catch {
      return APP_URL;
    }
    return APP_URL;
  }

  // Universal / https link into our host
  if (url.startsWith("http://") || url.startsWith("https://")) {
    if (!isAppHost(url)) return null;
    return url;
  }

  return null;
}

/** True when the URL is a magic-link verify endpoint. */
export function isMagicLinkVerify(url: string): boolean {
  try {
    const u = new URL(url);
    return u.pathname.includes("/api/auth/verify") && !!u.searchParams.get("token");
  } catch {
    return false;
  }
}
