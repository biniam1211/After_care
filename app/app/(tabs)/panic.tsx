import { useState } from 'react';
import { ActivityIndicator, Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { api, type PanicPlan, type PanicScenario } from '../../lib/api';
import { track } from '../../lib/analytics';
import { colors, radius, spacing } from '../../lib/theme';

const SCENARIOS: { value: PanicScenario; label: string }[] = [
  { value: 'homeless', label: 'I have nowhere to sleep tonight' },
  { value: 'kicked_out', label: 'I’m being kicked out' },
  { value: 'abuse', label: 'I’m being hurt' },
  { value: 'eviction', label: 'I’m about to be evicted' },
  { value: 'other', label: 'Something else' },
];

/**
 * The Panic Button. Must work even with zero account data — national crisis
 * lines always come back. Tap a scenario → get a plan in seconds.
 */
export default function PanicScreen() {
  const [plan, setPlan] = useState<PanicPlan | null>(null);
  const [loading, setLoading] = useState<PanicScenario | null>(null);
  const [smsBusy, setSmsBusy] = useState(false);

  async function textContact(scenario: PanicScenario) {
    setSmsBusy(true);
    try {
      const res = await api.panicSms(scenario);
      Alert.alert(
        res.sent ? 'Sent' : 'Couldn’t send',
        res.sent
          ? `We texted ${res.to}.`
          : 'No contact set, or texting is unavailable. Add an emergency contact in your Profile.',
      );
    } catch (e) {
      Alert.alert('Couldn’t send', e instanceof Error ? e.message : 'Add an emergency contact in your Profile.');
    } finally {
      setSmsBusy(false);
    }
  }

  async function trigger(scenario: PanicScenario) {
    setLoading(scenario);
    track('panic_triggered', { scenario });
    try {
      setPlan(await api.panic(scenario));
    } catch {
      // Even if the API fails, surface a hard-coded national fallback.
      setPlan({
        scenario,
        national: [
          { name: '988 Suicide & Crisis Lifeline', phone: '988', note: 'Free, 24/7.' },
          { name: 'Covenant House', phone: '1-800-388-3888', note: 'Youth shelters nationwide.' },
        ],
        local: [],
      });
    } finally {
      setLoading(null);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.h1}>You’re not alone.</Text>
      <Text style={styles.muted}>Tap what’s happening. I’ll give you a plan right now.</Text>

      {SCENARIOS.map((s) => (
        <Pressable key={s.value} style={styles.scenario} onPress={() => trigger(s.value)}>
          {loading === s.value ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.scenarioText}>{s.label}</Text>
          )}
        </Pressable>
      ))}

      {plan && (
        <View style={styles.plan}>
          <Pressable style={styles.smsButton} onPress={() => textContact(plan.scenario)} disabled={smsBusy}>
            {smsBusy ? (
              <ActivityIndicator color={colors.accentText} />
            ) : (
              <Text style={styles.smsButtonText}>✉️ Text my emergency contact</Text>
            )}
          </Pressable>

          <Text style={styles.planHeader}>Call now — these are free and 24/7:</Text>
          {plan.national.map((r) => (
            <Pressable
              key={r.name}
              style={styles.resource}
              onPress={() => r.phone && Linking.openURL(`tel:${r.phone.replace(/[^0-9]/g, '')}`)}
            >
              <Text style={styles.resourceName}>{r.name}</Text>
              {r.phone && <Text style={styles.resourcePhone}>📞 {r.phone}</Text>}
              <Text style={styles.muted}>{r.note}</Text>
            </Pressable>
          ))}

          {plan.local.length > 0 && (
            <>
              <Text style={[styles.planHeader, { marginTop: spacing.lg }]}>Near you:</Text>
              {plan.local.map((r) => (
                <View key={r.id} style={styles.resource}>
                  <Text style={styles.resourceName}>{r.name}</Text>
                  {r.phone && <Text style={styles.resourcePhone}>📞 {r.phone}</Text>}
                  {r.description && <Text style={styles.muted}>{r.description}</Text>}
                </View>
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  h1: { color: colors.text, fontSize: 28, fontWeight: '800' },
  muted: { color: colors.textMuted, fontSize: 14, marginTop: spacing.xs, lineHeight: 20 },
  scenario: {
    backgroundColor: colors.panic,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  scenarioText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  plan: { marginTop: spacing.xl },
  smsButton: { backgroundColor: colors.accent, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginBottom: spacing.lg },
  smsButtonText: { color: colors.accentText, fontWeight: '700', fontSize: 15 },
  planHeader: { color: colors.text, fontSize: 18, fontWeight: '700', marginBottom: spacing.sm },
  resource: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resourceName: { color: colors.text, fontSize: 16, fontWeight: '700' },
  resourcePhone: { color: colors.accent, fontSize: 16, fontWeight: '600', marginTop: spacing.xs },
});
