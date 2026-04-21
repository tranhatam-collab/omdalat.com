# OMDALAT UNIVERSAL BILINGUAL EXECUTION PLAN — 2026-04-21

Om Dalat / Ôm Đà Lạt  
Version: LOCKED  
Status: ACTIVE (bắt buộc trước live)  
Owner: Team 1  
Scope runtime trong repo: `omdalat.com` + `app.omdalat.com`

---

## 0) Mục tiêu

Áp dụng bắt buộc tài liệu:

- `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`

vào toàn bộ release flow hiện tại, để mọi bề mặt public và member trong repo:

1. đúng tiếng Việt có dấu đầy đủ,
2. đúng tiếng Anh quốc tế, rõ nghĩa kỹ thuật,
3. đúng SEO song ngữ theo từng locale,
4. không hard-code text public ngoài nguồn nội dung chuẩn.

---

## 1) Nguồn chuẩn phải bám

- `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`
- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_APP_RUNTIME_SCOPE_AND_RESPONSIBILITIES_2026.md`

Lưu ý phạm vi:

- `ap.omdalat.com` là site độc lập ngoài pipeline deploy repo này.
- Team trong repo này vẫn phải giữ quy tắc copy/cross-link khi nhắc đến `ap`, nhưng không build/deploy `ap` ở đây.

---

## 2) Chuẩn kỹ thuật song ngữ (khóa thực thi)

### 2.1 Nguồn nội dung

- Runtime hiện tại dùng:
  - `apps/web/assets/i18n/vi.json`
  - `apps/web/assets/i18n/en.json`
- Chuẩn hóa mapping tương đương yêu cầu `/content/vi.json` và `/content/en.json` bằng alias nội bộ trong sprint tới (P1), không chặn deploy vòng này.

### 2.2 Quy tắc render

- Cấm hard-code text public mới trong `page/component`.
- Mọi text mới đi qua locale keys hoặc CMS field song ngữ.
- Khi thiếu bản EN bắt buộc trên page public: không cho pass release gate.

### 2.3 SEO bắt buộc

Mỗi page public phải có đủ:

- `H1` duy nhất,
- `title`/`description` riêng theo locale,
- canonical đúng host + locale,
- hreflang đúng cặp `vi`/`en`,
- `og:title`/`og:description`,
- alt text theo locale,
- internal links đúng ngôn ngữ.

---

## 3) Phân công bắt buộc theo team

## Team 1 (Owner)

1. Khóa codex và registry thuật ngữ dùng chung.
2. Review 4 pass cho copy quan trọng (AI -> Editor -> SEO -> QA).
3. Chốt gate `Go/No-Go` theo evidence.
4. Hợp nhất báo cáo trước live thành 1 bản duy nhất.

## Team 2 (Web/Public UI)

1. Chuẩn hóa menu, footer, hero, CTA, form, empty/error states theo locale.
2. Dọn toàn bộ text public hard-code còn sót trong `apps/web`.
3. Bảo đảm chuyển ngôn ngữ giữ đúng route tương ứng (`/vi/...` <-> `/en/...`).
4. Bổ sung alt text/caption thiếu cho ảnh bề mặt public.

## Team 3 (App/Member/CMS/Runtime)

1. Chuẩn hóa text trong app member: dashboard, gate screen, notification, form.
2. Khóa field song ngữ trong CMS cho content public bắt buộc.
3. Không cho publish khi thiếu locale bắt buộc trên content indexable.
4. Giữ `noindex` cho member/internal sau mọi thay đổi copy.

---

## 4) Checklist vận hành bắt buộc trước live

1. Crawl route public + member (preview/prod) và lập bảng kiểm kê song ngữ.
2. Gắn nhãn từng lỗi: `VI`, `EN`, `SEO`, `UI`, `ALT`, `META`, `LINK`.
3. Sửa theo ưu tiên:
   - `P0`: homepage, nav/footer, join/member gate, metadata lõi.
   - `P1`: stay/work/learning/community + template article.
   - `P2`: archive, search, các page phụ.
4. Chạy test:
   - e2e smoke locale,
   - e2e regression intro/H1/CTA,
   - kiểm tra metadata/canonical/hreflang,
   - kiểm tra alt text và internal links.

---

## 5) Release evidence bắt buộc

Báo cáo phải có đủ 10 mục sau trước khi bấm live:

1. Tổng số URL đã rà.
2. Tổng số page đã sửa.
3. Tổng số lỗi tiếng Việt đã sửa.
4. Tổng số lỗi tiếng Anh đã sửa.
5. Tổng số metadata đã chuẩn hóa.
6. Tổng số alt text đã chuẩn hóa.
7. Tổng số CTA/form/menu/footer đã chuẩn hóa.
8. Danh sách page còn treo.
9. Danh sách quyết định ngôn ngữ đã khóa.
10. Xác nhận cuối: đạt chuẩn VI, EN, SEO, live.

---

## 6) Trạng thái triển khai hiện tại (2026-04-21)

- Đã có nguồn chuẩn ngôn ngữ và SEO/microcopy lock.
- Đã có regression test cho public intro/H1/CTA.
- Đã có smoke locale route/canonical/hreflang.
- Chưa hoàn tất bảng kiểm kê tổng tất cả URL + text node theo mẫu bắt buộc.
- Chưa có báo cáo tổng hợp 10 mục theo format universal command.

Trạng thái gate song ngữ: **IN PROGRESS (chưa đủ điều kiện Go).**

---

## 7) Điều kiện chuyển sang Go

Chỉ chuyển `Go production` khi đồng thời thỏa:

1. Runtime domain canonical đã ổn định (`omdalat.com` + `app.omdalat.com`).
2. Email smoke live pass 5/5 trên target runtime canonical cuối.
3. Universal bilingual report đủ 10 mục và không còn lỗi P0.

Thiếu bất kỳ mục nào: **No-Go**.
