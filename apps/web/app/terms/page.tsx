import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT Terms",
  description: "Terms and usage expectations for OMDALAT.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <PageScaffold
      eyebrow="Policy shell"
      title="Terms"
      description="Public policy shell for the future legal usage terms of OMDALAT."
      highlights={["Terms shell", "Policy structure placeholder", "Future legal approval slot"]}
      nextStep="Replace this shell with approved terms before public operational use."
      path="/terms"
    />
  );
}
