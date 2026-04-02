import { AppScaffold } from "../../components/AppScaffold";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default async function ExpertsPage() {
  const locale = await getRequestLocale();
  const snapshot = getDashboardSnapshot();

  return (
    <AppScaffold
      eyebrow={{ vi: "Runtime route ứng dụng", en: "App route runtime" }}
      title={{ vi: "Tầng vận hành chuyên gia", en: "Experts operating layer" }}
      description={{ vi: "Route nội bộ dựa trên chuyên môn, khả dụng và chất lượng tín hiệu chuyên gia từ lớp dữ liệu dùng chung.", en: "Internal route backed by expert specialty, availability, and signal quality from the shared data layer." }}
      highlights={snapshot.experts.map(
        (expert) => `${expert.name} · ${pickLocalized(locale, expert.specialty)} · ${pickLocalized(locale, expert.availability)}`
      )}
      nextStep={{ vi: "Hồ sơ chuyên gia đã có trong app runtime. Bước tiếp theo là làm giàu ghép nối yêu cầu bằng chất lượng phản hồi và lịch sử bằng chứng.", en: "Expert records now exist in app runtime. Next, enrich request matching with response-quality and proof history." }}
    />
  );
}
