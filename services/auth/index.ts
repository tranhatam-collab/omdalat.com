import { slugify } from "../../packages/core/utils";
import type { OmdalatLocale } from "../../packages/core";
import type { AuthFixture, MemberSession } from "../../packages/types";
import { hosts, nodes, resolveLocalizedText } from "../api";

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
      zone: resolveLocalizedText(hosts[0]?.zone ?? "Ward 1")
    }
  }
];

let currentFixtureId = "linh-verified";

function localizeFixture(fixture: AuthFixture, locale: OmdalatLocale): AuthFixture {
  if (locale !== "vi") {
    return fixture;
  }

  const viLabelMap: Record<string, string> = {
    "guest-demo": "Khách quan sát",
    "bao-an-member": "Bao An · thành viên",
    "linh-verified": "Linh Pham · đã xác minh"
  };

  const viSummaryMap: Record<string, string> = {
    "guest-demo": "Chế độ quan sát công khai chỉ đọc để xem tầng vận hành địa phương.",
    "bao-an-member": "Phiên thành viên tập trung vào kết nối, vòng tròn chuyên gia và theo dõi yêu cầu địa phương.",
    "linh-verified": "Phiên host đã xác minh với quyền gửi bằng chứng và các luồng trust trọng yếu."
  };

  const viStatusMap: Record<string, string> = {
    "Public observer mode": "Chế độ quan sát công khai",
    "Member session with request and proof visibility": "Phiên thành viên có quyền xem yêu cầu và bằng chứng",
    "Verified member session with proof and moderation access": "Phiên thành viên đã xác minh có quyền bằng chứng và moderation"
  };

  return {
    ...fixture,
    label: viLabelMap[fixture.id] ?? fixture.label,
    summary: viSummaryMap[fixture.id] ?? fixture.summary,
    session: {
      ...fixture.session,
      status: viStatusMap[fixture.session.status] ?? fixture.session.status
    }
  };
}

export function listAuthFixtures(locale: OmdalatLocale = "en") {
  return authFixtures.map((fixture) => localizeFixture(fixture, locale));
}

export function getCurrentAuthSession(locale: OmdalatLocale = "en"): MemberSession {
  const fixture = authFixtures.find((item) => item.id === currentFixtureId) ?? authFixtures[0];
  return localizeFixture(fixture, locale).session;
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
