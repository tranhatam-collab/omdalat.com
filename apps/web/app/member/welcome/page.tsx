import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Welcome | Om Dalat",
  description: "Hướng dẫn cho thành viên mới: bắt đầu, xác thực, và vào đúng luồng tiếp theo.",
  path: "/member/welcome",
  noindex: true
});

export default async function MemberWelcomePage() {
  const locale = await getRequestLocale();

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Bắt đầu", en: "Welcome" }}
      title={{ vi: "Chào mừng bạn vào khu thành viên", en: "Welcome to the member area" }}
      intro={{
        vi: "Đây là bước vào đầu tiên: hiểu bạn đang ở đâu trong luồng thành viên, cần làm gì trước, và khi nào tài liệu sâu hơn mới mở.",
        en: "This is the first member step: understand where you are in the flow, what comes first, and when deeper materials open."
      }}
      actions={[
        { href: localizePath("/member/profile", locale), label: { vi: "Điền hồ sơ", en: "Fill profile" }, variant: "primary" },
        { href: localizePath("/member/application-status", locale), label: { vi: "Xem trạng thái", en: "Check status" } }
      ]}
    >
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Lộ trình cơ bản" : "Basic flow"}</h2>
          <ol className="runtime-list">
            <li>{locale === "vi" ? "Tạo tài khoản" : "Create an account"}</li>
            <li>{locale === "vi" ? "Xác thực email" : "Verify email"}</li>
            <li>{locale === "vi" ? "Hoàn tất hồ sơ" : "Complete your profile"}</li>
            <li>{locale === "vi" ? "Chờ review" : "Wait for review"}</li>
          </ol>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Quy tắc ở giai đoạn đầu" : "Rules for the first step"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Nói thật, gọn, rõ" : "Keep it honest, short, and clear"}</li>
            <li>{locale === "vi" ? "Không tự nhảy sang lớp tài liệu sâu hơn khi chưa đủ điều kiện" : "Do not jump into deeper materials before the right conditions are met"}</li>
            <li>{locale === "vi" ? "Dùng khu này để tìm đúng bước tiếp theo" : "Use this area to find the proper next step"}</li>
          </ul>
        </section>
      </div>
    </MemberShell>
  );
}
