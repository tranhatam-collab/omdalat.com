import { SessionSwitcher } from "../../components/SessionSwitcher";
import { getCurrentMember } from "../../lib/auth";
import { roleSummaries } from "../../lib/roles";
import { buildDashboardTrust } from "../../lib/trust";
import { getAuthFixtures } from "../../lib/auth";

export default function ProfilePage() {
  const currentMember = getCurrentMember();
  const dashboardTrust = buildDashboardTrust();
  const fixtures = getAuthFixtures();
  const currentRole = roleSummaries.find((item) => item.role === currentMember.role);

  return (
    <section className="app-page">
      <p className="app-kicker">Account runtime</p>
      <h1>Profile settings</h1>
      <p>
        This route now runs on top of a stateful demo auth service. Switching fixture sessions
        updates the active member, trust posture, and notification stream across the app.
      </p>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">Active session</p>
          <h2>{currentMember.name}</h2>
          <ul className="app-list">
            <li>{currentMember.email}</li>
            <li>
              {currentMember.role} · {currentMember.zone}
            </li>
            <li>{currentMember.homeNode}</li>
            <li>{currentMember.status}</li>
            <li>{currentRole ? currentRole.summary : "Role summary will appear here."}</li>
            <li>
              {dashboardTrust.level} · {dashboardTrust.score}/100
            </li>
          </ul>
        </section>
        <SessionSwitcher currentSession={currentMember} fixtures={fixtures} redirectTo="/profile" />
      </div>
    </section>
  );
}
