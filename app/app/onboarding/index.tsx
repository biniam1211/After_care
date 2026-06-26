import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Linking from 'expo-linking';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';
import { track } from '../../lib/analytics';
import { colors, radius, spacing } from '../../lib/theme';

type Step = 'email' | 'sent' | 'profile';
type FosterStatus = 'in_care' | 'aged_out' | 'extended_care';

const STATUS_OPTIONS: { value: FosterStatus; label: string }[] = [
  { value: 'in_care', label: 'In care' },
  { value: 'extended_care', label: 'Extended care' },
  { value: 'aged_out', label: 'Aged out' },
];

/**
 * Onboarding flow: email magic-link (Supabase, PKCE) → ZIP → age → foster status.
 * Kept to a single screen with steps so the first run feels fast. After the user
 * taps the link in their email, the app reopens via the `aftercare://` deep link
 * and the root layout exchanges the code for a session, which routes them in.
 */
export default function Onboarding() {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState<FosterStatus | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function sendMagicLink() {
    setBusy(true);
    // Reopens the app at /onboarding so the user lands on the profile step once
    // the root layout establishes the session from the link's code.
    const emailRedirectTo = Linking.createURL('/onboarding');
    // Dev aid: copy this exact URL into Supabase → Auth → URL Configuration →
    // Redirect URLs so the magic link can reopen the app (Expo Go uses an exp:// URL).
    if (__DEV__) console.log('[auth] magic-link redirect URL (allowlist this in Supabase):', emailRedirectTo);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo },
    });
    setBusy(false);
    if (error) return Alert.alert('Hmm', error.message);
    setStep('sent');
  }

  async function saveProfile() {
    setBusy(true);
    try {
      await api.saveProfile({
        zip_code: zip || undefined,
        age: age ? Number(age) : undefined,
        foster_status: status ?? undefined,
      });
      track('onboard_complete', { has_status: !!status });
      // The root layout's auth guard will route into the app.
    } catch (e) {
      Alert.alert('Could not save', e instanceof Error ? e.message : 'Try again');
    } finally {
      setBusy(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>AfterCare</Text>
        <Text style={styles.tagline}>The missing parent in your pocket. Built by a foster kid, for foster kids.</Text>

        {step === 'email' && (
          <View style={styles.block}>
            <Text style={styles.label}>What’s your email?</Text>
            <Text style={styles.hint}>We send you a sign-in link. No password, no spam.</Text>
            <TextInput
              style={styles.input}
              placeholder="you@email.com"
              placeholderTextColor={colors.textMuted}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />

            <Pressable style={styles.consentRow} onPress={() => setConsent((c) => !c)}>
              <View style={[styles.checkbox, consent && styles.checkboxOn]}>
                {consent && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.consentText}>
                I’m 14 or older. I get that AfterCare is an AI (not a person), it’s not a
                lawyer or therapist, and in an emergency I’ll call 988 or use the Panic
                button. My info is private and never sold.
              </Text>
            </Pressable>

            <PrimaryButton
              label="Send link"
              onPress={sendMagicLink}
              disabled={busy || !email.includes('@') || !consent}
            />
          </View>
        )}

        {step === 'sent' && (
          <View style={styles.block}>
            <Text style={styles.label}>Check your email</Text>
            <Text style={styles.hint}>
              We sent a sign-in link to {email.trim()}. Tap it on this phone and you’ll come
              right back here, signed in.
            </Text>
            <PrimaryButton label="Use a different email" onPress={() => setStep('email')} disabled={busy} />
          </View>
        )}

        {step === 'profile' && (
          <View style={styles.block}>
            <Text style={styles.label}>A couple quick things</Text>
            <Text style={styles.hint}>So we only show help that’s actually near you.</Text>

            <TextInput
              style={styles.input}
              placeholder="ZIP code"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={zip}
              onChangeText={setZip}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={age}
              onChangeText={setAge}
            />

            <Text style={[styles.hint, { marginTop: spacing.md }]}>Where are you right now?</Text>
            <View style={styles.chips}>
              {STATUS_OPTIONS.map((opt) => (
                <Pressable
                  key={opt.value}
                  onPress={() => setStatus(opt.value)}
                  style={[styles.chip, status === opt.value && styles.chipActive]}
                >
                  <Text style={[styles.chipText, status === opt.value && styles.chipTextActive]}>{opt.label}</Text>
                </Pressable>
              ))}
            </View>

            <PrimaryButton label="Start" onPress={saveProfile} disabled={busy} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function PrimaryButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.buttonDisabled]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg, paddingTop: spacing.xl },
  brand: { color: colors.text, fontSize: 40, fontWeight: '800' },
  tagline: { color: colors.textMuted, fontSize: 16, marginTop: spacing.sm, marginBottom: spacing.xl, lineHeight: 22 },
  block: { gap: spacing.sm },
  label: { color: colors.text, fontSize: 22, fontWeight: '700' },
  hint: { color: colors.textMuted, fontSize: 14, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: 18,
  },
  consentRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md, alignItems: 'flex-start' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxOn: { backgroundColor: colors.accent, borderColor: colors.accent },
  checkboxMark: { color: colors.accentText, fontWeight: '800' },
  consentText: { color: colors.textMuted, fontSize: 13, lineHeight: 19, flex: 1 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.text, fontWeight: '600' },
  chipTextActive: { color: colors.accentText },
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { color: colors.accentText, fontSize: 18, fontWeight: '700' },
});
