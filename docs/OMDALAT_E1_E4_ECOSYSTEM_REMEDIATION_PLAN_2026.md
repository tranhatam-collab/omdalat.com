# OMDALAT E1–E4 ECOSYSTEM REMEDIATION PLAN 2026

## Phase 0 — Fix split-brain Cloudflare accounts, broken services, and non-production routing

**Date:** 2026-06-30  
**Scope:** DNS, Cloudflare Workers, Cloudflare Pages, Domain Registry  
**Target:** All E1–E4 items resolved or explicitly retired with safe rollback  

---

## 0. Current truth (from live Cloudflare API and curl checks)

### Accounts
| Account ID | Email | Owns |
|---|---|---|
| `f3f9e76222dcb488d5e303e29e8ba192` | `Tranhatam@gmail.com` | Zone `omdalat.com`, Workers `omdalat-*`, Pages `omdalat-web`, `cham-omdalat-com` |
| `93112cc89181e75335cbd7ef7e392ba3` | `Tranhatam66@gmail.com` | Pages `omdalat-app`, Worker `cham-omdalat-com` (duplicate) |
| `62d57eaa548617aeecac766e5a1cb98e` | `Anhhatam@gmail.com` | No Om Dalat resources (has shared/member access to zone) |

### DNS records (zone `omdalat.com`)
| Name | Type | Target | Issue |
|---|---|---|---|
| `omdalat.com` | CNAME | `omdalat-web-ezk.pages.dev` | OK — apex Pages project |
| `www.omdalat.com` | CNAME | `omdalat-web.pages.dev` | **E4** — points to non-existent/different Pages project |
| `lily.omdalat.com` | CNAME | `omdalat.com` | **E3** — resolves to apex Pages; still served by non-production Worker route |
| `cham.omdalat.com` | CNAME | `cham-omdalat-com.pages.dev` | **E2** — returns HTTP 500 |
| `dreams.omdalat.com` | AAAA | `100::` | **E2** — returns HTTP 500 |
| `app.omdalat.com` | CNAME | `omdalat-app.pages.dev` | **E1** — Pages project in different account |
| `www.app.omdalat.com` | CNAME | `omdalat-app.pages.dev` | **E1** — same issue |
| `api.omdalat.com` | AAAA | `100::` | OK — custom domain binding to `omdalat-platforms-api-production` |
| `brand.omdalat.com` | AAAA | `100::` | OK — custom domain binding to `omdalat-brand-renderer-production` |

### Worker routes
| Worker | Routes | Notes |
|---|---|---|
| `omdalat-brand-renderer` | `lily.omdalat.com/*`, `vuonhong3.omdalat.com/*` | **E3** — non-production |
| `omdalat-brand-renderer-production` | `auction`, `market`, `registry` | Production, missing `lily` |
| `dreams-omdalat` | `dreams.omdalat.com/*` | **E2** — broken |
| `omdalat-support-overlay` | `omdalat.com/support*`, `www.omdalat.com/support*` | Legacy — review |

---



## Execution Log

| Item | Action | Status | Evidence |
|---|---|---|---|
| E2 — cham.omdalat.com | Deleted CNAME DNS record + `www.cham` CNAME; Pages/Worker cleanup pending | DNS retired | curl returns NXDOMAIN (000) |
| E2 — dreams.omdalat.com | Deleted AAAA DNS record and Worker route | DNS + route retired | curl returns NXDOMAIN (000) |
| E3 — lily.omdalat.com | Moved route from `omdalat-brand-renderer` to `omdalat-brand-renderer-production` | Live | curl https://lily.omdalat.com/ returns 200 |
| E3 — vuonhong3.omdalat.com | Created AAAA `100::` DNS record + route on production Worker | Live | curl https://vuonhong3.omdalat.com/ returns 200 |
| E4 — www.omdalat.com | Verified CNAME points to `omdalat-web-ezk.pages.dev` (same as apex) | Live | curl https://www.omdalat.com returns 200 |
| E1 — app.omdalat.com | Decision pending founder approval; registry marked PENDING_MIGRATION | Pending | See Option A below |

### Git commit
- `0050664` feat(auth,content,renderer): AUTH_BASELINE, overclaim wiring, renderer parity, E1-E4 remediation
- Includes updated `docs/governance/OMDALAT_DOMAIN_REGISTRY_2026.csv`

### Cloudflare resources updated
- Zone ID: `48817115d775cd1b80ed451acb336a5c`
- Worker routes: lily/vuonhong3 → `omdalat-brand-renderer-production`; dreams route deleted
- DNS records: cham + www.cham + dreams deleted; vuonhong3 AAAA created

## 1. E1 — Split-brain Cloudflare accounts

### Finding
`omdalat.com` zone and main Workers live in `Tranhatam@gmail.com` account, but `app.omdalat.com` Pages project lives in `Tranhatam66@gmail.com` account.

### Impact
- Split ownership, billing, access control
- Cannot deploy `omdalat-app` from main repo/CI without cross-account credentials
- Risk of stale app, broken SSL, or accidental deletion

### Remediation options

**Option A (recommended):** Move `omdalat-app` Pages project to `Tranhatam@gmail.com` account.
- Cloudflare does not support direct project transfer across accounts.
- Procedure: create new `omdalat-app` Pages project in `Tranhatam@gmail.com`, deploy from same repo, update DNS CNAME, then delete old project.
- **Requires user approval** because it changes the app deployment pipeline.

**Option B:** Keep app in `Tranhatam66@gmail.com` but document and add dual-account CI.
- Higher operational complexity; not recommended long-term.

### Decision
**Option A pending founder approval.** This plan documents Option A as the target.

---

## 2. E2 — Retire cham.omdalat.com + dreams.omdalat.com

### Finding
Both return HTTP 500 and are not maintained in current repo.

### Remediation
1. **cham.omdalat.com**
   - Delete CNAME DNS record
   - Delete `cham-omdalat-com` Pages project in `Tranhatam@gmail.com` account
   - Delete `cham-omdalat-com` Worker in `Tranhatam66@gmail.com` account
   - Delete `www.cham.omdalat.com` CNAME
2. **dreams.omdalat.com**
   - Delete AAAA DNS record
   - Delete `dreams-omdalat` Worker route
   - Delete `dreams-omdalat` Worker script

### Rollback
- Re-create DNS records if needed
- Worker deletion is reversible only if source code is preserved in repo (it is not currently; must be archived if needed)

---

## 3. E3 — Reconcile lily.omdalat.com to production

### Finding
`lily.omdalat.com` is served by `omdalat-brand-renderer` (non-production) via Worker route. DNS points to apex Pages.

### Remediation
1. Add Worker route `lily.omdalat.com/*` to `omdalat-brand-renderer-production`
2. Delete Worker route `lily.omdalat.com/*` from `omdalat-brand-renderer`
3. Change DNS `lily.omdalat.com` from CNAME `omdalat.com` to AAAA `100::` (or A `192.0.2.1`) so it resolves directly to Worker route

### Rollback
- Re-add route to `omdalat-brand-renderer`
- Restore CNAME to `omdalat.com`

---

## 4. E4 — Reconcile www.omdalat.com apex alias

### Finding
`www.omdalat.com` points to `omdalat-web.pages.dev`, but the apex project is `omdalat-web` with subdomain `omdalat-web-ezk.pages.dev`. There is no Pages project with subdomain `omdalat-web.pages.dev`.

### Remediation
Update `www.omdalat.com` CNAME to `omdalat-web-ezk.pages.dev` (same project as apex).

### Rollback
- Revert CNAME if needed

---

## 5. Execution order

1. **Safe DNS fixes first:** www, lily
2. **Worker route reconciliation:** lily to production
3. **Retire broken services:** cham, dreams
4. **Account migration:** app.omdalat.com (pending approval)
5. **Update domain registry** and release verdict
6. **Live verification** (curl all surfaces)

---

## 6. Verification commands

```bash
for url in https://omdalat.com https://www.omdalat.com https://lily.omdalat.com https://app.omdalat.com https://brand.omdalat.com https://api.omdalat.com https://market.omdalat.com https://registry.omdalat.com; do
  echo "=== $url ==="
  curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" --max-time 10 "$url"
done

# Expected after remediation:
# omdalat.com        -> 308 /vi
# www.omdalat.com    -> 308 /vi
# lily.omdalat.com   -> 200
# app.omdalat.com    -> 307 /vi (pending E1 migration)
# brand.omdalat.com  -> 200
# api.omdalat.com    -> 404
# market.omdalat.com -> 200
# registry.omdalat.com -> 200
```

---

## 7. Post-remediation registry update

- `www.omdalat.com`: `CNAME` target `omdalat-web-ezk.pages.dev`, status `LIVE`
- `lily.omdalat.com`: `AAAA` `100::`, route on `omdalat-brand-renderer-production`, status `LIVE`
- `cham.omdalat.com`: status `RETIRED`, DNS removed
- `dreams.omdalat.com`: status `RETIRED`, DNS removed
- `app.omdalat.com`: status `PENDING_MIGRATION` until Option A approved

---

*Generated with [Devin](https://devin.ai)*  
*Co-Authored-By: Devin <158243242+devin-ai-integration[bot]@users.noreply.github.com>*
