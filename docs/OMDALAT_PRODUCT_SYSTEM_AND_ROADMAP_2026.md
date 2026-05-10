# OMDALAT_PRODUCT_SYSTEM_AND_ROADMAP_2026

## Product, Architecture, and Delivery Roadmap
## Version 1.0
## Date: 2026-04-02

---

# 1. Product decision

OMDALAT should be built as a system page first, then as a local operating app, then as a city dashboard, then as a replication-ready template.

Build order:

1. Public system web
2. App shell
3. Data model and local objects
4. Trust and proof flows
5. Matching and opportunity flows
6. Local operator dashboard
7. Replication toolkit

---

# 2. Required surfaces

## 2.1 omdalat.com
Public system page.

Must answer:

- what this city layer is
- what is active now
- who it serves
- how work gets created
- how trust becomes visible
- how people join

## 2.2 app.omdalat.com
Operational layer.

Must support:

- profiles
- places
- hosts
- experts
- communities
- requests
- offers
- matches
- proofs
- activity feed

## 2.3 admin.omdalat.com
Must support:

- verification review
- trust inspection
- request moderation
- place approval
- proof review
- featured placement
- incident notes
- locality filters

## 2.4 docs / handoff
Must support:

- schema docs
- operating rules
- content model
- trust model
- onboarding scripts
- launch checklist

---

# 3. Information architecture for the public web

## Homepage
- Hero
- Live City Signals
- Why OMDALAT Exists
- The 4 Engines
- Work and Opportunity
- Places and Hosts
- Creative Economy
- Trust and Proof
- Join Paths
- Metrics
- Roadmap
- Why OMDALAT is independent

## Supporting public pages
- /what-is-omdalat
- /how-it-works
- /city-signals
- /places
- /hosts
- /experts
- /communities
- /requests
- /proofs
- /creative-economy
- /work-and-opportunity
- /trust
- /join

---

# 4. App information architecture

## Primary navigation
- Overview
- Activity
- Places
- Hosts
- Experts
- Communities
- Requests
- Offers
- Matches
- Proofs
- Events
- Messages
- Trust
- Settings

## Overview dashboard
Show:

- my role
- my node health
- active requests near me
- new opportunities
- my place status
- proof waiting for completion
- suggested actions

## Activity feed
Show:

- newly verified hosts
- newly active places
- fresh requests
- completed proofs
- upcoming events
- new opportunities

---

# 5. Core entity model

## 5.1 User
- id
- name
- role types
- trust status
- city
- district
- skills
- languages
- availability
- verification state

## 5.2 Place
- id
- title
- place_type
- city
- district
- capacity
- features
- availability_type
- host_id
- trust_state
- proof_count
- image_set

## 5.3 Host
- id
- user_id
- place_ids
- verification_status
- host_type
- response_quality
- trust_score

## 5.4 Expert
- id
- user_id
- expertise_tags
- session_types
- rate model
- portfolio_proofs
- trust_score

## 5.5 Community
- id
- name
- focus area
- organizers
- place relationships
- activity count
- proof count

## 5.6 Request
- id
- requester
- request_type
- title
- description
- locality
- urgency
- status
- needed_by_date
- compensation_type

## 5.7 Offer
- id
- owner
- offer_type
- availability
- locality
- tags
- pricing_or_free

## 5.8 Match
- id
- request_id
- offer_id
- status
- reason
- local_score
- trust_score

## 5.9 Proof
- id
- proof_type
- linked_entities
- completion_date
- evidence set
- reviewer status
- visibility level

## 5.10 Trust event
- id
- actor
- target
- event_type
- weight
- source
- note
- timestamp

---

# 6. Four product engines

## Engine 1. Opportunity Engine
Transforms local needs into visible requests and qualified matches.

## Engine 2. Place Activation Engine
Turns places into active operating nodes.

## Engine 3. Creative Economy Engine
Surfaces creators, studios, local brands, and production opportunities.

## Engine 4. Trust and Proof Engine
Turns activity into durable credibility.

---

# 7. UX rules

- real activity first
- trust must always be visible
- locality must always be filterable
- actions should be easy to start
- proof should be easier to create than to forget
- the interface should feel operational, not social-media noisy
- show density and outcomes, not hype copy

---

# 8. Design direction

## Independent platform contrast
more abstract, global, restrained references belong outside the OMDALAT surface

## OMDALAT look
warmer, more local, more human, but still premium and minimal

Recommended feel:

- calm premium layouts
- strong data cards
- living map or locality cards
- proof strips
- active request highlights
- warm neutral palette with dark mode support

---

# 9. MVP roadmap

## Phase 1. System page upgrade
Deliver:

- full homepage rewrite
- information architecture
- seed data cards
- sections for live signals, opportunity, trust, and proofs
- clear join paths

## Phase 2. Structured content model
Deliver:

- JSON or D1 schema for places, hosts, experts, requests, proofs
- seed dataset for real local examples
- filter logic

## Phase 3. App shell
Deliver:

- login
- overview dashboard
- place listing
- request listing
- proof listing
- profile shell

## Phase 4. Trust operations
Deliver:

- verification states
- proof submission
- trust events
- admin review queue

## Phase 5. Matching
Deliver:

- request to offer matching
- locality-based ranking
- trust-aware ranking
- manual operator assist

## Phase 6. Replication readiness
Deliver:

- city config file
- reusable components
- city-level metrics dashboard
- template kit for future nodes

---

# 10. Data sources for launch

Start with curated data, not uncontrolled scraping.

## Recommended initial data sources
- manually onboarded hosts
- manually verified places
- curated experts
- partner communities
- internal requests from the ecosystem
- operator-entered proof stories

Only later expand toward broader intake.

---

# 11. AI role

AI should support:

- structured request drafting
- match suggestions
- opportunity summaries
- local weekly intelligence summaries
- proof formatting
- onboarding assistance

AI should not decide final trust status alone.

---

# 12. Launch standard

Do not launch only with abstract claims.

Minimum acceptable launch state:

- 12 to 25 real places
- 20 to 50 trusted people
- 10 to 20 real requests
- 10+ visible proof stories
- active join flow
- clear trust explanations
- working filters

---

# 13. Final delivery principle

Each new feature must improve at least one of the following:

- local work creation
- place activation
- trust visibility
- opportunity matching
- creative production
- proof density

If it does not, delay it.
