import { Badge, Section } from "../../../packages/ui";
import type { AuthFixture, MemberSession } from "../../../packages/types";
import { logoutSessionAction, switchSessionAction } from "../app/actions";

type SessionSwitcherProps = {
  fixtures: AuthFixture[];
  currentSession: MemberSession;
  redirectTo?: string;
};

export function SessionSwitcher({
  fixtures,
  currentSession,
  redirectTo = "/profile"
}: SessionSwitcherProps) {
  return (
    <Section className="app-panel">
      <p className="app-kicker">Auth demo</p>
      <h2>Switch fixture session</h2>
      <p>
        The app now supports a stateful demo auth layer. Swap between guest, member, and verified
        host sessions to inspect role-dependent trust and moderation flows.
      </p>
      <div className="app-stack">
        {fixtures.map((fixture) => (
          <div className="app-action-card" key={fixture.id}>
            <div className="app-action-copy">
              <p className="app-card-meta">{fixture.session.role.replace("_", " ")}</p>
              <h3>{fixture.label}</h3>
              <p>{fixture.summary}</p>
              {fixture.id === currentSession.id ? (
                <Badge className="app-badge">Active session</Badge>
              ) : null}
            </div>
            <form action={switchSessionAction} className="app-inline-form">
              <input type="hidden" name="sessionId" value={fixture.id} />
              <input type="hidden" name="redirectTo" value={redirectTo} />
              <button className="app-button" type="submit">
                Use session
              </button>
            </form>
          </div>
        ))}
      </div>
      <form action={logoutSessionAction} className="app-inline-form">
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <button className="app-button app-button-secondary" type="submit">
          Return to guest mode
        </button>
      </form>
    </Section>
  );
}
