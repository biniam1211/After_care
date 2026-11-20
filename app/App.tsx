import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  type AppStateStatus,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import * as WebBrowser from "expo-web-browser";
import * as ExpoLinking from "expo-linking";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView, type WebViewNavigation, type WebViewMessageEvent } from "react-native-webview";
import { CrisisScreen } from "./src/CrisisScreen";
import { LockScreen } from "./src/LockScreen";
import { PrivacySettings } from "./src/PrivacySettings";
import {
  authenticatePrivacyLock,
  isPrivacyLockEnabled,
} from "./src/appLock";
import {
  APP_HOST,
  APP_ORIGIN,
  APP_URL,
  EXTERNAL_SCHEMES,
  HARBOR,
} from "./src/config";
import { isAppHost, resolveDeepLink } from "./src/linking";
import {
  registerForPushAsync,
  schedulePanicCheckIn,
  syncPushTokenToServer,
} from "./src/notifications";

// Keep splash up until lock preference + first paint are ready.
SplashScreen.preventAutoHideAsync().catch(() => {});

type Screen = "loading" | "lock" | "crisis" | "privacy" | "web" | "failed";

function Shell() {
  const webRef = useRef<WebView>(null);
  const canGoBack = useRef(false);
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const insets = useSafeAreaInsets();

  const [screen, setScreen] = useState<Screen>("loading");
  const [webLoading, setWebLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [webUri, setWebUri] = useState(APP_URL);
  const [unlocking, setUnlocking] = useState(false);
  const [lockEnabled, setLockEnabled] = useState(false);
  /** Crisis opened from lock screen — return to lock on close. */
  const [crisisFromLock, setCrisisFromLock] = useState(false);

  const unlock = useCallback(async () => {
    setUnlocking(true);
    const ok = await authenticatePrivacyLock();
    setUnlocking(false);
    if (ok) setScreen("web");
  }, []);

  const gateOnLock = useCallback(async () => {
    const enabled = await isPrivacyLockEnabled();
    setLockEnabled(enabled);
    if (enabled) {
      setScreen("lock");
      // Auto-prompt once; user can also tap Unlock / crisis.
      const ok = await authenticatePrivacyLock();
      if (ok) setScreen("web");
    } else {
      setScreen("web");
    }
  }, []);

  // Boot: hide splash, check privacy lock, register push best-effort.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await gateOnLock();
      } finally {
        if (!cancelled) {
          SplashScreen.hideAsync().catch(() => {});
        }
      }
      const token = await registerForPushAsync();
      if (token) {
        await syncPushTokenToServer(APP_ORIGIN, token);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gateOnLock]);

  // Re-lock when returning from background if privacy lock is on.
  useEffect(() => {
    const sub = AppState.addEventListener("change", (next) => {
      if (
        appState.current.match(/inactive|background/) &&
        next === "active" &&
        lockEnabled &&
        screen === "web"
      ) {
        setScreen("lock");
      }
      appState.current = next;
    });
    return () => sub.remove();
  }, [lockEnabled, screen]);

  // Deep / universal links (magic-link sign-in).
  useEffect(() => {
    const handle = (url: string | null) => {
      if (!url) return;
      const resolved = resolveDeepLink(url);
      if (!resolved) return;
      setWebUri(resolved);
      setReloadKey((k) => k + 1);
      setWebLoading(true);
      if (screen === "failed" || screen === "crisis") setScreen("web");
    };

    ExpoLinking.getInitialURL().then(handle).catch(() => {});
    const sub = ExpoLinking.addEventListener("url", ({ url }) => handle(url));
    return () => sub.remove();
  }, [screen]);

  // Android hardware back walks web history first.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (screen === "crisis") {
        setScreen(crisisFromLock ? "lock" : "web");
        return true;
      }
      if (canGoBack.current && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [screen, crisisFromLock]);

  const onNavStateChange = useCallback((nav: WebViewNavigation) => {
    canGoBack.current = nav.canGoBack;
  }, []);

  const openExternal = useCallback(async (url: string) => {
    try {
      // In-app browser for https — address bar visible, stays in-app.
      if (url.startsWith("http://") || url.startsWith("https://")) {
        await WebBrowser.openBrowserAsync(url, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
          controlsColor: "#2e9bff",
        });
        return;
      }
      await Linking.openURL(url);
    } catch {
      /* ignore */
    }
  }, []);

  // Keep AfterCare pages in the WebView; dialer / SMS / outside sites leave it.
  const onShouldStartLoad = useCallback(
    (req: { url: string }) => {
      const { url } = req;

      if (EXTERNAL_SCHEMES.some((s) => url.startsWith(s))) {
        Linking.openURL(url).catch(() => {});
        return false;
      }

      if (url.startsWith("http://") || url.startsWith("https://")) {
        if (!isAppHost(url)) {
          openExternal(url);
          return false;
        }
      }

      return true;
    },
    [openExternal]
  );

  const onMessage = useCallback((event: WebViewMessageEvent) => {
    // Optional bridge: web can post { type: "panic_checkin", hours: 6 }
    try {
      const data = JSON.parse(event.nativeEvent.data) as {
        type?: string;
        hours?: number;
        enabled?: boolean;
      };
      if (data?.type === "panic_checkin") {
        schedulePanicCheckIn(typeof data.hours === "number" ? data.hours : 6);
      }
      if (data?.type === "privacy_lock" && typeof data.enabled === "boolean") {
        // Web settings can request lock toggle via bridge in a future pass;
        // preference is owned natively today.
      }
    } catch {
      /* ignore non-JSON */
    }
  }, []);

  const retry = useCallback(() => {
    setWebLoading(true);
    setReloadKey((k) => k + 1);
    setScreen("web");
  }, []);

  const openCrisis = useCallback((fromLock = false) => {
    setCrisisFromLock(fromLock);
    setScreen("crisis");
  }, []);

  if (screen === "loading") {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#2e9bff" />
      </View>
    );
  }

  if (screen === "lock") {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <LockScreen
          unlocking={unlocking}
          onUnlock={unlock}
          onOpenCrisis={() => openCrisis(true)}
        />
      </View>
    );
  }

  if (screen === "privacy") {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <PrivacySettings
          onClose={async () => {
            const enabled = await isPrivacyLockEnabled();
            setLockEnabled(enabled);
            setScreen("web");
          }}
        />
      </View>
    );
  }

  if (screen === "crisis") {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <CrisisScreen
          dismissible
          onClose={() => setScreen(crisisFromLock ? "lock" : "web")}
          onOpenPrivacy={() => setScreen("privacy")}
        />
      </View>
    );
  }

  if (screen === "failed") {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <View style={[styles.fallback, { paddingTop: insets.top + 24, paddingBottom: insets.bottom + 16 }]}>
          <Text style={styles.fallbackTitle}>Can&apos;t reach AfterCare</Text>
          <Text style={styles.fallbackBody}>
            Check your connection and try again. Crisis help below still works offline.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={retry}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonLabel}>Try again</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => openCrisis(false)}
            style={({ pressed }) => [styles.crisisCta, pressed && styles.buttonPressed]}
          >
            <Text style={styles.crisisCtaLabel}>Open crisis help</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // screen === "web"
  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />

      <WebView
        key={reloadKey}
        ref={webRef}
        source={{ uri: webUri }}
        style={styles.web}
        domStorageEnabled
        javaScriptEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        scalesPageToFit={false}
        contentInsetAdjustmentBehavior="never"
        allowsBackForwardNavigationGestures
        pullToRefreshEnabled
        overScrollMode="never"
        setSupportMultipleWindows={false}
        onNavigationStateChange={onNavStateChange}
        onShouldStartLoadWithRequest={onShouldStartLoad}
        onMessage={onMessage}
        onLoadEnd={() => setWebLoading(false)}
        onError={() => {
          setWebLoading(false);
          setScreen("failed");
        }}
        onHttpError={({ nativeEvent }) => {
          if (nativeEvent.statusCode >= 500) {
            setWebLoading(false);
            setScreen("failed");
          }
        }}
        // Inject a tiny bridge so the web Panic Button can schedule a native
        // local notification check-in (works even if cron email is unset).
        injectedJavaScriptBeforeContentLoaded={`
          window.AfterCareNative = {
            schedulePanicCheckIn: function(hours) {
              window.ReactNativeWebView && window.ReactNativeWebView.postMessage(
                JSON.stringify({ type: 'panic_checkin', hours: hours || 6 })
              );
            }
          };
          true;
        `}
      />

      {/* Always-reachable SOS — native crisis screen, not the web Panic UI */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open offline crisis help"
        onPress={() => openCrisis(false)}
        style={({ pressed }) => [
          styles.sos,
          { bottom: Math.max(insets.bottom, 12) + 88 },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.sosLabel}>SOS</Text>
      </Pressable>

      {webLoading && (
        <View style={styles.loading} pointerEvents="none">
          <ActivityIndicator size="large" color="#2e9bff" />
        </View>
      )}
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Shell />
    </SafeAreaProvider>
  );
}

// Silence unused in case host is needed for future associated-domains checks.
void APP_HOST;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HARBOR, alignItems: "stretch", justifyContent: "center" },
  web: { flex: 1, backgroundColor: HARBOR },
  loading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: HARBOR,
  },
  fallback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: HARBOR,
  },
  fallbackTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  fallbackBody: {
    color: "rgba(255,255,255,.72)",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
    marginTop: 10,
  },
  button: {
    marginTop: 26,
    height: 50,
    paddingHorizontal: 30,
    borderRadius: 99,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonPressed: { opacity: 0.75 },
  buttonLabel: { color: HARBOR, fontSize: 16, fontWeight: "800" },
  crisisCta: {
    marginTop: 14,
    minHeight: 48,
    paddingHorizontal: 24,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  crisisCtaLabel: { color: "#ff8a8e", fontSize: 15.5, fontWeight: "800" },
  sos: {
    position: "absolute",
    right: 18,
    width: 56,
    height: 56,
    borderRadius: 99,
    backgroundColor: "#ff3b41",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#ff3b41",
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  sosLabel: { color: "#fff", fontWeight: "900", fontSize: 13, letterSpacing: 0.6 },
});
