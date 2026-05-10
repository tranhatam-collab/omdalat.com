import type { Metadata } from "next";
import { listLearningPrograms } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Chương trình thực địa",
      en: "Real-life learning programs"
    },
    description: {
      vi: "Những chương trình 7, 14 và 30 ngày để học từ nhịp sống, công việc và cộng đồng.",
      en: "7, 14, and 30-day programs for learning from rhythm, work, and community."
    },
    path: "/learning"
  });
}

export default async function LearningPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const programs = listLearningPrograms();

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Học từ thực tế" : "Learning from real life"}</p>
      <h1>{isVi ? "Chương trình thực địa" : "Real-life learning programs"}</h1>
      <p>
        {isVi
          ? "Ở đây không gọi là khóa học. Đây là những chương trình gắn với đời sống, output và người hướng dẫn thật."
          : "These are not framed as courses. They are real-life programs tied to daily rhythm, output, and real guides."}
      </p>

      <div className="app-stack">
        {programs.map((program) => (
          <section className="app-panel" key={program.id}>
            <p className="app-kicker">{program.duration}</p>
            <h2>{locale === "vi" ? program.title_vi : program.title_en}</h2>
            <ul className="app-list">
              <li>{locale === "vi" ? program.output_vi : program.output_en}</li>
              <li>{locale === "vi" ? program.mentor_vi : program.mentor_en}</li>
              <li>{program.cost}</li>
            </ul>
          </section>
        ))}
      </div>
    </section>
  );
}
