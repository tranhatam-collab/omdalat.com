# OMDALAT APP RUNTIME SCOPE AND RESPONSIBILITIES 2026

Om Dalat / Ôm Đà Lạt  
Version: LOCKED  
Status: Production-ready  
Date updated: 2026-04-19  
Owner: Team 1

---

## 0) Tuyên bố khóa

Từ thời điểm này, chuẩn domain cho lớp runtime được khóa như sau:

- `https://ap.omdalat.com` là host canonical cuối.
- `https://app.omdalat.com` chỉ là host alias lịch sử cho “Ấp”, không phải product runtime riêng.
- `app.omdalat.com/*` phải redirect `308` sang `ap.omdalat.com/*` và giữ nguyên path + query.

Không triển khai logic nghiệp vụ mới trên `app.omdalat.com`.

---

## 1) Phân vai theo domain

### 1.1 `omdalat.com` (hệ tham gia)

Giữ vai trò:

- định vị hệ sống
- luồng tham gia
- trang public chính (Life, Work, Learning, Community, Stay, Join)
- tài liệu public và điều hướng vào hệ

Không giữ vai trò:

- site editorial dài hạn theo hướng tạp chí câu chuyện

### 1.2 `ap.omdalat.com` (lớp editorial canonical)

Giữ vai trò:

- con người
- nơi chốn
- nhịp sống
- hình ảnh
- câu chuyện Đà Lạt

Đây là nơi index SEO cho intent editorial.

### 1.3 `app.omdalat.com` (alias kỹ thuật)

Giữ vai trò:

- điểm vào tương thích ngược (backward compatibility)
- redirect chuẩn sang `ap.omdalat.com`

Không giữ vai trò:

- không render nội dung riêng
- không canonical riêng
- không sitemap riêng
- không là nguồn SEO chính

---

## 2) Quy tắc runtime bắt buộc

### 2.1 Host normalization

Mọi request vào:

- `app.omdalat.com`
- `www.app.omdalat.com`

phải trả về:

- `308 Location: https://ap.omdalat.com{pathname}{search}`

### 2.2 Canonical

- Trang canonical chỉ dùng host `ap.omdalat.com`.
- Không canonical chéo từ `ap` về `app`.
- Không tạo canonical tự tham chiếu trên host `app`.

### 2.3 Robots và indexing

- Redirect response từ `app.*` phải có `X-Robots-Tag: noindex, nofollow`.
- Nội dung editorial trên `ap.*` được index.
- Route member/internal (nếu có) vẫn `noindex` theo access model.

### 2.4 Cookie và session

- Không khóa session vào host `app.*`.
- Session/cookie domain theo chuẩn `.omdalat.com` nếu có nhu cầu liên bề mặt.
- Không tạo logic yêu cầu người dùng “ở lại app host cũ”.

---

## 3) Ranh giới trách nhiệm Team 2

Team 2 chịu trách nhiệm lớp giao diện và điều hướng người dùng:

1. Duy trì “bridge” từ `omdalat.com` sang `ap.omdalat.com` đúng ngữ cảnh.
2. Không đổi CTA chính của `omdalat.com` thành CTA editorial.
3. Footer phải có link “Ấp Đà Lạt / Ap Dalat” trỏ đúng `ap.omdalat.com`.
4. Contextual CTA chỉ đặt ở trang phù hợp (nhịp sống, nơi chốn, câu chuyện).
5. Không thêm link trực tiếp sang `app.omdalat.com` trong UI mới.
6. Không hardcode text public ngoài hệ locale (`vi`, `en`).

---

## 4) Ranh giới trách nhiệm Team 3

Team 3 chịu trách nhiệm lớp hạ tầng, middleware, SEO kỹ thuật:

1. DNS + Cloudflare binding cho `ap.omdalat.com` hoạt động thực.
2. Bật redirect `308` từ `app.*` sang `ap.*` ở lớp edge/runtime.
3. Giữ canonical/metadata trên host `ap.*`.
4. Kiểm tra robots/sitemap đúng vai trò từng host.
5. Không để route cũ hoặc host cũ trở thành nguồn index cạnh tranh.
6. Thêm kiểm thử tự động cho:
   - `app` -> `ap` redirect
   - giữ nguyên path/query
   - header `X-Robots-Tag`

---

## 5) Ma trận kiểm thử tối thiểu

### 5.1 DNS

- `dig +short ap.omdalat.com` phải có bản ghi hợp lệ.
- `dig +short app.omdalat.com` có thể tồn tại để phục vụ alias redirect.

### 5.2 HTTP

- `curl -I https://app.omdalat.com` trả `308` sang `https://ap.omdalat.com/`.
- `curl -I https://app.omdalat.com/some/path?a=1` giữ đúng path/query khi redirect.
- `curl -I https://ap.omdalat.com` trả `200` hoặc trạng thái hợp lệ của site live.

### 5.3 SEO kỹ thuật

- `ap.*` có canonical self-host đúng.
- `app.*` không xuất hiện trong sitemap canonical.
- Không có hreflang trỏ vào `app.*`.

---

## 6) Release gate (Go/No-Go)

Chỉ được chốt **Go production** khi đủ tất cả điều kiện:

1. `ap.omdalat.com` resolve DNS ổn định.
2. `app.omdalat.com` redirect `308` sang `ap.omdalat.com`.
3. `ap.omdalat.com` mở được nội dung live đúng bản build đã duyệt.
4. Canonical/robots/hreflang đúng vai trò.
5. Không còn link public mới trỏ sang `app.omdalat.com`.

Nếu thiếu một điều kiện trên: **No-Go**.

---

## 7) Quy tắc content và keyword giữa 2 bề mặt

Để tránh tự cạnh tranh SEO:

- `omdalat.com`: intent tham gia hệ (sống/làm/học/cộng đồng/tham gia).
- `ap.omdalat.com`: intent editorial (người/nơi/nhịp/ảnh/câu chuyện).

Không xuất bản hai bài gần trùng keyword chính trên hai host.

---

## 8) Báo cáo bắt buộc trước live vòng 2

Team 2 và Team 3 phải nộp cùng một gói evidence:

1. Ảnh chụp header/footer có link `ap`.
2. Kết quả curl redirect `app -> ap`.
3. Kết quả kiểm tra canonical và robots.
4. Kết quả test tự động pass (kèm tên test file).
5. Xác nhận không còn link mới dùng `app.omdalat.com` trong UI.

---

## 9) Câu chốt vận hành

`ap.omdalat.com` là nơi kể Đà Lạt theo chiều sâu đời sống.  
`omdalat.com` là nơi người dùng quyết định tham gia hệ.  
`app.omdalat.com` chỉ tồn tại để đưa traffic cũ về đúng canonical mới.

