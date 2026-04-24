import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Học tại Ôm Đà Lạt",
      en: "Learning in Om Dalat"
    },
    description: {
      vi: "Học từ trải nghiệm, từ công việc và từ cách sống cùng người khác trong đời sống thật ở Đà Lạt.",
      en: "Learning through experience, work, and shared living in real life in Dalat."
    },
    path: "/learning"
  });
}

export default function LearningPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Học", en: "Learning" }}
      title={{ vi: "Học bằng cách tham gia vào đời sống thật", en: "Learn by entering real life" }}
      intro={{
        vi: "Ở đây, học không đứng ngoài công việc và đời sống. Học là quan sát, làm, sửa và lặp lại cho tới khi có điều làm ra rõ ràng.",
        en: "Here, learning does not sit outside work and daily life. It means observing, doing, correcting, and repeating until there is real output."
      }}
      sections={[
        {
          heading: { vi: "Học từ trải nghiệm", en: "Learning from experience" },
          points: [
            { vi: "Điều bạn học được phải gắn với việc đang diễn ra quanh bạn.", en: "What you learn should be tied to what is actually happening around you." },
            { vi: "Không lý thuyết hóa quá mức những điều vốn cần được trải qua.", en: "Do not over-theorize things that need to be lived through." }
          ]
        },
        {
          heading: { vi: "Học qua điều làm ra", en: "Learning through output" },
          points: [
            { vi: "Bài viết, dự án nhỏ, quy trình hoặc phần việc rõ ràng đều có thể là điều bạn làm ra.", en: "Articles, small projects, processes, or clearly defined tasks can all be output." },
            { vi: "Điều làm ra giúp việc học trở nên có thể nhìn thấy và sửa được.", en: "Output makes learning visible and correctable." }
          ]
        }
      ]}
    />
  );
}
