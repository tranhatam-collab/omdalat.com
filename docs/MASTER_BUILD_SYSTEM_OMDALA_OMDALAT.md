# MASTER_BUILD_SYSTEM_OMDALA_OMDALAT

# OMDALA + OMDALAT
## Full Build System Master File
## Final Strategy + Product + Brand + Repo + Dev Execution
## Version 1.0

---

# 1. MASTER DECISION

OMDALA is the global master brand.
OMDALAT is the first local implementation, city node, living lab, and proof-of-reality layer.

Do not let the two brands drift into two separate company identities.
Do not let OMDALAT become a tourism site.
Do not let OMDALA become a beautiful but empty landing page.

Correct structure:

OMDALA = global operating brand
OMDALAT = first real city implementation of OMDALA

---

# 2. BRAND ARCHITECTURE

## 2.1 OMDALA

Role:
masterbrand
platform brand
system brand
global intelligence layer
trust and coordination layer

Positioning:
OMDALA is the operating layer for real-world value.

Short positioning:
OMDALA activates people, places, and intelligence.

Usage:
OMDALA is the name for:
website
web app
mobile app
docs
API
admin
system modules
global communication
investor materials
developer docs

Brand traits:
calm
premium
intelligent
structured
international
trustworthy
not noisy
not hype-driven

## 2.2 OMDALAT

Role:
first city node
pilot city
living laboratory
real-world activation layer
case-study engine
density engine
local operating environment

Positioning:
OMDALAT is the first living intelligence city built on OMDALA.

Short positioning:
OMDALAT is where OMDALA becomes real.

Usage:
OMDALAT is the name for:
city implementation site
local network
local nodes
hosts
experts
communities
places
events
requests
proofs
real activity

Brand traits:
alive
intelligent
rooted
verified
local
future-facing
human
high-trust

---

# 3. RELATIONSHIP BETWEEN THE TWO BRANDS

OMDALA answers:
what the system is
how it works
why it matters globally
what products and layers exist
how developers and users enter the system

OMDALAT answers:
what the system looks like in real life
which places are active
which people are active
which communities are real
what proof exists
how density works in one geography

Formula:
OMDALA defines
OMDALAT demonstrates

Or:
OMDALA is the architecture
OMDALAT is the first lived reality

---

# 4. CATEGORY DEFINITION

Do not call OMDALA:
social network
marketplace
AI tool
booking platform
community app

Use:
Human Coordination OS
Life Resource Operating System
Trust Based Real-World Coordination Platform

Preferred main category:
Human Coordination OS

Supporting description:
A system that helps people, places, and communities activate underused resources through trust, coordination, and intelligence.

---

# 5. CORE STORY

The world is not poor in value.
The world is poor in visibility, trust, and coordination.

People waste:
time
rooms
skills
space
relationships
local opportunities
small community capacity
trust potential

OMDALA exists to turn those underused resources into real outcomes.
OMDALAT is the first place where that transformation becomes visible and measurable.

---

# 6. DOMAIN STRATEGY

## 6.1 Global Layer

omdala.com
Purpose:
global homepage
brand definition
system definition
entry point to app and docs
investor-ready front door

app.omdala.com
Purpose:
main user product
dashboard
nodes
resources
offers
requests
matches
trust
bookings
AI

api.omdala.com
Purpose:
backend API
auth
resources
offers
requests
matching
trust
payments
AI actions

docs.omdala.com
Purpose:
developer docs
product docs
API docs
system specs
trust model
AI model
integration guides

admin.omdala.com
Purpose:
internal moderation
support
trust review
verification
ops dashboards

## 6.2 Local Layer

omdalat.com
Purpose:
city implementation brand site
real activity layer
city proof layer
local onboarding
local density showcase

app.omdalat.com
Purpose:
local city experience
filtered city view
live nodes
places
requests
events
hosts
proofs
matching by locality

Optional future:
api.omdalat.com only if local services diverge later

---

# 7. SUB-BRAND SYSTEM UNDER OMDALA

Approved naming:

OMDALA Home
OMDALA Node
OMDALA Trust
OMDALA Match
OMDALA Host
OMDALA Flow
OMDALA Mobile
OMDALA Admin
OMDALA Docs
OMDALA API

Rules:
always begin with OMDALA
second word must be short
second word must be functional
no vague naming
no crypto language
no hype wording

OMDALAT may mirror selected local modules:

OMDALAT Places
OMDALAT Hosts
OMDALAT Experts
OMDALAT Communities
OMDALAT Events
OMDALAT Proofs

---

# 8. REPO STRATEGY

Current verified state:
both `omdala.com` and `omdalat.com` already contain an initial brand foundation, DEV handoff docs, and static landing scaffolds pushed to `main`.

Production-ready recommendation for this repository:

Treat `omdalat.com` as the source-of-truth repository for the first local city implementation.

Repository-specific ownership:

- `apps/web` = public `omdalat.com`
- `apps/app` = local operating layer for `app.omdalat.com`
- `apps/admin` = internal moderation and ops
- `apps/docs` = public documentation for the OMDALAT system

Reason:

- shared types
- shared design system
- shared auth logic
- shared API contracts
- shared deployment discipline

Recommended target structure for `omdalat.com`:

```text
omdalat.com/
  README.md
  package.json
  pnpm-workspace.yaml
  turbo.json

  apps/
    web/
    app/
    admin/
    docs/

  packages/
    ui/
    brand/
    config/
    types/
    auth/
    db/
    core/
    trust/
    matching/
    ai/
    analytics/

  services/
    api/
    worker-jobs/
    search/
    billing/
    notifications/

  docs/
    brand/
    product/
    architecture/
    data/
    ai/
    trust/
    security/
    launch/
```

Future integration rule:

If OMDALA later consolidates repos into a wider platform monorepo, this repository can be absorbed as the OMDALAT domain slice.

Near-term practical rule:
keep `omdalat.com` buildable on its own now, and preserve `apps/web = omdalat.com` plus `apps/app = app.omdalat.com` if the codebase is migrated later.

---

# 9. TECHNOLOGY STACK

## 9.1 Frontend

Next.js
Tailwind CSS
Framer Motion where useful

## 9.2 Backend

Cloudflare Workers
Cloudflare D1
Cloudflare R2
Cloudflare Queues

## 9.3 Auth

Magic link or email auth first
MFA for admin
Role-based authorization required

## 9.4 Payments

Stripe first

## 9.5 AI

LLM gateway through controlled backend layer
AI outputs must create structured drafts and suggestions

---

# 10. SYSTEM LAYERS

## 10.1 Brand Layer
OMDALA
OMDALAT

## 10.2 Experience Layer
public web
web app
mobile app later
city layer experience

## 10.3 Core Product Layer
users
nodes
resources
offers
requests
matches
messages
bookings
payments
trust
proofs

## 10.4 Intelligence Layer
AI suggestions
resource activation logic
matching engine
opportunity engine
trust engine

## 10.5 Governance Layer
verification
moderation
role permissions
admin actions
audit trail

---

# 11. PRODUCT SURFACES TO BUILD

## 11.1 OMDALA.COM

Must explain:
what OMDALA is
why it matters
what layers exist
who it serves
how it works
why trust is central
why OMDALAT exists
how to enter the system

## 11.2 APP.OMDALA.COM

Must include:
Home
My Node
Resources
Offers
Requests
Matches
Messages
Bookings
Transactions
Trust
Settings

## 11.3 OMDALAT.COM

Must show reality, not concept.

Required sections:
Live Places
Active Hosts
Active Experts
Current Requests
Upcoming Events
Trusted Communities
Proof of Activity
Join OMDALAT

## 11.4 ADMIN.OMDALA.COM

Must allow:
user search
node search
offer moderation
request moderation
proof review
verification review
booking review
payment inspection
account flagging
trust inspection
support actions

## 11.5 DOCS.OMDALA.COM

Must include:
Getting Started
What is OMDALA
What is OMDALAT
API reference
Data model
Trust model
AI model
Developer setup
Design system
Roadmap

---

# 12. DATA MODEL CORE

Core entities:
User
Node
Resource
Offer
Request
Match
Conversation
Message
Booking
Payment
Proof
Verification
TrustEvent
Notification
Community
Event
Place

Special OMDALAT rule:
support locality-sensitive fields such as:
place_type
district_or_area
city_scope
local_trust_score
live_status
local_proof_count

---

# 13. BUILD PRIORITY

Phase 1
Brand and public foundation

Phase 2
Core product foundation

Phase 3
Interaction layer

Phase 4
Transaction + trust

Phase 5
OMDALAT implementation

Phase 6
Admin and docs

Phase 7
AI layer

---

# 14. DESIGN SYSTEM RULES

The system must feel:
premium
minimal
calm
clear
dark-capable
mobile-first
operational
not noisy

OMDALA look:
more global
more structured
more architectural
more restrained

OMDALAT look:
still premium
more alive
more human
more local
more real activity
more proof and motion

---

# 15. COPY SYSTEM RULES

Avoid:
startup hype
AI magic language
crypto language
social vanity wording
tourism cliche wording

Use:
clear
human
precise
operational
elevated
international

Rule:
OMDALA = explanation
OMDALAT = evidence

---

# 16. GIT EXECUTION PLAN FOR DEV

First commit sequence for the `omdalat.com` implementation:

Commit 01
Initialize workspace foundation

Commit 02
Add apps/web with OMDALAT public homepage shell

Commit 03
Add apps/app with local operating shell

Commit 04
Add shared packages and design tokens

Commit 05
Add services/api base

Commit 06
Add places + hosts + requests + proofs model

Commit 07
Add public listing routes and detail templates

Commit 08
Add trust + verification + proof surfaces

Commit 09
Add admin shell

Commit 10
Add docs shell

Commit 11
Integrate with OMDALA platform APIs

Commit 12
Add CI, quality checks, and release discipline

Branching:
main = production-ready only
develop = staging integration
feature/* = new modules
hotfix/* = urgent fixes

---

# 17. INITIAL ROUTE MAP

Public web (`apps/web`):
/
/places
/hosts
/experts
/communities
/events
/proofs
/join
/about
/vision
/trust
/faq
/contact

Local app (`apps/app`):
/ 
/dashboard
/places
/hosts
/experts
/communities
/events
/proofs
/profile
/settings

Admin (`apps/admin`):
/
/users
/places
/hosts
/experts
/communities
/events
/proofs
/verifications
/moderation

Docs (`apps/docs`):
/
/brand
/product
/seo
/trust
/api
/data-model

Future OMDALA platform integration:

/omdala
/omdala/app
/omdala/docs

Shared API concepts:
/nodes
/resources
/offers
/requests
/matches
/messages
/bookings
/transactions
/payments

---

# 18. API MAP

/v1/auth
/v1/users
/v1/nodes
/v1/resources
/v1/offers
/v1/requests
/v1/matches
/v1/messages
/v1/bookings
/v1/payments
/v1/trust
/v1/proofs
/v1/verifications
/v1/communities
/v1/events
/v1/places
/v1/ai
/v1/admin

Local OMDALAT behavior should use locality filters and context first, not a completely separate API unless needed later.

---

# 19. TRUST RULES

Trust must not be cosmetic.

Inputs:
verification
completion
proof
payment reliability
response quality
repeat interaction
community confirmation

Outputs:
better visibility
better match ranking
higher confidence
better local credibility

OMDALAT must visibly demonstrate trust through:
verified places
active hosts
proof-backed activities
real completions

---

# 20. AI RULES

AI must:
suggest
draft
summarize
structure
rank opportunities

AI must not:
invent proofs
invent trust
invent bookings
invent verification
take high-impact actions without confirmation

---

# 21. SUCCESS METRICS

OMDALA metrics:
homepage clarity
signup conversion
node creation
resource creation
offer creation
request creation
match generation
booking completion
proof upload
trust growth

OMDALAT metrics:
active local nodes
verified places
live requests
completed local activities
repeat trusted interactions
density by area
proof-backed activity count

---

# 22. CRITICAL RULES

Product rule:
If a feature does not help activate value, coordinate action, build trust, create proof, or increase real-world usefulness, do not build it.

Brand rule:
If a page makes OMDALA feel like a random AI startup, shallow marketplace, generic city portal, tourism site, or noisy social app, it is wrong.

---

# 23. WHAT DEV MUST DO NOW

1. lock brand hierarchy
2. lock naming system
3. lock route map
4. lock core data model
5. initialize monorepo
6. set up apps/web, apps/app, apps/admin, apps/docs
7. create shared UI package
8. create shared types package
9. build OMDALAT public web first
10. build OMDALAT app shell second
11. build admin and docs shells third
12. build auth and node model
13. build resource, offer, and request flows
14. build matching and messaging
15. add booking, payment, trust
16. add admin
17. add docs
18. add AI helpers

---

# 24. FINAL STRATEGIC SENTENCE

OMDALA is the global coordination layer.
OMDALAT is the first place where that layer becomes visible, trusted, and real.

Build OMDALA as infrastructure.
Build OMDALAT as proof.
