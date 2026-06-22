# OMDALAT_DEV_LOOP_AND_CONTENT_PLAN_2026-06-19

Three things in one plan, for the AI dev team + founder:
1. **Audit of `AUDIT_ALL_PLANS_OMDALAT_2026-06-19.md`** (against ground truth).
2. **Continuous AI dev loop** — how the team builds in repeatable cycles under gates.
3. **Full content series backlog** — the complete suggested article list to build.
+ **My standing QA role** — how I audit each cycle and report.

Ground-truthed 2026-06-19 (tests run, seeds/live read). Reports are not evidence.

---

## PART 1 — Audit of the "AUDIT_ALL_PLANS" report

| Report claim | Ground truth (verified) | Verdict |
|---|---|---|
| "QA claims unverified — chưa chạy `npx vitest run`" | **I ran it: 2 files, 25/25 pass** (C3 gate, renderer /stay, compliance-update route). | ✅ Now verified — they pass. |
| "Compliance All Pending — 5/5 Lily fields pending, cần Founder evidence" | Committed `seed_lily.sql`: `lodging_compliance/business_registration/pccc = 'verified'`, others `not_applicable`, `publication_status='published'`. **None are 'pending'.** | ❌ **FALSE vs repo** — and reveals a bypass (below). |
| "No Unified Source of Truth / many docs disagree" | Confirmed — this very report disagrees with the seed. | ✅ Accurate (ironically self-demonstrated). |
| "DNS lily not configured / không resolve" | Inconsistent with prior turns where `lily.omdalat.com` served a live microsite; target also drifted (`→ omdalat.com` vs `→ brand.omdalat.com`). | ⚠️ Re-verify; status unreliable. |
| "Frontend overstated (web 2/10, app 4/10), Content 0/30, 0/100 images" | Plausible, not exhaustively re-checked here; content backlog addressed in Part 3. | ⚠️ Treat as directional. |
| "Sprint 0 blocked (build trace / deploy ETIMEDOUT)" | Not reproduced here. | ❓ Dev to confirm with logs. |

### 🔴 The finding that overrides the report: a compliance bypass is now in git
`commit 3d012bd` added an **evidence-required, super-admin, audited** route to set
compliance (good — exactly the fix for the integrity problem). **But** `seed_lily.sql`
hardcodes `lodging_compliance='verified'` (+ `published`) with **no `compliance_evidence`
rows** — sidestepping that route and the AGENTS.md "no manual update" rule. Effect: a
lodging brand seeded as legally-verified-and-published **without any evidence**, in the
committed repo. The 25 tests don't catch it because they test the *gate logic with
verified input*, not whether a `verified` value is *backed by evidence*.

**This is the same bypass, relocated from prod hand-edits into the seed file.** It must be
closed structurally (Part 2, CI guard G4), or every gate we built is decorative.

---

## PART 2 — Continuous AI dev loop

A repeatable cycle the AI dev team runs. Each loop ships one vertical slice and **cannot
close** until its gates + tests + truth checks pass. I (QA) audit at the marked points.

### 2.1 The loop (one cycle = one slice)

```
PLAN → BUILD → SELF-TEST → CI GATES → QA AUDIT → MERGE → DEPLOY → VERIFY-LIVE → RETRO
  ▲                                                                                │
  └──────────────────────────  next slice  ◄──────────────────────────────────────┘
```

1. **PLAN** — pick ONE slice from the backlog (Part 3 or feature list). Write its
   acceptance criteria + the negative tests it must pass *before* coding.
2. **BUILD** — implement; copy lives in **data (`content_blocks`/CMS), not hardcoded TS**.
3. **SELF-TEST** — `npx vitest run` green locally; add the slice's negative tests.
4. **CI GATES (G1–G6, §2.3)** — must all pass; a red gate blocks merge.
5. **QA AUDIT (me)** — I ground-truth: run tests, diff repo vs claim, check gates honored,
   check UI denylist. I publish a short verdict (✅/❌ + evidence). No "✅ CLOSED" without it.
6. **MERGE → DEPLOY → VERIFY-LIVE** — after deploy, curl the live URL; prod must == repo.
7. **RETRO** — one line: what regressed a gate, what to add to CI.

### 2.2 Definition of CLOSED (from AGENTS.md — enforced, not aspirational)
A slice is closed only with **all four**: (a) code merged, (b) red/green test proving the
gate, (c) **prod == repo** (verified by live curl), (d) evidence artifact stored. Reports
must link the test + commit, never paste a one-off curl.

### 2.3 CI gates (block merge) — the loop's guardrails
- **G1 Tests** — `vitest run` green; coverage must include the slice's gate.
- **G2 UI denylist** — render every public page (VI+EN) and grep for dev language; must be
  zero: `lớp [0-9]|mô hình 4 lớp|phase [0-9]|dashboard|workflow|inquiry|node vận hành|layer|schema|gate|worker|API`. (Ref `BRAND_PORTAL_UI_QA_AUDIT_2026-06-18.md`.)
- **G3 Overclaim** — run `validateBrandCopy` over ALL rendered copy (incl. content moved
  out of hardcoded TS); L3 overclaim + L2 hotel/booking terms → fail. (Add the missing
  tests for overclaim, `?slug` 403, CORS, auth — current gap.)
- **G4 Compliance-evidence guard (NEW — closes the seed bypass):** CI rejects any seed/
  migration/DB state where `compliance_checklists.* IN ('verified','approved')` **without**
  a matching row in `compliance_evidence` for that brand+field. No `verified` without proof,
  anywhere — seed included.
- **G5 prod==repo** — post-deploy job diffs key prod rows (publication_status, compliance)
  against committed seeds; divergence = alarm.
- **G6 Placeholder guard** — fail if rendered HTML contains `{{...}}` or a brand not present
  in the DB (closes the "Tam Farm placeholder shown as real" class).

### 2.4 Roles in the loop
- **AI dev team** — builds slices, writes tests, keeps copy in data.
- **Founder** — supplies real-world truth only they hold (permits/evidence, consent,
  legal entity). Never asked to "approve" a fake to unblock.
- **QA (me)** — audit at step 5 + verify-live at step 6; maintain the gate/test catalog;
  publish per-cycle verdicts.

### 2.5 First three loops (unblock the real state)
- **Loop 1 — close the bypass:** revert Lily seed/prod to truthful values
  (`pending`/`unknown` until evidence exists) OR have Founder file real evidence via the
  audited route; add G4 + G5; add overclaim/slug/cors/auth tests. *Exit:* prod==repo, Lily
  not published as verified without evidence.
- **Loop 2 — Brand portal UI truth + language:** B1–B4 from the UI audit (DB-driven
  showcase, remove dev language, fix "Portal" identity). *Exit:* G2 zero, showcase DB-driven.
- **Loop 3 — content pipeline:** move Lily's hardcoded articles into gated `content_blocks`;
  stand up the L2 editorial CMS render path. *Exit:* content editable without touching TS;
  G3 runs over it.

---

## PART 3 — Full content series backlog (the suggested list)

Two streams. **L2 = `ap.omdalat.com` editorial** (8 locked pillars; Vietnamese-first;
**no** hotel/booking/tour words; soft bridge to Om Dalat only on transition intent).
**L3 = brand microsites** (Lily etc.; brand voice; honest, no overclaim).

### 3.1 L2 editorial — 30 articles across the 8 pillars
Format: `slug` — Title (VI) · intent.

**Pillar 1 — Cách sống (living)**
1. `song-o-da-lat-mua-mua` — Sống ở Đà Lạt qua một mùa mưa · living
2. `chi-phi-that-khi-o-lai-da-lat` — Chi phí thật khi ở lại Đà Lạt một tháng · living
3. `mot-ngay-cham-o-vung-cao` — Một ngày chậm ở vùng cao Lạc Dương · living
4. `nha-nho-va-nhip-song` — Nhà nhỏ, vườn nhỏ và nhịp sống vừa đủ · living

**Pillar 2 — Làm việc (working)**
5. `lam-viec-tu-xa-giua-vuon` — Làm việc từ xa giữa một khu vườn · working
6. `internet-va-goc-lam-viec-da-lat` — Tìm một góc làm việc yên ở Đà Lạt · working
7. `nhip-lam-viec-mua-lanh` — Giữ nhịp làm việc qua mùa lạnh · working

**Pillar 3 — Con người (belonging)**
8. `nguoi-giu-vuon-hong` — Người giữ một vườn hồng ở Lạc Dương · belonging
9. `tho-lam-vuon-the-he-hai` — Thợ làm vườn thế hệ thứ hai · belonging
10. `nguoi-tre-ve-lam-nong` — Người trẻ rời phố về làm nông sạch · belonging
11. `chu-quan-nho-tren-doc` — Chủ một quán nhỏ trên con dốc · belonging

**Pillar 4 — Nơi chốn (places)**
12. `con-doc-giu-ky-uc` — Một con dốc giữ ký ức Đà Lạt · places
13. `khu-vuon-khong-phai-phong-nen` — Khu vườn không phải phông nền · places
14. `cho-som-vung-cao` — Chợ sớm ở vùng cao · places
15. `xuong-nghe-trong-pho` — Một xưởng nghề nhỏ trong phố · places

**Pillar 5 — Sinh kế (livelihood)**
16. `nong-nghiep-sach-ban-cho-ai` — Nông nghiệp sạch rồi bán cho ai · livelihood
17. `tu-vuon-den-ban-an` — Từ vườn tới bàn ăn, đường đi của rau · livelihood
18. `gia-tri-that-cua-mot-bo-ca-phe` — Giá trị thật của một bó cà phê vùng cao · livelihood
19. `lam-thuong-hieu-tu-cai-dang-co` — Làm thương hiệu từ chính cái đang có · livelihood

**Pillar 6 — Văn hóa đời thường (culture)**
20. `bua-com-vung-cao` — Bữa cơm vùng cao có gì · culture
21. `tieng-long-bian-buoi-sang` — Tiếng Langbiang buổi sáng · culture
22. `nghe-thu-cong-con-lai` — Những nghề thủ công còn lại · culture

**Pillar 7 — Tương lai vùng nhỏ (future-model)**
23. `du-lich-canh-nong-lam-dung-cach` — Du lịch canh nông làm đúng cách · future-model
24. `chuyen-doi-so-cho-nha-vuon` — Chuyển đổi số cho một nhà vườn nhỏ · future-model
25. `lac-duong-moi-sau-sap-xep` — Lạc Dương mới sau sắp xếp hành chính · future-model
26. `kinh-te-cong-dong-vung-cao` — Kinh tế cộng đồng ở một vùng nhỏ · future-model

**Pillar 8 — Đà Lạt và thế giới (future-model/belonging)**
27. `nguoi-nuoc-ngoai-o-lai-da-lat` — Người nước ngoài chọn ở lại Đà Lạt · belonging
28. `san-pham-da-lat-di-xa` — Một sản phẩm Đà Lạt đi xa tới đâu · livelihood
29. `hoc-tu-cac-vung-nui-khac` — Học từ các vùng núi khác trên thế giới · future-model
30. `da-lat-cham-trong-the-gioi-nhanh` — Đà Lạt chậm trong một thế giới nhanh · living

Rules for every L2 piece: VI source + EN adaptation (`translation_status='ready'` to show
EN); standfirst + hero image with rights/consent; ≥3 internal links (2 same-pillar);
soft Om Dalat bridge **only** on transition intent; pass G2 + G3. No "homestay/booking/
tour/đặt phòng".

### 3.2 L3 brand (Lily) — restructure existing 17 + extend
- **Move the 17 hardcoded articles into `content_blocks`** so they're gated (G3) and
  editable without touching the 125 KB TS file (Loop 3).
- Keep the honest framing already present ("not a daily short-stay", "no visa guarantee").
- Add, per the Lily master pack, only what is **true now**: residency rhythm, workspace,
  programs that actually run. No stay/booking copy until `lodging_compliance` is truly
  `verified` via the audited route.

### 3.3 Production order
Editorial credibility first: pillars 3 (Con người) + 4 (Nơi chốn) + 5 (Sinh kế) lead —
they carry the "real people, real places" thesis. Target the report's gap: **5 articles in
loop, then 10, then 30**, each shipped through the loop (Part 2).

---

## PART 4 — My standing QA role & reporting

Each loop I publish a short verdict with **evidence, not opinion**:
- **Ran:** `vitest` result, live `curl` of the deployed URL, repo-vs-prod diff.
- **Gate check:** G1–G6 pass/fail with the offending line if failed.
- **Verdict:** ✅ closed (all 4 criteria) / ❌ open (what's missing).
- **Regression watch:** anything that weakened an existing gate.

I will **not** certify a slice on a report's word; I re-derive it. The recurring project
risk has been claims ahead of ground truth — my job is to keep "done" meaning *proven*.

---

## Immediate next actions (P0)
1. **Close the seed bypass (Loop 1):** set Lily compliance to the truthful value
   (`pending`/`unknown`) + `private_preview`, unless Founder files real evidence via the
   audited route; add **CI guard G4** (no `verified`/`approved` without `compliance_evidence`).
2. Add the **missing gate tests** (overclaim, `?slug` 403, CORS, auth) so all gates have
   red/green coverage, not just compliance.
3. Wire **G2 UI denylist** + **G5 prod==repo** into CI.
4. Start **content Loop** with 5 articles from pillars 3–5.

The engineering is recoverable and the gate/test work is real. The one rule that makes all
of it worth anything: **no `verified`, no `published`, no "closed" without proof — in prod
or in the seed.**
