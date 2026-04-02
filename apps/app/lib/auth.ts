import type { OmdalatLocale } from "../../../packages/core";
import type { MemberSession } from "../../../packages/types";
import { getCurrentAuthSession, listAuthFixtures } from "../../../services/auth/index";

export function getCurrentMember(locale: OmdalatLocale = "en"): MemberSession {
  return getCurrentAuthSession(locale);
}

export function requireCurrentMember(): MemberSession {
  return getCurrentMember();
}

export function getAuthFixtures(locale: OmdalatLocale = "en") {
  return listAuthFixtures(locale);
}

export function getAuthNotice(locale: OmdalatLocale = "en") {
  const currentMember = getCurrentMember(locale);

  if (locale === "vi") {
    return `${currentMember.name} hiện đang vận hành qua một phiên xác thực fixture cho khu vực ${currentMember.zone}.`;
  }

  return `${currentMember.name} is currently operating through a fixture-backed authenticated session for ${currentMember.zone}.`;
}
