# OMDALAT OM Public Image Reality Audit

Version: 1.0  
Status: P1_QUEUE

Date: 2026-04-29  
Lane: Om public  
Owner: Team 2  
Reviewer: Team 1

Mục đích: khóa sơ bộ chuẩn ảnh công khai theo `OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md`.

Reference controls:

- [OMDALAT_CONTENT_SYSTEM_SOP.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CONTENT_SYSTEM_SOP.md)
- [OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_CMS_AND_DATA_MODEL_SPEC_2026.md)
- [OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md](/Users/tranhatam/Documents/Devnewproject/omdalat.com/docs/OMDALAT_AND_APDALAT_IMAGE_REALITY_STANDARD_2026.md)

## 1) Core route image check

| Route | Locale | Image reference | Alt VI | Alt EN | Caption VI | Caption EN | Usage type | Image source | Status | Evidence | Note |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/vi` | vi-VN | `homepage-hero-primary` | `Toàn cảnh Đà Lạt trong sương sớm` | `A wide view of Dalat in the early mist` | `Không khí sớm của Đà Lạt trên nền không gian sống thực.` | `A Dalat morning atmosphere with practical living-space context.` | hero | pending source log | `PASS` | `OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Alt text đã trích từ canonical, phù hợp route `/vi` theo chuẩn ảnh mới. |
| `/en` | en | `homepage-hero-primary` | `Toàn cảnh Đà Lạt trong sương sớm` | `A wide view of Dalat in the early mist` | `Morning atmosphere of Dalat with realistic living rhythm.` | `A realistic living rhythm in Dalat on a misty morning.` | hero | pending source log | `PASS` | `OMDALAT_OM_PUBLIC_EVIDENCE_PACKET_2026-04-28.md` | Route locale EN của cùng hero image. |
| `/vi/contact` | vi-VN | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | surface (no inline image) | N/A | `PASS` | `OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md` | Canonical đã recover 200, không phát hiện ảnh inline. |
| `/en/contact` | en | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | surface (no inline image) | N/A | `PASS` | `OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md` | Canonical đã recover 200, không phát hiện ảnh inline. |
| `/vi/docs` | vi-VN | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | surface (no inline image) | N/A | `PASS` | `OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md` | Docs page render không có ảnh inline. |
| `/en/docs` | en | `N/A` | `N/A` | `N/A` | `N/A` | `N/A` | surface (no inline image) | N/A | `PASS` | `OMDALAT_OM_PUBLIC_ALT_TEXT_AUDIT_2026-04-28.md` | Docs page render không có ảnh inline. |

## 2) P1 queue

- `Mở rộng hình audit` cho các route article / section ngoài core đã được nêu trong P1 queue.
- `Bổ sung source log` theo schema ImageAssets (file_name, source, license, photographer/owner, usage_type, alt_vi, alt_en, caption_vi, caption_en, crop status desktop/mobile).
- `Khớp lại alt + caption` cho ảnh được tái sử dụng trên nhiều route để tránh sai role và lệch nghĩa.
