import { AppScaffold } from "../../components/AppScaffold";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default async function CommunitiesPage() {
  const locale = await getRequestLocale();
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow={{ vi: "Runtime route ứng dụng", en: "App route runtime" }}
      title={{ vi: "Tầng vận hành cộng đồng", en: "Communities operating layer" }}
      description={{ vi: "Route nội bộ dựa trên nhịp độ cộng đồng, trọng tâm hoạt động và mật độ tín hiệu địa phương.", en: "Internal route backed by community cadence, focus, and local signal density." }}
      highlights={snapshot.communities.map(
        (community) => `${community.name} · ${pickLocalized(locale, community.cadence)} · ${pickLocalized(locale, community.signal)}`
      )}
      nextStep={{ vi: "Các node cộng đồng hiện dùng chung một bộ dữ liệu runtime với sự kiện và yêu cầu. Bước tiếp theo là bổ sung quyền thành viên và vai trò chi tiết hơn.", en: "Community nodes now share one runtime dataset with events and requests. Next, add richer member and role permissions." }}
    />
  );
}
