#!/bin/bash

# Lily Brand Factory - Production Deployment Script
# This script handles the complete deployment of Lily to production

set -e  # Exit on error

echo "=========================================="
echo "LILY BRAND FACTORY - PRODUCTION DEPLOYMENT"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_WORKER_DIR="workers/api"
BRAND_RENDERER_DIR="workers/brand-renderer"
DATABASE_NAME="omdalat-core"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Pre-deployment checks
echo "Step 1: Pre-deployment checks"
echo "----------------------------"

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    print_error "Wrangler CLI is not installed"
    exit 1
fi
print_status "Wrangler CLI is installed"

# Check if we're authenticated
if ! wrangler whoami &> /dev/null; then
    print_error "Not authenticated with Cloudflare. Run 'wrangler login'"
    exit 1
fi
print_status "Authenticated with Cloudflare"

# Check local migrations
echo "Checking local migrations..."
cd "$API_WORKER_DIR"
if [ ! -d "migrations" ]; then
    print_error "Migrations directory not found"
    exit 1
fi
print_status "Migrations directory exists"

echo ""
echo "Step 2: Database migrations to production"
echo "-----------------------------------------"

# Apply migrations to production
echo "Applying migrations to production D1 database..."
wrangler d1 migrations apply "$DATABASE_NAME" --remote --yes

if [ $? -eq 0 ]; then
    print_status "Database migrations applied successfully"
else
    print_error "Database migrations failed"
    exit 1
fi

echo ""
echo "Step 3: Deploy API worker"
echo "-------------------------"

cd "$API_WORKER_DIR"
echo "Deploying omdalat-platforms-api worker..."
wrangler deploy --env production

if [ $? -eq 0 ]; then
    print_status "API worker deployed successfully"
else
    print_error "API worker deployment failed"
    exit 1
fi

echo ""
echo "Step 4: Deploy brand-renderer worker"
echo "------------------------------------"

cd "../$BRAND_RENDERER_DIR"
echo "Deploying omdalat-brand-renderer worker..."
wrangler deploy --env production

if [ $? -eq 0 ]; then
    print_status "Brand-renderer worker deployed successfully"
else
    print_error "Brand-renderer worker deployment failed"
    exit 1
fi

echo ""
echo "Step 5: Verify deployment"
echo "-------------------------"

# Test API endpoint
echo "Testing API preview endpoint..."
API_RESPONSE=$(curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview)
if echo "$API_RESPONSE" | grep -q "brnd_lily"; then
    print_status "API endpoint responding correctly"
else
    print_warning "API endpoint test failed - may need manual verification"
fi

echo ""
echo "Step 6: DNS Configuration (Manual Step Required)"
echo "-------------------------------------------------"
print_warning "DNS configuration for lily.omdalat.com must be done manually in Cloudflare dashboard"
print_warning "Please ensure:"
print_warning "  1. CNAME record for lily.omdalat.com -> brand-renderer worker"
print_warning "  2. SSL certificate is provisioned"
print_warning "  3. DNS propagation is complete"

echo ""
echo "=========================================="
echo "DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Configure DNS for lily.omdalat.com"
echo "2. Test lily.omdalat.com in browser"
echo "3. Run production QA tests"
echo "4. Monitor logs and performance"
echo ""
echo "Deployment summary:"
print_status "Database migrations applied"
print_status "API worker deployed"
print_status "Brand-renderer worker deployed"
print_warning "DNS configuration pending (manual)"
