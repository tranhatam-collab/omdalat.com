import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Giới thiệu OMDALAT | About OMDALAT",
  description: "OMDALAT là gì và city-layer hoạt động ra sao tại Da Lat.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Giới thiệu", en: "About" }}
      title={{ vi: "OMDALAT là gì?", en: "What is OMDALAT?" }}
      intro={{
        vi: "OMDALAT là hệ vận hành địa phương ưu tiên trust, nơi con người, địa điểm và hoạt động được kết nối bằng bằng chứng thực tế.",
        en: "OMDALAT is a local operating system that prioritizes trust, connecting people, places, and activity through real evidence."
      }}
      sections={[
        {
          heading: { vi: "Mô hình", en: "Model" },
          points: [
            { vi: "City layer gồm web công khai và app vận hành nội bộ.", en: "The city layer includes a public web surface and an internal operating app." },
            { vi: "Mọi tín hiệu chính đều bám vào dữ liệu thực và có thể kiểm chứng.", en: "Core signals are anchored in real, verifiable data." }
          ]
        },
        {
          heading: { vi: "Mục tiêu", en: "Goal" },
          points: [
            { vi: "Giảm ma sát kết nối địa phương bằng trust hiển thị.", en: "Reduce local coordination friction through visible trust." },
            { vi: "Biến các tương tác tốt thành hạ tầng xã hội lặp lại được.", en: "Turn successful interactions into repeatable local social infrastructure." }
          ]
        }
      ]}
    />
  );
}
