export type AppRole = "guest" | "member" | "verified_member";

export type MemberSession = {
  name: string;
  role: AppRole;
  homeNode: string;
  status: string;
  zone: string;
};

export type RoleSummary = {
  role: AppRole;
  summary: string;
};
