# APDALAT_100_LOCAL_BRAND_BRANCH_SYSTEM_2026

Ấp Đà Lạt / Ap Dalat — Hệ 10–100 web nhánh cho du lịch canh nông, nông nghiệp sạch và thương hiệu địa phương

Version: 1.0 — FINALIZED (was MASTER STRATEGY DRAFT)
Status: LOCKED for build
Scope: `ap.omdalat.com`, `omdalat.com`, brand subdomains `{brand}.omdalat.com`
Depends on (must read first): `APDALAT_BRAND_FACTORY_CONSISTENCY_AUDIT_2026-06-17.md`
Companion: `OMDALAT_AI_AGENT_LOCAL_BRAND_FACTORY_2026.md`

> Tinh thần: địa phương thật, người dân thật, nông nghiệp sạch, thương hiệu thật,
> web/app dùng được trong đời sống — không làm dự án trình diễn.
> Mọi quyết định kiến trúc trong file này tuân theo audit ở trên. Nếu mâu thuẫn,
> **audit thắng**.

---

## 0. Kết luận sau audit

0.1 **`ap.omdalat.com` là lớp editorial, đã bị KHÓA là editorial.** Không biến nó thành
hotel/homestay/booking. Đây là ràng buộc cứng từ `APDALAT_CMS_SCHEMA_2026` và
`OMDALAT_TO_APDALAT_PRESENCE_AND_LINKING_RULES_2026`, không phải lựa chọn mới.

0.2 **Rủi ro tên "Ấp" trùng hotel/homestay** (đã có "ẤP - Hotel & Apartment" trên các
trang du lịch) được xử lý đúng bằng cách: `ap` giữ định vị truyền thông địa phương,
còn mọi nội dung thương hiệu/đón khách nằm ở lớp brand `{brand}.omdalat.com`.

0.3 **Việc đầu tiên không phải mở 100 subdomain.** Việc đầu tiên là dựng **Brand Factory**
(1 schema + 1 renderer + cổng duyệt). Khi đó mỗi địa điểm mới chỉ là 1 record + ảnh +
approval, không phải một dự án.

---

## 1. Tầm nhìn hệ thống

Ấp Đà Lạt giúp mỗi người dân / nhà vườn / không gian nông nghiệp sạch có một
**thương hiệu số tối thiểu, thật**: được nhìn thấy đúng, có hồ sơ riêng, ảnh thật,
câu chuyện rõ, và một đường dẫn có trách nhiệm:

```
địa điểm thật → hồ sơ editorial (ap) + microsite thương hiệu (brand)
→ inquiry / visit / order / partnership → hệ vận hành Ôm Đà Lạt
```

Đi từ Lạc Dương → Lâm Đồng mới → Việt Nam → quốc tế, nhưng luôn bắt đầu từ một
nơi chốn thật và một người thật.

---

## 2. Ba lớp web (KHÓA — xem audit §1)

| Lớp | Domain | Vai trò | Thương mại |
| --- | --- | --- | --- |
| **L1 Vận hành** | `omdalat.com`, `app.omdalat.com`, `api.omdalat.com` | member, ở/làm/học, **thanh toán**, dashboard chủ địa điểm, xử lý inquiry/booking | Có (lane `pay.iai.one` đã có sẵn) |
| **L2 Editorial** | `ap.omdalat.com` | con người, nơi chốn, nhịp sống, câu chuyện, ảnh | **Không** |
| **L3 Thương hiệu** | `{brand}.omdalat.com` | story + sản phẩm + trải nghiệm + **nút inquiry** | Lead/inquiry; booking/tiền uỷ thác L1 |

Quy tắc bất biến: **không trùng vai trò, không trùng nội dung, không cạnh tranh SEO.**
L2 kể *câu chuyện*; L3 là *thương hiệu*; hai bên soft-link theo presence/linking rules,
không mirror nội dung.

---

## 3. Bối cảnh hành chính & vì sao đúng hướng

- Lạc Dương mới (hợp nhất Đạ Sar, Đạ Nhim, Đạ Chais; ~828 km²; ~14.912 người;
  đơn vị hành chính mới hoạt động từ 01/07/2025) là vùng rộng, giàu tài nguyên,
  nông nghiệp, văn hóa bản địa — nền tốt cho du lịch canh nông.
- Lâm Đồng định hướng tích hợp, chuyển đổi số, tăng trưởng xanh.
- Du lịch canh nông + OCOP là xu hướng được ghi nhận chính thống.

Vì vậy hệ này = **chuyển đổi số địa phương + truyền thông nông nghiệp sạch +
du lịch canh nông + thương hiệu nhà vườn + kinh tế cộng đồng.** Không cạnh tranh
bằng phòng rẻ / check-in ảo / tour đại trà — cạnh tranh bằng *thật*.

> Lưu ý nguồn: các số liệu hành chính trên là dữ liệu founder cung cấp; team field
> phải xác nhận lại trước khi đưa vào nội dung public (không overclaim số liệu).

---

## 4. Mô hình "mỗi người dân một thương hiệu số"

Người dân không cần công ty lớn hay chiến dịch đắt tiền. Họ cần: một tên đúng,
một hồ sơ rõ, một địa chỉ được xác minh, ảnh thật, câu chuyện tử tế, danh sách
sản phẩm/dịch vụ, một kênh liên hệ, và một cách để đội vận hành hiểu họ có gì.

**Giai đoạn 1 (1–2 năm đầu): miễn phí.** Mục tiêu là xây mạng lưới + dữ liệu nền.
Không thu phí trước khi tạo giá trị. Không bán "gói web" nếu web chưa mang lại
khách/đơn/niềm tin. (Mô hình doanh thu chi tiết: §12.)

---

## 5. Hệ subdomain chuẩn (L3)

- Tên: `{brand}.omdalat.com` — ví dụ `tamfarm.omdalat.com`, `dablah.omdalat.com`.
- Slug: ngắn, không dấu, dễ đọc, không trùng thương hiệu khác; ưu tiên tên đã có
  trên Google Maps; nếu chưa có, dùng tên chủ/tên farm tạm đã duyệt.
- **Wildcard có kiểm soát**: DNS có thể wildcard kỹ thuật, nhưng renderer chỉ phục vụ
  host có record `published` trong allowlist. Không ai publish công khai khi chưa
  xác minh địa điểm (audit C8).

---

## 6. Quy trình khi nhận một link Google Maps (12 bước)

Đây là hợp đồng cho team Dev/AI. Chi tiết agent: file companion §4–5.

1. **Phân giải link** → tên (nếu có), tọa độ, địa chỉ, loại hình, Place ID, ảnh
   public, SĐT, website, review.
2. **Xác định trạng thái**: (A) có profile đúng tên; (B) có profile nhưng sai/thiếu;
   (C) chỉ có tọa độ; (D) có profile nhưng chủ chưa kiểm soát.
3. **Xác minh thực tế**: không build public khi chưa có chủ xác nhận + ảnh thật +
   loại hoạt động thật + quyền dùng tên/ảnh + liên hệ chính xác.
4. **Brand Intake** (record trong `omdalat-core`, schema ở file companion §6/§8).
5. **Hồ sơ editorial (L2)** `ap.omdalat.com/...` — KHÔNG từ ngữ booking.
6. **Microsite thương hiệu (L3)** `{brand}.omdalat.com` — chỉ khi đạt điều kiện.
7. **Chọn template** (§10).
8. **Nội dung** (tên, câu chuyện, chủ vườn, sản phẩm, trải nghiệm, ảnh, vị trí, FAQ,
   liên hệ, CTA).
9. **Ảnh chuẩn** theo `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026` — dùng lại
   model `media_asset` (rights/consent/license), không tạo model ảnh song song.
10. **SEO** (title/desc VI/EN, schema LocalBusiness/Farm/Lodging/TouristAttraction
    *theo loại*, canonical, OG, Maps embed nếu được phép). Schema commerce chỉ trên L3.
11. **Compliance checklist** theo hoạt động (§11/audit §4.6).
12. **Publish** chỉ khi đủ: owner consent, ảnh thật, contact thật, route đúng,
    quyền ảnh, không overclaim, trạng thái pháp lý rõ.

---

## 7. Hai tình huống mẫu (đối lập)

### 7.1 Tâm Farm — chưa có tên trên Google Maps (chỉ tọa độ `12.0971847,108.5539659`)
- Trạng thái khởi tạo: `private_preview`. Tên đề xuất: Tâm Farm / Tam Farm →
  `tamfarm.omdalat.com`.
- Trình tự: chốt tên → chốt domain → (nếu có địa điểm thật) tạo Google Business
  Profile qua quy trình xác minh → chuẩn bị ảnh thật → tạo hồ sơ "đang xác minh" →
  landing private preview → publish khi có owner consent + thông tin tối thiểu.
- Hero tạm (VI): "Tâm Farm — một hồ sơ nông nghiệp sạch đang được xây dựng trong hệ
  Ấp Đà Lạt." **Cấm**: "đã mở cửa", "đạt chuẩn", "nổi tiếng", "đặt ngay" (validator §4).

### 7.2 Homestay Da Blah — đã có tên trên Google Maps (Thôn Đạ Blah, Lạc Dương)
- Là một địa điểm **lưu trú** → đây là ca điển hình của lớp **L3**, KHÔNG phải nội
  dung `ap`. Subdomain: `dablah.omdalat.com` (giữ tên đã có).
- Việc cần làm: xác nhận chủ; quyền dùng tên; pháp lý lưu trú; ảnh có quyền; câu
  chuyện Đạ Blah; tách rõ lưu trú / trải nghiệm / nông nghiệp / cộng đồng.
- **Cấm**: copy nội dung/review từ Booking/Trip/Google; dùng review làm bằng chứng
  chính; claim "đối tác chính thức" khi chưa ký; booking trực tiếp khi chưa kiểm tra
  pháp lý/quyền (đi qua L1).

---

## 8. Cấu trúc "một Ấp thật" — 12 câu phải trả lời

Ở đâu · Ai làm · Làm nông nghiệp/sản phẩm/dịch vụ gì · Có gì sạch–thật–đáng tin ·
Ghé thăm được không · Mua được không · Ở lại được không · Làm việc được không ·
Điều kiện pháp lý nào · Ảnh thật là gì · Câu chuyện khác biệt · Liên hệ cách nào.

Không trả lời đủ 12 câu → chưa publish L3.

---

## 9. Khác biệt cốt lõi

Nền tảng khác: `địa điểm → listing → booking`.
Ấp Đà Lạt: `địa điểm → con người → câu chuyện → niềm tin → sản phẩm/trải nghiệm →
doanh thu có trách nhiệm`. Đây là điểm khác biệt thật và là lý do tách L2/L3.

---

## 10. Template L3 (mỗi microsite)

Cấu trúc giống nhau (build nhanh), nội dung riêng (thật).

Trang chủ: Hero · Đây là nơi gì · Câu chuyện chủ nơi · Nông nghiệp/sản phẩm ·
Trải nghiệm có thể mở · Không gian & hình ảnh · Vị trí · Điều kiện ghé thăm/liên hệ ·
FAQ · CTA.

Menu VI: Trang chủ · Câu chuyện · Vườn/Sản phẩm · Trải nghiệm · Hình ảnh · Vị trí · Liên hệ.
Menu EN: Home · Story · Farm/Products · Experiences · Images · Location · Contact.

CTA (không dùng "Đặt ngay" nếu chưa đủ pháp lý): *Gửi yêu cầu ghé thăm · Hỏi về sản
phẩm · Hỏi về trải nghiệm · Liên hệ chủ vườn · Xem hồ sơ trên Ấp Đà Lạt (link L2)*.

Templates theo loại: Farm clean-agriculture · Agro-tourism experience · Homestay/
Long-stay · Garden/Flower/Strawberry · Coffee/Tea/Local-product · Craft/Workshop ·
Community Ap · Hybrid.

---

## 11. Pháp lý phải khóa từ đầu

- **Lưu trú** (ngủ lại/homestay/farmstay): NĐ 96/2016 (an ninh trật tự), PCCC, đăng ký
  tạm trú, đăng ký kinh doanh. CTA lưu trú chỉ render khi compliance ≠ `unknown` (validator §4.6).
- **Ăn uống**: an toàn thực phẩm, điều kiện kinh doanh, hóa đơn/chứng từ nếu bán.
- **Dữ liệu cá nhân**: NĐ 13/2023 (hiệu lực 01/07/2023) cho mọi thông tin chủ vườn/
  khách/SĐT/ảnh.
- **Hình ảnh người**: không publish ảnh người dân/trẻ em/khu sinh hoạt riêng khi chưa
  có consent.
- Web chỉ thể hiện *trạng thái thông tin + checklist*; không thay tư vấn pháp lý chuyên môn.

---

## 12. Mô hình kinh doanh

- **GĐ1 — miễn phí 1–2 năm**: hồ sơ Ap, microsite cơ bản, 1 bộ bài giới thiệu,
  gallery cơ bản, SEO local, form inquiry. Đổi lại: cho phép dùng thông tin/ảnh đã
  duyệt, cam kết thông tin đúng, hỗ trợ xác minh, không overclaim.
- **GĐ2 — thu theo hiệu quả**: % inquiry→booking, % đơn hàng, phí duy trì nhẹ, nâng
  cấp ảnh/video, quản lý chiến dịch, revenue share du lịch canh nông. **Mọi dòng tiền
  qua lane `pay.iai.one` hiện có** (audit C5); revenue-share là tính năng ledger L1.
- **GĐ3 — đối tác chính thức**: Certified Ap Partner / Om Dalat Stay Partner /
  Clean Farm Partner / Local Product Partner / Agro-tourism Partner. **Không cấp badge
  khi chưa kiểm chứng thật.**

---

## 13. Triển khai theo cụm

- **Cụm 1 — Lạc Dương mới (thí điểm)**: Đạ Sar, Đạ Nhim, Đạ Chais, Đạ Blah /
  gần Langbiang–ZooDoo. Mục tiêu 90 ngày: 10 địa điểm · 3 microsite · 20 bài Ap ·
  1 tuyến trải nghiệm mẫu · 1 dashboard địa điểm v1.
- **Cụm 2 — phụ cận Đà Lạt**: Trại Mát, Cầu Đất, Tà Nung, Xuân Thọ, Xuân Trường, Lang Biang.
- **Cụm 3 — Lâm Đồng mở rộng**: Bảo Lộc, Di Linh, Đức Trọng, Đơn Dương (trà, cà phê,
  hoa, dâu, rau, thủ công).
- **Cụm 4 — toàn tỉnh** sau khi hệ ổn.

---

## 14. Roadmap 12 tháng

- **0–30 ngày**: dựng Brand Factory schema (migrations `omdalat-core`), intake từ
  Maps link, 1 template L3, 3 hồ sơ đầu (Tâm Farm preview, Đa Blah draft, 1 nhà vườn
  thật), 10 bài Ap nền, chốt image standard (đã có).
- **31–90 ngày**: publish 10 Ap profiles, 3 microsite đầu, form "Đề xuất một Ấp",
  dashboard chủ địa điểm, compliance checklist, tuyến Lạc Dương 1 ngày, bộ ảnh 5 nơi.
- **3–6 tháng**: 30 địa điểm, 10 microsite, 3 tuyến, tracking inquiry, thử revenue
  share nhẹ, local product shelf.
- **6–12 tháng**: 100 hồ sơ, 30 microsite, dashboard đối tác, booking/inquiry workflow
  hoàn chỉnh, content contributor team, chuẩn bị mở rộng toàn Lâm Đồng.

---

## 15. Team structure

- **Team 1 — Foundation/Brand/QA**: giữ chuẩn, duyệt tên/ngôn ngữ/ảnh/publish/compliance.
- **Team 2 — Dev/CMS/Subdomain**: routing, templates, Maps intake, CMS, subdomain
  renderer, dashboard (xây *trên* infra hiện có — audit §3).
- **Team 3 — Field/Content/Local Ops**: gặp chủ vườn, chụp ảnh, xác minh, lấy consent,
  viết story, cập nhật pháp lý cơ bản, theo dõi inquiry.

---

## 16. Điều cần nói với người dân

Không nói: "Chúng tôi làm web bán hàng cho cô/chú."
Nên nói: "Chúng tôi giúp mỗi nhà vườn có một hồ sơ thương hiệu rõ ràng trên mạng.
Giai đoạn đầu miễn phí để cùng xây dữ liệu, hình ảnh, câu chuyện và kênh liên hệ.
Khi nơi đó có khách, có đơn, có giá trị thật, hai bên mới bàn cách chia sẻ chi phí
hoặc doanh thu phù hợp."

---

## 17. Rubric 10/10 cho mỗi web nhánh (L3)

Địa điểm thật · Owner consent · Câu chuyện rõ (không copy) · Ảnh thật (không du lịch
hóa) · Song ngữ tốt (không dịch máy) · SEO đủ (title/meta/slug/schema/OG) · Compliance
rõ (không vượt pháp lý) · CTA đúng (không "đặt ngay" khi chưa đủ) · CMS sạch (có cấu
trúc, tái dùng) · QA/release log (có kiểm tra + rollback). Mỗi mục 1 điểm.

---

## 18. Câu chốt

Ấp Đà Lạt không phải danh bạ địa điểm. Nó là cách để mỗi người dân, mỗi nhà vườn,
mỗi sản phẩm sạch có một thương hiệu số tử tế, bắt đầu từ chính cái họ đang có.

- Ôm Đà Lạt (L1) giữ hệ vận hành và tiền.
- Ấp Đà Lạt (L2) mở cửa truyền thông địa phương.
- Các web nhánh (L3) cho từng thương hiệu đứng riêng, không lạc khỏi hệ chung.

**Chốt cho DEV: build Brand Factory trước, không build từng web thủ công.**
