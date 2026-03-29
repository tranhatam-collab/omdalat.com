import { AppScaffold } from "../../components/AppScaffold";

export default function HostsPage() {
  return (
    <AppScaffold
      eyebrow="App route shell"
      title="Hosts operating layer"
      description="Internal route shell for host roster, onboarding readiness, and host trust visibility."
      highlights={[
        "Host queue placeholder",
        "Trust and verification markers",
        "Linked places and local requests"
      ]}
      nextStep="Wire host cards to proof counts, role state, and trust inputs."
    />
  );
}
