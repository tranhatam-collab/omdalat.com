import { slugify } from "../../packages/core/utils";
import type {
  CommunityRecord,
  EventRecord,
  ExpertRecord,
  HostRecord,
  NodeRecord,
  PlaceRecord,
  ProofRecord,
  RequestRecord
} from "../../packages/types";
import activitiesData from "../../data/activities.json";
import communitiesData from "../../data/communities.json";
import expertsData from "../../data/experts.json";
import hostsData from "../../data/hosts.json";
import nodesData from "../../data/nodes.json";
import placesData from "../../data/places.json";
import proofsData from "../../data/proofs.json";
import requestsData from "../../data/requests.json";

import type { TrustEventRecord } from "../../packages/types";

const subjectSeeds = [
  { subjectType: "host", subjectName: "Linh Pham", reviewStatus: "accepted", moderationState: "clear" },
  {
    subjectType: "place",
    subjectName: "Pine Courtyard House",
    reviewStatus: "accepted",
    moderationState: "clear"
  },
  {
    subjectType: "expert",
    subjectName: "Bao An",
    reviewStatus: "submitted",
    moderationState: "needs_review"
  }
] as const;

function createRecordId(seed: string, index: number) {
  return `${slugify(seed)}-${index + 1}`;
}

function formatDisplayDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(iso));
}

const enrich = <T extends { name?: string; title?: string }>(item: T, index: number) => {
  const slug = slugify(item.name ?? item.title ?? "");

  return {
    ...item,
    id: createRecordId(slug, index),
    slug
  };
};

export let places = placesData.map((item, index) => enrich(item, index)) as PlaceRecord[];
export let hosts = hostsData.map((item, index) => enrich(item, index)) as HostRecord[];
export let experts = expertsData.map((item, index) => enrich(item, index)) as ExpertRecord[];
export let communities = communitiesData.map((item, index) => enrich(item, index)) as CommunityRecord[];
export let events = activitiesData.map((item, index) => enrich(item, index)) as EventRecord[];
export let proofs = proofsData.map((item, index) => {
  const subjectSeed = subjectSeeds[index] ?? {
    subjectType: "event",
    subjectName: activitiesData[0]?.title ?? "OMDALAT event",
    reviewStatus: "submitted",
    moderationState: "needs_review"
  };

  return {
    ...enrich(item, index),
    subjectType: subjectSeed.subjectType,
    subjectName: subjectSeed.subjectName,
    reviewStatus: subjectSeed.reviewStatus,
    moderationState: subjectSeed.moderationState,
    moderationNote:
      subjectSeed.reviewStatus === "accepted"
        ? "Accepted into the trust ledger."
        : "Awaiting moderation review for trust impact."
  };
}) as ProofRecord[];
export let requests = requestsData.map((item, index) => enrich(item, index)) as RequestRecord[];
export let nodes = nodesData.map((item, index) => enrich(item, index)) as NodeRecord[];
export let trustEvents: TrustEventRecord[] = proofs.map((proof, index) => ({
  id: `trust-seed-${index + 1}`,
  subjectType: proof.subjectType,
  subjectId: proof.id,
  kind: proof.reviewStatus === "accepted" ? "proof_accepted" : "proof_submitted",
  detail:
    proof.reviewStatus === "accepted"
      ? `${proof.title} was accepted into the trust ledger.`
      : `${proof.title} is waiting for moderation review.`,
  createdAt: proof.recordedAt,
  impact: proof.reviewStatus === "accepted" ? "positive" : "neutral"
}));

function getBySlug<T extends { slug: string }>(collection: T[], slug: string) {
  return collection.find((item) => item.slug === slug);
}

export function getDashboardSnapshot() {
  return {
    places,
    hosts,
    experts,
    communities,
    events,
    proofs,
    requests,
    nodes,
    trustEvents
  };
}

export function getPlaceBySlug(slug: string) {
  return getBySlug(places, slug);
}

export function getHostBySlug(slug: string) {
  return getBySlug(hosts, slug);
}

export function getExpertBySlug(slug: string) {
  return getBySlug(experts, slug);
}

export function getCommunityBySlug(slug: string) {
  return getBySlug(communities, slug);
}

export function getEventBySlug(slug: string) {
  return getBySlug(events, slug);
}

export function getProofBySlug(slug: string) {
  return getBySlug(proofs, slug);
}

export function getProofById(proofId: string) {
  return proofs.find((proof) => proof.id === proofId);
}

export function getModerationQueue() {
  return proofs.filter((proof) => proof.reviewStatus !== "accepted" || proof.moderationState !== "clear");
}

export function getTrustEvents() {
  return trustEvents;
}

export function createProofSubmission(input: {
  kind: string;
  title: string;
  outcome: string;
  evidence: string;
  subjectType: ProofRecord["subjectType"];
  subjectName: string;
}) {
  const recordedAt = new Date().toISOString();
  const slug = slugify(input.title);
  const id = `${slug}-${proofs.length + 1}`;

  const proof: ProofRecord = {
    id,
    slug: `${slug}-${proofs.length + 1}`,
    kind: input.kind,
    recordedAt,
    date: formatDisplayDate(recordedAt),
    title: input.title,
    outcome: input.outcome,
    evidence: input.evidence,
    subjectType: input.subjectType,
    subjectName: input.subjectName,
    reviewStatus: "submitted",
    moderationState: "needs_review",
    moderationNote: "Submitted for local moderation review."
  };

  proofs = [proof, ...proofs];
  trustEvents = [
    {
      id: `trust-${proof.id}-submitted`,
      subjectType: proof.subjectType,
      subjectId: proof.id,
      kind: "proof_submitted",
      detail: `${proof.title} was submitted for trust review.`,
      createdAt: recordedAt,
      impact: "neutral"
    },
    ...trustEvents
  ];

  return proof;
}

export function reviewProofSubmission(input: {
  proofId: string;
  status: "accepted" | "flagged" | "rejected";
  note?: string;
  reviewer?: string;
}) {
  const reviewedAt = new Date().toISOString();
  let updatedProof: ProofRecord | undefined;

  proofs = proofs.map((proof) => {
    if (proof.id !== input.proofId) {
      return proof;
    }

    updatedProof = {
      ...proof,
      reviewStatus: input.status,
      moderationState: input.status === "accepted" ? "clear" : input.status === "flagged" ? "flagged" : "needs_review",
      moderationNote:
        input.note?.trim() ||
        (input.status === "accepted"
          ? "Accepted into the trust ledger."
          : input.status === "flagged"
            ? "Flagged for deeper review."
            : "Rejected from the public trust layer."),
      reviewedAt,
      reviewedBy: input.reviewer ?? "Moderation desk"
    };

    return updatedProof;
  });

  if (!updatedProof) {
    return undefined;
  }

  trustEvents = [
    {
      id: `trust-${updatedProof.id}-${input.status}-${Date.now()}`,
      subjectType: updatedProof.subjectType,
      subjectId: updatedProof.id,
      kind:
        input.status === "accepted"
          ? "proof_accepted"
          : input.status === "flagged"
            ? "proof_flagged"
            : "proof_rejected",
      detail:
        input.status === "accepted"
          ? `${updatedProof.title} was accepted into the trust ledger.`
          : input.status === "flagged"
            ? `${updatedProof.title} was flagged for moderation follow-up.`
            : `${updatedProof.title} was rejected from the trust layer.`,
      createdAt: reviewedAt,
      impact: input.status === "accepted" ? "positive" : "negative"
    },
    ...trustEvents
  ];

  return updatedProof;
}
