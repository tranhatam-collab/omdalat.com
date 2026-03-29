# MATCHING_ENGINE_OMDALAT
## Version 1.0

---

# 1. Purpose

The matching engine helps OMDALAT connect:

- requests to places
- requests to hosts
- requests to experts
- requests to communities
- events to relevant participants
- proofs to related public entities

It should make the city layer feel useful, not random.

---

# 2. Match Types

- request-to-place
- request-to-host
- request-to-expert
- request-to-community
- event-to-place
- host-to-place
- proof-to-entity

---

# 3. Core Inputs

Matching should consider:

- locality and area
- category fit
- availability or timing
- trust compatibility
- activity recency
- relationship density
- stated need or focus

---

# 4. Scoring Logic

Suggested weighted buckets:

- locality fit
- relevance fit
- trust fit
- recency fit
- activity fit

Output should include:

- score
- short explanation
- next suggested action

---

# 5. Locality Rules

Locality matters first.

Nearby, neighborhood, or same-area entities should generally outrank distant ones when the use case is local.

The engine should prefer Da Lat-native relevance over generic category matching.

---

# 6. Trust Rules

All else equal:

- verified entities outrank unverified ones
- proof-backed entities outrank entities with no proof
- recently active entities outrank stale ones

But:

new entities still need a fair path to appear if they have enough real content.

---

# 7. Public Match Presentation

Public-facing matches should explain:

- why this entity is relevant
- what local context connects it
- what trust state supports it

Avoid black-box feeling.

---

# 8. App Match Workflow

Inside the local app, requests should be able to surface:

- recommended places
- recommended hosts
- recommended experts
- recommended communities

The app should support:

- view
- shortlist
- follow up later
- contact or route into participation flow
