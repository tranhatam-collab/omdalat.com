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
    applicationName: "Om Dalat",
    metadataBase: new URL(absoluteUrl("/")),
    openGraph: {
      title,
      description,
      url: absoluteUrl(path),
      siteName: "Om Dalat",
      type: "website",
      images: [
        {
          url: absoluteUrl("/og/omdalat-runtime.svg"),
          width: 1200,
          height: 630,
          alt: "Om Dalat"
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
  title: "Ôm Đà Lạt | Om Dalat",
  description:
    "Một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây giá trị dài hạn.",
  path: "/"
});
