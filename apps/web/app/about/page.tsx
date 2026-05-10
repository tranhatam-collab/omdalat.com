import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Giới thiệu Ôm Đà Lạt",
      en: "About Om Dalat"
    },
    description: {
      vi: "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt cho sống, làm, học và xây giá trị dài hạn.",
      en: "Om Dalat is a real-life living system in Dalat for staying, working, learning, and building long-term value."
    },
    path: "/about"
  });
}

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Giới thiệu", en: "About" }}
      title={{ vi: "Ôm Đà Lạt là gì?", en: "What is Om Dalat?" }}
      intro={{
        vi: "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi con người có thể ở lại, làm việc, học từ trải nghiệm và xây giá trị dài hạn.",
        en: "Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build long-term value."
      }}
      sections={[
        {
          heading: { vi: "Bản chất", en: "What it is" },
          points: [
            { vi: "Không phải homestay, không phải retreat, không phải khóa học.", en: "It is not a homestay, a retreat, or a course." },
            { vi: "Đây là một nơi để ở lại đủ lâu, sống đủ thật và làm đủ đều.", en: "It is a place to stay long enough, live honestly enough, and work steadily enough." }
          ]
        },
        {
          heading: { vi: "Điều hệ giữ", en: "What the system holds" },
          points: [
            { vi: "Một nền sống đủ ổn định để con người không phải phân tán vào những thứ ngắn hạn.", en: "A stable enough living base so people do not keep scattering into short-term noise." },
            { vi: "Một cộng đồng có trách nhiệm, nơi việc ở cùng nhau vẫn còn dùng được trong đời sống thật.", en: "A responsible community where living with others still has practical value." }
          ]
        }
      ]}
    />
  );
}
