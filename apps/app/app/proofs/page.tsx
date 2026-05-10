import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { ModerationQueue } from "../../components/ModerationQueue";
import { ProofCard } from "../../components/ProofCard";
import { ProofSubmissionForm } from "../../components/ProofSubmissionForm";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";
import { getDashboardSnapshot, getModerationQueue } from "../../lib/runtime-data";
import { buildDashboardTrust } from "../../lib/trust";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Rà soát bằng chứng",
      en: "Proof Review"
    },
    description: {
      vi: "Lớp bằng chứng thành viên cho gửi mới, rà soát và cập nhật trust sau quyết định duyệt.",
      en: "Member proof layer for submission, review decisions, and trust updates."
    },
    path: "/proofs"
  });
}

export default async function ProofsPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const snapshot = getDashboardSnapshot();
  const moderationQueue = getModerationQueue();
  const dashboardTrust = buildDashboardTrust(locale);
  const proofsPath = localizePath("/proofs", locale);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Runtime bằng chứng" : "Proof runtime"}</p>
      <h1>{isVi ? "Tầng vận hành bằng chứng" : "Proofs operating layer"}</h1>
      <p>
        {isVi
          ? "Route này hỗ trợ đầy đủ luồng ghi nhận bằng chứng: gửi mới, rà soát qua moderation và theo dõi lớp trust phản hồi sau mỗi quyết định."
          : "This route supports the full proof flow: submit new proof, review it through moderation, and watch trust signals update after each decision."}
      </p>

      <div className="app-page-grid">
        <ProofSubmissionForm defaultSubjectName={snapshot.places[0]?.name ?? "Lake Edge Signal Loop"} redirectTo={proofsPath} />
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Trạng thái trust" : "Trust status"}</p>
          <h2>{dashboardTrust.level}</h2>
          <ul className="app-list">
            <li>{dashboardTrust.summary}</li>
            <li>{isVi ? "Trạng thái xác minh" : "Verification state"}: {dashboardTrust.verificationState}</li>
            <li>{isVi ? "Số lượng bằng chứng" : "Proof count"}: {dashboardTrust.proofCount}</li>
            <li>{isVi ? "Trạng thái moderation" : "Moderation state"}: {dashboardTrust.moderationState}</li>
          </ul>
        </section>
      </div>

      <div className="app-page-grid">
        <ModerationQueue proofs={moderationQueue} redirectTo={proofsPath} />
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Ảnh chụp sổ cái" : "Ledger snapshot"}</p>
          <h2>{isVi ? "Bằng chứng gần đây" : "Recent proofs"}</h2>
          <div className="app-stack">
            {snapshot.proofs.slice(0, 4).map((proof) => (
              <ProofCard
                key={proof.id}
                title={`${proof.title} · ${
                  isVi
                    ? proof.reviewStatus === "submitted"
                      ? "đã gửi"
                      : proof.reviewStatus === "accepted"
                        ? "đã chấp nhận"
                        : proof.reviewStatus === "flagged"
                          ? "đã đánh dấu"
                          : "đã từ chối"
                    : proof.reviewStatus
                }`}
                detail={`${proof.subjectName} · ${pickLocalized(locale, proof.evidence)}`}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
