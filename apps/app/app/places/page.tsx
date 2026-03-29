import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function PlacesPage() {
  const snapshot = getDashboardSnapshot();
  const openRequests = snapshot.requests.filter((request) => request.status === "Open").length;

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Places operating layer"
      description="Internal route backed by live place records, node readiness, and request-aware local context."
      highlights={snapshot.places.map(
        (place) => `${place.name} · ${place.mode} · ${place.activity} · ${place.signal}`
      )}
      nextStep={`${openRequests} open requests can now be routed against ${snapshot.places.length} tracked places with real shared data.`}
    />
  );
}
