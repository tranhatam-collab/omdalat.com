import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function EventsPage() {
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Events operating layer"
      description="Internal route backed by real upcoming events, hosts, and place links from the local activity dataset."
      highlights={snapshot.events.map(
        (event) => `${event.title} · ${event.date} · ${event.place} · host ${event.host}`
      )}
      nextStep={`Events now read directly from shared activity data. Next, attach attendance proof capture and moderation hooks.`}
    />
  );
}
