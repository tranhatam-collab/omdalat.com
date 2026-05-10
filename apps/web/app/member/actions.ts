"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { OMDALAT_ORIGINS, type OmdalatLocale } from "../../../../packages/core";
import {
  sendMemberJoinIntake,
  sendMemberMagicLink,
  sendMemberVerificationCode,
  sendMemberVerificationSuccess
} from "../../../../services/notifications/mail";
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
  serializeMemberSession
} from "../../lib/member-auth";
import {
  decideReviewRequestById,
  getLatestReviewRequestForMember,
  MEMBER_REVIEW_QUEUE_COOKIE_NAME,
  MEMBER_REVIEW_QUEUE_MAX_AGE_SECONDS,
  resolveMemberReviewQueue,
  serializeMemberReviewQueue,
  syncMemberReviewQueue,
  submitReviewRequestForMember
} from "../../lib/member-review-queue";
import { resolveSessionWithReviewQueue } from "../../lib/member-session-resolver";

const MEMBER_VERIFY_CODE_COOKIE_NAME = "omdalat-member-verify-code" as const;
const MEMBER_VERIFY_CODE_MAX_AGE_SECONDS = 60 * 15;
const MEMBER_VERIFICATION_EXPIRES_IN_MINUTES = 15;
const MEMBER_MAGIC_LINK_SECRET =
  process.env.MEMBER_MAGIC_LINK_SECRET ?? process.env.MAIL_API_KEY ?? "omdalat-local-magic-secret";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const magicKeyPromise = crypto.subtle.importKey(
  "raw",
  textEncoder.encode(MEMBER_MAGIC_LINK_SECRET),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

type MagicTokenPayload = {
  email: string;
  code: string;
  exp: number;
};

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

function writeReviewQueueCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  queueCookieValue: string
) {
  cookieStore.set(MEMBER_REVIEW_QUEUE_COOKIE_NAME, queueCookieValue, {
    path: "/",
    maxAge: MEMBER_REVIEW_QUEUE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });
}

function buildAbsoluteRedirect(currentPath: string, locale: OmdalatLocale) {
  return localizeMemberPath(currentPath, locale);
}

function generateVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function toBase64Url(input: Uint8Array) {
  let binary = "";
  for (const byte of input) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const binary = atob(`${normalized}${padding}`);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function writeVerificationCodeCookie(
  cookieStore: Awaited<ReturnType<typeof cookies>>,
  email: string,
  code: string
) {
  cookieStore.set(MEMBER_VERIFY_CODE_COOKIE_NAME, `${encodeURIComponent(email)}:${code}`, {
    path: "/",
    maxAge: MEMBER_VERIFY_CODE_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });
}

function readVerificationCodeCookie(value: string | undefined) {
  if (!value) {
    return null;
  }

  const [encodedEmail, code] = value.split(":");
  if (!encodedEmail || !code) {
    return null;
  }

  try {
    return {
      email: decodeURIComponent(encodedEmail).toLowerCase(),
      code: code.trim()
    };
  } catch {
    return null;
  }
}

function timingSafeEqualString(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

async function signMagicMessage(message: string) {
  const key = await magicKeyPromise;
  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(message));
  return toBase64Url(new Uint8Array(signature));
}

async function issueMagicToken(payload: MagicTokenPayload) {
  const payloadJson = JSON.stringify(payload);
  const encodedPayload = toBase64Url(textEncoder.encode(payloadJson));
  const signature = await signMagicMessage(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

async function verifyMagicToken(token: string) {
  const [encodedPayload, encodedSignature] = token.split(".");
  if (!encodedPayload || !encodedSignature) {
    return null;
  }

  const expectedSignature = await signMagicMessage(encodedPayload);
  if (!timingSafeEqualString(encodedSignature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(textDecoder.decode(fromBase64Url(encodedPayload))) as MagicTokenPayload;
    if (!payload?.email || !payload?.code || typeof payload.exp !== "number") {
      return null;
    }
    if (payload.exp < Date.now()) {
      return null;
    }
    return {
      email: String(payload.email).toLowerCase(),
      code: String(payload.code),
      exp: payload.exp
    } satisfies MagicTokenPayload;
  } catch {
    return null;
  }
}

async function buildVerificationLink(locale: OmdalatLocale, nextPath: string, email: string, code: string) {
  const token = await issueMagicToken({
    email: email.toLowerCase(),
    code,
    exp: Date.now() + MEMBER_VERIFICATION_EXPIRES_IN_MINUTES * 60 * 1000
  });
  const localizedPath = localizeMemberPath(
    `/member/verify?next=${encodeURIComponent(nextPath)}&code=${encodeURIComponent(code)}&token=${encodeURIComponent(token)}`,
    locale
  );
  return new URL(localizedPath, OMDALAT_ORIGINS.web).toString();
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
  const cookieStore = await cookies();
  const verificationCode = generateVerificationCode();
  writeVerificationCodeCookie(cookieStore, session.email, verificationCode);

  const verifyLink = await buildVerificationLink(locale, rawNext, session.email, verificationCode);
  try {
    await Promise.all([
      sendMemberJoinIntake({
        name: session.name,
        email: session.email,
        source: "omdalat-web/member/register",
        nextPath: rawNext,
        locale
      }),
      sendMemberVerificationCode({
        name: session.name,
        email: session.email,
        code: verificationCode,
        verifyLink,
        expiresInMinutes: MEMBER_VERIFICATION_EXPIRES_IN_MINUTES
      })
    ]);
  } catch (error) {
    console.error("registerMemberAction:mail_delivery_failed", error);
  }

  const nextPath = buildAbsoluteRedirect("/member/verify", locale);
  redirect(`${nextPath}?next=${encodeURIComponent(rawNext)}&sent=1`);
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
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const existingSession = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );
  const normalizedEmail = email.toLowerCase();
  const hasExistingSession = existingSession.role !== "guest" && existingSession.email === normalizedEmail;

  const session: MemberSessionState = {
    id: hasExistingSession ? existingSession.id : `member-${Date.now()}-${Math.round(Math.random() * 9999)}`,
    email: normalizedEmail,
    name: hasExistingSession ? existingSession.name : email.split("@")[0],
    role: hasExistingSession ? existingSession.role : "member",
    profileComplete: hasExistingSession ? existingSession.profileComplete : false,
    emailVerified: hasExistingSession ? existingSession.emailVerified : false,
    reviewStatus: hasExistingSession ? existingSession.reviewStatus : "not_requested"
  };

  await makeSessionCookie(session);

  if (!session.emailVerified) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  redirect(localizeMemberPath(rawNext, locale));
}

export async function requestMagicLinkAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const email = trimValue(formData.get("email")).toLowerCase();
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, getMemberSessionRedirectPath(locale));

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?error=invalid-email&next=${encodeURIComponent(rawNext)}`);
  }

  const provisionalSession: MemberSessionState = {
    id: `member-${Date.now()}-${Math.round(Math.random() * 9999)}`,
    email,
    name: email.split("@")[0] || "member",
    role: "member",
    profileComplete: false,
    emailVerified: false,
    reviewStatus: "not_requested"
  };

  await makeSessionCookie(provisionalSession);
  const cookieStore = await cookies();
  const verificationCode = generateVerificationCode();
  writeVerificationCodeCookie(cookieStore, provisionalSession.email, verificationCode);

  const verifyLink = await buildVerificationLink(locale, rawNext, provisionalSession.email, verificationCode);
  try {
    await Promise.all([
      sendMemberMagicLink({
        name: provisionalSession.name,
        email: provisionalSession.email,
        magicLink: verifyLink,
        expiresInMinutes: MEMBER_VERIFICATION_EXPIRES_IN_MINUTES
      }),
      sendMemberVerificationCode({
        name: provisionalSession.name,
        email: provisionalSession.email,
        code: verificationCode,
        verifyLink,
        expiresInMinutes: MEMBER_VERIFICATION_EXPIRES_IN_MINUTES
      })
    ]);
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?magic=sent&next=${encodeURIComponent(rawNext)}`);
  } catch (error) {
    console.error("requestMagicLinkAction:mail_delivery_failed", error);
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?magic=failed&next=${encodeURIComponent(rawNext)}`);
  }
}

export async function verifyMemberAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const code = trimValue(formData.get("code"));
  const token = trimValue(formData.get("token"));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, getMemberSessionRedirectPath(locale));

  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const currentSession = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );
  const tokenPayload = token ? await verifyMagicToken(token) : null;

  let sessionForVerification = currentSession;
  if (!canAccessSignedIn(sessionForVerification)) {
    if (!tokenPayload) {
      redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
    }

    sessionForVerification = await makeSessionCookie({
      id: `member-${Date.now()}-${Math.round(Math.random() * 9999)}`,
      email: tokenPayload.email,
      name: tokenPayload.email.split("@")[0] || "member",
      role: "member",
      profileComplete: false,
      emailVerified: false,
      reviewStatus: "not_requested"
    });
  }

  if (tokenPayload && tokenPayload.email !== sessionForVerification.email) {
    redirect(`${buildAbsoluteRedirect("/member/verify", locale)}?error=invalid-code&next=${encodeURIComponent(rawNext)}`);
  }

  const verificationPayload = readVerificationCodeCookie(cookieStore.get(MEMBER_VERIFY_CODE_COOKIE_NAME)?.value);
  const validByCookie =
    Boolean(verificationPayload) &&
    verificationPayload?.email === sessionForVerification.email &&
    verificationPayload?.code === code;
  const validByToken = Boolean(tokenPayload) && tokenPayload?.email === sessionForVerification.email && tokenPayload?.code === code;

  if (
    !code ||
    code.length < 4 ||
    (!validByCookie && !validByToken)
  ) {
    redirect(`${buildAbsoluteRedirect("/member/verify", locale)}?error=invalid-code&next=${encodeURIComponent(rawNext)}`);
  }

  await makeSessionCookie({
    ...sessionForVerification,
    emailVerified: true,
    role: sessionForVerification.role === "guest" ? "member" : sessionForVerification.role
  });
  cookieStore.delete(MEMBER_VERIFY_CODE_COOKIE_NAME);

  try {
    await sendMemberVerificationSuccess({
      name: sessionForVerification.name,
      email: sessionForVerification.email
    });
  } catch (error) {
    console.error("verifyMemberAction:mail_delivery_failed", error);
  }

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
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const currentSession = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
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

  await makeSessionCookie({
    ...currentSession,
    name,
    profileComplete: true
  });

  redirect(localizeMemberPath(rawNext, locale));
}

export async function requestReviewQueueAction(formData: FormData) {
  const locale = parseLocale(trimValue(formData.get("locale")));
  const next = trimValue(formData.get("next"));
  const rawNext = buildRelativeReturnPath(next, "/member/application-status");

  const cookieStore = await cookies();
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const currentSession = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!canAccessVerified(currentSession)) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  if (!currentSession.profileComplete) {
    redirect(`${buildAbsoluteRedirect("/member/profile", locale)}?required=profile-complete&next=${encodeURIComponent(rawNext)}`);
  }

  if (currentSession.role === "verified_member") {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=already&next=${encodeURIComponent(rawNext)}`);
  }

  const latestOwnRequest = getLatestReviewRequestForMember(reviewQueue, currentSession.id, currentSession.email);

  if (latestOwnRequest?.status === "pending") {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=pending&next=${encodeURIComponent(rawNext)}`);
  }

  if (!canSubmitReviewRequest(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=blocked&next=${encodeURIComponent(rawNext)}`);
  }

  const submission = submitReviewRequestForMember({
    memberId: currentSession.id,
    memberEmail: currentSession.email,
    memberName: currentSession.name
  }, reviewQueue);

  const submittedQueue = syncMemberReviewQueue(submission.queue);
  writeReviewQueueCookie(cookieStore, serializeMemberReviewQueue(submittedQueue));

  await makeSessionCookie({
    ...currentSession,
    reviewStatus: submission.request.status === "pending" ? "pending" : currentSession.reviewStatus
  });

  if (!submission.created) {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=pending&next=${encodeURIComponent(rawNext)}`);
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
  const reviewQueue = resolveMemberReviewQueue(cookieStore.get(MEMBER_REVIEW_QUEUE_COOKIE_NAME)?.value);
  const currentSession = resolveSessionWithReviewQueue(
    parseMemberSession(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value),
    reviewQueue
  );

  if (!canAccessSignedIn(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/login", locale)}?next=${encodeURIComponent(rawNext)}`);
  }

  if (!canAccessVerified(currentSession)) {
    redirect(gatePathForRequirement("email_verified", locale, rawNext));
  }

  if (!currentSession.profileComplete) {
    redirect(`${buildAbsoluteRedirect("/member/profile", locale)}?required=profile-complete&next=${encodeURIComponent(rawNext)}`);
  }

  if (decision !== "approve" && decision !== "reject") {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=invalid-decision&next=${encodeURIComponent(rawNext)}`);
  }

  if (!requestId) {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=invalid-request&next=${encodeURIComponent(rawNext)}`);
  }

  if (!canProcessReviewDecision(currentSession)) {
    redirect(`${buildAbsoluteRedirect("/member/application-status", locale)}?review=decision-blocked&next=${encodeURIComponent(rawNext)}`);
  }

  const reviewDecision = decideReviewRequestById({
    requestId,
    decision,
    decidedById: currentSession.id,
    decidedByEmail: currentSession.email
  }, reviewQueue);

  if (!reviewDecision.ok) {
    if (reviewDecision.reason === "not-pending") {
      redirect(
        `${buildAbsoluteRedirect("/member/application-status", locale)}?review=queue-closed&requestId=${encodeURIComponent(requestId)}&next=${encodeURIComponent(rawNext)}`
      );
    }
    redirect(
      `${buildAbsoluteRedirect("/member/application-status", locale)}?review=queue-missing&requestId=${encodeURIComponent(requestId)}&next=${encodeURIComponent(rawNext)}`
    );
  }

  const decidedQueue = syncMemberReviewQueue(reviewDecision.queue);
  writeReviewQueueCookie(cookieStore, serializeMemberReviewQueue(decidedQueue));

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
