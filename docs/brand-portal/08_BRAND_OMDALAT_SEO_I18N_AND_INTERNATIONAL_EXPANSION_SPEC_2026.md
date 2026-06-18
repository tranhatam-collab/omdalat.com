# 08 — BRAND OMDALAT SEO I18N AND INTERNATIONAL EXPANSION SPEC 2026

**Status:** LOCKED  
**Date:** 2026-06-18  

---

## 1. Language Strategy

### Source Language

**Vietnamese** is the source of truth for all content.

### International Layer

**English** is the first international layer. Every brand must have full English content before publication.

### Expansion Layer (Future)

| Language | Priority | Trigger |
|----------|----------|---------|
| Korean (KO) | P1 | 50+ published brands |
| Japanese (JA) | P1 | 100+ published brands |
| Chinese — Simplified (ZH) | P2 | Market demand |
| Russian (RU) | P2 | Market demand |
| French (FR) | P3 | European market |
| German (DE) | P3 | European market |

---

## 2. Translation Principles

### What NOT to do

- ❌ Machine translation as final output
- ❌ Direct word-for-word translation
- ❌ Same tone across all languages
- ❌ Ignore cultural context

### What TO do

- ✅ Human-reviewed translation
- ✅ Cultural adaptation (not literal)
- ✅ Local SEO keywords per language
- ✅ Native speaker review gate
- ✅ Separate approval workflow per language

### Workflow per Language

```
Source (VI)
  ↓
Draft Translation
  ↓
Native Speaker Review
  ↓
SEO Keyword Adaptation
  ↓
Content Lead Approval
  ↓
Admin Approval
  ↓
Published
```

---

## 3. SEO Standards

### Meta Tags (Every Page)

| Tag | VI Example | EN Example |
|-----|-----------|-----------|
| title | Lily | Homestay Lily Lạc Dương Đà Lạt - Ôm Đà Lạt | Lily Lac Duong Dalat Homestay - Om Dalat |
| description | Một điểm lưu trú... | A stay with café, garden... |
| og:title | Same as title | Same as title |
| og:description | Same as description | Same as description |
| og:locale | vi_VN | en_US |
| og:image | {brand}-og.jpg | {brand}-og.jpg |
| twitter:card | summary_large_image | summary_large_image |

### URL Structure

```
# Brand Microsite
https://lily.omdalat.com/          → Vietnamese
https://lily.omdalat.com/en        → English
https://lily.omdalat.com/ko        → Korean (future)

# Brand Portal
https://brand.omdalat.com/         → Vietnamese
https://brand.omdalat.com/en       → English
```

### hreflang

```html
<link rel="alternate" hreflang="vi" href="https://lily.omdalat.com/" />
<link rel="alternate" hreflang="en" href="https://lily.omdalat.com/en" />
<link rel="alternate" hreflang="x-default" href="https://lily.omdalat.com/" />
```

### JSON-LD Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Om Dalat",
  "alternateName": ["Ôm Đà Lạt"],
  "url": "https://omdalat.com",
  "description": "A real-life living system in Da Lat..."
}
```

---

## 4. Keyword Strategy

### Vietnamese Keywords

- Primary: "homestay Đà Lạt", "lưu trú Lạc Dương", "quán café Đà Lạt"
- Long-tail: "homestay có vườn gần Đà Lạt", "nơi ở yên tĩnh Lạc Dương"
- Brand: "Lily Homestay", "Lily Lạc Dương"

### English Keywords

- Primary: "Dalat homestay", "Lac Duong accommodation"
- Long-tail: "homestay with garden near Dalat", "quiet stay Lac Duong"
- Brand: "Lily Homestay Dalat", "Lily Lac Duong"

### Korean Keywords (Future)

- "달랏 홈스테이", "빌라 람동"

---

## 5. Content Requirements

### Every Brand Must Have (per language)

- [ ] Hero title + subtitle
- [ ] Brand story (min 200 words)
- [ ] Business description
- [ ] Location description
- [ ] Contact info
- [ ] OG image (1200x630)
- [ ] Alt text on all images
- [ ] Meta title + description
- [ ] Canonical URL
- [ ] hreflang links

---

## 6. Technical SEO

- Sitemap XML auto-generated per brand
- robots.txt: allow all published brands
- Page speed: < 3s on mobile
- Mobile-first indexing
- Structured data on every page
- HTTPS only
- Canonical URLs correct
- No duplicate content
