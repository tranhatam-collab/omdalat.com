import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Communities in OMDALAT",
  description: "Trusted local communities and circles in Da Lat.",
  path: "/communities"
});

export default function CommunitiesPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Communities in OMDALAT"
      description="Public route shell for real local groups, circles, and network layers."
      highlights={["Community listing shell", "Context-first intro copy", "Future event linkage"]}
      nextStep="Add community entities and connect each one to places, events, and proofs."
      path="/communities"
    />
  );
}
