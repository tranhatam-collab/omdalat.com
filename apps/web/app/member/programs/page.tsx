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
  title: "Programs | Om Dalat",
  description: "Tổng quan các hướng tham gia có thể mở ra cho thành viên sau khi hồ sơ phù hợp hơn.",
  path: "/member/programs",
  noindex: true
});

export default async function MemberProgramsPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessReviewed(session)) {
    redirect(gatePathForRequirement("reviewed", locale, "/member/programs"));
  }

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Lộ trình", en: "Paths" }}
      title={{ vi: "Các hướng có thể mở cho thành viên", en: "Participation paths that may open later" }}
      intro={{
        vi: "Đây là lớp tổng quan để biết hệ đang có những hướng nào, điều gì phù hợp với hồ sơ của bạn và phần nào chỉ mở sau bước review tiếp theo.",
        en: "This is the overview layer for the system's current paths, what may fit your profile, and what only opens after a later review step."
      }}
      actions={[
        { href: localizePath("/member/resources", locale), label: { vi: "Tài nguyên", en: "Resources" }, variant: "primary" },
        { href: localizePath("/member/application-status", locale), label: { vi: "Xem trạng thái", en: "View status" } }
      ]}
    >
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bốn hướng chính" : "Four main paths"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Sống" : "Living"}</li>
            <li>{locale === "vi" ? "Làm" : "Work"}</li>
            <li>{locale === "vi" ? "Học" : "Learning"}</li>
            <li>{locale === "vi" ? "Cộng đồng" : "Community"}</li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Điều thành viên cần biết" : "What members should know"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Các hướng này không mở toàn bộ ra public" : "These paths are not fully public"}</li>
            <li>{locale === "vi" ? "Mỗi hướng có mức tham gia riêng" : "Each path has its own level of participation"}</li>
            <li>{locale === "vi" ? "Tài liệu chi tiết mở theo cấp độ truy cập" : "Detailed materials open by access level"}</li>
          </ul>
        </section>
      </div>
    </MemberShell>
  );
}
