export type SlugRecord = {
  slug: string;
};

export type PlaceRecord = SlugRecord & {
  name: string;
  area: string;
  type: string;
  mode: string;
  cadence: string;
  hostCount: number;
  activity: string;
  signal: string;
};

export type HostRecord = SlugRecord & {
  name: string;
  role: string;
  zone: string;
  verified: boolean;
  focus: string;
  trust: string;
  availability: string;
};

export type ExpertRecord = SlugRecord & {
  name: string;
  specialty: string;
  zone: string;
  availability: string;
  signal: string;
};

export type CommunityRecord = SlugRecord & {
  name: string;
  focus: string;
  zone: string;
  cadence: string;
  signal: string;
};

export type EventRecord = SlugRecord & {
  startsAt: string;
  date: string;
  title: string;
  place: string;
  host: string;
  description: string;
};

export type ProofRecord = SlugRecord & {
  kind: string;
  recordedAt: string;
  date: string;
  title: string;
  outcome: string;
  evidence: string;
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
