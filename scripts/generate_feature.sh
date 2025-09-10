#!/usr/bin/env bash
# Simple generator: copy a template directory into the repo under a new folder.
# Usage: ./scripts/generate_feature.sh <template-name> <destination-path>

set -euo pipefail

TEMPLATE_DIR="$(dirname "$0")/../templates/$1"
DEST="$2"

if [ -z "${1-}" ] || [ -z "${2-}" ]; then
  echo "Usage: $0 <template-name> <destination-path>"
  exit 1
fi

if [ ! -d "$TEMPLATE_DIR" ]; then
  echo "Template not found: $TEMPLATE_DIR"
  exit 2
fi

if [ -e "$DEST" ]; then
  echo "Destination already exists: $DEST"
  exit 3
fi

mkdir -p "$(dirname "$DEST")"
cp -R "$TEMPLATE_DIR" "$DEST"

echo "Copied template $1 -> $DEST"

# If additional vars are passed as KEY=VALUE, convert to JSON and apply
if [ "$#" -gt 2 ]; then
  shift 2 || true
  VARS_JSON="{}"
  # collect remaining args as KEY=VALUE
  for kv in "$@"; do
    k="${kv%%=*}"
    v="${kv#*=}"
    # build JSON incrementally
    if [ "$VARS_JSON" = "{}" ]; then
      VARS_JSON="{\"$k\":\"$v\"}"
    else
      VARS_JSON="${VARS_JSON%}}},\"$k\":\"$v\"}"
    fi
  done
  # run template_apply.js to replace placeholders
  node "$(dirname "$0")/template_apply.js" "$DEST" "$VARS_JSON"
fi

echo "Next steps:"
echo " - Inspect the files in $DEST and update any placeholders (e.g., REPO name, DB connection)."
echo " - Run tests and linters locally." 
echo " - Commit to a branch and open a draft PR for review."
