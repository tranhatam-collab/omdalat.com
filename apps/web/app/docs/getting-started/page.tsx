import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Bắt đầu với Ôm Đà Lạt",
      en: "Getting Started with Om Dalat"
    },
    description: {
      vi: "Những điều nên đọc trước khi quyết định ở lại, tham gia hoặc mở hồ sơ thành viên.",
      en: "What to read before deciding to stay, join, or open a member profile."
    },
    path: "/docs/getting-started"
  });
}

export default function DocsGettingStartedPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Bắt đầu từ đây", en: "Start here" }}
      intro={{
        vi: "Hãy hiểu rõ mình đang tìm gì trước khi đi tiếp. Đây là nơi để ở lại, không phải để ghé qua cho vui.",
        en: "Understand what you are actually looking for before going further. This is a place to stay, not a novelty stop."
      }}
      sections={[
        {
          heading: { vi: "Đọc trước", en: "Read first" },
          points: [
            { vi: "Giới thiệu hệ sống, nhịp vận hành và mức phù hợp.", en: "Read the living system overview, operating rhythm, and fit." },
            { vi: "Tự hỏi bạn muốn ở lại, làm việc, học hay chỉ đang đổi cảnh tạm thời.", en: "Ask whether you want to stay, work, learn, or are only changing scenery temporarily." }
          ]
        },
        {
          heading: { vi: "Chưa cần mở sâu", en: "No need to go deeper yet" },
          points: [
            { vi: "Các tài liệu chi tiết hơn chỉ mở sau khi bạn tạo hồ sơ cơ bản.", en: "Deeper materials open only after you create a basic profile." },
            { vi: "Phần công khai chỉ cần đủ để bạn hiểu đúng trước.", en: "The public layer only needs to be enough for clear understanding first." }
          ]
        }
      ]}
    />
  );
}
