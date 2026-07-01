# ADR-003 — Tam Farms = Chain Model, Lily = Reference Location

**ADR ID:** ADR-003
**Title:** Phân tách Tam Farms (mô hình chuỗi) và Lily (địa điểm tham chiếu) — không dùng cùng một bộ tiêu chí
**Date:** 2026-07-01
**Status:** APPROVED — ARCHITECTURE LOCK
**Decision maker:** Trần Hà Tâm (Founder)
**Supersedes:** ADR-001 (partially — corrects the assumption that Tam Farms and Lily are the same type of entity)
**Build authorization:** APPROVED FOR ARCHITECTURE RESTRUCTURING

---

## 1. Context

ADR-001 đặt Tam Farms và Lily vào cùng một pipeline "thương hiệu địa phương" với cùng một bộ tiêu chí. Đây là sai lầm kiến trúc.

**Thực tế:**

| | Tam Farms | Lily |
|---|-----------|------|
| Loại thực thể | Mô hình chuỗi (chain model) | Địa điểm tham chiếu (reference location) |
| Tên tiếng Anh | Tam Farms (plural — nhiều khu vườn) | Lily |
| Vai trò | Sở hữu phương pháp, tiêu chuẩn, quyền cấp phép | Triển khai, kiểm chứng, trình diễn mô hình |
| Cần địa chỉ? | Không — mô hình có thể áp dụng ở bất kỳ đâu | Có — địa điểm thực tế |
| Cần PCCC/lodging? | Không — không phải nơi lưu trú | Có — có chỗ ở thật |
| Audit bằng gì? | Model clarity, business system, replication, governance | Location, operator, accommodation, safety, programs |
| Website | tamfarms.omdalat.com — site mô hình tổng | lily.omdalat.com — site địa điểm |

---

## 2. Decision

### 2.1. Tam Farms là mô hình chuỗi

Tam Farms là mô hình phát triển chuỗi địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia.

Tam Farms sở hữu:
- Bộ phương pháp
- Mô hình doanh nghiệp
- Mô hình hợp tác và cổ phần (4 node types)
- Tiêu chuẩn địa điểm
- Tiêu chuẩn chuyên gia
- Tiêu chuẩn chương trình
- Hệ thống vận hành
- Hệ thống đào tạo
- Hệ thống thương hiệu
- Quy trình kiểm định
- Mô hình doanh thu (5 layers)
- Mô hình nhân bản
- Marketplace chuyên gia và địa điểm
- Dữ liệu hiệu quả toàn chuỗi
- Quyền cấp phép mô hình

**Tam Farms không phải một chỗ lưu trú cụ thể.** Tam Farms không cần địa chỉ, PCCC, hay lodging compliance.

### 2.2. Lily là địa điểm tham chiếu

Lily là địa điểm thực tế đầu tiên dùng để demo, kiểm chứng và hoàn thiện mô hình Tam Farms.

Lily sở hữu:
- Địa chỉ và không gian cụ thể
- Phòng ở, bếp, khu làm việc, khu học tập, khu vườn
- Lịch hoạt động, sức chứa, điều kiện tiếp nhận
- Nội quy, an toàn, trải nghiệm tại chỗ
- Đội vận hành địa điểm
- Dữ liệu vận hành của Lily

Lily không sở hữu:
- Toàn bộ phương pháp Tam Farms
- Quyền cấp phép Tam Farms
- Toàn bộ mạng lưới chuyên gia
- Chiến lược cổ phần chuỗi
- Tiêu chuẩn nhân bản toàn hệ
- Thương hiệu tổng Tam Farms

**Lily phải được gắn nhãn:** "LILY — A TAM FARMS REFERENCE LOCATION" / "LILY — ĐỊA ĐIỂM MẪU THUỘC HỆ NHỮNG KHU VƯỜN TÂM"

### 2.3. Năm bộ tiêu chuẩn khác nhau

Thay vì một OMDALAT_LOCAL_BRAND_STANDARD duy nhất, hệ thống sẽ có 5 bộ tiêu chuẩn:

| Standard | Đối tượng | File |
|----------|-----------|------|
| OMDALAT_BRAND_STANDARD | Mọi brand trong hệ Ôm Đà Lạt | `standards/OMDALAT_BRAND_STANDARD_2026.md` |
| TAMFARMS_MODEL_STANDARD | Mô hình chuỗi Tam Farms | `standards/TAMFARMS_MODEL_STANDARD_2026.md` |
| TAMFARMS_LOCATION_STANDARD | Mỗi địa điểm (Lily + future) | `standards/TAMFARMS_LOCATION_STANDARD_2026.md` |
| TAMFARMS_EXPERT_STANDARD | Chuyên gia trong mạng lưới | `standards/TAMFARMS_EXPERT_STANDARD_2026.md` |
| TAMFARMS_PROGRAM_STANDARD | Mỗi chương trình | `standards/TAMFARMS_PROGRAM_STANDARD_2026.md` |

### 2.4. Không migrate Tam Farms thành location tenant

ADR-001 nói "migrate Tam Farm vào Brand Factory pipeline như Lily." Đây là sai.

**Quyết định đúng:**
- Tam Farms KHÔNG phải location tenant
- Tam Farms là **mô hình mẹ** và **platform quản trị chuỗi**
- Lily là **location tenant / reference implementation** đầu tiên
- Tam Farms cần D1 record nhưng với `brand_type = 'chain_model'`, không phải `'experiential_education'`
- Tam Farms không cần compliance_checklists (lodging, PCCC) — đó là location standard

### 2.5. Legal entity

**CÔNG TY TNHH SX-TM-DV THÁI LÂM**
- MST: 5801443073
- Địa chỉ: 42 Cao Bá Quát, Phường Lang Biang, Đà Lạt, Lâm Đồng
- Người đại diện: TRẦN NGUYỄN HẠ THI
- Loại hình: Công ty TNHH 2 thành viên trở lên
- Ngày hoạt động: 2020-09-17
- Ngành nghề chính: Trồng rau, đậu các loại và trồng hoa, cây cảnh (01120)
- Ngành nghề phụ: Chăn nuôi, lâm nghiệp, xây dựng nhà ở, giáo dục, dịch vụ lưu trú, etc.
- Trạng thái: Đang hoạt động

**Áp dụng cho:** Tam Farms (chain model) + Lily (location) + toàn bộ hệ omdalat.com

Mặc định: pháp lý đã đầy đủ regardless of public announcement. Mọi mô hình đều cần pháp lý rõ ràng.

### 2.6. English name correction

- **Sai:** "Tam Farm" (singular — ngụ ý một farm duy nhất)
- **Đúng:** "Tam Farms" (plural — đại diện cho nhiều khu vườn, nhiều địa điểm, nhiều chuyên gia)

Cập nhật toàn bộ: charter, founder lock, website, D1, SEO, OG tags, sitemap.

### 2.7. Architecture diagram

```
Tam Farms (Chain Model)
    │
    ├── Brand & Operating Model
    ├── Expert Network
    ├── Program Standards
    ├── Location Standards
    ├── Investment & Equity Model (4 node types)
    ├── Replication System
    ├── Training & Certification
    ├── Licensing Rights
    │
    └── Tam Farms Locations
           │
           ├── Lily — Reference Location 01
           ├── Lạc Dương Location (future)
           ├── Nam Ban Location (future)
           ├── Lâm Hà Location (future)
           └── Future expert-operated locations
```

---

## 3. Consequences

### Tam Farms
- Audit bằng TAMFARMS_MODEL_STANDARD (18 criteria: vision, business, revenue, equity, replication, governance...)
- Không audit bằng location criteria (PCCC, lodging, address)
- D1 record: brand_type = 'chain_model'
- Website: tamfarms.omdalat.com = model site (mô hình, địa điểm, chương trình, chuyên gia, doanh nghiệp, đầu tư)
- Status: MODEL DEFINED → MODEL CERTIFIED (khi đủ 18 criteria)

### Lily
- Audit bằng TAMFARMS_LOCATION_STANDARD (20 criteria: operator, location rights, accommodation, safety...)
- D1 record: brand_type = 'reference_location', parent_model = 'brnd_tamfarms'
- Website: lily.omdalat.com = location site (không gian, chỗ ở, làm việc, khu vườn, chương trình, lịch, nội quy, an toàn)
- Status: REFERENCE LOCATION 01 → LOCATION CERTIFIED (khi đủ 20 criteria)
- Phải hiển thị nhãn: "A TAM FARMS REFERENCE LOCATION"

### Hệ thống
- 5 bộ tiêu chuẩn thay vì 1
- ADR-001 được sửa: Tam Farms không migrate thành location tenant
- OMDALAT_LOCAL_BRAND_STANDARD_2026.md v1.1 → thay bằng 5-tier standard system
- AGENTS.md cần update: compliance rules áp dụng cho locations, không cho chain model

---

## 4. Trạng thái hiện tại

### Tam Farms

| Trường | Giá trị |
|--------|---------|
| Brand status | MODEL DEFINED |
| Business model | PARTIALLY DEFINED |
| Expert model | NEEDS STANDARDIZATION |
| Equity model | NEEDS GOVERNANCE |
| Replication model | NEEDS STANDARDIZATION |
| Technology platform | BUILDING |
| First reference location | LILY |
| Legal entity | CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073) |

### Lily

| Trường | Giá trị |
|--------|---------|
| Role | REFERENCE LOCATION 01 |
| Location status | REAL |
| Operational readiness | MUST BE VERIFIED BY LOCATION STANDARD |
| Purpose | DEMONSTRATE AND VALIDATE TAM FARMS |
| Replication rights | DOES NOT OWN |
| Legal entity | CÔNG TY TNHH SX-TM-DV THÁI LÂM (MST 5801443073) |

---

## 5. Founder Lock correction

**FOUNDER CORRECTION — TAM FARMS AND LILY ARCHITECTURE**

1. Tam Farms là mô hình mẫu do Trần Hà Tâm sáng lập để phát triển chuỗi địa điểm sống, học tập, làm việc và trải nghiệm thực tế cùng chuyên gia. Tam Farms không phải một địa điểm lưu trú đơn lẻ.

2. Lily là địa điểm thực tế đầu tiên dùng để demo, kiểm chứng và hoàn thiện mô hình Tam Farms.

3. Sau khi mô hình được kiểm chứng tại Lily, Tam Farms có thể phát triển thêm: địa điểm do Founder vận hành, đối tác vận hành, liên doanh, chuyên gia dẫn dắt, kết hợp doanh nghiệp/farm/cộng đồng.

4. Mỗi địa điểm mới phải vượt qua: Tam Farms Location Standard, operator review, expert review, program review, safety and legal review, business viability, technology integration, Founder approval.

5. Tam Farms được đánh giá ở cấp mô hình doanh nghiệp và hệ thống nhân bản. Lily được đánh giá ở cấp địa điểm vận hành thực tế. Không được tiếp tục dùng một bộ tiêu chí giống nhau để đánh giá hai thực thể này.

6. Không migrate Tam Farms thành một tenant giống Lily. Tam Farms phải là mô hình mẹ và platform quản trị chuỗi; Lily là location tenant/reference implementation đầu tiên.

---

## 6. References

- ADR-001 (superseded partially — unified pipeline still applies to locations, not to chain model)
- ADR-002 (cookie scope — still pending)
- `docs/governance/standards/TAMFARMS_MODEL_STANDARD_2026.md`
- `docs/governance/standards/TAMFARMS_LOCATION_STANDARD_2026.md`
- `docs/governance/standards/TAMFARMS_EXPERT_STANDARD_2026.md`
- `docs/governance/standards/TAMFARMS_PROGRAM_STANDARD_2026.md`
- `docs/governance/standards/OMDALAT_BRAND_STANDARD_2026.md`
- Legal: masothue.com/5801443073

---

## 7. Founder sign-off

**Founder:** Trần Hà Tâm
**Date:** 2026-07-01
**Build authorization:** APPROVED FOR ARCHITECTURE RESTRUCTURING
