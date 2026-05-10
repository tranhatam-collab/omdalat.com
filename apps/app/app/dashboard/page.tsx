import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { AppVisualStrip } from "../../components/AppVisualStrip";
import { getCurrentMember } from "../../lib/auth";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";
import {
  canAccessEarnings,
  getMemberProfileRecord,
  getNextStep,
  getStatusLabel,
  getStatusNote,
  listAccessibleResources,
  listEarningsForMember,
  listLearningPrograms,
  listStayOptions,
  listWorkItems
} from "../../lib/member-flow";

type DashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Bảng điều khiển thành viên",
      en: "Member Dashboard"
    },
    description: {
      vi: "Không gian để bạn nhìn rõ mình đang ở bước nào, cần làm gì tiếp theo, và có thể tạo giá trị bằng cách nào.",
      en: "A workspace to see where you are, what comes next, and how you can create real value from here."
    },
    path: "/dashboard"
  });
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const memberStatus = currentMember.memberStatus ?? "guest";
  const profile = getMemberProfileRecord(currentMember.id);
  const nextStep = getNextStep(memberStatus);
  const nextStepLabel = isVi ? nextStep.label.vi : nextStep.label.en;
  const nextStepDescription = isVi ? nextStep.description.vi : nextStep.description.en;
  const stayOptions = listStayOptions().slice(0, 3);
  const workItems = listWorkItems().filter((item) => item.status === "open").slice(0, 3);
  const programs = listLearningPrograms();
  const resources = listAccessibleResources(memberStatus);
  const earnings = listEarningsForMember(currentMember.id);
  const pendingAmount = earnings.filter((item) => item.status === "pending").reduce((sum, item) => sum + item.amount, 0);
  const paidAmount = earnings.filter((item) => item.status === "paid").reduce((sum, item) => sum + item.amount, 0);
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const required = readSearchParamValue(resolvedSearchParams.required);
  const nextPath = readSearchParamValue(resolvedSearchParams.next);

  return (
    <section className="app-page">
      <div className="app-dashboard-hero">
        <p className="app-kicker">{isVi ? "Bảng điều khiển thành viên" : "Member dashboard"}</p>
        <h1>{isVi ? "Bạn đang ở đâu trong hành trình này" : "See where you are in this journey"}</h1>
        <p>
          {isVi
            ? "Dashboard này không để trưng bày tính năng. Nó để bạn biết mình đang ở bước nào, cần làm gì tiếp theo, và có thể đi tiếp bằng giá trị thật ra sao."
            : "This dashboard is not here to show off features. It is here to tell you where you are, what comes next, and how you can move forward through real value."}
        </p>
        <AppVisualStrip locale={locale} label={isVi ? "Hình minh họa dashboard Ôm Đà Lạt" : "Om Dalat dashboard visuals"} />
        <div className="app-runtime-meter" aria-label={isVi ? "Tóm tắt trạng thái runtime" : "Runtime status summary"}>
          <span>
            <strong>{resources.length}</strong>
            {isVi ? "tài nguyên mở" : "open resources"}
          </span>
          <span>
            <strong>{workItems.length}</strong>
            {isVi ? "việc đang mở" : "open work items"}
          </span>
          <span>
            <strong>{stayOptions.length}</strong>
            {isVi ? "lựa chọn ở" : "stay options"}
          </span>
        </div>
      </div>

      {required ? (
        <div className="app-status app-status--info">
          <strong>{isVi ? "Lưu ý quyền truy cập" : "Access note"}:</strong>{" "}
          {isVi
            ? `Route trước đó cần lớp "${required}". Bạn có thể đi tiếp từ hành động chính bên dưới rồi quay lại ${nextPath ?? "sau"}.`
            : `The previous route requires the "${required}" layer. You can continue from the primary action below and return to ${nextPath ?? "it"} afterward.`}
        </div>
      ) : null}

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Trạng thái của bạn" : "Your status"}</p>
          <h2>{getStatusLabel(memberStatus, locale)}</h2>
          <p>{getStatusNote(memberStatus, locale)}</p>
          <ul className="app-list">
            <li>{profile?.full_name ?? currentMember.name}</li>
            <li>{profile?.current_location || (isVi ? "Chưa có vị trí hiện tại" : "Current location not added yet")}</li>
            <li>{profile?.planned_stay_length || (isVi ? "Chưa có thời gian ở dự kiến" : "Planned stay length not added yet")}</li>
            <li>{profile?.skills.length ? profile.skills.join(", ") : isVi ? "Chưa khai báo kỹ năng" : "No skills added yet"}</li>
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
            <a className="app-button app-button-secondary" href={localizePath("/profile", locale)}>
              {isVi ? "Mở hồ sơ của bạn" : "Open your profile"}
            </a>
          </div>
        </section>
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Nơi ở" : "Stay"}</p>
          <h2>{isVi ? "Những chỗ ở đang mở" : "Places currently open"}</h2>
          <ul className="app-list">
            {stayOptions.map((item) => (
              <li key={item.id}>
                <strong>{item.space_name}</strong> · {item.area} · {item.monthly_price} ·{" "}
                {item.status === "available" ? (isVi ? "Còn chỗ" : "Available") : item.status === "waiting" ? (isVi ? "Danh sách chờ" : "Waiting list") : isVi ? "Đã kín" : "Full"}
              </li>
            ))}
          </ul>
          <a className="app-button app-button-secondary" href={localizePath("/stay", locale)}>
            {isVi ? "Gửi nhu cầu ở lại" : "Send stay request"}
          </a>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Công việc và cơ hội" : "Work and opportunities"}</p>
          <h2>{isVi ? "Những việc đang mở" : "Open work now"}</h2>
          {workItems.length > 0 ? (
            <ul className="app-list">
              {workItems.map((item) => (
                <li key={item.id}>
                  <strong>{item.title}</strong> · {item.pay_range} · {item.deadline}
                </li>
              ))}
            </ul>
          ) : (
            <p className="app-empty-state">
              {isVi
                ? "Chưa có việc phù hợp với hồ sơ của bạn lúc này."
                : "There is no work matching your profile at the moment."}
            </p>
          )}
          <a className="app-button app-button-secondary" href={localizePath("/work", locale)}>
            {isVi ? "Xem việc phù hợp" : "Apply for this work"}
          </a>
        </section>
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Học từ thực tế" : "Learning from real life"}</p>
          <h2>{isVi ? "Chương trình thực địa" : "Real-life learning programs"}</h2>
          <ul className="app-list">
            {programs.map((program) => (
              <li key={program.id}>
                <strong>{locale === "vi" ? program.title_vi : program.title_en}</strong> · {program.duration} ·{" "}
                {locale === "vi" ? program.output_vi : program.output_en}
              </li>
            ))}
          </ul>
          <a className="app-button app-button-secondary" href={localizePath("/learning", locale)}>
            {isVi ? "Mở chương trình thực địa" : "Open learning programs"}
          </a>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Tài nguyên đã mở" : "Open resources"}</p>
          <h2>{isVi ? "Những gì bạn có thể đọc lúc này" : "What is open to you now"}</h2>
          {resources.length > 0 ? (
            <ul className="app-list">
              {resources.map((item) => (
                <li key={item.id}>
                  <strong>{locale === "vi" ? item.title_vi : item.title_en}</strong> · {locale === "vi" ? item.excerpt_vi : item.excerpt_en}
                </li>
              ))}
            </ul>
          ) : (
            <p className="app-empty-state">
              {isVi
                ? "Tài nguyên cho bước này vẫn chưa mở. Khi hồ sơ của bạn đi tiếp, những phần phù hợp sẽ hiện ra."
                : "Resources for this stage are not open yet. As your profile moves forward, the relevant sections will appear."}
            </p>
          )}
          <a className="app-button app-button-secondary" href={localizePath("/resources", locale)}>
            {isVi ? "Mở tài nguyên" : "Open resources"}
          </a>
        </section>
      </div>

      <section className="app-panel">
        <p className="app-kicker">{isVi ? "Thu nhập và đóng góp" : "Earnings and contribution"}</p>
        <h2>{isVi ? "Bạn đã tạo ra giá trị gì" : "What value you have already created"}</h2>
        {canAccessEarnings(memberStatus) ? (
          <>
            <ul className="app-list">
              <li>
                {isVi ? "Khoản đang chờ thanh toán" : "Pending payments"}: <strong>{pendingAmount.toLocaleString("vi-VN")} VND</strong>
              </li>
              <li>
                {isVi ? "Khoản đã thanh toán" : "Paid"}: <strong>{paidAmount.toLocaleString("vi-VN")} VND</strong>
              </li>
              <li>
                {isVi ? "Số dòng đóng góp đã ghi" : "Contribution records"}: <strong>{earnings.length}</strong>
              </li>
            </ul>
            <a className="app-button app-button-secondary" href={localizePath("/earnings", locale)}>
              {isVi ? "Mở thu nhập" : "Open earnings"}
            </a>
          </>
        ) : (
          <p className="app-empty-state">
            {isVi
              ? "Khi bạn đi tiếp tới lớp thành viên hoặc contributor, mục thu nhập và đóng góp sẽ mở ra."
              : "As you move deeper into the member or contributor layer, earnings and contribution will open here."}
          </p>
        )}
      </section>
    </section>
  );
}
