import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';
import { colors, radius, spacing } from '../../lib/theme';

type Step = 'phone' | 'otp' | 'profile';
type FosterStatus = 'in_care' | 'aged_out' | 'extended_care';

const STATUS_OPTIONS: { value: FosterStatus; label: string }[] = [
  { value: 'in_care', label: 'In care' },
  { value: 'extended_care', label: 'Extended care' },
  { value: 'aged_out', label: 'Aged out' },
];

/**
 * Onboarding flow: phone OTP (Supabase) → ZIP → age → foster status.
 * Kept to a single screen with steps so the first run feels fast.
 */
export default function Onboarding() {
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [zip, setZip] = useState('');
  const [age, setAge] = useState('');
  const [status, setStatus] = useState<FosterStatus | null>(null);
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function sendOtp() {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ phone });
    setBusy(false);
    if (error) return Alert.alert('Hmm', error.message);
    setStep('otp');
  }

  async function verifyOtp() {
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ phone, token: otp, type: 'sms' });
    setBusy(false);
    if (error) return Alert.alert('That code didn’t work', error.message);
    setStep('profile');
  }

  async function saveProfile() {
    setBusy(true);
    try {
      await api.saveProfile({
        zip_code: zip || undefined,
        age: age ? Number(age) : undefined,
        foster_status: status ?? undefined,
      });
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

        {step === 'phone' && (
          <View style={styles.block}>
            <Text style={styles.label}>What’s your number?</Text>
            <Text style={styles.hint}>We text you a code. No spam, ever.</Text>
            <TextInput
              style={styles.input}
              placeholder="+1 555 123 4567"
              placeholderTextColor={colors.textMuted}
              keyboardType="phone-pad"
              autoComplete="tel"
              value={phone}
              onChangeText={setPhone}
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

            <PrimaryButton label="Send code" onPress={sendOtp} disabled={busy || phone.length < 10 || !consent} />
          </View>
        )}

        {step === 'otp' && (
          <View style={styles.block}>
            <Text style={styles.label}>Enter the code</Text>
            <Text style={styles.hint}>Sent to {phone}.</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit code"
              placeholderTextColor={colors.textMuted}
              keyboardType="number-pad"
              value={otp}
              onChangeText={setOtp}
            />
            <PrimaryButton label="Verify" onPress={verifyOtp} disabled={busy || otp.length < 4} />
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
