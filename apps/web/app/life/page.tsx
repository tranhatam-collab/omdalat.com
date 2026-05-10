import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Sống tại Ôm Đà Lạt",
      en: "Life in Om Dalat"
    },
    description: {
      vi: "Nơi ở, nhịp sống, sức khỏe và cách giữ một nền sống đủ ổn định để ở lại lâu hơn.",
      en: "Living space, rhythm, health, and the base needed to stay longer with stability."
    },
    path: "/life"
  });
}

export default function LifePage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Sống", en: "Life" }}
      title={{ vi: "Một nền sống đủ vững để ở lại", en: "A living base steady enough to stay" }}
      intro={{
        vi: "Phần sống không phải chuyện trang trí. Nó là nền để công việc, học tập và cộng đồng không bị đứt đoạn.",
        en: "Life is not decorative here. It is the base that keeps work, learning, and community from breaking apart."
      }}
      sections={[
        {
          heading: { vi: "Nơi ở", en: "Living space" },
          points: [
            { vi: "Chỗ ở phải đủ rõ ràng, yên và dùng được mỗi ngày.", en: "A living space needs to be clear, quiet, and usable every day." },
            { vi: "Ở lâu quan trọng hơn cảm giác đẹp trong vài ngày đầu.", en: "Staying well matters more than looking beautiful in the first few days." }
          ]
        },
        {
          heading: { vi: "Nhịp sống", en: "Rhythm" },
          points: [
            { vi: "Nhịp đều giúp con người làm việc và giữ đầu óc sáng lâu hơn.", en: "A steady rhythm helps people work and keep a clearer mind for longer." },
            { vi: "Không gian chung chỉ bền khi mọi người giữ giờ giấc và trách nhiệm.", en: "Shared life lasts only when people keep time and responsibility." }
          ]
        }
      ]}
    />
  );
}
