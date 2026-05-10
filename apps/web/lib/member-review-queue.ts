export type MemberReviewRequestStatus = "pending" | "approved" | "rejected";

export type MemberReviewRequest = {
  id: string;
  memberId: string;
  memberEmail: string;
  memberName: string;
  status: MemberReviewRequestStatus;
  requestedAt: string;
  decidedAt?: string;
  decidedById?: string;
  decidedByEmail?: string;
};

export const MEMBER_REVIEW_QUEUE_COOKIE_NAME = "omdalat-member-review-queue" as const;
export const MEMBER_REVIEW_QUEUE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const MAX_QUEUE_ITEMS = 400;

declare global {
  var __OMDALAT_MEMBER_REVIEW_QUEUE__: MemberReviewRequest[] | undefined;
}

function makeRequestId() {
  return `review-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;
}

function sanitizeOptional(value: unknown) {
  if (typeof value !== "string") {
    return undefined;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isMemberReviewRequestStatus(value: unknown): value is MemberReviewRequestStatus {
  return value === "pending" || value === "approved" || value === "rejected";
}

function normalizeRequest(input: unknown): MemberReviewRequest | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const item = input as Partial<MemberReviewRequest>;
  const id = sanitizeOptional(item.id);
  const memberId = sanitizeOptional(item.memberId);
  const memberEmail = sanitizeOptional(item.memberEmail)?.toLowerCase();
  const memberName = sanitizeOptional(item.memberName);
  const requestedAt = sanitizeOptional(item.requestedAt);
  const status = isMemberReviewRequestStatus(item.status) ? item.status : null;

  if (!id || !memberId || !memberEmail || !memberName || !requestedAt || !status) {
    return null;
  }

  return {
    id,
    memberId,
    memberEmail,
    memberName,
    status,
    requestedAt,
    decidedAt: sanitizeOptional(item.decidedAt),
    decidedById: sanitizeOptional(item.decidedById),
    decidedByEmail: sanitizeOptional(item.decidedByEmail)?.toLowerCase()
  };
}

function cloneRequest(request: MemberReviewRequest) {
  return { ...request };
}

function trimQueue(queue: MemberReviewRequest[]) {
  if (queue.length <= MAX_QUEUE_ITEMS) {
    return queue;
  }
  return queue.slice(queue.length - MAX_QUEUE_ITEMS);
}

function parseQueuePayload(rawValue: string | null | undefined) {
  try {
    return JSON.parse(rawValue ?? "") as unknown;
  } catch {
    return null;
  }
}

export function parseMemberReviewQueue(rawValue: string | null | undefined) {
  const payload = parseQueuePayload(rawValue);
  if (!Array.isArray(payload)) {
    return [];
  }

  return trimQueue(payload.map(normalizeRequest).filter((item): item is MemberReviewRequest => item !== null));
}

function readMemberReviewQueueFromMemory() {
  const queue = globalThis.__OMDALAT_MEMBER_REVIEW_QUEUE__;
  if (!Array.isArray(queue)) {
    return [];
  }

  return trimQueue(queue.map(cloneRequest));
}

export function resolveMemberReviewQueue(rawValue: string | null | undefined) {
  if (typeof rawValue === "string") {
    return parseMemberReviewQueue(rawValue);
  }

  return readMemberReviewQueueFromMemory();
}

export function serializeMemberReviewQueue(queue: MemberReviewRequest[]) {
  return JSON.stringify(trimQueue(queue).map(cloneRequest));
}

export function syncMemberReviewQueue(queue: MemberReviewRequest[]) {
  globalThis.__OMDALAT_MEMBER_REVIEW_QUEUE__ = trimQueue(queue).map(cloneRequest);
  return readMemberReviewQueueFromMemory();
}

function sameMember(request: MemberReviewRequest, memberId: string, memberEmail: string) {
  const normalizedEmail = memberEmail.trim().toLowerCase();
  if (request.memberId === memberId) {
    return true;
  }
  return request.memberEmail.trim().toLowerCase() === normalizedEmail;
}

function getLatestRequestForMember(queue: MemberReviewRequest[], memberId: string, memberEmail: string) {
  for (let index = queue.length - 1; index >= 0; index -= 1) {
    if (sameMember(queue[index], memberId, memberEmail)) {
      return queue[index];
    }
  }
  return null;
}

export function getLatestReviewRequestForMember(
  queue: MemberReviewRequest[],
  memberId: string,
  memberEmail: string
): MemberReviewRequest | null {
  const latest = getLatestRequestForMember(queue, memberId, memberEmail);
  return latest ? cloneRequest(latest) : null;
}

export function listReviewQueue(queue: MemberReviewRequest[], limit = 80): MemberReviewRequest[] {
  return queue.slice(Math.max(queue.length - limit, 0)).map(cloneRequest).reverse();
}

export function listPendingReviewQueue(queue: MemberReviewRequest[], limit = 40): MemberReviewRequest[] {
  return listReviewQueue(queue, limit * 2)
    .filter((item) => item.status === "pending")
    .slice(0, limit);
}

export function submitReviewRequestForMember(member: {
  memberId: string;
  memberEmail: string;
  memberName: string;
}, queue: MemberReviewRequest[]) {
  const nextQueue = queue.map(cloneRequest);
  const existing = getLatestRequestForMember(nextQueue, member.memberId, member.memberEmail);

  if (existing && existing.status === "pending") {
    return {
      created: false,
      request: cloneRequest(existing),
      queue: trimQueue(nextQueue)
    };
  }

  const request: MemberReviewRequest = {
    id: makeRequestId(),
    memberId: member.memberId,
    memberEmail: member.memberEmail.trim().toLowerCase(),
    memberName: member.memberName,
    status: "pending",
    requestedAt: new Date().toISOString()
  };

  nextQueue.push(request);

  return {
    created: true,
    request: cloneRequest(request),
    queue: trimQueue(nextQueue)
  };
}

export function decideReviewRequestById(params: {
  requestId: string;
  decision: "approve" | "reject";
  decidedById: string;
  decidedByEmail: string;
}, queue: MemberReviewRequest[]) {
  const nextQueue = queue.map(cloneRequest);
  const request = nextQueue.find((item) => item.id === params.requestId);

  if (!request) {
    return { ok: false as const, reason: "not-found" as const };
  }

  if (request.status !== "pending") {
    return { ok: false as const, reason: "not-pending" as const, request: cloneRequest(request) };
  }

  request.status = params.decision === "approve" ? "approved" : "rejected";
  request.decidedAt = new Date().toISOString();
  request.decidedById = params.decidedById;
  request.decidedByEmail = params.decidedByEmail.trim().toLowerCase();

  return { ok: true as const, request: cloneRequest(request), queue: trimQueue(nextQueue) };
}
