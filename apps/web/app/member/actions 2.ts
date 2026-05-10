"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {
  MEMBER_SESSION_COOKIE_NAME,
  MEMBER_SESSION_MAX_AGE_SECONDS,
  type MemberSessionState,
  buildRelativeReturnPath,
  canAccessSignedIn,
  canAccessVerified,
  canProcessReviewDecision,
  canSubmitReviewRequest,
  gatePathForRequirement,
  localizeMemberPath,
  normalizeMemberSession,
  parseMemberSession,
  resolveMemberSessionWithQueueObject,
  serializeMemberSession,
} from "../../lib/member-auth";
import {
  decideReviewRequestById,
  getLatestReviewRequestForMember,
  submitReviewRequestForMember
} from "../../lib/member-review-queue";
import type { OmdalatLocale } from "../../../../packages/core";

function parseLocale(value: string | null | undefined): OmdalatLocale {
  return value === "en" ? "en" : "vi";
}

function trimValue(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function getMemberSessionRedirectPath(locale: OmdalatLocale) {
  return localizeMemberPath("/member", locale);
}

async function makeSessionCookie(session: MemberSessionState) {
  const cookieStore = await cookies();
  const normalizedSession = normalizeMemberSession(session);

  cookieStore.set(MEMBER_SESSION_COOKIE_NAME, serializeMemberSession(normalizedSession), {
    path: "/",
    maxAge: MEMBER_SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });

  return normalizedSession;
}

function buildAbsoluteRedirect(currentPath: string, locale: OmdalatLocale) {
  return localizeMemberPath(currentPath, locale);
}

export async function registerMemberAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const email = trimValue(formData.get("email"));
  const name = trimValue(formData.get("name"));
  const password = trimValue(formData.get("password"));
  const agree = trimValue(formData.get("agree"));
  const next = trimValue(formData.get("next"));

  const rawNext = buildRelativeReturnPath(next, "/member/welcome");

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    redirect(`${buildAbsoluteRedirect("/member/register", locale)}?error=invalid-email&next=${encodeURIComponent(rawNext)}`);
  }

  if (!password || password.length < 6) {
    redirect(`${buildAbsoluteRedirect("/member/register", locale)}?error=weak-password&next=${encodeURIComponent(rawNext)}`);
  }

  if (agree !== "true") {
    redirect(`${buildAbsoluteRedirect("/member/register", locale)}?error=consent&next=${encodeURIComponent(rawNext)}`);
  }

  const session: MemberSessionState = {
    id: `member-${Date.now()}-${Math.round(Math.random() * 9999)}`,
    email: email.toLowerCase(),
    name: name || email.split("@")[0],
    role: "member",
    profileComplete: false,
    emailVerified: false,
    reviewStatus: "not_requested"
  };

  await makeSessionCookie(session);

  const nextPath = buildAbsoluteRedirect(`/member/verify`, locale);
  redirect(`${nextPath}?next=${encodeURIComponent(rawNext)}`);
}

export async function loginMemberAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const email = trimValue(formData.get("email"));
  const password = trimValue(formData.get("password"));
  const next = trimValue(formData.get("next"));

  const rawNext = buildRelativeReturnPath(next, getMemberSessionRedirectPath(locale));

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?error=invalid-email&next=${encodeURIComponent(rawNext)}`);
  }

  if (!password) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?error=missing-password&next=${encodeURIComponent(rawNext)}`);
  }

  const cookieStore = await cookies();
  const existingSession = resolveMemberSessionWithQueueObject(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value)
  );

  const session: MemberSessionState = {
    id:
      existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.id : `member-${Date.now()}-${Math.round(Math.random() * 9999)}`,
    email: email.toLowerCase(),
    name: existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.name : email.split("@")[0],
    role: existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.role : "member",
    profileComplete: existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.profileComplete : false,
    emailVerified: existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.emailVerified : false,
    reviewStatus: existingSession.role !== "guest" && existingSession.email === email.toLowerCase() ? existingSession.reviewStatus : "not_requested"
  };

  await makeSessionCookie(session);

  if (!session.emailVerified) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  redirect(localizeMemberPath(rawNext, locale));
}

export async function verifyMemberAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const code = trimValue(formData.get("code"));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, getMemberSessionRedirectPath(locale));

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionWithQueueObject(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value)
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!code || code.length < 4) {
    redirect(`${buildAbsoluteRedirect("/member/verify", locale)}?error=invalid-code&next=${encodeURIComponent(rawNext)}`);
  }

  await makeSessionCookie(
    {
      ...currentSession,
      emailVerified: true,
      role: currentSession.role === "guest" ? "member" : currentSession.role
    }
  );

  redirect(localizeMemberPath(rawNext, locale));
}

export async function completeProfileAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const name = trimValue(formData.get("name"));
  const currentLocation = trimValue(formData.get("currentLocation"));
  const whatYouWant = trimValue(formData.get("whatYouWant"));
  const contribution = trimValue(formData.get("contribution"));
  const stayLength = trimValue(formData.get("stayLength"));
  const introLink = trimValue(formData.get("introLink"));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, getMemberSessionRedirectPath(locale));

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionWithQueueObject(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value)
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!canAccessVerified(currentSession)) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  if (!name || !currentLocation || !whatYouWant || !contribution || !stayLength || !introLink) {
    redirect(`${buildAbsoluteRedirect("/member/profile", locale)}?error=incomplete&next=${encodeURIComponent(rawNext)}`);
  }

  await makeSessionCookie(
    {
      ...currentSession,
      name,
      profileComplete: true
    }
  );

  redirect(localizeMemberPath(rawNext, locale));
}

export async function requestReviewQueueAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, "/member/application-status");

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionWithQueueObject(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value)
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!canAccessVerified(currentSession)) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  if (!currentSession.profileComplete) {
    redirect(
      `${buildAbsoluteRedirect("/member/profile", locale)}?required=profile-complete&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (currentSession.role === "verified_member") {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=already&next=${encodeURIComponent(rawNext)}`
    );
  }

  const latestOwnRequest = getLatestReviewRequestForMember(currentSession.id, currentSession.email);

  if (latestOwnRequest?.status === "pending") {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=pending&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (!canSubmitReviewRequest(currentSession)) {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=blocked&next=${encodeURIComponent(rawNext)}`
    );
  }

  const submission = submitReviewRequestForMember({
    memberId: currentSession.id,
    memberEmail: currentSession.email,
    memberName: currentSession.name
  });

  await makeSessionCookie({
    ...currentSession,
    reviewStatus: submission.request.status === "pending" ? "pending" : currentSession.reviewStatus
  });

  if (!submission.created) {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=pending&next=${encodeURIComponent(rawNext)}`
    );
  }

  redirect(
    `${buildAbsoluteRedirect("/member/application-status", locale)}?review=submitted&requestId=${encodeURIComponent(submission.request.id)}&next=${encodeURIComponent(rawNext)}`
  );
}

export async function decideReviewQueueAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const decision = trimValue(formData.get("decision"));
  const requestId = trimValue(formData.get("requestId"));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, "/member/application-status");

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionWithQueueObject(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value)
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!canAccessVerified(currentSession)) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  if (!currentSession.profileComplete) {
    redirect(
      `${buildAbsoluteRedirect("/member/profile", locale)}?required=profile-complete&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (decision !== "approve" && decision !== "reject") {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=invalid-decision&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (!requestId) {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=invalid-request&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (!canProcessReviewDecision(currentSession)) {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=decision-blocked&next=${encodeURIComponent(rawNext)}`
    );
  }

  const reviewDecision = decideReviewRequestById({
    requestId,
    decision,
    decidedById: currentSession.id,
    decidedByEmail: currentSession.email
  });

  if (!reviewDecision.ok) {
    const reasonQuery = reviewDecision.reason === "not-found" ? "queue-missing" : "queue-closed";
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=${reasonQuery}&requestId=${encodeURIComponent(requestId)}&next=${encodeURIComponent(rawNext)}`
    );
  }

  if (decision === "reject") {
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=rejected&requestId=${encodeURIComponent(requestId)}&next=${encodeURIComponent(rawNext)}`
    );
  }

  const nextPath = buildRelativeReturnPath(next, "/member/application-status");
  if (nextPath !== "/member/application-status") {
    redirect(localizeMemberPath(nextPath, locale));
  }

  redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=approved&requestId=${encodeURIComponent(requestId)}`);
}

export async function logoutMemberAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));

  const cookieStore = await cookies();
  cookieStore.delete(MEMBER_SESSION_COOKIE_NAME);

  redirect(buildAbsoluteRedirect("/member/login", locale));
}
