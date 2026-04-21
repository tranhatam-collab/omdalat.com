import { expect, test, type Page } from "@playwright/test";

const memberSessionCookieName = "omdalat-member-session";
const cookieOrigins = (() => {
  const origins = new Set(["http://127.0.0.1:3100", "http://localhost:3100"]);
  const previewBaseURL = process.env.PREVIEW_BASE_URL;

  if (previewBaseURL) {
    try {
      origins.add(new URL(previewBaseURL).origin);
    } catch (error) {
      throw new Error(
        `Invalid PREVIEW_BASE_URL for member-review-queue cookies: ${previewBaseURL}. ${
          error instanceof Error ? error.message : "Unknown parse error"
        }`
      );
    }
  }

  return [...origins];
})();

type SessionSeed = {
  id: string;
  email: string;
  name: string;
  role: "guest" | "member" | "verified_member" | "internal_member" | "admin";
  profileComplete: boolean;
  emailVerified: boolean;
  reviewStatus: "not_requested" | "pending" | "approved" | "rejected";
};

function makeRunTag(label: string) {
  return `${label}-${Date.now()}-${Math.round(Math.random() * 1_000_000)}`;
}

async function seedSessionCookie(page: Page, session: SessionSeed) {
  await page.context().addCookies(
    cookieOrigins.map((origin) => ({
      name: memberSessionCookieName,
      value: JSON.stringify(session),
      url: origin
    }))
  );
}

test.describe("Member review queue flow", () => {
  test("member submit -> internal review approve -> operations unlock", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const runTag = makeRunTag("approve");
    const memberSeed = {
      id: `team3-member-${runTag}`,
      email: `team3.member.${runTag}@example.com`,
      name: "Team 3 Member"
    } as const;

    await seedSessionCookie(page, {
      ...memberSeed,
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    await page.getByRole("button", { name: "Gửi vào review queue" }).click();
    await expect(page).toHaveURL(/review=submitted/);
    await expect(page.getByText("Hồ sơ đã gửi thành công")).toBeVisible();
    await expect(page.getByRole("button", { name: "Duyệt hồ sơ" })).toHaveCount(0);

    const submittedRequestId = new URL(page.url()).searchParams.get("requestId");
    expect(submittedRequestId).toBeTruthy();

    await seedSessionCookie(page, {
      id: `team3-reviewer-internal-${runTag}`,
      email: `team3.reviewer.${runTag}@example.com`,
      name: "Team 3 Reviewer",
      role: "internal_member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "approved"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    await expect(page.getByRole("button", { name: "Duyệt hồ sơ và mở quyền" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Từ chối hồ sơ" })).toBeVisible();

    if (submittedRequestId) {
      await expect(page.getByText(submittedRequestId)).toBeVisible();
    }

    const approveForm = page.locator('form:has(input[name="decision"][value="approve"])').first();
    await approveForm.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    await expect(page).toHaveURL(/\/vi\/member\/operations$/);
    await expect(page.getByRole("heading", { name: "Snapshot vận hành nội dung" })).toBeVisible();

    // Candidate should unlock reviewed routes after approval, even with stale session reviewStatus.
    await seedSessionCookie(page, {
      ...memberSeed,
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "pending"
    });

    await page.goto("/vi/member/operations");
    await expect(page).toHaveURL(/\/vi\/member\/operations$/);
    await expect(page.getByRole("heading", { name: "Snapshot vận hành nội dung" })).toBeVisible();

    await page.goto("/vi/member/application-status");
    await expect(page.getByText("Đã duyệt")).toBeVisible();

    await context.close();
  });

  test("member submit -> internal review reject -> operations remains gated", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const runTag = makeRunTag("reject");

    await seedSessionCookie(page, {
      id: `team3-member-reject-${runTag}`,
      email: `team3.member.reject.${runTag}@example.com`,
      name: "Team 3 Member Reject",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    await page.getByRole("button", { name: "Gửi vào review queue" }).click();
    await expect(page).toHaveURL(/review=submitted/);

    const submittedRequestId = new URL(page.url()).searchParams.get("requestId");
    expect(submittedRequestId).toBeTruthy();

    await seedSessionCookie(page, {
      id: `team3-reviewer-internal-reject-${runTag}`,
      email: `team3.reviewer.reject.${runTag}@example.com`,
      name: "Team 3 Reviewer Reject",
      role: "internal_member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "approved"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    await expect(page.getByRole("button", { name: "Từ chối hồ sơ" })).toBeVisible();
    if (submittedRequestId) {
      await expect(page.getByText(submittedRequestId)).toBeVisible();
    }
    const rejectForm = page.locator('form:has(input[name="decision"][value="reject"])').first();
    await rejectForm.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    await expect(page).toHaveURL(/review=rejected/);

    await seedSessionCookie(page, {
      id: `team3-member-reject-${runTag}`,
      email: `team3.member.reject.${runTag}@example.com`,
      name: "Team 3 Member Reject",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "pending"
    });

    await page.goto("/vi/member/operations");
    await expect(page).toHaveURL(/\/vi\/member\/application-status\?required=reviewed-member/);
    await expect(page.getByText("Đã từ chối")).toBeVisible();

    await context.close();
  });

  test("review decision without requestId shows invalid-request feedback", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const runTag = makeRunTag("invalid-request");

    await seedSessionCookie(page, {
      id: `team3-member-invalid-request-${runTag}`,
      email: `team3.member.invalid.request.${runTag}@example.com`,
      name: "Team 3 Member Invalid Request",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    await page.getByRole("button", { name: "Gửi vào review queue" }).click();
    await expect(page).toHaveURL(/review=submitted/);

    await seedSessionCookie(page, {
      id: `team3-reviewer-invalid-request-${runTag}`,
      email: `team3.reviewer.invalid.request.${runTag}@example.com`,
      name: "Team 3 Reviewer Invalid Request",
      role: "internal_member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "approved"
    });

    await page.goto("/vi/member/application-status?next=/member/operations");
    const approveForm = page.locator('form:has(input[name="decision"][value="approve"])').first();
    await expect(approveForm).toBeVisible();

    await approveForm.locator('input[name="requestId"]').evaluate((input) => {
      (input as HTMLInputElement).value = "";
    });

    await approveForm.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    await expect(page).toHaveURL(/review=invalid-request/);
    await expect(page.getByText("Thiếu request id cho quyết định review.")).toBeVisible();

    await context.close();
  });

  test("stale reviewer form shows queue-closed when request was already handled", async ({ browser }) => {
    const context = await browser.newContext();
    const memberPage = await context.newPage();
    const runTag = makeRunTag("queue-closed");

    await seedSessionCookie(memberPage, {
      id: `team3-member-queue-closed-${runTag}`,
      email: `team3.member.queue.closed.${runTag}@example.com`,
      name: "Team 3 Member Queue Closed",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested"
    });

    await memberPage.goto("/vi/member/application-status?next=/member/operations");
    await memberPage.getByRole("button", { name: "Gửi vào review queue" }).click();
    await expect(memberPage).toHaveURL(/review=submitted/);
    const requestId = new URL(memberPage.url()).searchParams.get("requestId");
    expect(requestId).toBeTruthy();

    await seedSessionCookie(memberPage, {
      id: `team3-reviewer-queue-closed-${runTag}`,
      email: `team3.reviewer.queue.closed.${runTag}@example.com`,
      name: "Team 3 Reviewer Queue Closed",
      role: "internal_member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "approved"
    });

    const staleReviewerPage = await context.newPage();
    await staleReviewerPage.goto("/vi/member/application-status?next=/member/operations");
    const staleApproveButton = staleReviewerPage.getByRole("button", { name: "Duyệt hồ sơ và mở quyền" });
    await expect(staleApproveButton).toBeVisible();

    const freshReviewerPage = await context.newPage();
    await freshReviewerPage.goto("/vi/member/application-status?next=/member/operations");
    const freshApproveForm = freshReviewerPage.locator('form:has(input[name="decision"][value="approve"])').first();
    await freshApproveForm.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    await expect(freshReviewerPage).toHaveURL(/\/vi\/member\/operations$/);

    const staleApproveForm = staleReviewerPage.locator('form:has(input[name="decision"][value="approve"])').first();
    await staleApproveForm.evaluate((form) => {
      (form as HTMLFormElement).requestSubmit();
    });
    await expect(staleReviewerPage).toHaveURL(/review=queue-closed/);
    await expect(staleReviewerPage.getByText("Request này đã được xử lý trước đó.")).toBeVisible();

    await context.close();
  });
});
