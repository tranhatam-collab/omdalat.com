# HUMAN_TEXT_CHARACTER_AND_RESPONSE_PROTOCOL

Version: v1.0.0  
Status: LOCKED  
Scope: `omdalat.com` web text, SEO text, QA reports, release notes, handoff files  
Owner: Team 1 / Content / SEO / QA / Team 2 / Team 3

---

## 0. Protocol intent

This protocol is approved as a mandatory gate for web copy quality and release truthfulness.

Approved scope:

1. visible public text
2. SEO metadata
3. CMS export text
4. QA reports
5. release notes
6. team handoff text and commands

Out of scope:

1. backend logic
2. payment logic
3. invoice routing
4. legal entity mapping
5. authentication logic
6. database schema changes

---

## 1. H standard

1. Each page has one H1 only.
2. H2/H3 hierarchy must be valid and role-correct.
3. H1 must match page role, not generic slogan text.

---

## 2. Plain character rule

Final public text must avoid decorative symbols or synthetic style markers.

Disallowed in final copy:

1. decorative arrows and ornaments
2. emoji
3. decorative Unicode punctuation used as style effect
4. fake urgency punctuation rhythm

---

## 3. Hyphen and punctuation hygiene

1. Prefer plain sentence punctuation in final public copy.
2. Avoid overusing punctuation to simulate emotional tone.
3. Keep phrasing factual, direct, and calm.

---

## 4. Character hygiene gate

A page fails the gate if final visible text contains:

1. decorative character noise
2. AI-like repetitive punctuation rhythm
3. machine-shaped phrasing with no human editorial pass

---

## 5. Language gate

1. Vietnamese must keep proper diacritics and coherent editorial tone.
2. English must be natural and non-literal.
3. No mixed-language leakage in one visible locale page.

---

## 6. SEO text gate

Each page must have:

1. meta title
2. meta description
3. canonical
4. OG title
5. OG description
6. OG image
7. meaningful alt text for meaningful images

And must pass:

1. title human-readable
2. description human-readable
3. no fake urgency or sales-heavy distortion

---

## 7. True state rule

No page, report, or release note may claim completion without evidence.

Allowed status labels:

1. `WEB_COPY_DRAFT`
2. `WEB_COPY_PASS`
3. `CHARACTER_HYGIENE_FAIL`
4. `H_STANDARD_FAIL`
5. `SEO_METADATA_INCOMPLETE`
6. `SEO_READY_PENDING_QA`
7. `A11Y_READY_PENDING_QA`
8. `RELEASE_READY_PENDING_EVIDENCE`
9. `WEB_READY`

---

## 8. Mandatory report shape

All page-level QA or release reports must include:

1. Verdict
2. Evidence checked
3. Pass
4. Fail
5. Blocked by Founder
6. Blocked by external asset
7. True state
8. Team command
9. Hard stop

---

## 9. Hard stop

Do not call a page web-ready if any of these fail:

1. missing H1 or broken heading hierarchy
2. character hygiene fail
3. missing title/description/canonical/OG image
4. missing important alt text
5. language leakage
6. unclear true state
7. missing release evidence for release-ready claims

---

## 10. Team command

Action:

Apply this protocol as a mandatory gate for all public copy, SEO metadata, QA reports, release notes, and team handoff files in `omdalat.com`.

Forbidden actions:

1. do not change backend logic via this protocol
2. do not change payment logic via this protocol
3. do not change invoice routing via this protocol
4. do not change legal mapping via this protocol
5. do not deploy production by text claim only

Required evidence:

1. character hygiene result
2. H standard result
3. SEO metadata result
4. rendered page check
5. language check
6. true state

---

## 11. Web implementation boundary

This protocol applies to visible text, SEO metadata, public HTML text, content source, CMS exports, QA reports, release notes, and team commands.

It does not authorize changes to backend logic, payment logic, invoice routing, legal entity mapping, authentication, database schema, user data, or production deployment policy.

If a text issue requires code change, open a separate technical work order.

---

## 12. Technical token exception

Technical identifiers may keep required characters when they are part of:

1. route standard
2. API field
3. schema/protocol standard
4. package or library naming
5. legal source reference

Examples:

1. `og:image`
2. `application/ld+json`
3. `x-default`
4. `hreflang`
5. `JSON-LD`
6. `ERC-721`

Do not rewrite technical tokens blindly for character hygiene.  
Do review surrounding public explanation text.
