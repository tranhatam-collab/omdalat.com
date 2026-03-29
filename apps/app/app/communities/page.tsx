import { AppScaffold } from "../../components/AppScaffold";

export default function CommunitiesPage() {
  return (
    <AppScaffold
      eyebrow="App route shell"
      title="Communities operating layer"
      description="Internal route shell for community nodes, member activity, and proof-backed local coordination."
      highlights={[
        "Community roster placeholder",
        "Activity density tracking",
        "Future shared trust snapshots"
      ]}
      nextStep="Add community cards linked to events, requests, and role permissions."
    />
  );
}
