#!/bin/bash

# PesaQR WordPress Plugin Watch & Sync Script
# Watches for file changes and automatically syncs to WordPress

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
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

echo -e "${PURPLE}PesaQR Development Watch Mode${NC}"
echo "================================"
echo -e "${BLUE}Watching for changes...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
echo ""

# Function to sync files
sync_files() {
    echo -e "${BLUE}Change detected! Syncing...${NC}"
    
    # Quick sync without building (for PHP changes)
    rsync -av --delete \
        --exclude 'node_modules' \
        --exclude '.git' \
        --exclude '.DS_Store' \
        --exclude '*.md' \
        "$SOURCE_DIR/" \
        "$WP_PLUGINS_DIR/$PLUGIN_NAME/"
    
    echo -e "${GREEN}Synced at $(date '+%H:%M:%S')${NC}"
    echo ""
}

# Initial sync
sync_files

# Watch for changes in the plugin directory
# Using fswatch (install with: brew install fswatch)
if command -v fswatch &> /dev/null; then
    fswatch -o "$SOURCE_DIR" | while read f; do
        sync_files
    done
else
    echo -e "${YELLOW}fswatch not found. Install it with: brew install fswatch${NC}"
    echo -e "${BLUE}Or use manual sync with: ./sync-to-wp.sh${NC}"
fi
