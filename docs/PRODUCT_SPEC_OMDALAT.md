# PRODUCT_SPEC_OMDALAT
## OMDALAT.COM
## Product Specification
## Version 1.0

---

# 1. Product Definition

OMDALAT is a city-layer product for Da Lat that helps people discover:

- trusted places
- verified hosts
- local experts
- real communities
- upcoming events
- active requests
- visible proofs

It is not a tourism portal and not a generic directory.

It is a living city interface built around trust, proof, and participation.

---

# 2. Product Goal

The product should help a user answer:

- what is active now
- who is real here
- where can something happen
- which local people or places are trustworthy
- what proof already exists in the city layer

---

# 3. Primary Users

## 3.1 Local host

A person or team operating a place, gathering space, stay, workshop venue, or neighborhood node.

## 3.2 Local expert

A person offering local expertise, facilitation, craft, teaching, consulting, or service capacity.

## 3.3 Community operator

A person coordinating a local group, event rhythm, shared space, or member network.

## 3.4 Local participant

A person looking for real places, real people, real events, and trust-backed activity in Da Lat.

---

# 4. Product Surfaces

## 4.1 Public web

Purpose:

- explain the city layer
- expose activity and entities
- drive discovery
- support SEO
- help people join or contact

## 4.2 Local app

Purpose:

- operational dashboard
- request handling
- trust and proof tracking
- member-level city activity coordination

---

# 5. Core Product Pillars

## 5.1 Activity

The city layer must feel alive through current and upcoming signals.

## 5.2 Trust

Users must be able to assess who and what is credible.

## 5.3 Proof

Real outcomes must be visible, not implied.

## 5.4 Locality

Pages and flows must remain rooted in Da Lat context.

## 5.5 Usability

The product must stay calm, clear, and premium.

---

# 6. Core Entities

The product revolves around:

- Place
- Host
- Expert
- Community
- Event
- Request
- Proof

Supporting entities:

- User
- Node
- Verification
- TrustSummary
- Booking

---

# 7. Public Website Scope

Required public routes:

- `/`
- `/places`
- `/places/[slug]`
- `/hosts`
- `/hosts/[slug]`
- `/experts`
- `/experts/[slug]`
- `/communities`
- `/communities/[slug]`
- `/events`
- `/events/[slug]`
- `/proofs`
- `/proofs/[slug]`
- `/join`
- `/about`
- `/vision`
- `/trust`
- `/faq`
- `/contact`

---

# 8. Local App Scope

Required local app routes:

- `/`
- `/dashboard`
- `/places`
- `/hosts`
- `/experts`
- `/communities`
- `/events`
- `/proofs`
- `/requests`
- `/profile`
- `/settings`

---

# 9. Homepage Requirements

The homepage must show:

- hero with clear city definition
- current operational snapshot
- active places
- verified hosts
- requests needing contribution
- upcoming activities
- visible proofs
- clear path to join

The homepage must not feel like:

- a static brochure
- a tourism postcard
- a random collection of cards

---

# 10. Detail Page Requirements

Every detail page must include:

- clear title and H1
- locality context
- trust state
- proof or activity context
- related entities
- next useful action

Examples:

- a place links to hosts, events, communities, proofs
- a host links to places, events, proofs
- a community links to places, events, member-facing activity

---

# 11. Trust Requirements

Public trust signals should include:

- verification state
- proof count
- activity status
- visible relationship context

Private or internal trust detail may include:

- review state
- moderation state
- richer verification history

---

# 12. Proof Requirements

Proof is a first-class object.

Proof should show:

- what happened
- where it happened
- who was involved
- when it happened
- what outcome was verified

Proof must never be fake or decorative.

---

# 13. Request Requirements

Requests represent visible local need.

Examples:

- need a host
- need a place
- need a facilitator
- need a collaborator
- need local participation

Public request pages should be readable and specific.
Internal request workflows may include extra status and routing detail.

---

# 14. MVP Scope

The MVP must include:

- public homepage
- listing pages for all core entities
- detail page templates for all core entities
- trust summary UI
- proof listing and proof detail
- visible requests
- local app shell
- static or mock-data powered city signals

The MVP should not include:

- complex marketplace flows
- heavy gamification
- global product abstractions
- broad non-local expansion features

---

# 15. Success Metrics

The product is working when it increases:

- active local nodes
- verified hosts
- trusted places
- visible proofs
- repeat participation
- requests answered
- local event density

---

# 16. Final Product Rule

If a feature does not improve at least one of these, it is not core:

- visibility of real local activity
- trust in people and places
- proof of real outcomes
- local coordination usefulness
