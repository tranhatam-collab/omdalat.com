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
  title: "OMDALAT - Living technology city layer for trusted work and proof",
  description:
    "OMDALAT is the first city operating layer under OMDALA, coordinating people, places, skills, requests, and proof in Da Lat.",
  path: "/"
});
