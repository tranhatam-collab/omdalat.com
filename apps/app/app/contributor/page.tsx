import type { Metadata } from "next";
import { getCurrentMember } from "../../lib/auth";
import { listContributorAssignments } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Không gian người đóng góp",
      en: "Contributor workspace"
    },
    description: {
      vi: "Nhận bài, theo dõi feedback, xem nhuận bút và trạng thái publish.",
      en: "Take assignments, track feedback, view compensation, and follow publishing status."
    },
    path: "/contributor"
  });
}

export default async function ContributorPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const assignments = listContributorAssignments(currentMember.id);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Người đóng góp" : "Contributor"}</p>
      <h1>{isVi ? "Những việc bạn đang nhận" : "The assignments you are carrying"}</h1>
      <p>
        {isVi
          ? "Dành cho writer, photographer, video editor, translator, local researcher và social content creator."
          : "For writers, photographers, video editors, translators, local researchers, and social content creators."}
      </p>

      <div className="app-stack">
        {assignments.map((assignment) => (
          <section className="app-panel" key={assignment.id}>
            <p className="app-kicker">{locale === "vi" ? assignment.kind_vi : assignment.kind_en}</p>
            <h2>{locale === "vi" ? assignment.title_vi : assignment.title_en}</h2>
            <ul className="app-list">
              <li>{assignment.status}</li>
              <li>{locale === "vi" ? assignment.pay_vi : assignment.pay_en}</li>
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
