/** Bridge injected into the WebView by the native shell. */
interface AfterCareNativeBridge {
  schedulePanicCheckIn: (hours?: number) => void;
}

interface Window {
  AfterCareNative?: AfterCareNativeBridge;
  ReactNativeWebView?: { postMessage: (msg: string) => void };
}
