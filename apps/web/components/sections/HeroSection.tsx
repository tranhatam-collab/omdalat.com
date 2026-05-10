import { getRequestLocale } from "../../lib/locale";

export async function HeroSection() {
  const locale = await getRequestLocale();

  return (
    <section className="runtime-hero">
      <p className="runtime-kicker">{locale === "vi" ? "Ôm Đà Lạt" : "Om Dalat"}</p>
      <h1>
        {locale === "vi"
          ? "Một nơi để ở lại, làm việc, học từ đời sống và đi cùng cộng đồng."
          : "A place to stay, work, learn from life, and move with community."}
      </h1>
      <p>
        {locale === "vi"
          ? "Bắt đầu từ lớp public để hiểu hệ, rồi chuyển sang ứng dụng thành viên khi bạn sẵn sàng đi sâu hơn."
          : "Start from the public layer to understand the system, then continue to the member application when you are ready for deeper steps."}
      </p>
      <div className="runtime-actions">
        <a className="runtime-button primary" href={locale === "vi" ? "/vi/join" : "/en/join"}>
          {locale === "vi" ? "Bắt đầu từ đây" : "Start here"}
        </a>
        <a className="runtime-button secondary" href={locale === "vi" ? "/vi/community" : "/en/community"}>
          {locale === "vi" ? "Vào Ấp Đà Lạt" : "Enter Ap Dalat"}
        </a>
      </div>
    </section>
  );
}
