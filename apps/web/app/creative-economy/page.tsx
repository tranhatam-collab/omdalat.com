import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Kinh tế sáng tạo | Creative economy",
  description: "How OMDALAT activates local creative economy through trusted coordination.",
  path: "/creative-economy"
});

export default function CreativeEconomyPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Kinh tế sáng tạo", en: "Creative economy" }}
      title={{ vi: "Kích hoạt giá trị sáng tạo địa phương", en: "Activating local creative value" }}
      intro={{
        vi: "OMDALAT tập trung vào các lĩnh vực nơi sáng tạo, không gian và trust có thể tạo ra việc làm lặp lại.",
        en: "OMDALAT focuses on sectors where creativity, place, and trust can generate repeat work."
      }}
      sections={[
        {
          heading: { vi: "Đối tượng trọng tâm", en: "Priority groups" },
          points: [
            { vi: "Creators, studio nhỏ, nhà sản xuất nội dung, educator độc lập.", en: "Creators, small studios, content producers, and independent educators." },
            { vi: "Host và địa điểm có thể vận hành các phiên làm việc thực.", en: "Hosts and places able to run practical sessions." }
          ]
        },
        {
          heading: { vi: "Cơ chế tạo giá trị", en: "Value mechanism" },
          points: [
            { vi: "Tạo cơ hội từ request thật thay vì listing tĩnh.", en: "Create opportunity from live requests instead of static listings." },
            { vi: "Biến kết quả thành proof để tăng trust cho vòng kế tiếp.", en: "Turn outcomes into proof to increase trust for the next cycle." }
          ]
        }
      ]}
    />
  );
}
