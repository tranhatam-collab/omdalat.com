import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { getHandbookSections } from "../../../lib/content-seed";
import {
  canAccessReviewed,
  canAccessContent,
  gatePathForRequirement,
  MEMBER_SESSION_COOKIE_NAME,
  parseMemberSession
} from "../../../lib/member-auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { MEMBER_REVIEW_QUEUE_COOKIE_NAME, resolveMemberReviewQueue } from "../../../lib/member-review-queue";
import { resolveSessionWithReviewQueue } from "../../../lib/member-session-resolver";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = buildPageMetadata({
  title: "Handbook | Om Dalat",
  description: "Sổ tay thành viên: hướng dẫn đúng mức, quy tắc mở rộng, và các phần mở sâu hơn.",
  path: "/member/handbook",
  noindex: true
});

export default async function MemberHandbookPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessReviewed(session)) {
    redirect(gatePathForRequirement("reviewed", locale, "/member/handbook"));
  }

  const sections = getHandbookSections(locale);
  const publishedSections = sections.filter(
    (section) => canAccessContent(session, section.accessLevel) && section.status === "published"
  );
  const lockedSections = sections.filter(
    (section) => section.status === "published" && !canAccessContent(session, section.accessLevel)
  );

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Sổ tay", en: "Handbook" }}
      title={{ vi: "Sổ tay dành cho thành viên", en: "Member handbook" }}
      intro={{
        vi: "Trang này mở ra những phần sổ tay đã được mở cho cấp hiện tại của bạn. Mỗi lớp được mở theo đúng tiến trình tham gia.",
        en: "This page opens the handbook sections already available at your current level. Each layer unlocks in step with the member journey."
      }}
      actions={[
        { href: localizePath("/member/resources", locale), label: { vi: "Tài nguyên", en: "Resources" }, variant: "primary" },
        { href: localizePath("/member/application-status", locale), label: { vi: "Trạng thái hồ sơ", en: "Application status" } }
      ]}
    >
      <p className="runtime-note">
        {locale === "vi"
          ? "Bạn chỉ xem các phần đã được mở cho quyền hiện tại. Phần nháp và phần nội bộ không hiển thị ở đây."
          : "You only see sections already opened for your current access level. Draft and internal-only material stays hidden here."}
      </p>

      {publishedSections.length > 0 ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Đã mở cho bạn" : "Available now"}</h2>
          <div className="runtime-card-grid">
            {publishedSections.map((section) => (
              <article className="runtime-link-card" key={section.id}>
                <strong>{section.title}</strong>
                <span>{section.summary}</span>
                <span>{locale === "vi" ? "Mở cho vai trò" : "Available for"}: {section.accessLevel}</span>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <p className="runtime-status runtime-status--info">
          {locale === "vi"
            ? "Hiện chưa có phần handbook đã publish cho cấp truy cập này."
            : "There are no published handbook sections for this access level yet."}
        </p>
      )}

      {lockedSections.length > 0 ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Mở ở bước tiếp theo" : "Opens in a later stage"}</h2>
          <div className="runtime-card-grid">
            {lockedSections.map((section) => (
              <article className="runtime-link-card" key={`locked-${section.id}`} style={{ opacity: 0.72 }}>
                <strong>{section.title}</strong>
                <span>{section.summary}</span>
                <span>
                  {locale === "vi"
                    ? `Mở từ vai trò: ${section.accessLevel}`
                    : `Available from: ${section.accessLevel}`}
                </span>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </MemberShell>
  );
}
