-- Migration: Tam Farms Model Correction (ADR-003)
-- Date: 2026-07-01
-- ADR: docs/adr/ADR-003_TAMFARMS_MODEL_vs_LOCATION_2026.md
--
-- This migration corrects the architecture:
-- - Tam Farms: brand_type = 'chain_model' (not 'experiential_education')
-- - Tam Farms: name_en = 'Tam Farms' (plural, not 'Tam Farm' singular)
-- - Lily: brand_type = 'reference_location' (not 'hybrid_local_brand')
-- - Lily: name_vi = 'Lily' (not 'Lily Living & Working Garden')
--
-- AGENTS.md exception: This migration updates brand_type and name fields.
--   These are NOT compliance fields (lodging_compliance, business_registration, pccc).
--   brand_type and name are administrative metadata, not legal assertions.
--   No evidence required for this change.

UPDATE brands SET brand_type = 'chain_model', name_en = 'Tam Farms', updated_at = '2026-07-01T00:00:00Z'
WHERE id = 'brnd_tamfarms';

UPDATE brands SET brand_type = 'reference_location', name_vi = 'Lily', name_en = 'Lily', updated_at = '2026-07-01T00:00:00Z'
WHERE id = 'brnd_lily';
