import type { OmdalatLocale } from "../../../packages/core";
import type { MemberSession } from "../../../packages/types";
import { getAuthRuntimeConfig, listAuthFixtures } from "../../../services/auth/index";
import { resolveMemberSessionForApp } from "./member-session";

export async function getCurrentMember(locale: OmdalatLocale = "en"): Promise<MemberSession> {
  return resolveMemberSessionForApp();
}

export async function requireCurrentMember(): Promise<MemberSession> {
  return getCurrentMember();
}

export function getAuthFixtures(locale: OmdalatLocale = "en") {
  return listAuthFixtures(locale);
}

export { getAuthRuntimeConfig };

export async function getAuthNotice(locale: OmdalatLocale = "en") {
  const currentMember = await getCurrentMember(locale);

  if (locale === "vi") {
    return `${currentMember.name} hiện đang đi qua hệ bằng một phiên fixture ở lớp ${currentMember.zone}.`;
  }

  return `${currentMember.name} is currently moving through the system with a fixture-backed session in the ${currentMember.zone} layer.`;
}
