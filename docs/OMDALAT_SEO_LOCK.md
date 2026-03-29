# OMDALAT.COM
## Master SEO Lock File
## Final SEO Standards for Dev + AI + Content + Product
## Version 1.0

---

# 1. PURPOSE

This document locks the SEO architecture for omdalat.com from day one.

Its purpose is to ensure that:
- the website is crawlable
- the website is indexable
- the website is understandable by search engines
- the website is structured for multilingual growth
- the website is built for mobile-first indexing
- the website avoids common SEO mistakes from the beginning
- the website supports local and entity-based discovery
- the website can scale without SEO debt

This file is binding for:
- frontend developers
- backend developers
- AI content generation workflows
- product team
- content team
- design team

No page, route, template, or content system should be built outside these SEO rules unless explicitly approved.

---

# 2. SEO POSITIONING OF OMDALAT

OMDALAT is not a tourism blog.
OMDALAT is not a brochure site.
OMDALAT is not a generic city portal.

OMDALAT is:
- a city-node implementation
- a living intelligence city layer
- a local network of places, hosts, experts, communities, and real-world activity
- a trust-backed local operating interface

## 2.1 Primary Search Intent Buckets

- brand searches
- entity searches
- city innovation / smart city / technology city relevance
- place and host discovery
- local community and activity discovery
- expert and service discovery
- trusted local network discovery
- city proof / ecosystem / real activity discovery

## 2.2 Secondary Search Intent Buckets

- Da Lat innovation ecosystem
- Da Lat technology and creative communities
- eco-tech city experiences
- local work, living, retreat, host, community, events
- human-centered smart city narratives

---

# 3. CORE SEO PRINCIPLES

## 3.1 Search engines must understand the page without guessing

Each page must have:
- a clear topic
- a clear primary entity
- a clear page purpose
- clear visible textual content
- crawlable internal links

## 3.2 Every important page must have a unique search role

Do not create near-duplicate pages.
Do not create multiple weak pages targeting the same intent without a hierarchy.

## 3.3 Text must exist in HTML

Critical page meaning must not depend only on client-side JavaScript rendering.
Primary content, title, headings, intro text, and internal links must exist in server-rendered HTML.

## 3.4 Mobile is primary

The mobile version is the primary version for layout, content parity, metadata parity, and indexability.

## 3.5 Structured data must support visible reality

Only mark up content that is actually visible and true on the page.

## 3.6 Local intent must be explicit

Pages related to places, hosts, experts, and communities must clearly indicate locality and role.

## 3.7 OMDALAT must build entity strength, not only page count

The site should strengthen the entity:
OMDALAT · Da Lat · places · hosts · experts · communities · events · proof-backed activity

---

# 4. URL ARCHITECTURE

## 4.1 Preferred Route Structure

```
/
/places
/places/[slug]
/hosts
/hosts/[slug]
/experts
/experts/[slug]
/communities
/communities/[slug]
/events
/events/[slug]
/proofs
/proofs/[slug]
/join
/about
/vision
/trust
/faq
/contact
```

## 4.2 URL Rules

- lowercase only
- hyphens only, no underscores, no spaces
- no random IDs in public URLs unless technically necessary
- stable URLs — avoid changing slugs
- avoid query-string indexed pages for core content
- use descriptive slugs

## 4.3 Slug Rules

```
Good:
/places/pine-hill-house
/hosts/tran-ha-tam
/communities/creative-living-dalat

Bad:
/place?id=183
/host_01
/community-page-final-v2
```

---

# 5. INDEXABLE PAGE TYPES

**Should be indexable:**
- homepage
- high-value listing pages
- detail pages with real content
- city / vision / about pages
- trust page
- FAQ page
- proof pages (if public and useful)
- event / place / expert / community pages (if real and useful)

**Should NOT be indexable:**
- login, user dashboard, internal app states
- empty filtered search pages
- duplicate tag pages
- temporary onboarding / coming-soon pages
- staging and preview pages
- admin pages
- low-content shells

---

# 6. TITLE TAG RULES

## 6.1 General Rules

- every indexable page must have a unique title
- primary keyword or entity should appear naturally
- keep titles concise and useful
- include OMDALAT where strategically helpful
- avoid keyword stuffing

## 6.2 Homepage Title

```
OMDALAT — The First Living Intelligence City in Da Lat
OMDALAT — Da Lat's Living Intelligence City Layer  [alternative]
```

## 6.3 Listing Page Templates

```
Places in OMDALAT | Trusted Spaces in Da Lat
Hosts in OMDALAT | Verified Local Hosts in Da Lat
Experts in OMDALAT | Local Experts and Human Networks in Da Lat
Communities in OMDALAT | Trusted Local Communities in Da Lat
Events in OMDALAT | Real Activity and Gatherings in Da Lat
```

## 6.4 Detail Page Templates

```
[Place Name] | OMDALAT Place in Da Lat
[Host Name] | OMDALAT Host in Da Lat
[Expert Name] | OMDALAT Expert in Da Lat
[Community Name] | OMDALAT Community in Da Lat
[Event Name] | OMDALAT Event in Da Lat
```

---

# 7. META DESCRIPTION RULES

## 7.1 General Rules

- every important page must have a unique meta description
- summarize the page honestly
- include city relevance where appropriate
- avoid clickbait, avoid repeating the title

## 7.2 Homepage Meta Description

```
OMDALAT is the first living intelligence city layer in Da Lat,
connecting trusted places, hosts, experts, communities,
and real-world activity.
```

---

# 8. HEADING STRUCTURE RULES

## 8.1 One H1 per page, reflecting primary intent

| Page | H1 |
|---|---|
| Homepage | OMDALAT — The First Living Intelligence City in Da Lat |
| Places listing | Trusted Places in OMDALAT |
| Host detail | [Host Name] |
| Community detail | [Community Name] |
| Event detail | [Event Name] |

## 8.2 Hierarchy must be logical

```
H1
  H2
    H3
```

Do not skip heading levels for visual styling purposes.

---

# 9. CONTENT RULES

## 9.1 Every indexable page must contain real text

No page should rely only on cards, maps, or UI components without explanatory copy.

## 9.2 Minimum content standard per indexable page

- a clear intro paragraph
- descriptive body text
- context about what the page represents
- useful structured details
- internal links to related entities

## 9.3 Do not index thin content pages

Thin page signals to avoid indexing:
- only one name and one line
- empty cards
- "coming soon"
- placeholder components
- auto-generated filler paragraphs
- generic duplicated intros

## 9.4 AI content rules

AI may assist drafting, but content must be:
- truthful and entity-specific
- locally relevant
- non-duplicative
- edited for clarity

AI must NOT generate:
- fake local facts
- fake testimonials
- fake events or fake proof content
- spun duplicate pages

---

# 10. INTERNAL LINKING RULES

## 10.1 All internal links must be crawlable

Use standard anchor tags. Do not rely on JS-only click handlers for crawl paths.

## 10.2 Detail pages must link to

- parent listing
- related entities
- city context pages where relevant

## 10.3 Listing pages must link to

- child detail pages
- trust pages
- join / participation pages

## 10.4 Use descriptive anchor text

```
Good:
Trusted places in OMDALAT
Meet local hosts in Da Lat
Explore expert networks in OMDALAT

Bad:
Click here
Read more
View page
```

---

# 11. CANONICAL RULES

## 11.1 Every indexable page must output a self-referencing canonical

## 11.2 Canonical must reflect the preferred public URL

Avoid mixed canonical states from:
- trailing slash inconsistency
- www / non-www inconsistency
- http / https inconsistency
- query string variants
- preview URLs

## 11.3 Do not canonicalize away distinct useful pages

Only consolidate actual duplicates.

**Preferred canonical host:**
```
https://omdalat.com
```

---

# 12. MULTILINGUAL SEO RULES

OMDALAT must be multilingual-ready from the start.

## 12.1 Preferred structure

Use separate URLs per language.

```
/vi/...   Vietnamese
/en/...   English
```

If launching one language first: build Vietnamese, architect routing for /en/ expansion.

## 12.2 hreflang rules

When multilingual is active, every equivalent page must:
- reference all alternates
- include self hreflang
- include `x-default` for homepage or language selector

## 12.3 Language quality rule

Do not auto-translate and index both languages if quality is weak.
Language versions must be real, useful, and consistent.

## 12.4 No content-switching on the same URL

Do not serve different language content from the same URL based on IP or browser language.
Use explicit URL paths.

---

# 13. JAVASCRIPT SEO RULES

## 13.1 Critical SEO content must not rely on client-side rendering alone

Primary visible content must exist in HTML or server-rendered output.

## 13.2 Metadata must be server-rendered

The following must never be JS-only:
- title
- meta description
- canonical
- Open Graph tags
- structured data (JSON-LD)
- hreflang
- robots directives

## 13.3 Internal links must exist in HTML

Do not rely on JS-only click handlers for important crawl paths.

## 13.4 Avoid lazy-loading the meaning of the page

Maps, filters, and interactive components may hydrate later.
Main textual meaning must already exist on load.

## 13.5 Build target: SSR / static / hybrid

Do not default to CSR-only architecture for public SEO pages.

---

# 14. MOBILE-FIRST RULES

## 14.1 Content parity

Mobile pages must contain the same primary content and metadata as desktop.

## 14.2 UX rules

- readable font sizes
- touch-friendly controls
- no intrusive interstitials blocking content
- visible primary content above the fold
- no permanently hidden important text

## 14.3 Performance rules

- optimize hero media
- lazy-load non-critical images
- avoid heavy JS bundles on content pages
- keep layout stable (minimize CLS)
- prioritize fast content rendering (LCP)

---

# 15. ROBOTS RULES

## 15.1 robots.txt must allow crawling of public SEO pages

Do not block:
- CSS and JS required for rendering
- public images
- structured content pages

## 15.2 Disallow examples

```
Disallow: /admin/
Disallow: /app/
Disallow: /api/private/
Disallow: /preview/
Disallow: /staging/
```

## 15.3 robots meta usage

| Directive | Use when |
|---|---|
| `noindex` | thin, internal, or low-value pages |
| `nofollow` | only when truly required |
| `noarchive` | business rules require it |

Do not accidentally place `noindex` on homepage, listing pages, detail pages, language alternates, or trust pages.

---

# 16. XML SITEMAP RULES

## 16.1 Required sitemap

```
/sitemap.xml
```

Optional split sitemaps:
```
/sitemaps/pages.xml
/sitemaps/places.xml
/sitemaps/hosts.xml
/sitemaps/experts.xml
/sitemaps/communities.xml
/sitemaps/events.xml
```

## 16.2 Include only canonical indexable URLs

Do not include: redirects, noindex pages, parameter URLs, preview or admin pages.

## 16.3 Automatic updates

Sitemaps must update as public entities are published or archived.

---

# 17. STRUCTURED DATA RULES

## 17.1 Format

JSON-LD only.

## 17.2 Homepage

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "OMDALAT",
  "url": "https://omdalat.com",
  "description": "The first living intelligence city layer in Da Lat."
}
```

Also include `WebSite` and optionally `SearchAction` if site search is public.

## 17.3 Detail page schema by type

| Page type | Schema type |
|---|---|
| Place | `Place` or `LocalBusiness` |
| Host / Expert | `Person` |
| Event | `Event` |
| Listing page | `ItemList` |
| All detail pages | `BreadcrumbList` |
| FAQ page | `FAQPage` |
| Editorial | `Article` |

## 17.4 Structured data rules

- must match visible page content
- must not mark up hidden or fake content
- must not spam unsupported properties
- must be valid (test via Google Rich Results Test)

## 17.5 Breadcrumb structured data

All major indexable detail pages must emit `BreadcrumbList`.

---

# 18. LOCAL SEO RULES

## 18.1 Local signals on pages

Where relevant, include:
- Da Lat
- Lam Dong
- locality context
- place type
- neighborhood or area context

## 18.2 Place pages must clearly show

- place name and type
- location context
- purpose and verification status
- related hosts or communities

## 18.3 Host pages must clearly show

- host name and role
- locality
- expertise or hosting focus
- related places or communities

## 18.4 Community pages must clearly show

- community name and city relevance
- purpose and activity type
- related events and places

---

# 19. ENTITY SEO RULES

OMDALAT must be built as an entity-rich site.

## 19.1 Core entities to reinforce

OMDALAT · Da Lat · places · hosts · experts · communities · events · proof-backed activity

## 19.2 Entity page rules

Each entity page must:
- have a unique title and unique intro
- state what the entity is
- connect to related entities
- provide real context
- avoid template-only sameness

## 19.3 About / Vision pages

These pages are critical for entity understanding.
They must be substantive, not filler.

---

# 20. IMAGE SEO RULES

## 20.1 File rules

- descriptive filenames (e.g. `pine-hill-house-dalat.jpg` not `IMG_0023.jpg`)
- modern formats (WebP preferred)
- responsive images with `srcset`
- explicit `width` and `height` attributes to prevent layout shift

## 20.2 Alt text rules

- describe the image meaningfully
- do not keyword-stuff alt attributes
- decorative images use empty alt (`alt=""`)

## 20.3 OG image rules

Every major page should have a clear OG image strategy.
Homepage, listings, and detail pages must define og:image.

---

# 21. OPEN GRAPH + SOCIAL META RULES

Required on every public page:

```html
<meta property="og:title"       content="..." />
<meta property="og:description" content="..." />
<meta property="og:image"       content="..." />
<meta property="og:url"         content="..." />
<meta property="og:type"        content="website" />
<meta name="twitter:card"       content="summary_large_image" />
<meta name="twitter:title"      content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image"      content="..." />
```

---

# 22. TEMPLATE RULES

## 22.1 Listing template must include

- unique title and H1
- intro copy
- visible item grid
- pagination handling
- crawlable links to detail pages
- canonical
- structured data (ItemList)

## 22.2 Detail template must include

- title and H1
- intro paragraph
- structured summary
- related entity links
- breadcrumb navigation
- canonical
- JSON-LD

## 22.3 Empty state rule

If a page has no meaningful content:
- apply `noindex` or do not publish it
- never ship empty indexable shells

---

# 23. FILTER, SEARCH, AND FACET RULES

## 23.1 Public search result pages

Only index them if they are stable, useful, and distinct.

## 23.2 Faceted navigation

Do not let unlimited parameter combinations create crawl waste.

## 23.3 Default rule

Uncontrolled filter URLs should be non-indexable unless explicitly promoted.

---

# 24. PAGINATION RULES

## 24.1 Paginated listings must

- remain crawlable
- have unique stable URLs
- not blindly canonicalize all pages to page 1

## 24.2 Page 1 clean URL

```
Preferred: /places
Not:       /places?page=1
```

---

# 25. CONTENT CLUSTER RULES

## 25.1 Core clusters

- city vision
- trusted places
- trusted hosts
- local experts
- communities
- events
- proofs / real activity
- trust and participation

## 25.2 Future editorial clusters

- Da Lat innovation
- eco-technology
- human-centered smart city
- local creative ecosystems
- nature and technology integration

Each cluster must strengthen a coherent topic area, not scatter randomly.

---

# 26. TRUST PAGE SEO RULES

The trust page is strategically important.

It must explain:
- what verification means in OMDALAT
- what proof means
- what trust signals exist
- how reliability is represented
- why this system is different from generic directories

This page helps both users and search engines understand OMDALAT's distinctive logic.

---

# 27. HOMEPAGE SEO REQUIREMENTS

Homepage must include:
- clear H1
- strong intro copy mentioning Da Lat
- visible references to places, hosts, communities, activity
- internal links to main sections
- `Organization` and `WebSite` JSON-LD
- self-canonical
- complete Open Graph metadata
- all primary hero copy in server-rendered HTML

**Recommended H1:**
```
OMDALAT — The First Living Intelligence City in Da Lat
```

---

# 28. PERFORMANCE SEO RULES

## 28.1 Core priorities

- fast initial render (LCP target: under 2.5s on mobile)
- stable layout (CLS target: under 0.1)
- compressed and optimized images
- minimal JS on public content pages
- preloaded critical fonts
- no render-blocking excess

## 28.2 Technical priorities for DEV

- SSR or static for all public SEO pages
- progressively hydrate interactive components
- code-split non-critical UI
- avoid giant client-side JS bundles on content routes
- preload critical fonts responsibly

---

# 29. CRAWL DISCIPLINE RULES

## 29.1 Discovery chain

```
Homepage → main hubs → detail pages → related entities
```

- homepage links to all main sections
- sitemaps submitted to Google Search Console
- no orphan important pages

## 29.2 Orphan page rule

Any important page unreachable through internal links is broken SEO architecture.

---

# 30. STAGING / DEPLOYMENT SEO RULES

## 30.1 Staging must not be indexable

All staging, preview, and test environments must be blocked via:
- `robots.txt` Disallow
- `noindex` meta tag
- HTTP auth where possible

## 30.2 Production host normalization

Preferred:
```
https://omdalat.com
```

Enforce redirects:
- `http` → `https`
- `www.omdalat.com` → `omdalat.com`

---

# 31. REDIRECT RULES

## 31.1 Use 301 permanent redirects for

- canonical host normalization
- old URL migrations
- trailing slash consistency enforcement
- slug changes

## 31.2 Never create redirect chains

`A → B → C` must become `A → C` directly.

---

# 32. AI + SEO CONTENT GOVERNANCE

AI systems used by OMDALAT must follow these safeguards:

**AI should assist:**
- content drafts and summaries
- metadata suggestions
- schema / JSON-LD generation
- internal linking suggestions
- FAQ drafting

**AI must NOT:**
- fabricate local facts
- mass-produce thin pages
- spin duplicate templates
- autonomously publish indexable pages without human validation

---

# 33. REQUIRED FILES FROM DAY ONE

| File / Feature | Status |
|---|---|
| `/robots.txt` | required |
| `/sitemap.xml` | required |
| Canonical tag support per page | required |
| Per-page `<title>` | required |
| Per-page meta description | required |
| Open Graph support | required |
| JSON-LD support | required |
| hreflang scaffolding | required |
| `noindex` support for internal pages | required |
| Redirect rules (http→https, www→non-www) | required |
| Breadcrumb component | required |

---

# 34. REQUIRED `<head>` OUTPUT FOR EVERY INDEXABLE PAGE

```html
<title>[Page Title]</title>
<meta name="description" content="[Page Description]" />
<link rel="canonical" href="https://omdalat.com/[path]" />
<meta name="robots" content="index, follow" />

<meta property="og:title"       content="[Page Title]" />
<meta property="og:description" content="[Page Description]" />
<meta property="og:image"       content="https://omdalat.com/og/[image].jpg" />
<meta property="og:url"         content="https://omdalat.com/[path]" />
<meta property="og:type"        content="website" />

<meta name="twitter:card"        content="summary_large_image" />
<meta name="twitter:title"       content="[Page Title]" />
<meta name="twitter:description" content="[Page Description]" />
<meta name="twitter:image"       content="https://omdalat.com/og/[image].jpg" />

<script type="application/ld+json">
{ ...JSON-LD appropriate to page type... }
</script>
```

---

# 35. PAGE QUALITY BAR

A page may be indexed only if it passes this bar:

- [ ] clear topic and intent
- [ ] enough real content (not thin)
- [ ] enough entity context
- [ ] useful to a real user
- [ ] not duplicative of another indexed page
- [ ] internally linked from at least one hub page
- [ ] title and meta description completed
- [ ] canonical set correctly
- [ ] JSON-LD present and valid

If it fails any check: keep it `noindex` until ready.

---

# 36. FINAL SEO LOCK RULES

**DEV must NOT:**
- ship empty indexable pages
- rely on JS-only rendering for primary content
- create duplicate metadata across pages
- auto-index filter URL variants
- expose staging environments to crawlers
- ship public pages without canonical, title, or description
- mass-generate low-value pages

**DEV must:**
- build SSR-friendly public pages
- lock metadata support at framework level (e.g. Next.js `generateMetadata`)
- lock robots and sitemap from the beginning
- implement clean URL architecture
- prepare multilingual path structure
- maintain mobile content parity
- support JSON-LD centrally
- preserve entity clarity across all page types

---

# 37. FINAL STRATEGIC SUMMARY

OMDALAT SEO is not just about ranking pages.

It is about building:
- a strong city-level entity
- a trusted local network
- a discoverable system of places, hosts, experts, communities, and activity
- a technically clean foundation that does not create SEO debt later

The SEO strategy must support:
**brand strength · entity strength · local relevance · trust visibility · content quality · technical clarity**

---

# 38. FINAL DIRECTIVE

Build OMDALAT as a search-understandable local intelligence system from day one.

Not as a pretty frontend first.
Not as an app shell first.
Not as a tourism site.
Not as a random content site.

**Search architecture is part of product architecture.**

This file is the SEO lock for OMDALAT.COM.

No SEO architecture decision should move outside this system without explicit approval.

---

*OMDALAT SEO Lock — Version 1.0*
