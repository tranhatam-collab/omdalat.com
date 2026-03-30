import { absoluteUrl } from "./canonical";
import { localizePath } from "../../../packages/core";

type WebPageSchemaInput = {
  title: string;
  description: string;
  path: string;
};

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OMDALAT",
    url: absoluteUrl(localizePath("/")),
    description: "Trusted places, people, and activity in Da Lat."
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OMDALAT",
    url: absoluteUrl(localizePath("/")),
    inLanguage: ["vi-VN", "en"]
  };
}

export function buildWebPageSchema({ title, description, path }: WebPageSchemaInput) {
  const pagePath = path.startsWith("/") ? path : `/${path}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(pagePath),
    isPartOf: {
      "@type": "WebSite",
      name: "OMDALAT",
      url: absoluteUrl(localizePath("/"))
    }
  };
}
