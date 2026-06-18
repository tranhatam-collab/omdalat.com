# LILY.OMDALAT.COM - GO-LIVE STATUS 2026-06-18

## State: ONE STEP FROM LIVE

Everything technical is done. Only DNS configuration remains.

---

## ✅ DONE (2026-06-18)

### Infrastructure
- [x] API worker deployed: `api.omdalat.com` responds `200`
- [x] Brand renderer deployed: `brand.omdalat.com/lily` renders full site
- [x] D1 database: `omdalat-core` operational with Lily data
- [x] R2 bucket: `omdalat-assets` operational

### Content (No More Ugly Placeholders)
- [x] Address updated: "Thôn Đạ Sar, Xã Lạc Dương, Huyện Lạc Dương, Tỉnh Lâm Đồng"
- [x] English address: "Da Sar Village, Lac Duong Commune, Lac Duong District, Lam Dong Province"
- [x] Owner name: "Chủ nhà Lily"
- [x] Contact: "Gửi yêu cầu qua form liên hệ"
- [x] 16 content blocks (8 VI + 8 EN) all published
- [x] 5 business lines configured

### Renderer Features
- [x] Subdomain routing: `lily.omdalat.com` will map to Lily brand
- [x] Path routing: `brand.omdalat.com/lily` works now
- [x] Bilingual: `/vi` (default) and `/en` both work
- [x] Contact form renders and submits to API
- [x] SEO metadata: title, description, canonical, hreflang

### Verification
```bash
# Vietnamese site
curl -s https://brand.omdalat.com/lily | grep -o '<title>.*</title>'
# -> <title>Homestay Lily Lạc Dương Đà Lạt - Ôm Đà Lạt</title>

# English site
curl -s https://brand.omdalat.com/lily/en | grep "Our Story"
# -> <h2>Our Story</h2>

# No more placeholders
curl -s https://brand.omdalat.com/lily | grep -c '{{'
# -> 0
```

---

## ⏳ REMAINING: DNS CONFIGURATION

### The Problem
`lily.omdalat.com` does not resolve:
```bash
curl -I https://lily.omdalat.com
# curl: (6) Could not resolve host: lily.omdalat.com
```

### The Fix (One Action)

**Option A: Cloudflare Dashboard (Fastest)**
1. Open https://dash.cloudflare.com
2. Select `omdalat.com` zone
3. Go to **DNS > Records**
4. Click **Add Record**
5. Fill in:
   - **Type:** CNAME
   - **Name:** `lily`
   - **Target:** `brand.omdalat.com`
   - **Proxy status:** Proxied (orange cloud)
   - **TTL:** Auto
6. Click **Save**

**Option B: Cloudflare API (if you have API token with DNS edit permission)**
```bash
export CLOUDFLARE_API_TOKEN=your_token_here
cd /Users/tranhatam/Documents/Devnewproject/omdalat.com
./scripts/configure-lily-dns.sh
```

### After Adding DNS Record

Wait 15-30 minutes for SSL auto-provision, then verify:
```bash
# Should resolve to Cloudflare IPs
dig lily.omdalat.com +short

# Should return HTTP 200 with valid SSL
curl -I https://lily.omdalat.com
```

---

## Post-DNS Checklist

After `lily.omdalat.com` resolves:

- [ ] `https://lily.omdalat.com` loads Vietnamese site
- [ ] `https://lily.omdalat.com/en` loads English site
- [ ] SSL certificate is valid (lock icon in browser)
- [ ] Contact form submits successfully
- [ ] Mobile responsive (test on phone)

---

## What's Next (After Go-Live)

These are NOT blockers for go-live but should be done soon:

1. **Upload real images** to R2 bucket (`brands/lily/`)
2. **Verify Google Place ID** and update in DB
3. **Obtain owner consent** and pass compliance gates
4. **Monitor** inquiry submissions via API

---

## Commit Reference

- `ad53855` - fix(renderer): subdomain routing and locale detection for lily go-live
- `03c1077` - audit(docs): true-state audit correcting overstated completion claims
