/**
 * E2E tests for registration next-param fixes (commit 02c93c2)
 *
 * Tests the 4 bugs that were fixed:
 * 1. /join page links to /member/register?next=/member/welcome (not /member dashboard)
 * 2. /member dashboard gates guests → redirect to login
 * 3. /member/resources gates guests → redirect to login
 * 4. /member/application-status profile link preserves next param
 *
 * Per AGENTS.md, curl is NOT sufficient evidence. These e2e tests are required.
 */

import { expect, test } from "@playwright/test";

test.describe("Registration next-param fixes (02c93c2)", () => {
  test("1. /vi/join: register link points to /member/register?next=/member/welcome", async ({ page }) => {
    await page.goto("/vi/join");

    // Find the "Đăng ký thành viên" CTA link
    const registerLink = page.getByRole("link", { name: "Đăng ký thành viên" }).first();
    await expect(registerLink).toBeVisible();

    // Verify href contains /member/register with next param
    const href = await registerLink.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("/member/register");
    expect(href).toContain("next=/member/welcome");
  });

  test("1b. /en/join: register link points to /member/register?next=/member/welcome", async ({ page }) => {
    await page.goto("/en/join");

    const registerLink = page.getByRole("link", { name: "Register as a member" }).first();
    await expect(registerLink).toBeVisible();

    const href = await registerLink.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("/member/register");
    expect(href).toContain("next=/member/welcome");
  });

  test("2. /vi/member: guest (no cookie) is redirected to login", async ({ page }) => {
    // Ensure no session cookie exists
    await page.context().clearCookies();

    await page.goto("/vi/member");

    // Should redirect to login page with next param
    await expect(page).toHaveURL(/\/vi\/member\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get("next")).toBe("/member");
  });

  test("3. /vi/member/resources: guest (no cookie) is redirected to login", async ({ page }) => {
    await page.context().clearCookies();

    await page.goto("/vi/member/resources");

    await expect(page).toHaveURL(/\/vi\/member\/login/);
    const url = new URL(page.url());
    expect(url.searchParams.get("next")).toBe("/member/resources");
  });

  test("4. /vi/member/application-status?next=/member/handbook: profile link preserves next param", async ({ page }) => {
    // Seed a member session so we can access application-status
    const memberSession = {
      id: `e2e-reg-member-${Date.now()}`,
      email: `e2e.reg.member.${Date.now()}@example.com`,
      name: "E2E Reg Member",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested" as const,
    };

    await page.context().addCookies([
      {
        name: "omdalat-member-session",
        value: JSON.stringify(memberSession),
        url: "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/vi/member/application-status?next=/member/handbook");

    // Find the "Cập nhật hồ sơ" (Update profile) link
    const profileLink = page.getByRole("link", { name: "Cập nhật hồ sơ" }).first();
    await expect(profileLink).toBeVisible();

    const href = await profileLink.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("/member/profile");
    expect(href).toContain("next=%2Fmember%2Fhandbook");
  });

  test("4b. /en/member/application-status?next=/member/handbook: profile link preserves next param (EN)", async ({ page }) => {
    const memberSession = {
      id: `e2e-reg-member-en-${Date.now()}`,
      email: `e2e.reg.member.en.${Date.now()}@example.com`,
      name: "E2E Reg Member EN",
      role: "member",
      profileComplete: true,
      emailVerified: true,
      reviewStatus: "not_requested" as const,
    };

    await page.context().addCookies([
      {
        name: "omdalat-member-session",
        value: JSON.stringify(memberSession),
        url: "http://127.0.0.1:3100",
      },
    ]);

    await page.goto("/en/member/application-status?next=/member/handbook");

    const profileLink = page.getByRole("link", { name: "Update profile" }).first();
    await expect(profileLink).toBeVisible();

    const href = await profileLink.getAttribute("href");
    expect(href).toBeTruthy();
    expect(href).toContain("/member/profile");
    expect(href).toContain("next=%2Fmember%2Fhandbook");
  });
});
