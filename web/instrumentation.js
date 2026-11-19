/**
 * Next.js instrumentation — runs once when the Node server starts.
 * Logs production env warnings without failing the boot (graceful degradation).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { warnProductionEnv } = await import("./lib/env.js");
    warnProductionEnv();
  }
}
