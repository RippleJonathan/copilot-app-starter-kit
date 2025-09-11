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

MANIFEST="$TEMPLATE_DIR/template.json"
VARS_JSON="{}"
if [ -f "$MANIFEST" ]; then
  # call ask_vars.js which will prompt for missing values or return defaults.
  # To avoid blocking in CI or scripted runs, default to non-interactive
  # mode (use --defaults) unless the user explicitly provides --interactive.
  if [ "$#" -gt 2 ]; then
    shift 2 || true
    # detect explicit --interactive flag in the remaining args
    INTERACTIVE=false
    for a in "$@"; do
      if [ "$a" = "--interactive" ]; then
        INTERACTIVE=true
        break
      fi
    done
    if [ "$INTERACTIVE" = true ]; then
      ARGS="$@"
    else
      ARGS="$@ --defaults"
    fi
  else
    # no extra args: run in non-interactive default mode so the generator
    # doesn't hang waiting for stdin when used in scripts or CI.
    ARGS="--defaults"
  fi

  # ask_vars.js expects the template directory path and optional KEY=VALUE pairs
  VARS_JSON=$(node "$(dirname "$0")/ask_vars.js" "$TEMPLATE_DIR" $ARGS)
  # run template_apply.js to replace placeholders
  node "$(dirname "$0")/template_apply.js" "$DEST" "$VARS_JSON"
else
  # fallback: convert CLI KEY=VALUE into JSON if provided
  if [ "$#" -gt 2 ]; then
    shift 2 || true
    VARS_JSON="{}"
    for kv in "$@"; do
      k="${kv%%=*}"
      v="${kv#*=}"
      if [ "$VARS_JSON" = "{}" ]; then
        VARS_JSON="{\"$k\":\"$v\"}"
      else
        VARS_JSON="${VARS_JSON%}}},\"$k\":\"$v\"}"
      fi
    done
    node "$(dirname "$0")/template_apply.js" "$DEST" "$VARS_JSON"
  fi
fi

echo "Next steps:"
echo " - Inspect the files in $DEST and update any placeholders (e.g., REPO name, DB connection)."
echo " - Run tests and linters locally." 
echo " - Commit to a branch and open a draft PR for review."
