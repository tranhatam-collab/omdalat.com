# TEAM 3 LIVE STATUS — 2026-04-19

## 1) Cloudflare account + project + auth

Xác nhận qua `wrangler whoami` và `wrangler pages project list --json`:

- Account dùng deploy: `62d57eaa548617aeecac766e5a1cb98e`
- Token OAuth có scope `pages (write)` (không blocker token/account)
- Project tồn tại:
  - `omdalat-web` (domain hiện có: `omdalat-web-ezk.pages.dev`)
  - `omdalat-app` (domain hiện có: `omdalat-app-2ol.pages.dev`)

## 2) Build status (local) — 2026-04-19

### Web (`apps/web`)

- `next build`: PASS
- `next-on-pages --skip-build`: PASS

### App (`apps/app`)

- `next build --debug`: PASS
- `next-on-pages --skip-build`: PASS

Lưu ý: đã fix blocker type-check route export ở `apps/app/lib/routes.ts` để app build pass ổn định.

## 3) Deploy status (Cloudflare Pages) — 2026-04-19

Đã deploy thành công:

- `omdalat-web` -> `https://8e39c32a.omdalat-web-ezk.pages.dev`
- `omdalat-app` -> `https://74bac9bf.omdalat-app-2ol.pages.dev`

Kết luận deploy path:

- `project`: OK
- `token/account`: OK
- `wrangler deploy`: OK
- Không còn blocker cấp hạ tầng deploy.
- Lưu ý pipeline: web cần chạy `next-on-pages` **không** `--skip-build` để tạo đầy đủ edge routes.

## 4) Domain config snapshot (theo checklist live)

### `omdalat.com`

- DNS resolve: OK
- Host đang trả trang production cũ (legacy content vẫn còn).

### `ap.omdalat.com`

- DNS resolve: FAIL (`Could not resolve host`)
- Chưa được cấu hình/subdomain chưa tồn tại trên DNS.

### `app.omdalat.com`

- DNS resolve: OK
- Host có trả response runtime, nhưng không phải trạng thái cuối theo checklist mới.

## 4.1 Smoke trên preview deploy mới (Pages.dev)

`omdalat-web` preview (`8e39c32a...`) hiện đã đúng behavior kỳ vọng:

- `/` -> `308` về `/vi`
- `/vi` -> `200`, canonical + hreflang đúng
- `/robots.txt` -> `Disallow: /member /internal /admin`
- `/sitemap.xml` -> có route mới (ví dụ `/vi/docs/getting-started`)
- `/vi/member/operations` -> `302` về `/vi/member/application-status?required=reviewed-member...`

## 5) Production smoke snapshot (live domain hiện tại)

Ngày kiểm tra: **2026-04-19** (Asia/Ho_Chi_Minh)

### Canonical / hreflang

- `https://omdalat.com/vi`: `200`, có canonical + alternate (`vi/en/x-default`).

### robots / sitemap

- `https://omdalat.com/robots.txt`: `200`, rule hiện tại là legacy (`Disallow: /preview/`, `/staging/`).
- `https://omdalat.com/sitemap.xml`: `200`, vẫn liệt kê route legacy (`what-is-omdalat`, `work-and-opportunity`, `creative-economy`, ...).

### noindex / member gating

- `https://omdalat.com/vi/member/operations`: `404` (không mở luồng reviewed unlock như kỳ vọng live mới).
- `https://app.omdalat.com/vi/member/operations`: `404` (không đạt trạng thái gating đúng flow cuối).

### legacy redirect

- `https://omdalat.com/vi/what-is-omdalat`: `200` (chưa redirect cleanup)
- `https://omdalat.com/vi/work-and-opportunity`: `200` (chưa redirect cleanup)

## 6) Team 3 checklist status (thực tế)

1. Config domain `omdalat.com` và `ap.omdalat.com`: **PARTIAL**
   - `omdalat.com`: có
   - `ap.omdalat.com`: chưa có DNS
2. Build `om` pass + build `ap/app` pass: **PASS (local build)**
3. canonical / robots / sitemap / noindex đúng trên production: **FAIL (live vẫn legacy)**
4. Tracking/link `om -> ap`, `ap -> om`, bridge block, footer, CTA contextual: **PARTIAL (source mới có một phần, production chưa phản ánh)**
5. Deploy path thật không blocker project/token/account: **PASS**
6. Rollback note đã sẵn: **PASS** (đã có section rollback trong `docs/OMDALAT_AND_APDALAT_FULL_DEPLOY_CHECKLIST_2026.md`)

## 7) Việc còn lại để gọi là “live hoàn thiện thật”

1. Cấu hình DNS + custom domain đúng target `ap.omdalat.com` (hoặc chốt lại chuẩn cuối là `app.omdalat.com` rồi đồng bộ toàn bộ config).
2. Bind đúng custom domains vào Pages projects `omdalat-web` và `omdalat-app`.
3. Cutover production từ legacy runtime sang deploy mới (đúng project/domain mapping).
4. Re-smoke production sau cutover:
   - canonical
   - hreflang
   - robots
   - sitemap
   - noindex ở member/internal
   - member reviewed unlock
   - legacy redirect
5. Dọn sạch references legacy còn sót (`docs.omdala.com`/`app.omdala.com`) trước khi chốt release.
6. Chốt persistence bền cho Team 3 review queue (storage thực thay vì only in-memory demo).
