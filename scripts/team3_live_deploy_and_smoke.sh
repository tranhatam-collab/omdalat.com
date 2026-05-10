#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_DIR="${ROOT_DIR}/apps/web"
APP_DIR="${ROOT_DIR}/apps/app"

WEB_ACCOUNT_ID="${WEB_CF_ACCOUNT_ID:-f3f9e76222dcb488d5e303e29e8ba192}"
APP_ACCOUNT_ID="${APP_CF_ACCOUNT_ID:-93112cc89181e75335cbd7ef7e392ba3}"
WEB_PROJECT="omdalat-web"
APP_PROJECT="omdalat-app"
WEB_URL="https://omdalat.com"
APP_URL="https://app.omdalat.com"

set_pages_context() {
  local account_id="$1"
  local project_name="$2"
  local cache_dirs=(
    "${ROOT_DIR}/node_modules/.cache/wrangler"
    "${WEB_DIR}/node_modules/.cache/wrangler"
    "${APP_DIR}/node_modules/.cache/wrangler"
  )

  for cache_dir in "${cache_dirs[@]}"; do
    mkdir -p "${cache_dir}"
    cat > "${cache_dir}/pages.json" <<EOF
{
  "account_id": "${account_id}",
  "project_name": "${project_name}"
}
EOF
  done
}

echo "[team3] verify account-runtime mapping (without blocking on www.app DNS)"
CF_RUNTIME_REQUIRE_WWW_APP_DNS=0 node "${ROOT_DIR}/scripts/check-cloudflare-runtime-map.mjs"

echo "[team3] verify web project in web account ${WEB_ACCOUNT_ID}"
CLOUDFLARE_ACCOUNT_ID="${WEB_ACCOUNT_ID}" wrangler pages project list --json | rg "\"Project Name\": \"${WEB_PROJECT}\"|omdalat.com"

echo "[team3] verify app project in app account ${APP_ACCOUNT_ID}"
CLOUDFLARE_ACCOUNT_ID="${APP_ACCOUNT_ID}" wrangler pages project list --json | rg "\"Project Name\": \"${APP_PROJECT}\"|app.omdalat.com"

echo "[team3] build web cloudflare artifact"
(
  cd "${WEB_DIR}"
  ./node_modules/.bin/next-on-pages
)

echo "[team3] build app cloudflare artifact"
(
  cd "${APP_DIR}"
  ./node_modules/.bin/next-on-pages
)

echo "[team3] set wrangler pages context for web deploy (${WEB_ACCOUNT_ID}/${WEB_PROJECT})"
set_pages_context "${WEB_ACCOUNT_ID}" "${WEB_PROJECT}"

echo "[team3] deploy web"
CLOUDFLARE_ACCOUNT_ID="${WEB_ACCOUNT_ID}" wrangler pages deploy "${WEB_DIR}/.vercel/output/static" --project-name "${WEB_PROJECT}" --branch main

echo "[team3] set wrangler pages context for app deploy (${APP_ACCOUNT_ID}/${APP_PROJECT})"
set_pages_context "${APP_ACCOUNT_ID}" "${APP_PROJECT}"

echo "[team3] deploy app"
CLOUDFLARE_ACCOUNT_ID="${APP_ACCOUNT_ID}" wrangler pages deploy "${APP_DIR}/.vercel/output/static" --project-name "${APP_PROJECT}" --branch main

echo "[team3] smoke: canonical + hreflang"
curl -i -sS "${WEB_URL}/vi" | rg "HTTP/|rel=\"canonical\"|rel=\"alternate\" hrefLang"

echo "[team3] smoke: robots + sitemap"
curl -i -sS "${WEB_URL}/robots.txt" | rg "HTTP/|Sitemap:"
curl -i -sS "${WEB_URL}/sitemap.xml" | rg "HTTP/|<urlset|<loc>"

echo "[team3] smoke: member gating"
curl -i -sS "${WEB_URL}/vi/member/operations" | rg "HTTP/|location:"
curl -i -sS "${APP_URL}/vi/member/operations" | rg "HTTP/|location:"

echo "[team3] smoke: app support API lane"
curl -i -sS -X POST "${APP_URL}/api/support" -H "Content-Type: application/json" --data '{"subject":"team3 smoke","message":"support lane probe","route":"/settings"}' | rg "HTTP/|\"ok\":true"

echo "[team3] smoke: legacy redirects"
curl -i -sS "${WEB_URL}/vi/what-is-omdalat" | rg "HTTP/|location:"
curl -i -sS "${WEB_URL}/vi/work-and-opportunity" | rg "HTTP/|location:"
curl -i -sS "${WEB_URL}/vi/creative-economy" | rg "HTTP/|location:"

echo "[team3] smoke: legacy app host redirect"
curl -i -sS "${APP_URL}/vi/member/login" | rg "HTTP/|x-robots-tag:|location:"
curl -i -sS "https://www.app.omdalat.com/vi/member/login" | rg "HTTP/|location:"

echo "[team3] done"
