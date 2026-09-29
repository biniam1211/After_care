import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Pure logic + content-integrity only. Route handlers and React components
    // pull in Next/runtime globals that don't resolve in a plain Node test env.
    include: ["lib/**/*.test.js", "components/**/*.test.js"],
  },
});
