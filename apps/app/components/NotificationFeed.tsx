import { EmptyState, Section } from "../../../packages/ui";
import { localizePath } from "../../../packages/core";
import type { NotificationRecord } from "../../../packages/types";
import { markNotificationReadAction } from "../app/actions";
import { getRequestLocale } from "../lib/locale";

type NotificationFeedProps = {
  items: NotificationRecord[];
  title?: string;
  redirectTo?: string;
};

export async function NotificationFeed({
  items,
  title = "Notifications",
  redirectTo = "/dashboard"
}: NotificationFeedProps) {
  const locale = await getRequestLocale();
  const dateLocale = locale === "vi" ? "vi-VN" : "en-US";
  const localizedRedirect = localizePath(redirectTo, locale);
  const titleText = locale === "vi" && title === "Notifications" ? "Thông báo" : title;

  return (
    <Section className="app-panel">
      <p className="app-kicker">{locale === "vi" ? "Thông báo" : "Notifications"}</p>
      <h2>{titleText}</h2>
      {items.length === 0 ? (
        <EmptyState
          className="app-empty-state"
          title={locale === "vi" ? "Hiện chưa có thông báo" : "No notifications right now"}
          detail={
            locale === "vi"
              ? "Các luồng ghi nhận và tín hiệu trust sẽ xuất hiện tại đây khi phát sinh."
              : "Write flows and trust signals will drop into this feed as they happen."
          }
        />
      ) : (
        <ul className="app-notification-list">
          {items.map((item) => (
            <li className={`app-notification-item${item.read ? " app-notification-item-read" : ""}`} key={item.id}>
              <div className="app-notification-copy">
                <p className="app-card-meta">
                  {item.kind} · {new Date(item.createdAt).toLocaleString(dateLocale)}
                </p>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
                {item.ctaHref ? (
                  <a className="app-inline-link" href={item.ctaHref.startsWith("/") ? localizePath(item.ctaHref, locale) : item.ctaHref}>
                    {item.ctaLabel ?? (locale === "vi" ? "Mở" : "Open")}
                  </a>
                ) : null}
              </div>
              {!item.read ? (
                <form action={markNotificationReadAction} className="app-inline-form">
                  <input type="hidden" name="notificationId" value={item.id} />
                  <input type="hidden" name="redirectTo" value={localizedRedirect} />
                  <button className="app-button app-button-secondary" type="submit">
                    {locale === "vi" ? "Đánh dấu đã đọc" : "Mark read"}
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
