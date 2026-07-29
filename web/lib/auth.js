// ───────────────────────────────────────────────────────────
// AfterCare — auth helpers (server-only)
// Magic-link tokens + httpOnly session cookies over the Postgres layer.
// ───────────────────────────────────────────────────────────
import crypto from "crypto";
import { q, ensureSchema, dbConfigured } from "./db";

export const SESSION_COOKIE = "ac_session";
const SESSION_DAYS = 30;
const LOGIN_TTL_MIN = 20;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validEmail(e) {
  return typeof e === "string" && EMAIL_RE.test(e.trim());
}

export function newToken() {
  return crypto.randomBytes(32).toString("hex");
}

function readCookie(req, name) {
  const raw = req.headers.get("cookie") || "";
  const m = raw.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? decodeURIComponent(m[1]) : null;
}

// Resolve the site origin from proxy headers (works on Vercel) or APP_URL.
export function siteOrigin(req) {
  if (process.env.APP_URL) return process.env.APP_URL.replace(/\/$/, "");
  const proto = req.headers.get("x-forwarded-proto") || "https";
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (host) return `${proto}://${host}`;
  return new URL(req.url).origin;
}

export async function getSessionUser(req) {
  if (!dbConfigured()) return null;
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return null;
  await ensureSchema();
  const { rows } = await q(
    `SELECT u.id, u.email FROM sessions s JOIN users u ON u.id = s.user_id
       WHERE s.token = $1 AND s.expires_at > now()`,
    [token]
  );
  return rows[0] || null;
}

// Create a magic-login token for an email; returns the token string.
export async function createLoginToken(email) {
  await ensureSchema();
  const token = newToken();
  await q(
    `INSERT INTO login_tokens (token, email, expires_at)
       VALUES ($1, $2, now() + ($3 || ' minutes')::interval)`,
    [token, email.trim().toLowerCase(), String(LOGIN_TTL_MIN)]
  );
  return token;
}

// Redeem a login token → upsert user, create a session, return { token, user }.
export async function redeemLoginToken(token) {
  await ensureSchema();
  const found = await q(
    `DELETE FROM login_tokens WHERE token = $1 AND expires_at > now() RETURNING email`,
    [token]
  );
  if (!found.rows[0]) return null;
  const email = found.rows[0].email;
  const u = await q(
    `INSERT INTO users (email) VALUES ($1)
       ON CONFLICT (email) DO UPDATE SET email = EXCLUDED.email
       RETURNING id, email`,
    [email]
  );
  const user = u.rows[0];
  const session = newToken();
  await q(
    `INSERT INTO sessions (token, user_id, expires_at)
       VALUES ($1, $2, now() + ($3 || ' days')::interval)`,
    [session, user.id, String(SESSION_DAYS)]
  );
  return { token: session, user };
}

export async function destroySession(req) {
  if (!dbConfigured()) return;
  const token = readCookie(req, SESSION_COOKIE);
  if (!token) return;
  await ensureSchema();
  await q(`DELETE FROM sessions WHERE token = $1`, [token]);
}

export function sessionCookie(token, maxAgeSeconds) {
  const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
  const age = maxAgeSeconds != null ? maxAgeSeconds : SESSION_DAYS * 24 * 3600;
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax;${secure} Max-Age=${age}`;
}
