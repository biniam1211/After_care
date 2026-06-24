import { useCallback, useEffect, useRef, useState } from 'react';
import { GiftedChat, type IMessage } from 'react-native-gifted-chat';
import { Pressable, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { api, type CitedResource } from '../../lib/api';
import { colors, radius, spacing } from '../../lib/theme';
import { ResourceCard } from '../../components/ResourceCard';

type ChatMessage = IMessage & { resources?: CitedResource[]; crisis?: boolean };

const AI_USER = { _id: 2, name: 'AfterCare' };
const ME = { _id: 1 };

const GREETING: ChatMessage = {
  _id: 'greeting',
  text: "Hey — I'm AfterCare. Ask me anything. Bank account, housing tonight, FAFSA, whatever. I'll keep it real and point you to help that's actually near you.",
  createdAt: new Date(),
  user: AI_USER,
};

/** The heart of the app: a WhatsApp-style chat with the AfterCare navigator. */
export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ prefill?: string }>();
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [typing, setTyping] = useState(false);
  const prefilled = useRef<string | null>(null);

  // Restore the most recent conversation on mount.
  useEffect(() => {
    api
      .getLatestConversation()
      .then(({ conversation, messages: stored }) => {
        if (!conversation || stored.length === 0) return;
        setConversationId(conversation.id);
        // GiftedChat renders newest-first, so reverse the chronological history.
        const restored: ChatMessage[] = stored
          .map((m) => ({
            _id: m.id,
            text: m.content,
            createdAt: new Date(m.created_at),
            user: m.role === 'assistant' ? AI_USER : ME,
            resources: m.role === 'assistant' ? m.resources_cited : undefined,
          }))
          .reverse();
        setMessages(restored);
      })
      .catch(() => {/* first run / offline — keep greeting */});
  }, []);

  const send = useCallback(
    async (text: string) => {
      if (!text.trim()) return;
      const outgoing: ChatMessage = {
        _id: `${Date.now()}-me`,
        text,
        createdAt: new Date(),
        user: ME,
      };
      setMessages((prev) => GiftedChat.append(prev, [outgoing]));
      setTyping(true);

      try {
        const res = await api.sendChat(text, conversationId);
        setConversationId(res.conversationId);
        const reply: ChatMessage = {
          _id: `${Date.now()}-ai`,
          text: res.reply,
          createdAt: new Date(),
          user: AI_USER,
          resources: res.resources,
          crisis: res.crisis,
        };
        setMessages((prev) => GiftedChat.append(prev, [reply]));
      } catch {
        const errMsg: ChatMessage = {
          _id: `${Date.now()}-err`,
          text: "I couldn't reach the navigator just now. Try again in a sec — and if it's an emergency, hit the Panic button.",
          createdAt: new Date(),
          user: AI_USER,
        };
        setMessages((prev) => GiftedChat.append(prev, [errMsg]));
      } finally {
        setTyping(false);
      }
    },
    [conversationId],
  );

  // Deep-link prefill (e.g. a quest AI check-in) — send once.
  useEffect(() => {
    if (params.prefill && prefilled.current !== params.prefill) {
      prefilled.current = params.prefill;
      send(params.prefill);
    }
  }, [params.prefill, send]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <GiftedChat
        messages={messages}
        onSend={(msgs) => send(msgs[0]?.text ?? '')}
        user={ME}
        placeholder="Ask anything…"
        alwaysShowSend
        isTyping={typing}
        renderCustomView={(props) => {
          const msg = props.currentMessage as ChatMessage;
          const hasExtras = (msg.resources && msg.resources.length > 0) || msg.crisis;
          if (!hasExtras) return null;
          return (
            <View style={{ paddingHorizontal: spacing.sm, paddingBottom: spacing.sm, maxWidth: 280 }}>
              {msg.crisis ? (
                <Pressable style={styles.panicBtn} onPress={() => router.push('/(tabs)/panic')}>
                  <Text style={styles.panicBtnText}>🆘 Open Panic plan</Text>
                </Pressable>
              ) : null}
              {(msg.resources ?? []).map((r) => (
                <ResourceCard key={r.id} resource={r} />
              ))}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = {
  panicBtn: {
    backgroundColor: colors.panic,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center' as const,
    marginTop: spacing.sm,
  },
  panicBtnText: { color: '#fff', fontWeight: '700' as const },
};
