import type { MemberSession } from "../../../packages/types";
import { getCurrentMemberSession } from "../../../services/api/index";

export function getCurrentMember(): MemberSession {
  return getCurrentMemberSession();
}

export function requireCurrentMember(): MemberSession {
  return getCurrentMember();
}

export function getAuthNotice() {
  const currentMember = getCurrentMember();

  return `${currentMember.name} is currently operating through a fixture-backed authenticated session for ${currentMember.zone}.`;
}
