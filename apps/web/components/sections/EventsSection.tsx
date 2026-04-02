import { getRequestLocale } from "../../lib/locale";

export async function EventsSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Events</p>
      <h2>{locale === "vi" ? "Những thời điểm sắp tới giúp tăng mật độ" : "Upcoming moments that grow density"}</h2>
      <p>{locale === "vi" ? "Danh sách sự kiện và route chi tiết giờ có thể chạy trên runtime scaffold mà không đổi luồng static hiện tại." : "Event listing and detail routes can now hang off the runtime scaffold without changing the current static flow."}</p>
    </section>
  );
}
