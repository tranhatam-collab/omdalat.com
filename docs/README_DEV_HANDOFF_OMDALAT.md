# README_DEV_HANDOFF_OMDALAT

# PROJECT: OMDALAT

## 1. Core concept

OMDALAT is a standalone city-layer product for Da Lat.

It is the first city node where the global system becomes visible through:

- active places
- hosts
- experts
- communities
- requests
- proofs

## 2. Domain model

- `omdalat.com` = city layer homepage
- `app.omdalat.com` = local operating layer

## 3. Product lens

This is not a tourism website.
This is not a generic directory.

This is a city operating layer.

## 4. Recommended repo structure

```text
/apps
  /web
  /app

/data
  /nodes
  /places
  /requests
  /proofs

/docs
```

## 5. Initial content objects

The first implementation should support:

- live nodes
- active places
- verified hosts
- ongoing requests
- upcoming activities
- proofs

## 6. Data directions

Minimum data domains:

- places
- hosts
- experts
- communities
- requests
- proofs

## 7. UX rules

The city layer must feel alive.

Every core page should show:

- what is active
- who is trusted
- what can happen now

## 8. MVP build order

P1:

- homepage
- activity sections
- host and place model

P2:

- requests
- activities
- proofs

P3:

- local app shell
- trust overlays
- connection to real data and operational workflows later

## 9. Design rules

- warm but premium
- local but structured
- green-mist-earth visual system
- dark green first, mist-light secondary
- real activity over marketing claims
- visible trust over decorative polish

Final visual source of truth:

- `docs/OMDALAT_BRAND_SYSTEM_LOCK.md`

Interpretation rule:

- use the green brand system to express warmth, locality, and trust
- do not treat green as a reason to become loud, neon, or tourism-like

## 10. Critical principle

If a feature does not increase:

- local density
- trusted activity
- visible proof

do not build it.

## 11. Final definition

OMDALAT is a living city interface for trusted places, hosts, experts, communities, events, requests, and proofs in Da Lat.
