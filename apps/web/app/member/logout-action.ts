"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { OmdalatLocale } from "../../../../packages/core";
import { localizeMemberPath, MEMBER_SESSION_COOKIE_NAME } from "../../lib/member-auth";

function parseLocale(value: FormDataEntryValue | null): OmdalatLocale {
  return value === "en" ? "en" : "vi";
}

export async function logoutMemberAction(formData: FormData) {
  const locale = parseLocale(formData.get("locale"));
  const cookieStore = await cookies();
  cookieStore.delete(MEMBER_SESSION_COOKIE_NAME);
  redirect(localizeMemberPath("/member/login", locale));
}
