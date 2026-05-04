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

Team 1 xác nhận payload 3 bài launch đã có trong seed hiện tại, có thể dùng ngay để Team 2 bắt đầu render mà không cần chờ thêm:

1. `data/seed/articles.seed.json`
2. `data/seed/article-images.seed.json`

---

## 5. Lệnh bắt đầu ngày mai

```bash
pnpm validate:content-seed
pnpm --filter @omdalat/web validate:web-locales
pnpm --filter @omdalat/web validate:i18n-data
```

Sau khi pass local, Team 2 và QA tiếp tục smoke theo checklist lane.
