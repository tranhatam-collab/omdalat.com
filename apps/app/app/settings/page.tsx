import { OMDALAT_INBOXES } from "../../../../packages/core";
import { SupportRequestForm } from "../../components/SupportRequestForm";
import { NotificationFeed } from "../../components/NotificationFeed";
import { getAuthNotice, getCurrentMember } from "../../lib/auth";
import { listNotifications } from "../../lib/notifications";
import { permissionHighlights } from "../../lib/roles";
import { buildDashboardTrust, buildProofHighlights } from "../../lib/trust";

export default function SettingsPage() {
  const currentMember = getCurrentMember();
  const authNotice = getAuthNotice();
  const dashboardTrust = buildDashboardTrust();
  const proofHighlights = buildProofHighlights();
  const notifications = listNotifications();

  return (
    <section className="app-page">
      <p className="app-kicker">Account runtime</p>
      <h1>System settings</h1>
      <p>
        This route now reads from the active auth session and the notification service, so demo
        changes propagate into a visible settings surface.
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">Current settings scope</p>
          <h2>{currentMember.name}</h2>
          <ul className="app-list">
            <li>{authNotice}</li>
            <li>{`${currentMember.role} session mapped to ${permissionHighlights.length} permission highlights`}</li>
            <li>{dashboardTrust.summary}</li>
            <li>{proofHighlights[0]?.detail ?? "Proof preferences will appear here once more ledger items are available."}</li>
          </ul>
        </section>
        <NotificationFeed items={notifications} redirectTo="/settings" title="Notification preferences preview" />
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">Support and routing</p>
          <h2>Send a live support request</h2>
          <p>
            This form sends directly into the OMDALAT support inbox, so the app runtime has a real
            operational contact path instead of placeholder copy.
          </p>
          <SupportRequestForm defaultRoute="/settings" replyEmail={currentMember.email} />
        </section>

        <section className="app-panel">
          <p className="app-kicker">Official app mailboxes</p>
          <h2>Current inbox map</h2>
          <ul className="app-list">
            <li>{`${OMDALAT_INBOXES.app} for app notifications and operator replies`}</li>
            <li>{`${OMDALAT_INBOXES.support} for support and issue routing`}</li>
            <li>{`${OMDALAT_INBOXES.hello} for public intake and cross-surface contact`}</li>
            <li>{`${OMDALAT_INBOXES.trust} for trust and proof-related follow-up`}</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
