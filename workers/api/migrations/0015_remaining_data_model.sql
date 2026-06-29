-- Migration: 0015_remaining_data_model.sql
-- Description: Remaining tables from section 10 data model
-- Created: 2026-06-29
-- Depends on: 0014_data_rooms_and_extended.sql

-- Organizations (for beneficial owner chain)
CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  legal_entity_id TEXT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,  -- company, cooperative, partnership
  registration_number TEXT,
  jurisdiction TEXT,
  parent_organization_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (legal_entity_id) REFERENCES legal_entities(id)
);

-- Beneficial owners
CREATE TABLE IF NOT EXISTS beneficial_owners (
  id TEXT PRIMARY KEY,
  organization_id TEXT NOT NULL,
  person_id TEXT NOT NULL,
  ownership_percentage REAL,
  role TEXT,
  verified INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (person_id) REFERENCES people(id)
);

-- Repositories (code assets)
CREATE TABLE IF NOT EXISTS repositories (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  platform TEXT NOT NULL,  -- github, gitlab, bitbucket
  repo_url TEXT NOT NULL,
  repo_name TEXT,
  default_branch TEXT,
  license TEXT,
  transfer_status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Websites
CREATE TABLE IF NOT EXISTS websites (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  url TEXT NOT NULL,
  platform TEXT,  -- nextjs, wordpress, custom, shopify
  hosting_provider TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Mobile apps
CREATE TABLE IF NOT EXISTS mobile_apps (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  app_name TEXT NOT NULL,
  platform TEXT NOT NULL,  -- ios, android
  store_url TEXT,
  bundle_id TEXT,
  transfer_status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Content assets (media library)
CREATE TABLE IF NOT EXISTS content_assets (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  asset_type TEXT NOT NULL,  -- image, video, audio, document, logo
  title TEXT NOT NULL,
  file_url TEXT,
  file_hash TEXT,
  license TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Contracts
CREATE TABLE IF NOT EXISTS contracts (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  contract_type TEXT NOT NULL,  -- sale, license, partnership, nda, escrow
  counterparty TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',  -- draft, signed, executed, terminated, expired
  effective_date TEXT,
  expiry_date TEXT,
  file_url TEXT,
  file_hash TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Datasets
CREATE TABLE IF NOT EXISTS datasets (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  name TEXT NOT NULL,
  description TEXT,
  record_count INTEGER,
  format TEXT,
  license TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Ownership claims
CREATE TABLE IF NOT EXISTS ownership_claims (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  claim_type TEXT NOT NULL,  -- full, partial, license_only
  claimant TEXT NOT NULL,
  percentage REAL,
  evidence_id TEXT,
  status TEXT NOT NULL DEFAULT 'claimed',  -- claimed, verified, disputed, withdrawn
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (evidence_id) REFERENCES rights_evidence(id)
);

-- Valuation inputs
CREATE TABLE IF NOT EXISTS valuation_inputs (
  id TEXT PRIMARY KEY,
  valuation_id TEXT NOT NULL,
  input_type TEXT NOT NULL,  -- revenue, traffic, brand_recognition, comparable, cost_basis
  input_value TEXT,
  weight REAL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (valuation_id) REFERENCES valuations(id)
);

-- Comparable transactions
CREATE TABLE IF NOT EXISTS comparable_transactions (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  comparable_package_name TEXT NOT NULL,
  transaction_type TEXT,  -- sale, license, partnership
  transaction_amount_vnd INTEGER,
  transaction_amount_usd INTEGER,
  transaction_date TEXT,
  source TEXT,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Listing versions (audit trail for listing edits)
CREATE TABLE IF NOT EXISTS listing_versions (
  id TEXT PRIMARY KEY,
  listing_id TEXT NOT NULL,
  version_number INTEGER NOT NULL,
  snapshot TEXT NOT NULL,  -- JSON blob of listing state
  edited_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES marketplace_listings(id)
);

-- Offer events (audit trail for offer state changes)
CREATE TABLE IF NOT EXISTS offer_events (
  id TEXT PRIMARY KEY,
  offer_id TEXT NOT NULL,
  event_type TEXT NOT NULL,  -- submitted, reviewed, accepted, rejected, withdrawn, expired
  actor TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (offer_id) REFERENCES asset_offers(id)
);

-- Auctions (gated behind P3 legal signoff)
CREATE TABLE IF NOT EXISTS auctions (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  auction_type TEXT NOT NULL,  -- english, sealed, dutch
  start_date TEXT,
  end_date TEXT,
  reserve_price_vnd INTEGER,
  reserve_price_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'draft',  -- draft, scheduled, live, ended, cancelled
  feature_flag TEXT NOT NULL DEFAULT 'AUCTION_LIVE_ENABLED',
  legal_signoff_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Bids
CREATE TABLE IF NOT EXISTS bids (
  id TEXT PRIMARY KEY,
  auction_id TEXT NOT NULL,
  bidder_id TEXT NOT NULL,
  amount_vnd INTEGER,
  amount_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'submitted',  -- submitted, accepted, rejected, winning, lost
  created_at TEXT NOT NULL,
  FOREIGN KEY (auction_id) REFERENCES auctions(id)
);

-- Bid events (immutable log)
CREATE TABLE IF NOT EXISTS bid_events (
  id TEXT PRIMARY KEY,
  auction_id TEXT NOT NULL,
  bid_id TEXT,
  event_type TEXT NOT NULL,  -- bid_placed, bid_accepted, bid_rejected, auction_started, auction_ended, winner_declared
  actor TEXT NOT NULL,
  metadata TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (auction_id) REFERENCES auctions(id),
  FOREIGN KEY (bid_id) REFERENCES bids(id)
);

-- Payment references (NOT direct custody — references to external providers)
CREATE TABLE IF NOT EXISTS payment_references (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  transfer_id TEXT,
  offer_id TEXT,
  provider TEXT NOT NULL,  -- payos, stripe, escrow.com
  provider_reference TEXT,
  amount_vnd INTEGER,
  amount_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, completed, failed, refunded
  paid_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (transfer_id) REFERENCES transfer_checklists(id),
  FOREIGN KEY (offer_id) REFERENCES asset_offers(id)
);

-- Transfer plans
CREATE TABLE IF NOT EXISTS transfer_plans (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  transfer_id TEXT,
  plan_type TEXT NOT NULL,  -- full_assignment, license_transfer, asset_split
  steps TEXT NOT NULL DEFAULT '[]',  -- JSON array of planned steps
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (transfer_id) REFERENCES transfer_checklists(id)
);

-- Transfer tasks (individual tasks within a transfer plan)
CREATE TABLE IF NOT EXISTS transfer_tasks (
  id TEXT PRIMARY KEY,
  transfer_plan_id TEXT NOT NULL,
  task_type TEXT NOT NULL,
  description TEXT NOT NULL,
  assigned_to TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (transfer_plan_id) REFERENCES transfer_plans(id)
);

-- Inspections (due diligence checks)
CREATE TABLE IF NOT EXISTS inspections (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  inspection_type TEXT NOT NULL,  -- code_audit, financial_audit, legal_review, technical_audit
  inspector TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',  -- scheduled, in_progress, passed, failed, waived
  findings TEXT,
  report_url TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Settlements (final settlement record)
CREATE TABLE IF NOT EXISTS settlements (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  transfer_id TEXT,
  settlement_type TEXT NOT NULL,  -- full_payment, partial_payment, license_fee, royalty
  amount_vnd INTEGER,
  amount_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, completed, failed
  settled_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (transfer_id) REFERENCES transfer_checklists(id)
);

-- Local brand partnerships
CREATE TABLE IF NOT EXISTS local_brand_partnerships (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  partner_name TEXT NOT NULL,
  partnership_type TEXT NOT NULL,  -- content, distribution, co_branding, referral
  consent_status TEXT NOT NULL DEFAULT 'pending',
  consent_recorded_at TEXT,
  consent_fields TEXT,  -- JSON blob of 13 consent items
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Token anchors (optional NFT layer — pointer only, NOT legal title)
CREATE TABLE IF NOT EXISTS token_anchors (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  credential_id TEXT,
  chain TEXT,  -- ethereum, polygon, etc.
  token_standard TEXT,  -- ERC-721, ERC-1155
  contract_address TEXT,
  token_id TEXT,
  metadata_uri TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, minted, transferred, burned
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (credential_id) REFERENCES credentials(id)
);

CREATE INDEX IF NOT EXISTS idx_organizations_entity ON organizations(legal_entity_id);
CREATE INDEX IF NOT EXISTS idx_beneficial_owners_org ON beneficial_owners(organization_id);
CREATE INDEX IF NOT EXISTS idx_beneficial_owners_person ON beneficial_owners(person_id);
CREATE INDEX IF NOT EXISTS idx_repositories_package ON repositories(package_id);
CREATE INDEX IF NOT EXISTS idx_websites_package ON websites(package_id);
CREATE INDEX IF NOT EXISTS idx_mobile_apps_package ON mobile_apps(package_id);
CREATE INDEX IF NOT EXISTS idx_content_assets_package ON content_assets(package_id);
CREATE INDEX IF NOT EXISTS idx_contracts_package ON contracts(package_id);
CREATE INDEX IF NOT EXISTS idx_contracts_status ON contracts(status);
CREATE INDEX IF NOT EXISTS idx_datasets_package ON datasets(package_id);
CREATE INDEX IF NOT EXISTS idx_ownership_claims_package ON ownership_claims(package_id);
CREATE INDEX IF NOT EXISTS idx_ownership_claims_status ON ownership_claims(status);
CREATE INDEX IF NOT EXISTS idx_valuation_inputs_valuation ON valuation_inputs(valuation_id);
CREATE INDEX IF NOT EXISTS idx_comparable_transactions_package ON comparable_transactions(package_id);
CREATE INDEX IF NOT EXISTS idx_listing_versions_listing ON listing_versions(listing_id);
CREATE INDEX IF NOT EXISTS idx_offer_events_offer ON offer_events(offer_id);
CREATE INDEX IF NOT EXISTS idx_auctions_package ON auctions(package_id);
CREATE INDEX IF NOT EXISTS idx_auctions_status ON auctions(status);
CREATE INDEX IF NOT EXISTS idx_bids_auction ON bids(auction_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_bid_events_auction ON bid_events(auction_id);
CREATE INDEX IF NOT EXISTS idx_payment_references_package ON payment_references(package_id);
CREATE INDEX IF NOT EXISTS idx_transfer_plans_package ON transfer_plans(package_id);
CREATE INDEX IF NOT EXISTS idx_transfer_tasks_plan ON transfer_tasks(transfer_plan_id);
CREATE INDEX IF NOT EXISTS idx_inspections_package ON inspections(package_id);
CREATE INDEX IF NOT EXISTS idx_settlements_package ON settlements(package_id);
CREATE INDEX IF NOT EXISTS idx_local_partnerships_package ON local_brand_partnerships(package_id);
CREATE INDEX IF NOT EXISTS idx_token_anchors_package ON token_anchors(package_id);
CREATE INDEX IF NOT EXISTS idx_token_anchors_status ON token_anchors(status);
