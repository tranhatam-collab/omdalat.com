-- Business lines table for multi-line brands like Lily
-- Part of Brand Factory system for managing diverse business operations

CREATE TABLE IF NOT EXISTS business_lines (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  line_key TEXT NOT NULL,
  label_vi TEXT NOT NULL,
  label_en TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'roadmap_private_noindex' CHECK(status IN ('phase_1_public_after_compliance', 'phase_1_public_after_owner_confirmation', 'roadmap_private_noindex', 'active', 'suspended')),
  phase TEXT,
  metadata TEXT, -- JSON for additional metadata
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE
);

-- Index for brand lookups
CREATE INDEX IF NOT EXISTS idx_business_lines_brand_id ON business_lines(brand_id);
CREATE INDEX IF NOT EXISTS idx_business_lines_status ON business_lines(status);
CREATE INDEX IF NOT EXISTS idx_business_lines_key ON business_lines(line_key);
