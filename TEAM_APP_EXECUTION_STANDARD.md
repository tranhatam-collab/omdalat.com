# TEAM APP EXECUTION STANDARD

Product: OMDALAT
Status: active
Canonical repo: `omdalat.com`

## Mission

Team App owns the installable local app for OMDALAT.
The app must turn the existing local runtime into a real iOS + Android product for discovery, requests, proofs, and member-level city coordination.

## Owning teams

- Team 2: runtime, entitlements, trust, requests, programs, operator logic
- Team 1: store assets, public deep links, docs-to-app handoff, app entry messaging

## In scope

- dashboard
- places, hosts, experts, communities, events
- proofs
- requests
- profile and settings
- push notifications
- proof capture via camera upload

## Out of scope for v1

- deep operator consoles
- advanced moderation tooling
- non-essential expansion connectors

## Recommended stack

- Capacitor shell around `apps/app`
- keep public discovery web-first and app runtime mobile-first

## Execution order

1. Audit `apps/app` routes for mobile parity.
2. Freeze auth/session storage and deep-link rules.
3. Add push, proof upload, and offline shell behavior.
4. Run mobile QA across key city-layer flows.
5. Prepare store release pack.

## Dependencies

- Team 2 must freeze runtime state and entitlement rules
- Team 1 must freeze public-to-app route handoff and store copy

## Done when

- iOS and Android builds open the live app shell correctly
- dashboard, entities, proofs, requests, and profile work
- push and camera-based proof capture work
- app-store submission assets are complete

## Hard rules

- Team 1 presents the app; Team 2 defines runtime truth
- do not let docs become the source of truth for app behavior
- keep the app focused on real local action, not brochure content

## Web + app unified delivery rules

This repo must follow `/Users/tranhatam/Documents/Devnewproject/LOCAL_OPERATIONS/WEB_APP_MOBILE_UNIFIED_DELIVERY_STANDARD_2026-04-14.md`.

- web remains the canonical public URL and SEO layer
- the app must reach at least `minimum usable mobile` for local request, proof, status, and follow-up flows
- every request, proof, map, and notification flow must map web route, app route, deep link, and backend owner
- if Team 2 changes runtime state names or transitions, Team 1 presentation and mobile shell must update in the same planning window
- any missing route parity or handoff rule becomes a named sprint task immediately
