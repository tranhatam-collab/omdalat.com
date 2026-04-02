import { getRequestLocale } from "../../lib/locale";

export async function ProofSection() {
  const locale = await getRequestLocale();
  return (
    <section className="runtime-section">
      <p className="runtime-kicker">Proof</p>
      <h2>{locale === "vi" ? "Lớp bằng chứng hiển thị" : "Visible evidence layer"}</h2>
      <p>{locale === "vi" ? "Đây là khung cho các trang công khai có bằng chứng, đồng thời hỗ trợ niềm tin, SEO và độ rõ của thực thể." : "This is the shell for proof-backed public pages that support trust, SEO, and entity clarity together."}</p>
    </section>
  );
}
