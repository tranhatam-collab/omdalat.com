import { ModerationQueue } from "../../components/ModerationQueue";
import { ProofCard } from "../../components/ProofCard";
import { ProofSubmissionForm } from "../../components/ProofSubmissionForm";
import { getDashboardSnapshot, getModerationQueue } from "../../lib/runtime-data";
import { buildDashboardTrust } from "../../lib/trust";

export default function ProofsPage() {
  const snapshot = getDashboardSnapshot();
  const moderationQueue = getModerationQueue();
  const dashboardTrust = buildDashboardTrust();

  return (
    <section className="app-page">
      <p className="app-kicker">Proof runtime</p>
      <h1>Proofs operating layer</h1>
      <p>
        This route now supports real demo write flows: submit a proof, review it through moderation,
        and watch the trust layer respond on refresh.
      </p>

      <div className="app-page-grid">
        <ProofSubmissionForm defaultSubjectName={snapshot.places[0]?.name ?? "Lake Edge Signal Loop"} redirectTo="/proofs" />
        <section className="app-panel">
          <p className="app-kicker">Trust status</p>
          <h2>{dashboardTrust.level}</h2>
          <ul className="app-list">
            <li>{dashboardTrust.summary}</li>
            <li>Verification state: {dashboardTrust.verificationState}</li>
            <li>Proof count: {dashboardTrust.proofCount}</li>
            <li>Moderation state: {dashboardTrust.moderationState}</li>
          </ul>
        </section>
      </div>

      <div className="app-page-grid">
        <ModerationQueue proofs={moderationQueue} redirectTo="/proofs" />
        <section className="app-panel">
          <p className="app-kicker">Ledger snapshot</p>
          <h2>Recent proofs</h2>
          <div className="app-stack">
            {snapshot.proofs.slice(0, 4).map((proof) => (
              <ProofCard
                key={proof.id}
                title={`${proof.title} · ${proof.reviewStatus}`}
                detail={`${proof.subjectName} · ${proof.evidence}`}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
