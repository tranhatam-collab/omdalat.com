import { Badge, Section } from "../../../packages/ui";
import type { AuthFixture, MemberSession } from "../../../packages/types";
import { logoutSessionAction, switchSessionAction } from "../app/actions";
import { formatRoleLabel } from "../lib/i18n-copy";
import { getRequestLocale } from "../lib/locale";

type SessionSwitcherProps = {
  fixtures: AuthFixture[];
  currentSession: MemberSession;
  redirectTo?: string;
};

function localizeFixtureLabel(fixture: AuthFixture, isVi: boolean) {
  if (!isVi) return fixture.label;
  if (fixture.id === "guest-demo") return "Khách quan sát";
  if (fixture.id === "bao-an-member") return "Bao An · thành viên";
  if (fixture.id === "linh-verified") return "Linh Pham · đã xác minh";
  return fixture.label;
}

function localizeFixtureSummary(fixture: AuthFixture, isVi: boolean) {
  if (!isVi) return fixture.summary;
  if (fixture.id === "guest-demo") return "Chế độ quan sát công khai chỉ đọc để xem tầng vận hành địa phương.";
  if (fixture.id === "bao-an-member") return "Phiên thành viên tập trung vào kết nối, vòng tròn chuyên gia và theo dõi yêu cầu địa phương.";
  if (fixture.id === "linh-verified") return "Phiên host đã xác minh với quyền gửi bằng chứng và truy cập các luồng trust trọng yếu.";
  return fixture.summary;
}

export async function SessionSwitcher({
  fixtures,
  currentSession,
  redirectTo = "/profile"
}: SessionSwitcherProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";

  return (
    <Section className="app-panel">
      <p className="app-kicker">{isVi ? "Demo xác thực" : "Auth demo"}</p>
      <h2>{isVi ? "Chuyển phiên fixture" : "Switch fixture session"}</h2>
      <p>
        {isVi
          ? "Ứng dụng hiện hỗ trợ lớp xác thực demo có trạng thái. Chuyển giữa phiên khách, thành viên và thành viên đã xác minh để kiểm tra luồng trust và moderation theo vai trò."
          : "The app now supports a stateful demo auth layer. Swap between guest, member, and verified host sessions to inspect role-dependent trust and moderation flows."}
      </p>
      <div className="app-stack">
        {fixtures.map((fixture) => (
          <div className="app-action-card" key={fixture.id}>
            <div className="app-action-copy">
              <p className="app-card-meta">{formatRoleLabel(fixture.session.role, locale)}</p>
              <h3>{localizeFixtureLabel(fixture, isVi)}</h3>
              <p>{localizeFixtureSummary(fixture, isVi)}</p>
              {fixture.id === currentSession.id ? (
                <Badge className="app-badge">{isVi ? "Phiên đang hoạt động" : "Active session"}</Badge>
              ) : null}
            </div>
            <form action={switchSessionAction} className="app-inline-form">
              <input type="hidden" name="sessionId" value={fixture.id} />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <button className="app-button" type="submit">
                {isVi ? "Dùng phiên này" : "Use session"}
              </button>
            </form>
          </div>
        ))}
      </div>
      <form action={logoutSessionAction} className="app-inline-form">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <button className="app-button app-button-secondary" type="submit">
          {isVi ? "Quay về chế độ khách" : "Return to guest mode"}
        </button>
      </form>
    </Section>
  );
}
