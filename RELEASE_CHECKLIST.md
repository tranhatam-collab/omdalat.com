# CHECKLIST TIỀN LIVE ROUND 2

Dự án: Ôm Đà Lạt  
Kho mã: `omdalat.com`  
Ngày cập nhật: 2026-04-22  
Trạng thái: Đã rà soát lại theo evidence live runtime mới nhất

## 1. Cổng chặn build và kiểm thử

- [x] `npm run build` tại `apps/web` pass qua luồng `build:cf`
- [x] `npm run build` tại `apps/app` pass qua luồng `build:cf`
- [x] `pnpm --filter @omdalat/app test:e2e -- e2e/moderation-pipeline.spec.ts` pass (`3 passed`)
- [x] `pnpm --filter @omdalat/web test:e2e -- e2e/member-review-queue.spec.ts` pass (`4 passed`, rerun tuần tự)
- [x] `pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts` pass (`54 passed`, rerun tuần tự)
- [x] `apps/web` typecheck pass theo evidence Team 2

## 2. Cổng chặn thương hiệu và ngôn ngữ

- [x] Tài liệu giao việc, báo cáo, release gate, evidence packet và release notes dùng tiếng Việt có dấu đầy đủ
- [x] Tiếng Anh trong các file phát hành giữ đúng nghĩa kỹ thuật, không dịch thô, không dùng giọng marketing
- [x] Đã khóa và áp dụng `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md` cho copy public + metadata chính
- [x] Đã khóa phạm vi runtime theo `docs/OMDALAT_APP_RUNTIME_SCOPE_AND_RESPONSIBILITIES_2026.md` (`omdalat.com` + `app.omdalat.com`)
- [x] Đã khóa thêm:
  - `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
  - `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
  - `docs/OMDALAT_AND_APDALAT_COPY_ROLLOUT_PLAN_2026.md`
  - `docs/OMDALAT_LANGUAGE_ROLLOUT_TEAM_ASSIGNMENTS_2026-04-19.md`
- [x] `apps/web`, `apps/app`, `packages` và tài liệu active đã dọn sạch `docs.omdala.com`, `app.omdala.com`, `docs-map`
- [ ] `apps/docs` vẫn là bundle static legacy, cần archive hoặc rewrite riêng trước beta rộng hơn

## 2A. Cổng chặn tái cấu trúc song ngữ (MANDATORY)

- [x] Đã khóa lệnh tổng: `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`
- [x] Đã tạo kế hoạch áp dụng bắt buộc: `docs/OMDALAT_UNIVERSAL_BILINGUAL_EXECUTION_PLAN_2026-04-21.md`
- [x] Đã có báo cáo interim theo mẫu: `docs/OMDALAT_UNIVERSAL_BILINGUAL_PRELIVE_REPORT_2026-04-21.md`
- [ ] Chưa hoàn tất bảng kiểm kê tổng tất cả URL/text node theo mẫu 10 mục bắt buộc trước live
- [ ] Chưa nộp báo cáo tổng hợp cuối theo format universal command (đủ VI/EN/SEO/ALT/CTA/META)
- [ ] Còn thiếu xác nhận cuối 4 pass cho toàn bộ page public (`AI -> Editor -> SEO -> QA`)

## 3. Cổng chặn điều hướng và SEO

- [x] Redirect canonical cho toàn bộ route legacy đã hoạt động theo smoke test
- [x] `/vi` và `/en` phản ánh đúng cấu trúc mới theo smoke test
- [x] `canonical`, `hreflang`, `noindex` đi đúng trên bề mặt đã test
- [x] Đã dọn hết mọi liên kết secondary còn dùng `docs-map` legacy trong codebase active

## 4. Cổng chặn member và access

- [x] `reviewed unlock` hoạt động đúng sau khi hồ sơ được duyệt
- [x] `application-status` phản ánh đúng trạng thái hồ sơ
- [x] Public, registered, reviewed, internal không bị lẫn quyền trong các luồng đã test
- [x] Không có bằng chứng rò rỉ nội dung protected ra public trong gate Round 2 hiện tại

## 5. Cổng chặn nội dung và vận hành

- [x] Homepage và route chính đi theo trục `Sống / Làm / Học / Cộng đồng` trong smoke hiện tại
- [x] Member resources, handbook, operations lane và application status tải đúng theo role
- [x] Báo cáo Round 2, evidence packet và release notes đã cập nhật theo trạng thái mới nhất
- [ ] Cleanup bundle static legacy trong `apps/docs` và page secondary cũ khỏi repo vẫn còn là việc sau live

## 6. Cổng chặn artifact gần live

- [x] `pnpm --filter @omdalat/web build:cf` pass
- [x] `pnpm --filter @omdalat/app build:cf` pass
- [x] Đã chốt lệnh deploy thật cho Cloudflare Pages
- [x] Đã deploy bản mới nhất sau language lock:
  - Web: `https://1bd018f2.omdalat-web-ezk.pages.dev`
  - App: `https://d86d73c0.omdalat-app-2ol.pages.dev`
- [x] Hạ tầng Cloudflare Pages đã deploy thành công vào project `omdalat-web` và `omdalat-app`
- [x] Domain custom của app đã bind đúng vào `omdalat-app`, gồm `app.omdalat.com` và `www.app.omdalat.com`

### Lệnh deploy Cloudflare Pages

```bash
wrangler pages deploy apps/web/.vercel/output/static --project-name omdalat-web --branch main
wrangler pages deploy apps/app/.vercel/output/static --project-name omdalat-app --branch main
```

## 7. Ghi chú phát hành

- [x] Có `release notes` cho Round 2
- [x] Có `evidence packet` cho Round 2
- [x] Có quyết định `Go`
- [x] Có ghi chú rollback ở mức tối thiểu

### Rollback tối thiểu

1. Giữ nguyên artifact `.vercel/output` đã pass để có thể redeploy ngay.
2. Nếu deploy mới có lỗi, redeploy lại bản Cloudflare Pages gần nhất đang ổn định cho từng project `omdalat-web` và `omdalat-app`.
3. Không mở thêm cleanup legacy trong cùng nhịp rollback.

## 8. Lệnh kiểm tra chuẩn

```bash
pnpm --filter @omdalat/app test:e2e -- e2e/moderation-pipeline.spec.ts
pnpm --filter @omdalat/web test:e2e -- e2e/member-review-queue.spec.ts
pnpm --filter @omdalat/web test:e2e -- e2e/smoke-locales.spec.ts
pnpm --filter @omdalat/web build:cf
pnpm --filter @omdalat/app build:cf
```

## 9. Quyết định phát hành

**Go cho live bước đầu trên canonical runtime (cập nhật 2026-04-22, 09:05 ICT).**

Ghi chú đi kèm:

- `https://omdalat.com/` trả `308` về `https://omdalat.com/vi`.
- `GET https://app.omdalat.com/vi/member/login` trả `200` + `x-robots-tag: noindex, nofollow`.
- `POST https://app.omdalat.com/api/support` trả `200`.
- Smoke live trên cặp canonical cuối đã pass `5/5`:
  - `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
  - report: `reports/email-smoke/2026-04-23T05-35-37-961Z`
- Team 2 canonical re-smoke UI/public: PASS theo evidence `34/34`.

Trạng thái chưa đóng release tổng:

1. Gate `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND` vẫn chưa có báo cáo tổng hợp cuối đủ 10 mục.
2. Local workspace build cần được chuẩn hóa lại dependency linking trước vòng dev kế tiếp.

## 10. Email runtime (bổ sung)

- [x] Đã chuẩn hóa subject/body theo branding Team 1 cho contact/join/support/magic-link/verification.
- [x] Đã thêm smoke script E2E 5 flow: `npm run mail:smoke:e2e`.
- [x] Đã thêm checklist deploy secrets theo runtime hiện tại:
  - `docs/OMDALAT_EMAIL_SECRETS_DEPLOY_CHECKLIST_2026-04-19.md`
- [x] Smoke live `5/5` đã đạt trên runtime live (không dùng `next dev` local).
  - Lần chạy pass mới nhất:
    - `SMOKE_RUNTIME_TARGET=live SMOKE_WEB_ORIGIN=https://omdalat.com SMOKE_APP_ORIGIN=https://app.omdalat.com npm run mail:smoke:e2e`
    - Report: `reports/email-smoke/2026-04-23T05-35-37-961Z`
    - Kết quả: `success=true`, `5/5 flow` (mode `runtime`).
  - Trạng thái email lane: `done`.

## 11. Payment scope (bổ sung)

- [x] Payment được chốt `Phase 2 / not in scope` cho release hiện tại.
- [x] Không khai báo checkout/payment lane là active trong cutover này.
- [x] Ghi chú phát hành Team 3 đã khóa rõ trạng thái:
  - `docs/TEAM3_RELEASE_NOTE_EMAIL_PAYMENT_2026-04-23.md`

## 12. External mail/payment activation (bổ sung)

- [x] Mail sender/relay external cho `omdalat.com` đã có proof xanh ở lớp Mailcow + SendGrid provider acceptance.
  - Proof: `docs/OMDALAT_EXTERNAL_MAIL_PAYMENT_ACTIVATION_STATUS_2026-04-23.md`
- [x] `pay@omdalat.com` và `billing@omdalat.com` là alias active tới `support@omdalat.com`.
- [x] `support@omdalat.com` và `noreply@omdalat.com` là mailbox thật.
- [x] 8/8 outbound smoke từ `pay`, `billing`, `support`, `noreply` tới hai Gmail đã được provider nhận `250 Ok`.
- [ ] Payment activation external chưa được claim live.
  - Trạng thái: `LOCK_RETAINED_WITH_REASON`
  - Còn thiếu: `MAIL_API_*`, `PAY_EMAIL_ADAPTER_INTERNAL_KEY`, `/v1/send` accepted proof, payment provider ref, mail `messageId`, D1/canonical row, inbox proof thật từ hai Gmail.
  - `BCC`: `OFF`
