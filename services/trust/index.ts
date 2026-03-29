import type { ProofHighlight, TrustSummary } from "../../packages/types";
import { getDashboardSnapshot, getModerationQueue } from "../api";

export function buildDashboardTrust(): TrustSummary {
  const snapshot = getDashboardSnapshot();
  const acceptedProofs = snapshot.proofs.filter((proof) => proof.reviewStatus === "accepted").length;
  const flaggedProofs = snapshot.proofs.filter((proof) => proof.moderationState === "flagged").length;
  const score = Math.min(
    100,
    40 +
      snapshot.hosts.filter((host) => host.verified).length * 8 +
      acceptedProofs * 9 +
      snapshot.nodes.filter((node) => node.readiness >= 80).length * 5 -
      flaggedProofs * 7
  );

  return {
    level:
      score >= 90
        ? "Trusted Local Node"
        : score >= 78
          ? "Proof-backed Local Node"
          : score >= 60
            ? "Verified Local Node"
            : "Basic Local Node",
    score,
    summary: `${acceptedProofs} accepted proofs and ${snapshot.hosts.filter((host) => host.verified).length} verified hosts are currently reinforcing trust.`,
    verificationState: acceptedProofs > 0 ? "proof_backed" : "verified",
    proofCount: snapshot.proofs.length,
    moderationState: flaggedProofs > 0 ? "flagged" : getModerationQueue().length > 0 ? "needs_review" : "clear"
  };
}

export function buildProofHighlights(): ProofHighlight[] {
  const snapshot = getDashboardSnapshot();

  return snapshot.proofs.slice(0, 3).map((proof) => ({
    id: proof.id,
    title: proof.title,
    detail: proof.evidence,
    status: proof.reviewStatus,
    trustImpact:
      proof.reviewStatus === "accepted"
        ? "Strengthening trust"
        : proof.reviewStatus === "flagged"
          ? "Needs moderation attention"
          : proof.reviewStatus === "rejected"
            ? "Removed from public trust"
            : "Pending trust review"
  }));
}

export function buildActivityTimeline() {
  const snapshot = getDashboardSnapshot();
  const pendingModeration = getModerationQueue().length;

  return [
    `${snapshot.events.length} public events are visible in the current activity layer.`,
    `${snapshot.requests.filter((request) => request.status === "Open").length} open requests are ready for matching.`,
    `${snapshot.nodes.filter((node) => node.status.toLowerCase().includes("active") || node.status.toLowerCase().includes("live")).length} nodes currently show active local signals.`,
    `${pendingModeration} proof records currently need moderation follow-up.`
  ];
}

export function buildModerationSummary() {
  const queue = getModerationQueue();

  return {
    pendingCount: queue.length,
    items: queue.map((proof) => `${proof.title} · ${proof.reviewStatus} · ${proof.subjectName}`)
  };
}
