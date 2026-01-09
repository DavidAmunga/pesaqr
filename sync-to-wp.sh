#!/bin/bash

# PesaQR WordPress Plugin Development Sync Script
# Syncs the plugin to your local WordPress installation

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Load environment variables from .env file
if [ -f .env ]; then
    # Use set -a to automatically export all variables
    set -a
    source .env
    set +a
else
    echo -e "${RED}Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and configure your paths:${NC}"
    echo -e "  cp .env.example .env"
    echo -e "  nano .env"
    exit 1
fi

# Configuration from environment variables
SOURCE_DIR="${SOURCE_DIR:-woocommerce-pesaqr}"
WP_PLUGINS_DIR="${WP_PLUGINS_DIR}"
PLUGIN_NAME="${PLUGIN_NAME:-woocommerce-pesaqr}"

# Validate required variables
if [ -z "$WP_PLUGINS_DIR" ]; then
    echo -e "${RED}Error: WP_PLUGINS_DIR not set in .env file${NC}"
    echo -e "${YELLOW}Please configure your WordPress plugins directory in .env${NC}"
    exit 1
fi

echo -e "${BLUE}PesaQR WordPress Plugin Sync${NC}"
echo "================================"

# Check if WordPress plugins directory exists
if [ ! -d "$WP_PLUGINS_DIR" ]; then
    echo -e "${YELLOW}WordPress plugins directory not found: $WP_PLUGINS_DIR${NC}"
    exit 1
fi

# Build the JS assets first
echo -e "${BLUE}Building JavaScript assets...${NC}"
npm run build:wordpress-plugin

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Build failed!${NC}"
    exit 1
fi

# Sync the plugin files
echo -e "${BLUE}Syncing plugin files...${NC}"

# Create plugin directory if it doesn't exist
mkdir -p "$WP_PLUGINS_DIR/$PLUGIN_NAME"

# Rsync with delete (removes files that don't exist in source)
rsync -av --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    --exclude '.DS_Store' \
    --exclude '*.md' \
    "$SOURCE_DIR/" \
    "$WP_PLUGINS_DIR/$PLUGIN_NAME/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Plugin synced successfully!${NC}"
    echo -e "${GREEN}Location: $WP_PLUGINS_DIR/$PLUGIN_NAME${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "   1. Refresh your WordPress admin (if needed)"
    echo "   2. Visit your checkout page to see changes"
    echo ""
else
    echo -e "${YELLOW}Sync failed!${NC}"
    exit 1
fi
