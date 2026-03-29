import { absoluteUrl } from "./canonical";

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
    url: absoluteUrl("/"),
    description: "Trusted places, people, and activity in Da Lat."
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OMDALAT",
    url: absoluteUrl("/"),
    inLanguage: "en"
  };
}

export function buildWebPageSchema({ title, description, path }: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: "OMDALAT",
      url: absoluteUrl("/")
    }
  };
}
