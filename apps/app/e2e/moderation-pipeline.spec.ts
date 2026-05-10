import { expect, test, type Page } from "@playwright/test";

const memberSessionCookieName = "omdalat-member-session";
const cookieOrigins = ["http://127.0.0.1:3201", "http://localhost:3201"] as const;

type TestSession = {
  id: string;
  email: string;
  name: string;
  role: "guest" | "member" | "verified_member" | "internal_member" | "admin";
  profileComplete: boolean;
  emailVerified: boolean;
};

function serializeMemberSession(session: TestSession) {
  return JSON.stringify(session);
}

async function setAppSessionCookie(page: Page, session: TestSession) {
  await page.context().addCookies(
    cookieOrigins.map((origin) => ({
      name: memberSessionCookieName,
      value: serializeMemberSession(session),
      url: origin
    }))
  );
}

test.describe("App moderation reviewer pipeline", () => {
  test("member (not reviewed) is gated away from /proofs", async ({ page }) => {
    await setAppSessionCookie(page, {
      id: "member-gated-01",
      email: "member-gated@example.com",
      name: "Member Gated",
      role: "member",
      profileComplete: true,
      emailVerified: true
    });

    await page.goto("/vi/proofs");
    await expect(page).toHaveURL(/\/vi\/member\/application-status\?required=reviewed-member/);
  });

  test("reviewer can process moderation queue on /proofs", async ({ page }) => {
    await setAppSessionCookie(page, {
      id: "reviewer-verified-01",
      email: "reviewer@example.com",
      name: "Reviewer Verified",
      role: "verified_member",
      profileComplete: true,
      emailVerified: true
    });

    await page.goto("/vi/proofs");
    await expect(page.getByRole("heading", { name: "Tầng vận hành bằng chứng" })).toBeVisible();

    const acceptButtons = page.getByRole("button", { name: "Chấp nhận" });
    const beforeCount = await acceptButtons.count();
    expect(beforeCount).toBeGreaterThan(0);

    await acceptButtons.first().click();
    await expect(page.getByRole("button", { name: "Chấp nhận" })).toHaveCount(beforeCount - 1);
  });

  test("internal reviewer role can open moderation queue on /proofs", async ({ page }) => {
    await setAppSessionCookie(page, {
      id: "internal-reviewer-01",
      email: "internal.reviewer@example.com",
      name: "Internal Reviewer",
      role: "internal_member",
      profileComplete: true,
      emailVerified: true
    });

    await page.goto("/vi/proofs");
    await expect(page.getByRole("heading", { name: "Tầng vận hành bằng chứng" })).toBeVisible();

    const acceptButtons = page.getByRole("button", { name: "Chấp nhận" });
    if ((await acceptButtons.count()) > 0) {
      await expect(acceptButtons.first()).toBeVisible();
    } else {
      await expect(page.getByText("Không có mục moderation chờ xử lý")).toBeVisible();
    }
  });
});
