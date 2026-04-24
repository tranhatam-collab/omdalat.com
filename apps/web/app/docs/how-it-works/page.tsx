import type { Metadata } from "next";
import { ContentPage } from "../../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Cách hệ vận hành",
      en: "How Om Dalat Works"
    },
    description: {
      vi: "Luồng từ phần công khai sang khu thành viên, bước xem xét và thời gian thử.",
      en: "The flow from public pages into the member area, review steps, and the trial period."
    },
    path: "/docs/how-it-works"
  });
}

export default function DocsHowItWorksPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Hướng dẫn", en: "Guides" }}
      title={{ vi: "Cách hệ vận hành", en: "How the system works" }}
      intro={{
        vi: "Hệ đi từ phần công khai để hiểu đúng sang khu thành viên để hiểu sâu hơn, rồi mới tới bước xem xét và vận hành sâu.",
        en: "The system moves from public understanding into member depth, and only then into reviewed and deeper operational layers."
      }}
      sections={[
        {
          heading: { vi: "Công khai", en: "Public" },
          points: [
            { vi: "Homepage, các trang trục chính và bài viết giúp người mới hiểu bản chất của hệ.", en: "Homepage, core pages, and articles help newcomers understand the system." },
            { vi: "Phần công khai không mở các tài liệu nhạy cảm hoặc quá sâu.", en: "Public does not expose sensitive or deeper materials." }
          ]
        },
        {
          heading: { vi: "Thành viên", en: "Member" },
          points: [
            { vi: "Sau khi đăng ký cơ bản, bạn thấy hồ sơ, tài nguyên và các bước tiếp theo.", en: "After basic registration, you see your profile, resources, and next steps." },
            { vi: "Một số phần chỉ mở sau khi đã được xem xét hoặc có vai trò nội bộ.", en: "Some sections open only after review or internal role assignment." }
          ]
        }
      ]}
    />
  );
}
