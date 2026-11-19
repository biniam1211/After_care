/**
 * Optional Face ID / passcode privacy lock.
 * Preference lives in SecureStore; never leaves the device.
 */
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

const LOCK_KEY = "aftercare_privacy_lock_v1";

export async function isPrivacyLockEnabled(): Promise<boolean> {
  try {
    const v = await SecureStore.getItemAsync(LOCK_KEY);
    return v === "1";
  } catch {
    return false;
  }
}

export async function setPrivacyLockEnabled(enabled: boolean): Promise<void> {
  try {
    if (enabled) {
      await SecureStore.setItemAsync(LOCK_KEY, "1");
    } else {
      await SecureStore.deleteItemAsync(LOCK_KEY);
    }
  } catch {
    /* SecureStore unavailable (web) — no-op */
  }
}

export async function hardwareLockAvailable(): Promise<boolean> {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && enrolled;
  } catch {
    return false;
  }
}

/**
 * Prompt Face ID / Touch ID / device passcode.
 * @returns true if the user authenticated (or lock is unavailable — fail open
 * so a youth in crisis is never locked out of 988 by a broken biometric API).
 */
export async function authenticatePrivacyLock(): Promise<boolean> {
  try {
    const available = await hardwareLockAvailable();
    if (!available) return true;
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Unlock AfterCare",
      cancelLabel: "Cancel",
      disableDeviceFallback: false,
      // Passcode fallback is required — biometrics alone must not brick access.
    });
    return result.success;
  } catch {
    return true;
  }
}
