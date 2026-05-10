# TEAM 3 LIVE STATUS — 2026-04-19 (Updated)

## 1) Cloudflare account + project + auth

Xác nhận bằng `wrangler whoami` + `wrangler pages project list --json`:

- OAuth token: hoạt động, có `pages (write)`.
- Các account có trong token:
  - `62d57eaa548617aeecac766e5a1cb98e`
  - `93112cc89181e75335cbd7ef7e392ba3`
  - `f3f9e76222dcb488d5e303e29e8ba192`
- Quan sát thực tế cho thấy **trùng tên project giữa nhiều account**:
  - Cụm preview Team 3 đang deploy: `omdalat-web-ezk.pages.dev`, `omdalat-app-2ol.pages.dev`
  - Cụm account khác đang gắn domain live: `omdalat-web.pages.dev` (`omdalat.com`), `omdalat-app.pages.dev` (`app.omdalat.com`)

Kết luận: token hợp lệ, nhưng có **blocker chọn đúng account/project live** trước cutover cuối.

## 2) Build status (Team 3)

### Web (`apps/web`)

- `next-on-pages` (full build): PASS

### App (`apps/app`)

- `next-on-pages` (full build): PASS
- Có flaky `Next.js SIGSEGV` khi build, rerun là pass (đã xác nhận trong cùng ngày).

## 3) Deploy status (Cloudflare Pages)

Deploy thành công mới nhất (cụm preview Team 3):

- Web: `https://aa31023e.omdalat-web-ezk.pages.dev`
- App: `https://32c690a9.omdalat-app.pages.dev` (đã dùng để xác nhận middleware redirect host + AP tracking)

Lưu ý: deployment list trong CLI vẫn hiển thị cụm `*-ezk/*-2ol`, nên cần chốt dứt điểm account/project live trước release cutover.

## 4) Team 3 fix vừa chốt

### 4.1 Khóa naming `ap.omdalat.com` (không dùng `app` làm canonical host)

- `packages/core/config.ts`: `appOrigin` default = `https://ap.omdalat.com`
- App metadata canonical/hreflang trên preview app đã trỏ `https://ap.omdalat.com/...`

### 4.2 Bridge tracking hai chiều

- `om -> ap`: đã có `from=om`, `entry`, `utm_source=omdalat-web`, `utm_medium=bridge`, `utm_campaign=surface-handoff`.
- `ap -> om`: đã có `from=ap`, `entry`, `utm_source=ap-omdalat`, `utm_medium=bridge`, `utm_campaign=surface-handoff`.
- Đã gắn ở header/footer + CTA contextual theo luồng chính.

### 4.3 Legacy host redirect (`app.omdalat.com`)

- Đã thêm redirect cứng trong `apps/app/middleware.ts`:
  - `app.omdalat.com/*` -> `https://ap.omdalat.com/*` (HTTP `308`)
- Smoke xác nhận:
  - `https://app.omdalat.com/vi/member/login` -> `308` sang `https://ap.omdalat.com/vi/member/login`

## 5) Smoke snapshot

## 5.1 Preview web (`aa31023e...`)

- `/vi` -> `200`, canonical + hreflang đúng
- `/robots.txt` -> `200`, rule mới (`Disallow: /member`, `/internal`, `/admin`)
- `/sitemap.xml` -> `200`, route map mới
- Legacy redirect:
  - `/vi/what-is-omdalat` -> `308` `/vi/about`
  - `/vi/work-and-opportunity` -> `308` `/vi/work`
  - `/vi/creative-economy` -> `308` `/vi/learning`
- Reviewed unlock:
  - guest/member pending -> `/vi/member/operations` bị gate về `/vi/member/application-status?...required=reviewed-member`
  - verified_member approved -> `/vi/member/operations` trả `200`

## 5.2 Preview app (`32c690a9...`)

- `/vi/member/login` -> `200`
- `x-robots-tag: noindex, nofollow` + `<meta name="robots" content="noindex, nofollow">`
- canonical/hreflang trỏ `https://ap.omdalat.com/...`
- Header/footer có link tracking `ap -> om` (đủ `from=ap`, `entry`, `utm_source=ap-omdalat`, ...)

## 5.3 Live domains hiện tại

- `omdalat.com`: resolve OK nhưng đang trả **legacy runtime cũ** (còn `docs.omdala.com`, `app.omdala.com`).
- `ap.omdalat.com`: **chưa resolve DNS** (curl fail `Could not resolve host`).
- `app.omdalat.com`: resolve OK, hiện đã redirect 308 sang `ap.omdalat.com` theo rule mới.

## 6) Team 3 checklist status (thực tế)

1. Config domain `omdalat.com` và `ap.omdalat.com`: **PARTIAL**
   - `omdalat.com`: có DNS nhưng chưa cutover runtime mới
   - `ap.omdalat.com`: chưa có DNS active
2. Build om pass, build ap pass: **PASS**
3. canonical / robots / sitemap / noindex đúng: **PASS trên preview**, **FAIL trên live domain chính**
4. Tracking `om -> ap`, `ap -> om`, bridge block, footer, CTA contextual: **PASS trên preview**
5. Deploy path thật Cloudflare (project/token/account): **PARTIAL** (token OK, nhưng còn blocker chọn account/project live đúng để cutover)
6. Rollback note: **PASS** (đã có trong `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`)

## 7) Việc còn lại để production cutover

1. Bật DNS cho `ap.omdalat.com` (record active + propagate).
2. Chốt **một** account Cloudflare live duy nhất cho OMDALAT (tránh split project cùng tên giữa nhiều account).
3. Bind custom domains vào đúng Pages projects của account đã chốt:
   - `omdalat.com` -> `omdalat-web`
   - `ap.omdalat.com` -> `omdalat-app`
4. Cutover `omdalat.com` khỏi legacy runtime cũ sang deploy mới của Team 3.
5. Re-smoke sau cutover trên domain thật:
   - canonical/hreflang
   - robots/sitemap
   - noindex app/member/internal
   - reviewed unlock
   - legacy redirects
6. Chốt storage bền cho review queue (thay cho fixture-only/in-memory nếu mục tiêu là live thật).

## 8) Update Team 3 cuối phiên (2026-04-19)

### Đã chốt trong codebase

- Hoàn tất pass metadata cho toàn bộ route trong `apps/app`:
  - thêm helper `apps/app/lib/metadata.ts` (canonical/hreflang/noindex theo route).
  - thêm `generateMetadata` cho tất cả `apps/app/app/**/page.tsx`.
- Dọn copy dashboard/gate theo hướng production wording (không còn ngôn ngữ demo/fixture ở các route chính).
- Gate map xác nhận đúng:
  - `/`, `/dashboard`, `/profile` => `signed_in`
  - `/proofs` => `reviewed`
  - `/member/login`, `/member/application-status` => mở công khai để vào luồng gate.

### Build snapshot cuối phiên

- `pnpm --filter @omdalat/web exec next build --no-lint`: PASS
- `pnpm --filter @omdalat/app exec next build --no-lint`: PASS
- `next-on-pages`: bị chặn bởi môi trường sandbox hiện tại (không resolve `registry.npmjs.org`), chưa thể xác nhận lại deploy artifact trong phiên này.

### Smoke production snapshot cuối phiên

- `app.omdalat.com` => `308` sang `https://ap.omdalat.com/...` + `x-robots-tag: noindex, nofollow` (PASS theo mục tiêu bridge host).
- `ap.omdalat.com`: DNS chưa resolve (BLOCKER).
- `omdalat.com`: vẫn đang serving runtime cũ (còn route legacy và link `docs.omdala.com` / `app.omdala.com`), chưa cutover Team 3.
- `wrangler pages project list --json` ở account hiện tại cho thấy:
  - `omdalat-web` chỉ có `omdalat-web-ezk.pages.dev`
  - `omdalat-app` chỉ có `omdalat-app-2ol.pages.dev`
  - chưa thấy custom domain binding `omdalat.com` / `ap.omdalat.com` trong account này.

### Go/No-Go (hiện tại)

- **NO-GO cho production cutover** cho đến khi:
  1. DNS `ap.omdalat.com` hoạt động.
  2. Chốt account Cloudflare live đúng và bind custom domains vào đúng Pages projects.
  3. Re-smoke production pass đầy đủ canonical/hreflang/noindex/redirect/gate trên domain thật.
