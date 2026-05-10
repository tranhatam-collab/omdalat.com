# OMDALAT APP RUNTIME SCOPE AND RESPONSIBILITIES 2026

Om Dalat / Ôm Đà Lạt  
Version: LOCKED  
Status: Production-ready  
Date updated: 2026-04-19  
Owner: Team 1

---

## 0) Tuyên bố khóa

Phạm vi repo `omdalat.com` được khóa như sau:

- `https://omdalat.com` là public web cho toàn hệ.
- `https://app.omdalat.com` là ứng dụng thành viên và vận hành cho toàn hệ.
- `https://ap.omdalat.com` là website editorial độc lập, ngoài phạm vi build/deploy của repo này.

Mọi quyết định deploy trong repo này chỉ nhắm vào `omdalat.com` và `app.omdalat.com`.

---

## 1) Phân vai theo domain

### 1.1 `omdalat.com` (public web)

Giữ vai trò:

- định vị hệ sống
- trang public chính (Sống, Làm, Học, Cộng đồng, Ở lại, Tham gia)
- content public, FAQ, docs public
- điều hướng người dùng vào luồng tham gia

Không giữ vai trò:

- dashboard vận hành
- tài nguyên member sâu
- luồng nội bộ

### 1.2 `app.omdalat.com` (application canonical)

Giữ vai trò:

- đăng nhập/đăng ký member
- trạng thái hồ sơ và review
- member resources theo phân quyền
- operations workspace và dashboard

Yêu cầu bắt buộc:

- canonical dùng host `app.omdalat.com`
- route member/internal đều `noindex`
- không dùng như site editorial công khai

### 1.3 `ap.omdalat.com` (ngoài phạm vi repo)

- không build tại repo này
- không deploy từ pipeline repo này
- không làm release gate của Team 1 trong repo này

---

## 2) Quy tắc runtime bắt buộc

### 2.1 Host normalization cho app

- `www.app.omdalat.com/*` phải redirect `308` sang `https://app.omdalat.com/*`
- giữ nguyên `pathname` và `query`
- redirect response có `X-Robots-Tag: noindex, nofollow`

### 2.2 Canonical và hreflang

- public pages canonical theo `omdalat.com`
- app pages canonical theo `app.omdalat.com`
- không canonical chéo giữa web và app trừ khi có redirect bắt buộc

### 2.3 Robots và indexing

- public routes (`omdalat.com`) được index
- member/internal routes (`app.omdalat.com`) `noindex, nofollow`
- không đưa route member/internal vào sitemap public

---

## 3) Trách nhiệm Team 2 (Web)

Team 2 chịu trách nhiệm:

1. Không còn bridge copy hoặc CTA sang `ap.omdalat.com` trong bề mặt web thuộc repo này.
2. CTA sang ứng dụng phải trỏ `app.omdalat.com` qua helper chuẩn.
3. Header/footer/homepage giữ đúng giọng Om Dalat, không trộn vai trò editorial ngoài phạm vi.
4. Regression test phải khóa:
   - không còn text `Ấp Đà Lạt / Ap Dalat` trên homepage web của repo này
   - không còn link `ap.omdalat.com`

---

## 4) Trách nhiệm Team 3 (App + Infra)

Team 3 chịu trách nhiệm:

1. `app.omdalat.com` là host canonical của ứng dụng.
2. Middleware app không redirect `app` sang `ap`.
3. Cloudflare Pages binding cho app dùng đúng custom domain `app.omdalat.com`.
4. Smoke test production cho app gồm:
   - canonical/hreflang đúng host
   - gate/noindex đúng role
   - login/register/application-status hoạt động

---

## 5) Ma trận kiểm thử tối thiểu

### 5.1 DNS

- `dig +short omdalat.com` có bản ghi hợp lệ
- `dig +short app.omdalat.com` có bản ghi hợp lệ

### 5.2 HTTP

- `curl -I https://omdalat.com/vi` trả trạng thái hợp lệ
- `curl -I https://app.omdalat.com/vi/member/login` trả trạng thái hợp lệ
- `curl -I https://www.app.omdalat.com/vi/member/login` trả `308` sang `app.omdalat.com`

### 5.3 SEO kỹ thuật

- `omdalat.com` có canonical/hreflang public đúng locale
- `app.omdalat.com` có `X-Robots-Tag: noindex, nofollow` cho route member/internal
- sitemap public không chứa route app/member/internal

---

## 6) Release gate (Go/No-Go)

Chỉ chốt **Go production** khi đủ:

1. `omdalat.com` và `app.omdalat.com` đều resolve DNS ổn định.
2. Build + deploy mới nhất pass cho cả `@omdalat/web` và `@omdalat/app`.
3. Smoke production pass:
   - canonical/hreflang đúng host
   - noindex/gating đúng vai trò
   - legacy host redirect đúng (nếu có)
4. Không còn link `ap.omdalat.com` trong web/app thuộc repo này.

Thiếu một điều kiện: **No-Go**.

---

## 7) Câu chốt vận hành

`omdalat.com` là nơi người dùng hiểu và tham gia hệ.  
`app.omdalat.com` là nơi người dùng đi vào vận hành và tiến trình thành viên.  
`ap.omdalat.com` là website độc lập ngoài phạm vi build/deploy của repo này.
