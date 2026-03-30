import { AppScaffold } from "../../components/AppScaffold";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default async function EventsPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow={{ vi: "Runtime route ứng dụng", en: "App route runtime" }}
      title={{ vi: "Tầng vận hành sự kiện", en: "Events operating layer" }}
      description={{ vi: "Route nội bộ dựa trên các sự kiện sắp tới thực tế, host và liên kết địa điểm từ bộ dữ liệu hoạt động địa phương.", en: "Internal route backed by real upcoming events, hosts, and place links from the local activity dataset." }}
      highlights={snapshot.events.map(
        (event) => `${event.title} · ${pickLocalized(locale, event.date)} · ${event.place} · ${isVi ? "host" : "host"} ${event.host}`
      )}
      nextStep={{ vi: "Sự kiện hiện đọc trực tiếp từ dữ liệu hoạt động dùng chung. Bước tiếp theo là gắn luồng ghi nhận tham dự và hook moderation.", en: "Events now read directly from shared activity data. Next, attach attendance proof capture and moderation hooks." }}
    />
  );
}
