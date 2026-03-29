import { slugify } from "../../packages/core/utils";
import type { NotificationRecord } from "../../packages/types";
import { getCurrentAuthSession } from "../auth";
import { getDashboardSnapshot } from "../api";

function makeNotificationId(seed: string) {
  return `${slugify(seed)}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const snapshot = getDashboardSnapshot();
let notifications: NotificationRecord[] = [
  {
    id: "notif-request-breakfast",
    kind: "request",
    title: "Open host request needs attention",
    detail: `${snapshot.requests[0]?.title ?? "A new request"} is still open and ready for a trusted response.`,
    createdAt: snapshot.requests[0]?.dueAt ?? new Date().toISOString(),
    read: false,
    ctaLabel: "Review requests",
    ctaHref: "/dashboard"
  },
  {
    id: "notif-proof-review",
    kind: "moderation",
    title: "Proof review lane is active",
    detail: `${snapshot.proofs.length} seed proofs are shaping the current trust ledger for demo review.`,
    createdAt: snapshot.proofs[0]?.recordedAt ?? new Date().toISOString(),
    read: false,
    ctaLabel: "Open proofs",
    ctaHref: "/proofs"
  },
  {
    id: "notif-auth-session",
    kind: "auth",
    title: "Demo session loaded",
    detail: `${getCurrentAuthSession().name} is the current authenticated fixture session.`,
    createdAt: new Date().toISOString(),
    read: false,
    ctaLabel: "View profile",
    ctaHref: "/profile"
  }
];

export function listNotifications() {
  return [...notifications].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}

export function getUnreadNotificationCount() {
  return notifications.filter((item) => !item.read).length;
}

export function pushNotification(input: Omit<NotificationRecord, "id" | "read">) {
  const notification: NotificationRecord = {
    id: makeNotificationId(`${input.kind}-${input.title}`),
    read: false,
    ...input
  };

  notifications = [notification, ...notifications].slice(0, 12);
  return notification;
}

export function markNotificationRead(notificationId: string) {
  notifications = notifications.map((notification) =>
    notification.id === notificationId ? { ...notification, read: true } : notification
  );

  return notifications.find((notification) => notification.id === notificationId);
}
