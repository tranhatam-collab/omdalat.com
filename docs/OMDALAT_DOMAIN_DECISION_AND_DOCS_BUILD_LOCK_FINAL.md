# OMDALAT — DOMAIN DECISION + DOCS SYSTEM LOCK

Version: FINAL 1.0 (PRODUCTION LOCK)  
Status: IMMUTABLE  
Scope: toàn bộ hệ OMDALAT + OMDALA

---

# I. FINAL DECISION (KHÓA TUYỆT ĐỐI)

## DOMAIN STRUCTURE CHÍNH THỨC

Public Web (City Node):  
`https://omdalat.com`

Docs (Global System):  
`https://docs.omdala.com`

App (Runtime System):  
`https://app.omdala.com`

## QUYẾT ĐỊNH

Không sử dụng:

`https://app.omdalat.com`

## LÝ DO

- tránh phân mảnh hệ thống
- giữ OMDALA là global layer
- OMDALAT chỉ là city node
- docs + app phải thuộc global system

---

# II. SYSTEM ARCHITECTURE

## 3 LAYER CHÍNH

### 1. PUBLIC LAYER (OMDALAT)

`omdalat.com`

Vai trò:

- giới thiệu hệ
- thu hút user
- giải thích chương trình
- entry point

### 2. DOCS LAYER (OMDALA)

`docs.omdala.com`

Vai trò:

- giải thích hệ thống
- hướng dẫn sử dụng
- policy
- operator guide

### 3. APP LAYER (OMDALA)

`app.omdala.com`

Vai trò:

- runtime
- dashboard
- user actions
- data + proof

---

# III. LINK FLOW (BẮT BUỘC)

## FLOW CHUẨN

User vào `omdalat.com`  
→ đọc hệ thống  
→ click Docs → `docs.omdala.com`  
→ hiểu cách dùng  
→ click App → `app.omdala.com`  
→ thực hiện hành động

---

# IV. TOÀN BỘ LINK PHẢI SỬA

## DEV SEARCH & REPLACE

Tìm:

`app.omdalat.com`

Thay bằng:

`app.omdala.com`

Áp dụng cho:

- HTML
- JS
- API config
- metadata
- docs
- README
- sitemap

---

# V. REDIRECT SYSTEM (BẮT BUỘC)

## RULE

`app.omdalat.com/* -> app.omdala.com/*`

## CLOUDFLARE `_redirects`

```text
https://app.omdalat.com/* https://app.omdala.com/:splat 301
```

---

# VI. DOCS SYSTEM BUILD

## FOLDER STRUCTURE

```text
/apps/docs
  /index.html
  /getting-started.html
  /what-is-omdala.html
  /what-is-omdalat.html
  /how-it-works.html
  /programs.html
  /roles.html
  /policies.html
```

## DOCS MENU

- Overview
- What is OMDALA
- What is OMDALAT
- How it works
- Programs
- Roles
- Trust & Proof
- Policies
- Operator Guide

## NỘI DUNG DOCS PHẢI CÓ

### 1. SYSTEM OVERVIEW

- OMDALA là gì
- OMDALAT là gì
- city node concept

### 2. HOW IT WORKS

- join
- match
- action
- proof

### 3. PROGRAMS

- live & work
- remote work
- creative economy
- build

### 4. ROLES

- user
- creator
- host
- operator

### 5. TRUST SYSTEM

- proof
- verification
- trust layer

### 6. POLICIES

- community
- work
- place
- creator

### 7. OPERATOR GUIDE

- onboarding
- managing users
- managing places
- managing programs

---

# VII. LINKING RULE (RẤT QUAN TRỌNG)

## TỪ OMDALAT → DOCS

```html
<a href="https://docs.omdala.com/getting-started">Bắt đầu</a>
```

## TỪ DOCS → APP

```html
<a href="https://app.omdala.com">Open App</a>
```

## KHÔNG BAO GIỜ

- link docs → omdalat
- link app → omdalat

---

# VIII. SEO + CANONICAL

OMDALAT  
canonical: `omdalat.com`

DOCS  
canonical: `docs.omdala.com`

APP  
`noindex`

---

# IX. DEV IMPLEMENTATION PLAN

## STEP 1

- lock domain
- remove `app.omdalat.com`

## STEP 2

- build docs site

## STEP 3

- rewrite toàn bộ link

## STEP 4

- connect CTA

## STEP 5

- deploy Cloudflare

---

# X. QA CHECKLIST

## PHẢI PASS

- không còn link `app.omdalat.com`
- docs mở được
- app load đúng
- flow hoạt động

---

# XI. FINAL WARNING

Nếu không khóa domain:

→ hệ sẽ bị split  
→ user bị confuse  
→ SEO mất sức mạnh  
→ scale global thất bại

---

# XII. FINAL CONCLUSION

Đây là kiến trúc đúng:

- OMDALA = global system
- OMDALAT = city node
- DOCS + APP = global layer

---

# XIII. BƯỚC TIẾP THEO

Nếu founder xác nhận `BUILD DOCS FULL`, đội dev có thể tiếp tục viết full docs HTML cho `docs.omdala.com` theo menu, navigation, SEO, và structure đã khóa ở file này.
