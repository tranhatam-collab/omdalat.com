# BRAND CHARTER — Vườn Hồng 3

**Charter ID:** OMDALAT_VUONHONG3_CHARTER_2026
**Status:** APPROVED
**Founder approval:** Tran Ha Tam — 2026-06-30
**Last reviewed:** 2026-06-30

## Identity
- **Brand ID:** OMDALAT_VUONHONG3
- **Official Vietnamese name:** Vườn Hồng 3
- **Official English name:** Vuon Hong 3
- **Legal name:** Vườn Hồng 3 (operating under Tran Ha Tam sole proprietorship)
- **Canonical domain:** vuonhong3.omdalat.com
- **Approved abbreviation:** VH3
- **Forbidden names:** Vuon Hong Dalat, Vườn Hồng Đà Lạt (as a business name — may appear in descriptive copy)
- **Trademark status:** Not registered — operating as a brand name under Om Dalat ecosystem
- **Logo/content rights owner:** Tran Ha Tam

## Role
- **One-sentence role:** Vườn Hồng 3 là một thương hiệu thực địa trong hệ Ôm Đà Lạt — nơi trồng và chăm sóc hoa hồng Đà Lạt.
- **Primary user:** Người quan tâm đến hoa hồng Đà Lạt, nông nghiệp thực địa, và sản phẩm từ vườn.
- **Buyer:** Người mua sản phẩm hoặc dịch vụ từ vườn qua hệ Ôm Đà Lạt.
- **Core problem:** Muốn tiếp cận hoa hồng Đà Lạt chất lượng nhưng không biết nguồn gốc và người trồng.
- **Core value:** Một vườn hồng có traceability, gắn với con người và nơi chốn cụ thể.
- **Primary CTA:** "Tìm hiểu vườn" → liên kết qua app.
- **Lifecycle stage:** LIVE — đang phục vụ, đang hoàn thiện evidence.

## Scope
### Must do
- Hiển thị thông tin brand đã được duyệt qua publish gate.
- Render nội dung từ D1 `omdalat-core` qua brand-renderer worker.
- Tôn trọng tenant isolation (Host header only, `?slug=` → 403).

### May do
- Hiển thị sản phẩm, hình ảnh, câu chuyện vườn.
- Liên kết mềm về `omdalat.com` khi người đọc muốn tham gia hệ.

### Must not do
- Không tự xử lý giao dịch trực tiếp.
- Không hiển thị nội dung chưa qua publish gate.
- Không nhận tenant identity từ query parameter.
- Không tự set compliance fields.

## Business
- **Offer:** Hoa hồng Đà Lạt và sản phẩm từ vườn.
- **Pricing status:** Chưa niêm yết công khai.
- **Revenue model:** Bán sản phẩm và dịch vụ vườn.
- **Cost-to-serve:** Vận hành vườn, nhân công, vật tư.
- **Operating owner:** Tran Ha Tam
- **Customer evidence:** Đang thu thập.
- **Support policy:** Hỗ trợ qua `app.omdalat.com`.

## Data
- **Data collected:** Thông tin liên hệ (qua app), sở thích sản phẩm.
- **Sensitive data:** Không thu trên brand site.
- **Data owner:** Tran Ha Tam
- **Consent:** Qua `app.omdalat.com` consent center.
- **Retention:** Theo chính sách dữ liệu Ôm Đà Lạt.
- **Cross-product transfer:** Chỉ khi có consent.
- **Deletion/export:** Qua `app.omdalat.com` data rights.

## Legal
- **Operating entity:** Tran Ha Tam (sole proprietorship).
- **Trademark:** Vườn Hồng 3 — chưa đăng ký nhãn hiệu độc lập.
- **Copyright:** Nội dung thuộc Ôm Đà Lạt ecosystem.
- **Domain:** vuonhong3.omdalat.com — subdomain dưới zone omdalat.com.
- **Contracts:** Thỏa thuận qua app.
- **Permits:** Đang hoàn thiện.
- **Insurance:** Đang hoàn thiện.
- **Origin/geographic claims:** Đà Lạt, Lâm Đồng.

## Technology
- **Repository:** `workers/brand-renderer` (brand-site.ts).
- **Deployment:** Cloudflare Workers — `omdalat-brand-renderer-production`.
- **API:** `api.omdalat.com` (brand factory backend).
- **Database:** D1 `omdalat-core`.
- **Storage:** R2 `omdalat-assets`.
- **Runtime version:** Cloudflare Workers (compatibility_date 2024-12-30).
- **Monitoring:** Cloudflare dashboard + wrangler tail.
- **Rollback:** `wrangler rollback` hoặc deploy version trước.

## Status
- **Current status:** LIVE
- **Evidence:** Brand record trong D1, DNS active, Worker route active.
- **Last reviewed:** 2026-06-30
- **Reviewer:** Devin (automated audit) + Tran Ha Tam (founder approval)
- **Founder approval:** ✅ Approved 2026-06-30
