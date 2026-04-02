# OMDALAT.COM
## Brand System Lock File
## For Design, Product, and Frontend Development
## Version 1.0 — Final

---

# 1. PURPOSE OF THIS FILE

This document locks the official brand direction for **OMDALAT.COM** only.

It exists to ensure:
- one visual logic
- one naming logic
- one product logic
- one design language
- one system hierarchy

This file is the brand source of truth for:
- founder
- product
- design
- frontend
- backend
- mobile
- content
- AI layer
- future partners

No team member should invent a new visual direction, naming style, or interaction tone outside this document unless approved at brand system level.

---

# 2. WHAT IS OMDALAT

OMDALAT is a standalone city-layer brand for Da Lat.

It represents:
- the living city interface
- the localized experience
- the green intelligence city interface
- the first proof that trusted local activity can be made visible at city scale

OMDALAT is not a tourism brand.
OMDALAT is not a community page.
OMDALAT is not a startup landing page.
OMDALAT is not an eco-NGO site.

OMDALAT is:
- a living city node platform
- a local intelligence layer
- a green trust network
- a real-world activation surface

---

# 3. BRAND POSITIONING

**Primary statement:**
> OMDALAT is the first living intelligence city interface for Da Lat.

**Short version:**
> Trusted places, people, and activity in Da Lat.

**Alternative approved positioning lines:**
- OMDALAT is the green city node of living intelligence.
- OMDALAT is a local interface for trusted activity, places, and people.
- OMDALAT brings nature, technology, and human value into one living system.

---

# 4. BRAND ESSENCE

**Core qualities:**

Alive · Green · Rooted · Local · Breathing
Intelligent · Organic · Friendly · Verified · Human

**OMDALAT should feel like:**
- a living city interface
- a green intelligence network
- nature and technology moving together
- a real place where people, spaces, and value connect

---

# 5. BRAND DIFFERENCE

OMDALAT must feel like:
- local reality
- city pulse
- green movement
- real people and places
- organic interaction
- human-scale activation
- proof and participation
- nature + technology harmony

OMDALAT must **never** feel like:
- a tourism website
- an eco NGO site
- a generic green startup
- a travel blog
- a mountain postcard
- a community Facebook clone

---

# 6. COLOR SYSTEM

## 6.1 Primary Green Palette

```css
--omdalat-green-900: #0F3D2E;
--omdalat-green-800: #155C44;
--omdalat-green-700: #1E7A5B;
--omdalat-green-600: #2F9E72;
--omdalat-green-500: #4FC38A;
--omdalat-green-400: #7DE0A9;
--omdalat-green-300: #B7F3CF;
```

## 6.2 Mist Palette

```css
--omdalat-mist-100: #F4F8F6;
--omdalat-mist-200: #E8F0EC;
--omdalat-mist-300: #D5E3DD;
```

## 6.3 Earth Palette

```css
--omdalat-earth-700: #5A4636;
--omdalat-earth-500: #8B6B4F;
--omdalat-earth-300: #C2A98A;
```

## 6.4 Accent & Light

```css
--omdalat-light:  #EFFFF5;
--omdalat-accent: #00E38A;
```

## 6.5 Color Meaning

| Token group | Meaning |
|---|---|
| green-900 → green-700 | forest depth, root system, deep structure |
| green-600 → green-400 | living growth, eco vitality, trust signal |
| green-300 | breath, lightness, invitation |
| mist | atmospheric overlay, soft layer, dawn feel |
| earth | grounding, human warmth, organic texture |
| accent | activation, call-to-action, living signal |

## 6.6 Color Rules

- OMDALAT owns **green-mist-earth** as primary identity.
- Blue space colors are **not** OMDALAT's identity and, if used at all, must remain minor and subordinate to the green system.
- OMDALAT homepage must **not** become blue-space dominant.
- Green tones must remain **premium and restrained** — never neon-cheap.

---

# 7. GRADIENT SYSTEM

## 7.1 Primary Gradient

```css
background: linear-gradient(
  135deg,
  #0F3D2E 0%,
  #1E7A5B 40%,
  #4FC38A 100%
);
```

Use for: hero backgrounds, section transitions, feature banners.

## 7.2 Mist Glow Gradient

```css
background: radial-gradient(
  circle at top,
  rgba(255, 255, 255, 0.22),
  transparent 60%
);
```

Use for: hero overlay, card shimmer, atmospheric depth layer.

## 7.3 Deep Forest Gradient

```css
background: linear-gradient(
  180deg,
  #0F3D2E 0%,
  #08201A 100%
);
```

Use for: dark section backgrounds, footer, map layers.

## 7.4 Accent Glow

```css
background: radial-gradient(
  circle at center,
  rgba(0, 227, 138, 0.15),
  transparent 55%
);
```

Use for: hover states, active node glow, CTA emphasis.

---

# 8. TYPOGRAPHY SYSTEM

## 8.1 Primary UI Fonts

```
Inter
SF Pro
Manrope
```

Use for: UI, body text, menus, forms, dashboard, cards.

## 8.2 Brand / Heading Fonts

```
Sora
Manrope
```

Use for: hero headings, key headlines, brand sections, big statement blocks.

## 8.3 Tone

OMDALAT typography must be:
- clean
- slightly soft
- slightly warm
- still premium
- still structured

Do **not** use:
- decorative serif fonts
- playful display fonts
- overly geometric techno fonts

## 8.4 Type Scale

| Name | Size | Use |
|---|---|---|
| display-xl | 64–80px | hero main headline |
| display-lg | 48–56px | section hero |
| heading-xl | 36–40px | page sections |
| heading-lg | 28–32px | subsection title |
| heading-md | 22–24px | card title |
| body-lg | 18px | feature copy |
| body-md | 16px | general text |
| body-sm | 14px | labels, meta |
| caption | 12px | chips, badges |

---

# 9. MOTION SYSTEM

## 9.1 Shared Motion Principles

Motion must be:
- slow
- calm
- intentional
- breathing
- gliding
- layered
- non-chaotic

Motion must **never** be:
- flashy
- over-bouncy
- gaming UI
- Web3 hyper-glow behavior

## 9.2 OMDALAT Specific Motion

| Type | Description |
|---|---|
| Mist drift | slow horizontal fog movement, subtle opacity shift |
| Leaf energy glow | soft pulsing green bloom on eco elements |
| Micro elevation | cards float 2–4px on hover, slow ease |
| Human-scale interaction | activity dots breathing at 3–5s intervals |
| Green pulse | active nodes emit soft green ring pulse |

## 9.3 Transition Presets

```css
--transition-fast:   150ms ease;
--transition-base:   250ms ease;
--transition-slow:   400ms ease;
--transition-breath: 600ms ease-in-out;
```

---

# 10. SHAPE & RADIUS SYSTEM

## 10.1 OMDALAT Shape Language

- rounded corners
- controlled softness
- slightly more breathable than a pure tech UI
- organic balance without being decorative

## 10.2 Radius Scale

```css
--radius-sm:   12px;
--radius-md:   16px;
--radius-lg:   20px;
--radius-xl:   28px;
--radius-pill: 999px;
```

---

# 11. SPACING SYSTEM

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-24: 96px;
```

---

# 12. SURFACE DESIGN LANGUAGE

OMDALAT surfaces must feel like:
- a living city interface
- trusted local layer
- eco-tech surface

## 12.1 Card Base

```css
background:      rgba(255, 255, 255, 0.05);
border:          1px solid rgba(255, 255, 255, 0.08);
backdrop-filter: blur(20px);
border-radius:   20px;
box-shadow:      0 18px 36px rgba(0, 0, 0, 0.18);
```

## 12.2 Card Hover State

```css
border-color: rgba(79, 195, 138, 0.25);
box-shadow:   0 24px 48px rgba(0, 0, 0, 0.22),
              0 0 20px rgba(0, 227, 138, 0.08);
transform:    translateY(-2px);
transition:   all 400ms ease;
```

## 12.3 Surface Tones

| Surface | Usage |
|---|---|
| Dark forest (`#0F3D2E → #08201A`) | hero, section bg, sidebar |
| Mid green glass | feature cards, info panels |
| Mist light (`#F4F8F6`) | light mode surface, overlay |
| Earth warm (`#5A4636`) | accent dividers, warm highlight |

---

# 13. BACKGROUND TREATMENT

## 13.1 Main Background Concept

> Mist, forest, eco-tech depth.

Use:
- dark forest gradients
- mist overlays
- light bloom
- organic depth

Do **not** use:
- mountain-photo wallpaper
- tourism postcard imagery
- random landscape hero image

## 13.2 Hero Background

```css
background:
  radial-gradient(circle at top, rgba(255,255,255,0.22), transparent 60%),
  linear-gradient(135deg, #0F3D2E 0%, #1E7A5B 40%, #4FC38A 100%);
```

---

# 14. BUTTON SYSTEM

## 14.1 Primary Button

```css
background:    linear-gradient(135deg, #1E7A5B, #4FC38A);
color:         #EFFFF5;
border-radius: 999px;
padding:       12px 28px;
font-weight:   600;
font-size:     15px;
transition:    all 250ms ease;
```

**Hover:**
```css
box-shadow: 0 0 20px rgba(0, 227, 138, 0.28);
transform:  translateY(-1px);
```

## 14.2 Secondary Button

```css
background:    transparent;
border:        1px solid rgba(79, 195, 138, 0.35);
color:         #7DE0A9;
border-radius: 999px;
padding:       12px 28px;
transition:    all 250ms ease;
```

**Hover:**
```css
border-color: rgba(79, 195, 138, 0.65);
background:   rgba(79, 195, 138, 0.08);
```

## 14.3 Ghost Button

```css
background:    rgba(255, 255, 255, 0.06);
border:        1px solid rgba(255, 255, 255, 0.10);
color:         #B7F3CF;
border-radius: 999px;
```

---

# 15. NAVIGATION RULES

## 15.1 Tone

- local
- activity-driven
- living city
- trusted

## 15.2 Suggested Nav Structure

```
Places
Hosts
Experts
Communities
Events
Proofs
Join
Trust
```

## 15.3 Rule

OMDALAT navigation must stay self-contained, clear, and local-first.
It should always help users move between places, people, proof, and participation without relying on another brand layer.

---

# 16. ICON SYSTEM

## 16.1 Icon Principles

Icons must express:
- node
- place
- connection
- flow
- trust
- signal
- organic activity

Icons must be:
- clean line-based
- softly rounded
- slightly organic
- not sharp cyberpunk
- not childish
- not corporate-generic

## 16.2 OMDALAT Icon Tone

- more organic
- more place-aware
- more human
- more eco-linked
- more local activity based

---

# 17. IMAGERY DIRECTION

## 17.1 Use

- real Da Lat activity
- real local places
- real hosts
- real communities
- green urban scenes
- mist-light atmosphere
- quiet intelligence in physical spaces

## 17.2 Avoid

- tourist cliché photography
- staged lifestyle emptiness
- flower-only visuals
- mountain postcard without system meaning
- stock startup meetings
- random smiling office photos

---

# 18. COPY TONE

## 18.1 OMDALAT Voice

- clear
- warm
- grounded
- alive
- human
- friendly
- still premium
- still structured

## 18.2 Example Lines

```
Trusted places, people, and activity in Da Lat.
A living city node for trusted activity.
Nature, technology, and human value moving together.
Real places. Real people. Real proof.
The city is the interface.
```

## 18.3 Content Must Answer

- Who is active here
- Which places are real
- What is happening now
- How the city node works
- What proof exists
- How to participate locally

> Rule: OMDALAT content = **evidence**, not explanation.

---

# 19. PAGE-LEVEL EXPRESSION

## 19.1 Homepage

Must feel like:
- living city
- active local network
- green trust
- real proofs and places

Key hero visual direction:
- organic city grid
- mist + green pulse
- active place nodes
- real-world motion

## 19.2 Places Page

- map-first
- card grid with green node indicators
- trust badges visible on each card
- soft ambient glow on hover

## 19.3 Hosts / Experts Page

- profile cards with warm earth tones
- verified badge treatment
- human photography, not illustration

## 19.4 Community / Events Page

- activity feed aesthetic
- breathing dots for live events
- time + place anchors prominent

---

# 20. APP-LEVEL EXPRESSION (app.omdalat.com)

Must feel like:
- local activation view
- city node interface
- green activity layer
- trusted place and people dashboard

UI elements:
- map as primary canvas
- sidebar with activity stream
- node cards floating on map
- status indicators using green pulse

---

# 21. DARK / LIGHT MODE

## Primary Mode: Dark Green First

Reason: city at dawn / mist / forest logic works naturally in dark-green premium mode.

## Secondary Mode

Mist-light mode may be introduced later for:
- daytime city browsing
- lighter contextual surfaces
- accessibility

---

# 22. DESIGN TOKEN FILE STRUCTURE

```
tokens.css          ← shared spacing, radius, blur, shadow, transition
theme-omdalat.css   ← green color tokens, OMDALAT-specific design vars
```

## 22.1 tokens.css (shared)

```css
:root {
  /* Spacing */
  --space-1: 4px;   --space-2: 8px;    --space-3: 12px;
  --space-4: 16px;  --space-5: 20px;   --space-6: 24px;
  --space-8: 32px;  --space-10: 40px;  --space-12: 48px;
  --space-16: 64px; --space-24: 96px;

  /* Radius */
  --radius-sm: 12px;  --radius-md: 16px;
  --radius-lg: 20px;  --radius-xl: 28px;
  --radius-pill: 999px;

  /* Blur */
  --blur-sm: 12px;  --blur-md: 20px;  --blur-lg: 28px;

  /* Border opacity */
  --border-subtle:  rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.08);
  --border-strong:  rgba(255,255,255,0.12);

  /* Shadow */
  --shadow-sm: 0 4px 12px rgba(0,0,0,0.12);
  --shadow-md: 0 10px 24px rgba(0,0,0,0.16);
  --shadow-lg: 0 18px 36px rgba(0,0,0,0.18);
  --shadow-xl: 0 28px 56px rgba(0,0,0,0.22);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   250ms ease;
  --transition-slow:   400ms ease;
  --transition-breath: 600ms ease-in-out;
}
```

## 22.2 theme-omdalat.css

```css
.theme-omdalat {
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
  --accent:     #00E38A;
  --light:      #EFFFF5;

  /* Semantic */
  --bg-primary:    linear-gradient(135deg, #0F3D2E 0%, #1E7A5B 40%, #4FC38A 100%);
  --bg-deep:       linear-gradient(180deg, #0F3D2E 0%, #08201A 100%);
  --text-primary:  #EFFFF5;
  --text-secondary: #B7F3CF;
  --text-muted:    rgba(183, 243, 207, 0.55);
  --accent-glow:   rgba(0, 227, 138, 0.15);
}
```

---

# 23. FIGMA STRUCTURE RULES

Design team must create:
- `Brand / OMDALAT / Color`
- `Brand / OMDALAT / Typography`
- `Brand / OMDALAT / Motion`
- `Shared / Components / Buttons`
- `Shared / Components / Cards`
- `Shared / Components / Nav`
- `Shared / Tokens / Spacing`
- `Shared / Tokens / Radius`
- `OMDALAT / Patterns / Hero`
- `OMDALAT / Patterns / Map`
- `OMDALAT / Patterns / Cards`

---

# 24. ANTI-PATTERN RULES FOR DEV

**DEV must NOT:**
- pick random colors outside this system
- copy public UI kits blindly
- add visual effects outside this system
- use blue-space colors as primary OMDALAT identity
- introduce new naming styles
- use inconsistent border radius values
- invent off-brand gradients
- use clipart-like icons
- use tourism visual clichés
- use mountain-photo hero images

**DEV must:**
- implement design tokens first
- reuse component family
- keep motion subtle
- maintain the same typography family
- use shared spacing scale
- build green-first dark theme as default

---

# 25. APPROVED TAGLINES

| Type | Line |
|---|---|
| Primary | Trusted places, people, and activity in Da Lat. |
| Alternative | The first living intelligence city. |
| Alternative | Nature, technology, and human value moving together. |
| Short | The city is the interface. |
| Short | Real places. Real people. Real proof. |

---

# 26. BRAND SUMMARY

OMDALAT is the living green city interface for Da Lat.

Its visual language must express:
- nature
- mist
- green intelligence
- human-scale technology
- local proof
- living participation

It must feel like:
- a city where technology is embedded into living systems
- a trusted local layer anyone can enter
- a system with enough proof and clarity to feel real from the first visit

---

# 27. FINAL DIRECTIVE TO DEV

Build OMDALAT as the green city interface for Da Lat.

Use the green palette. Build the mist surfaces. Animate the living city.

Make it feel **real, trusted, alive**.

This file is the final brand lock for OMDALAT.COM.

No visual or theme direction should move outside this system without explicit approval.

---

*OMDALAT Brand System Lock — Version 1.0*
