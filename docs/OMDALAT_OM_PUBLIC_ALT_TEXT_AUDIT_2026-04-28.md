Om Dalat / Ôm Đà Lạt

Om Public Alt Text Audit

Version: v1.1.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 2

Reviewer: Team 1

Scope: alt text audit cho ảnh public surface Om

---

## 0. Mục đích

File này dùng để audit alt text route-by-route cho các ảnh public quan trọng.

---

## 1. Cột bắt buộc

* route
* locale
* image reference
* alt text
* alt locale status
* semantic quality
* status
* evidence path
* note

---

## 2. Audit table

| Route | Locale | Image reference | Alt text | Alt locale status | Semantic quality | Status | Evidence path | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi` | `vi-VN` | `homepage-hero-primary` | `Toàn cảnh Đà Lạt trong sương sớm` | `PASS` | `PASS` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Canonical homepage image alt extracted on 2026-04-29 after deploy `f633122e`. |
| `/en` | `en` | `homepage-hero-primary` | `A wide view of Dalat in the early mist` | `PASS` | `PASS` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Canonical homepage image alt extracted on 2026-04-29 after deploy `f633122e`. |
| `/vi/contact` | `vi-VN` | `contact-surface-images` | `N/A (no inline public image on page)` | `N/A` | `N/A` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Route recovered (`HTTP 200`) and no inline `img` tags found in rendered contact page. |
| `/en/contact` | `en` | `contact-surface-images` | `N/A (no inline public image on page)` | `N/A` | `N/A` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Route recovered (`HTTP 200`) and no inline `img` tags found in rendered contact page. |
| `/vi/docs` | `vi-VN` | `docs-surface-images` | `N/A (no inline public image on page)` | `N/A` | `N/A` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Docs page rendered without inline `img` tags on 2026-04-29. |
| `/en/docs` | `en` | `docs-surface-images` | `N/A (no inline public image on page)` | `N/A` | `N/A` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Docs page rendered without inline `img` tags on 2026-04-29. |

---

## 3. Rule điền

* `Alt locale status`: `PASS`, `WRONG_LOCALE`, `MISSING`, `N/A`.
* `Semantic quality`: `PASS`, `TOO_GENERIC`, `MISMATCHED`, `N/A`.
* `Status`: `PASS`, `NEEDS_FIX`, `PENDING_AUDIT`.
* Nếu route không có ảnh, ghi `N/A` rõ trong `alt text` và `note`.

---

## 4. Definition of done

Audit này được xem là complete khi:

* route ảnh P0 đã có alt text cụ thể
* không còn `PENDING_AUDIT` ở route đã claim complete
* các lỗi locale/semantic đã được đánh dấu rõ
