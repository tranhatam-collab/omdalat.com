type ActivityFeedProps = {
  items: string[];
};

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <section className="app-panel">
      <p className="app-kicker">Activity feed</p>
      <h2>Current runtime progress</h2>
      <ul className="app-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
