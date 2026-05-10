import { siteConfig, type OmdalatLocale } from "../../packages/core";
import type { AuthFixture, MemberSession } from "../../packages/types";

const sessions: Record<string, MemberSession> = {
  "guest-demo": {
    id: "guest-demo",
    name: "Guest",
    email: "guest@omdalat.com",
    role: "guest",
    memberStatus: "guest",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "guest",
    zone: "public"
  },
  "thao-registered": {
    id: "thao-registered",
    name: "Thảo Nguyễn",
    email: "thao@omdalat.com",
    role: "registered",
    memberStatus: "registered",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "registered",
    zone: "member-onboarding"
  },
  "phuc-pending": {
    id: "phuc-pending",
    name: "Phúc Lê",
    email: "phuc@omdalat.com",
    role: "profile_pending",
    memberStatus: "profile_pending",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "profile_pending",
    zone: "member-onboarding"
  },
  "an-review": {
    id: "an-review",
    name: "An Trần",
    email: "an@omdalat.com",
    role: "under_review",
    memberStatus: "under_review",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "under_review",
    zone: "member-review"
  },
  "linh-trial": {
    id: "linh-trial",
    name: "Linh Phạm",
    email: "linh.pham@omdalat.com",
    role: "trial",
    memberStatus: "trial",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "trial",
    zone: "trial-rhythm"
  },
  "mai-active": {
    id: "mai-active",
    name: "Mai Võ",
    email: "mai.active@omdalat.com",
    role: "active_member",
    memberStatus: "active_member",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "active_member",
    zone: "member-space"
  },
  "yen-contributor": {
    id: "yen-contributor",
    name: "Yến Đỗ",
    email: "yen@omdalat.com",
    role: "contributor",
    memberStatus: "contributor",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "contributor",
    zone: "contributor-lane"
  },
  "vu-host": {
    id: "vu-host",
    name: "Vũ Trịnh",
    email: "vu@omdalat.com",
    role: "host_partner",
    memberStatus: "host_partner",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "host_partner",
    zone: "host-network"
  },
  "mai-operator": {
    id: "mai-operator",
    name: "Mai Nguyễn",
    email: "mai.nguyen@omdalat.com",
    role: "operator",
    memberStatus: "operator",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "operator",
    zone: "operator-desk"
  },
  "tam-admin": {
    id: "tam-admin",
    name: "Trần Hà Tâm",
    email: "tam@omdalat.com",
    role: "admin",
    memberStatus: "admin",
    homeNode: "Da Lat",
    homeNodeSlug: "da-lat",
    status: "admin",
    zone: "platform-control"
  }
};

let currentSessionId = "mai-active";

function translateFixture(fixtureId: string, locale: OmdalatLocale) {
  const vi: Record<string, { label: string; summary: string }> = {
    "guest-demo": {
      label: "Khách",
      summary: "Người chưa đăng ký, chỉ đi vào lớp quan sát và đọc."
    },
    "thao-registered": {
      label: "Thảo Nguyễn · đã đăng ký",
      summary: "Đã có tài khoản cơ bản nhưng chưa mở hồ sơ đầy đủ."
    },
    "phuc-pending": {
      label: "Phúc Lê · hồ sơ đang thiếu",
      summary: "Đã vào flow nhưng vẫn còn thiếu vài phần nền trước khi xem xét."
    },
    "an-review": {
      label: "An Trần · đang xem xét",
      summary: "Hồ sơ đã được gửi và đang ở hàng đợi review."
    },
    "linh-trial": {
      label: "Linh Phạm · trial",
      summary: "Đang trong 7 ngày thử để xem độ phù hợp thật."
    },
    "mai-active": {
      label: "Mai Võ · thành viên",
      summary: "Đã qua trial và đang giữ nhịp sống, làm, học trong hệ."
    },
    "yen-contributor": {
      label: "Yến Đỗ · contributor",
      summary: "Đã có thể nhận việc, nộp bản nháp và nhận phản hồi."
    },
    "vu-host": {
      label: "Vũ Trịnh · host partner",
      summary: "Đang giữ một không gian và cần cập nhật hồ sơ Ấp."
    },
    "mai-operator": {
      label: "Mai Nguyễn · operator",
      summary: "Đang cầm lớp xét duyệt và vận hành thường ngày."
    },
    "tam-admin": {
      label: "Trần Hà Tâm · admin",
      summary: "Quản trị toàn hệ, nhìn toàn bộ trạng thái và quyền."
    }
  };

  const en: Record<string, { label: string; summary: string }> = {
    "guest-demo": {
      label: "Guest",
      summary: "Not registered yet, only observing and reading."
    },
    "thao-registered": {
      label: "Thao Nguyen · registered",
      summary: "Has a basic account but has not completed the application yet."
    },
    "phuc-pending": {
      label: "Phuc Le · profile pending",
      summary: "Entered the flow but still has missing profile details."
    },
    "an-review": {
      label: "An Tran · under review",
      summary: "The application has been submitted and is now waiting in review."
    },
    "linh-trial": {
      label: "Linh Pham · trial",
      summary: "Currently in the 7-day trial period."
    },
    "mai-active": {
      label: "Mai Vo · active member",
      summary: "Already beyond trial and holding a steady rhythm in the system."
    },
    "yen-contributor": {
      label: "Yen Do · contributor",
      summary: "Can take assignments, submit drafts, and receive feedback."
    },
    "vu-host": {
      label: "Vu Trinh · host partner",
      summary: "Maintains a place and updates the Ap profile."
    },
    "mai-operator": {
      label: "Mai Nguyen · operator",
      summary: "Handles review and day-to-day operations."
    },
    "tam-admin": {
      label: "Tran Ha Tam · admin",
      summary: "Sees the full set of states and permissions across the system."
    }
  };

  return locale === "vi" ? vi[fixtureId] : en[fixtureId];
}

export function getCurrentAuthSession(_locale: OmdalatLocale = "en") {
  return sessions[currentSessionId] ?? sessions["guest-demo"];
}

export function getAuthRuntimeConfig() {
  return {
    authOrigin: siteConfig.authOrigin,
    cookieDomain: siteConfig.authCookieDomain,
    sessionMode: "fixture-backed",
    loginFlow: `${siteConfig.publicOrigin} -> ${siteConfig.appOrigin}/member/register -> ${siteConfig.appOrigin}/apply -> ${siteConfig.appOrigin}/dashboard`
  } as const;
}

export function listAuthFixtures(locale: OmdalatLocale = "en"): AuthFixture[] {
  return Object.values(sessions).map((session) => {
    const copy = translateFixture(session.id, locale);
    return {
      id: session.id,
      label: copy?.label ?? session.id,
      summary: copy?.summary ?? "",
      session
    };
  });
}

export function switchAuthSession(sessionId: string) {
  if (sessions[sessionId]) {
    currentSessionId = sessionId;
  }

  return getCurrentAuthSession();
}

export function logoutAuthSession() {
  currentSessionId = "guest-demo";
  return getCurrentAuthSession();
}
