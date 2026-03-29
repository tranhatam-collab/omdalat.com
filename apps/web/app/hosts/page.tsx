import { PageScaffold } from "../../components/shared/PageScaffold";

export default function HostsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Hosts in OMDALAT"
      description="Public route shell for verified local hosts and coordinators."
      highlights={["Host listing shell", "Trust summary placeholder", "Link surface for related places"]}
      nextStep="Connect verified host data and add Person-style detail routes."
    />
  );
}
