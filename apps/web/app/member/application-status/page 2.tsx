import type { Metadata } from "next";
import { getContentOpsSnapshot, getHandbookSections, getMemberResources } from "../../../lib/content-seed";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import {
  canAccessProfileComplete,
  canAccessSignedIn,
  canAccessVerified,
  parseMemberSession,
  MEMBER_SESSION_COOKIE_NAME,
  canAccessContent,
  parseMemberSession as parseSession
} from "../../../lib/member-auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { cookies } from "next/headers";

export const metadata: Metadata = buildPageMetadata({
  title: "Application Status | Om Dalat",
  description: "Trạng thái hồ sơ thành viên và các bước tiếp theo.",
  path: "/member/application-status",
  noindex: true
});

type SearchParams = {
  required?: string;
};

export default async function MemberApplicationStatusPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { required } = await searchParams;
  const cookieStore = cookies();
  const session = parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);
  const isSignedIn = canAccessSignedIn(session);
  const isVerified = canAccessVerified(session);
  const isProfileComplete = canAccessProfileComplete(session);
  const isReviewed = session.role === "verified_member";
  const needsReviewGate = required === "reviewed-member" && !isReviewed;
  const resources = getMemberResources(locale);
  const handbookSections = getHandbookSections(locale);
  const unlockedResources = resources.filter((resource) => canAccessContent(session, resource.accessLevel));
  const upcomingResources = resources.filter((resource) => !canAccessContent(session, resource.accessLevel));
  const unlockedHandbook = handbookSections.filter((item) => canAccessContent(session, item.accessLevel));
  const upcomingHandbook = handbookSections.filter((item) => !canAccessContent(session, item.accessLevel));
  const contentSnapshot = getContentOpsSnapshot();

  const statusLabel = isProfileComplete
    ? locale === "vi"
      ? "Hồ sơ hoàn tất. Mở thêm nội dung thành viên."
      : "Profile complete. Member resources are unlocked."
    : isVerified
      ? locale === "vi"
        ? "Email đã xác thực. Chờ hoàn tất hồ sơ."
        : "Email verified. Waiting for profile completion."
      : locale === "vi"
        ? "Chưa xác thực email."
        : "Email verification pending.";

  const phaseLabel = isReviewed
    ? locale === "vi"
      ? "Review member"
      : "Reviewed member"
    : locale === "vi"
      ? "Registered member"
      : "Registered member";

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Trạng thái", en: "Status" }}
      title={{ vi: "Tình trạng hồ sơ của bạn", en: "Your application status" }}
      intro={{
        vi: "Trang này giúp bạn biết hồ sơ đang ở trạng thái nào và cần làm gì tiếp theo.",
        en: "This page shows where your application stands and what you need to do next."
      }}
      actions={[
        { href: localizePath("/member/profile", locale), label: { vi: "Cập nhật hồ sơ", en: "Update profile" }, variant: "primary" },
        { href: localizePath("/member/resources", locale), label: { vi: "Xem tài nguyên", en: "View resources" } }
      ]}
    >
      {needsReviewGate ? (
        <p className="runtime-status runtime-status--info">
          {locale === "vi"
            ? "Phần này dành cho đã được review. Hoàn tất hồ sơ và chờ duyệt để truy cập."
            : "This page is for reviewed members. Complete your profile and wait for review access."}
        </p>
      ) : null}
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Các trạng thái có thể gặp" : "Possible statuses"}</h2>
          <ul className="runtime-list">
            <li>{isSignedIn ? phaseLabel : locale === "vi" ? "Chưa đăng nhập" : "Not signed in"}</li>
            <li>{statusLabel}</li>
            <li>
              {isProfileComplete
                ? locale === "vi"
                  ? "Bước hồ sơ đã hoàn tất"
                  : "Profile is complete"
                : locale === "vi"
                  ? "Chưa hoàn tất hồ sơ"
                  : "Profile not complete"}
            </li>
            <li>
              {locale === "vi" ? "Quyền truy cập hiện tại" : "Current access level"}: {session.role}
            </li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bước tiếp theo" : "Next step"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Hoàn tất hồ sơ nếu còn thiếu" : "Finish the profile if anything is missing"}</li>
            <li>{locale === "vi" ? "Chờ thông báo review" : "Wait for review notification"}</li>
            <li>{locale === "vi" ? "Mở tài nguyên phù hợp với mức truy cập" : "Open the resources that match your access level"}</li>
          </ul>
        </section>
      </div>

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Nguồn tài nguyên đã mở" : "Unlocked resources"}</h2>
        <div className="runtime-card-grid">
          {unlockedResources.slice(0, 6).map((resource) => (
            <article className="runtime-link-card" key={`open-resource-${resource.id}`}>
              <strong>{resource.title}</strong>
              <span>{resource.excerpt}</span>
              <span>
                {locale === "vi" ? "Mở tại mức" : "Unlocked at"}: {resource.accessLevel}
              </span>
            </article>
          ))}
          {unlockedResources.length === 0 ? (
            <p className="runtime-status runtime-status--info">
              {locale === "vi"
                ? "Chưa có tài nguyên nào đang mở cho cấp của bạn. Hoàn thiện hồ sơ để mở bước tiếp theo."
                : "No member resources are unlocked yet. Complete your profile to unlock deeper content."}
            </p>
          ) : null}
        </div>

        {unlockedHandbook.length > 0 ? (
          <>
            <h3>{locale === "vi" ? "Sổ tay đã mở" : "Unlocked handbook sections"}</h3>
            <div className="runtime-card-grid">
              {unlockedHandbook.slice(0, 6).map((section) => (
                <article className="runtime-link-card" key={`open-handbook-${section.id}`}>
                  <strong>{section.title}</strong>
                  <span>{section.summary}</span>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Chưa mở (mới mở ở cấp tiếp theo)" : "Upcoming unlocks"}</h2>
        <div className="runtime-card-grid">
          {upcomingResources.slice(0, 6).map((resource) => (
            <article className="runtime-link-card" key={`upcoming-resource-${resource.id}`}>
              <strong>{resource.title}</strong>
              <span>{resource.excerpt}</span>
              <span>
                {locale === "vi" ? "Mở ở mức" : "Unlocks at"}: {resource.accessLevel}
              </span>
            </article>
          ))}
          {upcomingHandbook.slice(0, 6).map((section) => (
            <article className="runtime-link-card" key={`upcoming-handbook-${section.id}`}>
              <strong>{section.title}</strong>
              <span>{section.summary}</span>
              <span>
                {locale === "vi" ? "Mở ở mức" : "Unlocks at"}: {section.accessLevel}
              </span>
            </article>
          ))}
          {upcomingResources.length === 0 && upcomingHandbook.length === 0 ? (
            <p className="runtime-status runtime-status--info">
              {locale === "vi"
                ? `Tổng số khối khóa nội dung: ${contentSnapshot.handbookSections.publishedByAccessLevel.reviewed || 0 + contentSnapshot.memberResources.publishedByAccessLevel.reviewed || 0}`
                : `No additional unlocks are currently tracked in published reviewed content.`}
            </p>
          ) : null}
        </div>
      </section>
    </MemberShell>
  );
}
