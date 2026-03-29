import { EmptyState, Section } from "../../../packages/ui";
import type { NotificationRecord } from "../../../packages/types";
import { markNotificationReadAction } from "../app/actions";

type NotificationFeedProps = {
  items: NotificationRecord[];
  title?: string;
  redirectTo?: string;
};

export function NotificationFeed({
  items,
  title = "Notifications",
  redirectTo = "/dashboard"
}: NotificationFeedProps) {
  return (
    <Section className="app-panel">
      <p className="app-kicker">Notifications</p>
      <h2>{title}</h2>
      {items.length === 0 ? (
        <EmptyState
          className="app-empty-state"
          title="No notifications right now"
          detail="Write flows and trust signals will drop into this feed as they happen."
        />
      ) : (
        <ul className="app-notification-list">
          {items.map((item) => (
            <li className={`app-notification-item${item.read ? " app-notification-item-read" : ""}`} key={item.id}>
              <div className="app-notification-copy">
                <p className="app-card-meta">
                  {item.kind} · {new Date(item.createdAt).toLocaleString("en-US")}
                </p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.ctaHref ? (
                  <a className="app-inline-link" href={item.ctaHref}>
                    {item.ctaLabel ?? "Open"}
                  </a>
                ) : null}
              </div>
              {!item.read ? (
                <form action={markNotificationReadAction} className="app-inline-form">
                  <input type="hidden" name="notificationId" value={item.id} />
                  <input type="hidden" name="redirectTo" value={redirectTo} />
                  <button className="app-button app-button-secondary" type="submit">
                    Mark read
                  </button>
                </form>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
