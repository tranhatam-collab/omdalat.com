Om Dalat / Ôm Đà Lạt

Om Public Metadata Matrix

Version: v1.1.0

Status: ACTIVE

Date updated: 2026-04-29

Owner: Team 2

Reviewer: Team 1

Scope: text-level metadata extract cho lane Om public

---

## 0. Mục đích

File này dùng để trích rõ text-level metadata theo route.

Tất cả dòng ở đây phải là text cụ thể, không dùng marker chung như `PRESENT__TEXT_AUDIT_NEXT`.

---

## 1. Cột bắt buộc

* route
* locale
* title text
* meta description text
* canonical URL/path
* hreflang mapping
* status
* evidence path
* note

---

## 2. Matrix

| Route | Locale | Title text | Meta description text | Canonical | Hreflang mapping | Status | Evidence path | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi` | `vi-VN` | `Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt` | `Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây một nhịp sống có thể đi đường dài.` | `https://omdalat.com/vi` | `vi -> /vi, en -> /en, x-default -> /vi` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Extracted from canonical HTML on 2026-04-29 after deploy `f633122e`. |
| `/en` | `en` | `Om Dalat | Live and work in Dalat` | `Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build a life that lasts.` | `https://omdalat.com/en` | `vi -> /vi, en -> /en, x-default -> /vi` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Extracted from canonical HTML on 2026-04-29 after deploy `f633122e`. |
| `/vi/contact` | `vi-VN` | `Liên hệ Ôm Đà Lạt` | `Kênh liên hệ chính thức của Ôm Đà Lạt cho hỗ trợ, hợp tác, tham gia và các câu hỏi vận hành.` | `https://omdalat.com/vi/contact` | `vi -> /vi/contact, en -> /en/contact, x-default -> /vi/contact` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Route recovered on canonical (`HTTP 200`) on 2026-04-29 after deploy `f633122e`. |
| `/en/contact` | `en` | `Contact Om Dalat` | `The official contact channel for Om Dalat support, partnerships, participation, and operations questions.` | `https://omdalat.com/en/contact` | `vi -> /vi/contact, en -> /en/contact, x-default -> /vi/contact` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Route recovered on canonical (`HTTP 200`) on 2026-04-29 after deploy `f633122e`. |
| `/vi/docs` | `vi-VN` | `Hướng dẫn Ôm Đà Lạt` | `Điểm bắt đầu để hiểu hệ, cách tham gia và các quy tắc nền của Ôm Đà Lạt.` | `https://omdalat.com/vi/docs` | `vi -> /vi/docs, en -> /en/docs, x-default -> /vi/docs` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Extracted from canonical HTML on 2026-04-29 after deploy `f633122e`. |
| `/en/docs` | `en` | `Om Dalat Guides` | `The starting point for understanding the system, how to join, and the ground rules of Om Dalat.` | `https://omdalat.com/en/docs` | `vi -> /vi/docs, en -> /en/docs, x-default -> /vi/docs` | `PASS` | `docs/OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Extracted from canonical HTML on 2026-04-29 after deploy `f633122e`. |

---

## 3. Rule điền

* `Status` dùng: `PASS`, `NEEDS_FIX`, `PENDING_AUDIT`.
* `Hreflang mapping` phải ghi rõ cặp locale đang nối tới route nào.
* Không để `PENDING_TEXT` ở route đã claim `PASS`.

---

## 4. Definition of done

Matrix này được xem là complete khi:

* các route P0 có text-level metadata đầy đủ
* canonical/hreflang ghi cụ thể theo route
* status `PASS` có evidence path tương ứng
