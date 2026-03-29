import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Proofs in OMDALAT",
  description: "Proof-backed activity and visible evidence in Da Lat.",
  path: "/proofs"
});

export default function ProofsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Proofs in OMDALAT"
      description="Public route shell for visible proof and evidence-backed activity."
      highlights={["Proof listing shell", "Evidence-first framing", "Future entity linking"]}
      nextStep="Connect proof data to the related places, hosts, communities, and events."
      path="/proofs"
    />
  );
}
