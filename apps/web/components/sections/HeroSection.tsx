import { getRequestLocale } from "../../lib/locale";

export async function HeroSection() {
  const locale = await getRequestLocale();

  return (
    <section className="runtime-hero">
      <p className="runtime-kicker">{locale === "vi" ? "runtime apps/web" : "apps/web runtime"}</p>
      <h1>
        {locale === "vi"
          ? "Khung runtime công khai OMDALAT cho các địa điểm, con người và hoạt động đáng tin cậy tại Da Lat."
          : "Public OMDALAT runtime scaffold for trusted places, people, and activity in Da Lat."}
      </h1>
      <p>
        {locale === "vi"
          ? "Khung này bám theo định hướng city-layer trong tài liệu, trong khi route gốc hiện tại vẫn phục vụ bản static từ `apps/web/index.html`."
          : "This scaffold mirrors the locked city-layer direction in the docs while the current root route continues to serve the static implementation from `apps/web/index.html`."}
      </p>
      <div className="runtime-actions">
        <a className="runtime-button primary" href="/apps/app/">
          {locale === "vi" ? "Mở tầng vận hành" : "Open operating layer"}
        </a>
        <a className="runtime-button secondary" href="/apps/web/">
          {locale === "vi" ? "Xem bề mặt web static" : "View static web surface"}
        </a>
      </div>
    </section>
  );
}
