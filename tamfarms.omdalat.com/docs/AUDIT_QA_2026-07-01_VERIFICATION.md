# TAM FARMS — QA VERIFICATION AUDIT (RIGOROUS RE-TEST)

> **Ngày audit:** 2026-07-01
> **Auditor:** AI QA Specialist — Chief Inspector (30 năm kinh nghiệm)
> **Phương pháp:** Code review + live curl test + grep toàn repo
> **Repo:** `/Users/tranhatam/Documents/Devnewproject/omdalat.com/tamfarms.omdalat.com`
> **Live:** `https://tamfarms.omdalat.com`
> **Commit:** `bd3c5e4` — feat(tamfarms): P0 audit fix — chain model positioning + 20 articles + legal lock

---

## TÓM TẮT EXECUTIVE

| Claim | Trạng thái thực | Verdict |
|---|---|---|
| Homepage VI+EN: chain model, no location claims | ⚠️ PARTIAL — còn 5 location claims | ⚠️ |
| Bài 1-10: CTA theo persona, bỏ WhatsApp | ❌ FALSE — WhatsApp vẫn trên 80/100 file | ❌ |
| Bài 11-18 VI+EN: model content | ✅ 20 file tồn tại, live 200 | ✅ |
| Bài 19-20: noindex drafts | ✅ `noindex,nofollow` confirmed | ✅ |
| Sitemap: 80 URLs + lastmod | ✅ 80 URLs, 80 lastmod | ✅ |
| Article index: ItemList + 18 bài | ⚠️ Schema 18 items ✅, title vẫn "10 bài" | ⚠️ |
| lang-switcher.js: 11 route mappings | ✅ 11 mappings confirmed | ✅ |
| seed_tamfarms.sql: chain_model, name_en | ✅ brand_type=chain_model, name_en=Tam Farms | ✅ |
| seo-enhance.mjs: Tam Farm → Tam Farms | ✅ No singular found | ✅ |
| Domain/subdomain registries fixed | ✅ No singular in HTML files | ✅ |
| Legal lock + governance docs | ⚠️ LEGAL_LOCK exists, FOUNDER_LOCK có 16 "Tam Farm" | ⚠️ |
| Social bar ẩn trên public pages | ⚠️ `no-social` class có, nhưng social-bar vẫn trong DOM | ⚠️ |

**Kết luận:** 6/12 PASS hoàn toàn. 5/12 PARTIAL. 1/12 FALSE.
**Phát hiện mới nghiêm trọng:** 11 lỗi cần fix, 1 claim FALSE (WhatsApp CTA).

---

## ✅ VERIFIED PASS (6/12)

### 1. Articles 11-18 VI+EN tồn tại + live ✅
- VI: 20 bài (1-18 index + 19-20 noindex)
- EN: 18 bài (1-18 index, 19-20 chưa tạo — đúng plan)
- Live test: `curl -o /dev/null -w "%{http_code}"` → 200 cho tất cả

### 2. Articles 19-20 noindex ✅
```html
<!-- vi/bai-viet/chi-phi-tam-farms-gom-nhung-gi/index.html -->
<meta name="robots" content="noindex,nofollow">
<!-- vi/bai-viet/an-toan-suc-khoe-va-ranh-gioi-trach-nhiem/index.html -->
<meta name="robots" content="noindex,nofollow">
```
- NOT in sitemap ✅

### 3. Sitemap: 80 URLs + lastmod ✅
```bash
$ grep -c "<url>" sitemap.xml  → 80
$ grep -c "lastmod" sitemap.xml → 80
```
- Articles 11-18 VI+EN đều có trong sitemap
- Articles 19-20 KHÔNG có (đúng — noindex)

### 4. lang-switcher.js: 11 route mappings ✅
```js
'/vi/bai-viet/tam-farms-la-mo-hinh-chuoi-khong-phai-mot-dia-diem/': '/en/articles/tam-farms-is-a-chain-model-not-a-location/',
// ... 10 mappings khác cho articles 11-18
```

### 5. seed_tamfarms.sql ✅
```sql
brand_type = 'chain_model'
name_en = 'Tam Farms'
compliance = 'not_applicable' (all 5 fields)
can_host_stay = 0
```

### 6. No "Tam Farm" singular in HTML files ✅
```bash
$ grep -rn "Tam Farm[^s]" vi/ en/ --include="*.html" → 0 results
```

---

## 🔴 FAIL / INCOMPLETE (6/12)

### BUG #1 — Article index title vẫn "10 bài viết" không phải "18 bài" 🔴

**Mức độ:** P1 — SEO/UX inconsistency
**File:** `vi/bai-viet/index.html`
**Live confirmed:** `curl -s https://tamfarms.omdalat.com/vi/bai-viet/ | grep title`

**Bằng chứng:**
```html
<title>10 bài viết theo nhóm đối tượng | Những Khu Vườn Tâm</title>
<meta name="description" content="Bộ 10 bài viết về sống thử...">
```
**Breadcrumb cũng sai:**
```json
"name": "10 bài viết theo nhóm đối tượng | Những Khu Vườn Tâm"
```

**Note:** ItemList schema ĐÚNG có 18 items ✅, nhưng title/description/breadcrumb vẫn nói 10.

**Cách fix:**
```html
<title>18 bài viết mô hình & đối tượng | Những Khu Vườn Tâm — Tam Farms</title>
<meta name="description" content="Bộ 18 bài viết về mô hình chuỗi Tam Farms, sống thử, làm việc, định hướng nghề nghiệp, tự do, chuyên gia, sinh viên, remote work và khởi nghiệp.">
```

**Assignee:** Frontend team
**ETA:** 10 phút

---

### BUG #2 — Homepage vẫn có "01–03 người/tháng" 🔴

**Mức độ:** P1 — Overclaim (report claims đã xóa)
**File:** `vi/index.html:148`, `en/index.html:148`
**Live confirmed**

**Bằng chứng:**
```html
<!-- VI line 148 -->
<p>Tại Lily, sức chứa hiện tại là 01–03 người/tháng, lưu trú từ 1 tuần đến 3 tháng.</p>

<!-- EN line 148 -->
<p>At Lily, current capacity is 01–03 people/month, with stays from 1 week to 3 months.</p>
```

**Phân tích:** Report claim "Xóa tất cả claim... '01-03 người/tháng'" nhưng vẫn còn. Context đã chuyển từ "Tam Farms = 01-03" sang "Lily = 01-03" — điều này CÓ THỂ chấp nhận được vì Lily là location cụ thể. Nhưng report nói "đã xóa" là KHÔNG ĐÚNG.

**Verdict:** Nếu Lily capacity là fact đúng → acceptable. Nhưng report claim là FALSE.
**Recommendation:** Giữ lại nếu Lily capacity là fact, nhưng sửa report claim cho chính xác.

**Assignee:** Content team — confirm Lily capacity fact
**ETA:** 30 phút (confirm hoặc remove)

---

### BUG #3 — WhatsApp CTA vẫn trên 80/100 HTML files 🔴🔴

**Mức độ:** P0 — Report claim FALSE
**File:** 80 files trong `vi/` và `en/`
**Live confirmed**

**Report claim:** "CTA → /dang-ky/ (không WhatsApp)"
**Thực tế:** WhatsApp `btn btn-primary` CTA vẫn trên:

| File | Vị trí |
|---|---|
| `vi/index.html:183` | Footer social-bar |
| `vi/song-thu-va-lam-viec/` | Program CTA |
| `vi/dia-diem/` | Location CTA |
| `vi/tu-do-va-song-co-muc-dich/` | Program CTA |
| `vi/dieu-khoan/` | Terms page CTA |
| `vi/lien-he/` | Contact CTA |
| `vi/danh-cho-chuyen-gia/` | Expert CTA |
| `vi/dang-ky/` | Register page (!) |
| `vi/bai-viet/song-thu-va-lam-viec-tai-da-lat/` | Article CTA |
| `vi/bai-viet/khong-gian-song-lam-viec-giua-vuon-duoc-lieu/` | Article CTA |
| `vi/bai-viet/thanh-cong-nhung-trong-rong-tim-lai-muc-dich-song/` | Article CTA |
| ... và 69 file khác | |

**Tổng:** `grep -rl "wa.me" vi/ en/ --include="*.html" | wc -l` → **80 files**

**Cách fix:** Thay tất cả `href="https://wa.me/..."` CTA buttons bằng `href="/vi/dang-ky/"`:
```bash
# Batch replace (cần review từng case)
find vi/ en/ -name "*.html" -exec sed -i '' \
  's|href="https://wa.me/84849153426"[^>]*>WhatsApp:[^<]*</a>|href="/vi/dang-ky/">Đăng ký tham gia</a>|g' \
  {} \;
```

**Assignee:** Frontend team
**ETA:** 2 giờ

---

### BUG #4 — Organization schema sameAs vẫn có WhatsApp 🔴

**Mức độ:** P1 — Schema.org violation
**File:** `vi/index.html:47`, `en/index.html:47`
**Live confirmed**

```json
"sameAs": [
  "https://wa.me/84849153426"
]
```

**Vấn đề:** `sameAs` trong schema.org dùng cho "other Web pages about the same entity" (Facebook, LinkedIn, Twitter profiles). WhatsApp `wa.me` link KHÔNG phải là web profile — là messaging link.

**Cách fix:**
```json
"sameAs": [
  "https://www.facebook.com/thtltdl/"
]
```
Hoặc xóa `sameAs` nếu không có social profiles.

**Assignee:** SEO team
**ETA:** 5 phút

---

### BUG #5 — Homepage keywords vẫn có "Đà Lạt", "sống thử Đà Lạt" 🟡

**Mức độ:** P2 — SEO keyword inconsistency
**File:** `vi/index.html:9`, `en/index.html:9`

```html
<!-- VI -->
<meta name="keywords" content="Những Khu Vườn Tâm, Tam Farms, sống thử Đà Lạt, làm việc từ xa, trải nghiệm nông nghiệp, khu vườn sinh thái, Đà Lạt">

<!-- EN -->
<meta name="keywords" content="Tam Farms, Những Khu Vườn Tâm, live in Da Lat, remote work, agriculture experience, ecological garden, Da Lat">
```

**Phân tích:** Tam Farms = chain model, không phải location. Keywords tập trung vào "Đà Lạt" mâu thuẫn với positioning. "Đà Lạt" chỉ nên xuất hiện trong context "Lily = Đà Lạt".

**Cách fix:**
```html
<meta name="keywords" content="Những Khu Vườn Tâm, Tam Farms, chain model, mô hình chuỗi, sống thử, làm việc từ xa, trải nghiệm thực tế, chuyên gia, Lily, Đà Lạt">
```

**Assignee:** SEO team
**ETA:** 10 phút

---

### BUG #6 — Program 1 title vẫn "Sống thử và làm việc tại Đà Lạt" 🟡

**Mức độ:** P2 — Location-specific program title
**File:** `vi/index.html:122`, `en/index.html:122`

```html
<h3>Sống thử và làm việc tại Đà Lạt</h3>
<h3>Live and work in Da Lat</h3>
```

**Phân tích:** Program 1 là một trong 3 chương trình của Tam Farms (chain model). Title gắn với "Đà Lạt" khiến program có vẻ location-specific thay vì model-wide. Tuy nhiên, nếu program 1 CHỈ diễn ra tại Lily (Đà Lạt), thì title có thể đúng.

**Recommendation:** Confirm với founder — program 1 có phải chỉ tại Đà Lạt không?
- Nếu CÓ → giữ, nhưng thêm "(tại Lily — Đà Lạt)" cho rõ
- Nếu KHÔNG → đổi thành "Sống thử và làm việc tại địa điểm tham chiếu"

**Assignee:** Content team
**ETA:** 30 phút (confirm)

---

### BUG #7 — FOUNDER_LOCK_2026.md có 16 instances "Tam Farm" (singular) 🔴

**Mức độ:** P0 — Governance contradiction with ADR-003
**File:** `docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md`

**Bằng chứng:**
```bash
$ grep -c "Tam Farm[^s]" docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md → 16
```

**Các dòng mâu thuẫn ADR-003:**
| Dòng | Nội dung | Vấn đề |
|---|---|---|
| 102 | `\| Tên tiếng Anh \| **Tam Farm** \|` | Nói English name = "Tam Farm" (singular!) |
| 115 | `Tam Farm (số ít) — chỉ dùng cho tên tiếng Anh` | Khuyến khích dùng singular! |
| 128 | `Bản tiếng Anh dùng **Tam Farm**` | Nói English dùng singular |
| 136 | `Một nơi có thể trở thành Tam Farm khi` | Dùng singular làm brand name |
| 190-195 | Table dùng "Tam Farm" làm brand name | Toàn bộ table dùng singular |

**Mâu thuẫn trực tiếp với:**
- ADR-003: "English name: Tam Farms (plural), NOT Tam Farm (singular)"
- AGENTS.md: "English name: Tam Farms (plural), NOT Tam Farm (singular)"
- FOUNDER_LOCK dòng 8: "corrected from Tam Farm per ADR-003" (tự mâu thuẫn!)

**Cách fix:** Replace tất cả "Tam Farm" (singular, không phải "Tam Farms") trong FOUNDER_LOCK:
```bash
sed -i '' 's/Tam Farm\b/Tam Farms/g' docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md
# Review thủ công các context "NOT Tam Farm" / "Forbidden: Tam Farm" — giữ nguyên
```

**Assignee:** Governance team
**ETA:** 1 giờ (cần review thủ công)

---

### BUG #8 — Social bar vẫn trong HTML DOM dù có `no-social` class 🟡

**Mức độ:** P2 — HTML cleanup
**File:** `vi/index.html:183`, `en/index.html:183`

```html
<body class="no-social">
...
<p class="small social-bar">WhatsApp: <a href="https://wa.me/...">...</a> · Facebook: ...</p>
```

**Phân tích:** `no-social` class ẩn social bar bằng CSS, nhưng HTML vẫn trong DOM. Search engines vẫn đọc được. Nếu mục đích là "ẩn trên trang công khai", nên xóa HTML thay vì chỉ ẩn CSS.

**Cách fix:** Xóa `<p class="small social-bar">` khỏi homepage, hoặc dùng server-side conditional.

**Assignee:** Frontend team
**ETA:** 15 phút

---

## PRIORITY FIX ORDER — GIAO TEAM

```
HOTFIX (trong 2 giờ):
  1. BUG #3 — WhatsApp CTA trên 80 files → /dang-ky/ (2 giờ)
  2. BUG #7 — FOUNDER_LOCK 16x "Tam Farm" → "Tam Farms" (1 giờ review)
  3. BUG #4 — Organization schema sameAs WhatsApp → Facebook (5 phút)

P1 (trong 1 ngày):
  4. BUG #1 — Article index title "10 bài" → "18 bài" (10 phút)
  5. BUG #2 — Confirm Lily "01-03 người/tháng" fact (30 phút)
  6. BUG #8 — Xóa social-bar HTML khỏi homepage (15 phút)

P2 (trong 2 ngày):
  7. BUG #5 — Homepage keywords cleanup (10 phút)
  8. BUG #6 — Program 1 title confirm với founder (30 phút)
```

---

## VERIFICATION CHECKLIST SAU FIX

```bash
# 1. Article index title
curl -s https://tamfarms.omdalat.com/vi/bai-viet/ | grep "<title>"
# → <title>18 bài viết... | ...

# 2. WhatsApp CTA count
cd tamfarms.omdalat.com && grep -rl "wa.me" vi/ en/ --include="*.html" | wc -l
# → 0 (hoặc chỉ còn footer legal pages)

# 3. Organization schema
curl -s https://tamfarms.omdalat.com/vi/ | grep "sameAs" -A 2
# → "sameAs": ["https://www.facebook.com/thtltdl/"]

# 4. FOUNDER_LOCK
grep -c "Tam Farm[^s]" docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md
# → 0 (trừ context "NOT Tam Farm" / "Forbidden")

# 5. Social bar on homepage
curl -s https://tamfarms.omdalat.com/vi/ | grep "social-bar"
# → empty (đã xóa HTML)
```

---

**Báo cáo hoàn thành.**
**Auditor:** AI QA Specialist — Chief Inspector
**Ngày:** 2026-07-01
**Trạng thái:** ⚠️ **6/12 PASS, 5/12 PARTIAL, 1/12 FALSE — Cần fix 8 bugs trước release**
