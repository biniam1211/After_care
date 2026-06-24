import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { api, type Quest } from '../../lib/api';
import { track } from '../../lib/analytics';
import { colors, radius, spacing } from '../../lib/theme';

/** Quest list + step-by-step detail for the flagship "Get Your First Bank Account". */
export default function QuestsScreen() {
  const { data, isLoading, error } = useQuery({ queryKey: ['quests'], queryFn: api.listQuests });
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.muted}>Couldn’t load quests. Pull to retry later.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.lg }}>
      <Text style={styles.h1}>Quests</Text>
      <Text style={styles.muted}>Small steps. Real wins. Pick one and go.</Text>

      {(data?.quests ?? []).map((quest: Quest) =>
        openSlug === quest.slug ? (
          <QuestDetail key={quest.id} quest={quest} onClose={() => setOpenSlug(null)} />
        ) : (
          <Pressable key={quest.id} style={styles.card} onPress={() => setOpenSlug(quest.slug)}>
            <Text style={styles.cardTitle}>{quest.title}</Text>
            <Text style={styles.muted}>{quest.description}</Text>
            <Text style={styles.progress}>
              {quest.progress?.completed_at
                ? '✅ Done'
                : quest.progress
                  ? `Step ${quest.progress.current_step} of ${quest.steps.length}`
                  : `${quest.steps.length} steps`}
            </Text>
          </Pressable>
        ),
      )}
    </ScrollView>
  );
}

function QuestDetail({ quest, onClose }: { quest: Quest; onClose: () => void }) {
  const qc = useQueryClient();
  const router = useRouter();
  const current = quest.progress?.current_step ?? 1;
  const stepData = quest.steps.find((s) => s.step === current) ?? quest.steps[0];

  const advance = useMutation({
    mutationFn: () => api.advanceQuest(quest.slug, current + 1),
    onSuccess: () => {
      track('quest_step_done', { slug: quest.slug, step: current });
      qc.invalidateQueries({ queryKey: ['quests'] });
    },
  });

  // Starting a quest creates the user_quests row (step 1) so progress is tracked.
  useEffect(() => {
    if (!quest.progress) {
      api.advanceQuest(quest.slug, 1)
        .then(() => qc.invalidateQueries({ queryKey: ['quests'] }))
        .catch(() => {/* non-fatal */});
    }
  }, [quest.progress, quest.slug, qc]);

  // Deep-link the step's AI check-in into Chat so AfterCare follows up.
  const askAboutStep = () =>
    router.push({ pathname: '/(tabs)', params: { prefill: `Quest: ${quest.title} — Step ${stepData.step} (${stepData.title}). ${stepData.ai_check}` } });

  return (
    <View style={[styles.card, styles.detail]}>
      <View style={styles.detailHeader}>
        <Text style={styles.cardTitle}>{quest.title}</Text>
        <Pressable onPress={onClose}>
          <Text style={styles.muted}>Close</Text>
        </Pressable>
      </View>

      <Text style={styles.stepLabel}>
        Step {stepData.step} of {quest.steps.length}
      </Text>
      <Text style={styles.stepTitle}>{stepData.title}</Text>

      <Text style={styles.fieldLabel}>What</Text>
      <Text style={styles.body}>{stepData.what}</Text>
      <Text style={styles.fieldLabel}>Why it matters</Text>
      <Text style={styles.body}>{stepData.why}</Text>
      <Text style={styles.fieldLabel}>Do this</Text>
      <Text style={styles.body}>{stepData.action}</Text>

      <Pressable
        style={styles.button}
        onPress={() => advance.mutate()}
        disabled={advance.isPending || !!quest.progress?.completed_at}
      >
        <Text style={styles.buttonText}>
          {quest.progress?.completed_at
            ? '🎉 Quest complete'
            : current >= quest.steps.length
              ? 'Finish quest'
              : 'Mark this step done'}
        </Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={askAboutStep}>
        <Text style={styles.secondaryButtonText}>💬 Ask AfterCare about this step</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  h1: { color: colors.text, fontSize: 28, fontWeight: '800' },
  muted: { color: colors.textMuted, fontSize: 14, marginTop: spacing.xs, lineHeight: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: { color: colors.text, fontSize: 18, fontWeight: '700' },
  progress: { color: colors.accent, marginTop: spacing.sm, fontWeight: '600' },
  detail: { gap: spacing.xs },
  detailHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  stepLabel: { color: colors.accent, fontWeight: '700', marginTop: spacing.md },
  stepTitle: { color: colors.text, fontSize: 20, fontWeight: '700', marginBottom: spacing.sm },
  fieldLabel: { color: colors.textMuted, fontWeight: '700', marginTop: spacing.md, textTransform: 'uppercase', fontSize: 12 },
  body: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: spacing.xs },
  button: { backgroundColor: colors.accent, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  buttonText: { color: colors.accentText, fontWeight: '700', fontSize: 15 },
  secondaryButton: { borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm, borderWidth: 1, borderColor: colors.border },
  secondaryButtonText: { color: colors.text, fontWeight: '600', fontSize: 14 },
});
