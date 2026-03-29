import { ActivityFeed } from "../../components/ActivityFeed";
import { NodeCard } from "../../components/NodeCard";
import { ProofCard } from "../../components/ProofCard";
import { TrustBadge } from "../../components/TrustBadge";
import { authNotice, currentMember } from "../../lib/auth";
import { permissionHighlights, roleSummaries } from "../../lib/roles";
import { activityTimeline, dashboardTrust, proofHighlights } from "../../lib/trust";

export default function DashboardPage() {
  return (
    <section className="app-page">
      <div className="app-dashboard-hero">
        <p className="app-kicker">Dashboard shell</p>
        <h1>Local operating layer for trusted activity in Da Lat.</h1>
        <p>
          This runtime is the bridge between the locked OMDALAT product docs and the future
          authenticated experience for places, hosts, experts, communities, proofs, and requests.
        </p>
        <div className="app-dashboard-meta">
          <TrustBadge label={dashboardTrust.level} score={dashboardTrust.score} />
          <span>{currentMember.homeNode}</span>
        </div>
      </div>

      <div className="app-grid">
        <NodeCard
          title="Current member context"
          detail={authNotice}
          meta={`${currentMember.name} · ${currentMember.status}`}
        />
        <NodeCard
          title="Permission surface"
          detail="The first app shell now exposes the route map and role framing for the local operating layer."
          meta="Access model"
        />
        <ActivityFeed items={activityTimeline} />
        <ProofCard title={proofHighlights[0].title} detail={proofHighlights[0].detail} />
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">Roles</p>
          <h2>Who this shell already represents</h2>
          <ul className="app-list">
            {roleSummaries.map((item) => (
              <li key={item.role}>
                <strong>{item.role}</strong>: {item.summary}
              </li>
            ))}
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">Next app work</p>
          <h2>Immediate implementation targets</h2>
          <ul className="app-list">
            {permissionHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>{dashboardTrust.summary}</li>
            <li>{proofHighlights[1].detail}</li>
          </ul>
        </section>
      </div>
    </section>
  );
}
