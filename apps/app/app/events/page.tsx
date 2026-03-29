import { AppScaffold } from "../../components/AppScaffold";

export default function EventsPage() {
  return (
    <AppScaffold
      eyebrow="App route shell"
      title="Events operating layer"
      description="Internal route shell for local events, attendance signals, and follow-up proof collection."
      highlights={[
        "Event queue placeholder",
        "Attendance and trust linkage",
        "Future booking and moderation hooks"
      ]}
      nextStep="Attach event records to proofs, requests, and community activity summaries."
    />
  );
}
