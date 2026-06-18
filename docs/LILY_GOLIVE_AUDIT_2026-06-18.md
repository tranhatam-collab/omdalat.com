# LILY.OMDALAT.COM — GO-LIVE AUDIT 2026-06-18

**Date:** 2026-06-18  
**Auditor:** Devin  
**Status:** ⚠️ PARTIAL — INQUIRY BLOCKED

---

## 1. DNS & Routing

| Check | Result |
|-------|--------|
| lily.omdalat.com resolves | ✅ CNAME → omdalat.com, Proxied |
| HTTPS | ✅ Auto SSL by Cloudflare |
| Wildcard route `*.omdalat.com/*` | ✅ Active on Worker |
| Subdomain isolation | ✅ Host-only, `?slug=` returns 403 |

---

## 2. Bilingual Content (100%)

| Block Type | VI | EN | Status |
|-----------|----|----|--------|
| hero | ✅ | ✅ | published |
| story | ✅ | ✅ | published |
| what | ✅ | ✅ | published |
| why | ✅ | ✅ | published |
| space | ✅ | ✅ | published |
| location | ✅ | ✅ | published |
| business | ✅ | ✅ | published |
| highlights | ✅ | ✅ | published |
| reviews | ✅ | ✅ | published |
| contact | ✅ | ✅ | published |

**Total:** 10 VI + 10 EN = 20 blocks, all `published`

---

## 3. Images (20 photos uploaded)

| Category | Count | R2 Key | Live URL |
|----------|-------|--------|----------|
| hero | 1 | `brands/lily/images/hero/hero-01.jpg` | `lily.omdalat.com/images/hero/hero-01.jpg` |
| garden | 4 | `brands/lily/images/garden/` | `lily.omdalat.com/images/garden/` |
| cafe | 3 | `brands/lily/images/cafe/` | `lily.omdalat.com/images/cafe/` |
| rooms | 4 | `brands/lily/images/rooms/` | `lily.omdalat.com/images/rooms/` |
| food | 3 | `brands/lily/images/food/` | `lily.omdalat.com/images/food/` |
| reviews | 2 | `brands/lily/images/reviews/` | `lily.omdalat.com/images/reviews/` |
| gallery | 4 | `brands/lily/images/gallery/` | `lily.omdalat.com/images/gallery/` |
| og | 2 | `brands/lily/images/og/` | `lily.omdalat.com/images/og/` |

**Verify:**
```bash
curl -sI https://lily.omdalat.com/images/hero/hero-01.jpg
# → HTTP/2 200, Content-Type: image/jpeg
```

**HTML renders:** 8 `<img>` tags per page (hero + gallery + highlights)

---

## 4. SEO Meta

| Meta Tag | VI | EN |
|----------|----|----|
| title | ✅ "Homestay Lily Lạc Dương Đà Lạt" | ✅ "Homestay Lily Lac Duong Dalat" |
| description | ✅ | ✅ |
| canonical | ✅ `https://lily.omdalat.com` | ✅ `https://lily.omdalat.com/en` |
| hreflang | ✅ vi + en | ✅ en + vi |
| og:title | ✅ | ✅ |
| og:description | ✅ | ✅ |
| og:image | ✅ `.../images/og/og-lily.jpg` | ✅ `.../images/og/og-lily.jpg` |
| og:locale | ✅ vi_VN | ✅ en_US |
| twitter:card | ✅ summary_large_image | ✅ summary_large_image |
| JSON-LD | ✅ Organization + WebSite + WebPage | ✅ |

---

## 5. Language Switcher

| Check | Result |
|-------|--------|
| Visible on VI page | ✅ "Tiếng Việt" (active) + "English" |
| Visible on EN page | ✅ "English" (active) + "Tiếng Việt" |
| Links correct | ✅ `/` and `/en` |
| aria-label | ✅ |

---

## 6. Contact Info

| Field | Value |
|-------|-------|
| Address (VI) | ✅ "Thôn Đa Tro, Xã Lạc Dương, tỉnh Lâm Đồng, Việt Nam" |
| Phone | ✅ "WA/Zalo: +84919 851 311" |
| Email | ✅ "contact@lily.omdalat.com" |
| Owner | ✅ "Chú Diện — Chủ nhà Lily" |

---

## 7. Security

| Check | Result |
|-------|--------|
| HTTPS only | ✅ |
| Tenant isolation (`?slug=` blocked) | ✅ 403 Forbidden |
| CORS (API) | ✅ Allowlist only |
| Auth on publish/approval | ✅ requireSuper |

---

## 8. Performance

| Metric | Target | Actual |
|--------|--------|--------|
| First response | < 1s | ~200ms (Worker edge) |
| Image cache | 1 year | ✅ `max-age=31536000, immutable` |
| CDN | Cloudflare | ✅ |

---

## 9. BLOCKER: Inquiry Form (P0)

| Check | Result |
|-------|--------|
| Form action | ✅ Updated to `https://api.omdalat.com/api/omdalat/brands/brnd_lily/inquiry` |
| API endpoint | ❌ HTTP 500, error code 1101 (Cloudflare runtime error) |
| Database insert | ❌ Not reaching D1 due to runtime error |
| Queue notification | ⚠️ Temporarily disabled (was causing 1101) |

**Root cause:** Cloudflare Workers runtime error 1101, likely binding or infrastructure issue with `api.omdalat.com`. Investigation needed.

**Workaround:** Contact form currently non-functional. Users should use direct contact (WA/Zalo: +84919 851 311, email: contact@lily.omdalat.com).

---

## 10. Remaining Items (Non-blocking)

- [ ] Fix API runtime error 1101 on `api.omdalat.com`
- [ ] Re-enable queue notification after runtime fix
- [ ] Brand admin login fix (1101 runtime error — needs bcrypt replacement)
- [ ] Lily admin account creation for Chú Diện
- [ ] Google indexing verification (7 days)

---

## VERDICT

**lily.omdalat.com is NOT GO-LIVE READY due to inquiry form blocker.**

Passing checks:
- ✅ Domain live and SSL
- ✅ Bilingual content 100%
- ✅ 20 real photos served from R2
- ✅ SEO meta complete (og:image fixed)
- ✅ Language switcher working
- ✅ Contact info verified
- ✅ Security gates enforced

Blocking checks:
- ❌ Inquiry form — API returns 1101 runtime error

**Status:** PARTIAL — PUBLIC READ-ONLY READY, INQUIRY BLOCKED

**Signed off: 2026-06-18 (partial)**
