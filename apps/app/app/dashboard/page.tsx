import { ActivityFeed } from "../../components/ActivityFeed";
import { NodeCard } from "../../components/NodeCard";
import { ProofCard } from "../../components/ProofCard";
import { TrustBadge } from "../../components/TrustBadge";
import { getAuthNotice, getCurrentMember } from "../../lib/auth";
import { getDashboardSnapshot } from "../../lib/runtime-data";
import { permissionHighlights, roleSummaries } from "../../lib/roles";
import {
  buildActivityTimeline,
  buildDashboardTrust,
  buildProofHighlights,
  buildRequestMatches
} from "../../lib/trust";

export default function DashboardPage() {
  const currentMember = getCurrentMember();
  const authNotice = getAuthNotice();
  const dashboardTrust = buildDashboardTrust();
  const proofHighlights = buildProofHighlights();
  const activityTimeline = buildActivityTimeline();
  const requestMatches = buildRequestMatches();
  const snapshot = getDashboardSnapshot();
  const leadMatch = requestMatches[0];
  const secondaryMatch = requestMatches[1];

  return (
    <section className="app-page">
      <div className="app-dashboard-hero">
        <p className="app-kicker">Dashboard runtime</p>
        <h1>Local operating layer for trusted activity in Da Lat.</h1>
        <p>
          This app runtime is now reading the live OMDALAT fixture datasets for places, hosts,
          experts, communities, events, proofs, and requests instead of relying on static mock
          copy alone.
        </p>
        <div className="app-dashboard-meta">
          <TrustBadge label={dashboardTrust.level} score={dashboardTrust.score} />
          <span>
            {currentMember.homeNode} · {snapshot.events.length} active events · {snapshot.requests.length} tracked
            requests
          </span>
        </div>
      </div>

      <div className="app-grid">
        <NodeCard
          title="Current member context"
          detail={authNotice}
          meta={`${currentMember.name} · ${currentMember.status}`}
        />
        <NodeCard
          title={leadMatch ? leadMatch.requestTitle : "Request matching queue"}
          detail={
            leadMatch
              ? `Best current match: ${leadMatch.targetName} (${leadMatch.targetType}) because ${leadMatch.reason}`
              : "No request match has been scored yet."
          }
          meta={leadMatch ? `Score ${leadMatch.score}/100` : "Matching engine"}
        />
        <ActivityFeed title="Current local runtime signals" items={activityTimeline} />
        <ProofCard
          title={proofHighlights[0]?.title ?? "Proof pipeline warming up"}
          detail={proofHighlights[0]?.detail ?? "Proof-backed local signals will appear here as they are recorded."}
        />
      </div>

      <div className="app-page-grid">
        <section className="app-panel">
          <p className="app-kicker">Roles and data surfaces</p>
          <h2>Who this runtime already represents</h2>
          <ul className="app-list">
            {roleSummaries.map((item) => (
              <li key={item.role}>
                <strong>{item.role}</strong>: {item.summary}
              </li>
            ))}
            <li>
              <strong>{snapshot.places.length} places</strong>: local venue surfaces now come straight from the
              shared data layer.
            </li>
            <li>
              <strong>{snapshot.hosts.length} hosts</strong>: trust-aware host context is now attached to the app
              runtime.
            </li>
          </ul>
        </section>

        <section className="app-panel">
          <p className="app-kicker">Trust and next steps</p>
          <h2>Immediate implementation targets now coming from real flows</h2>
          <ul className="app-list">
            {permissionHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>{dashboardTrust.summary}</li>
            <li>{proofHighlights[1]?.detail ?? "Add more proofs to deepen the local trust ledger."}</li>
            <li>
              {secondaryMatch
                ? `Second-best request path: ${secondaryMatch.targetName} can support ${secondaryMatch.requestTitle}.`
                : "Extend matching to include richer moderation and approval flows next."}
            </li>
          </ul>
        </section>
      </div>
    </section>
  );
}
