# 03 — BRAND OMDALAT INFORMATION ARCHITECTURE AND BILINGUAL COPY SPEC 2026

**Status:** LOCKED  
**Date:** 2026-06-18  

---

## 1. Sitemap — brand.omdalat.com

```
/
/en
├── #problem          (Why local brands need owned presence)
├── #model            (4-layer architecture)
├── #who              (Who can join)
├── #cases            (Case studies)
├── #roadmap          (Expansion roadmap)
├── #lang             (Language strategy)
├── #cta              (Contact/submit)
```

No subpages. Single-page portal with anchor navigation.

---

## 2. Route Map

| Route | Purpose | Content |
|-------|---------|---------|
| `/` | Portal VI | Full portal in Vietnamese |
| `/en` | Portal EN | Full portal in English |
| `/?locale=en` | Portal EN (alt) | Query parameter fallback |

No other routes. Brand microsites live on `{brand}.omdalat.com`.

---

## 3. Navigation

### Desktop
- Om Dalat (link to omdalat.com)
- Vì sao / Why
- Mô hình / Model
- Đối tượng / Who
- Thương hiệu / Cases
- Lộ trình / Roadmap
- Language Switcher (Tiếng Việt / English)

### Mobile
- Hamburger menu (same items)
- Language switcher inside menu

---

## 4. Bilingual Copy Spec

### Hero Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H1 | Xây dựng thương hiệu địa phương từ Đà Lạt ra thế giới | Building local brands from Dalat to the world |
| Subline | Một hệ thống giúp người dân, hộ kinh doanh, nhà vườn, quán nhỏ, homestay, farm và công ty địa phương có một thương hiệu số rõ ràng, song ngữ và có thể phát triển dài hạn. | A system helping local people, household businesses, farms, cafés, homestays, and companies build clear, bilingual, long-term digital brands. |
| CTA | Bắt đầu | Get Started |

### Problem Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Vấn đề | The Problem |
| P1 | Phần lớn thương hiệu địa phương hiện chỉ tồn tại trên Facebook, Google Maps hoặc các nền tảng trung gian. | Most local brands today only exist through Facebook, Google Maps, or third-party platforms. |
| P2 | Điều đó giúp được tìm thấy. Nhưng không giúp sở hữu một hiện diện số lâu dài. | That helps them get discovered. It does not help them own a long-term digital presence. |

### 4-Layer Model Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Mô hình 4 lớp | 4-Layer Model |
| L1 | Lớp 1: Om Dalat Core — Hệ vận hành thành viên, dashboard, inquiry, workflow. | Layer 1: Om Dalat Core — Member system, dashboard, inquiry, workflow. |
| L2 | Lớp 2: Ấp Đà Lạt — Truyền thông địa phương, câu chuyện, văn hóa. Không bán hàng. | Layer 2: Ap Dalat — Local editorial, stories, culture. No commerce. |
| L3 | Lớp 3: Brand Portal — Nơi tạo thương hiệu. Intake, verification, strategy, publishing. | Layer 3: Brand Portal — Where brands are created. Intake, verification, strategy, publishing. |
| L4 | Lớp 4: Brand Sites — lily.omdalat.com, tamfarm.omdalat.com... Nơi thương hiệu tồn tại. | Layer 4: Brand Sites — lily.omdalat.com, tamfarm.omdalat.com... Where brands live. |

### Who Can Join Section

| Vietnamese | English |
|-----------|---------|
| Nhà vườn | Farmers |
| Farm | Farms |
| Homestay | Homestays |
| Café | Cafés |
| Quán ăn | Restaurants |
| Sản phẩm địa phương | Local Products |
| Xưởng nghề | Craft Workshops |
| Doanh nghiệp | Companies |
| Nghệ nhân | Artisans |
| Hợp tác xã | Cooperatives |

### Case Studies Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Thương hiệu đang xây | Brands in Progress |
| Lily status | Đã xuất bản | Published |
| Tam Farm status | Đang xây | In Progress |

### Roadmap Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Lộ trình | Roadmap |
| P1 | Giai đoạn 1: Đà Lạt & Lạc Dương — 50 thương hiệu | Phase 1: Dalat & Lac Duong — 50 brands |
| P2 | Giai đoạn 2: Toàn tỉnh Lâm Đồng — 500 thương hiệu | Phase 2: All of Lam Dong Province — 500 brands |
| P3 | Giai đoạn 3: Quốc tế hóa — 5.000 thương hiệu | Phase 3: International expansion — 5,000 brands |

### Languages Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Ngôn ngữ | Languages |
| Live | Đang hoạt động: Vietnamese, English | Live: Vietnamese, English |
| Planned | Kế hoạch: Korean, Japanese, Chinese, Russian | Planned: Korean, Japanese, Chinese, Russian |

### CTA Section

| Element | Vietnamese | English |
|---------|-----------|---------|
| H2 | Gửi thương hiệu của bạn | Submit Your Brand |
| Button | Bắt đầu | Get Started |

---

## 5. SEO Meta per Locale

| Meta | VI | EN |
|------|----|----|
| title | Om Dalat Brand System Portal | Om Dalat Brand System Portal |
| description | Một hệ thống giúp người dân... | A system helping local people... |
| og:locale | vi_VN | en_US |
| og:locale:alternate | en_US | vi_VN |
| html lang | vi | en |

---

## 6. Language Switcher Spec

- **Position:** Nav bar, right side (desktop); inside mobile menu
- **Style:** Pill buttons, active = green (#1a5c43), inactive = grey (#f0f0f0)
- **Labels:** "Tiếng Việt" / "English"
- **Accessibility:** aria-label for current locale
- **Behavior:** Link to `/` or `/en`
