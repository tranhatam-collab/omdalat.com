import type { MetadataRoute } from "next";
import { contextRoutes, getPublicLocaleDescriptors, localizePath, primaryRoutes } from "../../../packages/core";
import { absoluteUrl } from "../lib/canonical";

const supplementalRoutes = [
  "/contact",
  "/docs/getting-started",
  "/docs/how-it-works",
  "/docs/community-rules",
  "/docs/stay-guide",
  "/docs/work-guide",
  "/docs/faq"
] as const;

const indexableRoutes = Array.from(
  new Set<string>(["/", ...primaryRoutes.map((route) => route.href), ...contextRoutes.map((route) => route.href), ...supplementalRoutes])
);

export default function sitemap(): MetadataRoute.Sitemap {
  const publicLocales = getPublicLocaleDescriptors();
  const alternatesByRoute = Object.fromEntries(
    indexableRoutes.map((route) => [
      route,
      Object.fromEntries(
        publicLocales.map((locale) => [locale.hreflang, absoluteUrl(localizePath(route, locale.code))])
      )
    ])
  );

  return indexableRoutes.flatMap((route) =>
    publicLocales.map((locale) => ({
      url: absoluteUrl(localizePath(route, locale.code)),
      lastModified: new Date("2026-04-19T09:30:00+07:00"),
      changeFrequency: route === "/" ? "weekly" : primaryRoutes.some((item) => item.href === route) ? "weekly" : "monthly",
      priority: route === "/" ? 1 : primaryRoutes.some((item) => item.href === route) ? 0.8 : 0.6,
      alternates: {
        languages: alternatesByRoute[route]
      }
    }))
  );
}
