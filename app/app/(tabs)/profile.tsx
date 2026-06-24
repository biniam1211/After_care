import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';
import { colors, radius, spacing } from '../../lib/theme';

interface Profile {
  phone?: string;
  zip_code?: string;
  state?: string;
  age?: number;
  foster_status?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

export default function ProfileScreen() {
  const qc = useQueryClient();
  const router = useRouter();
  const { data, isLoading } = useQuery({ queryKey: ['me'], queryFn: api.getMe });
  const user = data?.user as Profile | undefined;

  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setContactName(user.emergency_contact_name ?? '');
      setContactPhone(user.emergency_contact_phone ?? '');
    }
  }, [user]);

  async function saveContact() {
    setSaving(true);
    try {
      await api.saveProfile({ emergency_contact_name: contactName, emergency_contact_phone: contactPhone });
      qc.invalidateQueries({ queryKey: ['me'] });
      Alert.alert('Saved', 'Your emergency contact is set. The Panic button can text them in one tap.');
    } catch (e) {
      Alert.alert('Could not save', e instanceof Error ? e.message : 'Try again');
    } finally {
      setSaving(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.h1}>Profile</Text>

      {isLoading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.lg }} />
      ) : (
        <>
          <View style={styles.card}>
            <Row label="Phone" value={user?.phone ?? '—'} />
            <Row label="ZIP" value={user?.zip_code ?? '—'} />
            <Row label="State" value={user?.state ?? '—'} />
            <Row label="Age" value={user?.age ? String(user.age) : '—'} />
            <Row label="Status" value={formatStatus(user?.foster_status)} />
          </View>

          <Text style={styles.section}>Emergency contact</Text>
          <Text style={styles.muted}>Who should we text when you hit Panic? A caseworker, mentor, or someone you trust.</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            placeholderTextColor={colors.textMuted}
            value={contactName}
            onChangeText={setContactName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone (+1 555 123 4567)"
            placeholderTextColor={colors.textMuted}
            keyboardType="phone-pad"
            value={contactPhone}
            onChangeText={setContactPhone}
          />
          <Pressable style={styles.save} onPress={saveContact} disabled={saving}>
            <Text style={styles.saveText}>{saving ? 'Saving…' : 'Save contact'}</Text>
          </Pressable>
        </>
      )}

      <Pressable style={styles.link} onPress={() => router.push('/resources')}>
        <Text style={styles.linkText}>🔎 Browse all local resources</Text>
      </Pressable>

      <Pressable style={styles.signOut} onPress={() => supabase.auth.signOut()}>
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>

      <Text style={styles.footer}>AfterCare is always free for foster youth. Your data is yours.</Text>
    </ScrollView>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function formatStatus(status?: string) {
  if (status === 'in_care') return 'In care';
  if (status === 'extended_care') return 'Extended care';
  if (status === 'aged_out') return 'Aged out';
  return '—';
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  h1: { color: colors.text, fontSize: 28, fontWeight: '800', marginBottom: spacing.md },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  rowLabel: { color: colors.textMuted, fontSize: 15 },
  rowValue: { color: colors.text, fontSize: 15, fontWeight: '600' },
  section: { color: colors.text, fontSize: 18, fontWeight: '700', marginTop: spacing.xl, marginBottom: spacing.xs },
  muted: { color: colors.textMuted, fontSize: 13, lineHeight: 19, marginBottom: spacing.sm },
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    fontSize: 16,
    marginTop: spacing.sm,
  },
  save: { backgroundColor: colors.accent, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  saveText: { color: colors.accentText, fontWeight: '700' },
  link: { marginTop: spacing.xl, padding: spacing.md, alignItems: 'center', borderRadius: radius.md, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border },
  linkText: { color: colors.text, fontWeight: '600' },
  signOut: { marginTop: spacing.md, padding: spacing.md, alignItems: 'center', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  signOutText: { color: colors.panic, fontWeight: '700' },
  footer: { color: colors.textMuted, fontSize: 13, marginTop: spacing.xl, textAlign: 'center', lineHeight: 19 },
});
