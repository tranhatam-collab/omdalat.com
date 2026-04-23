# Team 2 Final Handoff - 2026-04-23

Version: v1.1.0
Status: DONE
Owner: Team 2
Reviewer: Team 1
Scope: public UI, bilingual surface report, validation gates, final browser smoke status

---

## 0. Team 1 intake decision

Team 1 đã nhận báo cáo Team 2.

Trạng thái hiện tại:

- Public code/UI surface: `PASS_NEAR_DONE`
- Validation gates: `PASS`
- Live claim mới: `PUBLIC_SURFACE_LIVE_READY`
- Payment/live evidence: thuộc Team 3, Team 2 không claim
- Browser re-smoke cuối: `PASS`
- Inventory định lượng theo mẫu bắt buộc: `STATUS_REPORT_RECEIVED`, vẫn nên bổ sung số URL, metadata, alt text, CTA/form/menu/footer nếu muốn khóa tuyệt đối theo mẫu audit

Team 2 được Team 1 đánh dấu `DONE` cho public surface/re-smoke gate lúc `2026-04-23 19:56 +07`.

---

## 1. Public homepage lock

VI: Homepage active đã được khóa theo wording mới, không còn claim `OMDALA`, `docs.omdala.com`, `app.omdala.com`.

EN: Active homepage is locked to the new wording, with no `OMDALA`, `docs.omdala.com`, or `app.omdala.com` claim.

---

## 2. Bridge block

VI: Bridge `Ấp Đà Lạt / Ap Dalat` đã có trên footer và CTA community.

EN: `Ấp Đà Lạt / Ap Dalat` bridge is present in footer and community CTA.

---

## 3. Footer

VI: Footer đã dọn wording cũ `Docs / Hướng dẫn`, thay bằng `Lối vào hệ / Entry path`.

EN: Footer legacy `Docs / Guide` wording was replaced with `Entry path`.

---

## 4. Contextual CTA

VI: CTA contextual giữ đúng flow tham gia, không trỏ ngược guide cũ làm vỡ funnel.

EN: Contextual CTA keeps the join flow intact and does not fall back to old guide wording.

---

## 5. Public intro, H1, CTA lock

VI: Lock suite đã được cập nhật để bảo vệ intro, H1, CTA cho các route public chính.

EN: Lock suite protects intro, H1, and CTA across key public routes.

---

## 6. Member review pipeline

VI: Reviewer pipeline đã được chuẩn hóa ở block trước; queue/member status không claim live mới.

EN: Reviewer pipeline was standardized in the previous block; queue/member status makes no new live claim.

---

## 7. Legacy cleanup

VI: Đã dọn file duplicate legacy `member-review-queue 2.ts`.

EN: Removed duplicate legacy file `member-review-queue 2.ts`.

---

## 8. Validation gates

Team 2 báo cáo:

- `validate:web-locales`: PASS
- `validate:i18n-data`: PASS
- `validate:content-seed`: PASS

Team 1 rerun tại 2026-04-23:

```bash
pnpm --filter @omdalat/web run validate:web-locales
pnpm --filter @omdalat/web run validate:i18n-data
pnpm --filter @omdalat/web run validate:content-seed
```

Kết quả:

- `web locale validation passed. keys=14`
- `i18n data validation passed.`
- `content seed validation passed.`

---

## 9. Browser smoke status

VI: Canonical browser smoke đã chạy lại ngoài sandbox trên `https://omdalat.com` và pass `34/34`.

EN: Canonical browser smoke was rerun outside the sandbox against `https://omdalat.com` and passed `34/34`.

Evidence mới nhất được Team 1 chấp nhận:

```bash
PREVIEW_BASE_URL=https://omdalat.com corepack pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts --reporter=line
```

- `team2-quick-qa.spec.ts`: PASS
- `public-intro-h1-cta-lock.spec.ts`: PASS
- Tổng: `34/34 passed (1.7m)`

Trạng thái hiện tại:

- `DONE`

---

## 10. Live readiness

VI: Team 2 code/public surface đạt `100%` trong scope public surface/re-smoke gate.

EN: Team 2 code/public surface is `100%` within the public surface/re-smoke gate scope.

---

## 11. Latest Team 2 report intake

Team 1 nhận báo cáo mới từ Team 2:

- `validate:web-locales`: `PASS`
- `validate:i18n-data`: `PASS`
- `validate:content-seed`: `PASS`
- Playwright CLI: `PASS`, chạy được `Version 1.58.2`
- Playwright dependency: `PASS`, đã sạch theo báo cáo Team 2
- Code Team 2/public surface: ổn định, không có diff mới trong các file Team 2 vừa kiểm tra
- Browser smoke ngoài sandbox trên canonical thật: `PASS 34/34`
- Team 3/payment: Team 2 không claim live payment
- Báo cáo song ngữ 10 mục: đã gửi ở nhịp trước
- Trạng thái Team 2: `100%` cho public surface/re-smoke gate

---

## 12. Closure notes

Team 2 đã đóng public surface/re-smoke gate.

Không claim:

- payment live,
- app/member runtime,
- strict outbox,
- external payment activation.

Các phần đó tiếp tục theo Team 3/Team 1 evidence.
