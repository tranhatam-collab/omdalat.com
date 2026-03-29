import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact OMDALAT",
  description: "Contact paths, partnership intake, and support routing for OMDALAT.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <PageScaffold
      eyebrow="Support shell"
      title="Contact"
      description="Public shell for contact paths, founder intake, and partnership routing."
      highlights={["Contact shell", "Partnership pathway placeholder", "Future ops handoff"]}
      nextStep="Connect this route to the actual contact and intake workflow when ready."
      path="/contact"
    />
  );
}
