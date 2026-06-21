import type { Metadata } from "next";
import { cookies } from "next/headers";

import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { decideReviewQueueAction, requestReviewQueueAction } from "../actions";
import { getContentOpsSnapshot, getHandbookSections, getMemberResources } from "../../../lib/content-seed";
import {
  MEMBER_SESSION_COOKIE_NAME,
  buildRelativeReturnPath,
  canAccessContent,
  canAccessProfileComplete,
  canAccessReviewed,
  canAccessSignedIn,
  canAccessVerified,
  canProcessReviewDecision,
  canSubmitReviewRequest,
  hasPendingReview,
  parseMemberSession
} from "../../../lib/member-auth";
import { getRequestLocale } from "../../../lib/locale";
import { buildPageMetadata } from "../../../lib/metadata";
import {
  getLatestReviewRequestForMember,
  listPendingReviewQueue,
  MEMBER_REVIEW_QUEUE_COOKIE_NAME,
  resolveMemberReviewQueue
} from "../../../lib/member-review-queue";
import { resolveReviewStatusFromQueueObject, resolveSessionWithReviewQueue } from "../../../lib/member-session-resolver";

export const metadata: Metadata = buildPageMetadata({
  title: "Application Status | Om Dalat",
  description: "Trạng thái hồ sơ thành viên, quyết định duyệt hồ sơ, và luồng mở quyền reviewed member.",
  path: "/member/application-status",
  noindex: true
});

type SearchParams = {
  required?: string;
  next?: string;
  review?: string;
  requestId?: string;
};

export default async function MemberApplicationStatusPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const locale = await getRequestLocale();
  const { required, next, review, requestId } = await searchParams;
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );
  const pendingCandidate = listPendingReviewQueue(reviewQueue, 1)[0] ?? null;
  const latestOwnRequest = getLatestReviewRequestForMember(reviewQueue, session.id, session.email);
  const resources = getMemberResources(locale);
  const handbookSections = getHandbookSections(locale);
  const contentSnapshot = getContentOpsSnapshot();

  const isSignedIn = canAccessSignedIn(session);
  const isVerified = canAccessVerified(session);
  const isProfileComplete = canAccessProfileComplete(session);
  const isReviewed = canAccessReviewed(session);
  const canSubmitReview = canSubmitReviewRequest(session);
  const reviewPending = hasPendingReview(session);
  const canDecideReview = canProcessReviewDecision(session);
  const resolvedReviewStatus = resolveReviewStatusFromQueueObject(session, reviewQueue);
  const needsReviewGate = required === "reviewed-member" && !isReviewed;
  const nextPath = buildRelativeReturnPath(next, "/member/application-status");
  const shouldContinueToNext = nextPath !== "/member/application-status";
  const publishedResources = resources.filter((resource) => resource.status === "published");
  const publishedHandbookSections = handbookSections.filter((section) => section.status === "published");

  const unlockedResources = publishedResources.filter((resource) => canAccessContent(session, resource.accessLevel));
  const upcomingResources = publishedResources.filter((resource) => !canAccessContent(session, resource.accessLevel));
  const unlockedHandbook = publishedHandbookSections.filter((section) => canAccessContent(session, section.accessLevel));
  const upcomingHandbook = publishedHandbookSections.filter((section) => !canAccessContent(session, section.accessLevel));
  const reviewedPublishedCount =
    contentSnapshot.memberResources.publishedByAccessLevel.reviewed +
    contentSnapshot.handbookSections.publishedByAccessLevel.reviewed;

  const statusLabel = isReviewed
    ? locale === "vi"
      ? "Đã được duyệt. Bạn đang ở reviewed member."
      : "Approved. You are in reviewed member state."
    : reviewPending
      ? locale === "vi"
        ? "Hồ sơ đang ở review queue."
        : "Your profile is currently in the review queue."
      : isProfileComplete
        ? locale === "vi"
          ? "Hồ sơ đã đủ. Bạn có thể gửi vào review queue."
          : "Your profile is complete and ready for review queue."
        : isVerified
          ? locale === "vi"
            ? "Email đã xác thực. Cần hoàn tất hồ sơ trước khi gửi review."
            : "Email is verified. Complete your profile before review."
          : locale === "vi"
            ? "Chưa xác thực email."
            : "Email verification pending.";

  const phaseLabel = isReviewed
    ? locale === "vi"
      ? "Reviewed member"
      : "Reviewed member"
    : locale === "vi"
      ? "Registered member"
      : "Registered member";

  const reviewStatusLabel = resolvedReviewStatus === "approved"
    ? locale === "vi"
      ? "Đã duyệt"
      : "Approved"
    : resolvedReviewStatus === "pending"
      ? locale === "vi"
        ? "Đang chờ duyệt"
        : "Pending review"
      : resolvedReviewStatus === "rejected"
        ? locale === "vi"
          ? "Đã từ chối"
          : "Rejected"
        : locale === "vi"
          ? "Chưa gửi duyệt"
          : "Not submitted";

  const reviewFeedback = review === "submitted"
    ? locale === "vi"
      ? "Đã gửi hồ sơ vào review queue."
      : "Your profile has been submitted to the review queue."
    : review === "pending"
      ? locale === "vi"
        ? "Hồ sơ này đang ở hàng duyệt."
        : "This profile is already in the review queue."
      : review === "approved"
        ? locale === "vi"
          ? "Duyệt thành công. Tài khoản đã được nâng lên reviewed member."
          : "Approved. This account is now a reviewed member."
        : review === "rejected"
          ? locale === "vi"
            ? "Yêu cầu đã bị từ chối. Bạn có thể cập nhật hồ sơ rồi gửi lại."
            : "The request was rejected. You can update your profile and submit again."
          : review === "already"
            ? locale === "vi"
              ? "Tài khoản này đã ở reviewed member."
              : "This account is already a reviewed member."
            : review === "blocked" || review === "decision-blocked"
              ? locale === "vi"
                ? "Trạng thái hiện tại chưa đủ điều kiện cho thao tác review."
                : "The current state does not allow this review action."
              : review === "invalid-decision"
                ? locale === "vi"
                  ? "Quyết định review không hợp lệ."
                  : "The review decision is invalid."
                : review === "invalid-request"
                  ? locale === "vi"
                    ? "Thiếu request id cho quyết định review."
                    : "The review decision is missing a request id."
                  : review === "queue-missing"
                    ? locale === "vi"
                      ? "Không tìm thấy request cần duyệt."
                      : "The review request could not be found."
                    : review === "queue-closed"
                      ? locale === "vi"
                        ? "Request này đã được xử lý trước đó."
                        : "This request was already processed."
                : review === "queue-empty"
                  ? locale === "vi"
                    ? "Hiện không có hồ sơ nào đang chờ duyệt."
                    : "There is no pending profile in the review queue right now."
                  : null;

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Trạng thái", en: "Status" }}
      title={{ vi: "Tình trạng hồ sơ của bạn", en: "Your application status" }}
      intro={{
        vi: "Trang này cho bạn biết hồ sơ đang ở đâu, review queue đang ở trạng thái nào, và khi nào quyền reviewed được mở.",
        en: "This page shows where your profile stands, what your review queue state is, and when reviewed access is unlocked."
      }}
      actions={[
        {
          href: localizePath(
            shouldContinueToNext ? `/member/profile?next=${encodeURIComponent(nextPath)}` : "/member/profile",
            locale
          ),
          label: { vi: "Cập nhật hồ sơ", en: "Update profile" },
          variant: "primary"
        },
        { href: localizePath("/member/resources", locale), label: { vi: "Xem tài nguyên", en: "View resources" } }
      ]}
    >
      {reviewFeedback ? (
        <p className={`runtime-status ${review === "approved" ? "runtime-status--success" : "runtime-status--info"}`}>
          {reviewFeedback}
        </p>
      ) : null}

      {needsReviewGate && !isReviewed ? (
        <p className="runtime-status runtime-status--info">
          {locale === "vi"
            ? "Route này cần reviewed member. Hoàn tất profile và đi qua review queue để mở quyền."
            : "This route requires reviewed member access. Complete profile and pass the review queue first."}
        </p>
      ) : null}

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Trạng thái hiện tại" : "Current status"}</h2>
          <ul className="runtime-list">
            <li>{isSignedIn ? phaseLabel : locale === "vi" ? "Chưa đăng nhập" : "Not signed in"}</li>
            <li>{statusLabel}</li>
            <li>
              {locale === "vi" ? "Quyền truy cập hiện tại" : "Current role"}: {session.role}
            </li>
            <li>
              {locale === "vi" ? "Review queue" : "Review queue"}: {reviewStatusLabel}
            </li>
            <li>
              {locale === "vi" ? "Nội dung reviewed đã publish" : "Published reviewed items"}: {reviewedPublishedCount}
            </li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Bước tiếp theo" : "Next step"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Xác thực email nếu còn thiếu" : "Verify email if still pending"}</li>
            <li>{locale === "vi" ? "Hoàn tất hồ sơ profile" : "Complete your profile"}</li>
            <li>{locale === "vi" ? "Gửi review queue, chờ xác nhận duyệt" : "Submit to review queue and wait for approval"}</li>
          </ul>
        </section>
      </div>

      {!isReviewed || canDecideReview ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Review queue" : "Review queue"}</h2>
          <p className="runtime-note">
            {canDecideReview
              ? pendingCandidate
                ? locale === "vi"
                  ? `Đội nội bộ đang xem hồ sơ của ${pendingCandidate.memberName}. Bạn có thể duyệt hoặc từ chối ngay tại đây.`
                  : `The internal team is reviewing ${pendingCandidate.memberName}. You can approve or reject the profile here.`
                : locale === "vi"
                  ? "Hiện chưa có hồ sơ nào đang chờ trong review queue."
                  : "There is no pending profile in the review queue right now."
              : reviewPending
                ? locale === "vi"
                  ? "Hồ sơ đã vào hàng duyệt. Đang chờ xác nhận từ đội nội bộ."
                  : "This profile is in the queue. It is waiting for an internal review confirmation."
                : canSubmitReview
                  ? locale === "vi"
                    ? "Hồ sơ đã đủ điều kiện. Gửi vào review queue để chờ duyệt."
                    : "Your profile is eligible. Submit it to the review queue to enter review."
                  : locale === "vi"
                    ? "Bạn cần email đã xác thực và hồ sơ hoàn tất trước khi gửi review."
                    : "You need a verified email and a completed profile before review submission."}
          </p>

          {canSubmitReview ? (
            <form action={requestReviewQueueAction} className="runtime-form">
              <input type="hidden" name="locale" value={locale} />
              <input type="hidden" name="next" value={nextPath} />
              <button className="runtime-button primary" type="submit">
                {locale === "vi" ? "Gửi vào review queue" : "Submit to review queue"}
              </button>
            </form>
          ) : null}

          {canDecideReview && pendingCandidate ? (
            <div className="runtime-page-grid" style={{ marginTop: "0.75rem" }}>
              <article className="runtime-link-card">
                <strong>{pendingCandidate.memberName}</strong>
                <span>{pendingCandidate.memberEmail}</span>
                <span>
                  {locale === "vi" ? "Mã yêu cầu" : "Request ID"}: {pendingCandidate.id}
                </span>
                <span>
                  {locale === "vi"
                    ? `Gửi lúc: ${new Date(pendingCandidate.requestedAt).toLocaleString("vi-VN")}`
                    : `Submitted: ${new Date(pendingCandidate.requestedAt).toLocaleString("en-US")}`}
                </span>
              </article>

              <form action={decideReviewQueueAction} className="runtime-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="next" value={nextPath} />
                <input type="hidden" name="requestId" value={pendingCandidate.id} />
                <input type="hidden" name="decision" value="approve" />
                <button className="runtime-button primary" type="submit">
                  {shouldContinueToNext
                    ? locale === "vi"
                      ? "Duyệt hồ sơ và mở quyền"
                      : "Approve and unlock access"
                    : locale === "vi"
                      ? "Duyệt hồ sơ"
                      : "Approve application"}
                </button>
              </form>

              <form action={decideReviewQueueAction} className="runtime-form">
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="next" value={nextPath} />
                <input type="hidden" name="requestId" value={pendingCandidate.id} />
                <input type="hidden" name="decision" value="reject" />
                <button className="runtime-button secondary" type="submit">
                  {locale === "vi" ? "Từ chối hồ sơ" : "Reject application"}
                </button>
              </form>
            </div>
          ) : null}

          {reviewPending && !canDecideReview ? (
            <p className="runtime-status runtime-status--info" style={{ marginTop: "0.75rem" }}>
              {locale === "vi"
                ? "Hồ sơ đã gửi thành công. Đang chờ đội nội bộ xét duyệt."
                : "Your profile has been submitted. Waiting for the internal review team to decide."}
            </p>
          ) : null}

          {latestOwnRequest ? (
            <article className="runtime-link-card" style={{ marginTop: "0.75rem" }}>
              <strong>{locale === "vi" ? "Request review hiện tại" : "Current review request"}</strong>
              <span>{locale === "vi" ? "Mã yêu cầu" : "Request ID"}: {latestOwnRequest.id}</span>
              <span>
                {locale === "vi"
                  ? `Gửi lúc: ${new Date(latestOwnRequest.requestedAt).toLocaleString("vi-VN")}`
                  : `Submitted: ${new Date(latestOwnRequest.requestedAt).toLocaleString("en-US")}`}
              </span>
              <span>{locale === "vi" ? "Trạng thái" : "Status"}: {latestOwnRequest.status}</span>
              {latestOwnRequest.decidedAt ? (
                <span>
                  {locale === "vi"
                    ? `Xử lý lúc: ${new Date(latestOwnRequest.decidedAt).toLocaleString("vi-VN")}`
                    : `Handled: ${new Date(latestOwnRequest.decidedAt).toLocaleString("en-US")}`}
                </span>
              ) : null}
              {latestOwnRequest.decidedByEmail ? (
                <span>
                  {locale === "vi" ? "Duyệt bởi" : "Handled by"}: {latestOwnRequest.decidedByEmail}
                </span>
              ) : null}
              {requestId && requestId === latestOwnRequest.id ? (
                <span>{locale === "vi" ? "Đây là request vừa xử lý." : "This is the request just handled."}</span>
              ) : null}
            </article>
          ) : null}
        </section>
      ) : null}

      {isReviewed && shouldContinueToNext ? (
        <section className="runtime-section runtime-section-wide">
          <h2>{locale === "vi" ? "Đi tiếp luồng hiện tại" : "Continue current flow"}</h2>
          <a className="runtime-button primary" href={localizePath(nextPath, locale)}>
            {locale === "vi" ? "Mở trang tiếp theo" : "Open next page"}
          </a>
        </section>
      ) : null}

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Những phần đã mở" : "Open sections"}</h2>
        <div className="runtime-card-grid">
          {unlockedResources.slice(0, 6).map((resource) => (
            <article className="runtime-link-card" key={`open-resource-${resource.id}`}>
              <strong>{resource.title}</strong>
              <span>{resource.excerpt}</span>
              <span>
                {locale === "vi" ? "Mở cho vai trò" : "Available for"}: {resource.accessLevel}
              </span>
            </article>
          ))}
          {unlockedHandbook.slice(0, 6).map((section) => (
            <article className="runtime-link-card" key={`open-handbook-${section.id}`}>
              <strong>{section.title}</strong>
              <span>{section.summary}</span>
              <span>
                {locale === "vi" ? "Mở cho vai trò" : "Available for"}: {section.accessLevel}
              </span>
            </article>
          ))}
          {unlockedResources.length === 0 && unlockedHandbook.length === 0 ? (
            <p className="runtime-status runtime-status--info">
              {locale === "vi"
                ? "Hiện chưa có nội dung nào mở cho phiên này."
                : "Resources for this stage are not open yet."}
            </p>
          ) : null}
        </div>
      </section>

      <section className="runtime-panel">
        <h2>{locale === "vi" ? "Các phần mở tiếp theo" : "Next sections"}</h2>
        <div className="runtime-card-grid">
          {upcomingResources.slice(0, 6).map((resource) => (
            <article className="runtime-link-card" key={`upcoming-resource-${resource.id}`}>
              <strong>{resource.title}</strong>
              <span>{resource.excerpt}</span>
              <span>
                {locale === "vi" ? "Mở cho vai trò" : "Available for"}: {resource.accessLevel}
              </span>
            </article>
          ))}
          {upcomingHandbook.slice(0, 6).map((section) => (
            <article className="runtime-link-card" key={`upcoming-handbook-${section.id}`}>
              <strong>{section.title}</strong>
              <span>{section.summary}</span>
              <span>
                {locale === "vi" ? "Mở cho vai trò" : "Available for"}: {section.accessLevel}
              </span>
            </article>
          ))}
          {upcomingResources.length === 0 && upcomingHandbook.length === 0 ? (
            <p className="runtime-status runtime-status--success">
              {locale === "vi"
                ? "Bạn đã mở tất cả lớp nội dung đã publish."
                : "All currently published sections are already open for your account."}
            </p>
          ) : null}
        </div>
      </section>
    </MemberShell>
  );
}
