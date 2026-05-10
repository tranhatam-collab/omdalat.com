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

export type ContentStatus = "draft" | "published";

export type ContentAccessLevel = "guest" | "registered" | "reviewed" | "internal" | "admin";

export type ContentPillarKey = "song" | "work" | "xay-cuoc-doi";
export type ImageUsageType = "hero" | "card" | "social" | "inline" | "bridge" | "gallery" | "profile";
export type ImageCropStatus = "approved" | "needs_review";

export type ArticleLocaleSeedPayload = {
  title: string;
  excerpt: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
};

export type ArticleInternalLinkType = "pillar" | "related" | "cta";

export type ArticleInternalLinkSeedRecord = {
  href: string;
  type: ArticleInternalLinkType;
  title_vi: string;
  title_en: string;
  body_vi: string;
  body_en: string;
};

export type ArticleSeedRecord = SlugRecord & {
  order: number;
  pillar_key: ContentPillarKey;
  pillar_vi: string;
  pillar_en: string;
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  meta_title_vi?: string;
  meta_title_en?: string;
  meta_description_vi?: string;
  meta_description_en?: string;
  contextual_cta?: "stay" | "work" | "join";
  pillar_target_routes?: string[];
  internal_links_vi?: string[];
  internal_links_en?: string[];
  internal_links?: ArticleInternalLinkSeedRecord[];
  featured_image?: string;
  locales?: {
    vi: ArticleLocaleSeedPayload;
    en: ArticleLocaleSeedPayload;
  };
  tags: string[];
  access_level: "guest";
  status: ContentStatus;
};

export type ArticleImageSeedRecord = {
  article_slug: string;
  image_id: string;
  file_name: string;
  src: string;
  width: number;
  height: number;
  source: string;
  license: string;
  photographer_or_owner: string;
  approved_by: string;
  approved_at: string;
  used_routes: string[];
  usage_type: ImageUsageType;
  desktop_crop_status: ImageCropStatus;
  mobile_crop_status: ImageCropStatus;
  alt_vi: string;
  alt_en: string;
  caption_vi: string;
  caption_en: string;
  notes: string;
};

export type MemberResourceSeedRecord = SlugRecord & {
  order: number;
  resource_type: "guide" | "operations" | "investor" | "resource";
  title_vi: string;
  title_en: string;
  excerpt_vi: string;
  excerpt_en: string;
  content_vi: string;
  content_en: string;
  access_level: ContentAccessLevel;
  status: ContentStatus;
};

export type HandbookSectionSeedRecord = SlugRecord & {
  order: number;
  section_key: string;
  title_vi: string;
  title_en: string;
  summary_vi: string;
  summary_en: string;
  content_vi: string;
  content_en: string;
  access_level: ContentAccessLevel;
  status: ContentStatus;
};
