# OMDALAT LOCAL BRAND STANDARD 2026

**Document ID:** OMDALAT_LOCAL_BRAND_STANDARD_2026
**Version:** 1.0
**Date:** 2026-07-01
**Author:** Devin (synthesis from existing charters, founder locks, AGENTS.md, QA audits)
**Purpose:** Định nghĩa bộ chuẩn thống nhất để audit và nhân rộng thương hiệu địa phương trong hệ Ôm Đà Lạt.

---

## 0. Mục đích và nguyên tắc

### 0.1. Tại sao cần bộ chuẩn

Trước khi nhân rộng từ 2 → 10 → 100 brands, cần một **bộ chuẩn ròi** để:
- Mỗi brand đạt chuẩn trước khi public là "đang hoạt động"
- Không brand nào claim hơn thực tế (overclaim)
- Không brand nào thiếu evidence pháp lý khi claim compliance
- Pipeline Brand Factory có thể nhân bản với cùng chất lượng

### 0.2. Hai mức chuẩn

| Mức | Ý nghĩa | Khi nào cần |
|-----|---------|-------------|
| **FOUNDATION** | Minimum để brand site tồn tại và phục vụ | Trước khi public URL |
| **CERTIFIED** | Đủ để nhân rộng, claim "đang hoạt động", đưa vào marketplace | Trước khi scale hoặc declare operational |

**Quy tắc:** FOUNDATION là điều kiện cần. CERTIFIED là điều kiện đủ. Không brand nào được declare "đang hoạt động" khi chưa đạt CERTIFIED.

### 0.3. Bốn nhóm kiểm tra

| Nhóm | Phạm vi |
|------|---------|
| **A. Identity & Legal** | Tên, domain, charter, founder approval, legal entity, trademark, forbidden names |
| **B. Content & SEO** | Bilingual VI/EN, meta tags, canonical, hreflang, sitemap, schema.org, OG, no overclaim, no placeholder |
| **C. Compliance & Evidence** | business_registration, lodging_compliance, pccc — phải có evidence thật |
| **D. Tech & Ops** | DNS, TLS, Worker/Pages, runtime SHA, monitoring, rollback, 404, publish gate |

---

## A. Identity & Legal

### A. FOUNDATION (bắt buộc để tồn tại)

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| A.F.1 | Brand Charter tồn tại | `docs/governance/brand-charters/{slug}-charter.md` | File tồn tại, không placeholder |
| A.F.2 | Brand ID duy nhất | Charter + D1 `brands.id` (hoặc static site ID) | Không trùng với brand khác |
| A.F.3 | Tên VI chính thức | Charter §Identity | Có, không trùng brand khác |
| A.F.4 | Tên EN chính thức | Charter §Identity | Có, là adaptation không phải dịch máy |
| A.F.5 | Canonical domain | Charter + DNS | `{slug}.omdalat.com` resolve được |
| A.F.6 | Forbidden names liệt kê | Charter §Identity | Có danh sách tên cấm |
| A.F.7 | Founder approval | Charter §Status | Có chữ ký/ngày founder duyệt |
| A.F.8 | Role 1 câu rõ ràng | Charter §Role | Không mơ hồ, không trùng brand khác |

### A. CERTIFIED (bắt buộc để nhân rộng)

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| A.C.1 | Legal entity xác định | Charter §Legal | Có tên pháp nhân hoặc sole proprietorship |
| A.C.2 | Operating owner xác định | Charter §Business | Có tên người vận hành |
| A.C.3 | Trademark status ghi rõ | Charter §Legal | "Registered" hoặc "Not registered — operating under..." |
| A.C.4 | Logo/content rights owner | Charter §Identity | Có tên người sở hữu |
| A.C.5 | Scope Must/May/Must-not đầy đủ | Charter §Scope | 3 section đều có nội dung cụ thể |
| A.C.6 | "What it is NOT" table | Charter (optional nhưng recommended) | Liệt kê những gì brand không phải |
| A.C.7 | Go-live conditions liệt kê | Founder Lock hoặc Charter | Có danh sách điều kiện go-live |
| A.C.8 | Ecosystem relationship | Charter | Có bảng quan hệ với omdalat.com, app, ap, các brand khác |

---

## B. Content & SEO

### B. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| B.F.1 | Bilingual VI/EN | curl homepage VI + EN | Cả 2 locale có nội dung đầy đủ |
| B.F.2 | `<title>` unique per page | curl mỗi page | Không trùng, có brand name |
| B.F.3 | `<meta description>` | curl mỗi page | Có, < 160 ký tự, không trùng |
| B.F.4 | `<link rel="canonical">` | curl mỗi page | Có, URL đúng, không trailing slash sai |
| B.F.5 | `<meta name="robots">` | curl mỗi page | `index,follow` cho public pages |
| B.F.6 | `robots.txt` | curl `/robots.txt` | Có, Allow hoặc disallow rõ ràng |
| B.F.7 | `sitemap.xml` | curl `/sitemap.xml` | Có, > 0 URLs, URLs đúng |
| B.F.8 | No overclaim | `validateBrandCopy()` hoặc grep | 0 forbidden terms trong content text |
| B.F.9 | No placeholder content | grep `coming soon\|đang xây dựng\|lorem ipsum\|TBD\|TODO` | 0 match trong visible content |
| B.F.10 | No "minh họa" images | grep `minh họa\|illustrative` | 0 match, hoặc có `image_pending` flag |

### B. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| B.C.1 | `<link rel="alternate" hreflang>` | curl VI + EN page | Có hreflang en + x-default (và vi nếu EN page) |
| B.C.2 | Schema.org JSON-LD | curl mỗi page type | Có `application/ld+json` (Organization, Article, BreadcrumbList) |
| B.C.3 | OG tags | curl homepage | og:type, og:title, og:description, og:url, og:image |
| B.C.4 | Twitter Card tags | curl homepage | twitter:card, twitter:title, twitter:description, twitter:image |
| B.C.5 | Real images (not SVG placeholder) | curl OG image, check content-type | JPG/PNG/WebP, không phải SVG placeholder |
| B.C.6 | Content qua publish gate | D1 `content_blocks` + `approvals` | Content approved, images approved |
| B.C.7 | Article pages có full content | curl mỗi article | Không placeholder, có body text > 500 từ |
| B.C.8 | Language switcher hoạt động | curl JS hoặc manual | Toggle VI↔EN trên mọi page |

---

## C. Compliance & Evidence

### C. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| C.F.1 | Compliance row tồn tại | D1 `compliance_checklists WHERE brand_id=?` | Row tồn tại (kể cả `unknown`) |
| C.F.2 | Owner consent recorded | D1 `owners.consent_status` | `approved` hoặc `pending` (không NULL) |

### C. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| C.C.1 | `business_registration` = verified/approved/not_applicable | D1 query | Giá trị trong OK set |
| C.C.2 | `lodging_compliance` = verified/approved/not_applicable | D1 query | Giá trị trong OK set (nếu can_host_stay=1) |
| C.C.3 | `pccc` = verified/approved/not_applicable | D1 query | Giá trị trong OK set |
| C.C.4 | Evidence row cho mỗi compliance field | D1 `compliance_evidence WHERE brand_id=?` | Mỗi field có evidence: reference_number, issuing_authority, issue_date |
| C.C.5 | Evidence có reference number | D1 query | Không NULL, không placeholder |
| C.C.6 | Evidence có issuing authority | D1 query | Không NULL, tên cơ quan cấp |
| C.C.7 | Evidence có issue date | D1 query | Không NULL, ngày cụ thể |
| C.C.8 | Compliance set qua API route (không manual SQL) | `audit_logs` hoặc `lily_audit_events` | Có audit trail, không phải direct UPDATE |
| C.C.9 | Publish gate pass | D1 `brands` + `approvals` | owner_consent + content_approved + images_approved + compliance_reviewed + qa_passed |

---

## D. Tech & Ops

### D. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| D.F.1 | DNS resolve | `dig {slug}.omdalat.com` | A/AAAA record, proxied |
| D.F.2 | TLS hoạt động | `curl https://{slug}.omdalat.com/` | HTTP 200, không cert error |
| D.F.3 | HTTP 200 trên homepage | curl GET `/` | 200, không 500/404/302 loop |
| D.F.4 | 404 thật cho page không tồn tại | curl `/nonexistent-page` | 404, không 200 hoặc 500 |
| D.F.5 | Worker route hoặc Pages project | Cloudflare API | Route hoặc project tồn tại, serve đúng content |

### D. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| D.C.1 | Runtime SHA expose | curl `/version` | Trả `build_commit_sha`, prod == repo HEAD |
| D.C.2 | Monitoring | Cloudflare dashboard + `wrangler tail` | Có cách xem logs |
| D.C.3 | Rollback path | `wrangler rollback` hoặc Pages history | Có version trước để rollback |
| D.C.4 | Tenant isolation | curl `?slug=other-brand` | 403 hoặc ignore, không leak |
| D.C.5 | Publish gate trong code | `brand-publish.ts` + `brand-site.ts` | Gate logic present, tests pass |
| D.C.6 | /stay gate (nếu can_host_stay=1) | curl `/stay` khi compliance=unknown | 404 |
| D.C.7 | Anti-confusion guard pass | `node scripts/guard-subdomain-anti-confusion.mjs` | PASS |
| D.C.8 | SQL compliance guard pass | `node scripts/guard-sql-compliance-bypass.mjs` | PASS |
| D.C.9 | Tests pass | `npx vitest run` (api + brand-renderer) | 100% pass |
| D.C.10 | D1 record tồn tại (cho brand-renderer tenants) | D1 `brands WHERE slug=?` | Row tồn tại, publication_status đúng |
| D.C.11 | Cookie scope đúng | `Set-Cookie` header | HttpOnly, Secure, SameSite=Strict |

---

## Scoring

### Tính điểm

```
FOUNDATION pass rate = (số item FOUNDATION pass) / (tổng item FOUNDATION)
CERTIFIED pass rate = (số item CERTIFIED pass) / (tổng item CERTIFIED)
```

### Verdict

| Trạng thái | Điều kiện |
|-----------|-----------|
| **NOT READY** | FOUNDATION < 100% |
| **FOUNDATION READY** | FOUNDATION = 100%, CERTIFIED < 100% |
| **CERTIFIED** | FOUNDATION = 100% AND CERTIFIED = 100% |
| **CERTIFIED WITH EXCEPTIONS** | FOUNDATION = 100%, CERTIFIED ≥ 90%, exceptions documented + approved |

### Quy tắc nhân rộng

- Chỉ brand đạt **CERTIFIED** mới được dùng làm template cho brand mới
- Brand đạt **FOUNDATION READY** có thể public URL nhưng không declare "đang hoạt động"
- Brand **NOT READY** không được public

---

## Audit process

1. Chạy tất cả checks trong 4 nhóm (A, B, C, D)
2. Ghi kết quả vào `docs/governance/brand-charters/{slug}-audit-{date}.md`
3. Mỗi item: PASS / FAIL / N/A (với evidence)
4. Tính score, ghi verdict
5. Liệt kê gap cần đóng nếu chưa CERTIFIED
6. Founder review + sign-off

---

## References

- `docs/governance/OMDALAT_BRAND_CHARTER_TEMPLATE_2026.md` — charter template
- `docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md` §15 — 18 go-live conditions (Tam Farm)
- `AGENTS.md` — publish gate, compliance rules, evidence requirements
- `docs/governance/OMDALAT_SUBDOMAIN_RESPONSIBILITY_LOCK_2026.md` — subdomain roles
- `docs/QA_AUDIT_LILY_V2_POST_REMEDIATION_2026-06-30.md` — Lily V2 audit

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-01 | Initial — synthesized from charter template, founder lock, AGENTS.md, QA audits |
