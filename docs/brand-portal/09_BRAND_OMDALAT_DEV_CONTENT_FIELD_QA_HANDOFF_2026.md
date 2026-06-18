# 09 — BRAND OMDALAT DEV CONTENT FIELD QA HANDOFF 2026

**Status:** ACTIVE  
**Date:** 2026-06-18  

---

## 1. QA Process

### Before Handoff to Dev

Content must pass all checks before Dev implements.

### After Dev Implementation

Dev must pass all checks before QA signs off.

---

## 2. Content Checklist

### Copy Quality

- [ ] No placeholder text (Lorem Ipsum, TODO, FIXME)
- [ ] No mixed languages in same sentence
- [ ] Vietnamese uses full diacritics
- [ ] English is natural, not translated-feel
- [ ] All CTAs have both VI and EN
- [ ] No broken links
- [ ] No grammar errors
- [ ] Tone matches brand guidelines

### Completeness

- [ ] Every page has VI + EN version
- [ ] Every section has content in both languages
- [ ] No "coming soon" or "TBD" in published content
- [ ] Contact info is real and verified
- [ ] All case studies are factual

---

## 3. Schema Checklist

- [ ] brands table has all required fields
- [ ] places table has lat/lng
- [ ] content_blocks has all block_types
- [ ] owners has consent_status
- [ ] approvals table tracks all stages
- [ ] media_assets has rights_status

---

## 4. SEO Checklist

- [ ] Every page has title + description
- [ ] Every page has canonical URL
- [ ] Every page has hreflang alternates
- [ ] OG tags present on all pages
- [ ] Twitter cards present
- [ ] JSON-LD schema on all pages
- [ ] robots.txt correct
- [ ] Sitemap generated

---

## 5. Image Checklist

- [ ] Every image has alt text (VI + EN)
- [ ] Every image has rights clearance
- [ ] OG image exists (1200x630)
- [ ] Images are optimized (< 200KB each)
- [ ] Lazy loading on images below fold
- [ ] AVIF/WebP format available

---

## 6. Accessibility Checklist

- [ ] All images have alt text
- [ ] All forms have labels
- [ ] Color contrast WCAG AA minimum
- [ ] Focus states visible
- [ ] Keyboard navigation works
- [ ] aria-label on navigation
- [ ] aria-current on active page
- [ ] Skip to content link

---

## 7. Mobile Checklist

- [ ] Responsive on 320px width
- [ ] Touch targets min 44x44px
- [ ] Text readable without zoom
- [ ] No horizontal scroll
- [ ] Hamburger menu works
- [ ] Language switcher accessible
- [ ] Forms usable on mobile

---

## 8. Performance Checklist

- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total Blocking Time < 200ms

---

## 9. Handoff Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Content Lead | | | |
| SEO Lead | | | |
| Dev Lead | | | |
| QA Lead | | | |
| Product Lead | | | |

---

## 10. QA Report Template

```markdown
# QA Report — {brand_name}
Date: {date}
Tester: {name}

## Content
- VI quality: {PASS/FAIL}
- EN quality: {PASS/FAIL}
- Completeness: {PASS/FAIL}

## SEO
- Meta tags: {PASS/FAIL}
- Schema: {PASS/FAIL}
- hreflang: {PASS/FAIL}

## Images
- Alt text: {PASS/FAIL}
- Rights: {PASS/FAIL}
- Optimization: {PASS/FAIL}

## Accessibility
- WCAG AA: {PASS/FAIL}
- Keyboard nav: {PASS/FAIL}
- Screen reader: {PASS/FAIL}

## Mobile
- Responsive: {PASS/FAIL}
- Touch targets: {PASS/FAIL}

## Performance
- LCP: {value}
- CLS: {value}

## Result
{PASS / FAIL — return to draft}
```
