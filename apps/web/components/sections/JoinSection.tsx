import { getRequestLocale } from "../../lib/locale";

export async function JoinSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Join</p>
      <h2>{locale === "vi" ? "Điểm vào tham gia" : "Participation entrypoint"}</h2>
      <p>{locale === "vi" ? "Dùng section này cho nội dung onboarding công khai trước khi điều hướng người dùng sang tầng vận hành hoặc luồng ứng dụng." : "Use this section for public onboarding language before routing users into the operating layer or application flow."}</p>
    </section>
  );
}
