import type { Metadata } from "next";
import { getCurrentMember } from "../../lib/auth";
import { listEarningsForMember } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Thu nhập và đóng góp",
      en: "Earnings and contribution"
    },
    description: {
      vi: "Theo dõi task đã làm, khoản đang chờ thanh toán, khoản đã thanh toán và những đóng góp đã ghi nhận.",
      en: "Track completed tasks, pending payments, paid amounts, and recorded contributions."
    },
    path: "/earnings"
  });
}

export default async function EarningsPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const records = listEarningsForMember(currentMember.id);

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Thu nhập và đóng góp" : "Earnings and contribution"}</p>
      <h1>{isVi ? "Giá trị bạn đã tạo ra" : "The value you have created"}</h1>
      <p>
        {isVi
          ? "Mục này giúp bạn nhìn thấy task đã làm, khoản đang chờ thanh toán, khoản đã thanh toán và dấu vết đóng góp của mình."
          : "This section helps you see what you have done, what is pending, what has been paid, and how your contribution is being recorded."}
      </p>

      {records.length > 0 ? (
        <div className="app-stack">
          {records.map((record, index) => (
            <section className="app-panel" key={`${record.member_id}-${record.source}-${index}`}>
              <h2>{record.source}</h2>
              <ul className="app-list">
                <li>{record.amount.toLocaleString("vi-VN")} {record.currency}</li>
                <li>{record.status}</li>
                <li>{record.paid_at || (isVi ? "Chưa thanh toán" : "Not paid yet")}</li>
                <li>{record.note}</li>
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <section className="app-panel">
          <p>{isVi ? "Chưa có dữ liệu thu nhập cho hồ sơ này." : "There is no earnings data for this profile yet."}</p>
        </section>
      )}
    </section>
  );
}
