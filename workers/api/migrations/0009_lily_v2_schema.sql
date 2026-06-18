-- Migration: 0009_lily_v2_schema.sql
-- Description: Lily V2 specific tables (mapped to business_lines + tenant tables)
-- Source: LILY_V2_IMPLEMENTATION_MASTER_PACK_2026/16_LILY_DB_SCHEMA_V1.sql
-- Created: 2026-06-18
-- Depends on: 0008_brand_admins.sql
-- Note: Lily is a tenant (brand) in the system. These tables extend the core schema
-- with Lily-specific workflows (applications, stays, programmes, tasks, visa cases).
-- All tables reference brand_id to maintain tenant isolation.

-- Lily properties (maps to places table, with Lily-specific verification)
CREATE TABLE IF NOT EXISTS lily_properties (
  property_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  name TEXT NOT NULL,
  operating_entity_id TEXT,
  address_text TEXT,
  latitude REAL,
  longitude REAL,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  publication_status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily rooms (maps to brand-specific inventory)
CREATE TABLE IF NOT EXISTS lily_rooms (
  room_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  property_id TEXT NOT NULL REFERENCES lily_properties(property_id),
  name_vi TEXT,
  name_en TEXT,
  status TEXT NOT NULL DEFAULT 'verification_pending',
  max_occupancy_verified INTEGER,
  bathroom_type TEXT NOT NULL DEFAULT 'unknown',
  workspace_ready INTEGER NOT NULL DEFAULT 0,
  weekly_enabled INTEGER NOT NULL DEFAULT 0,
  monthly_enabled INTEGER NOT NULL DEFAULT 0,
  safety_check_status TEXT NOT NULL DEFAULT 'pending',
  public_copy_status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily room blocks (availability blocks)
CREATE TABLE IF NOT EXISTS lily_room_blocks (
  block_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  room_id TEXT NOT NULL REFERENCES lily_rooms(room_id),
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  CHECK (start_at < end_at),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily stay plans (business_line: stay)
CREATE TABLE IF NOT EXISTS lily_stay_plans (
  plan_code TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  minimum_nights INTEGER NOT NULL,
  maximum_nights INTEGER,
  price_period TEXT NOT NULL CHECK (price_period IN ('week','month','project','custom')),
  public_price_minor INTEGER,
  currency TEXT,
  application_only INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily applications (business_line: stay)
CREATE TABLE IF NOT EXISTS lily_applications (
  application_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  user_id TEXT,
  email TEXT NOT NULL,
  nationality TEXT,
  plan_code TEXT REFERENCES lily_stay_plans(plan_code),
  preferred_start TEXT,
  preferred_end TEXT,
  purpose TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'submitted',
  international_review_required INTEGER NOT NULL DEFAULT 0,
  consent_record_id TEXT NOT NULL,
  assigned_reviewer_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily room offers (business_line: stay)
CREATE TABLE IF NOT EXISTS lily_room_offers (
  offer_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  application_id TEXT NOT NULL REFERENCES lily_applications(application_id),
  room_id TEXT NOT NULL REFERENCES lily_rooms(room_id),
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  total_amount_minor INTEGER,
  currency TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  expires_at TEXT,
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  CHECK (start_at < end_at),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily stays (business_line: stay)
CREATE TABLE IF NOT EXISTS lily_stays (
  stay_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  offer_id TEXT UNIQUE NOT NULL REFERENCES lily_room_offers(offer_id),
  resident_id TEXT NOT NULL,
  room_id TEXT NOT NULL REFERENCES lily_rooms(room_id),
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pre_arrival',
  agreement_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  temporary_residence_status TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  CHECK (start_at < end_at),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily programmes (business_line: learning)
CREATE TABLE IF NOT EXISTS lily_programmes (
  programme_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  code TEXT UNIQUE NOT NULL,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  owner_user_id TEXT,
  duration_text TEXT,
  objective_vi TEXT,
  objective_en TEXT,
  output_spec TEXT,
  evaluation_spec TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily enrolments (business_line: learning)
CREATE TABLE IF NOT EXISTS lily_enrolments (
  enrolment_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  programme_id TEXT NOT NULL REFERENCES lily_programmes(programme_id),
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  progress_percent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily projects (business_line: work)
CREATE TABLE IF NOT EXISTS lily_projects (
  project_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  owner_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily tasks (business_line: work)
CREATE TABLE IF NOT EXISTS lily_tasks (
  task_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  project_id TEXT NOT NULL REFERENCES lily_projects(project_id),
  title TEXT NOT NULL,
  compensation_type TEXT NOT NULL CHECK (compensation_type IN ('paid','volunteer','learning')),
  compensation_spec TEXT,
  acceptance_rubric TEXT NOT NULL,
  ip_terms TEXT NOT NULL,
  confidentiality_level TEXT NOT NULL DEFAULT 'internal',
  work_authorisation_required INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily task assignments (business_line: work)
CREATE TABLE IF NOT EXISTS lily_task_assignments (
  assignment_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  task_id TEXT NOT NULL REFERENCES lily_tasks(task_id),
  assignee_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'assigned',
  assigned_at TEXT NOT NULL,
  due_at TEXT,
  accepted_at TEXT,
  UNIQUE(task_id, assignee_user_id),
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily visa/work cases (business_line: international)
CREATE TABLE IF NOT EXISTS lily_visa_work_cases (
  case_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  user_id TEXT NOT NULL,
  stay_id TEXT,
  lane TEXT NOT NULL CHECK (lane IN ('stay_only','learning','remote_overseas','local_work')),
  sponsor_entity_id TEXT,
  reviewer_user_id TEXT,
  stay_status TEXT,
  permit_status TEXT,
  expires_at TEXT,
  activity_unlock INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily incidents (business_line: operations)
CREATE TABLE IF NOT EXISTS lily_incidents (
  incident_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  stay_id TEXT,
  reporter_user_id TEXT,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reported',
  restricted_summary TEXT NOT NULL,
  assigned_operator_id TEXT,
  created_at TEXT NOT NULL,
  resolved_at TEXT,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Lily audit events (business_line: operations)
CREATE TABLE IF NOT EXISTS lily_audit_events (
  event_id TEXT PRIMARY KEY,
  brand_id TEXT NOT NULL, -- Reference to brands table (tenant isolation)
  actor_user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  reason TEXT,
  created_at TEXT NOT NULL,
  FOREIGN KEY (brand_id) REFERENCES brands(id)
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_lily_properties_brand ON lily_properties(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_properties_status ON lily_properties(verification_status, publication_status);

CREATE INDEX IF NOT EXISTS idx_lily_rooms_brand ON lily_rooms(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_rooms_property ON lily_rooms(property_id);
CREATE INDEX IF NOT EXISTS idx_lily_rooms_status ON lily_rooms(status);

CREATE INDEX IF NOT EXISTS idx_lily_room_blocks_brand ON lily_room_blocks(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_room_blocks_room ON lily_room_blocks(room_id);
CREATE INDEX IF NOT EXISTS idx_lily_room_blocks_period ON lily_room_blocks(room_id, start_at, end_at);

CREATE INDEX IF NOT EXISTS idx_lily_stay_plans_brand ON lily_stay_plans(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_stay_plans_status ON lily_stay_plans(status);

CREATE INDEX IF NOT EXISTS idx_lily_applications_brand ON lily_applications(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_applications_status ON lily_applications(status);
CREATE INDEX IF NOT EXISTS idx_lily_applications_email ON lily_applications(email);

CREATE INDEX IF NOT EXISTS idx_lily_room_offers_brand ON lily_room_offers(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_room_offers_application ON lily_room_offers(application_id);
CREATE INDEX IF NOT EXISTS idx_lily_room_offers_room_period ON lily_room_offers(room_id, start_at, end_at);

CREATE INDEX IF NOT EXISTS idx_lily_stays_brand ON lily_stays(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_stays_offer ON lily_stays(offer_id);
CREATE INDEX IF NOT EXISTS idx_lily_stays_room_period ON lily_stays(room_id, start_at, end_at);
CREATE INDEX IF NOT EXISTS idx_lily_stays_status ON lily_stays(status);

CREATE INDEX IF NOT EXISTS idx_lily_programmes_brand ON lily_programmes(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_programmes_status ON lily_programmes(status);

CREATE INDEX IF NOT EXISTS idx_lily_enrolments_brand ON lily_enrolments(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_enrolments_programme ON lily_enrolments(programme_id);
CREATE INDEX IF NOT EXISTS idx_lily_enrolments_user ON lily_enrolments(user_id);

CREATE INDEX IF NOT EXISTS idx_lily_projects_brand ON lily_projects(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_projects_status ON lily_projects(status);

CREATE INDEX IF NOT EXISTS idx_lily_tasks_brand ON lily_tasks(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_tasks_project ON lily_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_lily_tasks_status ON lily_tasks(status);

CREATE INDEX IF NOT EXISTS idx_lily_task_assignments_brand ON lily_task_assignments(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_task_assignments_task ON lily_task_assignments(task_id);
CREATE INDEX IF NOT EXISTS idx_lily_task_assignments_user ON lily_task_assignments(assignee_user_id);

CREATE INDEX IF NOT EXISTS idx_lily_visa_work_cases_brand ON lily_visa_work_cases(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_visa_work_cases_user ON lily_visa_work_cases(user_id, status);

CREATE INDEX IF NOT EXISTS idx_lily_incidents_brand ON lily_incidents(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_incidents_stay ON lily_incidents(stay_id);
CREATE INDEX IF NOT EXISTS idx_lily_incidents_status ON lily_incidents(status);

CREATE INDEX IF NOT EXISTS idx_lily_audit_events_brand ON lily_audit_events(brand_id);
CREATE INDEX IF NOT EXISTS idx_lily_audit_events_entity ON lily_audit_events(entity_type, entity_id, created_at);
