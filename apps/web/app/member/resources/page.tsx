import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { getMemberResources } from "../../../lib/content-seed";
import {
  canAccessContent,
  MEMBER_SESSION_COOKIE_NAME,
  parseMemberSession
} from "../../../lib/member-auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { MEMBER_REVIEW_QUEUE_COOKIE_NAME, resolveMemberReviewQueue } from "../../../lib/member-review-queue";
import { resolveSessionWithReviewQueue } from "../../../lib/member-session-resolver";
import { cookies } from "next/headers";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Resources | Om Dalat",
  description: "Tài nguyên cho thành viên đã đăng ký: starter docs, guide, và các lớp tài liệu mở tiếp theo.",
  path: "/member/resources",
  noindex: true
});

export default async function MemberResourcesPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );
  const resources = getMemberResources(locale);
  const publishedResources = resources.filter(
    (resource) => canAccessContent(session, resource.accessLevel) && resource.status === "published"
  );
  const lockedResources = resources.filter(
    (resource) => resource.status === "published" && !canAccessContent(session, resource.accessLevel)
  );

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Tài nguyên", en: "Resources" }}
      title={{ vi: "Tài nguyên dành cho thành viên", en: "Resources for members" }}
      intro={{
        vi: "Đây là lớp tài liệu đầu tiên sau khi đăng ký. Bạn chỉ thấy những gì đã được mở công khai cho cấp truy cập hiện tại.",
        en: "This is the first resource layer after registration. You only see materials already opened for your current access level."
      }}
      actions={[
        { href: localizePath("/member/handbook", locale), label: { vi: "Sổ tay", en: "Handbook" }, variant: "primary" },
        { href: localizePath("/member/application-status", locale), label: { vi: "Trạng thái hồ sơ", en: "Application status" } }
      ]}
    >
      <p className="runtime-note">
        {locale === "vi"
          ? "Tài liệu nháp nội bộ không hiển thị ở đây. Bạn đang xem theo quyền truy cập hiện tại của tài khoản."
          : "Internal drafts are not shown here. These items appear based on your current account access level."}
      </p>

      {publishedResources.length > 0 ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Đã mở cho bạn" : "Available now"}</h2>
          <div className="runtime-card-grid">
            {publishedResources.map((resource) => (
              <article className="runtime-link-card" key={resource.id}>
                <strong>{resource.title}</strong>
                <span>{resource.excerpt}</span>
                <span>{locale === "vi" ? "Mở cho vai trò" : "Available for"}: {resource.accessLevel}</span>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <p className="runtime-status runtime-status--info">
          {locale === "vi"
            ? "Hiện chưa có tài liệu đã publish cho cấp truy cập này."
            : "There are no published resources for this access level yet."}
        </p>
      )}

      {lockedResources.length > 0 ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Mở ở bước tiếp theo" : "Opens in a later stage"}</h2>
          <div className="runtime-card-grid">
            {lockedResources.map((resource) => (
              <article className="runtime-link-card" key={`locked-${resource.id}`} style={{ opacity: 0.72 }}>
                <strong>{resource.title}</strong>
                <span>{resource.excerpt}</span>
                <span>
                  {locale === "vi"
                    ? `Mở từ vai trò: ${resource.accessLevel}`
                    : `Available from: ${resource.accessLevel}`}
                </span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </MemberShell>
  );
}
