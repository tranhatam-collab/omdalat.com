import type { Metadata } from "next";
import { absoluteUrl } from "./canonical";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function buildPageMetadata({ title, description, path, noindex = false }: MetadataInput): Metadata {
  return {
    title,
    description,
    applicationName: "OMDALAT",
    metadataBase: new URL(absoluteUrl("/")),
    alternates: {
      canonical: path
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "OMDALAT",
      type: "website",
      images: [
        {
          url: absoluteUrl("/og/omdalat-runtime.svg"),
          width: 1200,
          height: 630,
          alt: "OMDALAT"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/og/omdalat-runtime.svg")]
    },
    icons: {
      icon: "/icons/icon.svg"
    },
    robots: noindex
      ? {
          index: false,
          follow: false
        }
      : {
          index: true,
          follow: true
        }
  };
}

export const defaultWebMetadata = buildPageMetadata({
  title: "OMDALAT — The First Living Intelligence City in Da Lat",
  description: "Trusted places, people, and activity in Da Lat.",
  path: "/"
});
