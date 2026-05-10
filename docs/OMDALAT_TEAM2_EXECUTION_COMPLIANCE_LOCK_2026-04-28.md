# OMDALAT_TEAM2_EXECUTION_COMPLIANCE_LOCK_2026-04-28

Version: 1.0  
Status: ACTIVE  
Owner: Team 2 / Team 1 review  
Date: 2026-04-28  
Scope: `omdalat.com`, public web UI, shared frontend components, locale switch, public CTA surfaces, public metadata support UI, app-facing presentation work owned by Team 2
Surface routes: `/vi`, `/en`, `/about`, `/life`, `/work`, `/learning`, `/community`, `/stay`, `/articles`, `/join`, `/contact`, `/docs`, `/privacy`, `/terms`
Acceptance criteria:
- No Team 2 task changes public wording without Team 1 source approval.
- No public UI hard-codes text when an approved source already exists.
- Every public UI change ships with bilingual evidence, responsive evidence, and release notes.
- Every release-facing Team 2 report includes commands used, affected files, results, risks, rollback note, and approval recommendation.

---

## 1. Purpose

This file turns the 2026-04-28 universal activation into direct execution rules for Team 2.

From now on, Team 2 is responsible not only for making UI work, but for making it compliant with:

- route meaning
- language codex
- bilingual discipline
- responsive behavior
- accessibility
- release evidence

If a task conflicts with Team 1 route meaning or copy meaning, Team 2 must escalate instead of improvising.

---

## 2. Priority Order

When Team 2 sees conflicting instructions, use this order:

1. `OMDALAT_UNIVERSAL_STANDARDS_ACTIVATION_2026-04-28.md`
2. `OMDALAT_AND_APDALAT_TEAM_UPDATE_2026-04-28.md`
3. `OMDALAT_MASTER_LOCK.md`
4. `OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md`
5. `OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md`
6. `OMDALAT_LIVING_LANGUAGE_SYSTEM_LOCK_2026.md`
7. `OMDALAT_AND_APDALAT_SEO_COPY_REWRITE_RULES_2026.md`
8. `OMDALAT_AND_APDALAT_UI_MICROCOPY_SYSTEM_2026.md`
9. `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`
10. `OMDALAT_CONTENT_SYSTEM_SOP.md`
11. this file

If the conflict is about wording, CTA meaning, access meaning, or route meaning, Team 1 decides.

---

## 3. Team 2 Must Not Do

Team 2 must not:

- rewrite public wording to sound nicer without Team 1 approval
- hard-code public copy when the source already exists in an approved content layer
- merge Om, App, and Ap roles into one UI meaning
- break locale switch behavior
- leave one locale updated while the paired locale still means something different
- ship mobile-only fixes that damage desktop layout
- ship desktop-only fixes that damage mobile layout
- claim ready without evidence

---

## 4. Team 2 Must Do

Every Team 2 task must:

- keep route purpose unchanged
- keep CTA meaning unchanged unless Team 1 approves a change
- check menu, footer, CTA, form copy, empty states, and status-facing public text in both locales
- keep token, spacing, typography, radius, and motion behavior consistent
- keep keyboard and screen-reader basics intact
- keep locale-aware internal links intact
- verify metadata support surfaces do not drift from bilingual rules

---

## 5. Public Copy Discipline

For Team 2, public copy discipline means:

- prefer centralized content sources over inline strings
- if inline strings are still temporarily required, VI and EN must be updated together
- never expose internal labels such as technical tags, lane names, or migration wording on public pages
- never reintroduce blocked legacy copy such as old docs/help/app wording that Team 1 already removed

If a copy source is missing, Team 2 may add a temporary implementation only if:

- the gap is documented in the report
- Team 1 is notified
- the temporary text does not invent new product meaning

---

## 6. Metadata and SEO Support Responsibility

Team 2 is not the final SEO owner, but Team 2 must not ship UI that undermines SEO rules.

Before claiming public UI ready, Team 2 checks:

- each public page still has one visible H1
- title and description hooks remain locale-aware
- canonical and hreflang wiring are not broken by route changes
- images rendered by Team 2 surfaces expose language-correct alt text where needed and comply with image-role intent:
  - đúng vai trò bài
  - đúng ngữ cảnh
  - đúng đời sống
  - alt và caption phải phù hợp ngữ cảnh locale
- internal links stay in the correct locale

Escalate to Team 1 if metadata meaning needs to change.

---

## 7. Responsive and Accessibility Minimum

Every Team 2 release-facing change must be checked on:

- desktop
- mobile

Minimum checks:

- no horizontal overflow on core public pages
- footer and navigation remain usable
- CTA order remains intentional
- focusable elements stay reachable
- link labels remain understandable in both locales

---

## 8. Required Report Format

Every Team 2 task report must include:

- task scope
- risk level
- commands used
- pages tested
- affected files
- result
- risks
- rollback note
- approval recommendation

Recommended final status labels:

- `ready for review`
- `ready for staging`
- `blocked by environment`
- `blocked by Team 1 decision`
- `blocked by Team 3 dependency`

---

## 9. Escalation Rules

Escalate to Team 1 immediately if the task touches:

- route meaning
- page purpose
- public CTA meaning
- language codex
- access model wording
- Om vs App vs Ap boundary

Escalate to QA/DevOps if:

- smoke evidence is missing
- browser/toolchain behavior is the blocker instead of app behavior
- release gate cannot be reproduced locally

---

## 10. Image Reality Responsibility

Team 2 phải đảm bảo các ảnh trên public surface không lệch chuẩn ảnh khóa:

- ưu tiên đúng ngữ cảnh route (work/life/stay/article/community/context/help)
- ảnh không được du lịch hóa vượt ngữ cảnh đời sống thực
- có nguồn ảnh chuẩn, không dùng lại sai role của ảnh ở route khác
- mỗi ảnh publish phải có alt/caption đúng tiếng bài

Mọi kiểm tra ảnh công khai phải bám chuẩn:

- [OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md)

## 11. Definition of Done For Team 2 Under Activation

A Team 2 task is done only when:

- the UI change matches Team 1 meaning
- VI and EN stay aligned
- responsive behavior is checked
- accessibility basics are checked
- evidence is attached
- the report format is complete

If one of these is missing, the task is not done yet.
