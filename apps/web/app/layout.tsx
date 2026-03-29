import type { Metadata } from "next";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "OMDALAT Runtime Scaffold",
    template: "%s | OMDALAT"
  },
  description: "Stage 2 runtime scaffold for the public OMDALAT web experience.",
  applicationName: "OMDALAT",
  metadataBase: new URL("https://omdalat.com"),
  alternates: {
    canonical: "/"
  }
};

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
