import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Quy tắc cộng đồng Ôm Đà Lạt",
      en: "Om Dalat Community Rules"
    },
    description: {
      vi: "Những nguyên tắc nền để giữ nhịp sống chung, công việc chung và sự tôn trọng trong cộng đồng.",
      en: "Ground rules that protect shared life, shared work, and respect inside the community."
    },
    path: "/docs/community-rules"
  });
}

export default function DocsCommunityRulesPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Quy tắc cộng đồng", en: "Community rules" }}
      intro={{
        vi: "Cộng đồng không tự tốt lên chỉ bằng ý định tốt. Nó cần quy tắc rõ và sự tự quản lý đủ thật.",
        en: "Community does not become healthy through good intentions alone. It needs clear rules and real self-management."
      }}
      sections={[
        {
          heading: { vi: "Điều phải giữ", en: "What must be kept" },
          points: [
            { vi: "Tôn trọng, đúng giờ và không làm ảnh hưởng người khác.", en: "Respect, time discipline, and not disrupting others." },
            { vi: "Không gây độc hại, không kéo nhau vào căng thẳng vô ích, không ép người khác sống theo nhịp của mình.", en: "No toxic behavior, no drama, and no forcing others into your rhythm." }
          ]
        },
        {
          heading: { vi: "Điều cần nhớ", en: "What to remember" },
          points: [
            { vi: "Cộng đồng chỉ bền khi mọi người có đóng góp thực.", en: "Community lasts only when people contribute in real ways." },
            { vi: "Ở cùng nhau là một phần của việc học và làm, không phải phần trang trí.", en: "Living together is part of learning and work, not decoration." }
          ]
        }
      ]}
    />
  );
}
