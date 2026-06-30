-- Migration: 0017_auth_baseline.sql
-- Description: AUTH_BASELINE hardening — password hashing, login lockout, session rotation, CSRF
-- Created: 2026-06-30
-- Depends on: 0016_rate_limits_and_upload_pipeline.sql

-- Harden brand_admins table
ALTER TABLE brand_admins ADD COLUMN failed_login_attempts INTEGER NOT NULL DEFAULT 0;
ALTER TABLE brand_admins ADD COLUMN locked_until TEXT;                                -- ISO timestamp; NULL = not locked
ALTER TABLE brand_admins ADD COLUMN mfa_secret TEXT;                                  -- TOTP secret (encrypted at rest)
ALTER TABLE brand_admins ADD COLUMN mfa_enabled BOOLEAN NOT NULL DEFAULT 0;
ALTER TABLE brand_admins ADD COLUMN password_updated_at TEXT;                         -- ISO timestamp

-- Harden admin_sessions table with binding + rotation metadata
ALTER TABLE admin_sessions ADD COLUMN fingerprint_hash TEXT;                          -- hash of IP + UA + subdomain
ALTER TABLE admin_sessions ADD COLUMN rotated_from TEXT;                              -- previous token after rotation
ALTER TABLE admin_sessions ADD COLUMN csrf_token TEXT;                                -- per-session CSRF token
ALTER TABLE admin_sessions ADD COLUMN ip_address TEXT;
ALTER TABLE admin_sessions ADD COLUMN user_agent TEXT;

-- Login attempt audit log (rate-limit + lockout evidence)
CREATE TABLE IF NOT EXISTS login_attempts (
  id TEXT PRIMARY KEY,
  email TEXT,
  admin_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  success BOOLEAN NOT NULL,
  failure_reason TEXT,                                                                  -- invalid_password | locked | missing_admin | mfa | inactive
  created_at TEXT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES brand_admins(id)
);

CREATE INDEX IF NOT EXISTS idx_login_attempts_email ON login_attempts(email);
CREATE INDEX IF NOT EXISTS idx_login_attempts_admin ON login_attempts(admin_id);
CREATE INDEX IF NOT EXISTS idx_login_attempts_created ON login_attempts(created_at);

-- Session rotation audit log
CREATE TABLE IF NOT EXISTS session_rotations (
  id TEXT PRIMARY KEY,
  old_token TEXT NOT NULL,
  new_token TEXT NOT NULL,
  admin_id TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES brand_admins(id)
);

CREATE INDEX IF NOT EXISTS idx_session_rotations_old_token ON session_rotations(old_token);
CREATE INDEX IF NOT EXISTS idx_session_rotations_admin ON session_rotations(admin_id);
