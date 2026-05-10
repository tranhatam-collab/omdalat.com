# DB_SCHEMA_OMDALAT
## Version 1.0

---

# 1. Tables

Core tables:

- users
- nodes
- places
- hosts
- experts
- communities
- events
- requests
- proofs
- verifications
- trust_summaries
- bookings
- interactions

Join tables:

- place_hosts
- community_members
- event_proofs
- entity_links

---

# 2. users

Primary columns:

- id
- display_name
- email
- phone
- avatar_url
- city
- account_status
- verification_status
- created_at
- updated_at

---

# 3. nodes

Primary columns:

- id
- owner_user_id
- node_type
- name
- slug
- description
- locality
- visibility_status
- status
- created_at
- updated_at

---

# 4. places

Primary columns:

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
- created_at
- updated_at

---

# 5. hosts

Primary columns:

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
- created_at
- updated_at

---

# 6. experts

Primary columns:

- id
- node_id
- slug
- name
- categories_json
- locality
- short_summary
- description
- availability
- trust_score
- created_at
- updated_at

---

# 7. communities

Primary columns:

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
- created_at
- updated_at

---

# 8. events

Primary columns:

- id
- slug
- title
- event_type
- start_at
- end_at
- locality
- place_id
- host_id
- community_id
- status
- created_at
- updated_at

---

# 9. requests

Primary columns:

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
- created_at
- updated_at

---

# 10. proofs

Primary columns:

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
- created_at
- updated_at

---

# 11. verifications

Primary columns:

- id
- subject_type
- subject_id
- verification_type
- status
- submitted_at
- resolved_at
- notes

---

# 12. trust_summaries

Primary columns:

- id
- subject_type
- subject_id
- verification_state
- proof_count
- activity_score
- local_trust_score
- visibility_state
- updated_at

---

# 13. bookings

Primary columns:

- id
- place_id optional
- host_id optional
- requester_node_id
- starts_at
- ends_at
- booking_status
- payment_status
- created_at
- updated_at

---

# 14. interactions

Primary columns:

- id
- interaction_type
- actor_node_id
- target_entity_type
- target_entity_id
- status
- created_at

---

# 15. Notes

The schema should remain friendly to:

- SQLite/D1
- PostgreSQL
- export-friendly analytics
- append-only proof and trust history
