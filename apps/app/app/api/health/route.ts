export const runtime = "edge";

import { NextResponse } from "next/server";
import { siteConfig } from "../../../../../packages/core";
import { getDashboardSnapshot, getModerationQueue } from "../../../../../services/api/index";
import { getAuthRuntimeConfig, getCurrentAuthSession } from "../../../../../services/auth/index";
import { getUnreadNotificationCount } from "../../../../../services/notifications/index";

export function GET() {
  const snapshot = getDashboardSnapshot();
  const authConfig = getAuthRuntimeConfig();

  return NextResponse.json({
    ok: true,
    app: siteConfig.appRuntimeName,
    hosts: {
      app: siteConfig.appOrigin,
      docs: siteConfig.docsOrigin,
      auth: authConfig.authOrigin
    },
    auth: {
      sessionMode: authConfig.sessionMode,
      cookieDomain: authConfig.cookieDomain,
      loginFlow: authConfig.loginFlow
    },
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
