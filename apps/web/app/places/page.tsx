import type { Metadata } from "next";
import { PageScaffold } from "../../components/shared/PageScaffold";
import { buildPageMetadata } from "../../lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Places in OMDALAT",
  description: "Trusted spaces and local places in Da Lat.",
  path: "/places"
});

export default function PlacesPage() {
  return (
    <PageScaffold
      eyebrow="Listing shell"
      title="Places in OMDALAT"
      description="Public route shell for trusted spaces in the city layer."
      highlights={["Listing intro copy", "Card grid placeholder", "Future detail route linkage"]}
      nextStep="Connect place cards to shared data and add Place detail templates."
      path="/places"
    />
  );
}
