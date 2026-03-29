import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Events in OMDALAT",
  description: "Real activity and gatherings in Da Lat.",
  path: "/events"
});

export default function EventsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Events in OMDALAT"
      description="Public route shell for upcoming activity and public-facing event context."
      highlights={["Event listing shell", "Schedule-first framing", "Future Event detail support"]}
      nextStep="Connect upcoming activities and proof-backed event history into one route model."
      path="/events"
    />
  );
}
