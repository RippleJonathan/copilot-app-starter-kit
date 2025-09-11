#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_NAME="$1"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TEMPLATE_DIR="$ROOT_DIR/templates/$TEMPLATE_NAME"
if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "Template not found: $TEMPLATE_NAME"
  exit 2
fi

TMPDIR="$(mktemp -d)"
echo "Testing template: $TEMPLATE_NAME -> $TMPDIR"
cp -R "$TEMPLATE_DIR/"* "$TMPDIR/"
cd "$TMPDIR"

if [ -f package.json ]; then
  echo "Installing dependencies for $TEMPLATE_NAME"
  npm ci --silent
else
  echo "No package.json for $TEMPLATE_NAME; skipping npm install"
fi

if [ -f test.js ]; then
  echo "Running test.js for $TEMPLATE_NAME"
  node test.js
else
  echo "No test.js found for $TEMPLATE_NAME"
fi

if [ "$TEMPLATE_NAME" = "frontend" ] && [ -f package.json ]; then
  # attempt a build for frontend templates
  if npm run build --silent; then
    echo "Build succeeded for $TEMPLATE_NAME"
  else
    echo "Build failed for $TEMPLATE_NAME" >&2
    exit 1
  fi
fi

echo "Template $TEMPLATE_NAME OK"
