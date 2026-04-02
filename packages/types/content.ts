import type { ModerationState, ProofReviewStatus } from "./trust";

export type LocalizedTextValue = {
  vi: string;
  en: string;
};

export type MaybeLocalizedText = string | LocalizedTextValue;

export type SlugRecord = {
  id: string;
  slug: string;
};

export type PlaceRecord = SlugRecord & {
  name: string;
  area: MaybeLocalizedText;
  type: MaybeLocalizedText;
  mode: MaybeLocalizedText;
  cadence: MaybeLocalizedText;
  hostCount: number;
  activity: MaybeLocalizedText;
  signal: MaybeLocalizedText;
};

export type HostRecord = SlugRecord & {
  name: string;
  role: MaybeLocalizedText;
  zone: MaybeLocalizedText;
  verified: boolean;
  focus: MaybeLocalizedText;
  trust: MaybeLocalizedText;
  availability: MaybeLocalizedText;
};

export type ExpertRecord = SlugRecord & {
  name: string;
  specialty: MaybeLocalizedText;
  zone: MaybeLocalizedText;
  availability: MaybeLocalizedText;
  signal: MaybeLocalizedText;
};

export type CommunityRecord = SlugRecord & {
  name: string;
  focus: MaybeLocalizedText;
  zone: MaybeLocalizedText;
  cadence: MaybeLocalizedText;
  signal: MaybeLocalizedText;
};

export type EventRecord = SlugRecord & {
  startsAt: string;
  date: MaybeLocalizedText;
  title: string;
  place: string;
  host: string;
  description: MaybeLocalizedText;
};

export type ProofRecord = SlugRecord & {
  kind: MaybeLocalizedText;
  recordedAt: string;
  date: MaybeLocalizedText;
  title: string;
  outcome: MaybeLocalizedText;
  evidence: MaybeLocalizedText;
  subjectType: "place" | "host" | "expert" | "community" | "event";
  subjectName: string;
  reviewStatus: ProofReviewStatus;
  moderationState: ModerationState;
  moderationNote?: string;
  reviewedAt?: string;
  reviewedBy?: string;
};

export type RequestRecord = SlugRecord & {
  title: string;
  priority: string;
  status: string;
  lane: string;
  owner: string;
  dueAt: string;
  area: string;
  window: string;
  need: string;
};

export type NodeRecord = SlugRecord & {
  name: string;
  zone: string;
  type: string;
  status: string;
  readiness: number;
  lead: string;
  nextWindow: string;
  surface: string;
  signal: string;
};
