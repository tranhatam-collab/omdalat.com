import { getRequestLocale } from "../../lib/locale";

export async function ExpertsSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Experts</p>
      <h2>{locale === "vi" ? "Lớp năng lực chuyên sâu" : "Specialized capability layer"}</h2>
      <p>{locale === "vi" ? "Section này sẵn sàng cho card chuyên gia, route chi tiết và khám phá chuyên môn theo ngữ cảnh địa phương." : "This section is ready for expert cards, detail routes, and locality-aware expertise discovery."}</p>
    </section>
  );
}
