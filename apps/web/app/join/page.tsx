import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Join OMDALAT",
  description: "Entry path for people, places, and communities joining OMDALAT.",
  path: "/join"
});

export default function JoinPage() {
  return (
    <PageScaffold
      eyebrow="Entry shell"
      title="Join OMDALAT"
      description="Public onboarding shell for people, places, and communities who want to enter the city layer."
      highlights={["Participation intro", "CTA shell", "Future qualification flow"]}
      nextStep="Decide the first public onboarding funnel before connecting authenticated flows."
      path="/join"
    />
  );
}
