import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function CommunitiesPage() {
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Communities operating layer"
      description="Internal route backed by community cadence, focus, and local signal density."
      highlights={snapshot.communities.map(
        (community) => `${community.name} · ${community.cadence} · ${community.signal}`
      )}
      nextStep={`Community nodes now share one runtime dataset with events and requests. Next, add richer member and role permissions.`}
    />
  );
}
