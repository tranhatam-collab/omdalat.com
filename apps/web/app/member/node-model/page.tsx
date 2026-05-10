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
  title: "Node Model | Om Dalat",
  description: "Mô hình mở rộng theo điểm của Om Dalat ở mức tổng quan dành cho thành viên.",
  path: "/member/node-model",
  noindex: true
});

export default async function MemberNodeModelPage() {
  const locale = await getRequestLocale();
  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const session = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessReviewed(session)) {
    redirect(gatePathForRequirement("reviewed", locale, "/member/node-model"));
  }

  return (
    <MemberShell
      locale={locale}
      eyebrow={{ vi: "Mở rộng", en: "Expansion" }}
      title={{ vi: "Mô hình mở rộng theo điểm", en: "Distributed expansion model" }}
      intro={{
        vi: "Đây là cách hệ có thể mở rộng theo từng điểm vận hành mà vẫn giữ được quy tắc, con người phụ trách và nhịp sống chung.",
        en: "This is how the system can expand by operating location while keeping shared rules, responsible people, and a consistent rhythm."
      }}
      actions={[
        { href: localizePath("/member/resources", locale), label: { vi: "Xem tài nguyên", en: "View resources" }, variant: "primary" },
        { href: localizePath("/member/investor-overview", locale), label: { vi: "Xem tổng quan", en: "View overview" } }
      ]}
    >
      <div className="runtime-page-grid">
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Một điểm vận hành gồm gì" : "What an operating point includes"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Người phụ trách" : "A responsible lead"}</li>
            <li>{locale === "vi" ? "Không gian và nhịp sống" : "Space and rhythm"}</li>
            <li>{locale === "vi" ? "Quy tắc chung" : "Shared rules"}</li>
            <li>{locale === "vi" ? "Luồng làm việc và học" : "Work and learning flow"}</li>
          </ul>
        </section>
        <section className="runtime-panel">
          <h2>{locale === "vi" ? "Điểm vận hành này không phải là gì" : "What this model is not"}</h2>
          <ul className="runtime-list">
            <li>{locale === "vi" ? "Không phải một thương hiệu tách riêng" : "Not a separate standalone brand"}</li>
            <li>{locale === "vi" ? "Không phải mở rộng vô khuôn" : "Not uncontrolled expansion"}</li>
            <li>{locale === "vi" ? "Không phải thay đổi bản chất của hệ" : "Not a change in the system's core"}</li>
          </ul>
        </section>
      </div>
    </MemberShell>
  );
}
