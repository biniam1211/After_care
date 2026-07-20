import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack, router } from 'expo-router';
import { GLOSSARY } from '../lib/glossary';
import { colors, radius, spacing } from '../lib/theme';

/**
 * Common Terms — searchable plain-language glossary of foster-care jargon.
 * Tap a card to expand it; "Ask about this" hands the term to the AI navigator.
 */
export default function GlossaryScreen() {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const terms = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GLOSSARY;
    return GLOSSARY.filter((t) => t.term.toLowerCase().includes(q) || t.plain.toLowerCase().includes(q));
  }, [query]);

  return (
    <View style={styles.safe}>
      <Stack.Screen options={{ title: 'Common Terms' }} />
      <TextInput
        style={styles.search}
        placeholder="Search a word you keep hearing…"
        placeholderTextColor={colors.textMuted}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      <ScrollView contentContainerStyle={styles.list}>
        {terms.map((t) => {
          const expanded = open === t.term;
          return (
            <Pressable key={t.term} style={styles.card} onPress={() => setOpen(expanded ? null : t.term)}>
              <View style={styles.cardHeader}>
                <Text style={styles.term}>{t.term}</Text>
                <Text style={styles.caret}>{expanded ? '▾' : '▸'}</Text>
              </View>
              {expanded ? (
                <>
                  <Text style={styles.plain}>{t.plain}</Text>
                  <Pressable
                    style={styles.askBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/(tabs)/chat',
                        params: { prefill: `Explain "${t.term}" for my situation — what should I actually do about it?` },
                      })
                    }
                  >
                    <Text style={styles.askBtnText}>Ask AfterCare about this →</Text>
                  </Pressable>
                </>
              ) : null}
            </Pressable>
          );
        })}
        {terms.length === 0 ? (
          <Text style={styles.empty}>No matches. Try a shorter word — or just ask in Chat.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  search: {
    margin: spacing.md,
    backgroundColor: colors.surface,
    color: colors.text,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
  },
  list: { paddingHorizontal: spacing.md, paddingBottom: spacing.xl, gap: spacing.sm },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  term: { color: colors.text, fontSize: 17, fontWeight: '700', flex: 1 },
  caret: { color: colors.accent, fontSize: 16, marginLeft: spacing.sm },
  plain: { color: colors.textMuted, fontSize: 15, lineHeight: 22, marginTop: spacing.sm },
  askBtn: { marginTop: spacing.md, alignSelf: 'flex-start' },
  askBtnText: { color: colors.accent, fontWeight: '700' },
  empty: { color: colors.textMuted, textAlign: 'center', marginTop: spacing.xl },
});
