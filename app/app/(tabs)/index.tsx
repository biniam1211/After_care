import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, spacing } from '../../lib/theme';

/**
 * Home — the landing hub (inspired by FosterPower's illustrated topic grid).
 * Big friendly topic tiles that deep-link into what makes AfterCare different:
 * most tiles pre-ask the AI navigator a well-formed question; others jump to
 * the resource finder (category pre-filtered) or the document vault.
 */

function ask(question: string) {
  router.push({ pathname: '/(tabs)/chat', params: { prefill: question } });
}

function browse(category?: string) {
  router.push(category ? { pathname: '/resources', params: { category } } : '/resources');
}

type Topic = { label: string; emoji: string; bg: string; go: () => void };

const TOPICS: Topic[] = [
  {
    label: 'Money & Banking',
    emoji: '💳',
    bg: '#166534',
    go: () => ask('Help me with money basics — opening a bank account, building credit, and any benefits I can get as a foster youth.'),
  },
  { label: 'Housing', emoji: '🏠', bg: '#1E40AF', go: () => browse('housing') },
  {
    label: 'Health Insurance',
    emoji: '🏥',
    bg: '#0F766E',
    go: () => ask("How do I keep my health insurance (Medi-Cal) now that I'm getting older? What do I need to do?"),
  },
  { label: 'Mental Health', emoji: '💚', bg: '#6D28D9', go: () => browse('mental_health') },
  {
    label: 'School & College',
    emoji: '🎓',
    bg: '#B45309',
    go: () => ask('What money and support exists for foster youth going to college — Chafee grants, FAFSA, tuition waivers?'),
  },
  { label: 'Court & Legal', emoji: '⚖️', bg: '#475569', go: () => browse('legal') },
  { label: 'Documents & ID', emoji: '📄', bg: '#3730A3', go: () => router.push('/vault') },
  {
    label: 'Jobs & Work',
    emoji: '💼',
    bg: '#0E7490',
    go: () => ask('Help me get my first job — where to look, what documents I need, and how to write a simple resume.'),
  },
  { label: 'Food & Essentials', emoji: '🍎', bg: '#4D7C0F', go: () => browse('food') },
  {
    label: 'Your Rights',
    emoji: '✊',
    bg: '#BE185D',
    go: () => ask('What are my rights in foster care? Explain the big ones simply.'),
  },
];

export default function Home() {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>AfterCare</Text>
        <Text style={styles.hello}>Hey — you’ve got this. 💪</Text>
        <Text style={styles.sub}>What do you want to figure out today?</Text>

        <Pressable style={styles.askCard} onPress={() => router.push('/(tabs)/chat')}>
          <Ionicons name="chatbubble-ellipses" size={24} color={colors.accentText} />
          <View style={{ flex: 1 }}>
            <Text style={styles.askTitle}>Ask AfterCare anything</Text>
            <Text style={styles.askSub}>Your AI navigator. Real answers, local help.</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color={colors.accentText} />
        </Pressable>

        <View style={styles.row}>
          <QuickAction icon="trophy" label="My quests" onPress={() => router.push('/(tabs)/quests')} />
          <QuickAction icon="location" label="Help near me" onPress={() => browse()} />
        </View>

        <Text style={styles.section}>Explore topics</Text>
        <View style={styles.grid}>
          {TOPICS.map((t) => (
            <Pressable key={t.label} onPress={t.go} style={[styles.tile, { backgroundColor: t.bg }]}>
              <Text style={styles.tileEmoji}>{t.emoji}</Text>
              <Text style={styles.tileLabel}>{t.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.footerNote}>
          In a crisis? The 🆘 Panic tab has real numbers that answer, 24/7.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function QuickAction({ icon, label, onPress }: { icon: keyof typeof Ionicons.glyphMap; label: string; onPress: () => void }) {
  return (
    <Pressable style={styles.quick} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.accent} />
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: spacing.lg, paddingBottom: spacing.xl },
  brand: { color: colors.textMuted, fontSize: 14, fontWeight: '800', letterSpacing: 2, textTransform: 'uppercase' },
  hello: { color: colors.text, fontSize: 30, fontWeight: '800', marginTop: spacing.sm },
  sub: { color: colors.textMuted, fontSize: 16, marginTop: spacing.xs, marginBottom: spacing.lg },
  askCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.accent,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  askTitle: { color: colors.accentText, fontSize: 17, fontWeight: '800' },
  askSub: { color: colors.accentText, fontSize: 13, opacity: 0.75, marginTop: 2 },
  row: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  quick: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
  },
  quickLabel: { color: colors.text, fontWeight: '700', fontSize: 15 },
  section: { color: colors.text, fontSize: 20, fontWeight: '800', marginTop: spacing.xl, marginBottom: spacing.md },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: spacing.sm },
  tile: {
    width: '48.5%',
    borderRadius: radius.lg,
    padding: spacing.md,
    paddingVertical: spacing.lg,
  },
  tileEmoji: { fontSize: 34 },
  tileLabel: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', marginTop: spacing.sm },
  footerNote: { color: colors.textMuted, fontSize: 13, textAlign: 'center', marginTop: spacing.xl },
});
