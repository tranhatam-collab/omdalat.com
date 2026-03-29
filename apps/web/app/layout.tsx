import type { Metadata } from "next";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { defaultWebMetadata } from "../lib/metadata";
import "../styles/globals.css";

export const metadata: Metadata = defaultWebMetadata;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0f3d2e" />
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
