import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Câu hỏi thường gặp của Ôm Đà Lạt",
      en: "FAQ for Om Dalat"
    },
    description: {
      vi: "Những câu hỏi ngắn dành cho người mới trước khi đăng ký và đi sâu vào khu thành viên.",
      en: "Short questions and answers for newcomers before registering and going deeper into the member area."
    },
    path: "/docs/faq"
  });
}

export default function DocsFaqPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Câu hỏi thường gặp cho người mới", en: "FAQ for newcomers" }}
      intro={{
        vi: "Nếu bạn còn đang dò đường, hãy bắt đầu từ các câu hỏi ngắn này trước khi mở sâu hơn.",
        en: "If you are still finding your footing, start with these short questions before going deeper."
      }}
      sections={[
        {
          heading: { vi: "Tôi có cần đăng ký ngay không?", en: "Do I need to register right away?" },
          points: [
            { vi: "Không. Hãy đọc đủ để hiểu mình có hợp hay không trước.", en: "No. Read enough first to understand whether it fits you." }
          ]
        },
        {
          heading: { vi: "Khi nào mới nên vào khu thành viên?", en: "When should I enter the member area?" },
          points: [
            { vi: "Khi bạn đã hiểu rõ bản chất của hệ và muốn đi tiếp một cách nghiêm túc hơn.", en: "When you understand the system clearly and want to continue more seriously." }
          ]
        },
        {
          heading: { vi: "Mọi tài liệu có mở công khai không?", en: "Are all materials public?" },
          points: [
            { vi: "Không. Public chỉ giữ phần nền, còn các phần sâu hơn mở theo từng lớp truy cập.", en: "No. Public only carries the foundation, while deeper materials open by access layer." }
          ]
        }
      ]}
    />
  );
}
