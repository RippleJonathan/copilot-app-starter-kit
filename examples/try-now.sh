#!/usr/bin/env bash
# Copilot Starter Kit - Interactive Try-Now Demo
# 
# This script provides a guided walkthrough of the starter kit functionality
# with automatic cleanup. Perfect for new users to understand the workflow.

set -euo pipefail

# Colors for better output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
TMP_DIR="$(mktemp -d -t copilot-try-now-XXXX)"
DEMO_TEMPLATE="${1:-crud}"

echo -e "${BLUE}🚀 Copilot Starter Kit - Try Now Demo${NC}"
echo -e "${BLUE}======================================${NC}\n"

echo -e "This demo will show you the complete workflow:"
echo -e "  1. 📦 Generate a template (${DEMO_TEMPLATE})"
echo -e "  2. 📥 Install dependencies"
echo -e "  3. 🧪 Run tests"
echo -e "  4. 📁 Show generated files"
echo -e "  5. 🧹 Clean up"
echo ""

read -p "Press ENTER to continue or Ctrl+C to exit... "
echo ""

# Step 1: Generate template
echo -e "${YELLOW}Step 1: Generating ${DEMO_TEMPLATE} template...${NC}"
echo -e "${BLUE}Command: ./scripts/generate_feature.sh ${DEMO_TEMPLATE} ${TMP_DIR}/demo-app PROJECT_NAME=DemoApp${NC}"
echo ""

"$ROOT_DIR/scripts/generate_feature.sh" "$DEMO_TEMPLATE" "$TMP_DIR/demo-app" PROJECT_NAME=DemoApp

echo -e "\n${GREEN}✅ Template generated!${NC}"
echo ""

# Step 2: Show generated structure
echo -e "${YELLOW}Step 2: Exploring generated files...${NC}"
echo -e "${BLUE}Generated structure:${NC}"
tree "$TMP_DIR/demo-app" 2>/dev/null || find "$TMP_DIR/demo-app" -type f | head -20
echo ""

# Step 3: Install dependencies
if [ -f "$TMP_DIR/demo-app/package.json" ]; then
  echo -e "${YELLOW}Step 3: Installing dependencies...${NC}"
  echo -e "${BLUE}Command: cd demo-app && npm install${NC}"
  echo ""
  
  (cd "$TMP_DIR/demo-app" && npm install --no-audit --no-fund --silent)
  
  echo -e "${GREEN}✅ Dependencies installed!${NC}"
  echo ""
  
  # Step 4: Run tests
  echo -e "${YELLOW}Step 4: Running tests...${NC}"
  echo -e "${BLUE}Command: npm test${NC}"
  echo ""
  
  (cd "$TMP_DIR/demo-app" && npm test)
  
  echo -e "\n${GREEN}✅ All tests passed!${NC}"
else
  echo -e "${YELLOW}Step 3-4: Skipped (no package.json found)${NC}"
fi

echo ""

# Step 5: Show key files
echo -e "${YELLOW}Step 5: Key files to explore...${NC}"

if [ -f "$TMP_DIR/demo-app/README.md" ]; then
  echo -e "\n${BLUE}📄 README.md:${NC}"
  head -10 "$TMP_DIR/demo-app/README.md"
fi

if [ -f "$TMP_DIR/demo-app/index.js" ]; then
  echo -e "\n${BLUE}📄 Main application (index.js):${NC}"
  head -15 "$TMP_DIR/demo-app/index.js"
fi

if [ -f "$TMP_DIR/demo-app/package.json" ]; then
  echo -e "\n${BLUE}📄 Package info:${NC}"
  cd "$TMP_DIR/demo-app" && npm list --depth=0 2>/dev/null || echo "Dependencies installed successfully"
fi

echo ""

# Cleanup prompt
echo -e "${YELLOW}🧹 Cleanup${NC}"
echo -e "Demo files are in: ${TMP_DIR}/demo-app"
echo ""

read -p "Would you like to keep the demo files for exploration? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  rm -rf "$TMP_DIR"
  echo -e "${GREEN}✅ Demo files cleaned up${NC}"
else
  echo -e "${BLUE}📁 Demo files preserved at: ${TMP_DIR}/demo-app${NC}"
  echo -e "   You can explore, modify, and delete them manually when done."
fi

echo ""
echo -e "${GREEN}🎉 Demo Complete!${NC}"
echo ""
echo -e "${BLUE}What's next?${NC}"
echo -e "  • Generate your own feature: ${GREEN}./scripts/generate_feature.sh <template> ./my-feature${NC}"
echo -e "  • Try the npx wrapper: ${GREEN}npx copilot-starter-kit crud ./my-api${NC}"
echo -e "  • Explore templates: ${GREEN}ls templates/${NC}"
echo -e "  • Ask Copilot Agent: ${GREEN}\"Read COPILOT_INSTRUCTIONS.md and help me build [your idea]\"${NC}"
echo -e "  • Read the full guide: ${GREEN}docs/GETTING_STARTED.md${NC}"
echo ""
echo -e "${YELLOW}Happy building! 🚀${NC}"