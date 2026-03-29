# API_SPEC_OMDALAT
## Version 1.0

---

# 1. Principles

API design must be:

- explicit
- role-aware
- locality-aware
- trust-aware
- versioned from the start

Base path:

- `/v1`

---

# 2. Public Read APIs

## 2.1 Places

- `GET /v1/places`
- `GET /v1/places/:slug`

## 2.2 Hosts

- `GET /v1/hosts`
- `GET /v1/hosts/:slug`

## 2.3 Experts

- `GET /v1/experts`
- `GET /v1/experts/:slug`

## 2.4 Communities

- `GET /v1/communities`
- `GET /v1/communities/:slug`

## 2.5 Events

- `GET /v1/events`
- `GET /v1/events/:slug`

## 2.6 Proofs

- `GET /v1/proofs`
- `GET /v1/proofs/:slug`

## 2.7 Requests

- `GET /v1/requests`
- `GET /v1/requests/:id`

---

# 3. Local App APIs

## 3.1 Auth

- `POST /v1/auth/login`
- `POST /v1/auth/logout`
- `GET /v1/auth/session`

## 3.2 Profile and node

- `GET /v1/me`
- `PATCH /v1/me`
- `GET /v1/nodes/:id`
- `PATCH /v1/nodes/:id`

## 3.3 Requests

- `POST /v1/requests`
- `PATCH /v1/requests/:id`
- `POST /v1/requests/:id/submit`
- `POST /v1/requests/:id/archive`

## 3.4 Proofs

- `POST /v1/proofs`
- `PATCH /v1/proofs/:id`
- `POST /v1/proofs/:id/submit`

## 3.5 Trust

- `GET /v1/trust/:subjectType/:subjectId`
- `GET /v1/verifications/:subjectType/:subjectId`

---

# 4. Admin APIs

- `GET /v1/admin/places`
- `GET /v1/admin/hosts`
- `GET /v1/admin/experts`
- `GET /v1/admin/communities`
- `GET /v1/admin/events`
- `GET /v1/admin/proofs`
- `GET /v1/admin/verifications`
- `POST /v1/admin/proofs/:id/review`
- `POST /v1/admin/verifications/:id/review`
- `POST /v1/admin/entities/:type/:id/visibility`

---

# 5. Common Filters

Public listing endpoints should support:

- `area`
- `type`
- `verification`
- `activity`
- `page`
- `limit`
- `sort`

Events should also support:

- `date_from`
- `date_to`

---

# 6. Response Shape Principles

Responses should include:

- stable id
- slug where public
- locality
- trust summary
- verification state
- related entities when useful

List responses should include:

- `items`
- `page`
- `limit`
- `total`

---

# 7. Error Rules

Error responses should include:

- code
- message
- optional field details

Never leak:

- internal moderation notes
- private verification attachments
- hidden trust heuristics
