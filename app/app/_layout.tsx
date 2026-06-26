import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as Linking from 'expo-linking';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { registerForPush } from '../lib/push';
import { colors } from '../lib/theme';

/**
 * Completes email magic-link sign-in (PKCE): the link reopens the app with a
 * `?code=` param, which we exchange for a session. onAuthStateChange then fires
 * and the route guard moves the user into the app.
 */
async function completeAuthFromUrl(url: string | null) {
  if (!url) return;
  const code = Linking.parse(url).queryParams?.code;
  if (typeof code !== 'string') return;
  await supabase.auth.exchangeCodeForSession(code);
}

const queryClient = new QueryClient();

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  // Handle the magic-link deep link, both on cold start and while running.
  useEffect(() => {
    Linking.getInitialURL().then(completeAuthFromUrl);
    const sub = Linking.addEventListener('url', ({ url }) => completeAuthFromUrl(url));
    return () => sub.remove();
  }, []);

  // Route guard: signed-out users land in onboarding; signed-in users in the app.
  useEffect(() => {
    if (!ready) return;
    const inOnboarding = segments[0] === 'onboarding';
    if (!session && !inOnboarding) {
      router.replace('/onboarding');
    } else if (session && inOnboarding) {
      router.replace('/(tabs)');
    }
  }, [ready, session, segments, router]);

  // Register for push once signed in (best-effort).
  useEffect(() => {
    if (session) registerForPush();
  }, [session]);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
        }}
      >
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
