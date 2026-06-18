# LILY ROOMS, SPACES AND GARDEN CMS SCHEMA 2026

## 1. Core inventory

### Rooms
`LIL-R01` through `LIL-R05`

### Suggested shared-space IDs

- `LIL-S01` — common living area
- `LIL-S02` — kitchen
- `LIL-S03` — workspace
- `LIL-S04` — café corner
- `LIL-S05` — workshop area
- `LIL-G01` — main garden

These IDs do not prove the spaces exist; field verification creates the evidence.

## 2. Room schema

```json
{
  "room_id": "LIL-R01",
  "name_vi": "",
  "name_en": "",
  "status": "draft|verification_pending|active|maintenance|inactive",
  "max_occupancy_verified": null,
  "bed_configuration": [],
  "bathroom_type": "unknown|private|shared",
  "workspace_ready": false,
  "weekly_enabled": false,
  "monthly_enabled": false,
  "amenities_verified": [],
  "accessibility_notes": [],
  "safety_check_status": "pending|passed|failed",
  "media_asset_ids": [],
  "evidence_ids": [],
  "public_copy_status": "draft|approved",
  "updated_at": ""
}
```

## 3. Space schema

```json
{
  "space_id": "LIL-S03",
  "type": "workspace",
  "capacity_verified": null,
  "opening_hours": [],
  "booking_required": false,
  "equipment": [],
  "noise_policy": "",
  "safety_status": "pending",
  "media_asset_ids": [],
  "public_status": "hidden"
}
```

## 4. Garden schema

```json
{
  "garden_id": "LIL-G01",
  "areas": [],
  "activities": [],
  "seasonal_notes": [],
  "tools": [],
  "chemical_or_pesticide_controls": [],
  "hazards": [],
  "supervision_required": [],
  "image_assets": [],
  "verification_status": "pending"
}
```

## 5. Required tables

- `lily_properties`
- `lily_rooms`
- `lily_spaces`
- `lily_gardens`
- `lily_room_blocks`
- `lily_stay_plans`
- `lily_applications`
- `lily_room_offers`
- `lily_stays`
- `lily_residents`
- `lily_programmes`
- `lily_enrolments`
- `lily_projects`
- `lily_tasks`
- `lily_task_assignments`
- `lily_visa_work_cases`
- `lily_incidents`
- shared `media_assets`, `consent_records`, `payments`, `audit_logs`

## 6. Publication gate

A room or space is public only if:

```text
location/property authority verified
+ real photos approved
+ image rights approved
+ capacity verified
+ amenities verified
+ safety status passed
+ public copy approved
+ admin approval
```

## 7. Availability model

Availability is derived from active stays, room offers, maintenance blocks and admin holds. It is not edited as a free-text “available” badge.

## 8. Media contract

Every image requires asset ID, source, date, location/room reference, photographer/rightsholder, licence/consent, permitted channels, alt VI/EN, crop variants and revocation status.
