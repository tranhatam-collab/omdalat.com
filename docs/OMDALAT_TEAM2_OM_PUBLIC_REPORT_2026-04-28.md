# OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28

Version: 1.1  
Status: UPDATED_FOR_TEAM1_REVIEW  
Date: 2026-04-29  
Lane: Om public  
Owner: Team 2  
Reviewer: Team 1

---

## 1. Scope đã kiểm

Scope current-state của Team 2 cho lane `Om public`:

- homepage public `vi/en`
- public routes: `/about`, `/life`, `/work`, `/learning`, `/community`, `/stay`, `/articles`, `/join`, `/contact`, `/docs`, `/privacy`, `/terms`
- public CTA / menu / footer / contextual help surface
- docs public surface ở lớp route public
- public smoke lock cho intro / H1 / CTA
- responsive quick QA desktop/mobile
- bridge Om -> Ap ở footer/community surface
- metadata support current-state ở lớp route shell đã được Team 2 chạm trước đó

Current route inventory in scope:

- `/vi`
- `/en`
- `/vi/about`
- `/en/about`
- `/vi/life`
- `/en/life`
- `/vi/work`
- `/en/work`
- `/vi/learning`
- `/en/learning`
- `/vi/community`
- `/en/community`
- `/vi/stay`
- `/en/stay`
- `/vi/articles`
- `/en/articles`
- `/vi/join`
- `/en/join`
- `/vi/contact`
- `/en/contact`
- `/vi/docs`
- `/en/docs`
- `/vi/privacy`
- `/en/privacy`
- `/vi/terms`
- `/en/terms`

---

## 2. P0 done

Chỉ liệt kê các mục Team 2 đã có evidence hoặc artifact rõ:

- `DONE` Team 2 đã align lane với bộ chuẩn activation mới bằng file thực thi riêng: [OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md)
- `DONE` Handoff gốc đã được nối với activation 2026-04-28 và Team 2 compliance lock: [README_DEV_HANDOFF_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/README_DEV_HANDOFF_OMDALAT.md)
- `DONE` Public surface đã được dọn legacy wording trọng yếu ở các block Team 2 đã chạm như footer / contextual help / public guidance layer
- `DONE` Bridge `Ấp Đà Lạt / Ap Dalat` đã có đúng chỗ trên public surface Team 2 đã khóa trước đó
- `DONE` Public quick smoke canonical đã có evidence pass mới nhất: `34/34 passed (1.7m)` trên `https://omdalat.com`
- `DONE` Validation gates current-state vẫn pass:
  - `validate:web-locales`
  - `validate:i18n-data`
  - `validate:content-seed`
- `DONE` Team 2 đã dọn file duplicate legacy ảnh hưởng lane review/support UI: `apps/web/lib/member-review-queue 2.ts`
- `DONE` Team 2 đã chốt ràng buộc ảnh cho lane public theo chuẩn mới:
  - [OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md)
  - [OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md)
  - [OMDALAT_CONTENT_SYSTEM_SOP.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CONTENT_SYSTEM_SOP.md)
- `DONE` Handoff Sprint 0 cho team Dev đã tạo:
  - `data/seed/articles.seed.sprint0-launch.json` (3 bài launch, có VI/EN, meta_title/meta_description, internal links, contextual_cta)

---

## 3. P0 blocked

* `NONE` (P0 blockers đã được xử lý trong nhịp deploy ngày 2026-04-29)
* Route `contact` canonical đã phục hồi:
  * `/vi/contact` -> `HTTP 200`
  * `/en/contact` -> `HTTP 200`
* Metadata matrix + alt audit core routes đã được cập nhật lại theo canonical mới nhất.

---

## 4. P1 queue

- `QUEUE` Giảm thêm hard-coded public text còn rải rác nếu phát hiện surface chưa đi qua content source tập trung
- `QUEUE` Bổ sung blacklist regression check cho từ tiếng Anh không nên rơi lẻ vào bản Việt
- `QUEUE` Mở rộng alt/caption audit cho ảnh secondary ngoài tập core routes hiện tại
- `QUEUE` Kiểm lại tái sử dụng ảnh theo đúng role/intent chuẩn mới trước khi mở rộng article image surface

---

## 5. Files / routes / modules liên quan

Docs / planning:

- [OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md)
- [README_DEV_HANDOFF_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/README_DEV_HANDOFF_OMDALAT.md)

Frontend/UI surfaces previously touched by Team 2:

- [HeroSection.tsx](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/components/sections/HeroSection.tsx)
- [ContextHelpSection.tsx](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/components/shared/ContextHelpSection.tsx)
- [Footer.tsx](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/components/layout/Footer.tsx)
- [public-docs.ts](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/lib/public-docs.ts)

Smoke / QA:

- [team2-quick-qa.spec.ts](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/e2e/team2-quick-qa.spec.ts)
- [public-intro-h1-cta-lock.spec.ts](/Users/tranhatam/Documents/Devnewproject/omdalat.com/apps/web/e2e/public-intro-h1-cta-lock.spec.ts)

Representative routes:

- `/vi`, `/en`
- `/vi/join`, `/en/join`
- `/vi/contact`, `/en/contact`
- `/vi/docs`, `/en/docs`
- `/vi/community`, `/en/community`

---

## 6. Commands đã chạy

Commands used in current Team 2 verification/reporting cycle:

```bash
corepack pnpm --filter @omdalat/web run validate:web-locales
corepack pnpm --filter @omdalat/web run validate:i18n-data
corepack pnpm --filter @omdalat/web run validate:content-seed
PREVIEW_BASE_URL=https://omdalat.com corepack pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts --reporter=line
```

Notes:

* Lần chạy mới nhất trên local (2026-05-04) bắn `PLAYWRIGHT` bị fail do quyền launch Chromium (`Permission denied` `bootstrap_check_in`) trên host, không phải lỗi nội dung/routing.
* Khi runner có browser IPC ổn định, Team 2 cần rerun lại suite này và gửi `RUN_ID` + log.

Docs coordination commands used in this round:

```bash
sed -n '1,260p' docs/OMDALAT_3_LANE_AUDIT_BOARD_2026-04-28.md
sed -n '1,260p' docs/OMDALAT_3_LANE_REPORT_REQUEST_2026-04-28.md
sed -n '1,260p' docs/OMDALAT_AND_APDALAT_UNIVERSAL_STANDARDS_ROLLOUT_PLAN_2026-04-28.md
```

---

## 7. Evidence

Primary report path:

- [OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md)

Supporting standards/evidence paths:

- [OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28.md)
- [OMDALAT_UNIVERSAL_STANDARDS_ACTIVATION_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_UNIVERSAL_STANDARDS_ACTIVATION_2026-04-28.md)
- [OMDALAT_AND_APDALAT_TEAM_UPDATE_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_AND_APDALAT_TEAM_UPDATE_2026-04-28.md)
- [OMDALAT_OM_PUBLIC_IMAGE_REALITY_AUDIT_2026-04-29.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_OM_PUBLIC_IMAGE_REALITY_AUDIT_2026-04-29.md)
- [OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md)
- [OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_OM_PUBLIC_METADATA_MATRIX_2026-04-28.md)
- [OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md)
- [OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md)
- [OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md)
- [OMDALAT_CONTENT_SYSTEM_SOP.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CONTENT_SYSTEM_SOP.md)

Smoke evidence summary:

- Canonical browser smoke latest result: `34/34 passed (1.7m)` on `https://omdalat.com`
- Validation gates:
  - `web locale validation passed. keys=14`
  - `i18n data validation passed.`
  - `content seed validation passed.`

Current limitation:

- Team 2 đã khóa sạch core route set trong matrix P0.
- Phần còn lại là queue mở rộng (không chặn closure P0).
- Lộ trình run local không thể dùng để xác nhận lại 34/34 quick-qa trong lần này; cần rerun trên runner hỗ trợ.

---

## 8. Quyết định cần Team 1 chốt

- Team 1 đã chấp nhận `OMDALAT_OM_PUBLIC_IMAGE_REALITY_AUDIT_2026-04-29.md` là evidence bổ sung cho image reality lane, cùng với metadata/alt matrix hiện có.
- Decision: tiếp tục giữ `PASS_WITH_QUEUE` cho Om public khi P0 không còn blocker.

---

## 9. Việc tiếp theo

Next steps đề xuất cho Team 2:

1. Lấy nhanh payload Sprint 0:
   `data/seed/articles.seed.sprint0-launch.json` → render UI 3 bài `/vi` + `/en`, rồi báo lại screenshot + note.
2. Chờ Team 1 chốt closure lane Om public ở mức `PASS_WITH_QUEUE`.
2. Tiếp tục queue mở rộng alt/caption audit và blacklist regression.
3. Nếu Team 1 yêu cầu, mở thêm nhịp hardening content-source cho public copy.

---

## 10. Phần trăm còn lại

- Om public lane current-state: `100%` cho P0 closure gate
- Queue còn lại thuộc P1 hardening:
  - mở rộng alt audit secondary images
  - regression hardening cho bilingual copy

Kết luận current-state:

`P0 complete, ready for PASS_WITH_QUEUE decision`
