export type ProofReviewStatus = "submitted" | "accepted" | "flagged" | "rejected";

export type ModerationState = "clear" | "needs_review" | "flagged";

export type TrustSummary = {
  level: string;
  score: number;
  summary: string;
  verificationState: "unverified" | "verified" | "proof_backed";
  proofCount: number;
  moderationState: ModerationState;
};

export type ProofHighlight = {
  id: string;
  title: string;
  detail: string;
  status: ProofReviewStatus;
  trustImpact: string;
};

export type MatchSuggestion = {
  requestTitle: string;
  targetName: string;
  targetType: "host" | "place" | "expert" | "community";
  reason: string;
  score: number;
};

export type NotificationKind = "auth" | "proof" | "trust" | "moderation" | "request";

export type NotificationRecord = {
  id: string;
  kind: NotificationKind;
  title: string;
  detail: string;
  createdAt: string;
  read: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export type TrustEventRecord = {
  id: string;
  subjectType: string;
  subjectId: string;
  kind:
    | "proof_submitted"
    | "proof_accepted"
    | "proof_flagged"
    | "proof_rejected"
    | "session_switched"
    | "session_logged_out";
  detail: string;
  createdAt: string;
  impact: "positive" | "neutral" | "negative";
};
