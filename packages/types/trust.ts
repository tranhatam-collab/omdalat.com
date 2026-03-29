export type TrustSummary = {
  level: string;
  score: number;
  summary: string;
};

export type ProofHighlight = {
  title: string;
  detail: string;
};

export type MatchSuggestion = {
  requestTitle: string;
  targetName: string;
  targetType: "host" | "place" | "expert" | "community";
  reason: string;
  score: number;
};
