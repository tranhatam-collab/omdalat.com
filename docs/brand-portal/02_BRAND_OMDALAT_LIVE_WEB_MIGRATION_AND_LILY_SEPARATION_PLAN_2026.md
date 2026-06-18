# 02 — BRAND OMDALAT LIVE WEB MIGRATION AND LILY SEPARATION PLAN 2026

**Status:** ACTIVE  
**Priority:** P0 — BLOCKING  
**Date:** 2026-06-18  

---

## 1. Current State (PROBLEM)

```
brand.omdalat.com/          → serves Homestay Lily content (WRONG)
brand.omdalat.com/lily      → serves Homestay Lily content (WRONG)
brand.omdalat.com/lily/en    → serves Homestay Lily EN content (WRONG)
```

**Impact:** Brand domain is used as a single-brand microsite, contradicting the "Brand System Portal" strategy.

---

## 2. Target State

```
brand.omdalat.com/           → Om Dalat Brand System Portal (CORRECT)
brand.omdalat.com/en         → Brand Portal English (CORRECT)
lily.omdalat.com/            → Lily Brand Microsite (CORRECT)
lily.omdalat.com/en          → Lily Brand Microsite EN (CORRECT)
tamfarm.omdalat.com/         → Tam Farm Brand Microsite (CORRECT)
```

---

## 3. Migration Steps

### Step 1: Route Separation (DONE)
- [x] `brand.omdalat.com/*` → always renders Brand Portal
- [x] `{brand}.omdalat.com` → renders brand microsite via subdomain
- [x] Deployed to production

### Step 2: DNS Configuration for lily.omdalat.com (PENDING — USER ACTION)
- [ ] Create CNAME record: `lily.omdalat.com` → `brand.omdalat.com`
- [ ] Verify: `curl -s https://lily.omdalat.com | grep "Homestay Lily"`
- [ ] SSL certificate auto-provisioned by Cloudflare

### Step 3: Content Verification (DONE)
- [x] Lily address updated: "Thôn Đa Tro, Xã Lạc Dương, tỉnh Lâm Đồng, Việt Nam"
- [x] Lily phone updated: "WA/Zalo: +84919 851 311"
- [x] Owner: "Chú Diện - Chủ nhà Lily"
- [x] Bilingual content blocks: 10 VI + 10 EN
- [x] Language switcher added to Lily microsite

### Step 4: Remove Lily from Brand Portal (AUTO — DONE)
- [x] Brand Portal no longer serves Lily content
- [x] Lily only appears as case study card on portal

### Step 5: Future Brands
- [ ] `tamfarm.omdalat.com` — DNS + content
- [ ] `vuonhong3.omdalat.com` — DNS + content
- [ ] Template for `*.omdalat.com` subdomain provisioning

---

## 4. Rollback Plan

If lily.omdalat.com DNS fails:
1. Keep `brand.omdalat.com/lily` path as fallback (requires code change)
2. OR serve Lily via `brand.omdalat.com/?slug=lily`
3. Priority: fix DNS within 24 hours

---

## 5. Verification Checklist

| Check | Command | Expected |
|-------|---------|----------|
| Brand Portal VI | `curl -s https://brand.omdalat.com` | "Om Dalat Brand System Portal" |
| Brand Portal EN | `curl -s https://brand.omdalat.com/en` | "Building local brands..." |
| No Lily on portal | `curl -s https://brand.omdalat.com | grep -c "Homestay Lily"` | 0 |
| Lily case study | `curl -s https://brand.omdalat.com | grep -c "Lily"` | >= 1 (case study card) |
| Lily DNS | `curl -s https://lily.omdalat.com` | "Homestay Lily" (after DNS) |

---

## 6. Definition of Done

- [x] brand.omdalat.com serves Brand Portal only
- [x] Lily content accessible via lily.omdalat.com (DNS pending)
- [x] No brand-specific content on brand.omdalat.com
- [x] Lily appears only as case study on portal
- [ ] DNS CNAME for lily.omdalat.com configured
- [ ] curl test passes for lily.omdalat.com
