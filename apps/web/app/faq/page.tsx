import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT FAQ",
  description: "Common questions about trust, participation, and the city-layer product.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <PageScaffold
      eyebrow="Support shell"
      title="FAQ"
      description="Public shell for common questions about the city layer, trust, and participation."
      highlights={["FAQ shell", "Search-friendly structure", "Future schema support"]}
      nextStep="Populate this route with real questions and keep it aligned with the trust page."
      path="/faq"
    />
  );
}
