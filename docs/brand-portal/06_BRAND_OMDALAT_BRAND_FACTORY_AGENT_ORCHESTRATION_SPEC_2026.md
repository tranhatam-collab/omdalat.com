# 06 — BRAND OMDALAT BRAND FACTORY AGENT ORCHESTRATION SPEC 2026

**Status:** DRAFT  
**Date:** 2026-06-18  

---

## 1. Agent Pipeline

```
Google Maps URL
    ↓
MAPS AGENT
    ↓
SEO AGENT
    ↓
CONTENT AGENT
    ↓
IMAGE AGENT
    ↓
COMPLIANCE AGENT
    ↓
TRANSLATION AGENT
    ↓
QA AGENT
    ↓
OWNER REVIEW (Human)
    ↓
ADMIN APPROVAL (Human)
    ↓
PUBLISH
```

---

## 2. Agent Definitions

### Maps Agent
**Input:** Google Maps URL  
**Output:**
- Place name, address, coordinates
- Business type detection
- Opening hours (if public)
- Photo URLs (if public)
- Review summary
- Nearby landmarks
**Constraints:** Only reads public data. Does not scrape private info.

### SEO Agent
**Input:** Place data + business type  
**Output:**
- Recommended keywords (VI + EN)
- Meta title suggestions
- Meta description suggestions
- URL slug recommendation
- Structured data schema (JSON-LD)
**Constraints:** Keywords must be local-relevant. No keyword stuffing.

### Content Agent
**Input:** SEO data + brand info  
**Output:**
- Hero title + subtitle (VI + EN)
- Brand story (3 paragraphs)
- Business description
- Location description
- What makes this place unique
**Constraints:**
- Must be factual (no hallucination)
- Must match owner-provided info
- Must be bilingual from source
- Tone: honest, local, not tourist-brochure

### Image Agent
**Input:** Brand info + content  
**Output:**
- Image checklist (required shots)
- Alt text suggestions (VI + EN)
- OG image recommendation
- Image rights verification checklist
**Constraints:** Only suggests. Does not generate fake images.

### Compliance Agent
**Input:** All content + images  
**Output:**
- Privacy risk assessment
- Image rights status
- Legal compliance check
- Accessibility checklist
- Sensitive info detection
**Constraints:** Flags issues. Does not auto-fix without human review.

### Translation Agent
**Input:** Vietnamese source content  
**Output:**
- English translation (human-reviewed quality)
- Korean, Japanese, Chinese, Russian (future)
- Glossary of brand-specific terms
**Constraints:**
- Source language: Vietnamese
- Not machine translation
- Cultural adaptation, not literal
- Each language: draft → review → approved → published

### QA Agent
**Input:** Complete brand package  
**Output:**
- Content quality score
- SEO completeness check
- Image completeness check
- Accessibility score
- Mobile responsiveness check
- Evidence packet completeness
**Constraints:** Pass threshold = 85/100. Below = return to draft.

---

## 3. Human-in-the-Loop Gates

| Stage | AI Prepares | Human Decides |
|-------|-------------|---------------|
| Maps analysis | Extracts data | Staff verifies |
| SEO strategy | Generates keywords | Staff approves |
| Content draft | Writes copy | Owner reviews |
| Image checklist | Lists requirements | Photographer + owner |
| Compliance | Flags risks | Legal + admin |
| Translation | Drafts translation | Native speaker reviews |
| QA | Runs checks | Admin approves |

---

## 4. AI Cannot Do

- ❌ Verify legal ownership of business
- ❌ Verify owner's identity (requires human call/Zalo)
- ❌ Publish without owner explicit consent
- ❌ Generate fake reviews or testimonials
- ❌ Use copyrighted images without clearance
- ❌ Make promises about business performance
- ❌ Handle payment or booking transactions

---

## 5. Agent Orchestration API (Future)

```
POST /api/omdalat/agents/orchestrate
{
  "brand_id": "brnd_lily",
  "trigger": "intake_complete",
  "agents": ["maps", "seo", "content", "image", "compliance"]
}

Response:
{
  "pipeline_id": "pipe_xxx",
  "status": "running",
  "stages": [
    {"agent": "maps", "status": "complete", "output": {...}},
    {"agent": "seo", "status": "running", "output": null}
  ]
}
```

---

## 6. Evidence Packet

Each published brand must have an evidence packet:

```
evidence/{brand_id}/
├── intake_form.json
├── owner_consent.pdf
├── verification_log.json
├── content_draft.json
├── seo_strategy.json
├── image_rights_checklist.json
├── compliance_report.json
├── owner_approval.json
├── admin_approval.json
└── qa_report.json
```
