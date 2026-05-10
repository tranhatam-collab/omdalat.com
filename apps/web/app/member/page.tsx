import type { Metadata } from "next";
import { localizePath } from "../../../../packages/core";
import { MemberShell } from "./_member-shell";
import { pickLocalized } from "../../lib/i18n-copy";
import { getRequestLocale } from "../../lib/locale";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Area | Om Dalat",
  description: "Khu vực thành viên của Om Dalat cho hồ sơ, tài nguyên, tình trạng tham gia và các trang mở rộng.",
  path: "/member",
  noindex: true
});

const entryLinks = [
  { href: "/member/welcome", vi: "Bắt đầu", en: "Start here" },
  { href: "/member/profile", vi: "Hồ sơ", en: "Profile" },
  { href: "/member/application-status", vi: "Trạng thái hồ sơ", en: "Application status" },
  { href: "/member/resources", vi: "Tài nguyên đã mở", en: "Available resources" }
] as const;

export default async function MemberHomePage() {
  const locale = await getRequestLocale();

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Khu thành viên", en: "Member area" }}
      title={{ vi: "Trang bắt đầu của thành viên", en: "Member starting point" }}
      intro={{
        vi: "Đây là lớp riêng cho người đã đăng ký. Từ đây, bạn đi theo đúng luồng: xác thực, hoàn tất hồ sơ, chờ review và mở thêm tài liệu khi đủ điều kiện.",
        en: "This is the private layer for registered members. From here you follow the proper sequence: verify, complete your profile, wait for review, and unlock more material when the fit is confirmed."
      }}
      actions={[
        { href: localizePath("/member/welcome", locale), label: { vi: "Bắt đầu", en: "Start here" }, variant: "primary" },
        { href: localizePath("/member/profile", locale), label: { vi: "Hoàn tất hồ sơ", en: "Complete profile" } },
        { href: localizePath("/member/application-status", locale), label: { vi: "Xem trạng thái", en: "Check status" } }
      ]}
      note={{
        vi: "Một số nội dung chỉ mở sau khi hồ sơ cơ bản đã được hoàn tất và xác nhận.",
        en: "Some materials open only after a basic profile is completed and confirmed."
      }}
    >
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Những gì mở ở đây" : "What opens here"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Hồ sơ thành viên và tình trạng xét duyệt" : "Member profile and review status"}</li>
            <li>{locale === "vi" ? "Tài nguyên hỗ trợ và hướng dẫn đã mở cho cấp hiện tại" : "Support resources and guidance already open for your current access level"}</li>
            <li>{locale === "vi" ? "Bước tiếp theo để đi sâu hơn mà không vượt quá quyền hiện tại" : "The next step for going deeper without skipping your current access level"}</li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Luồng mở chuẩn" : "The standard unlock flow"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Tạo tài khoản và xác thực email" : "Create an account and verify email"}</li>
            <li>{locale === "vi" ? "Hoàn tất hồ sơ cơ bản" : "Complete your basic profile"}</li>
            <li>{locale === "vi" ? "Chờ review để mở thêm tài liệu phù hợp" : "Wait for review to unlock more relevant materials"}</li>
          </ul>
        </section>
      </div>

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Những điểm cần dùng ngay" : "What you should use first"}</h2>
        <div className="runtime-card-grid">
          {entryLinks.map((item) => (
            <a className="runtime-link-card" href={localizePath(item.href, locale)} key={item.href}>
              <strong>{pickLocalized(locale, { vi: item.vi, en: item.en })}</strong>
              <span>{locale === "vi" ? "Đi đúng thứ tự trước khi mở thêm lớp sâu hơn" : "Follow the right order before opening deeper layers"}</span>
            </a>
          ))}
        </div>
      </section>
    </MemberShell>
  );
}
