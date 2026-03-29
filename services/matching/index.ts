import type { MatchSuggestion } from "../../packages/types";
import { getDashboardSnapshot } from "../api";

function scoreTextMatch(need: string, haystack: string) {
  const tokens = need.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  const text = haystack.toLowerCase();

  return tokens.reduce((score, token) => score + (text.includes(token) ? 1 : 0), 0);
}

export function buildRequestMatches(): MatchSuggestion[] {
  const snapshot = getDashboardSnapshot();

  return snapshot.requests
    .slice(0, 3)
    .map((request) => {
      const hostCandidate = snapshot.hosts
        .map((host) => ({
          targetName: host.name,
          targetType: "host" as const,
          reason: host.focus,
          score: scoreTextMatch(request.need, `${host.focus} ${host.zone}`)
        }))
        .sort((left, right) => right.score - left.score)[0];

      const placeCandidate = snapshot.places
        .map((place) => ({
          targetName: place.name,
          targetType: "place" as const,
          reason: place.activity,
          score: scoreTextMatch(request.need, `${place.activity} ${place.area}`)
        }))
        .sort((left, right) => right.score - left.score)[0];

      const expertCandidate = snapshot.experts
        .map((expert) => ({
          targetName: expert.name,
          targetType: "expert" as const,
          reason: expert.specialty,
          score: scoreTextMatch(request.need, `${expert.specialty} ${expert.zone}`)
        }))
        .sort((left, right) => right.score - left.score)[0];

      const communityCandidate = snapshot.communities
        .map((community) => ({
          targetName: community.name,
          targetType: "community" as const,
          reason: community.focus,
          score: scoreTextMatch(request.need, `${community.focus} ${community.zone}`)
        }))
        .sort((left, right) => right.score - left.score)[0];

      return [hostCandidate, placeCandidate, expertCandidate, communityCandidate]
        .sort((left, right) => right.score - left.score)
        .map((candidate) => ({
          requestTitle: request.title,
          targetName: candidate.targetName,
          targetType: candidate.targetType,
          reason: candidate.reason,
          score: candidate.score
        } satisfies MatchSuggestion))[0];
    })
    .filter((match): match is MatchSuggestion => Boolean(match));
}
