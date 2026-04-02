import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Câu hỏi thường gặp OMDALAT | OMDALAT FAQ",
  description: "Câu hỏi phổ biến về trust, tham gia và sản phẩm city-layer.",
  path: "/faq"
});

export default function FaqPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "FAQ", en: "FAQ" }}
      title={{ vi: "Câu hỏi thường gặp", en: "Frequently asked questions" }}
      intro={{
        vi: "Các câu hỏi ngắn giúp hiểu nhanh OMDALAT hoạt động như thế nào.",
        en: "Short answers to understand how OMDALAT works."
      }}
      sections={[
        {
          heading: { vi: "OMDALAT có phải mạng xã hội?", en: "Is OMDALAT a social network?" },
          points: [
            { vi: "Không. OMDALAT là tầng vận hành địa phương dựa trên trust và bằng chứng.", en: "No. OMDALAT is a trust-and-evidence local operating layer." }
          ]
        },
        {
          heading: { vi: "Làm sao để tham gia?", en: "How do I participate?" },
          points: [
            { vi: "Bạn có thể bắt đầu ở trang Join hoặc gửi yêu cầu qua Contact.", en: "Start from the Join page or submit intent via Contact." },
            { vi: "Các luồng tham gia sẽ được mở rộng dần theo từng node địa phương.", en: "Participation flows expand gradually by local node." }
          ]
        }
      ]}
    />
  );
}
