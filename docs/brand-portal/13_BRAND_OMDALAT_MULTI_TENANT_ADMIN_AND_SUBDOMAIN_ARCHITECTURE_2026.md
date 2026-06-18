# 13 — BRAND OMDALAT MULTI-TENANT ADMIN AND SUBDOMAIN ARCHITECTURE 2026

**Status:** LOCKED  
**Date:** 2026-06-18  
**Prerequisite:** 01–12 Master Pack  

---

## 1. Core Principle

Mỗi thương hiệu (brand) là một **tenant độc lập**.

```
Tenant = 1 Brand = 1 Subdomain = 1 Admin
```

| Subdomain | Brand | Admin | Scope |
|-----------|-------|-------|-------|
| `lily.omdalat.com` | Lily | Chú Diện | Chỉ quản trị Lily |
| `tamfarm.omdalat.com` | Tam Farm | Chủ Tam Farm | Chỉ quản trị Tam Farm |
| `vuonhong3.omdalat.com` | Vườn Hồng 3 | Chủ Vườn Hồng | Chỉ quản trị Vườn Hồng |
| `brand.omdalat.com` | Om Dalat (Portal) | Om Dalat Team | Quản trị toàn hệ |

**Brand admin không thấy, không chỉnh sửa, không xóa thương hiệu khác.**

---

## 2. Subdomain Routing (Wildcard)

### Wrangler Config

```jsonc
// wrangler.jsonc
"routes": [
  {
    "pattern": "brand.omdalat.com",
    "custom_domain": true
  },
  {
    "pattern": "*.omdalat.com",
    "custom_domain": true
  }
]
```

### DNS Setup (Per Brand)

| Type | Name | Target | Proxy | TTL |
|------|------|--------|-------|-----|
| CNAME | `lily` | `omdalat.com` | 🟠 On | Auto |
| CNAME | `tamfarm` | `omdalat.com` | 🟠 On | Auto |
| CNAME | `vuonhong3` | `omdalat.com` | 🟠 On | Auto |

**Worker code phân biệt subdomain:**

```typescript
// src/index.ts
const host = request.headers.get('Host') || '';
const hostParts = host.split('.');

if (hostParts[0] === 'brand') {
  return handlePortal(request, env);      // brand.omdalat.com
}

// lily.omdalat.com → hostParts[0] === 'lily'
return handleBrandSite(request, env, hostParts[0]);
```

---

## 3. Multi-Tenant Data Model

### brand_admins (NEW TABLE)

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | badm_{uuid} |
| brand_id | TEXT FK | → brands.id |
| email | TEXT UNIQUE | Login email |
| password_hash | TEXT | bcrypt hash |
| name | TEXT | Display name |
| phone | TEXT | Contact |
| role | TEXT | owner, manager, editor |
| is_active | BOOLEAN | Can login |
| last_login | DATETIME | |
| created_at | DATETIME | |
| updated_at | DATETIME | |

### brands (UPDATED)

| Column | Type | Description |
|--------|------|-------------|
| ...existing columns... | | |
| admin_id | TEXT FK | → brand_admins.id (primary admin) |
| admin_enabled | BOOLEAN | Admin panel enabled |

### admin_sessions (NEW TABLE)

| Column | Type | Description |
|--------|------|-------------|
| id | TEXT PK | sess_{uuid} |
| admin_id | TEXT FK | → brand_admins.id |
| brand_id | TEXT FK | → brands.id |
| token | TEXT | JWT or opaque token |
| expires_at | DATETIME | |
| created_at | DATETIME | |

---

## 4. Admin Panel Routes (Per Brand)

```
lily.omdalat.com/admin          → Login page
lily.omdalat.com/admin/dashboard → Brand admin dashboard
lily.omdalat.com/admin/content   → Edit content blocks
lily.omdalat.com/admin/media     → Upload/manage photos
lily.omdalat.com/admin/inquiries → View inquiries
lily.omdalat.com/admin/settings  → Brand settings
lily.omdalat.com/admin/preview   → Preview changes
```

### Authentication Flow

```
Brand Admin visits lily.omdalat.com/admin
  ↓
System checks: subdomain = lily → brand_id = brnd_lily
  ↓
Login form (email + password)
  ↓
Verify: email belongs to brand_admins WHERE brand_id = brnd_lily
  ↓
Issue session cookie: .lily.omdalat.com
  ↓
Redirect to /admin/dashboard
```

### Authorization Rules

```
Rule 1: admin.brand_id MUST EQUAL request_brand_id
Rule 2: admin.is_active MUST be TRUE
Rule 3: session MUST be valid and not expired
Rule 4: role MUST have permission for the action
```

### Role Permissions

| Action | owner | manager | editor |
|--------|-------|---------|--------|
| View dashboard | ✅ | ✅ | ✅ |
| Edit content | ✅ | ✅ | ✅ |
| Upload media | ✅ | ✅ | ❌ |
| Publish/unpublish | ✅ | ✅ | ❌ |
| View inquiries | ✅ | ✅ | ❌ |
| Manage settings | ✅ | ❌ | ❌ |
| Add/remove admins | ✅ | ❌ | ❌ |

---

## 5. Content Edit Flow (Brand Admin)

```
Brand Admin logs in → lily.omdalat.com/admin
  ↓
Sees only Lily's content blocks
  ↓
Edits hero title (VI + EN)
  ↓
Clicks "Save Draft"
  ↓
System saves to content_blocks with status = 'draft'
  ↓
Clicks "Preview"
  ↓
System renders preview at lily.omdalat.com?preview=1
  ↓
Clicks "Request Publish"
  ↓
System notifies Om Dalat admin (brand.omdalat.com/admin)
  ↓
Om Dalat admin reviews + approves
  ↓
Status → 'published'
  ↓
lily.omdalat.com shows updated content
```

---

## 6. Portal Admin (Om Dalat Team)

```
brand.omdalat.com/admin          → Super admin login
brand.omdalat.com/admin/dashboard → All brands overview
brand.omdalat.com/admin/brands    → Brand list + status
brand.omdalat.com/admin/intake    → Intake queue
brand.omdalat.com/admin/approvals → Approval queue
brand.omdalat.com/admin/analytics → Brand metrics
```

### Super Admin Powers

- View ALL brands
- Approve/reject publish requests
- Manage brand_admins (add/remove)
- View audit logs for all tenants
- Emergency unpublish any brand
- Access evidence packets

---

## 7. Tenant Isolation Guarantees

### Database Level

```sql
-- EVERY query MUST include brand_id filter
SELECT * FROM content_blocks
WHERE brand_id = ? AND locale = ?
-- NEVER: SELECT * FROM content_blocks (without brand_id)
```

### API Level

```typescript
// Middleware: verifyTenantIsolation
function verifyTenantIsolation(request: Request, env: Env) {
  const host = request.headers.get('Host') || '';
  const brandSlug = extractBrandFromHost(host);
  const session = getSession(request);
  
  if (session.brand_id !== brandSlug) {
    return new Response('Forbidden', { status: 403 });
  }
}
```

### Session Level

- Session cookie scoped to subdomain (`.lily.omdalat.com`)
- Session token includes brand_id claim
- Server validates brand_id on every request

---

## 8. DNS + SSL Strategy

### Wildcard SSL

Cloudflare automatically provisions SSL for `*.omdalat.com` khi có wildcard route.

### Per-Brand DNS

| Step | Action | Who |
|------|--------|-----|
| 1 | Brand approved | Om Dalat admin |
| 2 | Create CNAME in Cloudflare | DevOps |
| 3 | Worker auto-detects subdomain | System |
| 4 | Microsite live | Auto |

### Bulk DNS Script (Future)

```bash
#!/bin/bash
# scripts/create-brand-dns.sh
BRAND=$1
# Use Cloudflare API to create CNAME
curl -X POST "https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records" \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "CNAME",
    "name": "'"$BRAND"'",
    "content": "omdalat.com",
    "ttl": 1,
    "proxied": true
  }'
```

---

## 9. Security Model

### Threat: Admin Cross-Tenant Access

**Mitigation:**
- Session token signed with brand_id
- Every DB query filtered by brand_id
- Cookie scoped to subdomain only
- Rate limiting per brand

### Threat: Brute Force Login

**Mitigation:**
- Rate limit: 5 attempts per IP per 15 min
- CAPTCHA after 3 failures
- Account lock after 10 failures (1 hour)

### Threat: Session Hijacking

**Mitigation:**
- HTTPS only
- HttpOnly, Secure, SameSite=Strict cookies
- Session expires after 24h
- Refresh token rotation

---

## 10. Definition of Done

- [ ] `*.omdalat.com` wildcard route active
- [ ] `brand_admins` table created
- [ ] `admin_sessions` table created
- [ ] Login page per brand (/admin)
- [ ] Dashboard per brand (/admin/dashboard)
- [ ] Content editor per brand (/admin/content)
- [ ] Media uploader per brand (/admin/media)
- [ ] Inquiry viewer per brand (/admin/inquiries)
- [ ] Super admin portal at brand.omdalat.com/admin
- [ ] Tenant isolation tested (brand A cannot see brand B)
- [ ] Role-based permissions working
- [ ] Session security audited
- [ ] Lily admin account created for Chú Diện
