#!/bin/bash

# Lily Brand Factory - DNS Configuration Script
# This script configures DNS for lily.omdalat.com using Cloudflare API

set -e

# Configuration
CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN:-}"
ZONE_ID="${ZONE_ID:-}"
ZONE_NAME="omdalat.com"
SUBDOMAIN="lily"
TARGET_DOMAIN="brand.omdalat.com"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

check_requirements() {
    log_info "Checking requirements..."
    
    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        log_error "CLOUDFLARE_API_TOKEN environment variable is required"
        log_info "Set it with: export CLOUDFLARE_API_TOKEN=your_token"
        exit 1
    fi
    
    if [ -z "$ZONE_ID" ]; then
        log_error "ZONE_ID environment variable is required"
        log_info "Set it with: export ZONE_ID=your_zone_id"
        exit 1
    fi
    
    # Check if curl is available
    if ! command -v curl &> /dev/null; then
        log_error "curl is required but not installed"
        exit 1
    fi
    
    log_info "All requirements met"
}

get_zone_info() {
    log_info "Getting zone information for $ZONE_NAME..."
    
    response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q '"success":true'; then
        log_info "Zone found: $ZONE_NAME"
    else
        log_error "Failed to get zone information"
        echo "$response"
        exit 1
    fi
}

check_existing_dns() {
    log_info "Checking for existing DNS records for $SUBDOMAIN.$ZONE_NAME..."
    
    response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=$SUBDOMAIN.$ZONE_NAME" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    record_count=$(echo "$response" | grep -o '"count":[0-9]*' | grep -o '[0-9]*' || echo "0")
    
    if [ "$record_count" -gt 0 ]; then
        log_warning "Found $record_count existing DNS record(s) for $SUBDOMAIN.$ZONE_NAME"
        echo "$response" | grep -o '"id":"[^"]*"' | head -1 | grep -o '[^:]*$' | tr -d '"'
        return 1
    else
        log_info "No existing DNS records found for $SUBDOMAIN.$ZONE_NAME"
        return 0
    fi
}

create_dns_record() {
    log_info "Creating CNAME record for $SUBDOMAIN.$ZONE_NAME -> $TARGET_DOMAIN..."
    
    response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json" \
        --data-raw "{
            \"type\": \"CNAME\",
            \"name\": \"$SUBDOMAIN\",
            \"content\": \"$TARGET_DOMAIN\",
            \"ttl\": 1,
            \"proxied\": true
        }")
    
    if echo "$response" | grep -q '"success":true'; then
        record_id=$(echo "$response" | grep -o '"id":"[^"]*"' | head -1 | grep -o '[^:]*$' | tr -d '"')
        log_info "DNS record created successfully!"
        log_info "Record ID: $record_id"
        log_info "Record: $SUBDOMAIN.$ZONE_NAME -> $TARGET_DOMAIN"
        return 0
    else
        log_error "Failed to create DNS record"
        echo "$response"
        return 1
    fi
}

verify_dns_record() {
    log_info "Verifying DNS record creation..."
    
    response=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=$SUBDOMAIN.$ZONE_NAME" \
        -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$response" | grep -q '"success":true'; then
        record_count=$(echo "$response" | grep -o '"count":[0-9]*' | grep -o '[0-9]*' || echo "0")
        if [ "$record_count" -gt 0 ]; then
            log_info "DNS record verified successfully!"
            return 0
        else
            log_error "DNS record not found after creation"
            return 1
        fi
    else
        log_error "Failed to verify DNS record"
        return 1
    fi
}

wait_for_dns_propagation() {
    log_info "Waiting for DNS propagation (this may take 1-2 hours)..."
    log_info "You can check propagation status using: dig $SUBDOMAIN.$ZONE_NAME"
    log_info "Or use online tools like: https://whatsmydns.net/#A/$SUBDOMAIN.$ZONE_NAME"
}

main() {
    log_info "Starting DNS configuration for lily.omdalat.com..."
    echo ""
    
    check_requirements
    echo ""
    
    get_zone_info
    echo ""
    
    if check_existing_dns; then
        create_dns_record
        echo ""
        
        if verify_dns_record; then
            echo ""
            log_info "DNS configuration completed successfully!"
            echo ""
            wait_for_dns_propagation
            echo ""
            log_info "Next steps:"
            log_info "1. Wait for DNS propagation (1-2 hours)"
            log_info "2. Test with: curl -I https://$SUBDOMAIN.$ZONE_NAME"
            log_info "3. Access in browser: https://$SUBDOMAIN.$ZONE_NAME"
            log_info "4. Verify SSL certificate is valid"
        else
            log_error "DNS verification failed"
            exit 1
        fi
    else
        log_warning "DNS record already exists. Please check manually."
        exit 1
    fi
}

# Run main function
main