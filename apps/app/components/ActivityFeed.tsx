import { Section } from "../../../packages/ui";
import { getRequestLocale } from "../lib/locale";

type ActivityFeedProps = {
  title?: string;
  items: string[];
};

export async function ActivityFeed({ title = "Current runtime progress", items }: ActivityFeedProps) {
  const locale = await getRequestLocale();

  return (
    <Section className="app-panel">
      <p className="app-kicker">{locale === "vi" ? "Luồng hoạt động" : "Activity feed"}</p>
      <h2>{locale === "vi" && title === "Current runtime progress" ? "Tiến độ runtime hiện tại" : title}</h2>
      <ul className="app-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
