import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Experts in OMDALAT",
  description: "Local experts and capability networks in Da Lat.",
  path: "/experts"
});

export default function ExpertsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Experts in OMDALAT"
      description="Public route shell for locally relevant expertise and capability."
      highlights={["Expert listing shell", "Locality-first copy", "Future detail route support"]}
      nextStep="Add expert profiles, related communities, and internal links to events or proofs."
      path="/experts"
    />
  );
}
