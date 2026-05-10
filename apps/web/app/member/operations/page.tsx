import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { localizePath } from "../../../../../packages/core";
import { MemberShell } from "../_member-shell";
import { getContentOpsSnapshot } from "../../../lib/content-seed";
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
  title: "Operations | Om Dalat",
  description: "Snapshot vận hành nội dung, trạng thái publish, và những lớp vẫn còn ở hàng biên tập.",
  path: "/member/operations",
  noindex: true
});

export default async function MemberOperationsPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessReviewed(session)) {
    redirect(gatePathForRequirement("reviewed", locale, "/member/operations"));
  }

  const snapshot = getContentOpsSnapshot();
  const blockerCopy = {
    "public-article-wave-empty": {
      vi: "Lớp bài public đầu tiên vẫn chưa có bài nào được publish.",
      en: "The first public article wave still has no published pieces."
    },
    "registered-member-wave-empty": {
      vi: "Lớp tài nguyên mở cho registered member vẫn chưa có nội dung published.",
      en: "The registered-member resource layer still has no published content."
    },
    "reviewed-layer-empty": {
      vi: "Lớp reviewed vẫn đang chờ biên tập và chưa nên mở rộng quyền.",
      en: "The reviewed layer is still in editorial prep and should not open wider yet."
    }
  } as const;
  const accessRows = [
    { accessLevel: "guest", label: { vi: "Guest", en: "Guest" } },
    { accessLevel: "registered", label: { vi: "Registered", en: "Registered" } },
    { accessLevel: "reviewed", label: { vi: "Reviewed", en: "Reviewed" } },
    { accessLevel: "internal", label: { vi: "Internal", en: "Internal" } }
  ] as const;
  const pillarRows = [
    { pillarKey: "song", label: { vi: "Sống ở Đà Lạt", en: "Living in Dalat" } },
    { pillarKey: "work", label: { vi: "Làm việc ở Đà Lạt", en: "Working in Dalat" } },
    { pillarKey: "xay-cuoc-doi", label: { vi: "Xây cuộc đời", en: "Building a life" } }
  ] as const;
  const snapshotCards = [
    {
      label: locale === "vi" ? "Bài public đã mở" : "Published public articles",
      value: `${snapshot.articles.byStatus.published}/${snapshot.articles.total}`,
      note: locale === "vi" ? "Sẵn sàng cho article wave hiện tại" : "Ready for the current article wave"
    },
    {
      label: locale === "vi" ? "Tài nguyên member đã mở" : "Published member resources",
      value: `${snapshot.memberResources.byStatus.published}/${snapshot.memberResources.total}`,
      note: locale === "vi" ? "Chỉ tính tài liệu đã publish" : "Published resources only"
    },
    {
      label: locale === "vi" ? "Handbook đã mở" : "Published handbook sections",
      value: `${snapshot.handbookSections.byStatus.published}/${snapshot.handbookSections.total}`,
      note: locale === "vi" ? "Các phần đã qua editorial pass" : "Sections that passed editorial review"
    },
    {
      label: locale === "vi" ? "Điểm còn chờ" : "Open blockers",
      value: `${snapshot.blockers.length}`,
      note: locale === "vi" ? "Những phần chưa nên mở rộng" : "Areas that should not open yet"
    }
  ];

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Vận hành", en: "Operations" }}
      title={{ vi: "Snapshot vận hành nội dung", en: "Content operations snapshot" }}
      intro={{
        vi: "Trang này cho bạn thấy lớp public đã mở tới đâu, lớp member nào đã sẵn sàng, và phần nào vẫn nên ở hàng biên tập.",
        en: "This page shows how far the public layer has opened, which member layers are ready, and what should remain in the editorial queue."
      }}
      actions={[
        { href: localizePath("/member/handbook", locale), label: { vi: "Mở sổ tay", en: "Open handbook" }, variant: "primary" },
        { href: localizePath("/member/resources", locale), label: { vi: "Xem tài nguyên", en: "View resources" } }
      ]}
    >
      <div className="runtime-card-grid">
        {snapshotCards.map((card) => (
          <section className="runtime-panel" key={card.label}>
            <p className="runtime-meta">{card.label}</p>
            <p className="runtime-stat">{card.value}</p>
            <p>{card.note}</p>
          </section>
        ))}
      </div>

      <section className="runtime-section runtime-section-wide">
        <h2>{locale === "vi" ? "Nhịp mở bài public" : "Public article cadence"}</h2>
        <ul className="runtime-list">
          {pillarRows.map((pillar) => (
            <li key={pillar.pillarKey}>
              {locale === "vi" ? pillar.label.vi : pillar.label.en}:{" "}
              {snapshot.articles.publishedByPillar[pillar.pillarKey]} {locale === "vi" ? "đã mở" : "published"},{" "}
              {snapshot.articles.draftByPillar[pillar.pillarKey]} {locale === "vi" ? "đang draft" : "still draft"}
            </li>
          ))}
        </ul>
      </section>

      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ladder tài nguyên" : "Resource ladder"}</h2>
          <ul className="runtime-list">
            {accessRows.map((row) => (
              <li key={`resources-${row.accessLevel}`}>
                {locale === "vi" ? row.label.vi : row.label.en}:{" "}
                {snapshot.memberResources.publishedByAccessLevel[row.accessLevel]}/
                {snapshot.memberResources.byAccessLevel[row.accessLevel]}{" "}
                {locale === "vi" ? "đã publish" : "published"}
              </li>
            ))}
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Ladder handbook" : "Handbook ladder"}</h2>
          <ul className="runtime-list">
            {accessRows.map((row) => (
              <li key={`handbook-${row.accessLevel}`}>
                {locale === "vi" ? row.label.vi : row.label.en}:{" "}
                {snapshot.handbookSections.publishedByAccessLevel[row.accessLevel]}/
                {snapshot.handbookSections.byAccessLevel[row.accessLevel]}{" "}
                {locale === "vi" ? "đã publish" : "published"}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="runtime-section runtime-section-wide">
        <h2>{locale === "vi" ? "Điểm còn chờ" : "Open blockers"}</h2>
        {snapshot.blockers.length > 0 ? (
          <ul className="runtime-list">
            {snapshot.blockers.map((blocker) => (
              <li key={blocker}>{locale === "vi" ? blockerCopy[blocker].vi : blockerCopy[blocker].en}</li>
            ))}
          </ul>
        ) : (
          <p className="runtime-status runtime-status--success">
            {locale === "vi"
              ? "Các lớp nội dung hiện tại đã có nhịp mở đủ cho wave đang chạy."
              : "The current content layers are open enough for the active release wave."}
          </p>
        )}
      </section>
    </MemberShell>
  );
}
