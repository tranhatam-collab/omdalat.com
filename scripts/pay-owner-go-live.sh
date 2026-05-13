#!/usr/bin/env bash
# pay-owner-go-live.sh — one-shot live activation for omdalat.com via pay.iai.one.
# Usage:  bash scripts/pay-owner-go-live.sh
# Safe to re-run. Secrets are unset on exit (trap).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

PROJECT_NAME="${PAGES_PROJECT_NAME:-omdalat-platforms-api}"
PREVIEW_HOST="${PREVIEW_HOST:-https://preview.omdalat.com}"
LIVE_HOST="${LIVE_HOST:-https://api.omdalat.com}"

cleanup() {
  unset PAY_IAI_ONE_API_KEY PAYMENT_WEBHOOK_SECRET MAIL_API_KEY 2>/dev/null || true
}
trap cleanup EXIT

prompt_secret() {
  local label="$1"; local var="$2"
  local existing="${!var-}"
  [ -n "$existing" ] && { echo "[i] $var already set, using it."; return 0; }
  if [ ! -t 0 ]; then
    echo "[FAIL] $var: stdin is not a TTY. Run directly in your terminal." >&2
    exit 3
  fi
  local value=""; local attempts=0
  while [ -z "$value" ]; do
    attempts=$((attempts + 1))
    [ "$attempts" -gt 5 ] && { echo "[FAIL] $var: too many empty attempts." >&2; exit 3; }
    printf "%s: " "$label" >&2
    if ! IFS= read -rs value; then
      printf "\n[FAIL] %s: stdin closed (EOF). Aborting.\n" "$var" >&2
      exit 3
    fi
    printf "\n" >&2
    [ -z "$value" ] && echo "[!] cannot be empty" >&2
  done
  printf -v "$var" "%s" "$value"
  export "$var"
}

need_cmd() {
  command -v "$1" >/dev/null 2>&1 || { echo "[FAIL] missing: $1"; exit 2; }
}

put_pages_secret() {
  local name="$1"; local value="$2"
  printf "%s" "$value" | wrangler pages secret put "$name" \
    --project-name "$PROJECT_NAME" --env production >/dev/null
  echo "  - set $name (env=production)"
}

need_cmd wrangler
need_cmd curl
need_cmd jq
need_cmd node

echo "== omdalat.com — Pay-Owner go-live =="
echo "Project: $PROJECT_NAME"
echo "Live host: $LIVE_HOST"
echo

echo "Step 1/4 — collect payment secrets"
prompt_secret "PAY_IAI_ONE_API_KEY (production tenant)" PAY_IAI_ONE_API_KEY
prompt_secret "PAYMENT_WEBHOOK_SECRET (HMAC for webhook validation)" PAYMENT_WEBHOOK_SECRET
prompt_secret "MAIL_API_KEY (mail.iai.one authentication)" MAIL_API_KEY

echo
echo "Step 2/4 — push secrets to Cloudflare Pages (production)"
put_pages_secret PAY_IAI_ONE_API_KEY        "$PAY_IAI_ONE_API_KEY"
put_pages_secret PAYMENT_WEBHOOK_SECRET     "$PAYMENT_WEBHOOK_SECRET"
put_pages_secret MAIL_API_KEY               "$MAIL_API_KEY"

echo
echo "Step 3/4 — verify API health"
HEALTH="$(curl -sS "$LIVE_HOST/health" || true)"
echo "$HEALTH" | jq . 2>/dev/null || echo "$HEALTH"

if echo "$HEALTH" | jq -e '.status=="ok"' >/dev/null 2>&1; then
  echo "[PASS] health endpoint reachable"
else
  echo "[WARN] health endpoint not responding yet (may need deployment propagation)"
fi

echo
echo "Step 4/4 — test checkout-session endpoint"
CHECKOUT="$(curl -sS -X POST "$LIVE_HOST/api/pay/checkout-session" \
  -H "content-type: application/json" \
  --data '{"plan_code":"member_annual","email":"qa+canary@omdalat.com"}' || true)"
echo "$CHECKOUT" | jq . 2>/dev/null || echo "$CHECKOUT"

if echo "$CHECKOUT" | jq -e '.checkout_url // .session_id' >/dev/null 2>&1; then
  echo
  echo "[PASS] omdalat.com payment gateway live via pay.iai.one"
  echo "       Next: Verify webhook endpoint and monitor D1 logs"
  echo "       wrangler tail --env production"
  exit 0
else
  echo
  echo "[FAIL] checkout endpoint not returning valid response"
  echo "       Check: wrangler tail --env production"
  exit 1
fi
