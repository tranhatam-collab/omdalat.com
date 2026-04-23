# OMDALAT TEAM 1 CHECK — TEAM 2 + TEAM 3 STATUS — 2026-04-23

Version: v1.0.0  
Status: ACTIVE  
Owner: Team 1  
Scope: kiểm tra báo cáo Team 2, Team 3 và nhiệm vụ còn lại trước khi đóng release tổng

---

## 0) Kết luận nhanh

Team 3 đã xử lý xong blocker `www.app.omdalat.com`.

Email live smoke đã có report mới `5/5`.

Payment đã được Team 3 khóa là `PHASE_2_NOT_IN_SCOPE`, nên không còn là blocker cho live hiện tại.

Phần còn lại để đóng release tổng nằm ở:

1. Team 2: báo cáo song ngữ cuối, alt text, metadata, inventory theo mẫu 10 mục.
2. Team 1: tổng hợp báo cáo cuối theo `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND`.
3. Team 3: giữ evidence runtime/noindex/publish rule và không mở payment UI ở release hiện tại.

---

## 1) Team 3 verification

### Runtime map

Lệnh:

```bash
npm run cf:runtime-map:check
```

Kết quả:

- Web runtime account: `PASS`
- App runtime account: `PASS`
- Web canonical domain: `PASS`
- App canonical domain: `PASS`
- Shadow project drift guard: `PASS`
- `www.app.omdalat.com` DNS resolves: `PASS`

### DNS + redirect

Lệnh:

```bash
dig +short www.app.omdalat.com
curl -I -sS https://www.app.omdalat.com/vi/member/login
curl -I -sS https://app.omdalat.com/vi/member/login
```

Kết quả:

- `www.app.omdalat.com` trả Cloudflare IP.
- `https://www.app.omdalat.com/vi/member/login` trả `HTTP/2 308`.
- Redirect đúng sang `https://app.omdalat.com/vi/member/login`.
- `https://app.omdalat.com/vi/member/login` trả `HTTP/2 200`.
- Header `x-robots-tag: noindex, nofollow` vẫn đúng.

### Email

Report mới:

```text
reports/email-smoke/2026-04-23T05-35-37-961Z/summary.json
```

Kết quả:

- `success=true`
- `runtimeTarget=live`
- `assertionMode=runtime`
- `5/5 flow pass`

### Payment

Team 3 release note:

```text
docs/TEAM3_RELEASE_NOTE_EMAIL_PAYMENT_2026-04-23.md
```

Kết luận:

- Payment = `PHASE_2_NOT_IN_SCOPE`
- Không có checkout/payment lane active trong release hiện tại.
- Không được ghi payment là đã live.
- Không còn coi payment là blocker cho release hiện tại.

### Team 3 status

Status: `WAITING_ON_FINAL_REPORT`

Team 3 cần giữ evidence cuối cho:

- runtime map,
- `www.app` redirect,
- noindex/member guard,
- email smoke,
- payment Phase 2 release note,
- publish rule song ngữ nếu có content indexable do Team 3 sở hữu.

---

## 2) Team 2 verification

### Đã pass

Theo evidence đã được Team 1 chấp nhận:

- Canonical UI/public: `PASS`
- Re-smoke public: `34/34 passed`
- Homepage/public intro/H1/CTA lock: `PASS`
- Team 2 public UI block: `100% done`

### Còn lại

Status: `ACTIVE`

Team 2 cần nộp báo cáo cuối cho:

- tổng số URL public đã rà,
- tổng số lỗi tiếng Việt đã sửa,
- tổng số lỗi tiếng Anh đã sửa,
- metadata đã chuẩn hóa,
- alt text đã chuẩn hóa,
- CTA/form/menu/footer đã chuẩn hóa,
- danh sách page còn treo nếu có,
- xác nhận `VI / EN / SEO / live` theo mẫu 10 mục.

Lệnh cần nhắc Team 2:

```bash
PREVIEW_BASE_URL=https://omdalat.com pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts
pnpm --filter @omdalat/web run validate:web-locales
```

Nếu không rerun được do dependency local, Team 2 phải trỏ tới evidence pass gần nhất và ghi rõ blocker local.

---

## 3) Team 1 next action

Status: `ACTIVE`

Team 1 phải:

1. gom báo cáo Team 2 + Team 3 vào báo cáo tổng song ngữ 10 mục,
2. cập nhật release checklist cuối,
3. chốt Go/No-Go release tổng sau khi Team 2 nộp phần inventory cuối,
4. không nhắc lại `www.app.omdalat.com` như blocker.

---

## 4) Phần trăm còn lại

Ước tính sau kiểm tra này:

- Team 1: `97%`
- Team 2: `94%`
- Team 3: `96%`
- Toàn hệ: `96%`

Phần còn lại chủ yếu là báo cáo tổng song ngữ và inventory cuối, không còn là blocker DNS/email/payment cho live bước đầu.
