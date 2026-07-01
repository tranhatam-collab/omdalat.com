# OMDALAT LOCAL BRAND STANDARD 2026

**Document ID:** OMDALAT_LOCAL_BRAND_STANDARD_2026
**Version:** 1.1
**Date:** 2026-07-01
**Author:** Devin (synthesis from existing charters, founder locks, AGENTS.md, QA audits, ADR-001)
**Purpose:** Định nghĩa bộ chuẩn thống nhất để audit và nhân rộng thương hiệu địa phương trong hệ Ôm Đà Lạt.
**Architecture lock:** `docs/adr/ADR_TAMFARM_UNIFIED_BRAND_PIPELINE_2026.md` (ADR-001)

---

## 0. Mục đích và nguyên tắc

### 0.1. Tại sao cần bộ chuẩn

Trước khi nhân rộng từ 2 → 10 → 100 brands, cần một **bộ chuẩn ròi** để:
- Mỗi brand đạt chuẩn trước khi public là "đang hoạt động"
- Không brand nào claim hơn thực tế (overclaim)
- Không brand nào thiếu evidence pháp lý khi claim compliance
- Pipeline Brand Factory có thể nhân bản với cùng chất lượng

### 0.2. Một nguồn sự thật (ADR-001)

**D1 / Brand Registry** là canonical state cho mọi thương hiệu thuộc portfolio OMDALAT.

- Mọi thương hiệu **phải** có canonical brand record trong D1
- **brand-renderer Worker** là production renderer mặc định
- Static Pages chỉ là migration source, không phải production source
- Không có hai production sources cho cùng một brand

### 0.3. Ba lớp trạng thái public

| Tier | Được phép | Điều kiện |
|------|----------|-----------|
| **REGISTERED** | Record nội bộ, chưa public URL | D1 brand record tồn tại, charter tồn tại, founder approval |
| **FOUNDATION PUBLIC** | Giới thiệu thương hiệu + editorial content + "đăng ký quan tâm" form | FOUNDATION 100% + owner consent `approved` + no operational claims |
| **CERTIFIED OPERATIONAL** | Công bố đang hoạt động, nhận đăng ký lưu trú, giao dịch | CERTIFIED 100% + non-waivable gates all pass |

**Quy tắc:**
- FOUNDATION PUBLIC không được ghi "đang nhận khách", "địa điểm đang hoạt động", "đặt chỗ ngay", "compliance verified", "certified", "available now"
- Chỉ CERTIFIED OPERATIONAL được declare "đang hoạt động"
- Owner consent `pending` → không public (chỉ REGISTERED)
- Compliance `unknown` → không nhận đăng ký lưu trú, không công bố hoạt động

### 0.4. Bốn nhóm kiểm tra

| Nhóm | Phạm vi |
|------|---------|
| **A. Identity & Legal** | Tên, domain, charter, founder approval, legal entity, trademark, forbidden names |
| **B. Content & SEO** | Bilingual VI/EN, meta tags, canonical, hreflang, sitemap, schema.org, OG, no overclaim, no placeholder |
| **C. Compliance & Evidence** | business_registration, lodging_compliance, pccc — phải có evidence thật |
| **D. Tech & Ops** | DNS, TLS, Worker route, runtime SHA, monitoring, rollback, 404, publish gate |

---

## A. Identity & Legal

### A. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| A.F.1 | Brand Charter tồn tại | `docs/governance/brand-charters/{slug}-charter.md` | File tồn tại, không placeholder |
| A.F.2 | Brand ID duy nhất trong D1 | D1 `brands.id` | **Bắt buộc D1 record** — không chấp nhận "static site ID" |
| A.F.3 | Tên VI chính thức | Charter §Identity + D1 `name_vi` | Có, không trùng brand khác |
| A.F.4 | Tên EN chính thức | Charter §Identity + D1 `name_en` | Có, là adaptation không phải dịch máy |
| A.F.5 | Canonical domain | Charter + DNS + D1 `subdomain` | `{slug}.omdalat.com` resolve được |
| A.F.6 | Forbidden names liệt kê | Charter §Identity | Có danh sách tên cấm |
| A.F.7 | Founder approval | Charter §Status | Có chữ ký/ngày founder duyệt |
| A.F.8 | Role 1 câu rõ ràng | Charter §Role | Không mơ hồ, không trùng brand khác |

### A. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| A.C.1 | Legal entity xác định | Charter §Legal | Có tên pháp nhân hoặc sole proprietorship |
| A.C.2 | Operating owner xác định | Charter §Business + D1 `owners` | Có tên người vận hành + D1 owner record |
| A.C.3 | Trademark status ghi rõ | Charter §Legal | "Registered" hoặc "Not registered — operating under..." |
| A.C.4 | Logo/content rights owner | Charter §Identity | Có tên người sở hữu |
| A.C.5 | Scope Must/May/Must-not đầy đủ | Charter §Scope | 3 section đều có nội dung cụ thể |
| A.C.6 | "What it is NOT" table | Charter | Liệt kê những gì brand không phải |
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
| B.F.4 | `<link rel="canonical">` | curl mỗi page | Có, URL đúng, self-canonical |
| B.F.5 | `<meta name="robots">` | curl mỗi page | `index,follow` cho public pages |
| B.F.6 | `robots.txt` | curl `/robots.txt` | Có, Allow hoặc disallow rõ ràng |
| B.F.7 | `sitemap.xml` | curl `/sitemap.xml` | Có, > 0 URLs, URLs đúng |
| B.F.8 | No overclaim | `validateBrandCopy()` hoặc grep | 0 forbidden terms trong content text |
| B.F.9 | No placeholder content | grep `coming soon\|đang xây dựng\|lorem ipsum\|TBD\|TODO` | 0 match trong visible content |
| B.F.10 | No "minh họa" images | grep `minh họa\|illustrative` | 0 match, hoặc có `image_pending` flag |

### B. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| B.C.1 | `<link rel="alternate" hreflang>` | curl VI + EN page | Có hreflang en + vi + x-default |
| B.C.2 | Schema.org JSON-LD | curl mỗi page type | Có `application/ld+json` (Organization, WebSite, Article, BreadcrumbList) |
| B.C.3 | OG tags complete | curl homepage | og:type, og:title, og:description, og:url, og:image, og:locale |
| B.C.4 | Twitter Card tags | curl homepage | twitter:card, twitter:title, twitter:description, twitter:image |
| B.C.5 | Real OG image (not SVG) | curl OG image, check content-type | JPG/PNG/WebP, 1200×630, không phải SVG placeholder |
| B.C.6 | Content qua publish gate | D1 `content_blocks` + `approvals` | Content approved, images approved, qua overclaim validator |
| B.C.7 | Article pages có full content | curl mỗi article | Không placeholder, có body text > 500 từ |
| B.C.8 | Language switcher hoạt động | curl JS hoặc manual | Toggle VI↔EN trên mọi page |
| B.C.9 | Localized 404 page | curl `/nonexistent` | 404 status code + page có brand identity + bilingual |

---

## C. Compliance & Evidence

### C. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| C.F.1 | Compliance row tồn tại trong D1 | D1 `compliance_checklists WHERE brand_id=?` | Row tồn tại |
| C.F.2 | Owner consent = `approved` | D1 `owners.consent_status` | **`approved` ONLY** — `pending`/`revoked`/`null` = FAIL |

**Lưu ý:** Compliance values có thể là `unknown` ở FOUNDATION, nhưng brand chỉ được FOUNDATION PUBLIC (editorial only), không được CERTIFIED OPERATIONAL.

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
| C.C.10 | Location rights verified | D1 `places` + evidence | Quyền sử dụng địa điểm được xác minh |
| C.C.11 | Safety SOP tồn tại | Charter hoặc ops doc | Có SOP an toàn + emergency contact |

---

## D. Tech & Ops

### D. FOUNDATION

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| D.F.1 | DNS resolve | `dig {slug}.omdalat.com` | A/AAAA record, proxied |
| D.F.2 | TLS hoạt động | `curl https://{slug}.omdalat.com/` | HTTP 200, không cert error |
| D.F.3 | HTTP 200 trên homepage | curl GET `/` | 200, không 500/404/302 loop |
| D.F.4 | True 404 cho page không tồn tại | curl `/nonexistent-page` | **404 status code** — không 200 (SPA fallback = FAIL) |
| D.F.5 | brand-renderer Worker route | Cloudflare API | Route tồn tại, serve đúng content (per ADR-001) |

### D. CERTIFIED

| ID | Tiêu chí | Cách verify | Pass condition |
|----|----------|-------------|----------------|
| D.C.1 | Runtime SHA expose | curl `/version` | Trả JSON `build_commit_sha`, prod == repo HEAD |
| D.C.2 | Monitoring | Cloudflare dashboard + `wrangler tail` | Có cách xem logs |
| D.C.3 | Rollback path | `wrangler rollback` hoặc Pages history | Có version trước để rollback |
| D.C.4 | Tenant isolation | curl `?slug=other-brand` | 403 hoặc ignore, không leak |
| D.C.5 | Publish gate trong code | `brand-publish.ts` + `brand-site.ts` | Gate logic present, tests pass |
| D.C.6 | /stay gate (nếu can_host_stay=1) | curl `/stay` khi compliance=unknown | 404 |
| D.C.7 | Anti-confusion guard pass | `node scripts/guard-subdomain-anti-confusion.mjs` | PASS |
| D.C.8 | SQL compliance guard pass | `node scripts/guard-sql-compliance-bypass.mjs` | PASS |
| D.C.9 | Tests pass | `npx vitest run` (api + brand-renderer) | 100% pass |
| D.C.10 | D1 brand record | D1 `brands WHERE slug=?` | Row tồn tại, publication_status + operational_status đúng |
| D.C.11 | Cookie scope | `Set-Cookie` header | **Host-only cookie per subdomain** (mặc định). Shared scope `.omdalat.com` chỉ chấp nhận khi có ADR + threat model + CSRF protection + rotation + revocation + security signoff |
| D.C.12 | Security baseline | Auth + CSRF + lockout + MFA | PBKDF2 password, CSRF cho cookie POST, login lockout, MFA TOTP |

---

## Non-waivable gates

Các gate sau KHÔNG được waive dù tổng score ≥ 90%. Nếu bất kỳ FAIL → verdict = **HOLD**.

| Gate | ID | Lý do |
|------|----|--------|
| Founder approval | A.F.7 | Không có founder duyệt = không tồn tại |
| Owner consent = approved | C.F.2 | pending/revoked/null = không public |
| Legal operating basis | A.C.1 | Không có pháp nhân = không vận hành |
| Required compliance | C.C.1-3 | unknown/pending = không nhận khách |
| True 404 | D.F.4 | SPA fallback 200 = confusion + SEO leak |
| Publish gate in code | D.C.5 | Không có gate = bypass |
| Security baseline | D.C.12 | Không có = vulnerable |
| Rollback path | D.C.3 | Không có = không recover được |
| No overclaim | B.F.8 | Có overclaim = vi phạm brand standard |
| D1 brand record | A.F.2 | Không có = không có nguồn sự thật (ADR-001) |
| brand-renderer route | D.F.5 | Không có = ngoài pipeline (ADR-001) |

---

## Scoring

### Tính điểm

```
FOUNDATION pass rate = (số item FOUNDATION pass) / (tổng item FOUNDATION)
CERTIFIED pass rate = (số item CERTIFIED pass) / (tổng item CERTIFIED)
Non-waivable gates = ALL must pass
```

### Verdict

| Trạng thái | Điều kiện |
|-----------|-----------|
| **HOLD** | Bất kỳ non-waivable gate nào FAIL |
| **REGISTERED** | D1 record + charter + founder approval (chưa public) |
| **FOUNDATION PUBLIC** | FOUNDATION 100% + non-waivable FOUNDATION gates pass + owner consent approved |
| **CERTIFIED OPERATIONAL** | FOUNDATION 100% + CERTIFIED 100% + ALL non-waivable gates pass |

**Không còn "CERTIFIED WITH EXCEPTIONS".** Nếu non-waivable gate FAIL → HOLD, bất kể tổng điểm.

---

## Audit process

1. Chạy tất cả checks trong 4 nhóm (A, B, C, D)
2. Kiểm tra non-waivable gates trước — nếu FAIL → HOLD, không cần kiểm tra tiếp
3. Ghi kết quả vào `docs/governance/brand-charters/{slug}-audit-{date}.md`
4. Mỗi item: PASS / FAIL / N/A (với evidence)
5. Tính score, ghi verdict theo 3-tier model
6. Liệt kê gap cần đóng
7. Founder review + sign-off

---

## References

- `docs/adr/ADR_TAMFARM_UNIFIED_BRAND_PIPELINE_2026.md` — architecture lock
- `docs/governance/OMDALAT_BRAND_CHARTER_TEMPLATE_2026.md` — charter template
- `docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md` §15 — 18 go-live conditions
- `AGENTS.md` — publish gate, compliance rules, evidence requirements
- `docs/governance/OMDALAT_SUBDOMAIN_RESPONSIBILITY_LOCK_2026.md` — subdomain roles

---

## Version history

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-01 | Initial — 2-tier (FOUNDATION + CERTIFIED), 4 nhóm |
| 1.1 | 2026-07-01 | Founder review corrections: (1) owner consent pending = FAIL, (2) D1 record bắt buộc (no static site ID), (3) compliance unknown = không operational, (4) 3-tier public status (REGISTERED/FOUNDATION PUBLIC/CERTIFIED OPERATIONAL), (5) cookie scope host-only mặc định, (6) non-waivable gates — không waive dù ≥90%. Reference ADR-001. |
