#!/bin/bash
# AfterCare SessionStart hook — installs deps for the api/ and app/ packages so
# tests, typecheck, and linters work in Claude Code on the web.
set -euo pipefail

# Only run in the remote (web) environment; locals manage their own installs.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "[session-start] Installing api/ dependencies…"
( cd "$ROOT/api" && npm install --no-audit --no-fund )

echo "[session-start] Installing app/ dependencies…"
( cd "$ROOT/app" && npm install --no-audit --no-fund )

echo "[session-start] Done."
