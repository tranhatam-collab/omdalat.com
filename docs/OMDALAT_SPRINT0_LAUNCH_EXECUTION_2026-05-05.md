Om Dalat / Ôm Đà Lạt

Sprint 0 Launch Execution

Version: v1.0.0

Status: ACTIVE (Execution Mode)

Start date: 2026-05-05

Owner: Team 1

---

## 0. Mục tiêu Sprint 0

Chỉ tập trung vào 3 bài mở nền đã khóa trong seed runtime:

1. `/vi/articles/song-o-da-lat-la-gi`
2. `/vi/articles/lam-viec-o-da-lat-co-thuc-te-khong`
3. `/vi/articles/tu-mot-ky-nang-den-thu-nhap-o-da-lat`

Không mở thêm scope ngoài 3 bài trong Sprint 0.

---

## 1. Team Content (D+2)

### Nhiệm vụ

1. Chốt 100% nội dung VI/EN của 3 bài trong seed.
2. Chốt metadata title/description song ngữ cho từng bài.
3. Chốt internal links đúng trục:
   - life -> stay/join
   - work -> work/join
   - earning -> join/work
4. Chốt ảnh hero theo chuẩn image reality:
   - định dạng `webp` hoặc `avif`
   - tên file theo slug
   - source/license/alt/caption VI/EN đầy đủ

### Bàn giao bắt buộc

1. `data/seed/articles.seed.json`
2. `data/seed/article-images.seed.json`

---

## 2. Team 2 (D+3)

### Nhiệm vụ

1. Render article template đúng chuẩn đọc:
   - max width bài: `720px`
   - đoạn văn thoáng, không vỡ nhịp
2. Không trộn ngôn ngữ giữa route `/vi` và `/en`.
3. CTA contextual cuối bài phải đúng trục theo `contextual_cta`.
4. Kiểm tra responsive mobile/desktop cho 3 bài launch.

### Evidence bắt buộc

1. Snapshot UI 3 bài ở `/vi` và `/en`
2. Smoke link nội bộ chính của từng bài

---

## 3. Team QA + SEO (D+1 sau Team 2)

### Nhiệm vụ

1. Chạy:
   - `pnpm validate:content-seed`
   - `pnpm --filter @omdalat/web validate:web-locales`
   - `pnpm --filter @omdalat/web validate:i18n-data`
2. Rà route/hreflang/canonical cho 3 bài launch.
3. Rà bằng mắt:
   - không bị du lịch hóa
   - không copy sale/hype
   - không trộn VI/EN

### Gate pass Sprint 0

1. 3 bài hiển thị đúng trên `/vi` và `/en`
2. Validator pass
3. Metadata song ngữ đúng
4. Ảnh đúng chuẩn image reality

---

## 4. Baseline payload hiện đã sẵn sàng

Team 1 xác nhận payload 3 bài launch đã có trong seed file launch chuyên dụng, có thể dùng ngay để Team 2 render mà không cần chờ thêm:

1. `data/seed/articles.seed.sprint0-launch.json`
2. `data/seed/articles.seed.launch-v2.json`
3. `data/seed/article-images.seed.json`

Action plan chi tiết cho owner/deadline/gate:

- `docs/OMDALAT_SPRINT_0_LAUNCH_ACTION_PLAN_2026-05-04.md`

### Copy-ready handoff cho Team 2 (đã tạo)

- File có thể ném thẳng vào local dev để render nhanh 3 bài mở nền:
  - `data/seed/articles.seed.sprint0-launch.json`
- Cách dùng:

```bash
cp data/seed/articles.seed.sprint0-launch.json data/seed/articles.seed.json
pnpm validate:content-seed
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
```

Lưu ý: khi đẩy xong local UI, Team 2 có thể revert/restore bản seed runtime chuẩn để tránh ảnh hưởng luồng 30 bài.

## 5. Kết quả Team 2 thực thi (đã cập nhật)

- `apps/web/lib/content-seed.ts` đã map `meta_title_*`, `meta_description_*`, `contextual_cta` theo payload V2.
- `apps/web/app/articles/[slug]/page.tsx` dùng CTA contextual từ seed runtime.
- `apps/web/e2e/team2-quick-qa.spec.ts` đã fix typing để tsc ổn định.
- `pnpm validate:content-seed` ✅
- `pnpm --filter @omdalat/web run validate:web-locales` ✅
- `pnpm --filter @omdalat/web run validate:i18n-data` ✅
- `pnpm --filter @omdalat/web exec tsc --noEmit` ✅

### Lưu ý QA môi trường

- Bị chặn khi chạy preview E2E toàn bộ due quyền Chromium sandbox trên máy hiện tại:
  - lỗi `Permission denied (1100)` khi `bootstrap_check_in`.
  - `Target page, context or browser has been closed`.
- Khi có runner/browser quyền IPC tốt, cần rerun:
  - `PREVIEW_BASE_URL=https://omdalat.com pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts`
  - `PREVIEW_BASE_URL=https://omdalat.com pnpm --filter @omdalat/web exec playwright test e2e/smoke-locales.spec.ts --config=playwright.preview.config.ts`

### % còn lại

- P0 Sprint 0 hiện tại: `~85%` (đang chờ 2 lần rerun e2e trên môi trường có quyền launch Chromium).

---

## 6. Codex evidence update (2026-05-04)

Additional local verification completed:

- `pnpm validate:content-seed` -> `PASS`
- `pnpm --filter @omdalat/web validate:web-locales` -> `PASS`
- `pnpm --filter @omdalat/web validate:i18n-data` -> `PASS`
- `pnpm --filter @omdalat/web exec tsc --noEmit` -> `PASS`
- `npm run cf:runtime-map:check` -> `PASS`

Local dev route smoke:

- 6/6 routes returned `200` on `http://127.0.0.1:3210`
- VI and EN H1 rendered from the correct locale payload for all 3 articles

Build note:

- `pnpm --filter @omdalat/web build` reached successful compile/type/page generation.
- It was stopped at `Collecting build traces` after a long local stall, so Team 2/QA must rerun build on a clean runner before production approval.

No production deploy was performed in this update.

---

## 7. Lệnh bắt đầu ngày mai

```bash
pnpm validate:content-seed
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
```

Sau khi pass local, Team 2 và QA tiếp tục smoke theo checklist lane.

---

## 7. Acceptance packet (bat buoc truoc GO staging)

Template nop bang chung:

* `docs/SPRINT0_ACCEPTANCE_PACKET_TEMPLATE_2026-05-05.md`

Rule:

* Team 2 phai dien day du runtime/UI checks
* QA/SEO phai dien canonical/hreflang/metadata + SOP eye-check
* Team 3 xac nhan payload contract (`locales`, `featured_image`, image log)

---

## 8. HUMAN_TEXT protocol gate (bat buoc)

Ap dung:

* `docs/HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL.md`
* `docs/OMDALAT_HUMAN_TEXT_GATE_URL_INVENTORY_2026-05-05.md`

Trang Sprint 0 chi duoc claim `WEB_READY` khi pass them:

* `CHARACTER_HYGIENE_GATE`
* `H_STANDARD_GATE`
* `SEO_TEXT_GATE`
* `TRUE_STATE_GATE`
