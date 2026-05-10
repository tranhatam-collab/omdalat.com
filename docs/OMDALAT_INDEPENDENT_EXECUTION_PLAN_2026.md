# OMDALAT INDEPENDENT EXECUTION PLAN 2026

Version: 1.0  
Owner: Founder - Trần Hà Tâm  
Status: Canonical execution plan for team handoff

---

# 1. FOUNDATIONAL DECISION

OMDALAT must now be built and operated as a fully independent platform.

This means:

- `omdalat.com` is not a branch, node, or runtime shell of `omdala.com`
- `omdala.com` is a separate platform with its own roadmap, team, and architecture
- OMDALAT may integrate with outside systems later, but no outside system is an active dependency now

The repo, the public web, the docs surface, the app runtime, the auth flow, the content system, and the SEO system must all reflect this lock.

---

# 2. NAMING STANDARD

Use these names consistently across product, content, SEO, docs, metadata, and UI:

- Display brand: `OMDALAT`
- Vietnamese standard name: `Ôm Đà Lạt`
- English standard name: `Om Dalat`

Rules:

- UI may use `OMDALAT` as the master brand mark
- Vietnamese public copy should prefer `Ôm Đà Lạt` when a readable name is needed
- English public copy, metadata, and SEO should use `Om Dalat`
- Do not introduce alternate spellings such as `Omdala`, `Om Da Lat`, or mixed-case variants as public canonical names

---

# 3. LOCKED DOMAIN ARCHITECTURE

The OMDALAT platform must use only the `*.omdalat.com` family for its production surfaces.

- Public web: `https://omdalat.com`
- Docs: `https://docs.omdalat.com`
- App: `https://app.omdalat.com`
- Auth: `https://auth.omdalat.com`
- Admin / ops: `https://admin.omdalat.com`

Hard rules:

- no production OMDALAT runtime on `app.omdala.com`
- no production OMDALAT docs on `docs.omdala.com`
- no OMDALAT auth cookies on `.omdala.com`
- no canonical or hreflang references from OMDALAT pages to `omdala.com`

---

# 4. PLATFORM SCOPE

OMDALAT must behave like an independent Da Lat operating platform for:

- living and working in Da Lat
- host and place activation
- expert and service activation
- communities and local programs
- events and requests
- proof, trust, and verification
- package ladders, Free Member entry, and the right upgrade flow

OMDALAT is not:

- a tourism website
- a brochure for another platform
- a redirect shell into `omdala.com`
- a generic community landing page

---

# 5. WORKSTREAMS FOR TEAM DELIVERY

## 5.1 Public web

Team must deliver:

- homepage with independent OMDALAT positioning
- standardized naming in Vietnamese and English
- clean public flow: `public web -> docs -> Free Member -> app`
- independent metadata, schema, canonical, sitemap, robots, and internal linking
- public articles governed by `docs/OMDALAT_CONTENT_SYSTEM_SOP.md`
- team change notice governed by `docs/OMDALAT_CONTENT_SOP_TEAM_CHANGE_NOTICE_2026-05-04.md`

## 5.2 Docs layer

Team must deliver:

- docs on `docs.omdalat.com`
- no OMDALA-led navigation
- docs that explain OMDALAT itself, not a parent system

## 5.3 App and auth

Team must deliver:

- runtime on `app.omdalat.com`
- auth on `auth.omdalat.com`
- cookie scope on `.omdalat.com`
- app labels, metadata, and deployment names aligned to OMDALAT

## 5.4 Data and trust

Team must deliver:

- independent entity model for places, hosts, experts, communities, events, requests, and proofs
- no hard dependency on outside identity, trust, or graph systems
- clean fixture and mock data owned by OMDALAT

## 5.5 Launch and migration

Team must deliver:

- content cleanup for stale OMDALA mentions
- launch checklist for SEO, domain, docs, auth, analytics, and monitoring
- content batch gate covering SOP, image reality, metadata, internal link, schema handoff, and browser QA

---

# 6. PHASED EXECUTION

## Phase 0 - Lock and cleanup

- freeze naming and domain rules
- remove active domain dependencies on `omdala.com`
- rewrite docs that still describe OMDALAT as an OMDALA runtime node
- mark mixed legacy docs as non-canonical

## Phase 1 - Public web and homepage

- refresh homepage copy, metadata, hero, and CTA flow
- standardize the `Ôm Đà Lạt / Om Dalat / OMDALAT` naming system
- verify docs and package entry links

## Phase 2 - Docs and app runtime

- move docs assumptions to `docs.omdalat.com`
- move runtime assumptions to `app.omdalat.com`
- align auth, cookies, noindex, and deployment config

## Phase 3 - Product data and trust

- finalize content model, data model, DB schema, and API contracts
- complete proof and trust workflows
- complete member, host, expert, and operator lanes

## Phase 4 - Launch readiness

- QA redirects, canonical, sitemap, hreflang, forms, app routes, and docs routes
- confirm team signoff
- publish rollout order and rollback rules

---

# 7. IMMEDIATE DEV TODOs

The dev team should execute these items in order:

1. Replace all active OMDALAT docs/app/auth origins with `*.omdalat.com`
2. Lock the naming system across copy, metadata, schema, and docs
3. Refresh homepage messaging so it reads as an independent Da Lat platform
4. Rewrite docs navigation and public docs pages to remove OMDALA dependency language
5. Update app runtime labels, fixture emails, cookie domain, and deployment names
6. Validate sitemap, robots, canonical, and structured data after the rewrite
7. Run build and typecheck gates before deployment
8. Apply `docs/OMDALAT_CONTENT_SYSTEM_SOP.md` before accepting any public article batch
9. Apply `docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md` before accepting any public/editorial image batch
10. Include `Content SOP impact` in every team report that touches articles, metadata, images, CMS content, or content QA

---

# 8. ACCEPTANCE CRITERIA

OMDALAT is ready for team delivery when:

- homepage, docs, and app all present one independent story
- no active production link points OMDALAT users into `app.omdala.com` or `docs.omdala.com`
- naming is consistent: `OMDALAT`, `Ôm Đà Lạt`, `Om Dalat`
- auth and cookies are fully scoped to `*.omdalat.com`
- no canonical, sitemap, metadata, or nav element contradicts the independence lock
- public article batches pass Content SOP and Image Reality gates
- team reports include the latest SOP change notice when content contracts change

---

# 9. FINAL RULE

If a page, config, or plan still makes OMDALAT look like a dependent surface of `omdala.com`, it is not ready.

The independent OMDALAT system must be legible in architecture, content, code, deployment, and public experience at the same time.
