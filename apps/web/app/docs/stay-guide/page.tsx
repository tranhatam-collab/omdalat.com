import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Hướng dẫn ở lại",
      en: "Om Dalat Stay Guide"
    },
    description: {
      vi: "Loại chỗ ở, điều kiện cơ bản và cách ở đủ lâu để vào nếp tại Đà Lạt.",
      en: "Stay types, basic conditions, and how to stay long enough to settle into rhythm in Dalat."
    },
    path: "/docs/stay-guide"
  });
}

export default function DocsStayGuidePage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Hướng dẫn ở lại", en: "Stay guide" }}
      intro={{
        vi: "Ở lại chỉ có ý nghĩa khi bạn có thể vào được nhịp sống thực sự. Chỗ ở chỉ là bề mặt đầu tiên.",
        en: "Staying matters only when you can enter a real rhythm of life. Accommodation is only the first surface."
      }}
      sections={[
        {
          heading: { vi: "Loại chỗ ở", en: "Stay types" },
          points: [
            { vi: "Phòng ở chung cho người cần chi phí thấp và chấp nhận nhịp chung.", en: "Dorms for people who need lower cost and accept shared rhythm." },
            { vi: "Phòng riêng cho người cần riêng tư hơn để tập trung và làm việc.", en: "Private rooms for people who need more privacy to focus and work." }
          ]
        },
        {
          heading: { vi: "Điều kiện cơ bản", en: "Basic conditions" },
          points: [
            { vi: "Giữ không gian sạch, tôn trọng giờ giấc và nói rõ thời gian ở dự kiến.", en: "Keep the space clean, respect time, and explain your expected stay length." },
            { vi: "Ở lâu đòi hỏi khả năng tự quản lý chứ không chỉ cảm hứng ngắn hạn.", en: "A longer stay asks for self-management, not short-term enthusiasm." }
          ]
        }
      ]}
    />
  );
}
