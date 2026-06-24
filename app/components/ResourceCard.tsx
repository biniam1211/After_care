import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius, spacing } from '../lib/theme';
import type { CitedResource, Resource } from '../lib/api';

type AnyResource = CitedResource | Resource;

/** Compact, tappable resource card used under chat replies and in the finder. */
export function ResourceCard({ resource }: { resource: AnyResource }) {
  const phone = resource.phone;
  const url = resource.url;
  const description = 'description' in resource ? resource.description : null;
  const category = 'category' in resource ? resource.category : null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.name}>{resource.name}</Text>
        {category ? <Text style={styles.badge}>{category}</Text> : null}
      </View>
      {description ? <Text style={styles.desc}>{description}</Text> : null}
      <View style={styles.actions}>
        {phone ? (
          <Pressable style={styles.action} onPress={() => Linking.openURL(`tel:${phone.replace(/[^0-9]/g, '')}`)}>
            <Text style={styles.actionText}>📞 Call</Text>
          </Pressable>
        ) : null}
        {url ? (
          <Pressable style={styles.action} onPress={() => Linking.openURL(url)}>
            <Text style={styles.actionText}>🔗 Open</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: spacing.sm },
  name: { color: colors.text, fontWeight: '700', fontSize: 15, flex: 1 },
  badge: { color: colors.accent, fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  desc: { color: colors.textMuted, fontSize: 13, marginTop: spacing.xs, lineHeight: 18 },
  actions: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  action: {
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionText: { color: colors.text, fontWeight: '600', fontSize: 13 },
});
