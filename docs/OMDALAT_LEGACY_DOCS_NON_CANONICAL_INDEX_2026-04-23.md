# OMDALAT LEGACY DOCS NON-CANONICAL INDEX — 2026-04-23

Version: v1.0.0
Status: LOCKED
Owner: Team 1
Scope: legacy documentation warning, canonical source guard, archive rule

---

## 0) Tuyên bố khóa

Một số tài liệu cũ trong `docs/` vẫn chứa chữ `OMDALA`, `city node`, `global layer`, `docs.omdala.com`, `app.omdala.com`, hoặc quyết định domain đã bị thay thế.

Từ thời điểm này, các tài liệu đó chỉ được dùng để đọc lịch sử thay đổi hoặc bằng chứng cleanup.

Không được dùng chúng làm nguồn triển khai nếu chúng mâu thuẫn với bộ canonical hiện tại.

---

## 1) Bộ canonical hiện tại

Team DEV chỉ triển khai theo các file sau khi có xung đột:

- `docs/OMDALAT_APP_RUNTIME_SCOPE_AND_RESPONSIBILITIES_2026.md`
- `docs/OMDALAT_UNIVERSAL_BILINGUAL_FINAL_LIVE_REPORT_2026-04-23.md`
- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md`
- `docs/OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md`
- `docs/OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md`
- `docs/OMDALAT_TEAM1_TEAM2_TEAM3_STATUS_CHECK_2026-04-23.md`
- `docs/TEAM3_FINAL_CLOSURE_2026-04-23.md`
- `RELEASE_CHECKLIST.md`

---

## 2) Domain decision hiện tại

Scope live hiện tại:

- `omdalat.com`: public web canonical
- `app.omdalat.com`: app/member runtime canonical
- `www.app.omdalat.com`: redirect canonical về `app.omdalat.com`

Không còn dùng:

- `docs.omdala.com`
- `app.omdala.com`
- bất kỳ domain `omdala.com` nào cho active Om Dalat flow

Ghi chú:

- `app.omdalat.com` vẫn thuộc cùng hệ domain `*.omdalat.com`.
- Nếu một tài liệu cũ nói app phải nằm ở `/app` trên root domain và mâu thuẫn với runtime hiện tại, runtime scope file mới thắng.

---

## 3) Ap Dalat / `ap.omdalat.com`

`ap.omdalat.com` là website editorial độc lập của Ấp Đà Lạt.

Nó không nằm trong scope build/deploy của repo `omdalat.com` hiện tại.

Nếu cần triển khai Ap Dalat, phải mở scope riêng.

---

## 4) Quy tắc archive

Một tài liệu được xem là legacy/non-canonical nếu có một trong các dấu hiệu:

- dùng `OMDALA` như hệ hiện hành thay vì historical reference,
- gọi Om Dalat là `city node`,
- trỏ active flow sang `docs.omdala.com` hoặc `app.omdala.com`,
- yêu cầu `app.omdalat.com` redirect sang `ap.omdalat.com`,
- yêu cầu build/deploy `ap.omdalat.com` trong repo này,
- yêu cầu public UI trộn tiếng Việt và tiếng Anh trong cùng một block.

Các tài liệu đó phải được hiểu là:

```text
NON_CANONICAL_REFERENCE_ONLY
```

---

## 5) Definition of done

Gate tài liệu cũ được xem là đóng khi:

- có file index non-canonical này,
- README handoff trỏ tới file này,
- master rebuild index trỏ tới file này,
- Team DEV được nhắc rằng canonical scope mới thắng mọi quyết định cũ.
