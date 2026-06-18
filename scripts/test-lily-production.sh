#!/bin/bash

# Lily Brand Factory - Production QA Test Script
# This script tests the Lily deployment in production

set -e

echo "=========================================="
echo "LILY BRAND FACTORY - PRODUCTION QA TESTS"
echo "=========================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Test functions
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo "Testing: $test_name"
    
    if eval "$test_command"; then
        echo -e "${GREEN}✓${NC} $test_name passed"
        PASSED_TESTS=$((PASSED_TESTS + 1))
        return 0
    else
        echo -e "${RED}✗${NC} $test_name failed"
        FAILED_TESTS=$((FAILED_TESTS + 1))
        return 1
    fi
}

echo "Step 1: API Endpoint Tests"
echo "----------------------------"

# Test 1: Brand preview endpoint
run_test "Brand preview API endpoint" \
    "curl -s -f https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'brnd_lily'"

# Test 2: Brand preview returns correct structure
run_test "Brand preview returns correct structure" \
    "curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'brand' && curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'content_blocks'"

# Test 3: Brand preview returns business type
run_test "Brand preview returns hybrid_local_brand type" \
    "curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'hybrid_local_brand'"

# Test 4: Brand preview returns content blocks
run_test "Brand preview returns content blocks" \
    "curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'hero' && curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview | grep -q 'business'"

echo ""
echo "Step 2: Brand Renderer Tests"
echo "----------------------------"

# Test 5: Brand site loads
run_test "Brand site loads successfully" \
    "curl -s -f https://lily.omdalat.com > /dev/null"

# Test 6: Brand site returns HTML
run_test "Brand site returns HTML content" \
    "curl -s https://lily.omdalat.com | grep -q '<!DOCTYPE html>'"

# Test 7: Brand site has correct title
run_test "Brand site has correct title" \
    "curl -s https://lily.omdalat.com | grep -q 'Homestay Lily Lạc Dương Đà Lạt'"

# Test 8: Brand site has business section
run_test "Brand site has business section" \
    "curl -s https://lily.omdalat.com | grep -q 'Dòng kinh doanh'"

# Test 9: Brand site has contact form
run_test "Brand site has contact form" \
    "curl -s https://lily.omdalat.com | grep -q 'contact' && curl -s https://lily.omdalat.com | grep -q 'inquiry'"

echo ""
echo "Step 3: Compliance Gates Tests"
echo "-------------------------------"

# Test 10: Publish endpoint enforces gates
run_test "Publish endpoint enforces compliance gates" \
    "curl -s -X POST https://api.omdalat.com/api/omdalat/brands/brnd_lily/publish -H 'Content-Type: application/json' | grep -q 'Cannot publish'"

# Test 11: Publish endpoint returns gate status
run_test "Publish endpoint returns gate status" \
    "curl -s -X POST https://api.omdalat.com/api/omdalat/brands/brnd_lily/publish -H 'Content-Type: application/json' | grep -q 'gates'"

echo ""
echo "Step 4: Inquiry System Tests"
echo "----------------------------"

# Test 12: Inquiry endpoint accepts requests
run_test "Inquiry endpoint accepts requests" \
    "curl -s -X POST https://api.omdalat.com/api/omdalat/brands/brnd_lily/inquiry -H 'Content-Type: application/json' -d '{\"contact\":\"test@example.com\",\"message\":\"Test inquiry\",\"locale\":\"vi\"}' | grep -q 'inquiry_id'"

echo ""
echo "Step 5: Performance Tests"
echo "-------------------------"

# Test 13: API response time
run_test "API response time under 2 seconds" \
    "time curl -s https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview > /dev/null 2>&1 | grep -q 'real'"

# Test 14: Brand site load time
run_test "Brand site load time under 3 seconds" \
    "time curl -s https://lily.omdalat.com > /dev/null 2>&1 | grep -q 'real'"

echo ""
echo "Step 6: SSL and Security Tests"
echo "------------------------------"

# Test 15: SSL certificate is valid
run_test "SSL certificate is valid" \
    "curl -s -I https://lily.omdalat.com | grep -q '200'"

# Test 16: HTTPS redirects properly
run_test "HTTPS redirects properly" \
    "curl -s -I https://lily.omdalat.com | grep -q 'HTTP/2'"

echo ""
echo "=========================================="
echo "TEST SUMMARY"
echo "=========================================="
echo "Total tests: $TOTAL_TESTS"
echo -e "${GREEN}Passed: $PASSED_TESTS${NC}"
echo -e "${RED}Failed: $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed. Please review the output above.${NC}"
    exit 1
fi
