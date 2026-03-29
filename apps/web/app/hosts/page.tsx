import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Hosts in OMDALAT",
  description: "Verified local hosts and coordinators in Da Lat.",
  path: "/hosts"
});

export default function HostsPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Hosts in OMDALAT"
      description="Public route shell for verified local hosts and coordinators."
      highlights={["Host listing shell", "Trust summary placeholder", "Link surface for related places"]}
      nextStep="Connect verified host data and add Person-style detail routes."
      path="/hosts"
    />
  );
}
