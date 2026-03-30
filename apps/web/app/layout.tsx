import type { Metadata } from "next";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { absoluteUrl } from "../lib/canonical";
import { getCurrentLocalizedPathname, getLocaleSwitchLinks, getRequestLocale } from "../lib/locale";
import { defaultWebMetadata } from "../lib/metadata";
import "../styles/globals.css";

export const runtime = "edge";

export const metadata: Metadata = defaultWebMetadata;

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();
  const { viHref, enHref } = await getLocaleSwitchLinks();
  const currentPathname = await getCurrentLocalizedPathname();

  return (
    <html lang={locale === "vi" ? "vi" : "en"}>
      <head>
        <meta name="theme-color" content="#0f3d2e" />
        <link rel="canonical" href={absoluteUrl(currentPathname)} />
        <link rel="alternate" hrefLang="vi" href={absoluteUrl(viHref)} />
        <link rel="alternate" hrefLang="en" href={absoluteUrl(enHref)} />
        <link rel="alternate" hrefLang="x-default" href={absoluteUrl(viHref)} />
      </head>
      <body className="runtime-theme">
        <div className="runtime-shell">
          <Header />
          <main className="runtime-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
