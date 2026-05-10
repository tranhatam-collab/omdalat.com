#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

PORT="${PORT:-4173}"
MODE="full-site"
TODAY="$(date +%F)"
OUTPUT_DIR="${OUTPUT_DIR:-reports/visual-qa/${TODAY}/full-site}"
BASE_URL="${BASE_URL:-http://127.0.0.1:${PORT}}"
BASELINE_DIR="${BASELINE_DIR:-reports/visual-baseline/full-site}"
VISUAL_DIFF_RULES_FILE="${VISUAL_DIFF_RULES_FILE:-scripts/visual-diff-threshold-rules.json}"
VISUAL_DIFF_DEFAULT_MAX="${VISUAL_DIFF_DEFAULT_MAX:-0.03}"
VISUAL_DIFF_CRITICAL_MAX="${VISUAL_DIFF_CRITICAL_MAX:-0.015}"
REFRESH_BASELINE=0

for arg in "$@"; do
  if [[ "$arg" == "--refresh-baseline" ]]; then
    REFRESH_BASELINE=1
  fi
done

if [[ "${1:-}" == "--plan" ]]; then
  node scripts/run-visual-qa-matrix.mjs --mode="${MODE}" --include-desktop --print-plan
  echo "Planned gate:"
  echo "node scripts/release-gate-team1.mjs --visual-dir=${OUTPUT_DIR} --visual-mode=${MODE} --visual-include-desktop --visual-baseline-dir=${BASELINE_DIR} --visual-diff-rules-file=${VISUAL_DIFF_RULES_FILE} --visual-diff-default-max=${VISUAL_DIFF_DEFAULT_MAX} --visual-diff-critical-max=${VISUAL_DIFF_CRITICAL_MAX}"
  exit 0
fi

python3 -m http.server "${PORT}" >/tmp/apdalat-team1-regression-http.log 2>&1 &
SERVER_PID=$!
cleanup() {
  kill "${SERVER_PID}" >/dev/null 2>&1 || true
}
trap cleanup EXIT

node scripts/run-visual-qa-matrix.mjs --base-url="${BASE_URL}" --mode="${MODE}" --include-desktop --output="${OUTPUT_DIR}"
if [[ "${REFRESH_BASELINE}" -eq 1 ]]; then
  node scripts/release-gate-team1.mjs --visual-dir="${OUTPUT_DIR}" --visual-mode="${MODE}" --visual-include-desktop --visual-baseline-dir="${BASELINE_DIR}" --visual-diff-rules-file="${VISUAL_DIFF_RULES_FILE}" --visual-diff-default-max="${VISUAL_DIFF_DEFAULT_MAX}" --visual-diff-critical-max="${VISUAL_DIFF_CRITICAL_MAX}" --refresh-visual-baseline
else
  node scripts/release-gate-team1.mjs --visual-dir="${OUTPUT_DIR}" --visual-mode="${MODE}" --visual-include-desktop --visual-baseline-dir="${BASELINE_DIR}" --visual-diff-rules-file="${VISUAL_DIFF_RULES_FILE}" --visual-diff-default-max="${VISUAL_DIFF_DEFAULT_MAX}" --visual-diff-critical-max="${VISUAL_DIFF_CRITICAL_MAX}"
fi

echo "PASS: Team 1 full-site regression completed."
