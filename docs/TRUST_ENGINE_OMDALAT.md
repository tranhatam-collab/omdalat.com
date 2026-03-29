# TRUST_ENGINE_OMDALAT
## Version 1.0

---

# 1. Purpose

The trust engine helps OMDALAT distinguish:

- real from generic
- verified from unverified
- active from stale
- proof-backed from decorative

It is a product differentiator, not a cosmetic badge layer.

---

# 2. Trust Inputs

Primary inputs:

- verification status
- proof count
- proof quality
- activity recency
- completion history
- moderation status
- relationship strength to other verified entities

Secondary inputs:

- profile completeness
- response reliability
- local consistency

---

# 3. Trust Outputs

Public outputs:

- trust label
- verification state
- proof count
- activity status

Internal outputs:

- local trust score
- moderation flags
- review priority

---

# 4. Trust Labels

Recommended public labels:

- Unverified
- Basic
- Verified
- Proof-backed
- Trusted Local Node

These labels should remain calm and readable.

---

# 5. Trust Rules

No entity becomes "Verified" without a verification record.

No entity becomes "Proof-backed" without at least one accepted proof.

No entity should appear highly trusted if it is:

- flagged
- hidden
- stale with no recent activity

---

# 6. Proof Weighting

Proofs should weigh more when they are:

- recent
- specific
- linked to real entities
- accepted through review or trusted process

Proofs should weigh less when they are:

- ambiguous
- old
- weakly linked
- pending review only

---

# 7. Visibility Effects

Higher-trust entities may receive:

- stronger placement in local listings
- stronger recommendation priority
- clearer trust presentation

Lower-trust or unresolved entities may receive:

- lower visibility
- review prompts
- trust improvement prompts

---

# 8. Public UI Requirements

Trust UI should show:

- one concise label
- one verification state
- one proof count
- optional activity marker

Do not show opaque numeric scoring without explanation.

---

# 9. Admin Requirements

Admins must be able to:

- inspect trust inputs
- review proofs
- review verifications
- change visibility state
- record moderation decisions

Every manual trust-affecting action must be logged.
