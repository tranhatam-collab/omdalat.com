import type { Metadata } from "next";
import { getCurrentMember } from "../../lib/auth";
import { listAccessibleResources } from "../../lib/member-flow";
import { getRequestLocale } from "../../lib/locale";
import { buildCurrentLocaleAppMetadata } from "../../lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildCurrentLocaleAppMetadata({
    title: {
      vi: "Tài nguyên đã mở",
      en: "Open resources"
    },
    description: {
      vi: "Tài nguyên mở theo đúng quyền và bước tham gia hiện tại của bạn.",
      en: "Resources opened according to your current access and participation stage."
    },
    path: "/resources"
  });
}

export default async function ResourcesPage() {
  const locale = await getRequestLocale();
  const isVi = locale === "vi";
  const currentMember = await getCurrentMember(locale);
  const resources = listAccessibleResources(currentMember.memberStatus ?? "guest");

  return (
    <section className="app-page">
      <p className="app-kicker">{isVi ? "Tài nguyên đã mở" : "Open resources"}</p>
      <h1>{isVi ? "Những gì bạn có thể đọc ở bước này" : "What you can read at this stage"}</h1>
      <p>
        {isVi
          ? "Tài nguyên mở theo quyền để người dùng không bị ngợp và không thấy những thứ chưa dành cho mình."
          : "Resources open by permission so people are not overwhelmed or shown layers that are not yet theirs."}
      </p>

      {resources.length > 0 ? (
        <div className="app-stack">
          {resources.map((item) => (
            <section className="app-panel" key={item.id}>
              <h2>{locale === "vi" ? item.title_vi : item.title_en}</h2>
              <p>{locale === "vi" ? item.excerpt_vi : item.excerpt_en}</p>
            </section>
          ))}
        </div>
      ) : (
        <section className="app-panel">
          <p>
            {isVi
              ? "Tài nguyên cho bước này vẫn chưa mở. Khi hồ sơ của bạn đi tiếp, những phần phù hợp sẽ hiện ra."
              : "Resources for this stage are not open yet. As your profile moves forward, the relevant sections will appear."}
          </p>
        </section>
      )}
    </section>
  );
}
