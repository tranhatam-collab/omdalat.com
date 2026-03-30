import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Điều khoản OMDALAT | OMDALAT Terms",
  description: "Điều khoản và kỳ vọng sử dụng cho OMDALAT.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Điều khoản", en: "Terms" }}
      title={{ vi: "Nguyên tắc sử dụng OMDALAT", en: "OMDALAT usage principles" }}
      intro={{
        vi: "Mục tiêu của điều khoản là giữ hệ vận hành địa phương an toàn, tin cậy và có trách nhiệm. OMDALAT được tài trợ và phát hành bởi Angel Edu Tam Foundation Inc (4809 W 41st St, Ste 202 #426, Sioux Falls, SD 57106, USA; us@angeledutam.com), đồng thời với omdala.com và *.iai.one.",
        en: "These terms aim to keep the local operating system safe, trustworthy, and accountable. OMDALAT is sponsored and published by Angel Edu Tam Foundation Inc (4809 W 41st St, Ste 202 #426, Sioux Falls, SD 57106, USA; us@angeledutam.com), together with omdala.com and *.iai.one."
      }}
      sections={[
        {
          heading: { vi: "Pháp nhân và tài trợ", en: "Legal entity and sponsorship" },
          points: [
            {
              vi: "Angel Edu Tam Foundation Inc là tổ chức phi lợi nhuận tài trợ toàn bộ hạ tầng công nghệ cho OMDALAT (miễn phí), omdala.com và hệ sinh thái *.iai.one theo các trang chính thức đã công bố.",
              en: "Angel Edu Tam Foundation Inc is the nonprofit sponsor of all technology for OMDALAT (at no charge), omdala.com, and the *.iai.one ecosystem, as published on the official sites."
            },
            {
              vi: "Văn bản pháp lý bổ sung cho nền tảng IAI (IAI Flow) nằm tại https://docs.iai.one/legal/.",
              en: "Additional legal texts for the IAI platform (IAI Flow) are at https://docs.iai.one/legal/."
            }
          ]
        },
        {
          heading: { vi: "Nguyên tắc chung", en: "General principles" },
          points: [
            { vi: "Tôn trọng bối cảnh địa phương và an toàn cộng đồng.", en: "Respect local context and community safety." },
            { vi: "Không cung cấp thông tin sai lệch hoặc bằng chứng giả mạo.", en: "Do not submit misleading information or fabricated evidence." }
          ]
        },
        {
          heading: { vi: "Thực thi", en: "Enforcement" },
          points: [
            { vi: "Nội dung vi phạm có thể bị gắn cờ, giới hạn hoặc loại khỏi trust layer.", en: "Violating content may be flagged, limited, or removed from the trust layer." },
            { vi: "Các thay đổi lớn về điều khoản sẽ được thông báo rõ trước khi áp dụng.", en: "Major term updates are announced clearly before enforcement." }
          ]
        }
      ]}
    />
  );
}
