-- Migration: 0003_brand_content.sql
-- Description: Brand content blocks (bilingual content for brand microsites)
-- Created: 2026-06-17
-- Depends on: 0002_brand_factory.sql

CREATE TABLE IF NOT EXISTS content_blocks (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  locale TEXT NOT NULL,
  block_type TEXT NOT NULL,
  payload TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  translation_status TEXT NOT NULL DEFAULT 'in_progress',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  name_vi TEXT NOT NULL,
  name_en TEXT,
  season TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  title_vi TEXT NOT NULL,
  title_en TEXT,
  capacity INTEGER,
  duration TEXT,
  safety_notes TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Indices (separate statements — no inline INDEX in SQLite)
CREATE INDEX IF NOT EXISTS idx_content_blocks_brand ON content_blocks(brand_id);
CREATE INDEX IF NOT EXISTS idx_content_blocks_locale ON content_blocks(locale);
CREATE INDEX IF NOT EXISTS idx_content_blocks_type ON content_blocks(block_type);
CREATE INDEX IF NOT EXISTS idx_content_blocks_status ON content_blocks(status);
CREATE INDEX IF NOT EXISTS idx_content_blocks_translation ON content_blocks(translation_status);
CREATE INDEX IF NOT EXISTS idx_content_blocks_brand_locale_type ON content_blocks(brand_id, locale, block_type);

CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_season ON products(season) WHERE season IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_experiences_brand ON experiences(brand_id);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON experiences(status);
CREATE INDEX IF NOT EXISTS idx_experiences_capacity ON experiences(capacity) WHERE capacity IS NOT NULL;
