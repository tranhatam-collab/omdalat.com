import type { Metadata } from "next";
import { getLocaleDescriptor } from "../../../packages/core";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { WebVitalsReporter } from "../components/shared/WebVitalsReporter";
import { getRequestLocale } from "../lib/locale";
import { buildDefaultWebMetadata } from "../lib/metadata";
import "../styles/globals.css";

export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const { alternates, ...metadata } = buildDefaultWebMetadata(locale);
  return metadata;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();
  const localeDescriptor = getLocaleDescriptor(locale);

  return (
    <html lang={localeDescriptor.htmlLang}>
      <head>
        <meta name="theme-color" content="#0f3d2e" />
      </head>
      <body className="runtime-theme">
        <WebVitalsReporter />
        <div className="runtime-shell">
          <Header />
          <main className="runtime-main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
