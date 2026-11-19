/**
 * Expo push registration + local scheduling for panic check-ins.
 * Remote push is delivered when the web cron finds a registered device token.
 */
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "aftercare_expo_push_token_v1";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Ask for permission and return an Expo push token, or null if unavailable
 * (simulator, denied, Expo Go limitations on some platforms).
 */
export async function registerForPushAsync(): Promise<string | null> {
  if (!Device.isDevice) return null;

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;
  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") return null;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("aftercare-reminders", {
      name: "Reminders & check-ins",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;
  try {
    const token = (
      await Notifications.getExpoPushTokenAsync(
        projectId ? { projectId: String(projectId) } : undefined
      )
    ).data;
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return token;
  } catch {
    return null;
  }
}

export async function getStoredPushToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

/**
 * POST the Expo push token to the web API (cookie session if signed in).
 * Best-effort — never throws into the UI.
 */
export async function syncPushTokenToServer(
  apiOrigin: string,
  token: string
): Promise<boolean> {
  try {
    const res = await fetch(`${apiOrigin}/api/devices`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        token,
        platform: Platform.OS,
        kind: "expo",
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Schedule a local panic check-in notification (works offline / without server).
 * Complements the web `/api/checkin` + cron email path.
 */
export async function schedulePanicCheckIn(
  hours = 6,
  body = "Hey — I said I'd check in. Are you okay? Open AfterCare if you still need help."
): Promise<string | null> {
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: "AfterCare is checking in",
        body,
        sound: true,
        data: { kind: "panic_checkin" },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: Math.max(60, Math.round(hours * 3600)),
        repeats: false,
      },
    });
    return id;
  } catch {
    return null;
  }
}
