import { AppScaffold } from "../../components/AppScaffold";
import { getDashboardSnapshot } from "../../lib/runtime-data";

export default function HostsPage() {
  const snapshot = getDashboardSnapshot();
  const verifiedHosts = snapshot.hosts.filter((host) => host.verified).length;

  return (
    <AppScaffold
      eyebrow="App route runtime"
      title="Hosts operating layer"
      description="Internal route backed by the current host roster, verification markers, and locality-aware availability."
      highlights={snapshot.hosts.map(
        (host) => `${host.name} · ${host.role} · ${host.availability} · ${host.trust}`
      )}
      nextStep={`${verifiedHosts} verified hosts now feed the trust surface. Next, connect them to moderation and approval workflows.`}
    />
  );
}
