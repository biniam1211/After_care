import { useCallback, useState } from 'react';
import { GiftedChat, type IMessage } from 'react-native-gifted-chat';
import { View } from 'react-native';
import { api } from '../../lib/api';
import { colors } from '../../lib/theme';

const AI_USER = { _id: 2, name: 'AfterCare' };
const ME = { _id: 1 };

const GREETING: IMessage = {
  _id: 'greeting',
  text: "Hey — I'm AfterCare. Ask me anything. Bank account, housing tonight, FAFSA, whatever. I'll keep it real and point you to help that's actually near you.",
  createdAt: new Date(),
  user: AI_USER,
};

/** The heart of the app: a WhatsApp-style chat with the AfterCare navigator. */
export default function ChatScreen() {
  const [messages, setMessages] = useState<IMessage[]>([GREETING]);
  const [conversationId, setConversationId] = useState<string | undefined>();

  const onSend = useCallback(
    async (outgoing: IMessage[] = []) => {
      setMessages((prev) => GiftedChat.append(prev, outgoing));
      const text = outgoing[0]?.text ?? '';

      try {
        const res = await api.sendChat(text, conversationId);
        setConversationId(res.conversationId);
        const reply: IMessage = {
          _id: `${Date.now()}-ai`,
          text: res.reply,
          createdAt: new Date(),
          user: AI_USER,
        };
        setMessages((prev) => GiftedChat.append(prev, [reply]));
      } catch (e) {
        const errMsg: IMessage = {
          _id: `${Date.now()}-err`,
          text: "I couldn't reach the navigator just now. Try again in a sec — and if it's an emergency, hit the Panic button.",
          createdAt: new Date(),
          user: AI_USER,
        };
        setMessages((prev) => GiftedChat.append(prev, [errMsg]));
      }
    },
    [conversationId],
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={ME}
        placeholder="Ask anything…"
        alwaysShowSend
      />
    </View>
  );
}
