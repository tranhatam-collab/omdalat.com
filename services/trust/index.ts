import type { OmdalatLocale } from "../../packages/core";
import type { ProofHighlight, TrustSummary } from "../../packages/types";
import { getDashboardSnapshot, getModerationQueue, resolveLocalizedText } from "../api";

export function buildDashboardTrust(locale: OmdalatLocale = "en"): TrustSummary {
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
        ? locale === "vi"
          ? "Node địa phương đáng tin cậy"
          : "Trusted Local Node"
        : score >= 78
          ? locale === "vi"
            ? "Node địa phương có bằng chứng"
            : "Proof-backed Local Node"
          : score >= 60
            ? locale === "vi"
              ? "Node địa phương đã xác minh"
              : "Verified Local Node"
            : locale === "vi"
              ? "Node địa phương cơ bản"
              : "Basic Local Node",
    score,
    summary:
      locale === "vi"
        ? `${acceptedProofs} bằng chứng đã chấp nhận và ${snapshot.hosts.filter((host) => host.verified).length} host đã xác minh đang củng cố trust.`
        : `${acceptedProofs} accepted proofs and ${snapshot.hosts.filter((host) => host.verified).length} verified hosts are currently reinforcing trust.`,
    verificationState: acceptedProofs > 0 ? "proof_backed" : "verified",
    proofCount: snapshot.proofs.length,
    moderationState: flaggedProofs > 0 ? "flagged" : getModerationQueue().length > 0 ? "needs_review" : "clear"
  };
}

export function buildProofHighlights(locale: OmdalatLocale = "en"): ProofHighlight[] {
  const snapshot = getDashboardSnapshot();

  return snapshot.proofs.slice(0, 3).map((proof) => ({
    id: proof.id,
    title: proof.title,
    detail: resolveLocalizedText(proof.evidence, locale),
    status: proof.reviewStatus,
    trustImpact:
      proof.reviewStatus === "accepted"
        ? locale === "vi"
          ? "Đang củng cố trust"
          : "Strengthening trust"
        : proof.reviewStatus === "flagged"
          ? locale === "vi"
            ? "Cần moderation xử lý"
            : "Needs moderation attention"
          : proof.reviewStatus === "rejected"
            ? locale === "vi"
              ? "Đã loại khỏi lớp trust công khai"
              : "Removed from public trust"
            : locale === "vi"
              ? "Đang chờ rà soát trust"
              : "Pending trust review"
  }));
}

export function buildActivityTimeline(locale: OmdalatLocale = "en") {
  const snapshot = getDashboardSnapshot();
  const pendingModeration = getModerationQueue().length;

  if (locale === "vi") {
    return [
      `${snapshot.events.length} sự kiện công khai đang hiển thị trong lớp hoạt động hiện tại.`,
      `${snapshot.requests.filter((request) => request.status === "Open").length} yêu cầu mở đã sẵn sàng để ghép nối.`,
      `${snapshot.nodes.filter((node) => node.status.toLowerCase().includes("active") || node.status.toLowerCase().includes("live")).length} node hiện đang có tín hiệu địa phương hoạt động.`,
      `${pendingModeration} hồ sơ bằng chứng hiện cần theo dõi moderation.`
    ];
  }

  return [
    `${snapshot.events.length} public events are visible in the current activity layer.`,
    `${snapshot.requests.filter((request) => request.status === "Open").length} open requests are ready for matching.`,
    `${snapshot.nodes.filter((node) => node.status.toLowerCase().includes("active") || node.status.toLowerCase().includes("live")).length} nodes currently show active local signals.`,
    `${pendingModeration} proof records currently need moderation follow-up.`
  ];
}

export function buildModerationSummary(locale: OmdalatLocale = "en") {
  const queue = getModerationQueue();

  return {
    pendingCount: queue.length,
    items: queue.map((proof) =>
      locale === "vi"
        ? `${proof.title} · ${proof.reviewStatus === "submitted" ? "đã gửi" : proof.reviewStatus === "accepted" ? "đã chấp nhận" : proof.reviewStatus === "flagged" ? "đã đánh dấu" : "đã từ chối"} · ${proof.subjectName}`
        : `${proof.title} · ${proof.reviewStatus} · ${proof.subjectName}`
    )
  };
}
