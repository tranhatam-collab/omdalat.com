import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Ở lại tại Ôm Đà Lạt",
      en: "Stay in Om Dalat"
    },
    description: {
      vi: "Loại chỗ ở, giá dự kiến, điều kiện và mức phù hợp để ở lại theo cách có thể duy trì.",
      en: "Stay options, expected pricing, conditions, and fit for longer-term living in Dalat."
    },
    path: "/stay"
  });
}

export default function StayPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Ở lại", en: "Stay" }}
      title={{ vi: "Ở lại theo cách có thể duy trì", en: "Stay in a way that can be sustained" }}
      intro={{
        vi: "Ở lại không chỉ là thuê một chỗ ngủ. Đó là chọn một nền sống bạn có thể đi cùng trong nhiều tuần hoặc nhiều tháng.",
        en: "Staying is not only about renting a place to sleep. It means choosing a living base you can move with for weeks or months."
      }}
      sections={[
        {
          heading: { vi: "Loại chỗ ở", en: "Stay types" },
          points: [
            { vi: "Phòng ở chung cho người cần chi phí thấp và nhịp sống chung.", en: "Dorms for people who need lower cost and shared rhythm." },
            { vi: "Phòng riêng cho người cần riêng tư và tập trung dài hơn.", en: "Private rooms for people who need privacy and longer focus." }
          ]
        },
        {
          heading: { vi: "Điều kiện và mức phù hợp", en: "Conditions and fit" },
          points: [
            { vi: "Giữ không gian, đúng giờ và không làm ảnh hưởng người khác.", en: "Keep the space clean, respect time, and avoid disrupting others." },
            { vi: "Ở lâu chỉ có ý nghĩa khi bạn có thể tự quản lý mình trong nhịp sống chung.", en: "A longer stay matters only when you can manage yourself inside a shared rhythm." }
          ]
        }
      ]}
    />
  );
}
