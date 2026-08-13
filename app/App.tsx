import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { WebView, type WebViewNavigation } from "react-native-webview";

// ───────────────────────────────────────────────────────────
// AfterCare — native shell
//
// The product itself is the web app at APP_URL. This shell exists to give it
// a home-screen icon, a full screen with no browser chrome, an Android back
// button that behaves, and — the part a plain browser tab gets wrong — real
// handling for tel:, sms: and mailto: links. Those matter here: the Panic
// Button's whole promise is that tapping a shelter's number actually dials it.
// ───────────────────────────────────────────────────────────

const APP_URL =
  (Constants.expoConfig?.extra?.appUrl as string | undefined) ??
  "https://aftercare-biniam1211s-projects.vercel.app/app";

const APP_HOST = (() => {
  try {
    return new URL(APP_URL).host;
  } catch {
    return "";
  }
})();

// Ocean navy — matches the app's own welcome screen, so the launch moment has
// no white flash between the splash and the first paint.
const HARBOR = "#06283d";

/** Schemes the OS should handle, not the WebView. */
const EXTERNAL_SCHEMES = ["tel:", "sms:", "mailto:", "maps:", "geo:", "intent:"];

export default function App() {
  const webRef = useRef<WebView>(null);
  const canGoBack = useRef(false);

  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  // Android hardware back should walk the web history before leaving the app.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (canGoBack.current && webRef.current) {
        webRef.current.goBack();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, []);

  const onNavStateChange = useCallback((nav: WebViewNavigation) => {
    canGoBack.current = nav.canGoBack;
  }, []);

  // Keep our own pages in the WebView; hand everything else to the OS so a
  // phone number dials and an address opens in the maps app.
  const onShouldStartLoad = useCallback((req: { url: string }) => {
    const { url } = req;

    if (EXTERNAL_SCHEMES.some((s) => url.startsWith(s))) {
      Linking.openURL(url).catch(() => {});
      return false;
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
      let host = "";
      try {
        host = new URL(url).host;
      } catch {
        return true;
      }
      if (host && APP_HOST && host !== APP_HOST) {
        // An outside link (a shelter's own site, a benefits portal) opens in
        // the real browser, where the address bar tells you where you are.
        Linking.openURL(url).catch(() => {});
        return false;
      }
    }

    return true;
  }, []);

  const retry = useCallback(() => {
    setFailed(false);
    setLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  return (
    <View style={styles.root}>
      {/* SDK 57 draws Android edge-to-edge, so the bar has no background of
          its own — the root View's colour shows through. */}
      <StatusBar style="light" />

      {failed ? (
        <View style={styles.fallback}>
          <Text style={styles.fallbackTitle}>Can&rsquo;t reach AfterCare</Text>
          <Text style={styles.fallbackBody}>
            Check your connection and try again.
          </Text>

          <Pressable
            onPress={retry}
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          >
            <Text style={styles.buttonLabel}>Try again</Text>
          </Pressable>

          {/* Crisis numbers stay reachable even with the network down — this is
              the one screen where "try again later" is not an acceptable
              answer on its own. */}
          <View style={styles.crisis}>
            <Text style={styles.crisisTitle}>Need help right now?</Text>
            <Pressable onPress={() => Linking.openURL("tel:988")}>
              <Text style={styles.crisisLink}>Call or text 988 — Suicide &amp; Crisis Lifeline</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("tel:18003883888")}>
              <Text style={styles.crisisLink}>Covenant House CA — 1-800-388-3888</Text>
            </Pressable>
            <Pressable onPress={() => Linking.openURL("tel:911")}>
              <Text style={styles.crisisLink}>Emergency — 911</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <WebView
          key={reloadKey}
          ref={webRef}
          source={{ uri: APP_URL }}
          style={styles.web}
          // The app persists onboarding + quest progress in localStorage, so
          // storage must survive across launches.
          domStorageEnabled
          javaScriptEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          // Let the page own its layout; it is already built phone-first.
          scalesPageToFit={false}
          contentInsetAdjustmentBehavior="never"
          allowsBackForwardNavigationGestures
          pullToRefreshEnabled
          overScrollMode="never"
          setSupportMultipleWindows={false}
          onNavigationStateChange={onNavStateChange}
          onShouldStartLoadWithRequest={onShouldStartLoad}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setFailed(true);
          }}
          onHttpError={({ nativeEvent }) => {
            if (nativeEvent.statusCode >= 500) {
              setLoading(false);
              setFailed(true);
            }
          }}
        />
      )}

      {loading && !failed && (
        <View style={styles.loading} pointerEvents="none">
          <ActivityIndicator size="large" color="#2e9bff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: HARBOR },
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
    padding: 32,
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
  crisis: {
    marginTop: 44,
    alignItems: "center",
    gap: 10,
  },
  crisisTitle: {
    color: "rgba(255,255,255,.5)",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  crisisLink: {
    color: "#7ec8ff",
    fontSize: 15.5,
    fontWeight: "700",
    textAlign: "center",
  },
});
