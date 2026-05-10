# TEAM BACKEND CONTRACT

Product: OMDALAT Local App
Repo: `omdalat.com`
Status: active

## Mission

Freeze the backend contract for the local app runtime used by iOS and Android.

## Must freeze

- auth/session
- dashboard snapshot
- list/detail payloads for places, hosts, experts, communities, events
- requests list/create/update states
- proof list/detail/create payloads
- camera upload handoff
- profile/settings read and write
- push registration payload

## Sprint order

1. Sprint 1: auth, dashboard, entity lists
2. Sprint 2: requests, proofs, profile
3. Sprint 3: push, upload, error audit

## Rules

- Team 2 owns runtime truth
- Team 1 must be notified on any route or role-name change

## Done when

- iOS and Android teams can build without guessing app states
- requests and proof flows are stable
