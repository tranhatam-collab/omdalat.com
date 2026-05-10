import { normalizeMemberSession, type MemberSessionState } from "./member-auth";
import {
  getLatestReviewRequestForMember,
  type MemberReviewRequest,
  type MemberReviewRequestStatus
} from "./member-review-queue";

function isPrivilegedRole(role: MemberSessionState["role"]) {
  return role === "internal_member" || role === "admin";
}

function mapQueueStatusToReviewStatus(status: MemberReviewRequestStatus): Extract<MemberSessionState["reviewStatus"], "pending" | "approved" | "rejected"> {
  if (status === "approved") {
    return "approved";
  }

  if (status === "rejected") {
    return "rejected";
  }

  return "pending";
}

export function resolveReviewStatusFromQueueObject(
  session: MemberSessionState,
  reviewQueue: MemberReviewRequest[] = []
): MemberSessionState["reviewStatus"] {
  const normalizedSession = normalizeMemberSession(session);

  if (normalizedSession.role === "guest") {
    return "not_requested";
  }

  if (isPrivilegedRole(normalizedSession.role)) {
    return "approved";
  }

  if (!normalizedSession.email) {
    return normalizedSession.reviewStatus;
  }

  const latestRequest = getLatestReviewRequestForMember(reviewQueue, normalizedSession.id, normalizedSession.email);
  if (latestRequest) {
    return mapQueueStatusToReviewStatus(latestRequest.status);
  }

  if (normalizedSession.role === "verified_member") {
    return "approved";
  }

  return normalizedSession.reviewStatus;
}

export function resolveSessionWithReviewQueue(
  session: MemberSessionState,
  reviewQueue: MemberReviewRequest[] = []
): MemberSessionState {
  const normalizedSession = normalizeMemberSession(session);
  const resolvedReviewStatus = resolveReviewStatusFromQueueObject(normalizedSession, reviewQueue);

  if (normalizedSession.role === "guest") {
    return normalizeMemberSession({
      ...normalizedSession,
      reviewStatus: "not_requested"
    });
  }

  if (isPrivilegedRole(normalizedSession.role)) {
    return normalizeMemberSession({
      ...normalizedSession,
      reviewStatus: "approved",
      emailVerified: true,
      profileComplete: true
    });
  }

  const resolvedRole =
    resolvedReviewStatus === "approved"
      ? "verified_member"
      : normalizedSession.role === "verified_member"
        ? "member"
        : normalizedSession.role;

  return normalizeMemberSession({
    ...normalizedSession,
    role: resolvedRole,
    reviewStatus: resolvedReviewStatus
  });
}
