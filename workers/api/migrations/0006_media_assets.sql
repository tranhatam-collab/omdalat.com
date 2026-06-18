-- Media assets table for storing images, videos, and other media
-- Part of Brand Factory system for managing brand content

CREATE TABLE IF NOT EXISTS media_assets (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK(asset_type IN ('image', 'video', 'document', 'audio')),
  file_url TEXT NOT NULL,
  alt_text_vi TEXT,
  alt_text_en TEXT,
  rights_status TEXT NOT NULL DEFAULT 'pending' CHECK(rights_status IN ('pending', 'approved', 'rejected')),
  consent_obtained INTEGER NOT NULL DEFAULT 0,
  shot_type TEXT CHECK(shot_type IN ('hero', 'stay', 'living', 'work', 'location', 'food', 'activity', 'other')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected')),
  metadata TEXT, -- JSON for additional metadata
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

-- Index for brand lookups
CREATE INDEX IF NOT EXISTS idx_media_assets_brand_id ON media_assets(brand_id);
CREATE INDEX IF NOT EXISTS idx_media_assets_status ON media_assets(status);
CREATE INDEX IF NOT EXISTS idx_media_assets_type ON media_assets(asset_type);
