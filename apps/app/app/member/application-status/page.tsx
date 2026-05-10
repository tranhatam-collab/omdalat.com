import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { getCurrentMember } from "../../../lib/auth";
import { getStatusLabel, getStatusNote, getNextStep } from "../../../lib/member-flow";
import { getRequestLocale } from "../../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../../lib/metadata";

type ApplicationStatusPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Trạng thái hồ sơ thành viên",
      en: "Member application status"
    },
    description: {
      vi: "Xem hồ sơ của bạn đang ở bước nào và cần làm gì tiếp theo.",
      en: "See which stage your profile is in and what comes next."
    },
    path: "/member/application-status"
  });
}

export default async function ApplicationStatusPage({ searchParams }: ApplicationStatusPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const memberStatus = currentMember.memberStatus ?? "guest";
  const nextStep = getNextStep(memberStatus);
  const nextStepLabel = isVi ? nextStep.label.vi : nextStep.label.en;
  const nextStepDescription = isVi ? nextStep.description.vi : nextStep.description.en;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const submitted = readSearchParamValue(resolvedSearchParams.submitted);
  const required = readSearchParamValue(resolvedSearchParams.required);
  const nextPath = readSearchParamValue(resolvedSearchParams.next) || localizePath("/dashboard", locale);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Trạng thái hồ sơ" : "Application status"}</p>
      <h1>{isVi ? "Hồ sơ của bạn đang ở bước nào" : "See which step your profile is currently in"}</h1>
      <p>{getStatusNote(memberStatus, locale)}</p>

      {submitted ? (
        <div className="app-status app-status--success">
          {isVi
            ? "Hồ sơ của bạn đã được ghi nhận. Chúng tôi sẽ đọc kỹ trước khi phản hồi."
            : "Your application has been received. We will read it carefully before responding."}
        </div>
      ) : null}

      {required === "reviewed-member" ? (
        <div className="app-status app-status--info">
          {isVi
            ? "Route trước đó cần một lớp đã đi qua review hoặc trial."
            : "The previous route requires a layer that has already passed review or entered trial."}
        </div>
      ) : null}

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Trạng thái của bạn" : "Your current status"}</p>
          <h2>{getStatusLabel(memberStatus, locale)}</h2>
          <ul className="app-list">
            <li>{currentMember.name}</li>
            <li>{currentMember.email || (isVi ? "Chưa có email" : "No email yet")}</li>
            <li>{currentMember.zone}</li>
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Bước tiếp theo" : "Next step"}</p>
          <h2>{nextStepLabel}</h2>
          <p>{nextStepDescription}</p>
          <div className="app-inline-actions">
            <a className="app-button" href={localizePath(nextStep.href, locale)}>
              {nextStepLabel}
            </a>
            <a className="app-button app-button-secondary" href={nextPath}>
              {isVi ? "Quay lại bước trước" : "Return to the previous step"}
            </a>
          </div>
        </section>
      </div>
    </section>
  );
}
