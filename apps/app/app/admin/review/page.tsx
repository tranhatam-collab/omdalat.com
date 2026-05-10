import type { Metadata } from "next";
import { reviewMemberApplicationAction } from "../../actions";
import { listAdminReviewItems } from "../../../lib/member-flow";
import { getRequestLocale } from "../../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../../lib/metadata";

type AdminReviewPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const reviewActions = [
  { key: "approve_for_trial", vi: "Duyệt vào thời gian thử", en: "Approve for trial" },
  { key: "request_more_info", vi: "Yêu cầu thêm thông tin", en: "Request more info" },
  { key: "mark_not_suitable", vi: "Đánh dấu chưa phù hợp", en: "Mark not suitable" },
  { key: "promote_active_member", vi: "Chuyển thành thành viên chính", en: "Promote to active member" },
  { key: "promote_contributor", vi: "Mở quyền người đóng góp", en: "Promote to contributor" },
  { key: "promote_host_partner", vi: "Mở quyền đối tác không gian", en: "Promote to host partner" }
] as const;

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Xét duyệt thành viên",
      en: "Admin review"
    },
    description: {
      vi: "Xem hồ sơ mới, chuyển trạng thái, ghi note và mở quyền phù hợp.",
      en: "Review new applications, change status, leave notes, and unlock the right layer."
    },
    path: "/admin/review"
  });
}

export default async function AdminReviewPage({ searchParams }: AdminReviewPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const items = listAdminReviewItems();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const reviewed = readSearchParamValue(resolvedSearchParams.reviewed);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Luồng xét duyệt" : "Admin review flow"}</p>
      <h1>{isVi ? "Hàng đợi xét duyệt thành viên" : "Member review queue"}</h1>
      <p>
        {isVi
          ? "Đây là nơi operator và admin đi qua hồ sơ mới, ghi note, mở trial và nâng quyền contributor hoặc host partner."
          : "This is where operators and admins move through new applications, leave notes, open trials, and promote contributor or host-partner access."}
      </p>

      {reviewed ? (
        <div className="app-status app-status--success">
          {isVi ? "Một quyết định review vừa được ghi nhận." : "A review decision has just been recorded."}
        </div>
      ) : null}

      <div className="app-stack">
        {items.map((item) => (
          <section className="app-panel" key={item.id}>
            <p className="app-kicker">{item.currentStatus}</p>
            <h2>{item.memberName}</h2>
            <p>{locale === "vi" ? item.summary_vi : item.summary_en}</p>
            <ul className="app-list">
              <li>{item.email}</li>
              <li>{item.submittedAt}</li>
              {item.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            <form action={reviewMemberApplicationAction} className="app-form">
              <input type="hidden" name="redirectTo" value="/admin/review" />
              <input type="hidden" name="memberId" value={item.memberId} />
              <label className="app-field">
                <span>{isVi ? "Hành động" : "Action"}</span>
                <select className="app-input" name="action" defaultValue="approve_for_trial">
                  {reviewActions.map((action) => (
                    <option key={action.key} value={action.key}>
                      {locale === "vi" ? action.vi : action.en}
                    </option>
                  ))}
                </select>
              </label>
              <label className="app-field">
                <span>{isVi ? "Ghi chú" : "Note"}</span>
                <textarea className="app-input app-textarea" name="note" />
              </label>
              <button className="app-button" type="submit">
                {isVi ? "Lưu quyết định" : "Save review decision"}
              </button>
            </form>
          </section>
        ))}
      </div>
    </section>
  );
}
