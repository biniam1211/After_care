import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HARBOR = "#06283d";

type Props = {
  unlocking: boolean;
  onUnlock: () => void;
  onOpenCrisis: () => void;
};

/**
 * Privacy lock gate. Crisis help remains one tap away even while locked —
 * Face ID must never block access to 988.
 */
export function LockScreen({ unlocking, onUnlock, onOpenCrisis }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.root, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}>
      <Text style={styles.brand}>AfterCare</Text>
      <Text style={styles.title}>Locked for privacy</Text>
      <Text style={styles.body}>
        Use Face ID, Touch ID, or your device passcode to open the app. Crisis
        help below still works without unlocking.
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Unlock AfterCare"
        onPress={onUnlock}
        disabled={unlocking}
        style={({ pressed }) => [styles.unlockBtn, pressed && styles.pressed]}
      >
        {unlocking ? (
          <ActivityIndicator color={HARBOR} />
        ) : (
          <Text style={styles.unlockLabel}>Unlock</Text>
        )}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open crisis help without unlocking"
        onPress={onOpenCrisis}
        style={({ pressed }) => [styles.crisisBtn, pressed && styles.pressed]}
      >
        <Text style={styles.crisisLabel}>Need help now — open crisis lines</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: HARBOR,
    paddingHorizontal: 28,
    justifyContent: "center",
  },
  brand: {
    color: "#7ec8ff",
    fontSize: 14,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 28, fontWeight: "800", marginBottom: 10 },
  body: {
    color: "rgba(255,255,255,.75)",
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 28,
  },
  unlockBtn: {
    height: 52,
    borderRadius: 99,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  unlockLabel: { color: HARBOR, fontWeight: "800", fontSize: 16 },
  crisisBtn: {
    marginTop: 16,
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.22)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
  },
  crisisLabel: { color: "#ff8a8e", fontWeight: "800", fontSize: 15 },
  pressed: { opacity: 0.8 },
});
