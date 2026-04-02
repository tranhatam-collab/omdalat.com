import { localizePath } from "../../../../packages/core";
import { ActivityFeed } from "../../components/ActivityFeed";
import { NotificationFeed } from "../../components/NotificationFeed";
import { NodeCard } from "../../components/NodeCard";
import { ProofCard } from "../../components/ProofCard";
import { TrustBadge } from "../../components/TrustBadge";
import { getAuthNotice, getCurrentMember } from "../../lib/auth";
import { formatPermissionHighlight, formatRoleSummary, formatSessionStatus } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { listNotifications } from "../../lib/notifications";
import { getDashboardSnapshot } from "../../lib/runtime-data";
import { permissionHighlights, roleSummaries } from "../../lib/roles";
import {
  buildActivityTimeline,
  buildDashboardTrust,
  buildModerationSummary,
  buildProofHighlights,
  buildRequestMatches
} from "../../lib/trust";

export default async function DashboardPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = getCurrentMember(locale);
  const dashboardTrust = buildDashboardTrust(locale);
  const proofHighlights = buildProofHighlights(locale);
  const activityTimeline = buildActivityTimeline(locale);
  const requestMatches = buildRequestMatches();
  const moderationSummary = buildModerationSummary(locale);
  const notifications = listNotifications(locale);
  const snapshot = getDashboardSnapshot();
  const leadMatch = requestMatches[0];
  const secondaryMatch = requestMatches[1];
  const dashboardPath = localizePath("/dashboard", locale);
  const authNotice = getAuthNotice(locale);

  return (
    <section className="app-page">
      <div className="app-dashboard-hero">
        <p className="app-kicker">{isVi ? "Runtime dashboard" : "Dashboard runtime"}</p>
        <h1>{isVi ? "Tầng vận hành địa phương cho hoạt động đáng tin cậy tại Da Lat." : "Local operating layer for trusted activity in Da Lat."}</h1>
        <p>
          {isVi
            ? "App runtime hiện đọc trực tiếp bộ dữ liệu fixture OMDALAT cho địa điểm, host, chuyên gia, cộng đồng, sự kiện, bằng chứng và yêu cầu thay vì chỉ dựa vào nội dung mock tĩnh."
            : "This app runtime is now reading the live OMDALAT fixture datasets for places, hosts, experts, communities, events, proofs, and requests instead of relying on static mock copy alone."}
        </p>
        <div className="app-dashboard-meta">
          <TrustBadge label={dashboardTrust.level} score={dashboardTrust.score} />
          <span>
            {currentMember.homeNode} · {snapshot.events.length} {isVi ? "sự kiện đang hoạt động" : "active events"} · {snapshot.requests.length}{" "}
            {isVi ? "yêu cầu đang theo dõi" : "tracked requests"}
          </span>
        </div>
      </div>

      <div className="app-grid">
        <NodeCard
          title={isVi ? "Ngữ cảnh thành viên hiện tại" : "Current member context"}
          detail={authNotice}
          meta={`${currentMember.name} · ${formatSessionStatus(currentMember.status, locale)}`}
        />
        <NodeCard
          title={leadMatch ? leadMatch.requestTitle : isVi ? "Hàng đợi ghép nối yêu cầu" : "Request matching queue"}
          detail={
            leadMatch
              ? isVi
                ? `Ghép nối tốt nhất hiện tại: ${leadMatch.targetName} (${leadMatch.targetType}) vì ${leadMatch.reason}`
                : `Best current match: ${leadMatch.targetName} (${leadMatch.targetType}) because ${leadMatch.reason}`
              : isVi
                ? "Chưa có kết quả ghép nối yêu cầu nào được chấm điểm."
                : "No request match has been scored yet."
          }
          meta={leadMatch ? (isVi ? `Điểm ${leadMatch.score}/100` : `Score ${leadMatch.score}/100`) : isVi ? "Bộ máy ghép nối" : "Matching engine"}
        />
        <ActivityFeed title={isVi ? "Tín hiệu runtime địa phương hiện tại" : "Current local runtime signals"} items={activityTimeline} />
        <ProofCard
          title={proofHighlights[0]?.title ?? (isVi ? "Pipeline bằng chứng đang khởi động" : "Proof pipeline warming up")}
          detail={
            proofHighlights[0]?.detail ??
            (isVi
              ? "Các tín hiệu địa phương có dữ liệu bằng chứng sẽ hiển thị tại đây khi được ghi nhận."
              : "Proof-backed local signals will appear here as they are recorded.")
          }
        />
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Vai trò và bề mặt dữ liệu" : "Roles and data surfaces"}</p>
          <h2>{isVi ? "Runtime này hiện đang đại diện cho ai" : "Who this runtime already represents"}</h2>
          <ul className="app-list">
            {roleSummaries.map((item) => (
              <li key={item.role}>
                <strong>{item.role}</strong>: {formatRoleSummary(item.role, item.summary, locale)}
              </li>
            ))}
            <li>
              <strong>{snapshot.places.length} {isVi ? "địa điểm" : "places"}</strong>:{" "}
              {isVi
                ? "bề mặt địa điểm địa phương hiện lấy trực tiếp từ lớp dữ liệu dùng chung."
                : "local venue surfaces now come straight from the shared data layer."}
            </li>
            <li>
              <strong>{snapshot.hosts.length} {isVi ? "host" : "hosts"}</strong>:{" "}
              {isVi
                ? "ngữ cảnh host theo trust hiện đã gắn vào app runtime."
                : "trust-aware host context is now attached to the app runtime."}
            </li>
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Trust và bước tiếp theo" : "Trust and next steps"}</p>
          <h2>{isVi ? "Mục tiêu triển khai trước mắt từ luồng thực tế" : "Immediate implementation targets now coming from real flows"}</h2>
          <ul className="app-list">
            {permissionHighlights.map((item) => (
              <li key={item}>{formatPermissionHighlight(item, locale)}</li>
            ))}
            <li>{dashboardTrust.summary}</li>
            <li>{proofHighlights[1]?.detail ?? (isVi ? "Thêm nhiều bằng chứng hơn để làm sâu sổ trust địa phương." : "Add more proofs to deepen the local trust ledger.")}</li>
            <li>
              {secondaryMatch
                ? isVi
                  ? `Lộ trình ghép nối thứ hai: ${secondaryMatch.targetName} có thể hỗ trợ ${secondaryMatch.requestTitle}.`
                  : `Second-best request path: ${secondaryMatch.targetName} can support ${secondaryMatch.requestTitle}.`
                : isVi
                  ? "Tiếp theo mở rộng ghép nối để bao gồm luồng moderation và phê duyệt đầy đủ hơn."
                  : "Extend matching to include richer moderation and approval flows next."}
            </li>
            <li>
              {moderationSummary.pendingCount > 0
                ? isVi
                  ? `${moderationSummary.pendingCount} mục moderation đang chờ trong luồng bằng chứng.`
                  : `${moderationSummary.pendingCount} moderation items are waiting in the proof lane.`
                : isVi
                  ? "Hiện tại không có tồn đọng moderation."
                  : "No moderation backlog at the moment."}
            </li>
          </ul>
        </section>
      </div>

      <div className="app-page-grid">
        <NotificationFeed
          items={notifications}
          redirectTo={dashboardPath}
          title={isVi ? "Thông báo demo mới nhất" : "Latest demo notifications"}
        />
        <section className="app-panel">
          <p className="app-kicker">{isVi ? "Làn moderation" : "Moderation lane"}</p>
          <h2>{isVi ? "Ảnh chụp hàng đợi rà soát hiện tại" : "Current review queue snapshot"}</h2>
          <ul className="app-list">
            {moderationSummary.items.length > 0 ? (
              moderationSummary.items.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>{isVi ? "Hiện không có mục bằng chứng nào đang chờ rà soát." : "No proof items are currently waiting for review."}</li>
            )}
          </ul>
        </section>
      </div>
    </section>
  );
}
