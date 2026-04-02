import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Tầm nhìn OMDALAT | OMDALAT Vision",
  description: "Tầm nhìn dài hạn city-layer, luận điểm mật độ và mô hình kích hoạt địa phương.",
  path: "/vision"
});

export default function VisionPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Tầm nhìn", en: "Vision" }}
      title={{ vi: "Tăng mật độ trust theo thời gian", en: "Compounding local trust over time" }}
      intro={{
        vi: "OMDALAT hướng tới một thành phố nơi các node địa phương liên kết với nhau bằng kết quả thực, không chỉ bằng tuyên bố.",
        en: "OMDALAT aims for a city where local nodes connect through real outcomes, not only claims."
      }}
      sections={[
        {
          heading: { vi: "Luận điểm mật độ", en: "Density thesis" },
          points: [
            { vi: "Mật độ tương tác chất lượng cao tạo ra năng lực địa phương bền vững.", en: "Dense high-quality interactions create durable local capacity." },
            { vi: "Các vòng lặp nhỏ nhưng liên tục mạnh hơn các chiến dịch ngắn hạn.", en: "Small continuous loops outperform one-off campaigns." }
          ]
        },
        {
          heading: { vi: "Hướng triển khai", en: "Execution direction" },
          points: [
            { vi: "Mỗi hoạt động cần có chủ thể rõ, bối cảnh rõ, và bằng chứng rõ.", en: "Every activity should have clear actors, context, and evidence." },
            { vi: "Mở rộng theo node và cộng đồng trước khi mở rộng theo quy mô truyền thông.", en: "Scale by nodes and communities before broad media scale." }
          ]
        }
      ]}
    />
  );
}
