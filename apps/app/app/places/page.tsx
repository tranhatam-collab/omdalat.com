import { AppScaffold } from "../../components/AppScaffold";

export default function PlacesPage() {
  return (
    <AppScaffold
      eyebrow="App route shell"
      title="Places operating layer"
      description="Internal route shell for tracking city places, readiness, proof volume, and trust-backed local context."
      highlights={[
        "Place roster view",
        "Future moderation and verification state",
        "Linked proof and request history"
      ]}
      nextStep="Connect place records to shared types and local trust summaries."
    />
  );
}
