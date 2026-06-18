-- Migration: 0008_brand_admins.sql
-- Description: Brand admin authentication and session tables
-- Created: 2026-06-18
-- Depends on: 0003_brand_content.sql

-- Brand admin accounts (one per brand, or super admin for Om Dalat team)
CREATE TABLE IF NOT EXISTS brand_admins (
  id TEXT PRIMARY KEY,
  brand_id TEXT,                       -- NULL for super admins (Om Dalat team)
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'editor', -- owner, manager, editor, super
  is_active BOOLEAN NOT NULL DEFAULT 1,
  last_login TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Admin sessions (brand-scoped, subdomain-scoped cookies)
CREATE TABLE IF NOT EXISTS admin_sessions (
  id TEXT PRIMARY KEY,
  admin_id TEXT NOT NULL,
  brand_id TEXT,                       -- NULL for super admin sessions
  token TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES brand_admins(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_brand_admins_brand ON brand_admins(brand_id);
CREATE INDEX IF NOT EXISTS idx_brand_admins_email ON brand_admins(email);
CREATE INDEX IF NOT EXISTS idx_brand_admins_role ON brand_admins(role);
CREATE INDEX IF NOT EXISTS idx_brand_admins_active ON brand_admins(is_active);

CREATE INDEX IF NOT EXISTS idx_admin_sessions_token ON admin_sessions(token);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin ON admin_sessions(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_brand ON admin_sessions(brand_id);
CREATE INDEX IF NOT EXISTS idx_admin_sessions_expires ON admin_sessions(expires_at);

-- Add admin_id reference to brands table (primary admin for the brand)
-- Skip if already exists (idempotent)
-- ALTER TABLE brands ADD COLUMN admin_id TEXT;
-- ALTER TABLE brands ADD COLUMN admin_enabled BOOLEAN DEFAULT 0;
