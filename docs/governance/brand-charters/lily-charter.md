# BRAND CHARTER — Lily

**Charter ID:** OMDALAT_LILY_CHARTER_2026
**Status:** APPROVED
**Founder approval:** Tran Ha Tam — 2026-06-30
**Last reviewed:** 2026-06-30

## Identity
- **Brand ID:** OMDALAT_LILY
- **Official Vietnamese name:** Lily
- **Official English name:** Lily
- **Legal name:** Lily (residency program — operating under Tran Ha Tam sole proprietorship)
- **Canonical domain:** lily.omdalat.com
- **Approved abbreviation:** Lily
- **Forbidden names:** Lily Dalat, Lily Hotel, Lily Resort, Lily Đà Lạt (as a business name — "Lily Đà Lạt" may appear in descriptive copy only)
- **Trademark status:** Not registered — operating as a program name under Om Dalat ecosystem
- **Logo/content rights owner:** Tran Ha Tam

## Role
- **One-sentence role:** Lily là nơi ở lại và sinh hoạt thực địa tại Đà Lạt — residency, không phải khách sạn.
- **Primary user:** Người muốn ở lại Đà Lạt đủ lâu để hiểu nhịp sống, không phải du khách ngắn ngày.
- **Buyer:** Người đăng ký residency qua Ôm Đà Lạt App.
- **Core problem:** Muốn ở lại Đà Lạt nhưng không biết bắt đầu từ đâu, ở đâu, và làm sao để không bị lạc lõng.
- **Core value:** Một nơi ở có cấu trúc nhẹ, an toàn, và kết nối được với hệ sinh thái Ôm Đà Lạt.
- **Primary CTA:** "Xem residency" → đăng ký qua app.
- **Lifecycle stage:** LIVE — đang phục vụ, đang thu thập evidence.

## Scope
### Must do
- Hiển thị thông tin residency đã được duyệt (compliance, consent, images).
- Render nội dung từ D1 `omdalat-core` qua brand-renderer worker.
- Tôn trọng publish gate (owner_consent, content_approved, images_approved, compliance_reviewed, qa_passed).

### May do
- Hiển thị chương trình, bài viết, hình ảnh thực địa.
- Liên kết mềm về `omdalat.com` khi người đọc muốn tham gia hệ.

### Must not do
- Không tự xử lý booking hoặc thanh toán trực tiếp.
- Không hiển thị nội dung chưa qua publish gate.
- Không nhận tenant identity từ query parameter (`?slug=` → 403).
- Không tự set compliance fields (phải qua API audit route).

## Business
- **Offer:** Residency placement (ở lại ngắn/dài hạn tại Đà Lạt).
- **Pricing status:** Chưa niêm yết công khai — tư vấn qua app.
- **Revenue model:** Phí residency (cấu trúc đang hoàn thiện).
- **Cost-to-serve:** Phòng ở, vận hành, hỗ trợ thực địa.
- **Operating owner:** Tran Ha Tam
- **Customer evidence:** Compliance evidence đã audit (business_registration, lodging_compliance, pccc).
- **Support policy:** Hỗ trợ qua `app.omdalat.com` và email trực tiếp.

## Data
- **Data collected:** Thông tin đăng ký residency (qua app), sở thích ở lại, thời gian dự kiến.
- **Sensitive data:** CCCD/ID (cho compliance lodging), không lưu trên brand site.
- **Data owner:** Tran Ha Tam
- **Consent:** Qua `app.omdalat.com` consent center.
- **Retention:** Theo chính sách dữ liệu Ôm Đà Lạt.
- **Cross-product transfer:** Chỉ chuyển sang `market.omdalat.com` khi có consent và khi brand được niêm yết.
- **Deletion/export:** Qua `app.omdalat.com` data rights.

## Legal
- **Operating entity:** Tran Ha Tam (sole proprietorship).
- **Trademark:** Lily — chưa đăng ký nhãn hiệu độc lập.
- **Copyright:** Nội dung thuộc Ôm Đà Lạt ecosystem.
- **Domain:** lily.omdalat.com — subdomain dưới zone omdalat.com.
- **Contracts:** Thỏa thuận residency ký qua app.
- **Permits:** lodging_compliance = verified (GCN 62/GCN — Công an huyện Lạc Dương, NĐ 96/2016).
- **Insurance:** Đang hoàn thiện.
- **Origin/geographic claims:** Đà Lạt, Lạc Dương, Lâm Đồng.

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
- **Evidence:** Compliance evidence (business_registration: 42C8002522, lodging_compliance: 62/GCN, pccc: BBKT-17022022).
- **Last reviewed:** 2026-06-30
- **Reviewer:** Devin (automated audit) + Tran Ha Tam (founder approval)
- **Founder approval:** ✅ Approved 2026-06-30
