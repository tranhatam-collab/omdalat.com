import { AppScaffold } from "../../components/AppScaffold";

export default function ProfilePage() {
  return (
    <AppScaffold
      eyebrow="Account shell"
      title="Profile settings"
      description="Internal route shell for user identity, node ownership, and future trust-related profile controls."
      highlights={[
        "Local member identity shell",
        "Node ownership placeholder",
        "Future verification actions"
      ]}
      nextStep="Wire member profile fields to auth state and trust preferences."
    />
  );
}
