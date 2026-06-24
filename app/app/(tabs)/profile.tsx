import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../lib/supabase';
import { api } from '../../lib/api';
import { colors, radius, spacing } from '../../lib/theme';

interface Profile {
  phone?: string;
  zip_code?: string;
  state?: string;
  age?: number;
  foster_status?: string;
}

export default function ProfileScreen() {
  const { data, isLoading } = useQuery({ queryKey: ['me'], queryFn: api.getMe });
  const user = data?.user as Profile | undefined;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.h1}>Profile</Text>

      {isLoading ? (
        <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.lg }} />
      ) : (
        <View style={styles.card}>
          <Row label="Phone" value={user?.phone ?? '—'} />
          <Row label="ZIP" value={user?.zip_code ?? '—'} />
          <Row label="State" value={user?.state ?? '—'} />
          <Row label="Age" value={user?.age ? String(user.age) : '—'} />
          <Row label="Status" value={formatStatus(user?.foster_status)} />
        </View>
      )}

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
  signOut: { marginTop: spacing.xl, padding: spacing.md, alignItems: 'center', borderRadius: radius.md, borderWidth: 1, borderColor: colors.border },
  signOutText: { color: colors.panic, fontWeight: '700' },
  footer: { color: colors.textMuted, fontSize: 13, marginTop: spacing.xl, textAlign: 'center', lineHeight: 19 },
});
