# DOCS_DOMAIN_PLAN_OMDALAT.md

## Status
Team 1 ownership document

## Owner
Team 1

## Decision

`docs.omdalat.com` là docs surface chính của OMDALAT.

`/docs` trên `omdalat.com` chỉ là legacy surface và nên redirect sang docs host.

## Mục tiêu

- tách rõ public web và docs surface
- để docs trở thành lớp giải thích và tăng trust
- giữ đường vào rõ: `omdalat.com -> docs.omdalat.com -> Free Member`
- tránh trộn markdown repo nội bộ với public docs surface

## Rules

- Canonical của docs phải dùng `https://docs.omdalat.com`
- CTA từ web sang docs phải trỏ vào `docs.omdalat.com`
- CTA từ docs về entry flow phải trỏ vào `https://omdalat.com/free-member`
- Không dùng `docs.omdala.com` cho public docs của OMDALAT
- Nếu còn giữ `/docs`, chỉ dùng như redirect legacy

## Required routes

- `/`
- `/getting-started`
- `/what-is-omdalat`
- `/how-it-works`
- `/packages`
- `/members`
- `/hosts`
- `/experts`
- `/roles`
- `/trust-and-proof`
- `/policies`
- `/operator-guide`

## Redirect rules

- `https://omdalat.com/docs -> https://docs.omdalat.com`
- `https://omdalat.com/docs/* -> https://docs.omdalat.com/:splat`
- old pretty docs paths should redirect to the matching `.html` page or clean route on the docs host

## SEO requirements

- docs pages need self-canonicals on docs host
- docs host must have its own sitemap or sitemap handling
- web pages should not canonicalize docs content
- docs metadata and copy must reinforce trust, clarity, and onboarding

## Team 2 alignment needed

Team 2 must confirm:

- which runtime entry appears after Free Member
- which docs access states are eventually gated
- which terms from docs are source-aligned with runtime truth

## Current implementation target

The repo should contain:

- `apps/docs/*` as the public docs surface
- public web redirects from `/docs`
- Team 1 copy that references `docs.omdalat.com` consistently
