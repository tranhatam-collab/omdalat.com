import { AppScaffold } from "../../components/AppScaffold";

export default function SettingsPage() {
  return (
    <AppScaffold
      eyebrow="Account shell"
      title="System settings"
      description="Internal route shell for notification defaults, privacy controls, and future moderation-safe preferences."
      highlights={[
        "Notification settings placeholder",
        "Privacy and visibility shell",
        "Future trust and proof preferences"
      ]}
      nextStep="Connect settings to real session data, noindex policy, and local workflow controls."
    />
  );
}
