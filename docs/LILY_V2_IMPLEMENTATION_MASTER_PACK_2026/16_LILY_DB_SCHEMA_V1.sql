-- LILY V2 DATABASE SCHEMA V1
-- Target: PostgreSQL-compatible reference. Adapt types carefully for D1/SQLite if used.
-- All production migrations must be versioned and tested.

CREATE TABLE lily_properties (
  property_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  operating_entity_id TEXT,
  address_text TEXT,
  latitude REAL,
  longitude REAL,
  verification_status TEXT NOT NULL DEFAULT 'pending',
  publication_status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_rooms (
  room_id TEXT PRIMARY KEY,
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
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_room_blocks (
  block_id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL REFERENCES lily_rooms(room_id),
  start_at TEXT NOT NULL,
  end_at TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_by TEXT NOT NULL,
  created_at TEXT NOT NULL,
  CHECK (start_at < end_at)
);

CREATE TABLE lily_stay_plans (
  plan_code TEXT PRIMARY KEY,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  minimum_nights INTEGER NOT NULL,
  maximum_nights INTEGER,
  price_period TEXT NOT NULL CHECK (price_period IN ('week','month','project','custom')),
  public_price_minor INTEGER,
  currency TEXT,
  application_only INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'draft'
);

CREATE TABLE lily_applications (
  application_id TEXT PRIMARY KEY,
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
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_room_offers (
  offer_id TEXT PRIMARY KEY,
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
  CHECK (start_at < end_at)
);

CREATE TABLE lily_stays (
  stay_id TEXT PRIMARY KEY,
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
  CHECK (start_at < end_at)
);

CREATE TABLE lily_programmes (
  programme_id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name_vi TEXT NOT NULL,
  name_en TEXT NOT NULL,
  owner_user_id TEXT,
  duration_text TEXT,
  objective_vi TEXT,
  objective_en TEXT,
  output_spec TEXT,
  evaluation_spec TEXT,
  status TEXT NOT NULL DEFAULT 'draft'
);

CREATE TABLE lily_enrolments (
  enrolment_id TEXT PRIMARY KEY,
  programme_id TEXT NOT NULL REFERENCES lily_programmes(programme_id),
  user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  progress_percent INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_projects (
  project_id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  owner_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TEXT NOT NULL
);

CREATE TABLE lily_tasks (
  task_id TEXT PRIMARY KEY,
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
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_task_assignments (
  assignment_id TEXT PRIMARY KEY,
  task_id TEXT NOT NULL REFERENCES lily_tasks(task_id),
  assignee_user_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'assigned',
  assigned_at TEXT NOT NULL,
  due_at TEXT,
  accepted_at TEXT,
  UNIQUE(task_id, assignee_user_id)
);

CREATE TABLE lily_visa_work_cases (
  case_id TEXT PRIMARY KEY,
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
  updated_at TEXT NOT NULL
);

CREATE TABLE lily_incidents (
  incident_id TEXT PRIMARY KEY,
  stay_id TEXT,
  reporter_user_id TEXT,
  severity TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'reported',
  restricted_summary TEXT NOT NULL,
  assigned_operator_id TEXT,
  created_at TEXT NOT NULL,
  resolved_at TEXT
);

CREATE TABLE lily_audit_events (
  event_id TEXT PRIMARY KEY,
  actor_user_id TEXT,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  before_json TEXT,
  after_json TEXT,
  reason TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX idx_lily_applications_status ON lily_applications(status);
CREATE INDEX idx_lily_offers_room_period ON lily_room_offers(room_id,start_at,end_at);
CREATE INDEX idx_lily_stays_room_period ON lily_stays(room_id,start_at,end_at);
CREATE INDEX idx_lily_tasks_status ON lily_tasks(status);
CREATE INDEX idx_lily_cases_user ON lily_visa_work_cases(user_id,status);
CREATE INDEX idx_lily_audit_entity ON lily_audit_events(entity_type,entity_id,created_at);
