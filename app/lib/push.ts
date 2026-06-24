import { Platform } from 'react-native';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { api } from './api';

/**
 * Ask for push permission and register the Expo token with the API so the
 * reminder job can nudge stalled quests + panic follow-ups. Best-effort: never
 * throws into the UI.
 */
export async function registerForPush(): Promise<void> {
  try {
    if (!Device.isDevice) return; // simulators don't get push tokens

    const existing = await Notifications.getPermissionsAsync();
    let status = existing.status;
    if (status !== 'granted') {
      status = (await Notifications.requestPermissionsAsync()).status;
    }
    if (status !== 'granted') return;

    const projectId =
      Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
    const tokenResp = await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined);

    await api.registerDevice(tokenResp.data, Platform.OS === 'ios' ? 'ios' : 'android');
  } catch (err) {
    console.warn('[push] registration skipped:', err);
  }
}
