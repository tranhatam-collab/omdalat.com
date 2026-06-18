-- Migration: 0005_brand_workflow.sql
-- Description: Brand workflow tables (approvals, agent runs, inquiries, release reports)
-- Created: 2026-06-17
-- Depends on: 0002_brand_factory.sql

CREATE TABLE IF NOT EXISTS approvals (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  action TEXT NOT NULL,
  approved_by TEXT NOT NULL,
  notes TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS agent_runs (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  run_type TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'draft',
  status TEXT NOT NULL DEFAULT 'pending',
  output TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  contact TEXT NOT NULL,
  message TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'vi',
  source TEXT NOT NULL DEFAULT 'brand_site',
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

CREATE TABLE IF NOT EXISTS release_reports (
  id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL,
  release_status TEXT NOT NULL,
  risk_flags TEXT,
  missing_items TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Approval actions: 'approve_content', 'approve_images', 'approve_compliance', 'approve_publish'
-- Agent run types: 'intake', 'maps_resolver', 'verification', 'brand_architect', 'content', 'image_director', 'seo', 'compliance', 'cms_builder', 'qa'
-- Agent run modes: 'draft', 'preview', 'review'
-- Agent run status: 'pending', 'running', 'completed', 'failed'
-- Inquiry status: 'pending', 'processing', 'completed', 'rejected'
-- Release status: 'blocked', 'ready_for_review', 'ready_to_publish'

-- Indices (separate statements — no inline INDEX in SQLite)
CREATE INDEX IF NOT EXISTS idx_approvals_brand ON approvals(brand_id);
CREATE INDEX IF NOT EXISTS idx_approvals_action ON approvals(action);
CREATE INDEX IF NOT EXISTS idx_approvals_by ON approvals(approved_by);
CREATE INDEX IF NOT EXISTS idx_approvals_created ON approvals(created_at);

CREATE INDEX IF NOT EXISTS idx_agent_runs_brand ON agent_runs(brand_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_type ON agent_runs(run_type);
CREATE INDEX IF NOT EXISTS idx_agent_runs_mode ON agent_runs(mode);
CREATE INDEX IF NOT EXISTS idx_agent_runs_status ON agent_runs(status);
CREATE INDEX IF NOT EXISTS idx_agent_runs_created ON agent_runs(created_at);

CREATE INDEX IF NOT EXISTS idx_inquiries_brand ON inquiries(brand_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_source ON inquiries(source);
CREATE INDEX IF NOT EXISTS idx_inquiries_locale ON inquiries(locale);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at);

CREATE INDEX IF NOT EXISTS idx_release_reports_brand ON release_reports(brand_id);
CREATE INDEX IF NOT EXISTS idx_release_reports_status ON release_reports(release_status);
CREATE INDEX IF NOT EXISTS idx_release_reports_created ON release_reports(created_at);
