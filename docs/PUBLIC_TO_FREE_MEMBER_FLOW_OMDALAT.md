# PUBLIC_TO_FREE_MEMBER_FLOW_OMDALAT.md

## Status
Team 1 conversion flow spec

## Owner
Team 1

## Canonical flow

`Public web -> docs.omdalat.com -> Free Member -> package ladder -> upgrade`

## Product intent

The public flow should feel calm, premium, and clear.

It should not feel like:

- a hard sell
- a flat pricing sheet
- a confusing jump from homepage straight into runtime

## Flow stages

### Stage 1: Public discovery

Primary surfaces:

- homepage
- about
- what is OMDALAT
- how it works
- role discovery pages
- trust page

Goal:

- help a new person understand OMDALAT quickly
- establish trust
- show there is a structured way in

### Stage 2: Docs clarification

Primary surfaces:

- docs homepage
- getting started
- members
- packages
- hosts
- experts
- roles
- trust and proof

Goal:

- turn curiosity into understanding
- explain rules before the user enters the system
- make Free Member feel like the right next step

### Stage 3: Free Member entry

Primary surfaces:

- `/join`
- `/free-member`
- `/contact?topic=join`

Goal:

- let the user choose the right lane
- collect entry intent
- set expectation that exact pricing is still gated

### Stage 4: Package preview

Primary surfaces:

- `/packages`
- docs package page

Goal:

- show public no-price package view
- help each role understand where they fit
- make the next step feel informed rather than forced

### Stage 5: Upgrade handoff

Owner:

- Team 2 runtime

Goal:

- show exact pricing
- show runtime unlock truth
- move the user into the correct entitlement path

## Public flow rules

- docs must not depend on app runtime
- exact pricing must not appear before Free Member
- role pages should link into the correct package lane
- contact and intake copy should reinforce the same vocabulary as docs

## Current route targets in repo

- `/join` = public role chooser and flow summary
- `/free-member` = starter entry page
- `/packages` = public no-price package ladder
- `/contact?topic=join` = public intake fallback

## Team 2 dependencies

Team 2 must confirm:

- what Free Member means in runtime
- what exact pricing view appears after signup
- what upgrade state names exist in app
- which package unlock map is source of truth
