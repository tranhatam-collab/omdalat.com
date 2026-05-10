import type { Metadata } from "next";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { completeProfileAction } from "../actions";
import {
  buildRelativeReturnPath,
  canAccessProfileComplete,
  canAccessVerified,
  MEMBER_SESSION_COOKIE_NAME,
  parseMemberSession
} from "../../../lib/member-auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import { MEMBER_REVIEW_QUEUE_COOKIE_NAME, resolveMemberReviewQueue } from "../../../lib/member-review-queue";
import { resolveSessionWithReviewQueue } from "../../../lib/member-session-resolver";
import { cookies } from "next/headers";

export const metadata: Metadata = buildPageMetadata({
  title: "Member Profile | Om Dalat",
  description: "Thông tin hồ sơ cần có để xác nhận mức độ phù hợp và mở rộng quyền truy cập.",
  path: "/member/profile",
  noindex: true
});

type SearchParams = {
  next?: string;
  error?: string;
};

export default async function MemberProfilePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { error, next } = await searchParams;
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );
  const isVerified = canAccessVerified(session);
  const isComplete = canAccessProfileComplete(session);
  const nextPath = buildRelativeReturnPath(next ?? "/member/resources", "/member/welcome");
  let statusMessage = null;

  if (!isVerified) {
    statusMessage = locale === "vi" ? "Bạn chưa xác thực email. Vui lòng hoàn tất xác thực để mở form." : "Email not verified yet. Verify first to continue.";
  } else if (error === "incomplete") {
    statusMessage = locale === "vi" ? "Điền đủ tất cả trường để hoàn tất hồ sơ." : "Fill all required fields to complete your profile.";
  } else if (isComplete) {
    statusMessage = locale === "vi" ? "Hồ sơ của bạn đã đủ để mở thêm tài nguyên." : "Your profile is complete and unlocks deeper access.";
  }

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Hồ sơ", en: "Profile" }}
      title={{ vi: "Hoàn tất hồ sơ thành viên", en: "Complete your member profile" }}
      intro={{
        vi: "Hồ sơ giúp hệ thống hiểu bạn đang ở đâu, bạn cần gì, và mức mở rộng nào phù hợp.",
        en: "The profile helps the system understand where you are, what you need, and which access level fits best."
      }}
      actions={[
        { href: localizePath("/member/application-status", locale), label: { vi: "Xem trạng thái", en: "Check status" }, variant: "primary" },
        { href: localizePath("/member/resources", locale), label: { vi: "Tài nguyên", en: "Resources" } }
      ]}
    >
      {statusMessage ? <p className={`runtime-status ${isComplete ? "runtime-status--success" : "runtime-status--info"}`}>{statusMessage}</p> : null}

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Những trường cần có" : "Required fields"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Họ tên hoặc tên hiển thị" : "Full name or display name"}</li>
            <li>{locale === "vi" ? "Bạn đang ở đâu" : "Where you are now"}</li>
            <li>{locale === "vi" ? "Bạn muốn gì" : "What you want"}</li>
            <li>{locale === "vi" ? "Bạn có thể làm gì" : "What you can contribute"}</li>
            <li>{locale === "vi" ? "Dự định ở bao lâu" : "How long you plan to stay"}</li>
            <li>{locale === "vi" ? "Link giới thiệu bản thân" : "A short intro link"}</li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Khi nào hồ sơ đủ tốt" : "What a good profile looks like"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Nói rõ tình trạng hiện tại" : "It states your current situation clearly"}</li>
            <li>{locale === "vi" ? "Nói rõ bạn có thể đóng góp gì" : "It shows what you can contribute"}</li>
            <li>{locale === "vi" ? "Nói rõ mục tiêu tham gia" : "It explains your participation goal"}</li>
          </ul>
        </section>
      </div>

      <form action={completeProfileAction} className="runtime-form" style={{ marginTop: "1rem" }}>
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="next" value={nextPath} />

        <label className="runtime-field">
          <span>{locale === "vi" ? "Họ tên hoặc tên hiển thị" : "Full name"}</span>
          <input className="runtime-input" name="name" required defaultValue={session.name} />
        </label>
        <label className="runtime-field">
          <span>{locale === "vi" ? "Bạn đang ở đâu" : "Where you are"}</span>
          <input className="runtime-input" name="currentLocation" required />
        </label>
        <label className="runtime-field">
          <span>{locale === "vi" ? "Bạn muốn gì" : "What you want"}</span>
          <input className="runtime-input" name="whatYouWant" required />
        </label>
        <label className="runtime-field">
          <span>{locale === "vi" ? "Bạn có thể làm gì" : "What you can contribute"}</span>
          <input className="runtime-input" name="contribution" required />
        </label>
        <label className="runtime-field">
          <span>{locale === "vi" ? "Dự định ở bao lâu" : "How long you plan to stay"}</span>
          <input className="runtime-input" name="stayLength" required />
        </label>
        <label className="runtime-field">
          <span>{locale === "vi" ? "Link giới thiệu bản thân" : "Self introduction link"}</span>
          <input className="runtime-input" name="introLink" required />
        </label>

        <button className="runtime-button primary" type="submit">
          {locale === "vi" ? "Lưu hồ sơ" : "Save profile"}
        </button>
      </form>
    </MemberShell>
  );
}
