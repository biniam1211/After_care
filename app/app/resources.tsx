import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api, type Resource } from '../lib/api';
import { colors, radius, spacing } from '../lib/theme';
import { ResourceCard } from '../components/ResourceCard';

const CATEGORIES = [
  { value: undefined, label: 'All' },
  { value: 'housing', label: 'Housing' },
  { value: 'shelter', label: 'Shelter' },
  { value: 'finance', label: 'Money' },
  { value: 'legal', label: 'Legal' },
  { value: 'mental_health', label: 'Mental health' },
  { value: 'health', label: 'Health' },
  { value: 'food', label: 'Food' },
  { value: 'employment', label: 'Jobs' },
  { value: 'crisis', label: 'Crisis' },
] as const;

/** Resource Finder — browse curated, location-aware resources by category. */
export default function ResourcesScreen() {
  const [category, setCategory] = useState<string | undefined>(undefined);

  // Profile drives the state filter so we only show in-state resources.
  const { data: me } = useQuery({ queryKey: ['me'], queryFn: api.getMe });
  const state = (me?.user as { state?: string } | undefined)?.state;

  const { data, isLoading, error } = useQuery({
    queryKey: ['resources', category, state],
    queryFn: () => api.listResources({ category, state }),
  });

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: 'Find help', headerStyle: { backgroundColor: colors.bg }, headerTintColor: colors.text }} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c.label}
            onPress={() => setCategory(c.value)}
            style={[styles.chip, category === c.value && styles.chipActive]}
          >
            <Text style={[styles.chipText, category === c.value && styles.chipTextActive]}>{c.label}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingTop: spacing.sm }}>
        {isLoading ? (
          <ActivityIndicator color={colors.accent} style={{ marginTop: spacing.xl }} />
        ) : error ? (
          <Text style={styles.muted}>Couldn’t load resources. Check your connection and try again.</Text>
        ) : (data?.resources ?? []).length === 0 ? (
          <Text style={styles.muted}>
            No resources here yet{state ? ` for ${state}` : ''}. Try another category, or ask in Chat.
          </Text>
        ) : (
          (data?.resources ?? []).map((r: Resource) => <ResourceCard key={r.id} resource={r} />)
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  filters: { maxHeight: 56, borderBottomWidth: 1, borderBottomColor: colors.border },
  filtersContent: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, gap: spacing.sm, alignItems: 'center' },
  chip: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: { backgroundColor: colors.accent, borderColor: colors.accent },
  chipText: { color: colors.text, fontWeight: '600', fontSize: 13 },
  chipTextActive: { color: colors.accentText },
  muted: { color: colors.textMuted, fontSize: 14, marginTop: spacing.xl, lineHeight: 20, textAlign: 'center' },
});
