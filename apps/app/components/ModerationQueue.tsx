import { EmptyState, Section } from "../../../packages/ui";
import type { ProofRecord } from "../../../packages/types";
import { reviewProofAction } from "../app/actions";

type ModerationQueueProps = {
  proofs: ProofRecord[];
  redirectTo?: string;
};

export function ModerationQueue({ proofs, redirectTo = "/proofs" }: ModerationQueueProps) {
  return (
    <Section className="app-panel">
      <p className="app-kicker">Moderation queue</p>
      <h2>Review trust-impacting proofs</h2>
      {proofs.length === 0 ? (
        <EmptyState
          className="app-empty-state"
          title="No pending moderation"
          detail="Accepted proofs and clean moderation state mean the queue is empty."
        />
      ) : (
        <div className="app-stack">
          {proofs.map((proof) => (
            <div className="app-action-card" key={proof.id}>
              <div className="app-action-copy">
                <p className="app-card-meta">
                  {proof.kind} · {proof.reviewStatus} · {proof.subjectName}
                </p>
                <h3>{proof.title}</h3>
                <p>{proof.outcome}</p>
                <p>{proof.evidence}</p>
              </div>
              <form action={reviewProofAction} className="app-form app-form-compact">
                <input type="hidden" name="proofId" value={proof.id} />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <label className="app-field">
                  <span>Moderation note</span>
                  <input className="app-input" name="note" defaultValue={proof.moderationNote ?? ""} />
                </label>
                <div className="app-inline-actions">
                  <button className="app-button" name="decision" type="submit" value="accepted">
                    Accept
                  </button>
                  <button className="app-button app-button-secondary" name="decision" type="submit" value="flagged">
                    Flag
                  </button>
                  <button className="app-button app-button-ghost" name="decision" type="submit" value="rejected">
                    Reject
                  </button>
                </div>
              </form>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
