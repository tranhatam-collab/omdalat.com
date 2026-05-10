Om Dalat / Ôm Đà Lạt

Om Public Route Inventory Matrix

Version: v1.0.0

Status: TEMPLATE

Date updated: 2026-04-28

Owner: Team 2

Reviewer: Team 1

Scope: route inventory cho lane Om public

---

## 0. Mục đích

File này là matrix bắt buộc để Team 2 nộp cùng report lane Om public.

Không dùng file này để viết cảm nhận chung.
Dùng file này để kiểm từng route public bằng cùng một cột dữ liệu.

---

## 1. Cột bắt buộc

Mỗi route phải có:

* route
* locale
* page type
* H1
* title
* meta description
* canonical
* hreflang status
* primary CTA
* menu/footer state
* alt text status
* copy status
* QA status
* evidence path
* note

---

## 2. Matrix

| Route | Locale | Page type | H1 | Title | Meta description | Canonical | Hreflang | Primary CTA | Menu/Footer | Alt text | Copy status | QA status | Evidence path | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi` | `vi-VN` | `homepage` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi` | `EXPECTED__LOCALE_WIRED` | `Bắt đầu từ đây` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Canonical smoke pass `34/34`; homepage copy/CTA lock already covered by Team 2 smoke. |
| `/en` | `en` | `homepage` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en` | `EXPECTED__LOCALE_WIRED` | `Start here` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | English homepage passed public intro/H1/CTA lock. |
| `/vi/about` | `vi-VN` | `public-page` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi/about` | `EXPECTED__LOCALE_WIRED` | `See route context` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Route included in canonical smoke pass set. |
| `/en/about` | `en` | `public-page` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en/about` | `EXPECTED__LOCALE_WIRED` | `See route context` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Route included in canonical smoke pass set. |
| `/vi/join` | `vi-VN` | `join` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi/join` | `EXPECTED__LOCALE_WIRED` | `Đăng ký thành viên` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | CTA lock confirms `Đăng ký thành viên` and `Đọc hướng dẫn trước` replacement path. |
| `/en/join` | `en` | `join` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en/join` | `EXPECTED__LOCALE_WIRED` | `Register as a member` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | CTA lock confirms join CTA on English lane. |
| `/vi/contact` | `vi-VN` | `contact` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi/contact` | `EXPECTED__LOCALE_WIRED` | `Xem cách ở lại` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Contact VI/EN already noted by Team 1 as locale-split with metadata. |
| `/en/contact` | `en` | `contact` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en/contact` | `EXPECTED__LOCALE_WIRED` | `See stay options` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Contact route covered by smoke lock. |
| `/vi/docs` | `vi-VN` | `docs-index` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi/docs` | `EXPECTED__LOCALE_WIRED` | `See route context` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Docs index route included in public intro/H1 lock pass set. |
| `/en/docs` | `en` | `docs-index` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en/docs` | `EXPECTED__LOCALE_WIRED` | `See route context` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | English docs route included in public intro/H1 lock pass set. |
| `/vi/community` | `vi-VN` | `community` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/vi/community` | `EXPECTED__LOCALE_WIRED` | `Vào Ấp Đà Lạt` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Bridge Om -> Ap present through Team 2 public surface. |
| `/en/community` | `en` | `community` | `PASS` | `PRESENT__TEXT_AUDIT_NEXT` | `PRESENT__TEXT_AUDIT_NEXT` | `/en/community` | `EXPECTED__LOCALE_WIRED` | `Enter Ap Dalat` | `PASS` | `PENDING_AUDIT` | `PASS` | `PASS` | `docs/OMDALAT_TEAM2_OM_PUBLIC_REPORT_2026-04-28.md` | Bridge Om -> Ap present through Team 2 public surface. |

---

## 3. Rule điền

* `Copy status`: `PASS` / `MIXED_LANGUAGE` / `NEEDS_REWRITE`
* `Alt text`: `PASS` / `MISSING` / `WRONG_LOCALE`
* `QA status`: `PASS` / `BLOCKED` / `NOT_RUN`
* `Evidence path`: path report, screenshot, smoke summary, hoặc build evidence tương ứng
* Pre-fill baseline được phép dùng marker như `PRESENT__TEXT_AUDIT_NEXT` hoặc `EXPECTED__LOCALE_WIRED` khi route đã có evidence smoke/current-state nhưng chưa trích riêng full metadata text vào matrix.

---

## 4. Definition of done

Matrix này chỉ được xem là xong khi:

* mọi route public chính đều đã có dòng riêng
* không để `PENDING` ở route đã claim done
* evidence path khớp với report lane Om public
