import { Alert, Platform } from 'react-native';

/**
 * Cross-platform user notification. React Native's Alert.alert is a silent
 * no-op on web (react-native-web doesn't implement it), so errors and
 * confirmations were invisible in the browser build. On web we fall back to
 * window.alert; native keeps the styled system alert.
 */
export function notify(title: string, message?: string) {
  if (Platform.OS === 'web') {
    // eslint-disable-next-line no-alert
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}
