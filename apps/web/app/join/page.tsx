import { PageScaffold } from "../../components/shared/PageScaffold";

export default function JoinPage() {
  return (
    <PageScaffold
      eyebrow="Entry shell"
      title="Join OMDALAT"
      description="Public onboarding shell for people, places, and communities who want to enter the city layer."
      highlights={["Participation intro", "CTA shell", "Future qualification flow"]}
      nextStep="Decide the first public onboarding funnel before connecting authenticated flows."
    />
  );
}
