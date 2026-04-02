import { getRequestLocale } from "../../lib/locale";

export async function HostsSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Hosts</p>
      <h2>{locale === "vi" ? "Đầu mối vận hành địa phương đã xác minh" : "Verified local operators"}</h2>
      <p>{locale === "vi" ? "Dùng khung này để kết nối hồ sơ host, tín hiệu niềm tin và các địa điểm liên quan khi runtime mở rộng." : "Use this shell to connect host profiles, trust signals, and related places as the runtime grows."}</p>
    </section>
  );
}
