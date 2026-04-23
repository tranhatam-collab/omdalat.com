# OMDALAT UNIVERSAL BILINGUAL PRE-LIVE REPORT — 2026-04-21

Version: 0.1.0 (interim)  
Status: SUPERSEDED_BY_FINAL_REPORT
Owner: Team 1

Final report:

```text
docs/OMDALAT_UNIVERSAL_BILINGUAL_FINAL_LIVE_REPORT_2026-04-23.md
```

---

## 1) Tổng số URL đã rà

- Web route template đã quét: `35`
- App route template đã quét: `12`
- Tổng route template đã quét: `47`
- Ghi chú: số URL public thực tế sẽ cao hơn do dynamic routes (`[slug]`) và cần bổ sung từ CMS trước khi chốt live.

## 2) Tổng số page đã sửa

- Team 2: đang cập nhật theo evidence commit và PR batch.
- Team 3: đang cập nhật theo evidence commit và PR batch.
- Tổng: chờ tổng hợp theo mốc đóng sprint.

## 3) Tổng số lỗi tiếng Việt đã sửa

- Pass tự động trên locale file web:
  - key rỗng: `0`
  - key thiếu: `0`
- Số lỗi wording trên toàn surface: chờ tổng hợp từ vòng review 4 pass.

## 4) Tổng số lỗi tiếng Anh đã sửa

- Pass tự động trên locale file web:
  - key rỗng: `0`
  - key thiếu: `0`
  - cụm từ cấm trong locale file: `0`
- Số lỗi ngữ nghĩa toàn surface: chờ tổng hợp từ vòng review 4 pass.

## 5) Tổng số metadata đã chuẩn hóa

- Metadata public và member đã có bằng chứng pass ở các lane chính.
- Số lượng chuẩn hóa chi tiết theo URL: chờ Team 2 + Team 3 nộp bảng kiểm kê cuối.

## 6) Tổng số alt text đã chuẩn hóa

- Chưa có bảng tổng hợp số lượng cuối theo URL.
- Trạng thái: cần Team 2 nộp audit alt text mobile + desktop trước Go.

## 7) Tổng số CTA/form/menu/footer đã chuẩn hóa

- Đã có evidence pass cho các cụm CTA/H1/intro ở lane public chính.
- Số lượng chuẩn hóa chi tiết theo component: chờ tổng hợp cuối.

## 8) Danh sách page còn treo

- `app.omdalat.com` API lane (`POST /api/support`) còn lỗi `502` trên host canonical hiện tại.
- Báo cáo song ngữ 10 mục chưa hoàn tất nên release gate chưa mở.

## 9) Danh sách quyết định ngôn ngữ quan trọng đã khóa

- `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`
- `docs/OMDALAT_UNIVERSAL_BILINGUAL_EXECUTION_PLAN_2026-04-21.md`
- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`

## 10) Xác nhận cuối

- [ ] Đủ chuẩn tiếng Việt có dấu đầy đủ.
- [ ] Đủ chuẩn tiếng Anh quốc tế, không dịch máy.
- [ ] Đủ chuẩn SEO song ngữ (H1/title/meta/canonical/hreflang/alt/link/schema).
- [ ] Đủ chuẩn live (không còn lỗi P0).

---

## Bằng chứng kỹ thuật đã đính kèm

- Locale validator mới:
  - `scripts/validate-web-locales.mjs`
- Build gate đã nối validator:
  - `package.json`
  - `apps/web/package.json`
- Kết quả chạy validator:
  - `web locale validation passed. keys=14`
