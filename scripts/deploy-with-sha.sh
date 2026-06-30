#!/usr/bin/env bash
# scripts/deploy-with-sha.sh — Deploy omdalat Workers with git SHA injection.
#
# This script MUST be used for all production deploys. It:
#   1. Verifies the working tree is clean (no uncommitted changes)
#   2. Reads the current git commit SHA + timestamp
#   3. Injects BUILD_COMMIT_SHA + BUILD_TIMESTAMP into wrangler.jsonc vars
#   4. Deploys the worker(s) via wrangler
#   5. Verifies /version endpoint returns the expected SHA
#
# Usage:
#   ./scripts/deploy-with-sha.sh api       # deploy omdalat-platforms-api
#   ./scripts/deploy-with-sha.sh renderer  # deploy omdalat-brand-renderer
#   ./scripts/deploy-with-sha.sh both      # deploy both (api first, then renderer)
#
# Exit codes:
#   0 = success, version verified
#   1 = working tree dirty
#   2 = wrangler deploy failed
#   3 = /version verification failed (SHA mismatch)

set -euo pipefail

TARGET="${1:-both}"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

SHA="$(git rev-parse HEAD)"
TIMESTAMP="$(git log -1 --format=%cI HEAD)"
SHORT_SHA="${SHA:0:12}"

echo "=== deploy-with-sha.sh ==="
echo "Target: $TARGET"
echo "Commit: $SHORT_SHA ($SHA)"
echo "Timestamp: $TIMESTAMP"
echo ""

# 1. Verify working tree is clean (excluding known-safe untracked dirs)
DIRTY=$(git status --porcelain --untracked-files=all | grep -vE '^\?\? "apps/web/.static-pages/' || true)
if [ -n "$DIRTY" ]; then
  echo "ERROR: Working tree is dirty. Commit or stash changes first."
  echo "$DIRTY"
  exit 1
fi
echo "[OK] Working tree is clean"

# 2. Function to inject SHA into a wrangler.jsonc
inject_sha() {
  local WRANGLER_FILE="$1"
  local WORKER_NAME="$2"
  echo "[inject] $WRANGLER_FILE"
  # Use python to safely modify the JSONC — inject into ALL "APP_ENV" lines
  # (both top-level vars and env.production.vars)
  python3 -c "
import re, sys
p, sha, ts = sys.argv[1], sys.argv[2], sys.argv[3]
with open(p) as f: s = f.read()
# Remove existing BUILD_COMMIT_SHA / BUILD_TIMESTAMP
s = re.sub(r',\s*\"BUILD_COMMIT_SHA\":\s*\"[^\"]*\"', '', s)
s = re.sub(r',\s*\"BUILD_TIMESTAMP\":\s*\"[^\"]*\"', '', s)
s = re.sub(r'\"BUILD_COMMIT_SHA\":\s*\"[^\"]*\",\s*', '', s)
s = re.sub(r'\"BUILD_TIMESTAMP\":\s*\"[^\"]*\",\s*', '', s)
# Add after EVERY 'APP_ENV': '...' line (matches both top-level and env.production)
s = re.sub(
    r'(\"APP_ENV\":\s*\"[^\"]+\")',
    r'\1,\n        \"BUILD_COMMIT_SHA\": \"' + sha + '\",\n        \"BUILD_TIMESTAMP\": \"' + ts + '\"',
    s
)
with open(p, 'w') as f: f.write(s)
print('  injected BUILD_COMMIT_SHA=' + sha[:12])
  " "$WRANGLER_FILE" "$SHA" "$TIMESTAMP"
}

# 3. Function to deploy + verify
deploy_and_verify() {
  local WORKER_DIR="$1"
  local WORKER_NAME="$2"
  local VERSION_URL="$3"

  echo ""
  echo "=== Deploying $WORKER_NAME ==="
  cd "$REPO_ROOT/$WORKER_DIR"

  if ! npx wrangler deploy --env production 2>&1 | tail -5; then
    echo "ERROR: wrangler deploy failed for $WORKER_NAME"
    exit 2
  fi
  echo "[OK] Deployed $WORKER_NAME"

  # 4. Verify /version endpoint
  echo "[verify] GET $VERSION_URL"
  sleep 5  # give Cloudflare a moment to propagate
  DEPLOYED_SHA=$(curl -s "$VERSION_URL" | node -e "let d='';process.stdin.on('data',c=>d+=c);process.stdin.on('end',()=>{try{const j=JSON.parse(d);console.log(j.build_commit_sha||'missing')}catch{console.log('parse-error')}})")
  echo "  Expected: $SHORT_SHA"
  echo "  Deployed: ${DEPLOYED_SHA:0:12}"
  if [ "${DEPLOYED_SHA:0:12}" != "$SHORT_SHA" ]; then
    echo "ERROR: /version SHA mismatch! Expected $SHORT_SHA, got ${DEPLOYED_SHA:0:12}"
    echo "  This means the deployed code does NOT match the audited commit."
    exit 3
  fi
  echo "[OK] /version verified — prod matches repo"
  cd "$REPO_ROOT"
}

# 5. Execute based on target
case "$TARGET" in
  api)
    inject_sha "workers/api/wrangler.jsonc" "omdalat-platforms-api"
    deploy_and_verify "workers/api" "omdalat-platforms-api" "https://api.omdalat.com/version"
    ;;
  renderer)
    inject_sha "workers/brand-renderer/wrangler.jsonc" "omdalat-brand-renderer"
    deploy_and_verify "workers/brand-renderer" "omdalat-brand-renderer" "https://brand.omdalat.com/version"
    ;;
  both)
    inject_sha "workers/api/wrangler.jsonc" "omdalat-platforms-api"
    inject_sha "workers/brand-renderer/wrangler.jsonc" "omdalat-brand-renderer"
    deploy_and_verify "workers/api" "omdalat-platforms-api" "https://api.omdalat.com/version"
    deploy_and_verify "workers/brand-renderer" "omdalat-brand-renderer" "https://brand.omdalat.com/version"
    ;;
  *)
    echo "Usage: $0 {api|renderer|both}"
    exit 1
    ;;
esac

echo ""
echo "=== SUCCESS ==="
echo "Both /version endpoints verified. prod == repo."
echo "Commit: $SHORT_SHA"
echo ""
echo "Rollback target: previous Worker version (via Cloudflare dashboard)"
echo "  https://dash.cloudflare.com > Workers & Pages > omdalat-platforms-api-production > Deployments"
