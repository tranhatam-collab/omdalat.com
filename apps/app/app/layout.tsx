import type { Metadata } from "next";
import { getLocaleDescriptor, getPublicLocaleDescriptors, localizePath, siteConfig } from "../../../packages/core";
import { AppFooter } from "../components/layout/AppFooter";
import { AppHeader } from "../components/layout/AppHeader";
import { AppNav } from "../components/layout/AppNav";
import { getRequestLocale } from "../lib/locale";
import { appOgImage } from "../lib/visuals";
import "../styles/globals.css";

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    default: "Om Dalat App | Member and Operations Workspace",
    template: "%s | Om Dalat App"
  },
  description: "Không gian thành viên và vận hành của Ôm Đà Lạt cho dashboard, handbook, hồ sơ tham gia và các luồng nội bộ.",
  applicationName: "Om Dalat App",
  metadataBase: new URL(siteConfig.appOrigin),
  alternates: {
    canonical: localizePath("/"),
    languages: {
      ...Object.fromEntries(
        getPublicLocaleDescriptors().map((descriptor) => [descriptor.hreflang, localizePath("/", descriptor.code)])
      ),
      "x-default": localizePath("/")
    }
  },
  openGraph: {
    title: "Om Dalat App | Member and Operations Workspace",
    description: "Không gian thành viên và vận hành của Ôm Đà Lạt.",
    url: localizePath("/"),
    siteName: "Om Dalat App",
    images: [
      {
        url: appOgImage.src,
        width: appOgImage.width,
        height: appOgImage.height,
        alt: appOgImage.alt.vi
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Dalat App | Member and Operations Workspace",
    description: "Không gian thành viên và vận hành của Ôm Đà Lạt.",
    images: [appOgImage.src]
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();
  const localeDescriptor = getLocaleDescriptor(locale);

  return (
    <html lang={localeDescriptor.htmlLang}>
      <head>
        <meta name="theme-color" content="#0f3d2e" />
      </head>
      <body className="app-theme">
        <div className="app-shell">
          <AppHeader />
          <div className="app-workspace">
            <AppNav />
            <main className="app-main">{children}</main>
          </div>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
