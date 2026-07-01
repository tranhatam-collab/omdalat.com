# ADR-001 — Unified Brand Factory Pipeline for All Local Brands

**ADR ID:** ADR-001
**Title:** Tam Farm và mọi thương hiệu địa phương thuộc hệ Ôm Đà Lạt phải đi qua Brand Factory Pipeline thống nhất
**Date:** 2026-07-01
**Status:** APPROVED — ARCHITECTURE LOCK
**Decision maker:** Trần Hà Tâm (Founder)
**Build authorization:** APPROVED FOR ARCHITECTURE LOCK AND TAM FARM MIGRATION PLANNING ONLY

---

## 1. Context

Hệ Ôm Đà Lạt hiện có 2 thương hiệu địa phương (L3):

| Brand | Architecture | D1 record | Publish gate | Compliance | /version |
|-------|-------------|-----------|-------------|-----------|----------|
| Lily | D1 + brand-renderer Worker | ✅ | ✅ | ✅ verified | ✅ |
| Tam Farm | Static Cloudflare Pages | ❌ | ❌ | ❌ | ❌ |

Tam Farm được build nhanh ngoài Brand Factory pipeline. Điều này tạo ra 2 nguồn sự thật, 2 cơ chế publish, 2 cách audit. Nếu nhân rộng theo pattern này, sau 10 brands sẽ có 10 chuẩn dữ liệu khác nhau.

---

## 2. Decision

### 2.1. Một nguồn sự thật

**D1 / Brand Registry** là canonical state cho mọi thương hiệu thuộc portfolio OMDALAT.

D1 sở hữu:
- Brand identity (id, slug, name_vi, name_en, subdomain, brand_type)
- Publication state (publication_status, operational_status)
- Owner + consent
- Compliance checklist
- Compliance evidence
- Approvals + audit trail
- Content blocks (hoặc reference tới content source)
- Canonical domain binding

### 2.2. Một lớp render chuẩn

**brand-renderer Worker** là production renderer mặc định cho thương hiệu địa phương.

brand-renderer sở hữu:
- Shared layout + SEO scaffolding
- Bilingual VI/EN rendering
- Status-aware rendering (holding page vs published)
- Publish gating (compliance, consent, approvals)
- /stay gate (lodging_compliance)
- True 404 handling
- Runtime /version endpoint
- Tenant isolation (Host authoritative, ?slug → 403)

### 2.3. Nội dung riêng từng thương hiệu

Mỗi brand có nội dung riêng trong:
- `content_blocks` table (D1)
- Brand settings (subdomain, locale config)
- Location data (places table)
- Articles (content_blocks với block_type='article')
- Images (R2 + media_assets)
- Programs (experiences table)

**Chuẩn hóa dữ liệu, gate, bảo mật, SEO, evidence, release — không bắt buộc cùng visual identity.**

### 2.4. Static Pages chỉ là migration source

Static Cloudflare Pages chỉ được dùng cho:
- Landing page tạm thời trước khi brand record tồn tại
- Migration source khi chuyển nội dung vào D1 + content_blocks
- Editorial layer (ap.omdalat.com) — không phải brand site

**Không có hai production sources cho cùng một brand.**

---

## 3. Tam Farm migration

### 3.1. Trạng thái hiện tại

| Trường | Giá trị |
|--------|---------|
| Brand identity | DEFINED (charter + founder lock) |
| Founder Lock | APPROVED |
| Content | SUBSTANTIALLY PREPARED (10 articles VI + 10 EN) |
| Operational evidence | INCOMPLETE |
| Compliance | NOT VERIFIED |
| Brand Registry record | MISSING |
| Production status | NOT READY |
| Architecture | Static Pages (ngoài pipeline) |

### 3.2. Trạng thái mục tiêu sau migration

| Trường | Giá trị |
|--------|---------|
| Brand Registry record | ✅ D1 brands row |
| Owner + consent | ✅ D1 owners row, consent_status=approved |
| Compliance checklist | ✅ D1 row (values: unknown → evidence-backed) |
| Content blocks | ✅ D1 content_blocks (VI + EN) |
| Renderer | ✅ brand-renderer Worker |
| /version | ✅ Runtime SHA |
| Publish gate | ✅ Code + tests |
| Publication status | draft → published (khi đủ gate) |
| Operational status | not_open → open (khi đủ compliance) |

### 3.3. Migration phases

| Phase | Mục tiêu | Output |
|-------|---------|--------|
| 0.5 | D1 record + owner + compliance + content_blocks + 404 | FOUNDATION |
| 0.6 | SEO (hreflang, schema.org, OG, Twitter) + renderer migration | CERTIFIED B |
| 0.7 | Compliance evidence (location, safety, legal) | CERTIFIED C |
| 0.8 | Runtime + ops (/version, monitoring, publish gate, smoke tests) | CERTIFIED D |

### 3.4. Trạng thái public tối đa cho phép

Sau Phase 0.5–0.6: **FOUNDATION PUBLIC**

Được phép:
- Giới thiệu Tam Farm là gì
- Tầm nhìn, bài viết, chương trình dự kiến
- Form "đăng ký quan tâm"

Không được ghi:
- "đang nhận khách"
- "địa điểm đang hoạt động"
- "đặt chỗ ngay"
- "compliance verified"
- "certified"
- "available now"

Chỉ sau Phase 0.7: **CERTIFIED OPERATIONAL** — được công bố đang hoạt động.

---

## 4. Lily reference template

Lily được dùng làm **REFERENCE_TEMPLATE_V1** sau khi đóng các exception:

1. Chuyển compliance seed thành evidence-backed API/audit process
2. Review cookie `.omdalat.com` scope (cần ADR + threat model nếu giữ)
3. Xác minh mỗi compliance field có evidence thật (đã có 4 evidence records)
4. Thêm test để brand mới không thể bypass publish gate (đã có 15 gate tests)
5. Tách rõ "technical certified" và "operational certified"

Sau khi đóng: Lily = REFERENCE_TEMPLATE_V1, có thể clone cho brand 3-10.

---

## 5. Non-waivable gates

Các gate sau KHÔNG được waive dù tổng score ≥ 90%:

| Gate | Lý do |
|------|-------|
| Founder approval | Không có founder duyệt = không tồn tại |
| Owner consent = approved | pending/revoked/null = không public |
| Legal operating basis | Không có pháp nhân = không vận hành |
| Required compliance (verified/approved/not_applicable) | unknown/pending = không nhận khách |
| True 404 | SPA fallback 200 = confusion + SEO leak |
| Publish gate in code | Không có gate = bypass |
| Security baseline (auth, CSRF, lockout) | Không có = vulnerable |
| Rollback path | Không có = không recover được |
| No overclaim | Có overclaim = vi phạm brand standard |

Nếu bất kỳ gate nào FAIL → verdict = **HOLD**, bất kể tổng điểm.

---

## 6. Three-tier public status

| Tier | Được phép | Điều kiện |
|------|----------|-----------|
| **REGISTERED** | Record nội bộ, chưa public | D1 brand record tồn tại, charter tồn tại |
| **FOUNDATION PUBLIC** | Giới thiệu thương hiệu + editorial content + "đăng ký quan tâm" | FOUNDATION 100% + owner consent approved + no operational claims |
| **CERTIFIED OPERATIONAL** | Công bố đang hoạt động, nhận đăng ký, giao dịch | CERTIFIED 100% + non-waivable gates all pass |

**Không brand nào được declare "đang hoạt động" khi chưa đạt CERTIFIED OPERATIONAL.**

---

## 7. Consequences

### Positive
- Một pipeline, một chuẩn, một cách audit
- D1 là nguồn sự thật duy nhất
- brand-renderer đảm bảo SEO, gate, isolation nhất quán
- Có thể nhân rộng 10 → 100 brands với cùng chất lượng
- Audit trail đầy đủ cho mọi brand

### Negative
- Tam Farm cần migration effort (static HTML → D1 + renderer)
- Không thể deploy brand mới nhanh bằng static Pages
- Mọi brand phải qua D1 seed + compliance pipeline

### Mitigation
- Brand Factory agent tự động hóa seed + content import
- Migration tool cho static → content_blocks
- Template charter + seed cho brand mới

---

## 8. Compliance with this ADR

- `scripts/guard-subdomain-anti-confusion.mjs` sẽ được extend để check: mọi brand có D1 record
- Local Brand Standard v1.1 sẽ reference ADR này
- Audit reports sẽ check compliance với ADR

---

## 9. References

- `docs/governance/OMDALAT_LOCAL_BRAND_STANDARD_2026.md` v1.1
- `docs/governance/brand-charters/lily-audit-2026-07-01.md`
- `docs/governance/brand-charters/tamfarms-audit-2026-07-01.md`
- `docs/governance/brand-charters/brand-audit-summary-2026-07-01.md`
- `AGENTS.md` — publish gate, compliance rules

---

## 10. Founder sign-off

**FOUNDER DECISION — LOCAL BRAND ARCHITECTURE**

Phê duyệt sử dụng một kiến trúc thống nhất cho tất cả thương hiệu địa phương thuộc hệ Ôm Đà Lạt.

1. Mọi thương hiệu phải có canonical record trong Brand Registry/D1.
2. Brand Charter, owner consent, compliance, evidence, approvals và publication state phải được quản lý trong cùng pipeline.
3. brand-renderer là lớp render production mặc định cho thương hiệu địa phương.
4. Static Pages chỉ được sử dụng làm nguồn nội dung tạm thời hoặc migration source, không được trở thành nguồn trạng thái quản trị song song.
5. Tam Farm phải được migrate vào Brand Factory pipeline trước khi công bố đang hoạt động.
6. Lily được dùng làm reference implementation sau khi đóng các exception liên quan compliance provenance và cookie scope.
7. Không mở rộng brand số 3–10 trước khi Tam Farm đạt FOUNDATION và ít nhất một brand đạt CERTIFIED không có non-waivable exception.
8. Owner consent ở trạng thái pending không được tính PASS.
9. Compliance unknown không cho phép nhận đăng ký lưu trú hoặc công bố hoạt động.
10. Không sử dụng tỷ lệ tổng để bỏ qua một gate pháp lý, bảo mật hoặc quyền sở hữu bị FAIL.

**Build authorization: APPROVED FOR ARCHITECTURE LOCK AND TAM FARM MIGRATION PLANNING ONLY.**

**Founder:** Trần Hà Tâm
**Date:** 2026-07-01
