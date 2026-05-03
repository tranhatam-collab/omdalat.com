import type { RoleSummary } from "../types";

function normalizeOrigin(value: string | undefined, fallback: string) {
  const trimmed = value?.trim();
  if (!trimmed) return fallback;
  return trimmed.replace(/\/+$/, "");
}

function readOrigin(envNames: string[], fallback: string) {
  for (const name of envNames) {
    const value = process.env[name];
    if (value && value.trim()) {
      return normalizeOrigin(value, fallback);
    }
  }

  return fallback;
}

const publicOrigin = readOrigin(["NEXT_PUBLIC_WEB_ORIGIN", "OMDALAT_PUBLIC_ORIGIN"], "https://omdalat.com");
const appOrigin = readOrigin(["NEXT_PUBLIC_APP_ORIGIN", "OMDALAT_APP_ORIGIN"], "https://app.omdalat.com");
const apOrigin = readOrigin(["NEXT_PUBLIC_AP_ORIGIN", "OMDALAT_AP_ORIGIN"], "https://ap.omdalat.com");
const docsOrigin = readOrigin(["NEXT_PUBLIC_DOCS_ORIGIN", "OMDALAT_DOCS_ORIGIN"], publicOrigin);
const authOrigin = readOrigin(["NEXT_PUBLIC_AUTH_ORIGIN", "OMDALAT_AUTH_ORIGIN"], appOrigin);
const authCookieDomain = process.env.OMDALAT_AUTH_COOKIE_DOMAIN?.trim() || ".omdalat.com";
const appRuntimeName = process.env.OMDALAT_APP_RUNTIME_NAME?.trim() || "omdalat-app";

export const siteConfig = {
  name: "Om Dalat",
  nameVi: "Ôm Đà Lạt",
  nameEn: "Om Dalat",
  city: "Da Lat",
  publicOrigin,
  docsOrigin,
  appOrigin,
  apOrigin,
  authOrigin,
  authCookieDomain,
  appRuntimeName
} as const;

export const roleSummaries: RoleSummary[] = [
  {
    role: "guest",
    summary: "Reads the public site, articles, and starting guides."
  },
  {
    role: "member",
    summary: "Accesses the member layer after creating a basic profile."
  },
  {
    role: "verified_member",
    summary: "Unlocks deeper resources after review and fit confirmation."
  },
  {
    role: "internal_member",
    summary: "Reviews member flow, works with internal operations, and manages deeper handbook layers."
  },
  {
    role: "admin",
    summary: "Has full access across public, member, and internal operational surfaces."
  }
];

export const permissionHighlights = [
  "Read public guides and living system pages",
  "Complete a member profile and follow the review flow",
  "Access deeper resources based on role and fit",
  "Move from public understanding into real participation"
];
