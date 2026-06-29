-- Migration: 0012_rights_evidence.sql
-- Description: Rights evidence model — evidence for asset component claims
-- Created: 2026-06-29
-- Depends on: 0011_brand_asset_package.sql
-- Per: OMDALAT_BRAND_ASSET_NETWORK_EXECUTION_LOCK_2026.md section 4.1

-- Evidence must be submitted per component before any "verified" label.
-- No global "Verified" badge is allowed.

CREATE TABLE IF NOT EXISTS rights_evidence (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  component_id TEXT,               -- optional: if evidence is for a specific component
  evidence_type TEXT NOT NULL,     -- trademark_filing, trademark_registration, copyright, design_right, domain_registrar_record, code_audit, revenue_record, contract, consent_form, identity_document, business_license, other
  reference_number TEXT,           -- official document number if applicable
  issuing_authority TEXT,          -- who issued it
  issue_date TEXT,
  expiry_date TEXT,
  jurisdiction TEXT,               -- VN, US, EU, etc.
  description TEXT NOT NULL,       -- what this evidence proves
  file_url TEXT,                   -- R2 URL for uploaded document
  file_hash TEXT,                  -- SHA-256 hash for integrity
  upload_status TEXT NOT NULL DEFAULT 'pending',  -- pending, uploaded, verified, rejected
  verified_by TEXT,                -- admin who verified
  verified_at TEXT,
  verification_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id),
  FOREIGN KEY (component_id) REFERENCES asset_components(id)
);

-- Verification cases — workflow for reviewing a package
CREATE TABLE IF NOT EXISTS verification_cases (
  id TEXT PRIMARY KEY,
  package_id TEXT NOT NULL,
  case_type TEXT NOT NULL,         -- identity_verification, rights_review, transfer_readiness, listing_approval
  status TEXT NOT NULL DEFAULT 'open',  -- open, in_progress, pending_external, approved, rejected, withdrawn
  assigned_to TEXT,                -- admin ID
  priority TEXT NOT NULL DEFAULT 'normal',  -- low, normal, high, urgent
  submitted_by TEXT NOT NULL,
  submitted_at TEXT NOT NULL,
  reviewed_by TEXT,
  reviewed_at TEXT,
  review_notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (package_id) REFERENCES asset_packages(id)
);

-- Verification tasks — individual checks within a case
CREATE TABLE IF NOT EXISTS verification_tasks (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  task_type TEXT NOT NULL,         -- identity_check, trademark_search, domain_whois, code_scan, revenue_audit, contract_review, consent_verification
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',  -- pending, in_progress, passed, failed, skipped
  evidence_id TEXT,                -- link to rights_evidence if applicable
  result_notes TEXT,
  completed_by TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (case_id) REFERENCES verification_cases(id),
  FOREIGN KEY (evidence_id) REFERENCES rights_evidence(id)
);

CREATE INDEX IF NOT EXISTS idx_rights_evidence_package ON rights_evidence(package_id);
CREATE INDEX IF NOT EXISTS idx_rights_evidence_component ON rights_evidence(component_id);
CREATE INDEX IF NOT EXISTS idx_rights_evidence_type ON rights_evidence(evidence_type);
CREATE INDEX IF NOT EXISTS idx_rights_evidence_upload_status ON rights_evidence(upload_status);

CREATE INDEX IF NOT EXISTS idx_verification_cases_package ON verification_cases(package_id);
CREATE INDEX IF NOT EXISTS idx_verification_cases_status ON verification_cases(status);
CREATE INDEX IF NOT EXISTS idx_verification_cases_type ON verification_cases(case_type);

CREATE INDEX IF NOT EXISTS idx_verification_tasks_case ON verification_tasks(case_id);
CREATE INDEX IF NOT EXISTS idx_verification_tasks_status ON verification_tasks(status);
CREATE INDEX IF NOT EXISTS idx_verification_tasks_type ON verification_tasks(task_type);
