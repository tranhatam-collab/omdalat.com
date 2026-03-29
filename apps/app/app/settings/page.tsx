import { AppScaffold } from "../../components/AppScaffold";
import { getAuthNotice, getCurrentMember } from "../../lib/auth";
import { permissionHighlights } from "../../lib/roles";
import { buildDashboardTrust, buildProofHighlights } from "../../lib/trust";

export default function SettingsPage() {
  const currentMember = getCurrentMember();
  const authNotice = getAuthNotice();
  const dashboardTrust = buildDashboardTrust();
  const proofHighlights = buildProofHighlights();

  return (
    <AppScaffold
      eyebrow="Account runtime"
      title="System settings"
      description="Internal route backed by current auth context, trust posture, and proof-backed workflow priorities."
      highlights={[
        authNotice,
        `${currentMember.role} session mapped to ${permissionHighlights.length} permission highlights`,
        dashboardTrust.summary,
        proofHighlights[0]?.detail ?? "Proof preferences will appear here once more ledger items are available."
      ]}
      nextStep="Next, map notification, visibility, and trust preferences onto this real authenticated runtime."
    />
  );
}
