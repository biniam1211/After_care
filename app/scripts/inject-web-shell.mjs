/**
 * Post-export step for the web build (run after `expo export --platform web`).
 *
 * The SPA output ("single") doesn't support app/+html.tsx customization, and the
 * static output can't render this app in Node (supabase/gifted-chat touch
 * `window` at module scope). So we inject the installed-app shell into
 * dist/index.html here instead:
 *   - Apple/PWA meta so "Add to Home Screen" opens full-screen with our icon
 *   - manifest + apple-touch-icon links (assets come from public/)
 *   - a branded boot splash shown while the JS bundle loads (removed by
 *     app/_layout.tsx once the app mounts)
 *   - app-feel CSS: dark overscroll, no tap-highlight, phone frame on desktop
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const file = join(dist, 'index.html');
let html = readFileSync(file, 'utf8');

if (html.includes('boot-splash')) {
  console.log('[inject-web-shell] already injected, skipping');
  process.exit(0);
}

const headBlock = `
    <meta name="description" content="The missing parent in your pocket. Built by a foster kid, for foster kids." />
    <meta name="theme-color" content="#0F172A" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="AfterCare" />
    <link rel="manifest" href="/app/manifest.json" />
    <link rel="apple-touch-icon" href="/app/icons/apple-touch-icon.png" />
    <style>
      html, body { background: #0F172A; }
      body {
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        overscroll-behavior-y: none;
      }
      @media (min-width: 560px) {
        body { background: #020617; }
        #root {
          max-width: 430px;
          margin: 0 auto;
          border-left: 1px solid #1E293B;
          border-right: 1px solid #1E293B;
          box-shadow: 0 0 80px rgba(0, 0, 0, 0.55);
        }
      }
      #boot-splash {
        position: fixed; inset: 0; z-index: 9999;
        background: #0F172A;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        gap: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      #boot-splash .brand { color: #F8FAFC; font-size: 32px; font-weight: 800; letter-spacing: -0.5px; }
      #boot-splash .tag { color: #94A3B8; font-size: 14px; }
      #boot-splash .buoy {
        width: 56px; height: 56px; border-radius: 50%;
        border: 8px solid #38BDF8;
        border-top-color: #1E293B;
        animation: buoy-spin 0.9s linear infinite;
      }
      @keyframes buoy-spin { to { transform: rotate(360deg); } }
    </style>
`;

const splash = `
    <div id="boot-splash">
      <div class="buoy" aria-hidden="true"></div>
      <div class="brand">AfterCare</div>
      <div class="tag">loading…</div>
    </div>
`;

// Ensure safe-area insets work in standalone mode.
html = html.replace(/<meta name="viewport"[^>]*>/,
  '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, shrink-to-fit=no" />');
html = html.replace('</head>', `${headBlock}</head>`);
html = html.replace('</body>', `${splash}</body>`);

writeFileSync(file, html);
console.log('[inject-web-shell] PWA shell injected into dist/index.html');
