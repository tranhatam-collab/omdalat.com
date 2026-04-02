import { getRequestLocale } from "../../lib/locale";

export async function CommunitiesSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Communities</p>
      <h2>{locale === "vi" ? "Nhóm cộng đồng địa phương thực, không phải phân khúc chung chung" : "Real local groups, not generic audience buckets"}</h2>
      <p>{locale === "vi" ? "Khung đã sẵn sàng để cộng đồng trở thành một phần hiển thị rõ ràng trong kiến trúc thông tin công khai." : "The shell is in place for communities to become a visible part of the public information architecture."}</p>
    </section>
  );
}
