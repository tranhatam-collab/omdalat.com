# OMDALAT BRAND ASSET NETWORK — LEGAL PARTNER APPROVAL PACKET (TEMPLATE)

**STATUS: PENDING — awaiting legal partner engagement. This is a template packet, NOT an executed approval.**

**Date prepared:** 2026-06-30
**Prepared by:** Development team
**Required by:** Founder (Tran Ha Tam) + external legal partner

---

## 1. Purpose

This document is the template for the legal partner approval packet required before enabling `AUCTION_LIVE_ENABLED` feature flag.

**Until this packet is signed by a licensed legal partner, the auction functionality remains in legal-readiness mode (all API endpoints return 403, all UI screens show legal-readiness message).**

---

## 2. What needs legal review

### 2.1 Auction terms
- [ ] Bidding model (English ascending, sealed-bid, or hybrid)
- [ ] Reserve price rules
- [ ] Bidder qualification criteria (KYC/KYB requirements)
- [ ] Deposit requirements (if any)
- [ ] Cancellation and withdrawal rules
- [ ] Default and dispute rules
- [ ] Winner declaration process
- [ ] Post-auction transfer timeline

### 2.2 Jurisdictional compliance
- [ ] Vietnam: Ministry of Industry and Trade (MOIT) requirements
- [ ] Vietnam: Law on Competition (anti-monopoly)
- [ ] Vietnam: Civil Code (transfer of intellectual property)
- [ ] Vietnam: Law on E-Transactions (digital signatures)
- [ ] International: Applicable law for cross-border transactions
- [ ] International: Recognition of Vietnamese trademarks abroad
- [ ] International: Data transfer compliance (GDPR, PDPA)

### 2.3 Contract templates
- [ ] Brand asset assignment agreement (full transfer)
- [ ] License agreement (royalty-based)
- [ ] Escrow instructions
- [ ] Domain transfer authorization
- [ ] Trademark assignment form
- [ ] Non-disclosure agreement (data room access)
- [ ] Dispute resolution clause

### 2.4 Data retention
- [ ] KYC/KYB document retention period
- [ ] Bid history retention (immutable audit trail)
- [ ] Personal data deletion on request (GDPR right to erasure)
- [ ] Data room access log retention
- [ ] Evidence document retention

### 2.5 Prohibited activities (per execution lock section 22)
- [ ] No famous brand registration (legal review of trademark search process)
- [ ] No sell without evidence (legal review of evidence requirements)
- [ ] No fractional ownership (legal review of ownership structure)
- [ ] No NFT as contract (legal review of credential language)
- [ ] No AI price setting (legal review of pricing process)
- [ ] No customer data sale (legal review of data transfer rules)
- [ ] No platform account transfer (legal review of social media transfer rules)

---

## 3. Approval record

```
Legal partner: _______________________________
Law firm: ____________________________________
License number: ______________________________
Jurisdiction: ________________________________
Date of review: ______________________________
Date of approval: ____________________________
Approval reference: __________________________
Expiry/review date: __________________________

Signature: ___________________________________
```

---

## 4. Conditions of approval

1. This approval is valid until the expiry/review date listed above
2. Any change to auction terms, bidding model, or contract templates requires re-approval
3. The approval covers only the items checked in section 2
4. The legal partner must be notified of any dispute or legal action within 7 days
5. The approval does NOT cover KYC/KYB provider selection (separate review required)
6. The approval does NOT cover escrow provider selection (separate review required)

---

## 5. Feature flag activation

After this packet is signed:

1. Founder (Tran Ha Tam) reviews the signed packet
2. Founder authorizes feature flag activation in writing
3. DevOps sets `AUCTION_LIVE_ENABLED=true` as a wrangler secret (not env var)
4. DevOps records the activation in `audit_logs` with reference to this approval
5. DevOps verifies all 5 auction API endpoints return non-403 responses
6. DevOps verifies all 3 auction UI screens show live content (not legal-readiness)
7. DevOps notifies Founder of successful activation

**Two-person approval required:** Founder + DevOps must both confirm in writing.

---

## 6. Emergency kill switch

If any legal issue arises after activation:

1. DevOps sets `AUCTION_LIVE_ENABLED=false` (or removes the secret)
2. All auction API endpoints immediately return 403
3. All auction UI screens immediately show legal-readiness message
4. DevOps records the deactivation in `audit_logs`
5. DevOps notifies Founder + legal partner within 24 hours
6. No new auctions can be created until re-approval

---

## 7. Current status

| Item | Status |
|------|--------|
| Legal partner identified | NO |
| Legal partner engaged | NO |
| Packet sent for review | NO |
| Packet reviewed | NO |
| Packet signed | NO |
| Feature flag activated | NO |
| Auction go-live | BLOCKED |

**This document is a template. It must be executed by a licensed legal partner before auction go-live.**
