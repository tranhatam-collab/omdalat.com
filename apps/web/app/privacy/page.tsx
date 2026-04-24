import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata() {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Quyền riêng tư Ôm Đà Lạt",
      en: "Om Dalat Privacy"
    },
    description: {
      vi: "Cam kết về quyền riêng tư và cách dữ liệu được xử lý trong hệ Ôm Đà Lạt.",
      en: "Privacy commitments and how data is handled across the Om Dalat system."
    },
    path: "/privacy"
  });
}

export default function PrivacyPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Quyền riêng tư", en: "Privacy" }}
      title={{ vi: "Cam kết dữ liệu và quyền riêng tư", en: "Data and privacy commitments" }}
      intro={{
        vi: "Ôm Đà Lạt giảm thiểu dữ liệu công khai và chỉ xử lý dữ liệu phục vụ vận hành có mục đích rõ ràng. Đơn vị quản lý vận hành website omdalat.com: CÔNG TY TNHH THÁI LÂM (ĐÀ LẠT), địa chỉ 42 Cao Bá Quát, Phường Lang Biang - Đà Lạt, Tỉnh Lâm Đồng, Việt Nam. Tài trợ công nghệ và thiết kế ứng dụng: Angel Edu Tam Foundation Inc. Liên hệ công khai: hello@omdalat.com và join@omdalat.com.",
        en: "Om Dalat minimizes public data exposure and only processes data for clear operational purposes. Operating entity for omdalat.com: THAI LAM CO., LTD (DA LAT), 42 Cao Bá Quat, Lang Biang Ward — Da Lat, Lam Dong Province, Vietnam. Technology and application design sponsorship: Angel Edu Tam Foundation Inc. Public contact: hello@omdalat.com and join@omdalat.com."
      }}
      sections={[
        {
          heading: { vi: "Tổ chức và liên hệ", en: "Organization and contact" },
          points: [
            {
              vi: "Đơn vị quản lý vận hành tại Việt Nam: CÔNG TNHH THÁI LÂM (ĐÀ LẠT), địa chỉ như trên.",
              en: "Operating entity in Vietnam: THAI LAM CO., LTD (DA LAT), at the address above."
            },
            {
              vi: "Tài trợ công nghệ và thiết kế ứng dụng (không thay thế vai trò vận hành tại Việt Nam): Angel Edu Tam Foundation Inc.",
              en: "Technology and application design sponsor (does not replace the Vietnam operating role): Angel Edu Tam Foundation Inc."
            },
            {
              vi: "Các điều khoản sử dụng chi tiết nằm tại trang Điều khoản trên cùng website này.",
              en: "Detailed usage terms are published on the Terms page of this site."
            }
          ]
        },
        {
          heading: { vi: "Thu thập dữ liệu", en: "Data collection" },
          points: [
            {
              vi: "Chỉ thu thập dữ liệu cần thiết cho ghép nối, độ tin cậy và vận hành.",
              en: "Only data required for matching, trust, and operations is collected."
            },
            {
              vi: "Không thu thập tràn lan ngoài ngữ cảnh hoạt động địa phương.",
              en: "No broad collection outside local operating context."
            }
          ]
        },
        {
          heading: { vi: "Sử dụng dữ liệu", en: "Data usage" },
          points: [
            {
              vi: "Dữ liệu được dùng để cải thiện chất lượng kết nối và độ an toàn trong vận hành.",
              en: "Data is used to improve connection quality and operational safety."
            },
            {
              vi: "Các thay đổi chính sách sẽ được cập nhật minh bạch tại trang này.",
              en: "Policy updates will be transparently documented on this page."
            }
          ]
        }
      ]}
    />
  );
}
