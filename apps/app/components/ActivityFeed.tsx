import { Section } from "../../../packages/ui";

type ActivityFeedProps = {
  title?: string;
  items: string[];
};

export function ActivityFeed({ title = "Current runtime progress", items }: ActivityFeedProps) {
  return (
    <Section className="app-panel">
      <p className="app-kicker">Activity feed</p>
      <h2>{title}</h2>
      <ul className="app-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </Section>
  );
}
