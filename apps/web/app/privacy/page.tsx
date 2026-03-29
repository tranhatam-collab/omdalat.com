import { PageScaffold } from "../../components/shared/PageScaffold";

export default function PrivacyPage() {
  return (
    <PageScaffold
      eyebrow="Policy shell"
      title="Privacy"
      description="Public policy shell for privacy expectations as the city-layer product grows."
      highlights={["Policy shell", "Static page placeholder", "Future legal review slot"]}
      nextStep="Replace the shell with reviewed legal copy before any public data collection goes live."
    />
  );
}
