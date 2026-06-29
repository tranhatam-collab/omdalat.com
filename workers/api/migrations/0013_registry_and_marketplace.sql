-- Migration: 0013_registry_and_marketplace.sql
-- Description: Registry events, marketplace listings, buyer requests, offers, transfer checklists
-- Created: 2026-06-29
-- Depends on: 0011_brand_asset_package.sql, 0012_rights_evidence.sql
-- Per: OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md sections 5-12

-- Registry events — append-only provenance log
-- This is the public record of what happened to a package
CREATE TABLE IF NOT EXISTS registry_events (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  event_type TEXT NOT NULL,        -- package_created, component_added, evidence_submitted, verification_started, verification_passed, verification_failed, label_added, label_revoked, listing_approved, listing_delisted, offer_made, offer_accepted, offer_rejected, transfer_initiated, transfer_completed, transfer_cancelled, package_archived
  public_visible INTEGER NOT NULL DEFAULT 1,  -- 1=visible on registry.omdalat.com, 0=internal only
  actor TEXT NOT NULL,             -- who triggered the event
  description TEXT NOT NULL,
  metadata TEXT,                   -- JSON blob for additional context
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Marketplace listings — curated listings for market.omdalat.com
CREATE TABLE IF NOT EXISTS marketplace_listings (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  listing_type TEXT NOT NULL DEFAULT 'private_teaser',  -- private_teaser, request_access_only, curated_listing
  title_vi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_vi TEXT,
  description_en TEXT,
  asking_price_vnd INTEGER,
  asking_price_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'draft',  -- draft, pending_review, approved, live, paused, closed, rejected
  approved_by TEXT,
  approved_at TEXT,
  feature_flag TEXT NOT NULL DEFAULT 'BRAND_MARKET_ENABLED',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Buyer requests — request-access from market.omdalat.com
CREATE TABLE IF NOT EXISTS buyer_requests (
  id TEXT PRIMARY KEY,
  listing_id TEXT,
  package_id TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_organization TEXT,
  buyer_type TEXT NOT NULL DEFAULT 'individual',  -- individual, company, investor, broker
  qualification_status TEXT NOT NULL DEFAULT 'pending',  -- pending, qualified, rejected
  message TEXT,
  ip_address TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES marketplace_listings(id),
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Offers — private offers on packages
CREATE TABLE IF NOT EXISTS asset_offers (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  listing_id TEXT,
  buyer_request_id TEXT,
  offer_type TEXT NOT NULL DEFAULT 'purchase',  -- purchase, license, partnership, investment
  offer_amount_vnd INTEGER,
  offer_amount_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'submitted',  -- submitted, under_review, accepted, rejected, withdrawn, expired
  terms TEXT,                -- JSON blob with offer terms
  expires_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (listing_id) REFERENCES marketplace_listings(id),
  FOREIGN KEY (buyer_request_id) REFERENCES buyer_requests(id)
);

-- Transfer checklists — workflow for transferring a package
CREATE TABLE IF NOT EXISTS transfer_checklists (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  offer_id TEXT,
  status TEXT NOT NULL DEFAULT 'not_started',  -- not_started, in_progress, completed, cancelled, failed
  -- Domain transfer
  domain_transfer_status TEXT NOT NULL DEFAULT 'pending',
  domain_transfer_notes TEXT,
  -- App transfer
  app_transfer_status TEXT NOT NULL DEFAULT 'pending',
  app_transfer_notes TEXT,
  -- Repository transfer
  repo_transfer_status TEXT NOT NULL DEFAULT 'pending',
  repo_transfer_notes TEXT,
  -- Trademark transfer
  trademark_transfer_status TEXT NOT NULL DEFAULT 'pending',
  trademark_transfer_notes TEXT,
  -- Contract state
  contract_status TEXT NOT NULL DEFAULT 'pending',
  contract_notes TEXT,
  -- Escrow reference (NOT direct custody)
  escrow_provider TEXT,
  escrow_reference TEXT,
  escrow_status TEXT NOT NULL DEFAULT 'pending',
  -- Final recording
  recording_status TEXT NOT NULL DEFAULT 'pending',
  recording_notes TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (offer_id) REFERENCES asset_offers(id)
);

-- Asset audit events — internal audit trail (separate from public registry_events)
CREATE TABLE IF NOT EXISTS asset_audit_events (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor TEXT NOT NULL,
  reason TEXT,
  metadata TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

CREATE INDEX IF NOT EXISTS idx_registry_events_package ON registry_events(package_id);
CREATE INDEX IF NOT EXISTS idx_registry_events_type ON registry_events(event_type);
CREATE INDEX IF NOT EXISTS idx_registry_events_public ON registry_events(public_visible);
CREATE INDEX IF NOT EXISTS idx_registry_events_created ON registry_events(created_at);

CREATE INDEX IF NOT EXISTS idx_listings_package ON marketplace_listings(package_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON marketplace_listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_type ON marketplace_listings(listing_type);

CREATE INDEX IF NOT EXISTS idx_buyer_requests_listing ON buyer_requests(listing_id);
CREATE INDEX IF NOT EXISTS idx_buyer_requests_package ON buyer_requests(package_id);
CREATE INDEX IF NOT EXISTS idx_buyer_requests_status ON buyer_requests(qualification_status);

CREATE INDEX IF NOT EXISTS idx_asset_offers_package ON asset_offers(package_id);
CREATE INDEX IF NOT EXISTS idx_asset_offers_status ON asset_offers(status);

CREATE INDEX IF NOT EXISTS idx_transfer_checklists_package ON transfer_checklists(package_id);
CREATE INDEX IF NOT EXISTS idx_transfer_checklists_status ON transfer_checklists(status);

CREATE INDEX IF NOT EXISTS idx_asset_audit_events_package ON asset_audit_events(package_id);
CREATE INDEX IF NOT EXISTS idx_asset_audit_events_action ON asset_audit_events(action);
