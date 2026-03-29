import { slugify } from "../../packages/core/utils";
import type { AuthFixture, MemberSession } from "../../packages/types";
import { hosts, nodes } from "../api";

const authFixtures: AuthFixture[] = [
  {
    id: "guest-demo",
    label: "Guest observer",
    summary: "Read-only public observer mode for reviewing the local operating layer.",
    session: {
      id: "guest-demo",
      name: "Guest Observer",
      email: "guest@omdalat.com",
      role: "guest",
      homeNode: "Ward 1 Host Relay",
      homeNodeSlug: slugify("Ward 1 Host Relay"),
      status: "Public observer mode",
      zone: "Central Da Lat"
    }
  },
  {
    id: "bao-an-member",
    label: "Bao An · member",
    summary: "Member session focused on introductions, expert circles, and local request follow-up.",
    session: {
      id: "bao-an-member",
      name: "Bao An",
      email: "bao-an@omdalat.com",
      role: "member",
      homeNode: nodes[2]?.name ?? "Studio Garden Kitchen",
      homeNodeSlug: nodes[2]?.slug ?? slugify("Studio Garden Kitchen"),
      status: "Member session with request and proof visibility",
      zone: "Ward 1"
    }
  },
  {
    id: "linh-verified",
    label: "Linh Pham · verified",
    summary: "Verified host session with access to proof submission and trust-heavy local workflows.",
    session: {
      id: "linh-verified",
      name: hosts[0]?.name ?? "Linh Pham",
      email: "linh-pham@omdalat.com",
      role: "verified_member",
      homeNode: nodes[0]?.name ?? "Lake Edge Signal Loop",
      homeNodeSlug: nodes[0]?.slug ?? slugify("Lake Edge Signal Loop"),
      status: "Verified member session with proof and moderation access",
      zone: hosts[0]?.zone ?? "Ward 1"
    }
  }
];

let currentFixtureId = "linh-verified";

export function listAuthFixtures() {
  return authFixtures;
}

export function getCurrentAuthSession(): MemberSession {
  return authFixtures.find((fixture) => fixture.id === currentFixtureId)?.session ?? authFixtures[0].session;
}

export function switchAuthSession(sessionId: string) {
  if (authFixtures.some((fixture) => fixture.id === sessionId)) {
    currentFixtureId = sessionId;
  }

  return getCurrentAuthSession();
}

export function logoutAuthSession() {
  currentFixtureId = "guest-demo";
  return getCurrentAuthSession();
}
