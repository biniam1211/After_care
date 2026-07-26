// ───────────────────────────────────────────────────────────
// AfterCare — Postgres data layer (server-only)
//
// Active only when DATABASE_URL is set. Every route checks dbConfigured()
// first; when it's unset the app runs on localStorage exactly as before.
// Schema is created idempotently on first use.
// ───────────────────────────────────────────────────────────
import { Pool } from "pg";

let pool = null;
let schemaPromise = null;

export function dbConfigured() {
  return !!process.env.DATABASE_URL;
}

function getPool() {
  if (!process.env.DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      // Most hosted Postgres (Vercel, Railway, Supabase, Neon) require SSL.
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
    });
  }
  return pool;
}

export async function q(text, params) {
  const p = getPool();
  if (!p) throw new Error("DATABASE_URL not configured");
  return p.query(text, params);
}

export async function ensureSchema() {
  if (!dbConfigured()) return;
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    await q(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);
    await q(`CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      email text UNIQUE NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`);
    await q(`CREATE TABLE IF NOT EXISTS login_tokens (
      token text PRIMARY KEY,
      email text NOT NULL,
      expires_at timestamptz NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`);
    await q(`CREATE TABLE IF NOT EXISTS sessions (
      token text PRIMARY KEY,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      expires_at timestamptz NOT NULL,
      created_at timestamptz NOT NULL DEFAULT now()
    )`);
    await q(`CREATE TABLE IF NOT EXISTS app_state (
      user_id uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      onboarded boolean NOT NULL DEFAULT false,
      profile jsonb NOT NULL DEFAULT '{}'::jsonb,
      quest_progress jsonb NOT NULL DEFAULT '{}'::jsonb,
      updated_at timestamptz NOT NULL DEFAULT now()
    )`);
  })().catch((e) => {
    schemaPromise = null; // allow retry on next request
    throw e;
  });
  return schemaPromise;
}
