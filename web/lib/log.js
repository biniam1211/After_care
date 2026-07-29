// ───────────────────────────────────────────────────────────
// AfterCare — structured logging to Betterstack (server-only)
//
// Active only when BETTERSTACK_SOURCE_TOKEN is set. Fire-and-forget: logging
// never blocks a response and never throws. With no token, errors go to the
// console and everything else is a no-op — so the demo runs with zero config.
// ───────────────────────────────────────────────────────────
const TOKEN = process.env.BETTERSTACK_SOURCE_TOKEN || process.env.LOGTAIL_SOURCE_TOKEN;
const INGEST_URL = process.env.BETTERSTACK_INGEST_URL || "https://in.logs.betterstack.com";

export function logConfigured() {
  return !!TOKEN;
}

export function log(level, message, data) {
  const entry = {
    dt: new Date().toISOString(),
    level,
    message,
    service: "aftercare-web",
    ...(data || {}),
  };
  if (!TOKEN) {
    if (level === "error") console.error("[aftercare]", message, data || "");
    return;
  }
  // Fire-and-forget; swallow all errors so logging can never affect a request.
  fetch(INGEST_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "content-type": "application/json" },
    body: JSON.stringify(entry),
  }).catch(() => {});
}

export const logInfo = (message, data) => log("info", message, data);
export const logError = (message, data) => log("error", message, data);
