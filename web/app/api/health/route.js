// ───────────────────────────────────────────────────────────
// AfterCare — liveness / readiness probe
//
// GET /api/health → { ok, status, integrations, warnings }
// Never exposes secrets. Safe for uptime monitors.
// ───────────────────────────────────────────────────────────
import { envStatus } from "@/lib/env";
import { dbConfigured } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const env = envStatus();
  let dbOk = null;
  if (dbConfigured()) {
    try {
      const { q } = await import("@/lib/db");
      await q("SELECT 1");
      dbOk = true;
    } catch {
      dbOk = false;
    }
  }

  const degraded = dbOk === false;
  return Response.json(
    {
      ok: !degraded,
      status: degraded ? "degraded" : "ok",
      service: "aftercare-web",
      integrations: {
        anthropic: env.anthropic,
        database: env.database,
        databaseReachable: dbOk,
        resend: env.resend,
        cronSecret: env.cronSecret,
        appUrl: env.appUrl,
        sanity: env.sanity,
        betterstack: env.betterstack,
      },
      warnings: env.warnings,
    },
    { status: degraded ? 503 : 200 }
  );
}
