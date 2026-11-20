import nextVitals from "eslint-config-next/core-web-vitals";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  ...nextVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",
      // Next 16 / eslint-plugin-react-hooks v7 ships React Compiler rules that
      // flag established patterns in this codebase (localStorage hydration in
      // effects, small helpers declared inside screens). Keep classic hooks
      // rules; treat Compiler-only rules as warnings so CI stays a real gate
      // without a full rewrite of every screen.
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/preserve-manual-memoization": "warn",
      "react-hooks/incompatible-library": "warn",
      "react-hooks/unsupported-syntax": "warn",
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "scripts/**"],
  },
];

export default config;
