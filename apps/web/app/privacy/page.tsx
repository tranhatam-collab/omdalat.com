import type { Metadata } from "next";
import { ContentPage } from "../../components/shared/ContentPage";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Quyền riêng tư OMDALAT | OMDALAT Privacy",
  description: "Kỳ vọng về quyền riêng tư cho sản phẩm city-layer OMDALAT.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Quyền riêng tư", en: "Privacy" }}
      title={{ vi: "Cam kết dữ liệu và quyền riêng tư", en: "Data and privacy commitments" }}
      intro={{
        vi: "OMDALAT tối thiểu hóa dữ liệu công khai và ưu tiên dữ liệu có mục đích vận hành rõ ràng. Bên kiểm soát và tài trợ pháp lý: Angel Edu Tam Foundation Inc (4809 W 41st St, Ste 202 #426, Sioux Falls, SD 57106, USA) — us@angeledutam.com.",
        en: "OMDALAT minimizes public data exposure and prioritizes data with clear operational purpose. Legal sponsor and data controller: Angel Edu Tam Foundation Inc (4809 W 41st St, Ste 202 #426, Sioux Falls, SD 57106, USA) — us@angeledutam.com."
      }}
      sections={[
        {
          heading: { vi: "Tổ chức và các trang liên quan", en: "Organization and related sites" },
          points: [
            {
              vi: "OMDALAT, OMDALA (omdala.com) và hệ sinh thái *.iai.one là bề mặt chính thức trong cùng khuôn khổ tài trợ của Angel Edu Tam Foundation Inc.",
              en: "OMDALAT, OMDALA (omdala.com), and the *.iai.one ecosystem are official surfaces under the same sponsorship by Angel Edu Tam Foundation Inc."
            },
            {
              vi: "Điều khoản chi tiết cho dịch vụ IAI Flow và tài liệu pháp lý tập trung tại docs.iai.one/legal/.",
              en: "Detailed terms for IAI Flow and consolidated legal documents are published at docs.iai.one/legal/."
            }
          ]
        },
        {
          heading: { vi: "Thu thập dữ liệu", en: "Data collection" },
          points: [
            { vi: "Chỉ thu thập dữ liệu cần thiết cho ghép nối, trust và vận hành.", en: "Only data required for matching, trust, and operations is collected." },
            { vi: "Không thu thập tràn lan ngoài ngữ cảnh hoạt động địa phương.", en: "No broad collection outside local operating context." }
          ]
        },
        {
          heading: { vi: "Sử dụng dữ liệu", en: "Data usage" },
          points: [
            { vi: "Dữ liệu được dùng để cải thiện chất lượng kết nối và an toàn moderation.", en: "Data is used to improve connection quality and moderation safety." },
            { vi: "Các thay đổi chính sách sẽ được cập nhật minh bạch tại trang này.", en: "Policy updates will be transparently documented on this page." }
          ]
        }
      ]}
    />
  );
}
