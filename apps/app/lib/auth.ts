import type { MemberSession } from "../../../packages/types";
import { getCurrentAuthSession, listAuthFixtures } from "../../../services/auth/index";

export function getCurrentMember(): MemberSession {
  return getCurrentAuthSession();
}

export function requireCurrentMember(): MemberSession {
  return getCurrentMember();
}

export function getAuthFixtures() {
  return listAuthFixtures();
}

export function getAuthNotice() {
  const currentMember = getCurrentMember();

  return `${currentMember.name} is currently operating through a fixture-backed authenticated session for ${currentMember.zone}.`;
}
