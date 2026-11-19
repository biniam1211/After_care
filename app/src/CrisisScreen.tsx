/**
 * Fully offline native crisis screen.
 * Reachable even when the web app never loads. Uses the OS dialer / SMS.
 */
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EMERGENCY_911, NATIONAL_CRISIS, type CrisisLine } from "./crisis";

const HARBOR = "#06283d";

type Props = {
  onClose?: () => void;
  /** When true, show a close/back control (online SOS overlay). */
  dismissible?: boolean;
  onOpenPrivacy?: () => void;
};

async function dial(line: CrisisLine): Promise<void> {
  const url = `tel:${line.tel}`;
  try {
    await Linking.openURL(url);
  } catch {
    /* ignore — dialer unavailable on simulators without phone */
  }
}

async function text(line: CrisisLine): Promise<void> {
  if (!line.sms) return;
  const body =
    line.id === "trevor" ? "START" : "I need help";
  const url = `sms:${line.sms}${body ? `?body=${encodeURIComponent(body)}` : ""}`;
  try {
    await Linking.openURL(url);
  } catch {
    /* ignore */
  }
}

export function CrisisScreen({ onClose, dismissible, onOpenPrivacy }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.kicker}>You&apos;re not alone</Text>
        <Text style={styles.title}>Help that works offline</Text>
        <Text style={styles.body}>
          These numbers are built into the app. They work with no Wi‑Fi and no
          AfterCare site — just tap to call or text on your phone.
        </Text>

        {NATIONAL_CRISIS.map((line) => (
          <View key={line.id} style={styles.card}>
            <Text style={styles.cardName}>{line.name}</Text>
            <Text style={styles.cardNote}>{line.note}</Text>
            <View style={styles.row}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Call ${line.name}`}
                onPress={() => dial(line)}
                style={({ pressed }) => [styles.primaryBtn, pressed && styles.pressed]}
              >
                <Text style={styles.primaryLabel}>Call {line.phone}</Text>
              </Pressable>
              {line.sms ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Text ${line.name}`}
                  onPress={() => text(line)}
                  style={({ pressed }) => [styles.secondaryBtn, pressed && styles.pressed]}
                >
                  <Text style={styles.secondaryLabel}>Text</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        ))}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Call 911"
          onPress={() => dial(EMERGENCY_911)}
          style={({ pressed }) => [styles.emergencyBtn, pressed && styles.pressed]}
        >
          <Text style={styles.emergencyLabel}>In immediate danger? Call 911</Text>
        </Pressable>

        {onOpenPrivacy ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Privacy lock settings"
            onPress={onOpenPrivacy}
            style={({ pressed }) => [styles.privacyBtn, pressed && styles.pressed]}
          >
            <Text style={styles.privacyLabel}>Privacy lock (Face ID / passcode)</Text>
          </Pressable>
        ) : null}

        {dismissible && onClose ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close crisis help"
            onPress={onClose}
            style={({ pressed }) => [styles.closeBtn, pressed && styles.pressed]}
          >
            <Text style={styles.closeLabel}>Back to AfterCare</Text>
          </Pressable>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HARBOR },
  scroll: { paddingHorizontal: 22, paddingBottom: 24 },
  kicker: {
    color: "#7ec8ff",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 10,
  },
  body: {
    color: "rgba(255,255,255,.78)",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 22,
  },
  card: {
    backgroundColor: "rgba(255,255,255,.08)",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.14)",
  },
  cardName: { color: "#fff", fontSize: 17, fontWeight: "800", marginBottom: 6 },
  cardNote: { color: "rgba(255,255,255,.72)", fontSize: 14, lineHeight: 20, marginBottom: 14 },
  row: { flexDirection: "row", gap: 10 },
  primaryBtn: {
    flex: 1,
    minHeight: 48,
    borderRadius: 99,
    backgroundColor: "#ff3b41",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  primaryLabel: { color: "#fff", fontWeight: "800", fontSize: 15 },
  secondaryBtn: {
    minWidth: 72,
    minHeight: 48,
    borderRadius: 99,
    backgroundColor: "rgba(255,255,255,.14)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  secondaryLabel: { color: "#fff", fontWeight: "800", fontSize: 15 },
  emergencyBtn: {
    marginTop: 8,
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,158,87,.18)",
    borderWidth: 1,
    borderColor: "rgba(255,158,87,.35)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  emergencyLabel: { color: "#ffd4a8", fontWeight: "800", fontSize: 15.5, textAlign: "center" },
  privacyBtn: {
    marginTop: 18,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.22)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  privacyLabel: { color: "rgba(255,255,255,.85)", fontWeight: "700", fontSize: 14.5 },
  closeBtn: {
    marginTop: 12,
    minHeight: 48,
    borderRadius: 99,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeLabel: { color: HARBOR, fontWeight: "800", fontSize: 16 },
  pressed: { opacity: 0.8 },
});
