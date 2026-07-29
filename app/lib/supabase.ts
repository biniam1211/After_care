import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for the app. Handles email magic-link auth and session
 * persistence. Magic links use the PKCE flow: the link opens the app via the
 * `aftercare://` deep link with a `?code=` param, which the root layout
 * exchanges for a session (see app/_layout.tsx). RLS keeps each user scoped to
 * their own rows, so the anon key is safe here.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
    flowType: 'pkce',
  },
});
