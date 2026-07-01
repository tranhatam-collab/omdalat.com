# Tam Farms — Brand Identity Guide

> **Những Khu Vườn Tâm** · A network of reference gardens in Đà Lạt, Lâm Đồng.

This document defines the visual and verbal identity for **Tam Farms**, the parent chain brand. All reference locations (child brands) inherit this identity.

---

## 1. Logo

Tam Farms has three official logo versions. Use the correct version for the context.

| Version | File | Use case |
|---------|------|----------|
| **Main (emblem)** | `logo-tamfarms-main.svg` | Hero sections, print covers, formal placements |
| **Mark (icon only)** | `logo-tamfarms-mark.svg` | Favicons, app icons, avatars, stamps |
| **Horizontal (lockup)** | `logo-tamfarms-horizontal.svg` | Website headers, footers, email signatures |

### 1.1 Clear space

Maintain a minimum margin around the logo equal to **1× the height of the mark** on all sides. No element (text, image, edge) may enter this zone.

```
        ┌─────────────────────────┐
        │                         │
        │      [ LOGO HERE ]      │
        │                         │
        └─────────────────────────┘
   ← 1x →                     ← 1x →
```

### 1.2 Minimum sizes

| Version | Minimum size |
|---------|--------------|
| Mark (icon only) | **24px** / 24px height |
| Horizontal (lockup) | **120px** wide |
| Main (emblem) | **200px** wide |

Below these sizes the logo loses legibility. Prefer the mark at small sizes.

### 1.3 Color variants

Four official variants exist. Always choose the variant with the highest contrast against its background.

| Variant | When to use |
|---------|-------------|
| **Full color** | Default. On light / cream backgrounds. |
| **Reversed** | On dark / green / photographic backgrounds. Mark + text in cream. |
| **Monochrome (black)** | Black-and-white print, fax, single-color documents. |
| **Monochrome (white)** | One-color knockout on dark backgrounds where full reversed is not available. |

### 1.4 Do NOT

- **Stretch** or distort the aspect ratio.
- **Rotate** the logo.
- **Recolor** outside the approved palette.
- **Add** drop shadows, glows, or bevels.
- **Place** on busy or low-contrast backgrounds without a solid panel.
- **Recreate** or substitute fonts in the wordmark.
- **Rearrange** the elements of the lockup.

---

## 2. Color palette

| Name | Hex | Usage |
|------|-----|-------|
| **Tam Green** (primary) | `#1a5c43` | Headers, CTAs, brand mark |
| **Forest Green** (dark) | `#315f43` | Gradients, hover states |
| **Sage** (light green) | `#a8d5ba` | Accents, backgrounds |
| **Cream** (surface) | `#f6f2e8` | Page background |
| **Warm Earth** | `#8b6f47` | Secondary accents |
| **Ink** (text) | `#1a1a1a` | Body text |
| **Muted** (text) | `#6b6b6b` | Secondary text |
| **Line** (border) | `#e5e0d5` | Borders, dividers |

### 2.1 Usage notes

- **Tam Green** is the dominant brand color. It should appear in every composition.
- **Cream** is the default page surface; never use pure white `#ffffff` as a background.
- **Sage** is an accent — use sparingly for highlights, not for large fills of body text.
- **Warm Earth** grounds the palette and pairs well with photography of soil, wood, and produce.
- Maintain a minimum **4.5:1** text contrast ratio for accessibility.

### 2.2 CSS custom properties

```css
:root {
  --tf-green: #1a5c43;
  --tf-green-dark: #315f43;
  --tf-sage: #a8d5ba;
  --tf-cream: #f6f2e8;
  --tf-earth: #8b6f47;
  --tf-ink: #1a1a1a;
  --tf-muted: #6b6b6b;
  --tf-line: #e5e0d5;
}
```

---

## 3. Typography

| Role | Stack | Notes |
|------|-------|-------|
| **Headings** | `Georgia, 'Times New Roman', serif` | Grounded, editorial, agricultural feel. |
| **Body** | `system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif` | Clean, readable, native on all platforms. |
| **Code / mono** | `ui-monospace, 'SF Mono', Menlo, Consolas, monospace` | Technical content, data, coordinates. |

### 3.1 Scale (reference)

| Element | Size | Weight |
|---------|------|--------|
| Display / hero | 48–64px | 700 |
| H1 | 36px | 700 |
| H2 | 28px | 600 |
| H3 | 22px | 600 |
| Body | 16–18px | 400 |
| Small / caption | 13–14px | 400 |
| Label / overline | 11–12px | 600, uppercase, letter-spaced |

---

## 4. Voice & tone

### 4.1 Principles

- **Grounded** — We describe what is actually there, on the ground, in the soil.
- **Honest** — We state limitations plainly. We do not overpromise.
- **Expert** — We share horticultural knowledge earned through practice.
- **Warm** — We welcome visitors and fellow growers as community, not customers.

### 4.2 Language

- **Bilingual: Vietnamese first, English second.** Every public-facing page leads with Vietnamese. English is provided as a secondary translation, not a replacement.
- Write in clear, plain Vietnamese. Avoid marketing jargon in either language.

### 4.3 Forbidden words

These terms misrepresent what Tam Farms is. **Never use them** in any material:

- resort
- hotel
- homestay (in the mass-market sense)
- treatment
- therapy
- guaranteed income
- ROI
- luxury getaway
- wellness retreat

### 4.4 Required disclaimer

Any visitor-facing or investment-facing material must include the following disclaimer (in Vietnamese, with English available on bilingual pages):

> **VI:** "Không phải khách sạn, homestay đại trà, cơ sở khám chữa bệnh, hay dự án đầu tư hứa hẹn lợi nhuận. Đây là mạng lưới những khu vườn tham chiếu phục vụ nghiên cứu, canh tác và cộng đồng."
>
> **EN:** "Tam Farms is not a hotel, mass-market homestay, medical facility, or investment scheme promising returns. It is a network of reference gardens serving research, cultivation, and community."

---

## 5. Brand hierarchy

Tam Farms is a **chain model** — a parent brand governing a network of reference locations.

```
Tam Farms  (parent · chain model · this identity)
   │
   ├── Lily          (Reference Location 01 · child)
   ├── [future]      (Reference Location 02 …)
   └── [future]      (Reference Location 0n …)
```

### 5.1 Parent — Tam Farms

- Uses this identity in full.
- Owns the emblem, mark, palette, and voice defined here.
- Represents the **network**, not any single garden.

### 5.2 Child — Lily (Reference Location 01)

- Inherits the Tam Farms identity (palette, typography, voice, disclaimer).
- Adds **location-specific elements**: the location name "Lily", local photography, and a location-specific sub-mark if desired.
- Must always display the label: **"A TAM FARMS REFERENCE LOCATION"** / **"MỘT ĐỊA ĐIỂM THAM CHIẾU CỦA TAM FARMS"**.

### 5.3 Future locations

- **Must** use the Tam Farms identity as the base.
- **Must** carry the label **"A TAM FARMS REFERENCE LOCATION"**.
- **May** introduce a location-specific name and sub-mark, but the parent Tam Farms identity remains primary and recognizable.
- A location may **not** present itself as an independent brand separate from Tam Farms.

---

## 6. Legal entity

All materials — print, digital, signage, contracts — must display the legal entity:

```
CÔNG TY TNHH SX-TM-DV THÁI LÂM
MST: 5801443073
Đà Lạt, Lâm Đồng
```

Place this in the footer of every website, the colophon of every printed document, and the signature block of every official communication.

---

## 7. File organization

```
/assets/
├── brand/        ← all brand identity files (this guide, logos, marks)
├── images/       ← content images (photos, OG images, location imagery)
├── css/          ← stylesheets
└── js/           ← scripts
```

### 7.1 Brand asset inventory

| File | Description |
|------|-------------|
| `logo-tamfarms-main.svg` | Full emblem, 400×400, with VI + EN text |
| `logo-tamfarms-mark.svg` | Icon only, 100×100, for favicons & app icons |
| `logo-tamfarms-horizontal.svg` | Horizontal lockup, 240×60, for headers |
| `favicon.svg` | Simplified mark, 32×32, rounded square |
| `BRAND_IDENTITY_GUIDE.md` | This document |

### 7.2 Naming conventions

- Brand files: `logo-tamfarms-<variant>.svg`
- Location-specific assets: `lily-<asset>.svg` (child brand prefix)
- Never overwrite a brand file to "customize" it for a location — create a new, prefixed file instead.

---

## 8. Quick reference

| What | Value |
|------|-------|
| Parent brand | Tam Farms · Những Khu Vườn Tâm |
| Model | Chain / network of reference gardens |
| Primary color | `#1a5c43` |
| Surface | `#f6f2e8` |
| Heading font | Georgia, serif |
| Body font | system-ui, sans-serif |
| Min logo size | 24px (mark) · 120px (horizontal) · 200px (main) |
| Legal entity | CÔNG TY TNHH SX-TM-DV THÁI LÂM · MST: 5801443073 · 42 Cao Bá Quát, Phường Lang Biang, Đà Lạt, Lâm Đồng |

---

*Maintained by Tam Farms. Last updated with initial identity release.*
