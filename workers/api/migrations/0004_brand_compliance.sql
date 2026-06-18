-- Migration: 0004_brand_compliance.sql
-- Description: Compliance checklists for brands (lodging, food safety, tourism, etc.)
-- Created: 2026-06-17
-- Depends on: 0002_brand_factory.sql

CREATE TABLE IF NOT EXISTS compliance_checklists (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL UNIQUE,
  business_registration TEXT NOT NULL DEFAULT 'unknown',
  lodging_compliance TEXT NOT NULL DEFAULT 'unknown',
  food_safety TEXT NOT NULL DEFAULT 'unknown',
  pccc TEXT NOT NULL DEFAULT 'unknown',
  tourism_service TEXT NOT NULL DEFAULT 'unknown',
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Compliance status values: 'not_applicable', 'unknown', 'pending', 'verified'

-- Indices (separate statements — no inline INDEX in SQLite)
CREATE INDEX IF NOT EXISTS idx_compliance_brand ON compliance_checklists(brand_id);
CREATE INDEX IF NOT EXISTS idx_compliance_business_reg ON compliance_checklists(business_registration);
CREATE INDEX IF NOT EXISTS idx_compliance_lodging ON compliance_checklists(lodging_compliance);
CREATE INDEX IF NOT EXISTS idx_compliance_food_safety ON compliance_checklists(food_safety);
CREATE INDEX IF NOT EXISTS idx_compliance_pccc ON compliance_checklists(pccc);
CREATE INDEX IF NOT EXISTS idx_compliance_tourism ON compliance_checklists(tourism_service);
