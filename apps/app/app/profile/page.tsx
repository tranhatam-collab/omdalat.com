import { AppScaffold } from "../../components/AppScaffold";
import { getCurrentMember } from "../../lib/auth";
import { roleSummaries } from "../../lib/roles";
import { buildDashboardTrust } from "../../lib/trust";

export default function ProfilePage() {
  const currentMember = getCurrentMember();
  const dashboardTrust = buildDashboardTrust();
  const currentRole = roleSummaries.find((item) => item.role === currentMember.role);

  return (
    <AppScaffold
      eyebrow="Account runtime"
      title="Profile settings"
      description="Internal route backed by the current authenticated fixture session, role framing, and live trust score."
      highlights={[
        `${currentMember.name} · ${currentMember.role} · ${currentMember.zone}`,
        `${currentMember.homeNode} · ${currentMember.status}`,
        currentRole ? currentRole.summary : "Role summary will appear here.",
        `${dashboardTrust.level} · ${dashboardTrust.score}/100`
      ]}
      nextStep="Next, wire editable member fields and verification actions on top of this real session state."
    />
  );
}
