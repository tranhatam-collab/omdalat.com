export const runtime = "edge";

import { NextResponse } from "next/server";
import { getCurrentAuthSession } from "../../../../../services/auth/index";
import { getDashboardSnapshot, getModerationQueue } from "../../../../../services/api/index";
import { getUnreadNotificationCount } from "../../../../../services/notifications/index";

export function GET() {
  const snapshot = getDashboardSnapshot();

  return NextResponse.json({
    ok: true,
    app: "omdalat-app",
    session: getCurrentAuthSession(),
    counts: {
      places: snapshot.places.length,
      hosts: snapshot.hosts.length,
      experts: snapshot.experts.length,
      communities: snapshot.communities.length,
      events: snapshot.events.length,
      proofs: snapshot.proofs.length,
      requests: snapshot.requests.length,
      moderationQueue: getModerationQueue().length,
      unreadNotifications: getUnreadNotificationCount()
    }
  });
}
