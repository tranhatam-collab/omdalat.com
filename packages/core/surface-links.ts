import { siteConfig } from "./config";
import { localizePath, type OmdalatLocale } from "./i18n";

type SurfaceSource = "om" | "app";

type TrackingInput = {
  source: SurfaceSource;
  entry: string;
};

function buildTrackedSurfaceUrl(origin: string, path: string, locale: OmdalatLocale, tracking: TrackingInput) {
  const url = new URL(localizePath(path, locale), origin);
  url.searchParams.set("from", tracking.source);
  url.searchParams.set("entry", tracking.entry);
  url.searchParams.set("utm_source", tracking.source === "om" ? "omdalat-web" : "omdalat-app");
  url.searchParams.set("utm_medium", "bridge");
  url.searchParams.set("utm_campaign", "surface-handoff");
  return url.toString();
}

export function buildOmToAppUrl(path: string, locale: OmdalatLocale, entry: string) {
  return buildTrackedSurfaceUrl(siteConfig.appOrigin, path, locale, { source: "om", entry });
}

export function buildAppToOmUrl(path: string, locale: OmdalatLocale, entry: string) {
  return buildTrackedSurfaceUrl(siteConfig.publicOrigin, path, locale, { source: "app", entry });
}

// Transitional aliases for existing imports.
export function buildOmToApUrl(path: string, locale: OmdalatLocale, entry: string) {
  return buildOmToAppUrl(path, locale, entry);
}

export function buildApToOmUrl(path: string, locale: OmdalatLocale, entry: string) {
  return buildAppToOmUrl(path, locale, entry);
}
