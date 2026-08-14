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
};

export default nextConfig;
