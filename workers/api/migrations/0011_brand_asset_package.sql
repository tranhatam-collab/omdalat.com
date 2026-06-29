-- Migration: 0011_brand_asset_package.sql
-- Description: Brand Asset Package schema — core entity for Brand Asset Network
-- Created: 2026-06-29
-- Depends on: 0002_brand_factory.sql
-- Per: OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md section 4

-- A Brand Asset Package is NOT just a name/logo/domain.
-- It is a bundle of identity, legal, domain, web, media, operating, and goodwill assets
-- with per-component verification status.

CREATE TABLE IF NOT EXISTS asset_packages (
  id TEXT PRIMARY KEY,
  brand_id TEXT,                    -- optional link to existing brands table
  seller_id TEXT,                   -- owner who is offering this package
  public_id TEXT NOT NULL UNIQUE,   -- public-facing ID for registry (e.g., BAP-2026-0001)
  slug TEXT NOT NULL UNIQUE,        -- URL slug for marketplace
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  summary_vi TEXT,
  summary_en TEXT,
  asset_level INTEGER NOT NULL DEFAULT 0,  -- 0=Idea, 1=Seed, 2=Ready-to-Launch, 3=Operating, 4=Transferable
  listing_status TEXT NOT NULL DEFAULT 'draft',  -- draft, submitted, under_review, approved, rejected, listed, delisted, archived
  publication_status TEXT NOT NULL DEFAULT 'private_preview',  -- private_preview, published, archived
  market_status TEXT NOT NULL DEFAULT 'not_for_sale',  -- not_for_sale, request_access_only, private_tease, open_listing
  asking_price_vnd INTEGER,
  asking_price_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  transfer_ready INTEGER NOT NULL DEFAULT 0,  -- 0=no, 1=yes (all gates passed)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Asset components — each component class within a package
CREATE TABLE IF NOT EXISTS asset_components (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  component_class TEXT NOT NULL,    -- identity, legal, domain, web_software, media, operating, goodwill
  component_name TEXT NOT NULL,     -- e.g., "Logo", "Trademark VN 4-12345", "omdalat.com domain"
  description TEXT,
  status TEXT NOT NULL DEFAULT 'declared',  -- declared, evidence_submitted, under_review, reviewed_with_limits, verified_control, verified_rights, transferable, restricted, not_transferable, disputed, expired
  transferable INTEGER NOT NULL DEFAULT 0,
  restrictions TEXT,                -- description of any transfer restrictions
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Trust labels — per-component, NOT a global "Verified" badge
CREATE TABLE IF NOT EXISTS asset_trust_labels (
  id TEXT PRIMARY KEY,
  component_id TEXT NOT NULL,
  label TEXT NOT NULL,              -- identity_verified, rights_evidence_reviewed, trademark_registered, trademark_pending, domain_control_verified, code_audit_completed, revenue_verified, data_transfer_restricted, local_origin_verified, legal_review_required, disputed
  evidence_id TEXT,                 -- link to rights_evidence table
  verified_by TEXT,
  verified_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

CREATE INDEX IF NOT EXISTS idx_asset_packages_brand ON asset_packages(brand_id);
CREATE INDEX IF NOT EXISTS idx_asset_packages_seller ON asset_packages(seller_id);
CREATE INDEX IF NOT EXISTS idx_asset_packages_public_id ON asset_packages(public_id);
CREATE INDEX IF NOT EXISTS idx_asset_packages_slug ON asset_packages(slug);
CREATE INDEX IF NOT EXISTS idx_asset_packages_level ON asset_packages(asset_level);
CREATE INDEX IF NOT EXISTS idx_asset_packages_listing_status ON asset_packages(listing_status);
CREATE INDEX IF NOT EXISTS idx_asset_packages_market_status ON asset_packages(market_status);

CREATE INDEX IF NOT EXISTS idx_asset_components_package ON asset_components(package_id);
CREATE INDEX IF NOT EXISTS idx_asset_components_class ON asset_components(component_class);
CREATE INDEX IF NOT EXISTS idx_asset_components_status ON asset_components(status);

CREATE INDEX IF NOT EXISTS idx_asset_trust_labels_component ON asset_trust_labels(component_id);
CREATE INDEX IF NOT EXISTS idx_asset_trust_labels_label ON asset_trust_labels(label);
