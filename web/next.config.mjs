import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  turbopack: {
    // Pin the workspace root to web/. Without this, Turbopack walks up looking
    // for a lockfile and can settle on the user's home directory (there is a
    // stray package-lock.json above this repo), at which point the "@/" alias
    // from jsconfig.json resolves against the wrong root and every import
    // fails. Vercel builds with Root Directory = web/, so pinning it here also
    // makes local builds match CI and production exactly.
    root: dirname(fileURLToPath(import.meta.url)),
  },

  async headers() {
    // Security headers for every route. CSP is deliberately moderate so
    // Next.js inline bootstraps, Google Fonts, and tel:/sms: links keep working.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Next.js needs 'unsafe-inline' / 'unsafe-eval' in some builds; keep
      // script-src scoped to self + inline. No third-party script hosts.
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "connect-src 'self' https://api.resend.com https://*.sanity.io https://in.logs.betterstack.com https://*.betterstack.com",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
