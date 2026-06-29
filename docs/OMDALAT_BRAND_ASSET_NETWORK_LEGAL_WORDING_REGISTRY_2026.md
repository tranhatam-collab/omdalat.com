# OMDALAT BRAND ASSET NETWORK — LEGAL WORDING REGISTRY

**Artifact ID:** BAN-P0-002  
**Owner:** Single AI Dev Team  
**Status:** LOCKED  
**Date:** 2026-06-29  
**Source:** `docs/OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md` sections 2, 6, 13, 22

---

## 1. Approved wording — public surfaces

### 1.1 Brand Factory (`brand.omdalat.com`)

| Context | Approved (VI) | Approved (EN) | Notes |
|---------|---------------|---------------|-------|
| Package submission CTA | "Gửi gói tài sản thương hiệu" | "Submit Your Brand Asset Package" | No "sell" or "list" wording |
| Post-submit message | "Gói của bạn đã được gửi để xem xét. Bạn sẽ được liên hệ về việc xác minh." | "Your package has been submitted for review. You will be contacted about verification." | No promise of listing or sale |
| Component status | "đã khai báo" / "đã nộp bằng chứng" / "đang xem xét" / "đã xem xét với giới hạn" / "đã xác minh quyền" / "có thể chuyển nhượng" / "bị hạn chế" / "đang tranh chấp" | "declared" / "evidence submitted" / "under review" / "reviewed with limits" / "verified rights" / "transferable" / "restricted" / "disputed" | Per-component, never global |
| Trust label | "nhãn tin cậy theo thành phần" | "per-component trust label" | Always paired with "no global Verified badge" |

### 1.2 Registry (`registry.omdalat.com`)

| Context | Approved (VI) | Approved (EN) | Notes |
|---------|---------------|---------------|-------|
| Page title | "Sổ Đăng Ký Tài Sản Thương Hiệu" | "Brand Asset Registry" | Not "ownership registry" |
| Record heading | "Hồ sơ nguồn gốc công khai" | "Public provenance record" | Not "title" or "deed" |
| Trust disclaimer | "Nhãn tin cậy được gán theo từng thành phần. Không có nhãn Verified toàn cục." | "Trust labels are assigned per-component. There is no global Verified badge." | Mandatory on every record |
| Event timeline | "Dòng thời gian nguồn gốc" | "Provenance timeline" | Not "transaction history" |
| Asset level label | "Ý tưởng" / "Hạt giống" / "Sẵn sàng khởi động" / "Đang vận hành" / "Sẵn sàng chuyển nhượng" | "Idea" / "Seed" / "Ready-to-Launch" / "Operating" / "Transferable" | Level 0 must show warning |

### 1.3 Marketplace (`market.omdalat.com`)

| Context | Approved (VI) | Approved (EN) | Notes |
|---------|---------------|---------------|-------|
| Page title | "Thị Trường Tài Sản Thương Hiệu" | "Brand Asset Marketplace" | Not "shop" or "store" |
| Phase 0 disclaimer | "Giai đoạn 0: Chỉ thị trường riêng. Không nút mua/thầu. Không giữ tiền trực tiếp. Không đấu giá trực tiếp." | "Phase 0: Private marketplace only. No buy/bid buttons. No direct custody. No live auction." | Mandatory on home |
| Listing CTA | "Yêu cầu truy cập" | "Request access" | Not "buy" or "purchase" |
| Price display | "Giá theo yêu cầu" | "Price on request" | No fixed price tags in Phase 0 |
| Listing status | "đang duyệt" / "đã duyệt" / "đã gỡ" / "bị từ chối" | "pending review" / "approved" / "delisted" / "rejected" | Not "for sale" or "sold" |

### 1.4 Auction (`auction.omdalat.com`)

| Context | Approved (VI) | Approved (EN) | Notes |
|---------|---------------|---------------|-------|
| Page title | "Đấu Giá — Chế Độ Sẵn Sàng Pháp Lý" | "Auction — Legal Readiness Mode" | Not "live auction" |
| Status badge | "Sẵn Sàng Pháp Lý" | "Legal Readiness" | Not "live" or "open" |
| Block notice | "Không Có Đấu Giá Trực Tiếp" | "No Live Auctions" | Mandatory |
| Gate notice | "Chức năng đấu giá bị khóa cho đến khi đối tác pháp lý phê duyệt." | "Auction functionality is gated behind legal partner signoff." | Mandatory |

---

## 2. Prohibited wording — all surfaces

| Phrase | Reason |
|--------|--------|
| "verified brand" / "thương hiệu đã xác minh" | No global verified badge — only per-component |
| "fully verified" / "hoàn toàn xác minh" | Same — no global claim |
| "guaranteed authentic" / "đảm bảo chính hãng" | No authenticity guarantee without evidence per component |
| "ownership guaranteed" / "sở hữu đảm bảo" | No ownership guarantee — only rights evidence |
| "legal title guaranteed" / "đảm bảo quyền sở hữu pháp lý" | No title guarantee — only transfer workflow |
| "buy now" / "mua ngay" | No buy buttons in Phase 0 |
| "bid now" / "đấu giá ngay" | No bid buttons until P3 |
| "place bid" / "đặt thầu" | Same |
| "start auction" / "bắt đầu đấu giá" | No auction start until legal gate |
| "live auction" / "đấu giá trực tiếp" (as CTA, not disclaimer) | Not until P3 |
| "direct escrow" / "escrow trực tiếp" | No direct custody — only escrow provider reference |
| "we hold funds" / "chúng tôi giữ tiền" | No fund custody |
| "instant transfer" / "chuyển nhượng tức thì" | Transfer is a multi-step workflow |
| "guaranteed transfer" / "chuyển nhượng đảm bảo" | No transfer guarantee |
| "sold" / "đã bán" (as registry status) | Use "transfer_completed" instead |
| "ownership transferred" / "đã chuyển quyền sở hữu" (as registry status) | Use "transfer_completed" instead |

---

## 3. Trademark transfer states — approved labels

| State | Approved (VI) | Approved (EN) | Prohibited |
|-------|---------------|---------------|------------|
| `pending_filing` | "Chờ nộp đơn" | "Pending filing" | "registered" |
| `filed` | "Đã nộp đơn" | "Filed" | "approved" |
| `registered` | "Đã đăng bạ" | "Registered" | "verified" |
| `opposed` | "Bị phản đối" | "Opposed" | "rejected" |
| `transferred` | "Đã chuyển nhượng" | "Transferred" | "SOLD", "OWNERSHIP TRANSFERRED" |

---

## 4. Domain transfer — approved wording

| Field | Approved | Prohibited |
|-------|----------|------------|
| Status | "pending", "initiated", "verified_control", "transferred" | "sold", "owned" |
| Auth info | Never display, never store long-term | EPP code, AuthInfo |

---

## 5. NFT / credential boundary — approved wording

| Allowed | Prohibited |
|---------|------------|
| "credential points to registry record" | "NFT is legal title" |
| "token anchors to evidence" | "NFT proves ownership" |
| "optional token layer" | "token replaces contract" |
| "credential is a pointer, not a right" | "credential is ownership" |

---

## 6. Enforcement

This registry is enforced by:
- `workers/api/src/lib/overclaim-validator.ts` — scans content blocks
- `workers/api/tests/asset-network-gates.test.ts` — BAN-1 to BAN-4 scan rendered HTML
- `workers/api/tests/overclaim-validator.test.ts` — 33 tests on validator
- Manual review before any new public surface goes live

Any new wording must be added to this registry before it can appear on a public surface.

---

Locked. Updates require a new dated section, not edits to existing entries.
