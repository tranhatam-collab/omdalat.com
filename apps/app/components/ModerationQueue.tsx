import { EmptyState, Section } from "../../../packages/ui";
import type { ProofRecord } from "../../../packages/types";
import { reviewProofAction } from "../app/actions";
import { pickLocalized } from "../lib/i18n-copy";
import { getRequestLocale } from "../lib/locale";

type ModerationQueueProps = {
  proofs: ProofRecord[];
  redirectTo?: string;
};

export async function ModerationQueue({ proofs, redirectTo = "/proofs" }: ModerationQueueProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";

  return (
    <Section className="app-panel">
      <p className="app-kicker">{isVi ? "Hàng đợi moderation" : "Moderation queue"}</p>
      <h2>{isVi ? "Rà soát các bằng chứng ảnh hưởng trust" : "Review trust-impacting proofs"}</h2>
      {proofs.length === 0 ? (
        <EmptyState
          className="app-empty-state"
          title={isVi ? "Không có mục moderation chờ xử lý" : "No pending moderation"}
          detail={
            isVi
              ? "Các bằng chứng đã được chấp nhận và trạng thái moderation sạch nên hàng đợi đang trống."
              : "Accepted proofs and clean moderation state mean the queue is empty."
          }
        />
      ) : (
        <div className="app-stack">
          {proofs.map((proof) => (
            <div className="app-action-card" key={proof.id}>
              <div className="app-action-copy">
                <p className="app-card-meta">
                  {pickLocalized(locale, proof.kind)} · {proof.reviewStatus} · {proof.subjectName}
                </p>
                <h3>{proof.title}</h3>
                <p>{pickLocalized(locale, proof.outcome)}</p>
                <p>{pickLocalized(locale, proof.evidence)}</p>
              </div>
              <form action={reviewProofAction} className="app-form app-form-compact">
                <input type="hidden" name="proofId" value={proof.id} />
                <input type="hidden" name="redirectTo" value={redirectTo} />
                <label className="app-field">
                  <span>{isVi ? "Ghi chú moderation" : "Moderation note"}</span>
                  <input className="app-input" name="note" defaultValue={proof.moderationNote ?? ""} />
                </label>
                <div className="app-inline-actions">
                  <button className="app-button" name="decision" type="submit" value="accepted">
                    {isVi ? "Chấp nhận" : "Accept"}
                  </button>
                  <button className="app-button app-button-secondary" name="decision" type="submit" value="flagged">
                    {isVi ? "Đánh dấu" : "Flag"}
                  </button>
                  <button className="app-button app-button-ghost" name="decision" type="submit" value="rejected">
                    {isVi ? "Từ chối" : "Reject"}
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
