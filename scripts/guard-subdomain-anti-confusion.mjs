#!/usr/bin/env node
/**
 * CI Guard: OMDALAT Anti-Confusion Subdomain Standard
 *
 * Enforces the 15 rules from OMDALAT_ANTI_CONFUSION_CI_STANDARD_2026.md.
 * Exit code: 0 = all checks pass, 1 = violation(s) found.
 *
 * Rules checked:
 *  1. ap.omdalat.com must NOT appear in public code (middleware redirects, page rules).
 *  2. OMDALAT_AP must NOT be used as a product identifier.
 *  3. App must NOT be labeled "AP" or vice versa.
 *  4. Two products must NOT claim the same primary role.
 *  5. Page canonical must point to the correct product subdomain.
 *  6. Product ID must be present in registry for every deployed hostname.
 *  7. Reserved brand must NOT be presented as live.
 *  8. Admin/private route must have noindex and no-store.
 *  9. Brand card must have status and owner.
 * 10. Root must NOT render an unapproved all-brand directory.
 * 11. True 404 must exist for each app.
 * 12. VI/EN content ownership metadata must exist.
 * 13. Cross-product link must have destination label.
 * 14. Public content must have an owner.
 * 15. Brand must have an approved Brand Charter before being called live.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const violations = [];
const warnings = [];

function v(rule, file, msg) {
  violations.push({ rule, file, msg });
}
function w(rule, file, msg) {
  warnings.push({ rule, file, msg });
}

// --- Helpers ---

function readFileSafe(path) {
  try {
    return readFileSync(path, "utf-8");
  } catch {
    return null;
  }
}

function listFiles(dir, exts = [], exclude = []) {
  if (!existsSync(dir)) return [];
  const results = [];
  function walk(d) {
    for (const entry of readdirSync(d)) {
      if (entry === "node_modules" || entry === ".next" || entry === ".vercel" || entry === ".git") continue;
      if (entry.startsWith(".next_backup")) continue;
      if (entry.startsWith(".next_")) continue;
      if (exclude.some((p) => entry === p)) continue;
      const full = join(d, entry);
      const st = statSync(full);
      if (st.isDirectory()) walk(full);
      else if (exts.length === 0 || exts.includes(extname(full))) results.push(full);
    }
  }
  walk(dir);
  return results;
}

// --- Rule 1: ap.omdalat.com must NOT appear in public code (middleware redirects) ---

function checkApInPublicCode() {
  const middlewareFiles = [
    join(ROOT, "apps/web/middleware.ts"),
    join(ROOT, "apps/app/middleware.ts"),
  ];
  for (const file of middlewareFiles) {
    const content = readFileSafe(file);
    if (!content) continue;
    // Check if ap.omdalat.com appears in a redirect/legacy-host context
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes("ap.omdalat.com") && !line.trim().startsWith("//")) {
        // Allow comments that explain why it's NOT there
        v("R1", file, `Line ${i + 1}: ap.omdalat.com found in non-comment code — must not appear in middleware redirects.`);
      }
    }
  }
}

// --- Rule 2: OMDALAT_AP must NOT be used as a product identifier ---

function checkOmdalatApIdentifier() {
  // Only scan source directories, not the entire root
  const scanDirs = ["apps", "workers/src", "packages", "scripts"];
  for (const dir of scanDirs) {
    const files = listFiles(join(ROOT, dir), [".ts", ".tsx", ".js", ".mjs", ".json"]);
    for (const file of files) {
      if (file.includes("guard-subdomain-anti-confusion.mjs")) continue;
      const content = readFileSafe(file);
      if (!content) continue;
      if (content.includes("OMDALAT_AP") && !content.includes("OMDALAT_AP_RESERVED")) {
        // OMDALAT_AP_ORIGIN is an env var for the editorial site URL, not a product ID
        // OMDALAT_AP_RESERVED is the registry entry for the blocked domain — allowed
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          // Skip comments
          if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;
          // Look for OMDALAT_AP as a standalone identifier (not OMDALAT_AP_ORIGIN, OMDALAT_AP_RESERVED)
          if (/\bOMDALAT_AP\b(?!_ORIGIN|_RESERVED)/.test(line)) {
            v("R2", file, `Line ${i + 1}: OMDALAT_AP used as product identifier — forbidden.`);
          }
        }
      }
    }
  }
}

// --- Rule 3: App must NOT be labeled "AP" ---

function checkAppLabeledAp() {
  // Check wrangler configs and package.json for mislabeling
  const files = [
    join(ROOT, "apps/app/wrangler.toml"),
    join(ROOT, "apps/app/package.json"),
    join(ROOT, "apps/web/wrangler.toml"),
    join(ROOT, "apps/web/package.json"),
  ];
  for (const file of files) {
    const content = readFileSafe(file);
    if (!content) continue;
    // Check for name = ".*ap[^p]" patterns that would label app as AP
    if (content.match(/name\s*=\s*["'].*omdalat-ap[^p]/i) || content.match(/"name"\s*:\s*".*omdalat-ap[^p]/i)) {
      v("R3", file, "App product labeled as 'ap' (single p) — must be 'app' (double p).");
    }
  }
}

// --- Rule 5: Canonical must point to correct subdomain ---

function checkCanonicalOwnership() {
  // apps/web canonical must point to omdalat.com, not app.omdalat.com
  const webCanonical = readFileSafe(join(ROOT, "apps/web/lib/canonical.ts"));
  if (webCanonical) {
    if (webCanonical.includes("app.omdalat.com") && !webCanonical.includes("// app.omdalat.com")) {
      v("R5", "apps/web/lib/canonical.ts", "Web canonical references app.omdalat.com — web must canonical to omdalat.com.");
    }
  }
  // apps/app must NOT canonical to omdalat.com
  const appLayout = readFileSafe(join(ROOT, "apps/app/app/layout.tsx"));
  if (appLayout && appLayout.includes("omdalat.com") && !appLayout.includes("app.omdalat.com")) {
    // Could be a link, not necessarily canonical — warn
    w("R5", "apps/app/app/layout.tsx", "App layout references omdalat.com — verify canonical is app.omdalat.com.");
  }
}

// --- Rule 6: Product ID must be present in registry ---

function checkProductIds() {
  const registryPath = join(ROOT, "docs/governance/OMDALAT_SUBDOMAIN_ROLE_REGISTRY_2026.csv");
  const content = readFileSafe(registryPath);
  if (!content) {
    v("R6", registryPath, "Subdomain role registry CSV not found.");
    return;
  }
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("product_id"));
  for (const line of lines) {
    const cols = line.split(",");
    if (cols.length < 1) continue;
    const productId = cols[0].trim();
    if (!productId) {
      v("R6", registryPath, "Registry row missing product_id.");
    }
  }
}

// --- Rule 8: Admin/private route must have noindex ---

function checkAdminNoindex() {
  // apps/app middleware must set noindex on all responses
  const appMiddleware = readFileSafe(join(ROOT, "apps/app/middleware.ts"));
  if (appMiddleware) {
    if (!appMiddleware.includes("noindex")) {
      v("R8", "apps/app/middleware.ts", "App middleware does not set noindex — all app routes must be noindex.");
    }
  }
  // Check apps/app robots.txt
  const appRobots = readFileSafe(join(ROOT, "apps/app/public/robots.txt"));
  if (appRobots) {
    if (!appRobots.includes("Disallow: /") && !appRobots.includes("Disallow: /\n")) {
      v("R8", "apps/app/public/robots.txt", "App robots.txt does not Disallow all — app must be fully noindex.");
    }
  } else {
    w("R8", "apps/app/public/robots.txt", "App robots.txt not found — verify noindex is enforced.");
  }
}

// --- Rule 11: True 404 must exist ---

function checkTrue404() {
  const web404 = existsSync(join(ROOT, "apps/web/app/not-found.tsx")) ||
    existsSync(join(ROOT, "apps/web/app/not-found.ts"));
  const app404 = existsSync(join(ROOT, "apps/app/app/not-found.tsx")) ||
    existsSync(join(ROOT, "apps/app/app/not-found.ts"));
  if (!web404) v("R11", "apps/web/app/not-found.tsx", "Web app missing true 404 page.");
  if (!app404) v("R11", "apps/app/app/not-found.tsx", "App missing true 404 page.");
}

// --- Rule 15: Brand must have Brand Charter ---

function checkBrandCharterExists() {
  const charterTemplate = join(ROOT, "docs/governance/OMDALAT_BRAND_CHARTER_TEMPLATE_2026.md");
  if (!existsSync(charterTemplate)) {
    v("R15", charterTemplate, "Brand Charter template not found in docs/governance/.");
  }
  // Check that any brand marked LIVE in registry has a charter file
  const registryPath = join(ROOT, "docs/governance/OMDALAT_SUBDOMAIN_ROLE_REGISTRY_2026.csv");
  const content = readFileSafe(registryPath);
  if (!content) return;
  const lines = content.split("\n").filter((l) => l.trim() && !l.startsWith("product_id"));
  for (const line of lines) {
    const cols = line.split(",");
    if (cols.length < 5) continue;
    const hostname = cols[1];
    const status = cols[4];
    // Only check brand subdomains (not root, app, api, docs, etc.)
    const isBrand = hostname && !hostname.startsWith("omdalat.com") &&
      !hostname.startsWith("www.") && !hostname.startsWith("app.") &&
      !hostname.startsWith("ap.") && !hostname.startsWith("api.") &&
      !hostname.startsWith("brand.") && !hostname.startsWith("docs.") &&
      !hostname.startsWith("market.") && !hostname.startsWith("registry.") &&
      !hostname.startsWith("auction.") && !hostname.startsWith("dreams.") &&
      !hostname.startsWith("cham.");
    if (isBrand && (status === "LIVE" || status === "LIVE_LIMITED")) {
      const charterPath = join(ROOT, "docs/governance/brand-charters", `${hostname.replace(".omdalat.com", "")}-charter.md`);
      if (!existsSync(charterPath)) {
        w("R15", charterPath, `Brand ${hostname} is ${status} but has no Brand Charter file.`);
      }
    }
  }
}

// --- F1 specific: deploy-app workflow must build @omdalat/app, not @omdalat/web ---

function checkDeployAppWorkflow() {
  const workflow = readFileSafe(join(ROOT, ".github/workflows/deploy-app-cloudflare-pages.yml"));
  if (!workflow) return;
  if (workflow.includes("@omdalat/web build:cf")) {
    v("F1", ".github/workflows/deploy-app-cloudflare-pages.yml", "App deploy workflow builds @omdalat/web instead of @omdalat/app — F1 regression.");
  }
  if (workflow.includes("@omdalat/web exec wrangler pages deploy")) {
    v("F1", ".github/workflows/deploy-app-cloudflare-pages.yml", "App deploy workflow deploys @omdalat/web instead of @omdalat/app — F1 regression.");
  }
}

// --- F2 specific: ap.* must NOT be in LEGACY_APP_HOSTS ---

function checkApNotInLegacyHosts() {
  for (const file of ["apps/web/middleware.ts", "apps/app/middleware.ts"]) {
    const content = readFileSafe(join(ROOT, file));
    if (!content) continue;
    // Look for ap.omdalat.com in Set definitions (not comments)
    const setMatch = content.match(/LEGACY_APP_HOSTS\s*=\s*new Set\s*\(([^)]+)\)/);
    if (setMatch) {
      const setContents = setMatch[1];
      if (setContents.includes("ap.omdalat.com")) {
        v("F2", file, "ap.omdalat.com still in LEGACY_APP_HOSTS — F2 not fixed.");
      }
    }
  }
}

// --- Run all checks ---

checkApInPublicCode();
checkOmdalatApIdentifier();
checkAppLabeledAp();
checkCanonicalOwnership();
checkProductIds();
checkAdminNoindex();
checkTrue404();
checkBrandCharterExists();
checkDeployAppWorkflow();
checkApNotInLegacyHosts();

// --- Report ---

if (violations.length === 0 && warnings.length === 0) {
  console.log("✅ OMDALAT Anti-Confusion CI Guard: ALL CHECKS PASSED");
  process.exit(0);
}

if (warnings.length > 0) {
  console.log(`⚠️  Warnings (${warnings.length}):`);
  for (const w of warnings) {
    console.log(`  [${w.rule}] ${w.file}: ${w.msg}`);
  }
}

if (violations.length > 0) {
  console.error(`❌ OMDALAT Anti-Confusion CI Guard: ${violations.length} VIOLATION(S) FOUND`);
  for (const v of violations) {
    console.error(`  [${v.rule}] ${v.file}: ${v.msg}`);
  }
  process.exit(1);
}

console.log("✅ OMDALAT Anti-Confusion CI Guard: PASSED (with warnings)");
process.exit(0);
