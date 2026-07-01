# BRAND CHARTER — Lily

**Charter ID:** OMDALAT_LILY_CHARTER_2026
**Status:** APPROVED — REFERENCE LOCATION 01
**Charter type:** Reference Location (not a chain model)
**Parent model:** Tam Farms (Những Khu Vườn Tâm)
**Architecture:** ADR-003 — Tam Farms = Chain Model, Lily = Reference Location
**Founder approval:** Tran Ha Tam — 2026-06-30 (corrected 2026-07-01)
**Last reviewed:** 2026-07-01

---

## Identity

- **Brand ID:** OMDALAT_LILY
- **Official Vietnamese name:** Lily
- **Official English name:** Lily
- **Designation:** LILY — ĐỊA ĐIỂM MẪU THUỘC HỆ NHỮNG KHU VƯỜN TÂM / A TAM FARMS REFERENCE LOCATION
- **Legal entity:** CÔNG TY TNHH SX-TM-DV THÁI LÂM
  - MST: 5801443073
  - Địa chỉ: 42 Cao Bá Quát, Phường Lang Biang, Đà Lạt, Lâm Đồng
  - Người đại diện: TRẦN NGUYỄN HẠ THI
  - Trạng thái: Đang hoạt động
- **Canonical domain:** lily.omdalat.com
- **Approved abbreviation:** Lily
- **Forbidden names:** Lily Dalat, Lily Hotel, Lily Resort, Lily Đà Lạt (as a business name — "Lily Đà Lạt" may appear in descriptive copy only)
- **Trademark status:** Operating under CÔNG TY TNHH SX-TM-DV THÁI LÂM — not independently registered
- **Logo/content rights owner:** CÔNG TY TNHH SX-TM-DV THÁI LÂM / Trần Hà Tâm

---

## Role

- **One-sentence role:** Lily là địa điểm thực tế đầu tiên dùng để demo, kiểm chứng và hoàn thiện mô hình Tam Farms — nơi người dùng có thể sống, làm việc, học tập, trải nghiệm khu vườn, tham gia chương trình, phát triển project và làm việc cùng chuyên gia.
- **Parent model:** Tam Farms (Những Khu Vườn Tâm)
- **Designation:** REFERENCE LOCATION 01
- **Purpose:** DEMONSTRATE AND VALIDATE TAM FARMS MODEL
- **Replication rights:** DOES NOT OWN — Lily does not own the right to replicate the Tam Farms model
- **Primary user:** Người muốn ở lại Đà Lạt đủ lâu để hiểu nhịp sống, tham gia mô hình Tam Farms
- **Core problem:** Muốn trải nghiệm mô hình Tam Farms nhưng cần một địa điểm thực tế để kiểm chứng
- **Core value:** Một nơi ở có cấu trúc nhẹ, an toàn, kết nối hệ sinh thái Ôm Đà Lạt, và là nơi trình diễn mô hình Tam Farms
- **Lifecycle stage:** LIVE — đang phục vụ, đang thu thập evidence, đang kiểm chứng mô hình

---

## What Lily owns

- Địa chỉ và không gian cụ thể
- Phòng ở, bếp, khu làm việc, khu học tập, khu vườn
- Cây trái và dược liệu
- Lịch hoạt động, sức chứa, điều kiện tiếp nhận
- Nội quy, an toàn, trải nghiệm tại chỗ
- Đội vận hành địa điểm
- Dữ liệu vận hành của Lily

## What Lily does NOT own

- Toàn bộ phương pháp Tam Farms
- Quyền cấp phép Tam Farms
- Toàn bộ mạng lưới chuyên gia
- Toàn bộ danh mục địa điểm
- Chiến lược cổ phần chuỗi
- Tiêu chuẩn nhân bản toàn hệ
- Thương hiệu tổng Tam Farms

---

## Scope

### Must do
- Hiển thị thông tin residency đã được duyệt (compliance, consent, images)
- Render nội dung từ D1 `omdalat-core` qua brand-renderer worker
- Tôn trọng publish gate (owner_consent, content_approved, images_approved, compliance_reviewed, qa_passed)
- Hiển thị nhãn "A TAM FARMS REFERENCE LOCATION" / "ĐỊA ĐIỂM MẪU THUỘC HỆ NHỮNG KHU VƯỜN TÂM"
- Triển khai và kiểm chứng các chương trình Tam Farms

### May do
- Hiển thị chương trình, bài viết, hình ảnh thực địa
- Liên kết mềm về `tamfarms.omdalat.com` khi người đọc muốn hiểu mô hình tổng
- Liên kết mềm về `omdalat.com` khi người đọc muốn tham gia hệ

### Must not do
- Không tự xử lý booking hoặc thanh toán trực tiếp
- Không hiển thị nội dung chưa qua publish gate
- Không nhận tenant identity từ query parameter (`?slug=` → 403)
- Không tự set compliance fields (phải qua API audit route)
- Không tự claim là đại diện cho toàn bộ Tam Farms
- Không tự cấp phép địa điểm mới (đó là quyền của Tam Farms model)

---

## Business

- **Offer:** Residency placement (ở lại ngắn/dài hạn tại Đà Lạt) + trải nghiệm mô hình Tam Farms
- **Pricing status:** Chưa niêm yết công khai — tư vấn qua app
- **Revenue model:** Phí residency (cấu trúc đang hoàn thiện) + program fees
- **Cost-to-serve:** Phòng ở, vận hành, hỗ trợ thực địa
- **Operating owner:** CÔNG TY TNHH SX-TM-DV THÁI LÂM / Trần Hà Tâm
- **Customer evidence:** Compliance evidence đã audit (business_registration, lodging_compliance, pccc)
- **Support policy:** Hỗ trợ qua `app.omdalat.com` và email trực tiếp

---

## Data

- **Data collected:** Thông tin đăng ký residency (qua app), sở thích ở lại, thời gian dự kiến
- **Sensitive data:** CCCD/ID (cho compliance lodging), không lưu trên brand site
- **Data owner:** CÔNG TY TNHH SX-TM-DV THÁI LÂM
- **Consent:** Qua `app.omdalat.com` consent center
- **Retention:** Theo chính sách dữ liệu Ôm Đà Lạt
- **Cross-product transfer:** Chỉ chuyển sang `market.omdalat.com` khi có consent và khi brand được niêm yết
- **Deletion/export:** Qua `app.omdalat.com` data rights

---

## Legal

- **Operating entity:** CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073)
- **Trademark:** Lily — operating under Thái Lam company, not independently registered
- **Copyright:** Nội dung thuộc Ôm Đà Lạt ecosystem / CÔNG TY TNHH SX-TM-DV THÁI LÂM
- **Domain:** lily.omdalat.com — subdomain dưới zone omdalat.com
- **Contracts:** Thỏa thuận residency ký qua app
- **Permits:** lodging_compliance = verified (GCN 62/GCN — Công an huyện Lạc Dương, NĐ 96/2016)
- **Insurance:** Đang hoàn thiện
- **Origin/geographic claims:** Đà Lạt, Lạc Dương, Lâm Đồng

---

## Technology

- **Repository:** `workers/brand-renderer` (brand-site.ts)
- **Deployment:** Cloudflare Workers — `omdalat-brand-renderer-production`
- **API:** `api.omdalat.com` (brand factory backend)
- **Database:** D1 `omdalat-core`
- **Storage:** R2 `omdalat-assets`
- **Runtime version:** Cloudflare Workers (compatibility_date 2024-12-30)
- **Monitoring:** Cloudflare dashboard + wrangler tail
- **Rollback:** `wrangler rollback` hoặc deploy version trước

---

## Website structure (lily.omdalat.com)

Đây là website địa điểm, không phải website mô hình tổng.

### Menu
Lily | Không gian | Chỗ ở | Làm việc | Khu vườn | Chương trình | Lịch | Chi phí | Nội quy | An toàn | Đăng ký

### Routes (VI)
```
/vi/
/vi/lily-la-gi
/vi/khong-gian
/vi/cho-o
/vi/lam-viec
/vi/khu-vuon
/vi/chuong-trinh
/vi/lich
/vi/chi-phi
/vi/noi-quy
/vi/an-toan
/vi/lien-he
/vi/dang-ky
```

---

## Status

- **Current status:** LIVE — REFERENCE LOCATION 01
- **Parent model:** Tam Farms (MODEL DEFINED)
- **Role:** Demo, kiểm chứng và hoàn thiện mô hình Tam Farms
- **Evidence:** Compliance evidence (business_registration: 42C8002522, lodging_compliance: 62/GCN, pccc: BBKT-17022022)
- **Legal entity:** CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073) — Đang hoạt động
- **Last reviewed:** 2026-07-01
- **Reviewer:** Devin (automated audit) + Trần Hà Tâm (founder approval)
- **Founder approval:** ✅ Approved 2026-06-30, corrected 2026-07-01 per ADR-003
