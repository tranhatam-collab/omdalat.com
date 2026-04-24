import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Làm việc tại Ôm Đà Lạt",
      en: "Work in Om Dalat"
    },
    description: {
      vi: "Công việc thật, dự án thật và cách giữ thu nhập đủ thực để ở lại dài hơn tại Đà Lạt.",
      en: "Real work, real projects, and a practical income rhythm for staying longer in Dalat."
    },
    path: "/work"
  });
}

export default function WorkPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Làm", en: "Work" }}
      title={{ vi: "Công việc thật trong một nhịp sống thật", en: "Real work inside a real rhythm of life" }}
      intro={{
        vi: "Ôm Đà Lạt không tô hồng việc sống ở nơi đẹp. Điều quan trọng là bạn có thể làm gì, làm đều đến đâu và giữ thu nhập ra sao.",
        en: "Om Dalat does not romanticize working in a beautiful place. What matters is what you can do, how steadily you can do it, and how you hold income."
      }}
      sections={[
        {
          heading: { vi: "Điều có thể làm", en: "What can be done" },
          points: [
            { vi: "Làm việc từ xa, công việc tự do, dự án nhỏ và công việc nội bộ theo nhu cầu.", en: "Remote work, freelance, small projects, and internal work as needed." },
            { vi: "Không phải mọi kiểu việc đều hợp với nhịp sống ở Đà Lạt.", en: "Not every type of work fits the rhythm of life in Dalat." }
          ]
        },
        {
          heading: { vi: "Điều phải giữ", en: "What must be kept" },
          points: [
            { vi: "Nhịp làm đều, mốc thời gian rõ và khả năng tự quản lý cơ bản.", en: "Steady output, clear deadlines, and basic self-management." },
            { vi: "Ít hứa hẹn hơn, nhiều việc làm ra hơn.", en: "Less promise, more actual work." }
          ]
        }
      ]}
    />
  );
}
