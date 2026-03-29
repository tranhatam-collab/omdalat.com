import type { Metadata } from "next";
import { AppFooter } from "../components/layout/AppFooter";
import { AppHeader } from "../components/layout/AppHeader";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "OMDALAT App Runtime",
    template: "%s | OMDALAT App"
  },
  description: "Authenticated runtime scaffold for the OMDALAT local operating layer.",
  applicationName: "OMDALAT App",
  metadataBase: new URL("https://app.omdalat.com"),
  robots: {
    index: false,
    follow: false
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
