import type { Metadata } from "next";
import { applyForWorkAction } from "../actions";
import { listWorkItems } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

type WorkPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Công việc và cơ hội",
      en: "Work and opportunities"
    },
    description: {
      vi: "Task nội bộ, việc freelance, remote và cơ hội cộng tác trong hệ.",
      en: "Internal tasks, freelance work, remote roles, and collaboration opportunities inside the system."
    },
    path: "/work"
  });
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const items = listWorkItems();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const applied = readSearchParamValue(resolvedSearchParams.applied);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Công việc và cơ hội" : "Work and opportunities"}</p>
      <h1>{isVi ? "Những việc có thể đi cùng đời sống ở đây" : "Work that can travel with life here"}</h1>
      <p>
        {isVi
          ? "Không chỉ là job board. Đây là nơi nhìn thấy task nội bộ, việc freelance, việc online và những cơ hội cộng tác từ các Ấp thật."
          : "This is not only a job board. It shows internal tasks, freelance work, online work, and collaboration opportunities from real Ap spaces."}
      </p>

      {applied ? (
        <div className="app-status app-status--success">
          {isVi ? "Nhu cầu nhận việc của bạn đã được ghi nhận." : "Your work application has been recorded."}
        </div>
      ) : null}

      <div className="app-stack">
        {items.map((item) => (
          <section className="app-panel" key={item.id}>
            <p className="app-kicker">{item.type}</p>
            <h2>{item.title}</h2>
            <p>{locale === "vi" ? item.summary_vi : item.summary_en}</p>
            <ul className="app-list">
              <li>{item.pay_range}</li>
              <li>{item.deadline}</li>
              <li>{item.owner}</li>
              <li>{item.skills_required.join(", ")}</li>
            </ul>
            {item.status === "open" ? (
              <form action={applyForWorkAction} className="app-form">
                <input type="hidden" name="redirectTo" value="/work" />
                <input type="hidden" name="workItemId" value={item.id} />
                <label className="app-field">
                  <span>{isVi ? "Ghi chú thêm" : "Additional note"}</span>
                  <textarea className="app-input app-textarea" name="note" />
                </label>
                <button className="app-button" type="submit">
                  {isVi ? "Xem việc phù hợp" : "Apply for this work"}
                </button>
              </form>
            ) : (
              <p className="app-empty-state">
                {isVi ? "Mục này hiện chưa mở để nộp." : "This item is not open for applications right now."}
              </p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
