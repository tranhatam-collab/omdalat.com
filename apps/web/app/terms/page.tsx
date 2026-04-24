import { ContentPage } from "../../components/shared/ContentPage";
import { buildCurrentLocalePageMetadata } from "../../lib/metadata";

export async function generateMetadata() {
  return buildCurrentLocalePageMetadata({
    title: {
      vi: "Điều khoản Ôm Đà Lạt",
      en: "Om Dalat Terms"
    },
    description: {
      vi: "Điều khoản và kỳ vọng sử dụng cho hệ Ôm Đà Lạt.",
      en: "Terms and usage expectations for the Om Dalat system."
    },
    path: "/terms"
  });
}

export default function TermsPage() {
  return (
    <ContentPage
      eyebrow={{ vi: "Điều khoản", en: "Terms" }}
      title={{ vi: "Nguyên tắc sử dụng Ôm Đà Lạt", en: "Om Dalat usage principles" }}
      intro={{
        vi: "Mục tiêu của điều khoản là giữ hệ vận hành địa phương an toàn, tin cậy và có trách nhiệm. Website omdalat.com do CÔNG TY TNHH THÁI LÂM (ĐÀ LẠT) quản lý vận hành tại địa chỉ 42 Cao Bá Quát, Phường Lang Biang - Đà Lạt, Tỉnh Lâm Đồng, Việt Nam. Tài trợ công nghệ và thiết kế ứng dụng: Angel Edu Tam Foundation Inc. Liên hệ công khai: hello@omdalat.com và join@omdalat.com.",
        en: "These terms aim to keep the local system safe, trustworthy, and accountable. The omdalat.com site is operated by THAI LAM CO., LTD (DA LAT) at 42 Cao Bá Quat, Lang Biang Ward - Da Lat, Lam Dong Province, Vietnam. Technology and application design sponsorship: Angel Edu Tam Foundation Inc. Public contact: hello@omdalat.com and join@omdalat.com."
      }}
      sections={[
        {
          heading: { vi: "Pháp nhân và tài trợ", en: "Legal roles and sponsorship" },
          points: [
            {
              vi: "Đơn vị quản lý vận hành: CÔNG TNHH THÁI LÂM (ĐÀ LẠT), Việt Nam.",
              en: "Operating entity: THAI LAM CO., LTD (DA LAT), Vietnam."
            },
            {
              vi: "Tài trợ công nghệ và thiết kế ứng dụng: Angel Edu Tam Foundation Inc (hỗ trợ miễn phí trong khuôn khổ tài trợ, không thay thế trách nhiệm vận hành tại Việt Nam).",
              en: "Technology and application design sponsorship: Angel Edu Tam Foundation Inc (provided at no charge under sponsorship; does not replace Vietnam operating responsibility)."
            },
            {
              vi: "Chính sách quyền riêng tư chi tiết nằm tại trang Quyền riêng tư trên cùng website.",
              en: "The Privacy page on this site describes data handling in more detail."
            }
          ]
        },
        {
          heading: { vi: "Nguyên tắc chung", en: "General principles" },
          points: [
            {
              vi: "Tôn trọng bối cảnh địa phương và an toàn cộng đồng.",
              en: "Respect local context and community safety."
            },
            {
              vi: "Không cung cấp thông tin sai lệch hoặc bằng chứng giả mạo.",
              en: "Do not submit misleading information or fabricated evidence."
            }
          ]
        },
        {
          heading: { vi: "Thực thi", en: "Enforcement" },
          points: [
            {
              vi: "Nội dung vi phạm có thể bị gắn cờ, giới hạn hoặc gỡ khỏi hệ thống.",
              en: "Violating content may be flagged, limited, or removed from the system."
            },
            {
              vi: "Các thay đổi lớn về điều khoản sẽ được thông báo rõ trước khi áp dụng.",
              en: "Major term updates are announced clearly before enforcement."
            }
          ]
        }
      ]}
    />
  );
}
