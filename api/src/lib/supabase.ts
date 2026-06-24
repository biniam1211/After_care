import { createClient } from '@supabase/supabase-js';
import { env } from './env.js';

/**
 * Service-role client — bypasses RLS. Use ONLY on the server, never expose the
 * key to the app. For per-user operations we still scope queries by user_id.
 */
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

/**
 * Build a request-scoped client that acts AS the signed-in user, so RLS applies.
 * Pass the user's access token (Bearer) from the Authorization header.
 */
export function supabaseForUser(accessToken: string) {
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
