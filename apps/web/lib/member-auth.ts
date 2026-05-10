import type { AppRole, ContentAccessLevel } from "../../../packages/types";
import { localizePath, type OmdalatLocale } from "../../../packages/core";

export const MEMBER_SESSION_COOKIE_NAME = "omdalat-member-session" as const;
export const MEMBER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export const OPEN_MEMBER_ROUTES = ["/member/login", "/member/register", "/member/verify"] as const;

export type MemberRouteRequirement = "signed_in" | "email_verified" | "profile_complete" | "reviewed";
export type MemberReviewStatus = "not_requested" | "pending" | "approved" | "rejected";

export type MemberSessionState = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  profileComplete: boolean;
  emailVerified: boolean;
  reviewStatus: MemberReviewStatus;
};

export const ANONYMOUS_MEMBER_SESSION: MemberSessionState = {
  id: "guest-demo",
  email: "",
  name: "Guest",
  role: "guest",
  profileComplete: false,
  emailVerified: false,
  reviewStatus: "not_requested"
};

const memberRouteRequirements: Array<{ path: string; requirement: MemberRouteRequirement }> = [
  { path: "/member/resources", requirement: "email_verified" },
  { path: "/member/handbook", requirement: "reviewed" },
  { path: "/member/programs", requirement: "reviewed" },
  { path: "/member/operations", requirement: "reviewed" },
  { path: "/member/node-model", requirement: "reviewed" },
  { path: "/member/investor-overview", requirement: "reviewed" },
  { path: "/member/profile", requirement: "signed_in" },
  { path: "/member/application-status", requirement: "signed_in" },
  { path: "/member/welcome", requirement: "signed_in" },
  { path: "/member", requirement: "signed_in" }
];

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path || "/";
}

function isAppRole(value: unknown): value is AppRole {
  return (
    value === "guest" ||
    value === "member" ||
    value === "verified_member" ||
    value === "internal_member" ||
    value === "admin"
  );
}

function isMemberReviewStatus(value: unknown): value is MemberReviewStatus {
  return value === "not_requested" || value === "pending" || value === "approved" || value === "rejected";
}

function toBoolean(value: unknown) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function isPrivilegedRole(role: AppRole) {
  return role === "internal_member" || role === "admin";
}

export function parseSessionPayload(rawValue: string | null | undefined) {
  try {
    return JSON.parse(rawValue ?? "") as Partial<MemberSessionState>;
  } catch {
    return null;
  }
}

export function parseMemberSession(rawValue: string | null | undefined): MemberSessionState {
  const payload = parseSessionPayload(rawValue);

  if (!payload || typeof payload !== "object") {
    return ANONYMOUS_MEMBER_SESSION;
  }

  const role = isAppRole(payload.role) ? payload.role : ANONYMOUS_MEMBER_SESSION.role;
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const name = typeof payload.name === "string" && payload.name.trim() ? payload.name : "Guest";
  const profileComplete = toBoolean(payload.profileComplete);
  const emailVerified = toBoolean(payload.emailVerified);
  const reviewStatus = isMemberReviewStatus(payload.reviewStatus)
    ? payload.reviewStatus
    : role === "verified_member" || isPrivilegedRole(role)
      ? "approved"
      : "not_requested";
  const id = typeof payload.id === "string" && payload.id.trim() ? payload.id : `${role}-${email || "guest"}`;

  return normalizeMemberSession({
    id,
    email,
    name,
    role,
    profileComplete,
    emailVerified,
    reviewStatus
  });
}

export function normalizeMemberSession(session: MemberSessionState | null | undefined): MemberSessionState {
  if (!session) {
    return ANONYMOUS_MEMBER_SESSION;
  }

  const normalizedRole = isAppRole(session.role) ? session.role : "guest";
  const normalizedReviewStatus = isMemberReviewStatus(session.reviewStatus)
    ? session.reviewStatus
    : normalizedRole === "verified_member" || isPrivilegedRole(normalizedRole)
      ? "approved"
      : "not_requested";

  return {
    ...ANONYMOUS_MEMBER_SESSION,
    ...session,
    role: normalizedRole,
    email: typeof session.email === "string" ? session.email.trim().toLowerCase() : ANONYMOUS_MEMBER_SESSION.email,
    name: typeof session.name === "string" && session.name.trim() ? session.name : ANONYMOUS_MEMBER_SESSION.name,
    profileComplete: isPrivilegedRole(normalizedRole) ? true : toBoolean(session.profileComplete),
    emailVerified: isPrivilegedRole(normalizedRole) ? true : toBoolean(session.emailVerified),
    reviewStatus: normalizedReviewStatus
  };
}

export function serializeMemberSession(session: MemberSessionState) {
  return JSON.stringify(session);
}

export function canAccessSignedIn(session: MemberSessionState) {
  return session.role !== "guest";
}

export function canAccessVerified(session: MemberSessionState) {
  return canAccessSignedIn(session) && (isPrivilegedRole(session.role) || session.emailVerified);
}

export function canAccessProfileComplete(session: MemberSessionState) {
  return canAccessVerified(session) && (isPrivilegedRole(session.role) || session.profileComplete);
}

export function resolveAccessLevelByRole(role: AppRole): ContentAccessLevel {
  if (role === "guest") {
    return "guest";
  }

  if (role === "member") {
    return "registered";
  }

  if (role === "verified_member") {
    return "reviewed";
  }

  if (role === "internal_member") {
    return "internal";
  }

  return "admin";
}

function compareAccessLevel(level: ContentAccessLevel) {
  if (level === "guest") {
    return 1;
  }

  if (level === "registered") {
    return 2;
  }

  if (level === "reviewed") {
    return 3;
  }

  if (level === "internal") {
    return 4;
  }

  return 5;
}

export function canAccessReviewed(session: MemberSessionState) {
  const currentLevel = resolveAccessLevelByRole(session.role);

  if (compareAccessLevel(currentLevel) < compareAccessLevel("reviewed")) {
    return false;
  }

  if (session.role === "verified_member") {
    return canAccessProfileComplete(session) && session.reviewStatus === "approved";
  }

  return canAccessSignedIn(session);
}

export function canSubmitReviewRequest(session: MemberSessionState) {
  return (
    canAccessProfileComplete(session) &&
    session.role === "member" &&
    (session.reviewStatus === "not_requested" || session.reviewStatus === "rejected")
  );
}

export function hasPendingReview(session: MemberSessionState) {
  return session.role === "member" && canAccessProfileComplete(session) && session.reviewStatus === "pending";
}

export function canProcessReviewDecision(session: MemberSessionState) {
  return session.role === "internal_member" || session.role === "admin";
}

export function getMemberRouteRequirement(path: string): MemberRouteRequirement | null {
  const normalized = normalizePath(path);

  if (!normalized.startsWith("/member")) {
    return null;
  }

  if (OPEN_MEMBER_ROUTES.includes(normalized as "/member/login" | "/member/register" | "/member/verify")) {
    return null;
  }

  const match = memberRouteRequirements
    .slice()
    .sort((first, second) => second.path.length - first.path.length)
    .find((item) => normalized === item.path || normalized.startsWith(`${item.path}/`));

  return match?.requirement ?? "signed_in";
}

export function passesMemberRequirement(session: MemberSessionState, requirement: MemberRouteRequirement | null) {
  if (!requirement) {
    return true;
  }

  if (requirement === "signed_in") {
    return canAccessSignedIn(session);
  }

  if (requirement === "email_verified") {
    return canAccessVerified(session);
  }

  if (requirement === "reviewed") {
    return canAccessReviewed(session);
  }

  return canAccessProfileComplete(session);
}

export function canAccessContent(session: MemberSessionState, requiredAccessLevel: ContentAccessLevel): boolean {
  const sessionAccessLevel =
    session.role === "verified_member" && !canAccessReviewed(session)
      ? "registered"
      : resolveAccessLevelByRole(session.role);

  return compareAccessLevel(sessionAccessLevel) >= compareAccessLevel(requiredAccessLevel);
}

const ALLOWED_LOCALES: OmdalatLocale[] = ["vi", "en"];

export function isAllowedLocale(value: string | undefined | null): value is OmdalatLocale {
  return Boolean(value && ALLOWED_LOCALES.includes(value as OmdalatLocale));
}

export function normalizeMemberPath(path: string) {
  if (!path.startsWith("/")) {
    return `/${path}`;
  }

  return path;
}

export function localizeMemberPath(path: string, locale: OmdalatLocale): string {
  return localizePath(normalizeMemberPath(path), locale);
}

export function ensureRelativePath(path: string | undefined | null): string {
  if (!path || !path.startsWith("/")) {
    return "/member";
  }

  if (path.startsWith("//")) {
    return "/member";
  }

  return path;
}

export function buildRelativeReturnPath(path: string | undefined | null, fallback = "/member") {
  const normalized = ensureRelativePath(path);

  if (!normalized || normalized.includes("..")) {
    return fallback;
  }

  return normalized;
}

export function gatePathForRequirement(requirement: MemberRouteRequirement, locale: OmdalatLocale, nextPath: string): string {
  if (requirement === "signed_in") {
    return `${localizeMemberPath("/member/login", locale)}?next=${encodeURIComponent(nextPath)}`;
  }

  if (requirement === "email_verified") {
    return `${localizeMemberPath("/member/verify", locale)}?next=${encodeURIComponent(nextPath)}`;
  }

  if (requirement === "reviewed") {
    return `${localizeMemberPath("/member/application-status", locale)}?required=reviewed-member&next=${encodeURIComponent(nextPath)}`;
  }

  return `${localizeMemberPath("/member/profile", locale)}?required=profile-complete&next=${encodeURIComponent(nextPath)}`;
}
