# README_DEV_HANDOFF_OMDALAT

Version: 4.0  
Status: Canonical dev handoff summary for the rebuild

---

## 1. Project Lock

Om Dalat is a fully independent system inside the `*.omdalat.com` domain family:

- `https://omdalat.com`
- `https://app.omdalat.com`

It must not ship as:

- `docs.omdala.com`
- `app.omdala.com`
- any dependent surface of another system

Primary source of truth:

- [OMDALAT_PUBLIC_MEMBER_GLOBAL_SYSTEM_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_PUBLIC_MEMBER_GLOBAL_SYSTEM_MASTER_2026.md)
- [OMDALAT_MASTER_REBUILD_INDEX_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_MASTER_REBUILD_INDEX_2026.md)
- [OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md)
- [OMDALAT_LANGUAGE_CODEX_SYSTEM_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_LANGUAGE_CODEX_SYSTEM_2026.md)
- [OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md)
- [OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md)
- [OMDALAT_MEMBERSHIP_GATING_FLOW_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_MEMBERSHIP_GATING_FLOW_SPEC_2026.md)
- [OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md)
- [OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md)
- [OMDALAT_DEV_IMPLEMENTATION_BACKLOG_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_DEV_IMPLEMENTATION_BACKLOG_2026.md)
- [OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md)
- [OMDALAT_LEGACY_DOCS_NON_CANONICAL_INDEX_2026-04-23.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_LEGACY_DOCS_NON_CANONICAL_INDEX_2026-04-23.md)

If any older plan conflicts with the files above, the older plan is outdated.

---

## 2. Naming Lock

- Primary brand in Vietnamese: `Ôm Đà Lạt`
- Primary brand in English: `Om Dalat`
- Internal uppercase reference is allowed only as a technical label: `OMDALAT`

Public copy must prefer:

- `Ôm Đà Lạt`
- `Om Dalat`

---

## 3. Product Lens

This is not:

- a tourism site
- a retreat
- a startup-hype homepage
- a generic community page

This is:

- a real-life living system
- a structure for life, work, learning, and community
- a place to stay, work, learn from experience, and build long-term value

---

## 4. Required Surface Map

Public:

- `/vi`
- `/en`
- `/vi/life`
- `/vi/work`
- `/vi/learning`
- `/vi/community`
- `/vi/stay`
- `/vi/join`
- `/vi/articles`

System:

- `/docs`
- `/member`
- `https://app.omdalat.com`

---

## 5. P0 Cleanup

Before any broader feature work, remove:

- all links to `docs.omdala.com`
- all links to `app.omdala.com`
- all wording `OMDALA`
- all wording `city node`
- all wording `global layer`
- all legacy CTA blocks like `Docs / Help`, `Mở app OMDALA`, `Đọc docs OMDALA`

Then lock:

- public/member/internal visibility
- register/login and email verify flow
- locale-aware routing for `vi` and `en`
- `noindex` for `/member` and `/app`

---

## 6. Team Reading Order

1. [OMDALAT_PUBLIC_MEMBER_GLOBAL_SYSTEM_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_PUBLIC_MEMBER_GLOBAL_SYSTEM_MASTER_2026.md)
2. [OMDALAT_MASTER_REBUILD_INDEX_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_MASTER_REBUILD_INDEX_2026.md)
3. [OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_FOUNDATION_AND_POSITIONING_LOCK_2026.md)
4. [OMDALAT_LANGUAGE_CODEX_SYSTEM_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_LANGUAGE_CODEX_SYSTEM_2026.md)
5. [OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_INFORMATION_ARCHITECTURE_AND_ROUTING_2026.md)
6. [OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_PUBLIC_MEMBER_ACCESS_MODEL_2026.md)
7. [OMDALAT_MEMBERSHIP_GATING_FLOW_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_MEMBERSHIP_GATING_FLOW_SPEC_2026.md)
8. [OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_HOMEPAGE_REWRITE_MASTER_2026.md)
9. [OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_30_ARTICLES_EDITORIAL_MASTER_2026.md)
10. [OMDALAT_SEO_MASTER_PLAN_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_SEO_MASTER_PLAN_2026.md)
11. [OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_GLOBAL_I18N_AND_HREFLANG_PLAN_2026.md)
12. [OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md)
13. [OMDALAT_APP_MEMBER_DASHBOARD_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_APP_MEMBER_DASHBOARD_SPEC_2026.md)
14. [OMDALAT_DEV_IMPLEMENTATION_BACKLOG_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_DEV_IMPLEMENTATION_BACKLOG_2026.md)
15. [OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_QA_ACCEPTANCE_CHECKLIST_2026.md)
16. [OMDALAT_BETA_RELEASE_PLAN_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_BETA_RELEASE_PLAN_2026.md)

Companion references:

- [OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_IMAGE_SOURCE_SHORTLIST_2026.md)
- [OMDALAT_INVESTOR_DECK_ACCESS_STRATEGY_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_INVESTOR_DECK_ACCESS_STRATEGY_2026.md)
- [OMDALAT_OPERATIONS_HANDBOOK_ACCESS_STRATEGY_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_OPERATIONS_HANDBOOK_ACCESS_STRATEGY_2026.md)
- [OMDALAT_3_TEAM_SYNC_MASTER_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_3_TEAM_SYNC_MASTER_2026.md)
- [DEV_TEAM_1_PLAN_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/DEV_TEAM_1_PLAN_OMDALAT.md)
- [DEV_TEAM_2_PLAN_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/DEV_TEAM_2_PLAN_OMDALAT.md)
- [DEV_TEAM_3_PLAN_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/DEV_TEAM_3_PLAN_OMDALAT.md)
- [FINAL_APPROVAL_PACK_OMDALAT.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/FINAL_APPROVAL_PACK_OMDALAT.md)
