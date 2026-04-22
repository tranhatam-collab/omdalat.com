# OMDALAT TEAM1 INITIAL LIVE DECISION — 2026-04-22

Om Dalat / Ôm Đà Lạt  
Owner: Team 1  
Scope: `omdalat.com` + `app.omdalat.com`

---

## 1) Kết quả xác minh lõi runtime

### Web canonical

- `https://omdalat.com/` trả `308` sang `https://omdalat.com/vi`
- `https://omdalat.com/robots.txt` trả `200`
- `https://omdalat.com/sitemap.xml` trả `200`

### App canonical

- `https://app.omdalat.com/vi/member/login` trả `200`
- `x-robots-tag: noindex, nofollow` vẫn giữ đúng
- `https://app.omdalat.com/api/support` trả `200`

### Member gating

- `https://omdalat.com/vi/member/operations` trả `307` về:
  - `/vi/member/application-status?required=reviewed-member&next=%2Fmember%2Foperations`

---

## 2) Smoke production cuối trên canonical

Lệnh chạy:

```bash
SMOKE_RUNTIME_TARGET=live \
SMOKE_WEB_ORIGIN=https://omdalat.com \
SMOKE_APP_ORIGIN=https://app.omdalat.com \
npm run mail:smoke:e2e
```

Report pass:

- `reports/email-smoke/2026-04-22T02-03-56-746Z/summary.json`

Kết quả:

- `success: true`
- `5/5 flow pass`
- `runtimeTarget: live`
- `assertionMode: runtime`

---

## 3) Đối chiếu Team 2 và Team 3

### Team 2

- Đã nộp evidence canonical re-smoke UI/public: `34/34 passed`
- Team 1 chấp nhận lane này là **PASS**

### Team 3

- Blocker cũ `POST /api/support -> 502` trên `app.omdalat.com` đã hết
- App canonical hiện phục vụ đúng runtime member/app

---

## 4) Quyết định Team 1

**GO cho live bước đầu trên canonical runtime.**

Ý nghĩa của quyết định này:

1. `omdalat.com` và `app.omdalat.com` hiện có thể phục vụ lõi public + app đúng vai trò.
2. Có thể tiếp tục dev tổng thể trên nền live hiện tại mà không cần chờ thêm cutover hạ tầng lớn.

---

## 5) Những gì chưa đóng hẳn

Các mục sau không chặn `live bước đầu`, nhưng vẫn chặn việc xem release tổng là hoàn tất:

1. Báo cáo song ngữ cuối theo `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND` chưa đủ 10 mục.
2. `www.app.omdalat.com` chưa resolve DNS.
3. Local workspace build cần được chuẩn hóa lại dependency linking trước vòng build tiếp theo.

---

## 6) Trạng thái hoàn thành cập nhật

- Team 1: **96%**
- Team 2: **100% cho block canonical UI/public**, **92% cho rollout tổng**
- Team 3: **88%**
- Toàn kế hoạch live lõi hiện tại: **94%**

Phần còn lại chủ yếu là:

- hoàn tất release governance,
- chốt báo cáo song ngữ,
- dọn hạ tầng phụ trợ và workspace build.
