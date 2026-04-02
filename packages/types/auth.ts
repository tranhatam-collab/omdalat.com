export type AppRole = "guest" | "member" | "verified_member";

export type MemberSession = {
  id: string;
  name: string;
  email: string;
  role: AppRole;
  homeNode: string;
  homeNodeSlug: string;
  status: string;
  zone: string;
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
