import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Niềm tin trong OMDALAT | Trust in OMDALAT",
  description: "Cơ chế xác minh, bằng chứng và độ tin cậy hiển thị trong OMDALAT.",
  path: "/trust"
});

export default function TrustPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Trust", en: "Trust" }}
      title={{ vi: "Cách OMDALAT tạo trust", en: "How OMDALAT builds trust" }}
      intro={{
        vi: "Trust trong OMDALAT được tạo từ bằng chứng, moderation, và các lượt tương tác lặp lại đã được xác nhận.",
        en: "Trust in OMDALAT is built from evidence, moderation, and verified repeat interactions."
      }}
      sections={[
        {
          heading: { vi: "Nguồn tín hiệu", en: "Signal sources" },
          points: [
            { vi: "Proof records: kết quả và dữ liệu xác thực gắn với chủ thể cụ thể.", en: "Proof records: outcomes and evidence tied to specific entities." },
            { vi: "Host verification: độ tin cậy của người điều phối địa phương.", en: "Host verification: reliability of local operators." }
          ]
        },
        {
          heading: { vi: "Quản trị trust", en: "Trust governance" },
          points: [
            { vi: "Moderation lane giúp rà soát các mục có rủi ro trước khi công khai.", en: "The moderation lane reviews risk-sensitive items before broad exposure." },
            { vi: "Mỗi cập nhật đều để lại dấu vết trong trust timeline nội bộ.", en: "Each update leaves a trail in the internal trust timeline." }
          ]
        }
      ]}
    />
  );
}
