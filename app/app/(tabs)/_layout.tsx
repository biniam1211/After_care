import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors } from '../../lib/theme';

/** Bottom tabs: Chat | Quests | Panic | Profile. Panic is visually distinct. */
export default function TabsLayout() {
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
        options={{ title: 'Chat', tabBarIcon: ({ color }) => <TabIcon glyph="💬" color={color} /> }}
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
