import type { ProofHighlight, TrustSummary } from "../../packages/types";
import { getDashboardSnapshot } from "../api";

export function buildDashboardTrust(): TrustSummary {
  const snapshot = getDashboardSnapshot();
  const score = Math.min(
    100,
    40 +
      snapshot.hosts.filter((host) => host.verified).length * 8 +
      snapshot.proofs.length * 6 +
      snapshot.nodes.filter((node) => node.readiness >= 80).length * 5
  );

  return {
    level: score >= 85 ? "Highly Trusted Local Node" : "Verified Local Node",
    score,
    summary: `${snapshot.proofs.length} proofs and ${snapshot.hosts.filter((host) => host.verified).length} verified hosts are currently reinforcing trust.`
  };
}

export function buildProofHighlights(): ProofHighlight[] {
  const snapshot = getDashboardSnapshot();

  return snapshot.proofs.slice(0, 2).map((proof) => ({
    title: proof.title,
    detail: proof.evidence
  }));
}

export function buildActivityTimeline() {
  const snapshot = getDashboardSnapshot();

  return [
    `${snapshot.events.length} public events are visible in the current activity layer.`,
    `${snapshot.requests.filter((request) => request.status === "Open").length} open requests are ready for matching.`,
    `${snapshot.nodes.filter((node) => node.status.toLowerCase().includes("active") || node.status.toLowerCase().includes("live")).length} nodes currently show active local signals.`
  ];
}
