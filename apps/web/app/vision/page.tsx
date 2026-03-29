import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT Vision",
  description: "The long-term city-layer vision, density thesis, and local activation model.",
  path: "/vision"
});

export default function VisionPage() {
  return (
    <PageScaffold
      eyebrow="Context shell"
      title="Vision"
      description="Public shell for the city-node vision, long-term density thesis, and local activation model."
      highlights={["Vision intro", "Long-form structure placeholder", "Future internal linking support"]}
      nextStep="Connect brand strategy, city-node logic, and public proof into one narrative page."
      path="/vision"
    />
  );
}
