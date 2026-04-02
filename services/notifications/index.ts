import { slugify } from "../../packages/core/utils";
import type { OmdalatLocale } from "../../packages/core";
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

function localizeCtaLabel(label: string, locale: OmdalatLocale) {
  if (locale !== "vi") return label;

  const map: Record<string, string> = {
    "Review requests": "Rà soát yêu cầu",
    "Open proofs": "Mở bằng chứng",
    "View profile": "Xem hồ sơ",
    "Open profile": "Mở hồ sơ",
    "View dashboard": "Xem dashboard"
  };

  return map[label] ?? label;
}

function localizeNotification(notification: NotificationRecord, locale: OmdalatLocale): NotificationRecord {
  if (locale !== "vi") {
    return notification;
  }

  const mappedTitle: Record<string, string> = {
    "Open host request needs attention": "Yêu cầu host mở cần được chú ý",
    "Proof review lane is active": "Luồng rà soát bằng chứng đang hoạt động",
    "Demo session loaded": "Phiên demo đã được tải",
    "Demo session switched": "Đã chuyển phiên demo",
    "Session returned to guest mode": "Phiên đã quay về chế độ khách",
    "Proof submitted for review": "Đã gửi bằng chứng để rà soát",
    "Proof accepted into trust ledger": "Bằng chứng đã được chấp nhận vào sổ trust",
    "Proof flagged for follow-up": "Bằng chứng đã được đánh dấu để theo dõi",
    "Proof rejected from public trust": "Bằng chứng đã bị từ chối khỏi trust công khai"
  };

  const mappedDetail = notification.detail
    .replace("is still open and ready for a trusted response.", "vẫn đang mở và sẵn sàng cho phản hồi đáng tin cậy.")
    .replace("seed proofs are shaping the current trust ledger for demo review.", "bằng chứng seed đang định hình sổ trust hiện tại cho quá trình rà soát demo.")
    .replace("is the current authenticated fixture session.", "là phiên fixture đã xác thực hiện tại.")
    .replace("is now the active session for", "hiện là phiên đang hoạt động cho")
    .replace("is now the active observer session.", "hiện là phiên quan sát đang hoạt động.")
    .replace("is now waiting for moderation review and trust scoring.", "đang chờ rà soát moderation và chấm điểm trust.")
    .replace('now has review status "accepted".', 'hiện có trạng thái rà soát "đã chấp nhận".')
    .replace('now has review status "flagged".', 'hiện có trạng thái rà soát "đã đánh dấu".')
    .replace('now has review status "rejected".', 'hiện có trạng thái rà soát "đã từ chối".');

  return {
    ...notification,
    title: mappedTitle[notification.title] ?? notification.title,
    detail: mappedDetail,
    ctaLabel: notification.ctaLabel ? localizeCtaLabel(notification.ctaLabel, locale) : notification.ctaLabel
  };
}

export function listNotifications(locale: OmdalatLocale = "en") {
  return [...notifications]
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt))
    .map((item) => localizeNotification(item, locale));
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
