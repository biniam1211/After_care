// ───────────────────────────────────────────────────────────
// AfterCare — environment helpers (server-only)
//
// The app runs with zero env vars (localStorage + scripted chat).
// In production, some vars become required for safe operation
// once related features are enabled.
// ───────────────────────────────────────────────────────────

/**
 * True when Next is running in production mode.
 * @returns {boolean}
 */
export function isProduction() {
  return process.env.NODE_ENV === "production";
}

/**
 * Snapshot of which integrations are configured (no secret values).
 * Safe to expose from /api/health.
 *
 * @returns {{
 *   production: boolean,
 *   anthropic: boolean,
 *   database: boolean,
 *   resend: boolean,
 *   cronSecret: boolean,
 *   appUrl: boolean,
 *   sanity: boolean,
 *   betterstack: boolean,
 *   warnings: string[],
 * }}
 */
export function envStatus() {
  const production = isProduction();
  const anthropic = !!process.env.ANTHROPIC_API_KEY;
  const database = !!process.env.DATABASE_URL;
  const resend = !!process.env.RESEND_API_KEY;
  const cronSecret = !!process.env.CRON_SECRET;
  const appUrl = !!process.env.APP_URL;
  const sanity = !!(process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET);
  const betterstack = !!process.env.BETTERSTACK_SOURCE_TOKEN;

  /** @type {string[]} */
  const warnings = [];

  if (production && database && !appUrl) {
    warnings.push("APP_URL should be set in production when DATABASE_URL is set (magic-link host pinning).");
  }
  if (production && database && !cronSecret) {
    warnings.push("CRON_SECRET is required in production when DATABASE_URL is set (cron fails closed).");
  }
  if (production && resend && !database) {
    warnings.push("RESEND_API_KEY without DATABASE_URL: caseworker email requires a signed-in session.");
  }
  if (production && !anthropic) {
    warnings.push("ANTHROPIC_API_KEY unset — chat uses scripted fallbacks only.");
  }

  return {
    production,
    anthropic,
    database,
    resend,
    cronSecret,
    appUrl,
    sanity,
    betterstack,
    warnings,
  };
}

/**
 * Log production configuration warnings once at startup (instrumentation).
 * Never throws — missing keys degrade gracefully by design.
 */
export function warnProductionEnv() {
  if (!isProduction()) return;
  const { warnings } = envStatus();
  for (const w of warnings) {
    // Structured enough for Vercel logs; no secrets.
    console.warn(JSON.stringify({ level: "warn", service: "aftercare-web", msg: "env_warning", detail: w }));
  }
}
