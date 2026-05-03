import type { MetadataRoute } from "next";
import { getPublicLocaleDescriptors, type PublicOmdalatLocale } from "../../../packages/core";
import { absoluteUrl } from "../lib/canonical";
import { getPublishedArticleSlugs } from "../lib/content-seed";

const INDEXABLE_ROUTES = [
  "/",
  "/about",
  "/life",
  "/community",
  "/work",
  "/learning",
  "/stay",
  "/articles",
  "/contact",
  "/join",
  "/docs",
  "/privacy",
  "/terms",
  "/docs/getting-started",
  "/docs/how-it-works",
  "/docs/community-rules",
  "/docs/stay-guide",
  "/docs/work-guide",
  "/docs/faq"
] as const;

const PUBLIC_LOCALES = getPublicLocaleDescriptors();
const LAST_MODIFIED = new Date("2026-05-03T09:00:00+07:00");

function toLocalizedPath(route: string, locale: PublicOmdalatLocale) {
  if (route === "/") {
    return `/${locale}`;
  }
  return `/${locale}${route}`;
}

function buildPriority(route: string) {
  if (route === "/") {
    return 1;
  }
  if (route === "/about" || route === "/community" || route === "/work" || route === "/learning" || route === "/stay") {
    return 0.8;
  }
  return 0.6;
}

function buildChangeFrequency(route: string): MetadataRoute.Sitemap[number]["changeFrequency"] {
  if (route === "/" || route === "/about" || route === "/community" || route === "/work" || route === "/learning" || route === "/stay") {
    return "weekly";
  }
  return "monthly";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const articleRoutes = getPublishedArticleSlugs().map((slug) => `/articles/${slug}`);
  const allRoutes = [...INDEXABLE_ROUTES, ...articleRoutes];
  const alternatesByRoute = Object.fromEntries(
    allRoutes.map((route) => [
      route,
      Object.fromEntries(
        PUBLIC_LOCALES.map((descriptor) => [
          descriptor.hreflang,
          absoluteUrl(toLocalizedPath(route, descriptor.code))
        ])
      )
    ])
  );

  return allRoutes.flatMap((route) =>
    PUBLIC_LOCALES.map((descriptor) => ({
      url: absoluteUrl(toLocalizedPath(route, descriptor.code)),
      lastModified: LAST_MODIFIED,
      changeFrequency: buildChangeFrequency(route),
      priority: buildPriority(route),
      alternates: {
        languages: alternatesByRoute[route]
      }
    }))
  );
}
