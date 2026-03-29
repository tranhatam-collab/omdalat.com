import { CommunitiesSection } from "../components/sections/CommunitiesSection";
import { EventsSection } from "../components/sections/EventsSection";
import { ExpertsSection } from "../components/sections/ExpertsSection";
import { HeroSection } from "../components/sections/HeroSection";
import { HostsSection } from "../components/sections/HostsSection";
import { JoinSection } from "../components/sections/JoinSection";
import { LiveActivitySection } from "../components/sections/LiveActivitySection";
import { PlacesSection } from "../components/sections/PlacesSection";
import { ProofSection } from "../components/sections/ProofSection";

export default function HomePage() {
  return (
    <>
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
