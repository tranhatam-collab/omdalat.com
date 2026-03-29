import { currentMember } from "../../lib/auth";
import { AppNav } from "./AppNav";

export function AppHeader() {
  return (
    <header className="app-header">
      <div className="app-brand">
        <p className="app-kicker">Local operating layer</p>
        <strong>OMDALAT App Runtime</strong>
        <span>
          {currentMember.name} · {currentMember.role.replace("_", " ")} · {currentMember.status}
        </span>
      </div>
      <AppNav />
    </header>
  );
}
