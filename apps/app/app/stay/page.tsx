import type { Metadata } from "next";
import { requestStayAction } from "../actions";
import { listStayOptions } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

type StayPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function readSearchParamValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Nơi ở",
      en: "Stay"
    },
    description: {
      vi: "Các lựa chọn nơi ở, điều kiện và nhu cầu ở lại trong hệ Ôm Đà Lạt.",
      en: "Stay options, conditions, and requests within the Om Dalat system."
    },
    path: "/stay"
  });
}

export default async function StayPage({ searchParams }: StayPageProps) {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const options = listStayOptions();
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requested = readSearchParamValue(resolvedSearchParams.requested);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Nơi ở" : "Stay"}</p>
      <h1>{isVi ? "Tìm một nơi có thể ở lại" : "Find a place you can stay in"}</h1>
      <p>
        {isVi
          ? "Mục này giúp bạn nhìn rõ loại chỗ ở, khu vực, mức giá, tình trạng còn chỗ và điều kiện đi cùng."
          : "This section helps you see the stay type, area, price, availability, and conditions that come with it."}
      </p>

      {requested ? (
        <div className="app-status app-status--success">
          {isVi ? "Nhu cầu ở lại của bạn đã được ghi nhận." : "Your stay request has been recorded."}
        </div>
      ) : null}

      <div className="app-stack">
        {options.map((item) => (
          <section className="app-panel" key={item.id}>
            <p className="app-kicker">{item.area}</p>
            <h2>{item.space_name}</h2>
            <ul className="app-list">
              <li>{item.monthly_price}</li>
              <li>{item.capacity}</li>
              <li>{item.available_from}</li>
              <li>{item.house_rules}</li>
              <li>{locale === "vi" ? item.note_vi : item.note_en}</li>
            </ul>
            <form action={requestStayAction} className="app-form">
              <input type="hidden" name="redirectTo" value="/stay" />
              <input type="hidden" name="stayOptionId" value={item.id} />
              <label className="app-field">
                <span>{isVi ? "Ghi chú thêm" : "Additional note"}</span>
                <textarea className="app-input app-textarea" name="note" />
              </label>
              <button className="app-button" type="submit">
                {isVi ? "Gửi nhu cầu ở lại" : "Send stay request"}
              </button>
            </form>
          </section>
        ))}
      </div>
    </section>
  );
}
