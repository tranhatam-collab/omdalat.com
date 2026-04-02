"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logoutAuthSession, switchAuthSession } from "../../../services/auth/index";
import { createProofSubmission, reviewProofSubmission } from "../../../services/api/index";
import { pushNotification, markNotificationRead } from "../../../services/notifications/index";

function refreshAppShell() {
  ["/dashboard", "/places", "/hosts", "/experts", "/communities", "/events", "/proofs", "/profile", "/settings"].forEach(
    (path) => revalidatePath(path)
  );
}

export async function switchSessionAction(formData: FormData) {
  const sessionId = String(formData.get("sessionId") ?? "");
  const redirectTo = String(formData.get("redirectTo") ?? "/profile");
  const nextSession = switchAuthSession(sessionId);

  pushNotification({
    kind: "auth",
    title: "Demo session switched",
    detail: `${nextSession.name} is now the active session for ${nextSession.homeNode}.`,
    createdAt: new Date().toISOString(),
    ctaLabel: "Open profile",
    ctaHref: "/profile"
  });

  refreshAppShell();
  redirect(redirectTo);
}

export async function logoutSessionAction(formData: FormData) {
  const redirectTo = String(formData.get("redirectTo") ?? "/profile");
  const guestSession = logoutAuthSession();

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
