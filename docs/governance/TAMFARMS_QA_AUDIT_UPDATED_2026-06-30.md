# BÁO CÁO QA AUDIT — tamfarms.omdalat.com (CẬP NHẬT)

**Ngày audit gốc:** 2026-06-30
**Ngày cập nhật:** 2026-06-30 (post-Founder Lock)
**Phạm vi:** DNS, DB, Worker routes, code, docs, live, Founder Lock

## 1. Phán quyết cập nhật

**Kết luận audit cũ ("Tam Farm = placeholder, không nên tồn tại") KHÔNG CÒN ĐÚNG.**

Sau tuyên bố chính thức của nhà sáng lập Trần Hà Tâm, kết luận chiến lược phải được sửa thành:

> **Những Khu Vườn Tâm / Tam Farm là thương hiệu thật đã được Founder xác định. Tuy nhiên, tamfarms.omdalat.com chưa được coi là live cho đến khi domain, location, vận hành, pháp lý, an toàn, giá và hành trình người tham gia được xác minh.**

### Tách hai lớp sự thật

| Lớp | Trạng thái |
|-----|-----------|
| Founder definition | **APPROVED — THƯƠNG HIỆU THẬT** |
| DNS/domain | Live, CNAME proxied, SSL active |
| Database brand record | Chưa seed D1 (pending brand factory) |
| Website | **LIVE — bilingual VI/EN, index,follow** |
| Location đầu tiên | Chưa có (due diligence pending) |
| Pricing | Chưa khóa |
| Legal operating basis | Legal pages published (Terms, Privacy, Safety, House Rules) |
| Public release | **AUTHORIZED** (Founder Lock approved 2026-06-30) |
| **Tổng trạng thái** | **LIVE — no verified locations yet** |

## 2. Tên thương hiệu chính thức (Founder Lock)

| Trường | Giá trị |
|---------|---------|
| Tên tiếng Việt | Những Khu Vườn Tâm |
| Tên tiếng Anh | Tam Farm |
| Slogan VI | Sống thật. Làm thật. Lớn lên từ trải nghiệm. |
| Slogan EN | Live fully. Work with purpose. Grow through experience. |
| Domain | tamfarms.omdalat.com |
| Product ID | OMDALAT_TAMFARMS |
| Brand ID | TAMFARMS |
| WhatsApp | +84 84 915 3426 |
| Hashtags | #NhungKhuVuonTam #TamFarm |

## 3. Điều kiện Go-Live (18 điều kiện)

Tam Farm chỉ được public là đang hoạt động khi đủ TẤT CẢ 18 điều kiện (xem Founder Lock §15).

**Hiện tại: CHƯA ĐỦ.**

| # | Điều kiện | Trạng thái |
|---|-----------|-----------|
| 1 | Founder Lock được duyệt | ✅ APPROVED 2026-06-30 |
| 2 | Brand Charter được duyệt | ✅ APPROVED |
| 3 | Domain, DNS, TLS hoạt động | ✅ Active |
| 4 | Địa điểm đầu tiên xác minh | ❌ Chưa có |
| 5 | Quyền vận hành hợp pháp | ❌ Chưa có |
| 6 | SOP an toàn | ✅ Safety page published |
| 7 | Emergency contact | ⏳ Generic, per-location pending |
| 8 | Capacity | ❌ Per-location pending |
| 9 | Giá và cancellation | ❌ Chưa có |
| 10 | Application hoạt động | ⏳ WhatsApp intake, no form yet |
| 11 | Consent hoạt động | ⏳ Privacy policy published |
| 12 | Privacy và terms | ✅ Published |
| 13 | Route 404 thật | ⏳ Pages default 404 |
| 14 | VI/EN đúng | ✅ Bilingual complete |
| 15 | Runtime SHA | ❌ Chưa có |
| 16 | Monitoring | ❌ Chưa có |
| 17 | Rollback | ✅ Pages rollback available |
| 18 | Không còn placeholder claim | ✅ All real content |

## 4. Site hiện tại

Site đã deploy lên Cloudflare Pages (`omdalat-tamfarms`) với:
- **noindex,nofollow** trên tất cả trang (CONCEPT_DEFINED)
- **robots.txt Disallow: /** (chưa authorized public)
- **sitemap.xml rỗng**
- Tên đúng: Những Khu Vườn Tâm / Tam Farm
- Slogan đúng: Sống thật. Làm thật. Lớn lên từ trải nghiệm.
- WhatsApp: +84 84 915 3426
- 3 trang: landing + bài 3 + bài 4 (bài 5 chưa xuất bản)

## 5. Bước tiếp theo đúng

1. **Founder duyệt Founder Lock** — chờ Trần Hà Tâm review
2. **Đăng ký TAMFARMS trong Brand Registry** (D1 seed khi có brand factory)
3. **Xác minh địa điểm đầu tiên** (due diligence 10 điều kiện)
4. **Hoàn thiện pháp lý** (Terms, Privacy, Disclaimer, Safety SOP)
5. **Mở form đăng ký** (khi có application + consent)
6. **Chỉ sau khi đủ 18 điều kiện** → đổi status CONCEPT_DEFINED → PILOT → LIVE_LIMITED → LIVE
7. **Khi authorized** → đổi robots.txt thành Allow, bỏ noindex, enable sitemap

## 6. Tài liệu tham chiếu

- Founder Lock: `docs/governance/NHUNG_KHU_VUON_TAM_FOUNDER_LOCK_2026.md`
- Brand & SEO Lock: `docs/governance/NHUNG_KHU_VUON_TAM_BRAND_SEO_LOCK_2026.md`
- Brand Charter: `docs/governance/brand-charters/tamfarms-charter.md`
- Master HTML (articles 3+4): `docs/governance/NHUNG_KHU_VUON_TAM_ARTICLES_3_4_MASTER_2026.html`
- Role registry: `docs/governance/OMDALAT_SUBDOMAIN_ROLE_REGISTRY_2026.csv` (row OMDALAT_TAMFARMS)
- Domain registry: `docs/governance/OMDALAT_DOMAIN_REGISTRY_2026.csv` (row tamfarms.omdalat.com)
