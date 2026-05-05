Om Dalat / Ôm Đà Lạt

Team 1 Change Broadcast

Version: v1.0.0

Status: ACTIVE

Date: 2026-05-04

Owner: Team 1

Audience: Team 2 / Team 3 / Ap Team / QA / SEO / Content / Ops

---

## 0. Mục tiêu

Thông báo này chốt các thay đổi vừa được Team 1 áp dụng vào runtime + SOP, để mọi team chạy cùng một baseline và không lệch lane.

---

## 1. Thay đổi đã áp dụng

0. Human text/SEO/report protocol gate đã được kích hoạt:
   - `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`
   - `docs/OMDALAT_HUMAN_TEXT_GATE_URL_INVENTORY_2026-05-05.md`
1. Launch 3 bài mở nền đã khóa trong seed publish:
   - `/vi/articles/song-o-da-lat-la-gi`
   - `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
   - `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`
2. Article runtime giữ strict bilingual route theo locale `/vi` và `/en`.
3. Contextual internal link ở bài detail chuyển sang silo theo pillar thay vì một cụm link cố định.
4. Ảnh bài viết ưu tiên AVIF/WebP + fallback; alt/caption bám locale đang đứng.
5. Validator content seed đã khóa vocabulary gate cho bản tiếng Việt publish.
6. Team 1 cycle coordination đã đóng ở mức `TEAM1_SCOPE_DONE`; 3 lane giữ `PASS_WITH_QUEUE`.

---

## 2. Việc Team 2 phải cập nhật ngay

1. Kiểm toàn bộ reference slug cũ của bài launch và đổi sang slug hiện tại.
2. Không render tag/copy tiếng Việt bằng từ mượn trái vocabulary gate.
3. Giữ đúng contextual links theo pillar khi chỉnh layout bài viết.
4. Dùng payload copy-ready để render sprint ngay khi chờ full seed:
   - `data/seed/articles.seed.sprint0-launch.json`

Bằng chứng bắt buộc:

1. `pnpm --filter @omdalat/web validate:web-locales` PASS
2. `pnpm --filter @omdalat/web validate:i18n-data` PASS
3. `pnpm validate:content-seed` PASS
4. Smoke canonical cho 3 bài launch ở cả `/vi` và `/en`

---

## 3. Việc Team 3 phải cập nhật ngay

1. Không tạo conflict schema khi seed đang dùng alias `life` / `earning`.
2. Nếu chạm CMS/article mapping, phải giữ tương thích runtime alias đã khóa.
3. Giữ payment lane ở `PHASE_2_NOT_IN_SCOPE` cho release này.

Bằng chứng bắt buộc:

1. `npm run cf:runtime-map:check` PASS
2. runtime smoke packet mới theo cycle
3. note rõ strict outbox đang ở hardening hay được nâng gate

---

## 4. Việc Ap Team phải cập nhật ngay

1. Bridge editorial về Om phải dùng slug launch mới khi có liên kết trực tiếp.
2. Metadata/alt/caption ở bài bridge phải giữ đúng locale và đúng vai trò editorial.
3. Không kéo Ap sang join/system flow của Om.

Bằng chứng bắt buộc:

1. Bridge link audit VI/EN
2. Metadata matrix delta
3. Image evidence delta cho route có ảnh

---

## 5. Quy tắc điều phối từ Team 1

1. Không team nào tự nâng từ `PASS_WITH_QUEUE` lên `DONE` nếu chưa có vòng review mới.
2. Mọi thay đổi bài viết/ảnh public đều phải đi qua SOP:
   - `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
   - `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
3. Nếu có thay đổi semantics route, phải escalate Team 1 trước khi merge.
4. QA vận hành hiện tại:
   - `validate:web-locales` và `validate:i18n-data` vẫn pass.
   - suite `team2-quick-qa.spec.ts` + `public-intro-h1-cta-lock.spec.ts` local đang bị blocker môi trường Chromium trên host; đây là infra, không phải regress nội dung.
   - Team 2/QA cần rerun suite này trên runner/browsers có quyền IPC và đính kèm `RUN_ID`/log.

---

## 6. Trạng thái hiện tại

1. Team 1: `DONE` cho cycle điều phối hiện tại.
2. Team 2: `PASS_WITH_QUEUE`.
3. Team 3: `DONE_CLOSED` (D-014).
4. Ap Team: `PASS_WITH_QUEUE`.

Điều chỉnh mới (2026-05-04):

* Team 2 Om public lane hiện tại `PASS_WITH_QUEUE` vì P0 đã đóng (`D-008`).
* Team 3 app runtime lane đã chuyển sang `DONE_CLOSED` (`D-014`).
* Ap lane giữ `PASS_WITH_QUEUE` vì còn queue proof P1.

File closure tham chiếu:

* `docs/TEAM1_FINAL_COMPLETION_REPORT_2026-05-04.md`
* `docs/OMDALAT_HUMAN_TEXT_PROTOCOL_APPLY_REPORT_2026-05-05.md`

## 7. Sprint 0 Execution (chốt ngay cho Team 2)

- Team 2 nên dùng trực tiếp payload Sprint 0:
  - `data/seed/articles.seed.sprint0-launch.json`
  - `data/seed/article-images.seed.json`
- Runtime đã cập nhật để lấy `meta_title`, `meta_description`, `contextual_cta` từ seed:
  - `apps/web/lib/content-seed.ts`
  - `apps/web/app/articles/[slug]/page.tsx`

Yêu cầu theo dõi:

1. 3 bài chạy đủ trên `/vi` và `/en` với viewport desktop + mobile.
2. Contextual CTA phải theo seed payload (không hardcode trong component).
3. Bổ sung evidence sprint nhanh theo evidence packet lane khi có kết quả.
