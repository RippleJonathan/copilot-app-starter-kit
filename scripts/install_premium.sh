#!/usr/bin/env bash
set -euo pipefail

ZIP_URL="${1:-}"
DEST_DIR="${2:-templates/premium-$(date +%s)}"

if [ -z "$ZIP_URL" ]; then
  echo "Usage: $0 <url-to-premium-zip> [destination-dir]"
  exit 1
fi

echo "This script will download a premium template from: $ZIP_URL"
echo "Destination: $DEST_DIR"
read -p "Proceed? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted"
  exit 1
fi

TMPDIR="$(mktemp -d)"
trap 'rm -rf "$TMPDIR"' EXIT

echo "Downloading..."
curl -fsSL "$ZIP_URL" -o "$TMPDIR/premium.zip"
echo "Unpacking to $DEST_DIR"
mkdir -p "$DEST_DIR"
unzip -q "$TMPDIR/premium.zip" -d "$DEST_DIR"

echo "Installed premium template to $DEST_DIR"
echo "Run ./scripts/generate_feature.sh <template-folder-name> <destination> to instantiate the template." 
