import { AppScaffold } from "../../components/AppScaffold";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default async function HostsPage() {
  const locale = await getRequestLocale();
  const snapshot = getDashboardSnapshot();
  const verifiedHosts = snapshot.hosts.filter((host) => host.verified).length;

  return (
    <AppScaffold
      eyebrow={{ vi: "Runtime route ứng dụng", en: "App route runtime" }}
      title={{ vi: "Tầng vận hành host", en: "Hosts operating layer" }}
      description={{ vi: "Route nội bộ dựa trên danh sách host hiện tại, dấu hiệu xác minh và trạng thái khả dụng theo địa phương.", en: "Internal route backed by the current host roster, verification markers, and locality-aware availability." }}
      highlights={snapshot.hosts.map(
        (host) =>
          `${host.name} · ${pickLocalized(locale, host.role)} · ${pickLocalized(locale, host.availability)} · ${pickLocalized(locale, host.trust)}`
      )}
      nextStep={{ vi: `${verifiedHosts} host đã xác minh hiện đang cấp dữ liệu cho bề mặt trust. Bước tiếp theo là nối vào luồng moderation và phê duyệt.`, en: `${verifiedHosts} verified hosts now feed the trust surface. Next, connect them to moderation and approval workflows.` }}
    />
  );
}
