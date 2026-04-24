import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Hướng dẫn làm việc",
      en: "Om Dalat Work Guide"
    },
    description: {
      vi: "Công việc phù hợp, cách bắt đầu và cách giữ nhịp làm việc đủ thực để ở lại lâu hơn.",
      en: "Suitable work, how to begin, and how to keep a work rhythm that can support a longer stay."
    },
    path: "/docs/work-guide"
  });
}

export default function DocsWorkGuidePage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Hướng dẫn làm việc", en: "Work guide" }}
      intro={{
        vi: "Điều quan trọng không phải làm việc ở nơi đẹp. Điều quan trọng là bạn có thể giữ việc đều và sống được cùng nhịp đó.",
        en: "What matters is not working in a beautiful place. It is whether you can keep work steady and live inside that rhythm."
      }}
      sections={[
        {
          heading: { vi: "Điều có thể làm", en: "What can be done" },
          points: [
            { vi: "Làm việc từ xa, công việc tự do, dự án nhỏ và một số đầu việc nội bộ.", en: "Remote work, freelance, small projects, and some internal work streams." },
            { vi: "Công việc phải đi cùng khả năng tự quản lý và nhịp đều.", en: "Work needs to come with self-management and steady rhythm." }
          ]
        },
        {
          heading: { vi: "Cách bắt đầu", en: "How to start" },
          points: [
            { vi: "Nói rõ bạn đang có kỹ năng gì và muốn đi theo nhịp làm nào.", en: "Explain clearly what skills you have and what work rhythm you want." },
            { vi: "Bắt đầu từ phần việc nhỏ nhưng giữ đều trước khi mở rộng.", en: "Start from a smaller task and keep it steady before expanding." }
          ]
        }
      ]}
    />
  );
}
