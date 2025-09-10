#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_NAME="${1:-crud}"

if [ -z "$TEMPLATE_NAME" ]; then
  echo "Usage: $0 <template-name>"
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TMP_DIR="$(mktemp -d -t copilot-smoke-XXXX)"

echo "Generating template $TEMPLATE_NAME into $TMP_DIR"
"$ROOT_DIR/scripts/generate_feature.sh" "$TEMPLATE_NAME" "$TMP_DIR/generated"

if [ -f "$TMP_DIR/generated/package.json" ]; then
  echo "Installing and testing generated feature"
  (cd "$TMP_DIR/generated" && if [ -f package-lock.json ]; then npm ci; else npm install --no-audit --no-fund; fi && npm test)
else
  echo "No package.json in generated template; skipping tests"
fi

echo "Cleaning up"
rm -rf "$TMP_DIR"
echo "Smoke demo completed"
