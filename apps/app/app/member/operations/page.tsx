import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { getCurrentMember } from "../../../lib/auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../../lib/metadata";
import { getStatusLabel, getStatusNote } from "../../../lib/member-flow";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Không gian vận hành thành viên",
      en: "Member operations workspace"
    },
    description: {
      vi: "Không gian để thành viên đã qua review hoặc trial điều phối việc ở, việc làm và tài nguyên vận hành.",
      en: "A workspace for reviewed or trial members to coordinate stay, work, and operations resources."
    },
    path: "/member/operations"
  });
}

export default async function MemberOperationsPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const memberStatus = currentMember.memberStatus ?? "guest";

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Lớp reviewed và vận hành" : "Reviewed and operations layer"}</p>
      <h1>{isVi ? "Điều phối nhịp vận hành của bạn" : "Coordinate your operations rhythm"}</h1>
      <p>
        {isVi
          ? "Lớp này mở sau khi hồ sơ đã qua review hoặc đang trong trial. Từ đây bạn đi vào dashboard, công việc, nơi ở và tài nguyên đúng theo trạng thái hiện tại."
          : "This layer opens after review or trial. From here you can move into dashboard, work, stay, and resources according to your current status."}
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Trạng thái hiện tại" : "Current status"}</p>
          <h2>{getStatusLabel(memberStatus, locale)}</h2>
          <p>{getStatusNote(memberStatus, locale)}</p>
          <ul className="app-list">
            <li>{currentMember.name}</li>
            <li>{currentMember.email || (isVi ? "Chưa có email" : "No email yet")}</li>
            <li>{currentMember.zone}</li>
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Lối đi chính" : "Primary pathways"}</p>
          <h2>{isVi ? "Mở các khu vực vận hành" : "Open your operations surfaces"}</h2>
          <div className="app-inline-actions">
            <a className="app-button" href={localizePath("/dashboard", locale)}>
              {isVi ? "Mở dashboard" : "Open dashboard"}
            </a>
            <a className="app-button app-button-secondary" href={localizePath("/work", locale)}>
              {isVi ? "Đi vào việc làm" : "Open work"}
            </a>
            <a className="app-button app-button-secondary" href={localizePath("/stay", locale)}>
              {isVi ? "Đi vào nơi ở" : "Open stay"}
            </a>
            <a className="app-button app-button-secondary" href={localizePath("/resources", locale)}>
              {isVi ? "Mở tài nguyên" : "Open resources"}
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
