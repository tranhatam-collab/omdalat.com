# OMDALAT UNIVERSAL BILINGUAL FINAL LIVE REPORT — 2026-04-23

Om Dalat / Ôm Đà Lạt

Version: v1.0.0
Status: DONE_CLOSED
Owner: Team 1
Scope: final bilingual language, SEO, UI copy, metadata, runtime evidence for `omdalat.com` and `app.omdalat.com`

---

## 0) Phạm vi chốt

Report này đóng gate `UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND` cho release Om/app hiện tại.

Trong scope:

- `https://omdalat.com`
- `https://app.omdalat.com`
- public web routes thuộc Om Dalat
- app/member runtime routes thuộc Om Dalat
- metadata, canonical, hreflang, noindex, CTA, H1, intro, footer, form/gate copy trong scope release hiện tại

Ngoài scope release này:

- `https://ap.omdalat.com` là website editorial độc lập của Ấp Đà Lạt.
- `apps/docs` static legacy được giữ ngoài release gate hiện tại và cần archive/rewrite ở phase riêng trước beta rộng hơn.
- payment production activation nằm ở Phase 2, không claim live trong release này.

---

## 1) Tổng số URL đã rà

Inventory nền:

- Web route template đã rà: `35`
- App route template đã rà: `12`
- Tổng route template nền: `47`

Gate public song ngữ đã khóa bằng browser smoke:

- Web public VI: `13` route chính
- Web public EN: `13` route chính
- Tổng URL public song ngữ trong regression lock: `26`

Các route public chính đã có H1 + intro lock:

- `/`
- `/about`
- `/life`
- `/work`
- `/learning`
- `/community`
- `/stay`
- `/articles`
- `/join`
- `/contact`
- `/docs`
- `/privacy`
- `/terms`

Evidence Team 2:

```bash
PREVIEW_BASE_URL=https://omdalat.com corepack pnpm --filter @omdalat/web exec playwright test e2e/team2-quick-qa.spec.ts e2e/public-intro-h1-cta-lock.spec.ts --config=playwright.preview.config.ts --reporter=line
```

Kết quả: `34/34 passed`.

---

## 2) Tổng số page đã sửa / chuẩn hóa

Team 2:

- Public homepage, footer, contextual CTA, intro/H1/CTA lock: `DONE`
- Browser smoke canonical: `34/34 passed`
- Public surface/re-smoke gate: `100%`

Team 3:

- App runtime, member guard, support API, email smoke, domain map: `DONE_CLOSED`
- `app.omdalat.com` + `www.app.omdalat.com`: canonical behavior pass
- Email live smoke runtime: `5/5`

Tổng scope đã chuẩn hóa cho release hiện tại:

- `47` route template nền đã đi qua review/scope gate
- `26` public locale URL chính đã đi qua browser language regression
- `12` app route template đã đi qua runtime/member/access scope review

---

## 3) Tổng số lỗi tiếng Việt đã sửa

Các nhóm lỗi đã đóng:

- Dấu vết brand cũ `OMDALA`: `0` còn lại trên homepage active theo Team 2 quick QA.
- Link cũ `docs.omdala.com`: `0` còn lại trên homepage active theo Team 2 quick QA.
- Link cũ `app.omdala.com`: `0` còn lại trên homepage active theo Team 2 quick QA.
- CTA cũ kiểu `Đọc hướng dẫn` trên flow chính: đã thay bằng CTA đúng ngữ cảnh.
- Locale VI thiếu key hoặc key rỗng: `0` theo validator.
- Placeholder/TODO/draft trong locale source: `0` theo validator.
- Cụm CTA marketing bị cấm trong locale VI: `0` theo validator.

Command evidence:

```bash
pnpm --filter @omdalat/web run validate:web-locales
```

Kết quả: `web locale validation passed. keys=14`.

---

## 4) Tổng số lỗi tiếng Anh đã sửa

Các nhóm lỗi đã đóng:

- Key EN thiếu so với VI: `0` theo validator.
- Key EN rỗng: `0` theo validator.
- Placeholder/TODO/draft trong locale EN: `0` theo validator.
- Cụm CTA sales/hype bị cấm trong locale EN: `0` theo validator.
- Public H1/intro/CTA EN trên route chính: pass theo browser regression.
- Footer bridge `Ap Dalat`: pass theo Team 2 quick QA.

Command evidence:

```bash
pnpm --filter @omdalat/web run validate:web-locales
pnpm --filter @omdalat/web run validate:i18n-data
```

Kết quả:

- `web locale validation passed. keys=14`
- `i18n data validation passed.`

---

## 5) Tổng số metadata đã chuẩn hóa

Metadata đã chốt trong scope hiện tại:

- Web canonical domain: `PASS`
- App canonical domain: `PASS`
- Web root redirect `omdalat.com -> /vi`: `PASS`
- App locale redirect `/member/login -> /vi/member/login`: `PASS`
- App login noindex: `PASS`
- Member guard redirect: `PASS`
- Public canonical/hreflang smoke: pass theo Team 2 locale smoke đã báo cáo.

Command evidence:

```bash
npm run cf:runtime-map:check
```

Kết quả mới nhất:

- `web canonical domain`: `PASS`
- `app canonical domain`: `PASS`
- `web root redirects to /vi`: `PASS`
- `app localized login robots noindex`: `PASS`
- `www.app canonical redirect`: `PASS`
- `member operations reviewed gate`: `PASS`
- `app support API lane`: `PASS`

---

## 6) Tổng số alt text đã chuẩn hóa

Trạng thái release hiện tại:

- Public route chính không còn blocker alt text P0 được báo cáo bởi Team 2.
- Image/caption/alt copy thuộc public surface đã được đưa vào scope review song ngữ.
- Các ảnh CMS động và editorial mở rộng sẽ tiếp tục theo publish rule: không publish nếu thiếu VI/EN/metadata/alt bắt buộc.

Quyết định gate:

- Không còn alt text P0 chặn live bước đầu.
- Alt text cho nội dung CMS mới là điều kiện publish liên tục, không phải blocker của release Om/app hiện tại.

---

## 7) Tổng số CTA/form/menu/footer đã chuẩn hóa

Đã chuẩn hóa và khóa bằng regression:

- Homepage CTA VI/EN
- Join CTA VI/EN
- Contact CTA VI/EN
- Footer bridge `Ấp Đà Lạt / Ap Dalat`
- Contextual CTA không trỏ ngược guide cũ
- Member gate/login/dashboard copy trong app scope
- Contact/support/join/magic link/email verification smoke flows

Evidence:

- `team2-quick-qa.spec.ts`: PASS
- `public-intro-h1-cta-lock.spec.ts`: PASS
- Team 2 canonical browser smoke: `34/34 passed`
- Email live smoke runtime: `5/5`

---

## 8) Danh sách page còn treo

Không còn page P0/P1 treo trong scope release Om/app hiện tại.

Các mục không claim trong release này:

1. `apps/docs` static legacy
   - Trạng thái: `OUT_OF_SCOPE_FOR_CURRENT_LIVE`
   - Lý do: không là active custom-domain runtime của release Om/app hiện tại.
   - Hành động sau: archive hoặc rewrite trước beta rộng hơn.

2. `ap.omdalat.com`
   - Trạng thái: `OUT_OF_SCOPE_FOR_OM_APP_RELEASE`
   - Lý do: website editorial độc lập của Ấp Đà Lạt.
   - Hành động sau: mở scope riêng cho Ap Dalat nếu cần.

3. Payment production activation
   - Trạng thái: `PHASE_2_NOT_IN_SCOPE`
   - Lý do: chưa đủ runtime secret/provider/D1/inbox proof để claim live.
   - Hành động sau: mở payment Phase 2.

---

## 9) Danh sách quyết định ngôn ngữ quan trọng đã khóa

- `docs/UNIVERSAL_BILINGUAL_LANGUAGE_REBUILD_COMMAND.md`
- `docs/OMDALAT_UNIVERSAL_BILINGUAL_EXECUTION_PLAN_2026-04-21.md`
- `docs/OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
- `docs/OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
- `docs/OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
- `docs/OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md`
- `docs/OMDALAT_APP_RUNTIME_SCOPE_AND_RESPONSIBILITIES_2026.md`
- `docs/TEAM3_FINAL_CLOSURE_2026-04-23.md`
- `apps/web/TEAM2_FINAL_HANDOFF_2026-04-23.md`

---

## 10) Xác nhận cuối

- [x] Đủ chuẩn tiếng Việt có dấu đầy đủ trong scope release hiện tại.
- [x] Đủ chuẩn tiếng Anh quốc tế trong scope release hiện tại, không dùng giọng máy dịch/hype theo validator và browser regression.
- [x] Đủ chuẩn SEO song ngữ cho public/runtime gate hiện tại: H1, title/meta/canonical/hreflang/noindex/internal flow được chốt theo evidence.
- [x] Đủ chuẩn live: không còn lỗi P0/P1 trong scope `omdalat.com` + `app.omdalat.com`.

---

## 11) Quyết định Team 1

Team 1 chốt:

```text
GO_FINAL_FOR_CURRENT_OM_APP_RELEASE
```

Điều kiện đi kèm:

- Không claim payment production live.
- Không đưa `ap.omdalat.com` vào scope deploy repo này.
- Không mở `apps/docs` legacy như public beta surface khi chưa archive/rewrite.
- Mọi nội dung CMS mới phải tiếp tục qua rule VI/EN/SEO/ALT trước khi publish.

---

## 12) Evidence bundle cuối

Commands đã chạy lại trong nhịp final:

```bash
pnpm --filter @omdalat/web run validate:web-locales
pnpm --filter @omdalat/web run validate:i18n-data
pnpm --filter @omdalat/web run validate:content-seed
npm run cf:runtime-map:check
```

Kết quả:

- `validate:web-locales`: `PASS`
- `validate:i18n-data`: `PASS`
- `validate:content-seed`: `PASS`
- `cf:runtime-map:check`: `PASS`

Evidence đã được Team 1 chấp nhận:

- Team 2 canonical browser smoke: `34/34 passed`
- Team 3 email runtime smoke: `5/5`
- Web build CF: `PASS`
- App build CF: `PASS`
