import type { Metadata } from "next";
import { localizePath } from "../../../packages/core";
import { AppFooter } from "../components/layout/AppFooter";
import { AppHeader } from "../components/layout/AppHeader";
import { getRequestLocale } from "../lib/locale";
import "../styles/globals.css";

export const runtime = "edge";

export const metadata: Metadata = {
  title: {
    default: "OMDALAT App Runtime | Ứng dụng OMDALAT",
    template: "%s | OMDALAT App"
  },
  description: "Runtime có xác thực cho tầng vận hành địa phương của OMDALAT.",
  applicationName: "OMDALAT App",
  metadataBase: new URL("https://app.omdalat.com"),
  alternates: {
    canonical: localizePath("/"),
    languages: {
      vi: localizePath("/", "vi"),
      en: localizePath("/", "en"),
      "x-default": localizePath("/")
    }
  },
  robots: {
    index: false,
    follow: false
  }
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();

  return (
    <html lang={locale === "vi" ? "vi" : "en"}>
      <head>
        <meta name="theme-color" content="#0f3d2e" />
      </head>
      <body className="app-theme">
        <div className="app-shell">
          <AppHeader />
          <main className="app-main">{children}</main>
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
