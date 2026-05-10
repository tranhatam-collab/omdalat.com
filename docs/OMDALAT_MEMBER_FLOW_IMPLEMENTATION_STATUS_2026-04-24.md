Ôm Đà Lạt / Om Dalat

Member Flow + Dashboard Implementation Status

Date: 2026-04-24
Owner: Team 1
Status: CODE IMPLEMENTED / PACKAGING BLOCKED

⸻

1. Phạm vi đã triển khai trong app

Đã triển khai lớp member flow + dashboard theo spec `OMDALAT_MEMBER_FLOW_AND_DASHBOARD_2026.md` trong `apps/app`.

Các nhóm route chính đã có mặt:

* `/dashboard`
* `/member/register`
* `/apply`
* `/member/application-status`
* `/profile`
* `/stay`
* `/work`
* `/learning`
* `/resources`
* `/earnings`
* `/places`
* `/contributor`
* `/admin/review`

⸻

2. Trạng thái thành viên đã map vào hệ

* `guest`
* `registered`
* `profile_pending`
* `under_review`
* `trial`
* `active_member`
* `contributor`
* `host_partner`
* `operator`
* `admin`

⸻

3. Khối dữ liệu và điều hướng đã có

Đã có lớp dữ liệu và logic trong:

* `apps/app/lib/member-flow.ts`
* `apps/app/lib/member-session.ts`
* `services/auth/index.ts`
* `apps/app/lib/routes.ts`

Bao gồm:

* next-step logic theo trạng thái
* stay options
* work items
* learning programs
* resource access
* earnings seed
* place profiles
* contributor assignments
* admin review queue

⸻

4. API routes đã có

* `POST /api/auth/register`
* `POST /api/member/apply`
* `GET /api/member/me`
* `GET /api/work`
* `POST /api/work/apply`
* `GET /api/stay`
* `POST /api/stay/request`
* `GET /api/resources`
* `GET /api/earnings`
* `POST /api/places`
* `PATCH /api/places/:id`
* `GET /api/admin/review`
* `POST /api/admin/review/:id/action`

⸻

5. UI/copy đã chỉnh theo codex

Đã làm sạch thêm:

* nhãn contributor trong bản Việt
* cụm admin review trong bản Việt
* resource titles tiếng Việt
* dashboard/sidebar labels theo đúng vai trò

⸻

6. Kiểm chứng kỹ thuật

Đã xác nhận:

* `pnpm --filter @omdalat/app build` đi qua lớp chọn `next` đã sửa
* `scripts/build-cf.mjs` đã được harden để tránh các bản `next` lỗi trong `.pnpm`
* `build:cf` đi qua được `next build`

Chặn còn lại:

* `next-on-pages` / `vercel build` đang treo trong workspace hiện tại
* blocker này nằm ở packaging/runtime toolchain, chưa phải ở member flow code

⸻

7. Kết luận

Phần member flow + dashboard đã được dựng ở cấp code và route.

Việc còn lại để gọi là “build hoàn chỉnh” ở lane Cloudflare của app là:

1. xử lý treo `vercel build` / `next-on-pages`
2. sinh artifact `.vercel/output`
3. deploy lại `app.omdalat.com`

Cho tới thời điểm của file này:

* Code scope: gần hoàn chỉnh
* Runtime packaging: đang bị chặn bởi toolchain cục bộ
