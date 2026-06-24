import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { colors, spacing } from '../../lib/theme';

/** Bottom tabs: Chat | Quests | Panic | Profile. Panic is visually distinct. */
export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color }) => <TabIcon glyph="💬" color={color} />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/resources')} style={{ paddingHorizontal: spacing.md }}>
              <Text style={{ color: colors.accent, fontWeight: '700' }}>Find help</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{ title: 'Quests', tabBarIcon: ({ color }) => <TabIcon glyph="🎯" color={color} /> }}
      />
      <Tabs.Screen
        name="panic"
        options={{
          title: 'Panic',
          tabBarActiveTintColor: colors.panic,
          tabBarIcon: () => <TabIcon glyph="🆘" color={colors.panic} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ color }) => <TabIcon glyph="👤" color={color} /> }}
      />
    </Tabs>
  );
}

function TabIcon({ glyph, color }: { glyph: string; color: string }) {
  return <Text style={{ fontSize: 20, color }}>{glyph}</Text>;
}
