# OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026

Ôm Đà Lạt × Ấp Đà Lạt × AIagent.iai.one × Computer.iai.one
Hệ AI dựng thương hiệu địa phương, web nhánh, hồ sơ Ấp và nội dung song ngữ

Version: 1.0 — FINALIZED (was MASTER EXECUTION PLAN DRAFT)
Status: Ready for DEV / AI Agent / Founder
Depends on: `APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17.md` (decisions),
`APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026.md` (strategy)

> Phán quyết: AI dựng 80–90% (hồ sơ, web, nội dung, SEO, ảnh, checklist, preview)
> cực nhanh; con người giữ 10–20% là **cổng xác minh + phê duyệt** trước khi công khai.
> AI **không** tự publish, **không** tạo payment/pháp nhân, **không** thay đổi
> language codex/brand. Khớp với `Computer.iai.one`: verification, audit, rollback,
> ground-truth bằng build/log/output thật — không lấy báo cáo chữ làm bằng chứng.

---

## 0. Một lệnh founder dùng

```
/omdalat_local_brand_factory
Input:
- Brand name / Google Maps URL hoặc tọa độ / Khu vực / Loại hình / Mô tả ngắn
- Ảnh đã có / Chủ sở hữu / Số liên hệ
- Có đón khách / bán sản phẩm / lưu trú / trải nghiệm? (mỗi cái: yes/no/unknown)
- Ngôn ngữ: VI + EN / Trạng thái mong muốn: draft | private_preview | publish_review
Bắt buộc:
1. Phân giải địa điểm (Maps/tọa độ) + kiểm tra Google Business Profile.
2. Tạo brand intake + hồ sơ editorial (ap, L2) + microsite (brand, L3) ở trạng thái nháp.
3. Nội dung song ngữ (VI nguồn, EN adaptation — không dịch máy).
4. SEO (title/meta/OG/schema theo loại; schema commerce chỉ trên L3).
5. Checklist ảnh (reuse media_asset rights/consent) + checklist pháp lý theo loại.
6. CMS JSON + task cho DEV/Content/Field/QA.
7. KHÔNG publish nếu thiếu owner consent / QA / approval.
8. Xuất báo cáo: Completed · Missing inputs · Risks · Compliance flags · Next action.
```

---

## 1. Mười agent (đội chuyên trách)

1. **Intake** — chuẩn hóa input, liệt kê thiếu, gắn risk flag.
2. **Maps Resolver** — phân giải URL/tọa độ; lấy Place ID nếu API cho phép; output:
   `{maps_status: named_place|coordinates_only|unverified|claimed|unknown, place_name, coordinates, address, place_id, confidence}`.
3. **Verification** — không tin Maps/ảnh public tuyệt đối; yêu cầu owner confirmation;
   output: `{verification_status, required_owner_actions[], public_claims_allowed[], public_claims_blocked[]}`.
4. **Brand Architect** — tên VI/EN, tagline, định vị, câu chuyện nền, subdomain, category, tone.
5. **Bilingual Content** — homepage/story/products/experiences/location/FAQ/CTA/captions/alt.
   VI là nguồn; EN là adaptation `in_progress` (không tự set `ready`).
6. **Image Director** — phân loại (hero/card/gallery/social/inline/profile), alt/caption
   VI+EN, crop note, risk flag → ghi vào `media_asset` (không tạo bảng ảnh mới).
7. **SEO** — title/desc VI/EN, OG, schema (LocalBusiness/Farm/Lodging tùy loại, **chỉ L3**),
   breadcrumb, sitemap entry, internal links.
8. **Compliance Checklist** — sinh checklist theo lưu trú/ăn uống/farm/trải nghiệm
   (audit §4.6; refs NĐ 96/2016, NĐ 13/2023, ATTP).
9. **CMS Builder** — sinh record đúng schema `omdalat-core` (§4).
10. **QA & Release** — kiểm đủ dữ liệu/claim/ảnh/song ngữ/SEO/route/consent/rollback;
    output: `{release_status: blocked|ready_for_review|ready_to_publish, risk_flags[], missing_items[], approval_required: true}`.

**Pipeline:** Intake → Maps Resolver → Verification → Brand Architect → Content →
Image Director → SEO → Compliance → CMS Builder → Preview → QA → **Founder Review →
Owner Review →** Publish → Analytics → Improvement loop.
(Hai bước in đậm là cổng người thật, bắt buộc.)

---

## 2. Trạng thái (state machine — khớp publish gate đã khóa)

```
draft → private_preview → founder_review → owner_review → compliance_review
→ publish_ready → published   (revoked consent → suspended/unpublished)
```

`published` chỉ đạt khi: `content_approved && image_approved && owner_consent &&
compliance_reviewed && qa_passed` (audit §4 validators). EN chỉ hiện khi
`translation_status = ready`.

---

## 3. Hạ tầng — DÙNG LẠI cái đang có (không dựng stack mới)

| Cần | Dùng cái có sẵn |
| --- | --- |
| API worker | `omdalat-platforms-api` @ `api.omdalat.com` (`workers/api`) — thêm routes mới |
| DB | D1 `omdalat-core` (`eab4c371-…`), `migrations_dir: migrations` — thêm `0002_…+` |
| Ảnh | R2 `omdalat-assets` (variants theo image policy) |
| Async/agent runs | Queue `omdalat-automation` |
| Thanh toán | `pay.iai.one` (PayOS) qua `api.omdalat.com` — KHÔNG provider thứ 2 |
| Mail | `mail.iai.one` (`pay@/noreply@/support@/billing@`) |
| Subdomain renderer | **mới**: Pages/Worker phục vụ `{brand}.omdalat.com` từ allowlist |

`ap.omdalat.com` hiện là site **tĩnh**; L2 cần chuyển sang render từ CMS. L3 là net-new.

---

## 4. Database — migrations mới trên `omdalat-core`

Đã có (migration 0001): `users`, `payment_sessions`, `payment_orders`. **Không sửa.**
Thêm (đề xuất `0002_brand_factory.sql` … `0005`):

```
owners            (id, name, contact, consent_status[pending|approved|revoked], consent_at, notes, created_at, updated_at)
places            (id, owner_id, maps_url, google_place_id, lat, lng, address_vi, address_en,
                   administrative_area, maps_status, verification_status, created_at, updated_at)
brands            (id, place_id, owner_id, name_vi, name_en, slug, subdomain,
                   brand_type[farm|homestay|garden|cafe|workshop|craft|local_product|hybrid],
                   can_host_stay, can_host_visit, can_sell_product, can_host_work,
                   publication_status[draft|private_preview|review|published|suspended],
                   ap_place_ref, created_at, updated_at)
brand_intakes     (id, place_id, raw_input JSON, missing_fields JSON, risk_flags JSON, created_at)
content_blocks    (id, brand_id, locale, block_type, payload JSON, status, created_at, updated_at)
products          (id, brand_id, name_vi, name_en, season, notes, status)
experiences       (id, brand_id, title_vi, title_en, capacity, duration, safety_notes, status)
compliance_checklists (id, brand_id, business_registration, lodging_compliance, food_safety,
                   pccc, tourism_service [each: not_applicable|unknown|pending|verified], updated_at)
approvals         (id, brand_id, action[approve_content|approve_images|approve_compliance|approve_publish],
                   approved_by, notes, created_at)
agent_runs        (id, brand_id, run_type, mode[draft|preview|review], status, output JSON, created_at)
inquiries         (id, brand_id, contact, message, locale, source, status, created_at)   -- processed by L1
release_reports   (id, brand_id, release_status, risk_flags JSON, missing_items JSON, created_at)
```

**Reuse, không tạo mới:** ảnh dùng bảng `media_asset` (đã có `license_type/scope`,
`source_type`, `consent_required`, `consent_verified`); chỉ thêm cột tham chiếu
`brand_id`/`place_id`. Booking/tiền dùng `payment_sessions`/`payment_orders` đã có.

> SQLite/D1: không dùng inline INDEX trong CREATE TABLE (đã từng gây lỗi — commit
> `4bb87cb`); tạo INDEX riêng. Mỗi migration idempotent (`IF NOT EXISTS`).

---

## 5. API (thêm vào worker `omdalat-platforms-api`)

```
POST /api/omdalat/brand-intake                 → tạo intake + place (draft)
POST /api/omdalat/agent-runs                   → chạy pipeline {brand_id, run_type, mode}
GET  /api/omdalat/brands/:id/preview           → preview L3
POST /api/omdalat/brands/:id/approve           → {action, approved_by, notes}
POST /api/omdalat/brands/:id/publish           → chỉ chạy nếu 5 cờ ở §2 = true
POST /api/omdalat/brands/:id/inquiry           → lead (L3 → L1), tuân NĐ 13/2023
```

Quy tắc: agent gọi được intake/agent-runs/preview; **không** gọi được publish nếu
thiếu approval; **không** có route nào để agent tạo payment/đổi pháp nhân.

---

## 6. Admin dashboard + mobile approval

- **Brand Factory dashboard** (tabs): Intake · Place Data · Brand Story · Images ·
  SEO · Compliance · Preview · Approval · Publish · Analytics.
- **Mobile approval center**: Duyệt tên · Duyệt câu chuyện · Duyệt ảnh · Duyệt pháp
  lý · Cho/Chặn publish · Yêu cầu AI sửa. (Computer.iai.one làm control plane:
  memory/route/QA/release log/rollback riêng cho từng instance, ví dụ `OMDALAT-TAMFARM-001`.)

---

## 7. Hợp đồng với AIagent.iai.one (điểm khóa)

- **Phạm vi**: 10 agent ở §1.
- **Được làm**: phân tích input, trích xuất Maps, nháp thương hiệu/nội dung/SEO/
  checklist, preview, báo cáo, *đề xuất* publish.
- **Không được tự làm**: claim "đã xác minh" khi chưa; dùng ảnh/review không rõ quyền;
  hứa doanh thu; nói "đạt chuẩn/đã mở cửa" khi chưa có bằng chứng; publish khi chưa
  approval; đổi language codex/brand; chọn pháp nhân nhận tiền; tạo payment/hợp đồng
  với người dân.
- **Cấp quyền (giới hạn)**: repo + CMS schema + Language Codex + Image Standard + SEO
  standard + subdomain routing + Cloudflare token phạm vi hẹp + Google Maps API key +
  (tùy) Google Business OAuth + R2 ảnh + mail/notify + admin review dashboard.
  **Không cấp** quyền thanh toán/ngân hàng/xóa production/publish-không-review/dữ liệu
  cá nhân không liên quan.
- **Bảo mật/dữ liệu**: dữ liệu chủ vườn = dữ liệu cá nhân (NĐ 13/2023); ảnh người cần
  consent; không bán dữ liệu; không train model ngoài khi chưa đồng ý; có quyền
  xóa/sửa; log ai xem/sửa/publish.
- **Nghiệm thu một thương hiệu**: brand profile + Ap profile + microsite preview +
  nội dung VI/EN + SEO + image log + compliance + owner consent + QA report +
  release report + Team 1 approval.

---

## 8. Lộ trình build

- **7 ngày**: schema (migrations `omdalat-core`) + intake form + 1 template L3 +
  agent prompt pack + 1 preview Tâm Farm + dashboard review cơ bản.
- **14 ngày**: nối Google Places API + image log (qua `media_asset`) + SEO generator +
  compliance checklist + 3 thương hiệu mẫu private preview.
- **30 ngày**: 10 thương hiệu mẫu, publish 3 đã xác minh, form "Đề xuất một Ấp",
  Ap Dalat local brand index, báo cáo đầu tiên.

---

## 9. Cần từ founder (đầu vào, không tự đoán — xem audit §5)

**Đã chốt (2026-06-17):** pháp nhân nhận tiền = **Công ty TNHH Thái Lâm** · quyền
approve publish = **Admin** · subdomain = **wildcard `*.omdalat.com` + allowlist D1**
(không dùng Cloudflare for SaaS lúc này; CORS đổi sang kiểm tra runtime
`*.omdalat.com` + `publication_status='published'`).

**Còn mở:** Google Maps API key + Business OAuth · form owner consent · 20–50 ảnh
thật · 3 địa điểm xác minh đầu · chọn control plane chính (AIagent.iai.one /
Computer.iai.one).

Nên có thêm: mẫu hợp đồng chủ vườn · giấy đồng ý dùng ảnh · onboarding · chính sách
miễn phí 1–2 năm · mẫu chia doanh thu · checklist pháp lý lưu trú/ăn uống/trải nghiệm.

---

## 10. Kết luận

AI dựng toàn bộ hồ sơ/web/nội dung/SEO/ảnh/checklist/preview thật nhanh; con người
giữ quyền xác minh, phê duyệt và bảo vệ sự thật của địa phương.

- AIagent.iai.one = đội agent. Computer.iai.one = máy tính AI vận hành/kiểm chứng/
  rollback. Omdalat.com (L1) = hệ sống + tiền. Ap.omdalat.com (L2) = truyền thông
  địa phương. `{brand}.omdalat.com` (L3) = từng thương hiệu đứng riêng.

**Build Brand Factory trước.** Khi nó chạy đúng, mỗi địa điểm mới chỉ là một record +
ảnh + approval + render template — không phải một dự án riêng.
