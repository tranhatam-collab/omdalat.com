# OMDALAT.COM
## Final Master Lock File
## Brand + Product + UI + SEO + Data + Dev + Deploy + Growth
## Version 1.0 — FINAL LOCK

---

# 1. BẢN CHẤT (CORE DEFINITION)

OMDALAT không phải:
- web du lịch
- blog Đà Lạt
- landing page giới thiệu
- cổng thông tin thành phố thông thường
- startup showcase

OMDALAT là:

```
→ City Node của OMDALA
→ Living Intelligence City
→ Real-world activation layer
→ Trust-based local system
→ Proof-driven ecosystem
```

**Câu định nghĩa chuẩn (dùng nhất quán trong toàn bộ hệ thống):**

> OMDALAT is the first living intelligence city built on OMDALA,
> where people, places, and communities activate real-world value
> through trust and coordination.

**Tagline chính:**

> Where OMDALA becomes real.

---

# 2. VAI TRÒ TRONG HỆ SINH THÁI

| Layer | Vai trò |
|---|---|
| OMDALA | Global system — defines the architecture |
| OMDALAT | Local implementation — proves the system works |

OMDALAT phải tạo ra:
- **density** — mật độ hoạt động thực
- **proof** — bằng chứng có thể kiểm chứng
- **trust** — niềm tin được đo lường
- **network** — mạng lưới con người và địa điểm thật

OMDALAT chỉ tồn tại thực sự khi có:
- activity thật
- con người thật
- địa điểm thật
- tương tác thật

Không phải khi có UI đẹp, code tốt, hay SEO chuẩn.

---

# 3. SEO ENTITY & POSITIONING

## 3.1 Core Entities

| Entity | Role |
|---|---|
| OMDALAT | masterbrand, city node |
| Da Lat / Đà Lạt | locality anchor |
| Living Intelligence City | concept entity |
| Trusted Local Network | value entity |

## 3.2 Primary Search Intent

- Da Lat community / trusted network
- places, hosts, experts, communities in Da Lat
- local activities and events
- smart city / eco-tech Da Lat
- city innovation ecosystem

## 3.3 SEO Title: Homepage

```
OMDALAT — The First Living Intelligence City in Da Lat
```

## 3.4 SEO Meta Description: Homepage

```
OMDALAT connects trusted places, hosts, experts, communities,
and real-world activity in Da Lat — the first living intelligence
city layer built on OMDALA.
```

---

# 4. URL ARCHITECTURE

```
/                           Homepage
/places                     Listing
/places/[slug]              Detail
/hosts                      Listing
/hosts/[slug]               Detail
/experts                    Listing
/experts/[slug]             Detail
/communities                Listing
/communities/[slug]         Detail
/events                     Listing
/events/[slug]              Detail
/proofs                     Listing
/proofs/[slug]              Detail
/join                       Onboarding entry
/about                      About OMDALAT
/vision                     Vision page
/trust                      Trust system explanation
/faq                        FAQ
/contact                    Contact
```

**URL rules:**
- lowercase only
- hyphens only, no underscores
- descriptive slugs
- stable — do not change slugs after publishing
- no raw IDs in public URLs

---

# 5. DATA MODEL (CORE ENTITIES)

## 5.1 Entity List

```
User
Node
Place
Host
Expert
Community
Event
Proof
TrustScore
Verification
Booking
Interaction
```

## 5.2 Relationships

```
User        → Node
Node        → Place | Host | Expert | Community
Place       → Host
Community   → Event
Event       → Proof
All         → TrustScore
```

## 5.3 Entity Rules

- every entity has a unique slug
- every entity has a trust score
- every entity has a verification status
- no entity is published without minimum content
- every entity links to related entities

---

# 6. PRODUCT MODULES

| # | Module | Mô tả |
|---|---|---|
| 1 | Identity / Node | Hồ sơ người dùng, vai trò, trust |
| 2 | Places | Không gian thật, location, loại hình |
| 3 | Hosts | Người vận hành không gian |
| 4 | Experts | Kỹ năng / chuyên môn / dịch vụ |
| 5 | Communities | Nhóm / network thực |
| 6 | Events | Hoạt động thực diễn ra |
| 7 | Proofs | Bằng chứng hoạt động thực tế |
| 8 | Trust | Hệ thống điểm tin cậy |

**Build priority:**

```
1. Homepage
2. Places
3. Hosts
4. Experts
5. Communities
6. Events
7. Proofs
8. Trust
```

---

# 7. UI SYSTEM

## 7.1 Tone

- xanh thiên nhiên
- sương nhẹ
- sống và thở
- không digital lạnh
- không neon

## 7.2 Color System

```css
/* Green scale */
--green-900: #0F3D2E;
--green-800: #155C44;
--green-700: #1E7A5B;
--green-600: #2F9E72;
--green-500: #4FC38A;
--green-400: #7DE0A9;
--green-300: #B7F3CF;

/* Mist */
--mist-100: #F4F8F6;
--mist-200: #E8F0EC;
--mist-300: #D5E3DD;

/* Earth */
--earth-700: #5A4636;
--earth-500: #8B6B4F;
--earth-300: #C2A98A;

/* Accent */
--accent:    #00E38A;
--light:     #EFFFF5;

/* Semantic */
--bg-primary:     linear-gradient(135deg, #0F3D2E 0%, #1E7A5B 40%, #4FC38A 100%);
--text-primary:   #EFFFF5;
--text-secondary: #B7F3CF;
--text-muted:     rgba(183, 243, 207, 0.55);
--accent-glow:    rgba(0, 227, 138, 0.15);
```

## 7.3 UI Không được

```
❌ màu neon
❌ UI crypto / Web3
❌ dashboard cứng SaaS
❌ UI template generic
❌ du lịch postcard
```

---

# 8. DESIGN SYSTEM

## 8.1 Typography

```
Heading:  Sora, Manrope
Body:     Inter, SF Pro, Manrope
```

## 8.2 Gradient

```css
/* Primary */
background: linear-gradient(135deg, #0F3D2E 0%, #1E7A5B 40%, #4FC38A 100%);

/* Mist overlay */
background: radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 60%);

/* Accent glow */
background: radial-gradient(circle at center, rgba(0,227,138,0.15), transparent 55%);
```

## 8.3 Card

```css
background:      rgba(255,255,255,0.05);
border:          1px solid rgba(255,255,255,0.08);
backdrop-filter: blur(20px);
border-radius:   20px;
box-shadow:      0 18px 36px rgba(0,0,0,0.18);
```

## 8.4 Button

```css
/* Primary */
background:    linear-gradient(135deg, #1E7A5B, #4FC38A);
color:         #EFFFF5;
border-radius: 999px;
padding:       12px 28px;
font-weight:   600;
```

## 8.5 Spacing

```
4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 96
```

## 8.6 Radius

```
12 · 16 · 20 · 28 · 999(pill)
```

## 8.7 Motion

```css
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   400ms ease;
--transition-breath: 600ms ease-in-out;
```

Motion phải: chậm · mềm · có chủ đích · không loạn

---

# 9. HOMEPAGE STRUCTURE

| # | Section | Nội dung |
|---|---|---|
| 1 | Hero | H1, tagline, CTA, hero visual |
| 2 | What is OMDALAT | Định nghĩa, vai trò, brand |
| 3 | Live Activity | Hoạt động thời gian thực |
| 4 | Places | Địa điểm tin cậy |
| 5 | Hosts | Người vận hành |
| 6 | Experts | Chuyên gia |
| 7 | Communities | Cộng đồng |
| 8 | Events | Sự kiện |
| 9 | Proof | Bằng chứng |
| 10 | Join | CTA gia nhập |

**Hero H1:**
```
OMDALAT — The First Living Intelligence City in Da Lat
```

**Hero copy must be server-rendered HTML, not JS-injected.**

---

# 10. SEO LOCK

## 10.1 Core Rules

- every indexable page has a unique `<title>`
- every indexable page has a unique `<meta description>`
- every indexable page has real visible text content
- no empty indexed pages
- every listing links to detail pages
- every detail page links to parent listing and related entities
- canonical on every public page
- structured data (JSON-LD) on every major page type

## 10.2 Title Templates

```
Homepage:      OMDALAT — The First Living Intelligence City in Da Lat
Place:         [Place Name] | OMDALAT Place in Da Lat
Host:          [Host Name] | OMDALAT Host in Da Lat
Expert:        [Expert Name] | OMDALAT Expert in Da Lat
Community:     [Community Name] | OMDALAT Community in Da Lat
Event:         [Event Name] | OMDALAT Event in Da Lat
Listing:       Places in OMDALAT | Trusted Spaces in Da Lat
```

## 10.3 Head Output (required on every indexable page)

```html
<title>[Page Title]</title>
<meta name="description"    content="[Description]" />
<link rel="canonical"       href="https://omdalat.com/[path]" />
<meta name="robots"         content="index, follow" />

<meta property="og:title"       content="[Page Title]" />
<meta property="og:description" content="[Description]" />
<meta property="og:image"       content="https://omdalat.com/og/[image].jpg" />
<meta property="og:url"         content="https://omdalat.com/[path]" />
<meta property="og:type"        content="website" />

<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="[Page Title]" />
<meta name="twitter:description" content="[Description]" />
<meta name="twitter:image"       content="https://omdalat.com/og/[image].jpg" />

<script type="application/ld+json">
{ ...JSON-LD appropriate to page type... }
</script>
```

## 10.4 Structured Data by Page Type

| Page type | Schema |
|---|---|
| Homepage | `Organization`, `WebSite` |
| Place detail | `Place` or `LocalBusiness` |
| Host / Expert | `Person` |
| Event | `Event` |
| Listing | `ItemList` |
| All details | `BreadcrumbList` |
| FAQ | `FAQPage` |

## 10.5 robots.txt

```
Allow:    / (all public pages)
Disallow: /admin/
Disallow: /api/private/
Disallow: /preview/
Disallow: /staging/
```

If the authenticated product is deployed on `https://app.omdalat.com`, block indexing on that host directly.
Only add `Disallow: /app/` when the authenticated experience lives under the same `omdalat.com` host.

## 10.6 Sitemap

```
/sitemap.xml
/sitemaps/places.xml
/sitemaps/hosts.xml
/sitemaps/experts.xml
/sitemaps/communities.xml
/sitemaps/events.xml
```

Auto-update as entities are published or archived.

## 10.7 Multilingual

```
/vi/...   Vietnamese (primary)
/en/...   English (future)
```

hreflang required when multilingual is activated.
Never serve different language on same URL based on IP or browser.

## 10.8 Page Quality Bar

A page may be indexed only if:
- [ ] has clear topic and real content
- [ ] has unique title and meta description
- [ ] has canonical
- [ ] has JSON-LD
- [ ] is internally linked from at least one hub page
- [ ] is not thin or duplicative

---

# 11. TRUST SYSTEM

## 11.1 Trust Score Inputs

| Input | Weight |
|---|---|
| Verification | high |
| Proof submissions | high |
| Activity completion | medium |
| Feedback received | medium |
| Interaction history | low |

## 11.2 Trust Score Outputs

| Output | Effect |
|---|---|
| Ranking | higher visibility in listings |
| Credibility badge | shown on profile / place card |
| Access level | unlocks advanced features |

## 11.3 Trust Rules

- trust score must be calculated from real verified data
- no fake verification
- no bought scores
- trust must decay if activity stops

---

# 12. AI SYSTEM RULES

**AI may:**
- generate content drafts from structured source data
- suggest metadata (title, description)
- generate JSON-LD schema
- suggest internal linking
- draft FAQ entries
- analyze activity patterns

**AI must NOT:**
- fabricate local facts
- create fake proofs or fake events
- mass-produce thin duplicate pages
- autonomously publish indexable content without human validation

---

# 13. DEV ARCHITECTURE

## 13.1 App Structure

```
apps/
  web/       → omdalat.com        (public website, SSR)
  app/       → app.omdalat.com    (authenticated dashboard)
  admin/     → admin.omdalat.com  (internal moderation, noindex)
  docs/      → docs.omdalat.com   (public documentation)

packages/
  ui/        → shared component library
  core/      → business logic
  types/     → shared TypeScript types
  seo/       → metadata and schema helpers
  config/    → shared tooling and TS config

services/
  api/       → backend API layer
  worker-jobs/ → background tasks
  notifications/ → outbound delivery
  search/    → discovery indexing
```

## 13.2 Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (SSR / hybrid) |
| Hosting | Cloudflare Pages |
| Database | Cloudflare D1 |
| Storage | Cloudflare R2 |
| Auth | (to be defined) |

## 13.3 CSS Token Structure

```
tokens.css         → shared spacing, radius, blur, shadow, transition
theme-omdalat.css  → OMDALAT-specific color and design vars
```

```css
/* Root class activation */
.theme-omdalat { ... }
```

---

# 14. SEO TECH RULES FOR DEV

| Rule | Requirement |
|---|---|
| Rendering | SSR or hybrid — not CSR-only for public pages |
| Metadata | server-rendered — not JS-injected |
| Canonical | present on every public page |
| Sitemap | auto-generated, submitted to Google Search Console |
| robots.txt | configured from day one |
| Breadcrumbs | present on all detail pages |
| JSON-LD | centrally supported at framework level |
| hreflang | scaffolded from day one |

---

# 15. PERFORMANCE RULES

| Metric | Target |
|---|---|
| LCP | under 2.5s on mobile |
| CLS | under 0.1 |
| JS bundle (content pages) | minimal — code-split aggressively |
| Images | WebP, responsive `srcset`, explicit dimensions |
| Fonts | preloaded, subset if needed |

---

# 16. SECURITY RULES

| Layer | Rule |
|---|---|
| Auth | required for all write operations |
| Roles | enforced at API level |
| Verification | all public entity claims must be verified |
| Anti-spam | rate limiting, captcha where needed |
| Staging | blocked from public indexing |
| Secrets | never committed to repository |

---

# 17. DEPLOYMENT RULES

| Rule | Detail |
|---|---|
| Canonical host | `https://omdalat.com` (no www) |
| Redirects | http → https, www → non-www |
| Staging | blocked from crawlers — robots + noindex + HTTP auth |
| Production | only canonical host is indexable |
| Redirect chains | forbidden — always direct `A → C` |

---

# 18. GROWTH STRATEGY

## Phase 1 — Seed

```
Target:
50 verified nodes
20 real places
10 active hosts
First proof submissions
```

## Phase 2 — Activate

```
Target:
500 active users
100 real events
Measurable trust scores
Repeat interactions
```

## Phase 3 — City Density

```
Target:
Full city coverage
Multi-community activity
Public proof ecosystem
OMDALA integration visible
```

---

# 19. SUCCESS METRICS

| Metric | What it measures |
|---|---|
| Active users | real engagement |
| Real events completed | activity density |
| Verified actions | proof quality |
| Trust score growth | ecosystem health |
| Repeat interactions | retention |
| Entity page SEO traffic | organic discovery |

---

# 20. ANTI-PATTERNS — MUST NEVER DO

```
❌ ship empty indexable pages
❌ use fake data for demos
❌ build UI-only with no real activity
❌ render primary content only via JS
❌ expose staging to search crawlers
❌ use blue-space colors as OMDALAT primary
❌ use tourism postcard visuals
❌ create duplicate metadata across pages
❌ auto-index filter URL variants
❌ mass-generate thin AI pages
❌ build without trust system from the start
```

---

# 21. FINAL SYSTEM RULE

> Nếu không có activity thật, con người thật, địa điểm thật,
> tương tác thật → thì hệ thống chưa tồn tại.

UI đẹp không thay thế được điều này.
Code tốt không thay thế được điều này.
SEO chuẩn không thay thế được điều này.

---

# 22. FINAL BRAND LINE

```
OMDALAT
Where OMDALA becomes real.
```

---

# 23. FINAL DIRECTIVE

Build OMDALAT như một thành phố sống.
Không phải một website.
Không phải một app.
Không phải một portfolio.

Search architecture, product architecture, và trust architecture
phải được build song song từ ngày đầu tiên.

This file is the master lock for OMDALAT.COM.
No direction should move outside this system without explicit approval.

---

*OMDALAT Master Lock — Version 1.0 — Final*
