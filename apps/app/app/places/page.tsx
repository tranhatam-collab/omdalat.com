import { AppScaffold } from "../../components/AppScaffold";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default async function PlacesPage() {
  const locale = await getRequestLocale();
  const snapshot = getDashboardSnapshot();
  const openRequests = snapshot.requests.filter((request) => request.status === "Open").length;

  return (
    <AppScaffold
      eyebrow={{ vi: "Runtime route ứng dụng", en: "App route runtime" }}
      title={{ vi: "Tầng vận hành địa điểm", en: "Places operating layer" }}
      description={{ vi: "Route nội bộ dựa trên dữ liệu địa điểm đang hoạt động, độ sẵn sàng của node và ngữ cảnh địa phương theo yêu cầu.", en: "Internal route backed by live place records, node readiness, and request-aware local context." }}
      highlights={snapshot.places.map(
        (place) =>
          `${place.name} · ${pickLocalized(locale, place.mode)} · ${pickLocalized(locale, place.activity)} · ${pickLocalized(locale, place.signal)}`
      )}
      nextStep={{ vi: `${openRequests} yêu cầu mở hiện có thể định tuyến qua ${snapshot.places.length} địa điểm theo dõi bằng dữ liệu dùng chung thực tế.`, en: `${openRequests} open requests can now be routed against ${snapshot.places.length} tracked places with real shared data.` }}
    />
  );
}
