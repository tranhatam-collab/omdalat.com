import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Cộng đồng tại Ôm Đà Lạt",
      en: "Community in Om Dalat"
    },
    description: {
      vi: "Sống chung, chia sẻ, giữ kỷ luật và xây một cộng đồng có trách nhiệm tại Đà Lạt.",
      en: "Shared living, discipline, contribution, and a responsible community in Dalat."
    },
    path: "/community"
  });
}

export default function CommunityPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Cộng đồng", en: "Community" }}
      title={{ vi: "Cộng đồng chỉ bền khi mọi người giữ phần của mình", en: "Community lasts only when people keep their part" }}
      intro={{
        vi: "Không đông cho vui. Không gắn kết giả. Cộng đồng ở đây được giữ bằng trách nhiệm, nhịp sống và sự tôn trọng.",
        en: "Not gathering for novelty. Not forcing false closeness. Community here is held by responsibility, rhythm, and respect."
      }}
      sections={[
        {
          heading: { vi: "Nguyên tắc", en: "Principles" },
          points: [
            { vi: "Không gây độc hại, không kéo nhau vào ồn ào vô ích, không làm hỏng nhịp sống chung.", en: "No toxic behavior, no drama, and no breaking the shared rhythm." },
            { vi: "Tôn trọng người khác và chịu trách nhiệm với phần của mình.", en: "Respect others and take responsibility for your part." }
          ]
        },
        {
          heading: { vi: "Hoạt động nền", en: "Foundational activities" },
          points: [
            { vi: "Ăn chung, làm việc cùng, chia sẻ vào cuối tuần và nhìn lại định kỳ.", en: "Shared meals, working together, weekend sharing, and regular review." },
            { vi: "Nhịp sinh hoạt giúp con người biết mình thuộc về đâu trong hệ.", en: "The shared rhythm helps people know where they stand in the system." }
          ]
        }
      ]}
    />
  );
}
