import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About OMDALAT",
  description: "What OMDALAT is and how the city-layer product works in Da Lat.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <PageScaffold
      eyebrow="Context shell"
      title="About OMDALAT"
      description="Public context shell for what OMDALAT is and how the city-layer product works in Da Lat."
      highlights={["Brand context", "System relationship", "Future supporting copy"]}
      nextStep="Expand this route into a high-signal explanation page with entity-rich copy."
      path="/about"
    />
  );
}
