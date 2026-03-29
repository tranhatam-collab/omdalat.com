import { AppScaffold } from "../../components/AppScaffold";

export default function ExpertsPage() {
  return (
    <AppScaffold
      eyebrow="App route shell"
      title="Experts operating layer"
      description="Internal route shell for expert discovery, signal quality, and local participation state."
      highlights={[
        "Expert profile queue",
        "Specialty and locality filters",
        "Trust-backed opportunity linkage"
      ]}
      nextStep="Connect expert data to requests, proofs, and response-quality metrics."
    />
  );
}
