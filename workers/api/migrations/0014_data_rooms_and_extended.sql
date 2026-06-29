-- Migration: 0014_data_rooms_and_extended.sql
-- Description: Data rooms, access grants, and extended tables for P1 completion
-- Created: 2026-06-29
-- Depends on: 0013_registry_and_marketplace.sql

-- Data rooms — secure file manifest for qualified buyers
CREATE TABLE IF NOT EXISTS data_rooms (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  manifest TEXT NOT NULL DEFAULT '[]',  -- JSON array of file descriptors
  status TEXT NOT NULL DEFAULT 'active',  -- active, closed, archived
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Data room access grants — who can see what
CREATE TABLE IF NOT EXISTS data_room_access_grants (
  id TEXT PRIMARY KEY,
  data_room_id TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, granted, rejected, expired, revoked
  expires_at TEXT,
  granted_by TEXT,
  granted_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (data_room_id) REFERENCES data_rooms(id)
);

-- License models — for P2 licensing
CREATE TABLE IF NOT EXISTS license_models (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  license_type TEXT NOT NULL,  -- exclusive, non_exclusive, lease_to_own, jv_revenue_share, franchise
  scope TEXT,                  -- geographic, field of use, duration
  start_date TEXT,
  end_date TEXT,
  terms TEXT,                  -- JSON blob
  status TEXT NOT NULL DEFAULT 'draft',  -- draft, active, expired, terminated
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Royalty schedules
CREATE TABLE IF NOT EXISTS royalty_schedules (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  license_id TEXT,
  schedule_type TEXT NOT NULL,  -- fixed, percentage, tiered, milestone
  amount_vnd INTEGER,
  percentage REAL,
  frequency TEXT,              -- one_time, monthly, quarterly, annual
  next_payment_date TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (license_id) REFERENCES license_models(id)
);

-- Royalty events — payment records
CREATE TABLE IF NOT EXISTS royalty_events (
  id TEXT PRIMARY KEY,
  royalty_schedule_id TEXT NOT NULL,
  amount_vnd INTEGER,
  amount_usd INTEGER,
  due_date TEXT,
  paid_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, paid, overdue, cancelled
  reference TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (royalty_schedule_id) REFERENCES royalty_schedules(id)
);

-- Escrow provider references — NO direct custody
CREATE TABLE IF NOT EXISTS escrow_references (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  transfer_id TEXT,
  provider_name TEXT NOT NULL,  -- e.g., "Escrow.com", "Payoneer Escrow"
  provider_reference TEXT,      -- reference number from provider
  provider_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, initiated, funded, released, cancelled, disputed
  amount_vnd INTEGER,
  amount_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (transfer_id) REFERENCES transfer_checklists(id)
);

-- Legal entities — for ownership chain
CREATE TABLE IF NOT EXISTS legal_entities (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  entity_type TEXT NOT NULL,  -- individual, company, partnership, cooperative
  name TEXT NOT NULL,
  registration_number TEXT,
  jurisdiction TEXT,
  address TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- People — individuals linked to packages
CREATE TABLE IF NOT EXISTS people (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  legal_entity_id TEXT,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL,  -- owner, beneficiary, director, partner, representative
  email TEXT,
  phone TEXT,
  kyc_status TEXT NOT NULL DEFAULT 'pending',  -- pending, verified, rejected
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (legal_entity_id) REFERENCES legal_entities(id)
);

-- KYC cases
CREATE TABLE IF NOT EXISTS kyc_cases (
  id TEXT PRIMARY KEY,
  person_id TEXT NOT NULL,
  case_type TEXT NOT NULL,  -- identity, kyb, beneficial_owner
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, in_review, cleared, rejected
  provider TEXT,             -- third-party KYC provider name
  provider_reference TEXT,
  submitted_at TEXT NOT NULL,
  cleared_at TEXT,
  rejected_reason TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (person_id) REFERENCES people(id)
);

-- Trademarks
CREATE TABLE IF NOT EXISTS trademarks (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  mark_name TEXT NOT NULL,
  registration_number TEXT,
  jurisdiction TEXT,
  filing_date TEXT,
  registration_date TEXT,
  expiry_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending_filing',  -- pending_filing, filed, registered, opposed, transferred
  classes TEXT,              -- nice classification
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Domains
CREATE TABLE IF NOT EXISTS domain_records (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  component_id TEXT,
  domain_name TEXT NOT NULL,
  registrar TEXT,
  registration_date TEXT,
  expiry_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, verified_control, transferred
  nameservers TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Valuations
CREATE TABLE IF NOT EXISTS valuations (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  valuator TEXT NOT NULL,    -- who performed valuation
  valuation_method TEXT NOT NULL,  -- cost, market, income, hybrid
  valuation_vnd INTEGER,
  valuation_usd INTEGER,
  currency TEXT NOT NULL DEFAULT 'VND',
  effective_date TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  package_id TEXT,
  recipient TEXT NOT NULL,    -- email or user id
  notification_type TEXT NOT NULL,
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, sent, failed
  sent_at TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Disputes
CREATE TABLE IF NOT EXISTS disputes (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  component_id TEXT,
  dispute_type TEXT NOT NULL,  -- ownership, trademark, domain, contract, other
  filed_by TEXT NOT NULL,
  filed_against TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',  -- open, in_mediation, resolved, closed, withdrawn
  resolution TEXT,
  resolved_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Credentials — pointer to registry, NOT legal title
CREATE TABLE IF NOT EXISTS credentials (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  credential_type TEXT NOT NULL,  -- origin, component_status, transfer_record
  credential_url TEXT,            -- public URL
  token_anchor TEXT,              -- optional NFT/token reference
  issued_at TEXT NOT NULL,
  revoked_at TEXT,
  status TEXT NOT NULL DEFAULT 'active',  -- active, revoked, expired
  created_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

CREATE INDEX IF NOT EXISTS idx_data_rooms_package ON data_rooms(package_id);
CREATE INDEX IF NOT EXISTS idx_data_room_grants_room ON data_room_access_grants(data_room_id);
CREATE INDEX IF NOT EXISTS idx_data_room_grants_email ON data_room_access_grants(buyer_email);
CREATE INDEX IF NOT EXISTS idx_data_room_grants_status ON data_room_access_grants(status);

CREATE INDEX IF NOT EXISTS idx_license_models_package ON license_models(package_id);
CREATE INDEX IF NOT EXISTS idx_royalty_schedules_package ON royalty_schedules(package_id);
CREATE INDEX IF NOT EXISTS idx_royalty_events_schedule ON royalty_events(royalty_schedule_id);

CREATE INDEX IF NOT EXISTS idx_escrow_refs_package ON escrow_references(package_id);
CREATE INDEX IF NOT EXISTS idx_escrow_refs_transfer ON escrow_references(transfer_id);

CREATE INDEX IF NOT EXISTS idx_legal_entities_package ON legal_entities(package_id);
CREATE INDEX IF NOT EXISTS idx_people_package ON people(package_id);
CREATE INDEX IF NOT EXISTS idx_people_kyc ON people(kyc_status);
CREATE INDEX IF NOT EXISTS idx_kyc_cases_person ON kyc_cases(person_id);

CREATE INDEX IF NOT EXISTS idx_trademarks_package ON trademarks(package_id);
CREATE INDEX IF NOT EXISTS idx_trademarks_status ON trademarks(status);

CREATE INDEX IF NOT EXISTS idx_domain_records_package ON domain_records(package_id);
CREATE INDEX IF NOT EXISTS idx_domain_records_status ON domain_records(status);

CREATE INDEX IF NOT EXISTS idx_valuations_package ON valuations(package_id);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON notifications(recipient);
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);

CREATE INDEX IF NOT EXISTS idx_disputes_package ON disputes(package_id);
CREATE INDEX IF NOT EXISTS idx_disputes_status ON disputes(status);

CREATE INDEX IF NOT EXISTS idx_credentials_package ON credentials(package_id);
CREATE INDEX IF NOT EXISTS idx_credentials_status ON credentials(status);
