# OMDALAT TEAM SYNC STATUS 2026-04-19

Phiên bản: WORKING  
Trạng thái: Team 1 kiểm tra sau Round 2 gate  
Phạm vi: Team 1, Team 2, Team 3

## 1. Tóm tắt chung

Round 2 hiện đã đạt mức sẵn sàng live ở lớp code, build và e2e chính.

Phần còn lại nằm ở 3 nhóm:

- khóa nốt tài liệu và ngôn ngữ phát hành
- xử lý bundle static legacy `apps/docs`
- mở đúng hạ tầng deploy Cloudflare Pages

## 2. Team 1

### Đã xong

- khóa codex ngôn ngữ tiếng Việt cho file phát hành
- hoàn thiện readiness cho i18n mở rộng
- locale registry tách rõ `public` và `planned`
- metadata, hreflang, sitemap, robots theo locale
- build Cloudflare cho `@omdalat/web` pass
- build Cloudflare cho `@omdalat/app` pass
- smoke locales pass

### Còn lại

- chốt deploy production thật khi Cloudflare đúng project và token
- giữ vai trò review cuối cho Team 2 và Team 3
- theo dõi archive hoặc rewrite bundle `apps/docs`

### Ghi chú

Team 1 hiện không còn blocker code ở active web/app.

## 3. Team 2

### Evidence đã có

- commit: `5632700`
- redirect canonical cho route legacy đã vào middleware
- `smoke-locales.spec.ts` pass `54 passed`
- `apps/web` typecheck pass theo evidence đã chốt

### Đánh giá

Team 2 đang đúng hướng ở public surface.

### Còn lại

- tiếp tục dọn bundle static legacy ngoài active Next surface nếu được giao
- giữ public UI không lệch codex khi vào vòng polish tiếp theo
- hỗ trợ Team 1 xác nhận homepage và core pages không còn drift wording

## 4. Team 3

### Evidence đã có

- commit: `af2374e`
- `member-review-queue.spec.ts` pass `4 passed`
- `moderation-pipeline.spec.ts` pass `3 passed`
- reviewed unlock flow đã mở đúng

### Đánh giá

Team 3 đang đúng logic member gate của Round 2.

### Còn lại

- thay storage demo cho review queue bằng storage bền hơn trước beta rộng hơn
- giữ noindex và access boundary chặt khi thêm resource mới
- phối hợp xác thực biến môi trường và token cho deploy production

## 5. Blocker chung hiện tại

### Blocker 1: Cloudflare Pages

Lệnh deploy đã chốt, nhưng deploy production thật chưa hoàn thành vì:

- project Cloudflare Pages hiện tại chưa khớp tên hoặc account context
- app deploy đang thiếu token hợp lệ trong môi trường hiện tại

### Blocker 2: Bundle static legacy

`apps/docs` vẫn là bundle static cũ:

- copy cũ
- canonical cũ
- route cũ
- không đại diện cho active surface hiện tại

Bundle này chưa chặn build active, nhưng cần archive hoặc rewrite trước beta rộng hơn.

## 6. Ưu tiên ngay sau file này

1. Xác thực project Cloudflare Pages thật cho `omdalat-web` và `omdalat-app`
2. Deploy production Round 2
3. Smoke production sau deploy
4. Chốt kế hoạch archive hoặc rewrite `apps/docs`
5. Team 3 lên kế hoạch storage bền cho review queue

## 7. Kết luận

Ba team hiện không còn lệch nhau ở logic nền.

Round 2 đã sẵn ở lớp build và kiểm thử chính.  
Điểm chưa xong nằm ở deploy production thật và phần legacy static ngoài active surface.
