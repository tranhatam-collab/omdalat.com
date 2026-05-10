import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { getRequestLocale } from "../../../lib/locale";
import {
  canAccessReviewed,
  gatePathForRequirement,
  MEMBER_SESSION_COOKIE_NAME,
  parseMemberSession
} from "../../../lib/member-auth";
import { buildPageMetadata } from "../../../lib/metadata";
import { MEMBER_REVIEW_QUEUE_COOKIE_NAME, resolveMemberReviewQueue } from "../../../lib/member-review-queue";
import { resolveSessionWithReviewQueue } from "../../../lib/member-session-resolver";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Overview | Om Dalat",
  description: "Tổng quan dành cho thành viên đã mở: cách hệ phát triển, lớp tài liệu nào có thể xem và phần nào vẫn được giữ lại.",
  path: "/member/investor-overview",
  noindex: true
});

export default async function MemberInvestorOverviewPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessReviewed(session)) {
    redirect(gatePathForRequirement("reviewed", locale, "/member/investor-overview"));
  }

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Đầu tư", en: "Investor" }}
      title={{ vi: "Tổng quan dành cho thành viên", en: "Member-facing investor overview" }}
      intro={{
        vi: "Trang này không mở toàn bộ data room. Nó chỉ cho bạn thấy khung phát triển của hệ, cách nhìn ở mức tổng quan và lớp tài liệu nào có thể mở sau khi hồ sơ phù hợp hơn.",
        en: "This page does not open the full data room. It only shows the system's high-level growth frame and which materials can open later if the profile is a fit."
      }}
      actions={[
        { href: localizePath("/member/resources", locale), label: { vi: "Xem tài nguyên", en: "View resources" }, variant: "primary" },
        { href: localizePath("/member/application-status", locale), label: { vi: "Xem trạng thái", en: "View status" } }
      ]}
    >
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Những gì member có thể thấy" : "What members can see"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Khung phát triển ở mức tổng quan" : "A high-level growth frame"}</li>
            <li>{locale === "vi" ? "Cách hệ tạo giá trị dài hạn" : "How the system creates long-term value"}</li>
            <li>{locale === "vi" ? "Loại tài liệu nào có thể mở tiếp" : "Which materials can open next"}</li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Những gì chưa mở" : "What remains gated"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Data room đầy đủ" : "Full data room"}</li>
            <li>{locale === "vi" ? "Mô hình tài chính chi tiết" : "Detailed financial model"}</li>
            <li>{locale === "vi" ? "Cấu trúc deal và pipeline" : "Deal structure and pipeline"}</li>
          </ul>
        </section>
      </div>
    </MemberShell>
  );
}
