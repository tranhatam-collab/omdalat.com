-- Migration: 0002_brand_factory.sql
-- Description: Brand Factory core tables (owners, places, brands, brand_intakes)
-- Created: 2026-06-17
-- Depends on: 0001_init_payment_schema.sql

CREATE TABLE IF NOT EXISTS owners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  consent_status TEXT NOT NULL DEFAULT 'pending',
  consent_at TEXT,
  notes TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  owner_id TEXT NOT NULL,
  maps_url TEXT,
  google_place_id TEXT,
  lat REAL NOT NULL,
  lng REAL NOT NULL,
  address_vi TEXT,
  address_en TEXT,
  administrative_area TEXT,
  maps_status TEXT NOT NULL DEFAULT 'unknown',
  verification_status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);

CREATE TABLE IF NOT EXISTS brands (
  id TEXT PRIMARY KEY,
  place_id TEXT NOT NULL,
  owner_id TEXT NOT NULL,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subdomain TEXT NOT NULL UNIQUE,
  brand_type TEXT NOT NULL DEFAULT 'farm',
  can_host_stay INTEGER NOT NULL DEFAULT 0,
  can_host_visit INTEGER NOT NULL DEFAULT 0,
  can_sell_product INTEGER NOT NULL DEFAULT 0,
  can_host_work INTEGER NOT NULL DEFAULT 0,
  publication_status TEXT NOT NULL DEFAULT 'draft',
  ap_place_ref TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id),
  FOREIGN KEY (owner_id) REFERENCES owners(id)
);

CREATE TABLE IF NOT EXISTS brand_intakes (
  id TEXT PRIMARY KEY,
  place_id TEXT NOT NULL,
  raw_input TEXT NOT NULL,
  missing_fields TEXT,
  risk_flags TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (place_id) REFERENCES places(id)
);

-- Indices (separate statements — no inline INDEX in SQLite)
CREATE INDEX IF NOT EXISTS idx_owners_consent ON owners(consent_status);
CREATE INDEX IF NOT EXISTS idx_owners_contact ON owners(contact);

CREATE INDEX IF NOT EXISTS idx_places_owner ON places(owner_id);
CREATE INDEX IF NOT EXISTS idx_places_maps_status ON places(maps_status);
CREATE INDEX IF NOT EXISTS idx_places_verification ON places(verification_status);
CREATE INDEX IF NOT EXISTS idx_places_coords ON places(lat, lng);
CREATE INDEX IF NOT EXISTS idx_places_google_place ON places(google_place_id) WHERE google_place_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_brands_place ON brands(place_id);
CREATE INDEX IF NOT EXISTS idx_brands_owner ON brands(owner_id);
CREATE INDEX IF NOT EXISTS idx_brands_slug ON brands(slug);
CREATE INDEX IF NOT EXISTS idx_brands_subdomain ON brands(subdomain);
CREATE INDEX IF NOT EXISTS idx_brands_type ON brands(brand_type);
CREATE INDEX IF NOT EXISTS idx_brands_status ON brands(publication_status);
CREATE INDEX IF NOT EXISTS idx_brands_ap_ref ON brands(ap_place_ref) WHERE ap_place_ref IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_brand_intakes_place ON brand_intakes(place_id);
CREATE INDEX IF NOT EXISTS idx_brand_intakes_created ON brand_intakes(created_at);
