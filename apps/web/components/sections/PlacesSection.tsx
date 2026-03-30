import { getRequestLocale } from "../../lib/locale";

export async function PlacesSection() {
  const locale = await getRequestLocale();

  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Places</p>
      <h2>{locale === "vi" ? "Không gian đáng tin cậy trong city layer" : "Trusted spaces in the city layer"}</h2>
      <p>
        {locale === "vi"
          ? "Khung route và card cho địa điểm có thể được xây trên runtime này mà không cần đụng vào site static đang chạy."
          : "Route and card shells for places can now be built on top of this runtime without touching the live static site."}
      </p>
    </section>
  );
}
