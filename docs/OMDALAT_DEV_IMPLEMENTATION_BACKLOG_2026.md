# OMDALAT DEV IMPLEMENTATION BACKLOG 2026

Version: LOCKED  
Status: Developer execution backlog

---

## Sprint 0: Cleanup

- remove toàn bộ link `docs.omdala.com`
- remove toàn bộ link `app.omdala.com`
- remove wording `OMDALA`
- remove logic `node / global layer`
- remove khối `Docs / Help` cũ nếu chưa có `/docs` nội bộ
- remove các CTA cũ như `Mở app OMDALA`, `Đọc docs OMDALA`

Hiện trạng live cho thấy các link và wording đó vẫn còn trên homepage và `/vi`. Đây là P0.

---

## Sprint 1: Information Architecture

- build route mới
- build menu mới
- build footer mới
- build redirect map
- build `/member` route shell

---

## Sprint 2: Homepage Rewrite

- hero mới
- 4 trục hệ thống
- user segments
- CTA mới
- SEO metadata mới
- teaser member area mức nhẹ

---

## Sprint 3: Core Pages

- `/life`
- `/work`
- `/learning`
- `/community`
- `/stay`
- `/join`
- `/articles`

---

## Sprint 4: Public Docs + Member Access

- `/docs`
- getting started
- how it works
- community rules
- stay guide
- work guide
- FAQ
- register/login flow
- email verify
- profile completion
- member teaser cards

---

## Sprint 5: Member Resources + App Noi Bo

- `/member`
- investor overview
- operations
- handbook
- resources
- `/app`
- dashboard nhẹ
- profile
- apply/join flow
- basic records

---

## Sprint 6: CMS + Content + i18n

- connect collections
- add gated collections
- publish 30 bài đầu
- publish 5 guide pages
- locale metadata
- hreflang
- sitemap by locale

---

## Rule Cho Team DEV

- cleanup trước
- IA và language codex ngay sau cleanup
- public/member access model ngay sau IA
- homepage và core pages trước khi scale content
- `/docs`, `/member`, và `/app` phải nằm trong cùng hệ `omdalat.com`
