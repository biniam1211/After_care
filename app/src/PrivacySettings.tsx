import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  hardwareLockAvailable,
  isPrivacyLockEnabled,
  setPrivacyLockEnabled,
  authenticatePrivacyLock,
} from "./appLock";

const HARBOR = "#06283d";

type Props = { onClose: () => void };

/**
 * Optional Face ID / passcode lock toggle.
 * Stored only on-device in SecureStore.
 */
export function PrivacySettings({ onClose }: Props) {
  const insets = useSafeAreaInsets();
  const [enabled, setEnabled] = useState(false);
  const [available, setAvailable] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      setAvailable(await hardwareLockAvailable());
      setEnabled(await isPrivacyLockEnabled());
    })();
  }, []);

  const onToggle = async (next: boolean) => {
    if (busy) return;
    setBusy(true);
    try {
      if (next) {
        const ok = await authenticatePrivacyLock();
        if (!ok) return;
        await setPrivacyLockEnabled(true);
        setEnabled(true);
      } else {
        const ok = await authenticatePrivacyLock();
        if (!ok) return;
        await setPrivacyLockEnabled(false);
        setEnabled(false);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={[styles.root, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
      <Text style={styles.title}>Privacy lock</Text>
      <Text style={styles.body}>
        When on, AfterCare asks for Face ID, Touch ID, or your device passcode
        when you open the app. Crisis help stays available without unlocking.
      </Text>

      <View style={styles.row}>
        <Text style={styles.rowLabel}>Require unlock</Text>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          disabled={!available || busy}
          trackColor={{ false: "#3a5568", true: "#2e9bff" }}
          accessibilityLabel="Require Face ID or passcode to open AfterCare"
        />
      </View>

      {!available ? (
        <Text style={styles.hint}>
          This device has no Face ID / Touch ID / passcode enrolled, so the lock
          can&apos;t be turned on yet.
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        onPress={onClose}
        style={({ pressed }) => [styles.close, pressed && { opacity: 0.8 }]}
      >
        <Text style={styles.closeLabel}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HARBOR, paddingHorizontal: 22 },
  title: { color: "#fff", fontSize: 26, fontWeight: "800", marginBottom: 10 },
  body: {
    color: "rgba(255,255,255,.75)",
    fontSize: 15.5,
    lineHeight: 22,
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(255,255,255,.08)",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 56,
  },
  rowLabel: { color: "#fff", fontSize: 16, fontWeight: "700" },
  hint: {
    color: "rgba(255,255,255,.55)",
    fontSize: 13.5,
    lineHeight: 19,
    marginTop: 12,
  },
  close: {
    marginTop: 28,
    height: 50,
    borderRadius: 99,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  closeLabel: { color: HARBOR, fontWeight: "800", fontSize: 16 },
});
