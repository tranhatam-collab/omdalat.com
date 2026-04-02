import { getRequestLocale } from "../../lib/locale";

export async function LiveActivitySection() {
  const locale = await getRequestLocale();

  return (
    <section className="runtime-section">
      <p className="runtime-kicker">{locale === "vi" ? "Hoạt động trực tiếp" : "Live activity"}</p>
      <h2>{locale === "vi" ? "Khung section trang chủ" : "Homepage section scaffold"}</h2>
      <p>
        {locale === "vi"
          ? "Section này dùng để hiển thị điều gì đang hoạt động, node nào đang chuyển động và mật độ tiếp theo nằm ở đâu."
          : "Use this section to show what is active now, which nodes are moving, and where the next density moments are."}
      </p>
    </section>
  );
}
