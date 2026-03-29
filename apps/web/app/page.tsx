import type { Metadata } from "next";
import { CommunitiesSection } from "../components/sections/CommunitiesSection";
import { EventsSection } from "../components/sections/EventsSection";
import { ExpertsSection } from "../components/sections/ExpertsSection";
import { HeroSection } from "../components/sections/HeroSection";
import { HostsSection } from "../components/sections/HostsSection";
import { JoinSection } from "../components/sections/JoinSection";
import { LiveActivitySection } from "../components/sections/LiveActivitySection";
import { PlacesSection } from "../components/sections/PlacesSection";
import { ProofSection } from "../components/sections/ProofSection";
import { buildPageMetadata } from "../lib/metadata";
import { buildOrganizationSchema, buildWebSiteSchema } from "../lib/schema";

export const metadata: Metadata = buildPageMetadata({
  title: "OMDALAT — The First Living Intelligence City in Da Lat",
  description: "Trusted places, people, and activity in Da Lat.",
  path: "/"
});

export default function HomePage() {
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <HeroSection />
      <div className="runtime-grid">
        <LiveActivitySection />
        <PlacesSection />
        <HostsSection />
        <ExpertsSection />
        <CommunitiesSection />
        <EventsSection />
        <ProofSection />
        <JoinSection />
      </div>
    </>
  );
}
