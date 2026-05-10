# OMDALAT SCOPE REALIGNMENT OM + APP ONLY (2026-04-19)

Om Dalat / Ôm Đà Lạt  
Version: LOCKED  
Status: Production-ready  
Owner: Team 1

---

## 0. Mục tiêu

Khóa lại phạm vi triển khai của repo:

- `omdalat.com` (public web)
- `app.omdalat.com` (ứng dụng thành viên và vận hành)

`ap.omdalat.com` là website editorial độc lập, không build và không deploy trong repo này.

---

## 1. Quyết định khóa

1. Không còn bridge copy từ web sang `ap.omdalat.com` trong code active.
2. Canonical app trong repo này là `https://app.omdalat.com`.
3. Middleware app chỉ normalize host về `app.omdalat.com`, không redirect sang `ap`.
4. Test lock của Team 2 và Team 3 phải phản ánh đúng scope mới.

---

## 2. Bàn giao cho Team 2

Team 2 chịu trách nhiệm:

- dọn toàn bộ wording `Ấp Đà Lạt / Ap Dalat` trên bề mặt `omdalat.com` thuộc repo này
- cập nhật CTA theo luồng `join` + `member application`
- giữ footer/home copy nhất quán với language lock mới
- cập nhật regression e2e để chặn quay lại wording cũ

Tiêu chí pass:

- homepage không còn text `Ấp Đà Lạt` và `Ap Dalat`
- footer có entry rõ sang ứng dụng thành viên (`app`)
- e2e lock pass desktop + mobile

---

## 3. Bàn giao cho Team 3

Team 3 chịu trách nhiệm:

- xác nhận DNS + custom domain cho `app.omdalat.com`
- xác nhận deploy app project đúng domain binding
- xác nhận canonical/noindex/gating theo vai trò app
- xác nhận `www.app.omdalat.com` redirect `308` về `app.omdalat.com`

Tiêu chí pass:

- `dig +short app.omdalat.com` có bản ghi hợp lệ
- `curl -I https://app.omdalat.com/vi/member/login` trả trạng thái hợp lệ
- `curl -I https://www.app.omdalat.com/vi/member/login` trả `308` về host canonical

---

## 4. Release gate mới

Chỉ chốt Go khi đủ:

1. `pnpm --filter @omdalat/web build:cf` pass
2. `pnpm --filter @omdalat/app build:cf` pass
3. e2e lock quan trọng pass
4. deploy thành công `omdalat-web` + `omdalat-app`
5. smoke production pass cho `omdalat.com` và `app.omdalat.com`

Thiếu một điều kiện: No-Go.

---

## 5. Câu chốt Team 1

Repo này chỉ phục vụ hai bề mặt:

- nơi người dùng hiểu và tham gia hệ (`omdalat.com`)
- nơi người dùng đi vào quá trình thành viên và vận hành (`app.omdalat.com`)

Giữ ranh giới này thì release sạch, dễ vận hành và không trùng vai trò.
