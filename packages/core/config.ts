import type { RoleSummary } from "../types";

export const siteConfig = {
  name: "OMDALAT",
  city: "Da Lat",
  publicOrigin: "https://omdalat.com",
  appOrigin: "https://app.omdalat.com"
} as const;

export const roleSummaries: RoleSummary[] = [
  {
    role: "guest",
    summary: "Read-only access to public city activity and trust explanations."
  },
  {
    role: "member",
    summary: "Can track local nodes, requests, and proofs inside the operating layer."
  },
  {
    role: "verified_member",
    summary: "Unlocks higher-trust workflows, proof actions, and richer visibility."
  }
];

export const permissionHighlights = [
  "View local activity and trust state",
  "Review proof-backed interactions",
  "Track requests, hosts, experts, and communities",
  "Prepare moderation-safe local workflows"
];
