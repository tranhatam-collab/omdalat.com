# DATA_MODEL_OMDALAT
## Version 1.0

---

# 1. Core Entities

## 1.1 User

Represents a human account.

Key fields:

- id
- display_name
- email
- phone optional
- avatar_url optional
- city
- account_status
- verification_status
- created_at
- updated_at

## 1.2 Node

Represents the public or operational identity used in the city layer.

Key fields:

- id
- node_type
- owner_user_id optional
- name
- slug
- description
- locality
- visibility_status
- status

## 1.3 Place

Represents a real location in Da Lat.

Key fields:

- id
- node_id
- slug
- name
- place_type
- area
- short_summary
- description
- activity_mode
- live_status
- verification_status
- trust_score

## 1.4 Host

Represents a person or team operating a place or hosting activity.

Key fields:

- id
- node_id
- slug
- name
- role
- locality
- focus
- availability
- verification_status
- trust_score

## 1.5 Expert

Represents a local expert or service provider.

Key fields:

- id
- node_id
- slug
- name
- categories
- locality
- short_summary
- description
- availability
- trust_score

## 1.6 Community

Represents a local group or recurring network.

Key fields:

- id
- node_id
- slug
- name
- community_type
- locality
- short_summary
- description
- activity_rhythm
- trust_score

## 1.7 Event

Represents a real activity.

Key fields:

- id
- slug
- title
- event_type
- start_at
- end_at optional
- locality
- place_id optional
- host_id optional
- community_id optional
- status

## 1.8 Request

Represents a visible local need.

Key fields:

- id
- creator_node_id
- category
- title
- need
- area
- urgency
- priority
- status
- window

## 1.9 Proof

Represents evidence of an event, activity, completion, or verified outcome.

Key fields:

- id
- slug
- proof_type
- title
- outcome
- evidence
- date
- linked_entity_type
- linked_entity_id
- verification_status

## 1.10 Verification

Key fields:

- id
- subject_type
- subject_id
- verification_type
- status
- submitted_at
- resolved_at optional

## 1.11 TrustSummary

Key fields:

- subject_type
- subject_id
- verification_state
- proof_count
- activity_score
- local_trust_score
- visibility_state

---

# 2. Relationships

- User owns zero or more Nodes
- Node may resolve into Place, Host, Expert, or Community
- Place may relate to one or more Hosts
- Community may relate to Places and Events
- Event may relate to Place, Host, Community, and Proof
- Proof links to a single primary entity, but can display related entities
- Verification and TrustSummary can attach to any publishable entity

---

# 3. Publishing Rule

No entity should be public without:

- slug
- summary
- locality
- status
- verification state
- trust summary data

---

# 4. Indexable Entity Rule

Public detail pages should exist only for entities with:

- enough text
- enough context
- enough trust or activity information
- enough links to related objects
