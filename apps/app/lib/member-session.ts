import { cookies } from "next/headers";
import { DEFAULT_LOCALE, localizePath, type OmdalatLocale } from "../../../packages/core";
import type { AppRole, MemberLifecycleStatus, MemberSession } from "../../../packages/types";
import { getCurrentAuthSession } from "../../../services/auth/index";
import {
  canAccessContributor,
  canAccessEarnings,
  canAccessHost,
  canAccessOperator,
  ensureProfileRecord,
  getMemberProfileRecord,
  isReviewedMemberStatus,
  normalizeMemberStatus
} from "./member-flow";

export const MEMBER_SESSION_COOKIE_NAME = "omdalat-member-session" as const;
export const MEMBER_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export type MemberRouteRequirement = "signed_in" | "reviewed" | "contributor" | "host_partner" | "earnings" | "operator";

export type MemberSessionState = {
  id: string;
  email: string;
  name: string;
  role: AppRole;
  memberStatus: MemberLifecycleStatus;
  profileComplete: boolean;
  emailVerified: boolean;
};

const ANONYMOUS_MEMBER_SESSION: MemberSessionState = {
  id: "guest-demo",
  email: "",
  name: "Guest",
  role: "guest",
  memberStatus: "guest",
  profileComplete: false,
  emailVerified: false
};

const memberRouteRequirements: Array<{ path: string; requirement: MemberRouteRequirement }> = [
  { path: "/member/operations", requirement: "reviewed" },
  { path: "/proofs", requirement: "reviewed" },
  { path: "/profile", requirement: "signed_in" },
  { path: "/settings", requirement: "signed_in" },
  { path: "/dashboard", requirement: "signed_in" },
  { path: "/stay", requirement: "signed_in" },
  { path: "/work", requirement: "signed_in" },
  { path: "/learning", requirement: "signed_in" },
  { path: "/resources", requirement: "signed_in" },
  { path: "/earnings", requirement: "earnings" },
  { path: "/places", requirement: "host_partner" },
  { path: "/contributor", requirement: "contributor" },
  { path: "/admin", requirement: "operator" },
  { path: "/", requirement: "signed_in" }
];

const statusByLifecycle: Record<MemberLifecycleStatus, string> = {
  guest: "guest",
  registered: "registered",
  profile_pending: "profile_pending",
  under_review: "under_review",
  trial: "trial",
  active_member: "active_member",
  contributor: "contributor",
  host_partner: "host_partner",
  operator: "operator",
  admin: "admin"
};

const zoneByLifecycle: Record<MemberLifecycleStatus, string> = {
  guest: "public",
  registered: "member-onboarding",
  profile_pending: "member-onboarding",
  under_review: "member-review",
  trial: "trial-rhythm",
  active_member: "member-space",
  contributor: "contributor-lane",
  host_partner: "host-network",
  operator: "operator-desk",
  admin: "platform-control"
};

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path || "/";
}

function isAppRole(value: unknown): value is AppRole {
  return (
    value === "guest" ||
    value === "registered" ||
    value === "profile_pending" ||
    value === "under_review" ||
    value === "trial" ||
    value === "active_member" ||
    value === "contributor" ||
    value === "host_partner" ||
    value === "operator" ||
    value === "admin" ||
    value === "member" ||
    value === "verified_member" ||
    value === "internal_member"
  );
}

function toBoolean(value: unknown) {
  return value === true || value === "true" || value === 1 || value === "1";
}

function parseSessionPayload(rawValue: string | null | undefined) {
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
  const name = typeof payload.name === "string" && payload.name.trim() ? payload.name : ANONYMOUS_MEMBER_SESSION.name;
  const id = typeof payload.id === "string" && payload.id.trim() ? payload.id : `${role}-${email || "guest"}`;
  const profileComplete = toBoolean(payload.profileComplete);
  const memberStatus =
    typeof payload.memberStatus === "string"
      ? normalizeMemberStatus(payload.memberStatus, profileComplete)
      : normalizeMemberStatus(role, profileComplete);

  return {
    ...ANONYMOUS_MEMBER_SESSION,
    id,
    email,
    name,
    role,
    memberStatus,
    profileComplete: memberStatus === "registered" ? false : profileComplete || memberStatus !== "guest",
    emailVerified: memberStatus === "guest" ? false : toBoolean(payload.emailVerified) || memberStatus !== "registered"
  };
}

export function fixtureSessionToState(session: MemberSession): MemberSessionState {
  const derivedStatus = normalizeMemberStatus(session.memberStatus ?? session.role, true);
  const profile = ensureProfileRecord({
    id: session.id,
    name: session.name,
    email: session.email,
    memberStatus: derivedStatus
  });

  return {
    ...ANONYMOUS_MEMBER_SESSION,
    id: session.id,
    email: session.email,
    name: session.name,
    role: session.role,
    memberStatus: profile.memberStatus,
    emailVerified: profile.memberStatus !== "registered",
    profileComplete: profile.memberStatus !== "registered"
  };
}

export function resolveMemberSessionState(rawCookieValue?: string | null) {
  if (rawCookieValue) {
    return parseMemberSession(rawCookieValue);
  }

  if (useFixtureSessionInDev()) {
    return fixtureSessionToState(getCurrentAuthSession(DEFAULT_LOCALE));
  }

  return ANONYMOUS_MEMBER_SESSION;
}

export function serializeMemberSession(session: MemberSessionState) {
  return JSON.stringify(session);
}

function mapToAppSession(session: MemberSessionState): MemberSession {
  const profile = ensureProfileRecord({
    id: session.id,
    name: session.name,
    email: session.email,
    memberStatus: session.memberStatus
  });

  return {
    id: session.id,
    email: session.email,
    name: session.name,
    role: session.role,
    memberStatus: profile.memberStatus,
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: statusByLifecycle[profile.memberStatus],
    zone: zoneByLifecycle[profile.memberStatus]
  };
}

function useFixtureSessionInDev() {
  return process.env.NODE_ENV !== "production";
}

export async function resolveMemberSessionForApp() {
  const cookieStore = await cookies();
  const cookieSession = cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value;
  return mapToAppSession(resolveMemberSessionState(cookieSession));
}

export function canAccessSignedIn(session: MemberSessionState) {
  return session.memberStatus !== "guest";
}

export function canAccessReviewed(session: MemberSessionState) {
  return canAccessSignedIn(session) && isReviewedMemberStatus(session.memberStatus);
}

export function getAppRouteRequirement(path: string): MemberRouteRequirement | null {
  const normalized = normalizePath(path);

  const match = memberRouteRequirements
    .slice()
    .sort((first, second) => second.path.length - first.path.length)
    .find((item) => normalized === item.path || normalized.startsWith(`${item.path}/`));

  return match?.requirement ?? null;
}

export function passesAppRequirement(session: MemberSessionState, requirement: MemberRouteRequirement | null) {
  if (!requirement) {
    return true;
  }

  if (requirement === "signed_in") {
    return canAccessSignedIn(session);
  }

  if (requirement === "reviewed") {
    return canAccessReviewed(session);
  }

  if (requirement === "contributor") {
    return canAccessContributor(session.memberStatus);
  }

  if (requirement === "host_partner") {
    return canAccessHost(session.memberStatus);
  }

  if (requirement === "earnings") {
    return canAccessEarnings(session.memberStatus);
  }

  return canAccessOperator(session.memberStatus);
}

export function gatePathForAppRequirement(requirement: MemberRouteRequirement, locale: OmdalatLocale, nextPath: string) {
  if (requirement === "signed_in") {
    return `${localizePath("/member/register", locale)}?next=${encodeURIComponent(nextPath)}`;
  }

  if (requirement === "reviewed") {
    return `${localizePath("/member/application-status", locale)}?required=reviewed-member&next=${encodeURIComponent(nextPath)}`;
  }

  return `${localizePath("/dashboard", locale)}?required=${encodeURIComponent(requirement)}&next=${encodeURIComponent(nextPath)}`;
}

export function resolveCurrentProfile(session: MemberSessionState) {
  return getMemberProfileRecord(session.id);
}
