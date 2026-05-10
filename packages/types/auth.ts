export type MemberLifecycleStatus =
  | "guest"
  | "registered"
  | "profile_pending"
  | "under_review"
  | "trial"
  | "active_member"
  | "contributor"
  | "host_partner"
  | "operator"
  | "admin";

export type LegacyAppRole = "member" | "verified_member" | "internal_member";

export type AppRole = MemberLifecycleStatus | LegacyAppRole;

export type MemberSession = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  homeNode: string;
  homeNodeSlug: string;
  status: string;
  zone: string;
  memberStatus?: MemberLifecycleStatus;
};

export type RoleSummary = {
  role: AppRole;
  summary: string;
};

export type AuthFixture = {
  id: string;
  label: string;
  summary: string;
  session: MemberSession;
};
