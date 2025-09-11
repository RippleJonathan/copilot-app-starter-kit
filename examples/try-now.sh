#!/usr/bin/env bash
set -euo pipefail

TEMPLATE=${1:-crud}
DEST=${2:-./examples/generated-demo}
shift 2 || true

if [ -d "$DEST" ]; then
  echo "Destination $DEST already exists. Choose a different folder or remove it."
  exit 1
fi

echo "Generating template '$TEMPLATE' -> $DEST"
./scripts/generate_feature.sh "$TEMPLATE" "$DEST" "$@"

if [ -f "$DEST/package.json" ]; then
  echo "Installing dependencies in $DEST"
  if [ -f "$DEST/package-lock.json" ]; then
    (cd "$DEST" && npm ci)
  else
    (cd "$DEST" && npm install)
  fi

  echo "Running tests in $DEST"
  (cd "$DEST" && npm test)
else
  echo "No package.json in generated folder. Open $DEST to inspect files."
fi

echo "Demo complete. Generated files are in $DEST"
echo "If you want to remove them run: rm -rf $DEST"
