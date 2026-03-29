import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function ExpertsPage() {
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Experts operating layer"
      description="Internal route backed by expert specialty, availability, and signal quality from the shared data layer."
      highlights={snapshot.experts.map(
        (expert) => `${expert.name} · ${expert.specialty} · ${expert.availability}`
      )}
      nextStep={`Expert records now exist in app runtime. Next, enrich request matching with response-quality and proof history.`}
    />
  );
}
