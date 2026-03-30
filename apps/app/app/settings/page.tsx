import { OMDALAT_INBOXES, localizePath } from "../../../../packages/core";
import { SupportRequestForm } from "../../components/SupportRequestForm";
import { NotificationFeed } from "../../components/NotificationFeed";
import { getAuthNotice, getCurrentMember } from "../../lib/auth";
import { formatPermissionHighlight, formatRoleLabel } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { listNotifications } from "../../lib/notifications";
import { permissionHighlights } from "../../lib/roles";
import { buildDashboardTrust, buildProofHighlights } from "../../lib/trust";

export default async function SettingsPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = getCurrentMember(locale);
  const dashboardTrust = buildDashboardTrust(locale);
  const proofHighlights = buildProofHighlights(locale);
  const notifications = listNotifications(locale);
  const settingsPath = localizePath("/settings", locale);
  const authNotice = getAuthNotice(locale);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Runtime tài khoản" : "Account runtime"}</p>
      <h1>{isVi ? "Cài đặt hệ thống" : "System settings"}</h1>
      <p>
        {isVi
          ? "Route này đọc từ phiên xác thực hiện tại và dịch vụ thông báo, vì vậy thay đổi trong demo sẽ phản ánh trực tiếp lên bề mặt cài đặt."
          : "This route now reads from the active auth session and the notification service, so demo changes propagate into a visible settings surface."}
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Phạm vi cài đặt hiện tại" : "Current settings scope"}</p>
          <h2>{currentMember.name}</h2>
          <ul className="app-list">
            <li>{authNotice}</li>
            <li>
              {isVi
                ? `Phiên ${formatRoleLabel(currentMember.role, locale)} đang ánh xạ tới ${permissionHighlights.length} điểm nhấn quyền hạn`
                : `${currentMember.role} session mapped to ${permissionHighlights.length} permission highlights`}
            </li>
            {permissionHighlights.slice(0, 2).map((item) => (
              <li key={item}>{formatPermissionHighlight(item, locale)}</li>
            ))}
            <li>{dashboardTrust.summary}</li>
            <li>
              {proofHighlights[0]?.detail ??
                (isVi
                  ? "Tuỳ chọn bằng chứng sẽ hiện tại đây khi sổ cái có thêm dữ liệu."
                  : "Proof preferences will appear here once more ledger items are available.")}
            </li>
          </ul>
        </section>
        <NotificationFeed
          items={notifications}
          redirectTo={settingsPath}
          title={isVi ? "Xem trước tuỳ chọn thông báo" : "Notification preferences preview"}
        />
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Hỗ trợ và định tuyến" : "Support and routing"}</p>
          <h2>{isVi ? "Gửi yêu cầu hỗ trợ trực tiếp" : "Send a live support request"}</h2>
          <p>
            {isVi
              ? "Biểu mẫu này gửi trực tiếp vào hộp thư hỗ trợ OMDALAT, giúp app runtime có đường liên hệ vận hành thực tế thay vì placeholder."
              : "This form sends directly into the OMDALAT support inbox, so the app runtime has a real operational contact path instead of placeholder copy."}
          </p>
          <SupportRequestForm defaultRoute={settingsPath} replyEmail={currentMember.email} locale={locale} />
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Hộp thư ứng dụng chính thức" : "Official app mailboxes"}</p>
          <h2>{isVi ? "Sơ đồ inbox hiện tại" : "Current inbox map"}</h2>
          <ul className="app-list">
            <li>{`${OMDALAT_INBOXES.app} ${isVi ? "cho thông báo app và phản hồi vận hành" : "for app notifications and operator replies"}`}</li>
            <li>{`${OMDALAT_INBOXES.support} ${isVi ? "cho hỗ trợ và định tuyến vấn đề" : "for support and issue routing"}`}</li>
            <li>{`${OMDALAT_INBOXES.hello} ${isVi ? "cho tiếp nhận công khai và liên hệ liên bề mặt" : "for public intake and cross-surface contact"}`}</li>
            <li>{`${OMDALAT_INBOXES.trust} ${isVi ? "cho theo dõi trust và bằng chứng" : "for trust and proof-related follow-up"}`}</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
