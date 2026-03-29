import { getCurrentMember } from "../../lib/auth";
import { getUnreadNotificationCount } from "../../lib/notifications";
import { AppNav } from "./AppNav";

export function AppHeader() {
  const currentMember = getCurrentMember();
  const unreadNotifications = getUnreadNotificationCount();

  return (
    <header className="app-header">
      <div className="app-brand">
        <p className="app-kicker">Local operating layer</p>
        <strong>OMDALAT App Runtime</strong>
        <span>
          {currentMember.name} · {currentMember.role.replace("_", " ")} · {currentMember.status}
        </span>
        <span>{unreadNotifications} unread notifications in the current demo session</span>
      </div>
      <AppNav />
    </header>
  );
}
