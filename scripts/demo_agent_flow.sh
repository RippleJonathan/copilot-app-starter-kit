#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_NAME="${1:-}"
DEST_DIR="${2:-}"
BRANCH_NAME="${3:-demo/autopilot-branch}"
COMMIT_MSG="${4:-Add generated feature}"

if [ -z "$TEMPLATE_NAME" ] || [ -z "$DEST_DIR" ]; then
  echo "Usage: $0 <template-name> <destination-path> [branch-name] [commit-message]"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "Generating template $TEMPLATE_NAME -> $DEST_DIR"
"$REPO_ROOT/scripts/generate_feature.sh" "$TEMPLATE_NAME" "$REPO_ROOT/$DEST_DIR"

if [ -f "$REPO_ROOT/$DEST_DIR/package.json" ]; then
  echo "Running tests for generated feature"
  (cd "$REPO_ROOT/$DEST_DIR" && if [ -f package-lock.json ]; then npm ci; else npm install --no-audit --no-fund; fi && npm test)
else
  echo "No package.json found in generated template; skipping tests"
fi

echo "Creating branch $BRANCH_NAME and committing changes"
git checkout -b "$BRANCH_NAME"
git add "$DEST_DIR"
git commit -m "$COMMIT_MSG" || echo "Nothing to commit"

if command -v gh >/dev/null 2>&1; then
  echo "Opening draft PR using gh"
  gh pr create --title "$COMMIT_MSG" --body "Generated from template $TEMPLATE_NAME" --draft
else
  echo "gh CLI not found - create a PR manually from branch $BRANCH_NAME"
fi
