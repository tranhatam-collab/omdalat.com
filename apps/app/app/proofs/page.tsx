import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function ProofsPage() {
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Proofs operating layer"
      description="Internal route backed by proof objects, evidence strings, and trust-impacting outcomes from the local ledger."
      highlights={snapshot.proofs.map((proof) => `${proof.kind} · ${proof.title} · ${proof.evidence}`)}
      nextStep={`${snapshot.proofs.length} proofs already reinforce the trust layer. Next, connect them to verification actions and moderation review.`}
    />
  );
}
