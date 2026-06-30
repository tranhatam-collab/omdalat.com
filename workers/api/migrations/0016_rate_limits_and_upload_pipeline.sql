-- Migration: 0016_rate_limits_and_upload_pipeline.sql
-- Description: Rate limiting counters and upload quarantine pipeline
-- Created: 2026-06-30
-- Depends on: 0015_remaining_data_model.sql

-- Rate limiting counters (application-level, per-endpoint class)
CREATE TABLE IF NOT EXISTS rate_limit_counters (
  key TEXT NOT NULL,
  window_start TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (key, window_start)
);

-- Index for quick cleanup of old windows
CREATE INDEX IF NOT EXISTS idx_rate_limit_window_start ON rate_limit_counters(window_start);

-- Upload quarantine pipeline
-- Every file goes through: pending_scan -> clean -> approved_storage
-- or pending_scan -> infected -> rejected
CREATE TABLE IF NOT EXISTS upload_quarantine (
  id TEXT PRIMARY KEY,
  uploader_email TEXT NOT NULL,
  owner_identity_id TEXT,
  target_type TEXT NOT NULL,  -- evidence, kyc, data_room, brand_asset
  target_id TEXT,             -- package_id, case_id, data_room_id, etc.
  original_name TEXT NOT NULL,
  storage_key TEXT NOT NULL,  -- R2 key (e.g., "quarantine/{id}/{safe_name}")
  size_bytes INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  sha256_hash TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending_scan',  -- pending_scan, scanning, clean, infected, expired, rejected
  scan_provider TEXT,
  scan_result TEXT,
  scan_score REAL,
  scan_started_at TEXT,
  scan_completed_at TEXT,
  metadata_json TEXT,         -- EXIF stripped, dimensions, etc.
  expires_at TEXT NOT NULL,   -- quarantine TTL (e.g., 7 days if not approved)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_upload_quarantine_uploader ON upload_quarantine(uploader_email);
CREATE INDEX IF NOT EXISTS idx_upload_quarantine_status ON upload_quarantine(status);
CREATE INDEX IF NOT EXISTS idx_upload_quarantine_target ON upload_quarantine(target_type, target_id);

-- Audit trail for file access and scan actions
CREATE TABLE IF NOT EXISTS upload_audit_events (
  id TEXT PRIMARY KEY,
  upload_id TEXT NOT NULL,
  action TEXT NOT NULL,       -- uploaded, scan_started, scan_completed, approved, rejected, accessed
  actor TEXT NOT NULL,
  reason TEXT,
  metadata_json TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (upload_id) REFERENCES upload_quarantine(id)
);

CREATE INDEX IF NOT EXISTS idx_upload_audit_upload_id ON upload_audit_events(upload_id);

-- Add upload_id reference to evidence so handlers can link to the pipeline
-- D1 SQLite does not support IF NOT EXISTS on ALTER TABLE ADD COLUMN.
-- This migration is idempotent because it runs only once.
ALTER TABLE rights_evidence ADD COLUMN upload_id TEXT;
