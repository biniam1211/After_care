/**
 * Lightweight checks for magic-link URL resolution.
 * Run with: npx tsc --noEmit (types) — kept as a documented fixture;
 * the shell has no vitest harness yet, so these assertions live as
 * executable Node checks under `npm run typecheck`'s sibling script if added.
 */
import { resolveDeepLink, isMagicLinkVerify } from "./linking";

// Manual smoke when executed via tsx / node after transpile.
export function runLinkingSmoke(): void {
  const verify = resolveDeepLink("aftercare://auth/verify?token=abc123");
  if (!verify || !verify.includes("/api/auth/verify") || !verify.includes("abc123")) {
    throw new Error("custom-scheme magic link failed");
  }
  if (!isMagicLinkVerify(verify)) throw new Error("isMagicLinkVerify failed");
  if (resolveDeepLink("https://evil.example/app") !== null) {
    throw new Error("foreign host should be ignored");
  }
}
