#!/bin/bash

# PesaQR Complete Development Script
# Builds, syncs, and watches for changes

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

echo -e "${PURPLE}PesaQR Development Mode${NC}"
echo "================================"
echo ""

# Initial build and sync
echo -e "${BLUE}Initial build and sync...${NC}"
./sync-to-wp.sh

if [ $? -ne 0 ]; then
    echo -e "${YELLOW}Initial sync failed!${NC}"
    exit 1
fi

# Start watching for changes
echo ""
echo -e "${GREEN}Initial sync complete!${NC}"
echo -e "${BLUE}Starting watch mode...${NC}"
echo ""

./watch-and-sync.sh
