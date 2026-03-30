import { localizePath } from "../../../../packages/core";
import { SessionSwitcher } from "../../components/SessionSwitcher";
import { getCurrentMember } from "../../lib/auth";
import { formatRoleLabel, formatRoleSummary, formatSessionStatus } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { roleSummaries } from "../../lib/roles";
import { buildDashboardTrust } from "../../lib/trust";
import { getAuthFixtures } from "../../lib/auth";

export default async function ProfilePage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = getCurrentMember(locale);
  const dashboardTrust = buildDashboardTrust(locale);
  const fixtures = getAuthFixtures(locale);
  const currentRole = roleSummaries.find((item) => item.role === currentMember.role);
  const profilePath = localizePath("/profile", locale);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Runtime tài khoản" : "Account runtime"}</p>
      <h1>{isVi ? "Cài đặt hồ sơ" : "Profile settings"}</h1>
      <p>
        {isVi
          ? "Route này vận hành trên lớp xác thực demo có trạng thái. Việc chuyển phiên fixture sẽ cập nhật thành viên đang hoạt động, trạng thái trust và luồng thông báo trên toàn app."
          : "This route now runs on top of a stateful demo auth service. Switching fixture sessions updates the active member, trust posture, and notification stream across the app."}
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Phiên đang hoạt động" : "Active session"}</p>
          <h2>{currentMember.name}</h2>
          <ul className="app-list">
            <li>{currentMember.email}</li>
            <li>
              {formatRoleLabel(currentMember.role, locale)} · {currentMember.zone}
            </li>
            <li>{currentMember.homeNode}</li>
            <li>{formatSessionStatus(currentMember.status, locale)}</li>
            <li>
              {currentRole
                ? formatRoleSummary(currentRole.role, currentRole.summary, locale)
                : isVi
                  ? "Tóm tắt vai trò sẽ hiển thị tại đây."
                  : "Role summary will appear here."}
            </li>
            <li>
              {dashboardTrust.level} · {dashboardTrust.score}/100
            </li>
          </ul>
        </section>
        <SessionSwitcher currentSession={currentMember} fixtures={fixtures} redirectTo={profilePath} />
      </div>
    </section>
  );
}
