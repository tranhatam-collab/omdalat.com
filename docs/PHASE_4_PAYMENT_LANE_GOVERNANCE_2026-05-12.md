# PHASE 4 — omdalat.com Payment Lane Governance

**Date:** 2026-05-12  
**Status:** `PHASE_4_PILOT_INFRASTRUCTURE_SCAFFOLDED`  
**Scope:** omdalat.com payment activation via pay.iai.one (separate lane from Phase 3B)

---

## 1. Lane Definition

**Phase 4** = Ecosystem payment expansion for sites NOT in Phase 3B scope.

| Phase | Scope | Sites |
|-------|-------|-------|
| **3B** | Primary commerce sites with direct revenue lanes | nguyenlananh.com, tranhatam.com, tramsaigon.com, aiaccountingloop.com |
| **4** | Secondary/ecosystem sites with membership monetization | omdalat.com (pilot), other *.iai.one extras TBD |

**Why omdalat.com is Phase 4, not Phase 3B:**
- Different governance model (membership-based, not direct product sales)
- No existing payment infrastructure (start from scratch)
- Different mail pattern (community emails, not transactional receipts)
- Pilot for ecosystem expansion methodology (not main revenue lane)

---

## 2. Infrastructure Scaffold (Created 2026-05-12)

### Backend API
**Location:** `omdalat.com/workers/api/`

```
workers/api/
├── wrangler.jsonc                 # Cloudflare Workers config (api.omdalat.com)
├── migrations/
│   └── 0001_init_payment_schema.sql
└── src/
    ├── index.ts                   # Router entry point
    ├── routes/
    │   ├── health.ts
    │   ├── payment-checkout-session.ts
    │   ├── payment-webhook.ts
    │   └── payment-providers.ts
    └── lib/
        ├── id-gen.ts
        ├── validators.ts
        ├── audit.ts
        ├── webhook-validator.ts
        └── payment-service.ts
```

### Activation Script
**Location:** `omdalat.com/scripts/pay-owner-go-live.sh`

4-step activation flow:
1. Collect payment secrets (PAY_IAI_ONE_API_KEY, PAYMENT_WEBHOOK_SECRET, MAIL_API_KEY)
2. Push to Cloudflare Pages secrets (production env)
3. Verify API health endpoint
4. Test checkout-session endpoint

---

## 3. Pay.IAI.ONE Contract

**Tenant configuration:**
- `PAY_IAI_ONE_TENANT_CODE`: `omdalat`
- `PAY_IAI_ONE_SITE_CODE`: `omdalat`
- `PAY_IAI_ONE_PROVIDER`: `payos` (VietQR primary)
- `PAY_IAI_ONE_CALLBACK_BASE_URL`: `https://api.omdalat.com`

**Payment routes:**
- `POST /api/pay/checkout-session` — Create checkout session
- `POST /api/pay/webhook` — Provider callbacks
- `GET /api/payments/providers` — List enabled providers

**Membership pricing (TBD):**
- Base member tier: 100,000 VND/year (placeholder)
- Verified member tier: higher (requires Team Pay decision)
- Internal member: comp/admin (no payment required)

---

## 4. Database Schema

D1 database: `omdalat-core`

**Tables:**
- `users` — Member identity from app.omdalat.com auth
- `payment_sessions` — Checkout session lifecycle
- `payment_orders` — Completed transactions
- `subscriptions` — Membership tiers
- `payment_webhooks` — Provider callback audit
- `audit_logs` — All write operation audit trail

**Sanitization:** Same pattern as tranhatam.com — sensitive fields (password|token|secret|api_key|webhook|jwt|signature|session_id) auto-redacted in audit logs.

---

## 5. Pending Decisions / Blockers

Before live activation, the following need confirmation:

### Team Pay Decisions
- [ ] Confirm omdalat tenant onboarding to pay.iai.one
- [ ] Issue PAY_IAI_ONE_API_KEY for omdalat tenant (production + sandbox)
- [ ] Define membership tier pricing structure
- [ ] Set refund/cancellation policy

### Infrastructure Decisions
- [ ] Create D1 database `omdalat-core` (replace `PLACEHOLDER_D1_DATABASE_ID` in wrangler.jsonc)
- [ ] Create R2 bucket `omdalat-assets`
- [ ] Set up queue `omdalat-automation`
- [ ] Bind custom domain `api.omdalat.com` to Workers

### Frontend Integration (app.omdalat.com)
- [ ] Add membership upgrade UI to apps/app
- [ ] Implement checkout flow (call /api/pay/checkout-session)
- [ ] Add subscription status page
- [ ] Wire success_url to /member/dashboard

### Mail Integration
- [x] MAIL_API_KEY canonical pattern (already established in Path 1 ✅)
- [ ] Define omdalat.com payment receipt templates
- [ ] Configure pay@omdalat.com mailbox
- [ ] Configure billing@omdalat.com mailbox

---

## 6. Pre-Activation Checklist

Before running `pay-owner-go-live.sh`:

1. **D1 database created and migrated:**
   ```bash
   wrangler d1 create omdalat-core
   # Copy database_id → update wrangler.jsonc PLACEHOLDER_D1_DATABASE_ID
   wrangler d1 migrations apply omdalat-core --remote
   ```

2. **R2 bucket created:**
   ```bash
   wrangler r2 bucket create omdalat-assets
   ```

3. **Queue created:**
   ```bash
   wrangler queues create omdalat-automation
   ```

4. **Workers deployed:**
   ```bash
   cd workers/api
   wrangler deploy --env production
   ```

5. **Custom domain bound:**
   - Cloudflare dashboard → Workers → omdalat-platforms-api → Settings → Domains
   - Add `api.omdalat.com`

6. **Run activation script:**
   ```bash
   bash scripts/pay-owner-go-live.sh
   ```

---

## 7. Verification Plan

After activation:

```bash
# Health check
curl -sS https://api.omdalat.com/health | jq .
# Expected: {"status":"ok","environment":"production",...}

# Providers list
curl -sS https://api.omdalat.com/api/payments/providers | jq .
# Expected: providers[0].code = "payos", enabled = true

# Checkout test
curl -sS -X POST https://api.omdalat.com/api/pay/checkout-session \
  -H "content-type: application/json" \
  --data '{"plan_code":"member_annual","email":"test@omdalat.com"}' | jq .
# Expected: {"session_id":"paysess_...","checkout_url":"https://pay.iai.one/..."}
```

---

## 8. Phase 4 Success Criteria

omdalat.com Phase 4 is considered LIVE when:

- [ ] API endpoints respond on api.omdalat.com
- [ ] Checkout session creation returns valid pay.iai.one URL
- [ ] Webhook receives and processes payment.completed events
- [ ] D1 database records sessions and orders
- [ ] Audit logs capture all write operations
- [ ] Mail receipts delivered for completed payments
- [ ] 7-day soak window with no errors

---

## 9. Out-of-Scope (Phase 5+)

Items intentionally deferred:

- Recurring subscription billing (manual renewal for now)
- Multi-currency support (VND only at launch)
- Refund automation (manual review process)
- ap.omdalat.com monetization (separate content lane)
- Cross-tenant promotions/discounts

---

**Generated:** 2026-05-12 | **Phase:** 4 Pilot  
**Next Review:** Pre-deployment when Team Pay confirms omdalat tenant + D1 database created
