# OMDALAT.COM - CLEAN DEV LOOP (Priority-Gated) 2026

**Date:** 2026-06-18
**Scope:** Continuous dev loop until all gates are green
**Rule:** No "completed" claim until gate metrics are met

---

## Loop Architecture

Each loop has:
- **Input:** A specific gate that is currently red
- **Action:** The smallest work that can turn it green
- **Evidence:** A command or check that proves the gate is now green
- **Output:** Updated true-state doc

---

## Loop 1: Fix Build Trace Blocker

**Gate:** `packet_build_trace_blocked=YES`

**Evidence:**
```bash
pnpm --filter @omdalat/web build:cf
# Must complete without ETIMEDOUT at "Collecting build traces"
```

**Actions:**
1. Check build output size; reduce if > threshold
2. Review `next.config.js` for trace options
3. Try `experimental.outputFileTracingRoot` or `outputFileTracingExcludes`
4. Re-run build
5. Verify completion

**Done when:** `packet_build_trace_blocked=NO` in sprint0 acceptance check

---

## Loop 2: Provide Visual Evidence

**Gate:** `visual_artifact_files=0/12`

**Evidence:**
```bash
pnpm sprint0:acceptance:check
# Must report visual_artifact_files >= 12/12
```

**Actions:**
1. Start local dev server: `pnpm dev`
2. Screenshot each of 6 routes in VI
3. Screenshot each of 6 routes in EN
4. Save to `evidence/visual/`
5. Re-run checker

**Done when:** `visual_artifact_files=12/12`

---

## Loop 3: Staging Deploy + Proof

**Gate:** `staging_proof_files_substantive=0/6`

**Evidence:**
```bash
pnpm sprint0:acceptance:check
# Must report staging_proof_files_substantive >= 6/6
```

**Actions:**
1. Deploy to Pages staging (not production custom domain)
2. Verify canonical + hreflang on staging URL
3. Screenshot staging evidence
4. Save to `evidence/staging/`
5. Re-run checker

**Done when:** `staging_proof_files_substantive=6/6`

---

## Loop 4: DNS Configuration

**Gate:** `lily.omdalat.com` does not resolve

**Evidence:**
```bash
curl -I https://lily.omdalat.com
# Must return HTTP 200 (not "Could not resolve host")
```

**Actions:**
1. Log in to Cloudflare Dashboard
2. Select `omdalat.com` zone
3. Add CNAME: `lily` -> `brand.omdalat.com` (Proxied)
4. Wait 15-30 min for SSL auto-provision
5. Verify with `dig lily.omdalat.com`
6. Verify with `curl -I https://lily.omdalat.com`

**Done when:** `curl` returns `HTTP 200` with valid SSL

---

## Loop 5: Replace Placeholder Content

**Gate:** Content has `{{ADDRESS_VI}}`, `{{OWNER_CONTACT}}`, `{{OWNER_NAME}}`

**Evidence:**
```bash
curl -s "https://api.omdalat.com/api/omdalat/brands/brnd_lily/preview" | grep -E '\{\{.*\}\}'
# Must return empty (no placeholders in JSON)
```

**Actions:**
1. Collect real address from owner
2. Collect real owner name and contact
3. Verify Google Place ID
4. Update DB records:
   ```sql
   UPDATE places SET address_vi = '...', address_en = '...' WHERE id = 'plc_lily';
   UPDATE owners SET name = '...', contact = '...' WHERE id = 'own_lily';
   ```
5. Re-query API to verify no placeholders

**Done when:** No `{{...}}` strings in API response

---

## Loop 6: Upload Real Images

**Gate:** No real images in R2 bucket

**Evidence:**
```bash
# List R2 bucket and confirm real images exist
wrangler r2 object list omdalat-assets --prefix brands/lily/
# Must return actual image files, not empty
```

**Actions:**
1. Obtain real images from owner/photographer
2. Resize/optimize for web
3. Upload to R2: `brands/lily/hero.jpg`, `brands/lily/gallery-1.jpg`, etc.
4. Update `media_assets` table with real paths
5. Verify renderer loads images

**Done when:** Renderer shows real images, not placeholders

---

## Loop 7: Compliance Signoff

**Gate:** Compliance checklist not signed off

**Evidence:**
```bash
curl -s "https://api.omdalat.com/api/omdalat/brands/brnd_lily/publish" \
  -X POST -H "Content-Type: application/json" -d '{"action":"status"}'
# Must return all gates as "passed", not "pending"
```

**Actions:**
1. Obtain owner consent (signed form or email confirmation)
2. Content review by assigned reviewer
3. Image rights verification
4. Compliance review by assigned reviewer
5. QA checklist execution
6. Update `compliance_checklists` table

**Done when:** All 5 compliance gates show `passed`

---

## Loop 8: Sprint 0 Acceptance Re-check

**Gate:** `sprint0:acceptance:check` returns `PENDING`

**Evidence:**
```bash
pnpm sprint0:acceptance:check
# Must return:
#   sprint0_acceptance=READY
#   packet_deploy_blocked=NO
#   packet_build_trace_blocked=NO
#   visual_artifact_files=12/12
#   staging_proof_files_substantive=6/6
```

**Actions:**
1. Ensure Loops 1-7 are complete
2. Run checker
3. If any metric red, go back to the corresponding loop
4. Only proceed when all metrics green

**Done when:** `sprint0_acceptance=READY`

---

## Loop 9: Production Custom Domain Go/No-Go

**Gate:** `app.omdalat.com` still redirects to `ap.omdalat.com`

**Evidence:**
```bash
curl -I https://app.omdalat.com
# Must return 200 from new app runtime, not 308 to ap.omdalat.com
```

**Actions:**
1. Bind `app.omdalat.com` to `omdalat-app` Pages project
2. Remove legacy redirect `app -> ap` in old infra
3. Verify DNS for `www.app.omdalat.com`
4. Run smoke tests on production custom domain

**Done when:** `OMDALAT_TEAM1_FINAL_PRODUCTION_GATE` updates to `GO`

---

## Commit Rule

**Before each commit:**
1. Run `pnpm sprint0:acceptance:check`
2. Verify no `{{...}}` placeholders in content
3. Verify no `TRANHATAM` paths in `omdalat.com` docs
4. Update `OMDALAT_TRUE_STATE_AUDIT_2026.md` with current gate status
5. Only then commit

**Commit message format:**
```
fix(gate-N): [what changed]

- Gate: [gate name]
- Before: [red state]
- After: [green state]
- Evidence: [command or check]
```

---

## Weekly Rhythm

- **Monday:** Pick the highest-priority red gate
- **Tue-Thu:** Execute the loop for that gate
- **Friday:** Run full acceptance check, update true-state doc, commit
- **Saturday-Sunday:** Rest or pick optional gates

---

## Forbidden Words (until gate is green)

Do not use these in commit messages or docs:
- "completed"
- "successfully deployed"
- "all systems operational"
- "production live"
- "100%"
- "done"

Use instead:
- "responds"
- "deployed and tested"
- "gate passes"
- "consumer domain resolves"
- "acceptance ready"
