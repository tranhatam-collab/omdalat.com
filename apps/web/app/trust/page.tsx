import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Trust in OMDALAT",
  description: "How verification, proof, and visible credibility work in OMDALAT.",
  path: "/trust"
});

export default function TrustPage() {
  return (
    <PageScaffold
      eyebrow="System shell"
      title="Trust in OMDALAT"
      description="Public shell for how verification, proof, and visible credibility work in the city layer."
      highlights={["Trust overview", "Verification placeholder", "Future proof linkage"]}
      nextStep="Turn this into the canonical trust explanation page for public SEO and onboarding."
      path="/trust"
    />
  );
}
