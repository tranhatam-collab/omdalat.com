"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import type { MemberSession } from "../../../packages/types";
import { logoutAuthSession, switchAuthSession } from "../../../services/auth/index";
import { createProofSubmission, reviewProofSubmission } from "../../../services/api/index";
import { pushNotification, markNotificationRead } from "../../../services/notifications/index";
import {
  canAccessReviewed,
  canAccessSignedIn,
  fixtureSessionToState,
  MEMBER_SESSION_COOKIE_NAME,
  MEMBER_SESSION_MAX_AGE_SECONDS,
  type MemberSessionState,
  resolveMemberSessionState,
  serializeMemberSession
} from "../lib/member-session";
import {
  applyForWork,
  registerBasicAccount,
  requestStay,
  reviewMemberApplication,
  submitBasicApplication,
  type ReviewAction
} from "../lib/member-flow";

function refreshAppShell() {
  [
    "/dashboard",
    "/apply",
    "/stay",
    "/work",
    "/learning",
    "/resources",
    "/earnings",
    "/places",
    "/contributor",
    "/admin/review",
    "/member/register",
    "/member/login",
    "/member/application-status",
    "/profile",
    "/settings",
    "/proofs"
  ].forEach((path) => revalidatePath(path));
}

async function writeMemberSessionCookie(memberSession: MemberSession) {
  return writeMemberSessionStateCookie(fixtureSessionToState(memberSession));
}

async function writeMemberSessionStateCookie(session: MemberSessionState) {
  const cookieStore = await cookies();
  cookieStore.set(MEMBER_SESSION_COOKIE_NAME, serializeMemberSession(session), {
    path: "/",
    maxAge: MEMBER_SESSION_MAX_AGE_SECONDS,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true
  });
}

export async function switchSessionAction(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/profile");
  const nextSession = switchAuthSession(sessionId);
  await writeMemberSessionCookie(nextSession);

  pushNotification({
    kind: "auth",
    title: "Active session updated",
    detail: `${nextSession.name} is now the active session for ${nextSession.homeNode}.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "Open profile",
    ctaHref: "/profile"
  });

  refreshAppShell();
  redirect(redirectTo);
}

function buildMemberIdFromEmail(email: string) {
  return email
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function readCommaSeparatedValues(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function registerMemberAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/apply");
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (!fullName || !email) {
    redirect("/member/register?error=missing-fields");
  }

  const memberId = buildMemberIdFromEmail(email) || `registered-${Date.now()}`;
  const profile = registerBasicAccount({
    id: memberId,
    fullName,
    email
  });

  await writeMemberSessionStateCookie({
    id: profile.id,
    email: profile.email,
    name: profile.full_name,
    role: profile.memberStatus,
    memberStatus: profile.memberStatus,
    profileComplete: false,
    emailVerified: true
  });

  pushNotification({
    kind: "auth",
    title: "Basic account created",
    detail: `${profile.full_name} can now continue into the application flow.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "Open application",
    ctaHref: "/apply"
  });

  refreshAppShell();
  redirect(redirectTo);
}

export async function submitBasicApplicationAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/member/application-status?submitted=1");
  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!canAccessSignedIn(currentSession)) {
    redirect("/member/register?next=/apply");
  }

  const profile = submitBasicApplication(currentSession.id, {
    full_name: String(formData.get("full_name") ?? ""),
    email: String(formData.get("email") ?? currentSession.email),
    phone_or_contact: String(formData.get("phone_or_contact") ?? ""),
    current_location: String(formData.get("current_location") ?? ""),
    why_dalat: String(formData.get("why_dalat") ?? ""),
    what_are_you_looking_for: String(formData.get("what_are_you_looking_for") ?? ""),
    what_can_you_do: String(formData.get("what_can_you_do") ?? ""),
    skills: readCommaSeparatedValues(formData.get("skills")),
    work_status: String(formData.get("work_status") ?? ""),
    planned_stay_length: String(formData.get("planned_stay_length") ?? ""),
    portfolio_or_intro_link: String(formData.get("portfolio_or_intro_link") ?? ""),
    notes: String(formData.get("notes") ?? "")
  });

  await writeMemberSessionStateCookie({
    ...currentSession,
    email: profile.email,
    name: profile.full_name,
    role: profile.memberStatus,
    memberStatus: profile.memberStatus,
    profileComplete: profile.memberStatus !== "registered",
    emailVerified: true
  });

  pushNotification({
    kind: "request",
    title: "Application submitted",
    detail: `${profile.full_name} is now in the ${profile.memberStatus} lane.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "Open status",
    ctaHref: "/member/application-status"
  });

  refreshAppShell();
  redirect(redirectTo);
}

export async function requestStayAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/stay");
  const stayOptionId = String(formData.get("stayOptionId") ?? "");
  const note = String(formData.get("note") ?? "");
  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!canAccessSignedIn(currentSession)) {
    redirect("/member/register?next=/stay");
  }

  if (stayOptionId) {
    requestStay(currentSession.id, stayOptionId, note);
  }

  refreshAppShell();
  redirect(`${redirectTo}?requested=1`);
}

export async function applyForWorkAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/work");
  const workItemId = String(formData.get("workItemId") ?? "");
  const note = String(formData.get("note") ?? "");
  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!canAccessSignedIn(currentSession)) {
    redirect("/member/register?next=/work");
  }

  if (workItemId) {
    applyForWork(currentSession.id, workItemId, note);
  }

  refreshAppShell();
  redirect(`${redirectTo}?applied=1`);
}

export async function reviewMemberApplicationAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/admin/review");
  const memberId = String(formData.get("memberId") ?? "");
  const action = String(formData.get("action") ?? "") as ReviewAction;
  const note = String(formData.get("note") ?? "");
  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!["operator", "admin", "internal_member"].includes(currentSession.role)) {
    redirect("/dashboard?required=operator");
  }

  if (!memberId || !action) {
    redirect(`${redirectTo}?error=missing-review-action`);
  }

  const updated = reviewMemberApplication(memberId, action, note);

  if (updated) {
    pushNotification({
      kind: "moderation",
      title: "Member review updated",
      detail: `${updated.full_name} moved to ${updated.memberStatus}.`,
      createdAt: new Date().toISOString(),
      ctaLabel: "Open review queue",
      ctaHref: "/admin/review"
    });
  }

  refreshAppShell();
  redirect(`${redirectTo}?reviewed=1`);
}

export async function logoutSessionAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/profile");
  const guestSession = logoutAuthSession();
  await writeMemberSessionCookie(guestSession);

  pushNotification({
    kind: "auth",
    title: "Session returned to guest mode",
    detail: `${guestSession.name} is now the active observer session.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "View dashboard",
    ctaHref: "/dashboard"
  });

  refreshAppShell();
  redirect(redirectTo);
}

export async function submitProofAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/proofs");
  const title = String(formData.get("title") ?? "").trim();
  const kind = String(formData.get("kind") ?? "").trim();
  const subjectType = String(formData.get("subjectType") ?? "").trim();
  const subjectName = String(formData.get("subjectName") ?? "").trim();
  const outcome = String(formData.get("outcome") ?? "").trim();
  const evidence = String(formData.get("evidence") ?? "").trim();

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!canAccessSignedIn(currentSession)) {
    redirect("/member/login");
  }

  if (!canAccessReviewed(currentSession)) {
    redirect("/member/application-status");
  }

  if (!title || !kind || !subjectType || !subjectName || !outcome || !evidence) {
    redirect(redirectTo);
  }

  const proof = createProofSubmission({
    title,
    kind,
    outcome,
    evidence,
    subjectType: subjectType as "place" | "host" | "expert" | "community" | "event",
    subjectName
  });

  pushNotification({
    kind: "proof",
    title: "Proof submitted for review",
    detail: `${proof.title} is now waiting for moderation review and trust scoring.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "Review proofs",
    ctaHref: "/proofs"
  });

  refreshAppShell();
  redirect(redirectTo);
}

export async function reviewProofAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/proofs");
  const proofId = String(formData.get("proofId") ?? "").trim();
  const decision = String(formData.get("decision") ?? "").trim() as "accepted" | "flagged" | "rejected";
  const note = String(formData.get("note") ?? "").trim();

  const cookieStore = await cookies();
  const currentSession = resolveMemberSessionState(cookieStore.get(MEMBER_SESSION_COOKIE_NAME)?.value);

  if (!canAccessReviewed(currentSession)) {
    redirect(redirectTo);
  }

  if (!proofId || !decision) {
    redirect(redirectTo);
  }

  const reviewedProof = reviewProofSubmission({
    proofId,
    status: decision,
    note,
    reviewer: "Local moderation desk"
  });

  if (reviewedProof) {
    pushNotification({
      kind: decision === "accepted" ? "trust" : "moderation",
      title:
        decision === "accepted"
          ? "Proof accepted into trust ledger"
          : decision === "flagged"
            ? "Proof flagged for follow-up"
            : "Proof rejected from public trust",
      detail: `${reviewedProof.title} now has review status "${decision}".`,
      createdAt: new Date().toISOString(),
      ctaLabel: "Open proofs",
      ctaHref: "/proofs"
    });
  }

  refreshAppShell();
  redirect(redirectTo);
}

export async function markNotificationReadAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/dashboard");
  const notificationId = String(formData.get("notificationId") ?? "").trim();

  if (notificationId) {
    markNotificationRead(notificationId);
  }

  refreshAppShell();
  redirect(redirectTo);
}
