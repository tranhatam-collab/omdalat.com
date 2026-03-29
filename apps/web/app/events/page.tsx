import { PageScaffold } from "../../components/shared/PageScaffold";

export default function EventsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Events in OMDALAT"
      description="Public route shell for upcoming activity and public-facing event context."
      highlights={["Event listing shell", "Schedule-first framing", "Future Event detail support"]}
      nextStep="Connect upcoming activities and proof-backed event history into one route model."
    />
  );
}
