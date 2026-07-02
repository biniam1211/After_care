import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../../lib/theme';

type IoniconName = keyof typeof Ionicons.glyphMap;

/** Bottom tabs: Chat | Quests | Panic | Profile. Panic is visually distinct. */
export default function TabsLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Chat',
          tabBarIcon: (p) => <TabIcon {...p} on="chatbubble-ellipses" off="chatbubble-ellipses-outline" />,
          headerRight: () => (
            <Pressable onPress={() => router.push('/resources')} style={{ paddingHorizontal: spacing.md }}>
              <Text style={{ color: colors.accent, fontWeight: '700' }}>Find help</Text>
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: 'Quests',
          tabBarIcon: (p) => <TabIcon {...p} on="trophy" off="trophy-outline" />,
        }}
      />
      <Tabs.Screen
        name="panic"
        options={{
          title: 'Panic',
          tabBarActiveTintColor: colors.panic,
          tabBarIcon: ({ focused }) => (
            <Ionicons name={focused ? 'alert-circle' : 'alert-circle-outline'} size={24} color={colors.panic} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (p) => <TabIcon {...p} on="person-circle" off="person-circle-outline" />,
        }}
      />
    </Tabs>
  );
}

function TabIcon({ focused, color, on, off }: { focused: boolean; color: string; on: IoniconName; off: IoniconName }) {
  return <Ionicons name={focused ? on : off} size={24} color={color} />;
}
