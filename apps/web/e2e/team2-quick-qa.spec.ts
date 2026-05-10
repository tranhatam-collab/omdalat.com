import { devices, expect, type Page, test } from "@playwright/test";

const homepageRules = {
  blockedDomains: ["docs.omdala.com", "app.omdala.com"],
  blockedWords: ["OMDALA"]
} as const;

async function assertHomepageClean(page: Page) {
  const homepage = page.locator("article.runtime-homepage");
  await expect(homepage).toBeVisible();

  const homepageText = await homepage.innerText();
  const html = await page.content();

  for (const domain of homepageRules.blockedDomains) {
    expect(html.includes(domain)).toBeFalsy();
  }

  for (const blockedWord of homepageRules.blockedWords) {
    expect(homepageText.includes(blockedWord)).toBeFalsy();
  }
}

async function assertFooterBridge(
  page: Page,
  expectedLabel: "Ấp Đà Lạt" | "Ap Dalat"
) {
  const footer = page.locator("footer");
  await expect(footer).toBeVisible();
  await expect(footer.getByRole("link", { name: expectedLabel, exact: true })).toBeVisible();
}

async function assertContextualCta(page: Page) {
  const helpSection = page.locator(".runtime-help-section").first();
  await expect(helpSection).toBeVisible();

  const primaryAction = helpSection.locator(".runtime-actions a").first();
  await expect(primaryAction).toBeVisible();
  const actionText = (await primaryAction.innerText()).trim();
  const href = await primaryAction.getAttribute("href");

  expect(actionText).not.toBe("Đọc hướng dẫn");
  expect(actionText).not.toBe("Read the guide");
  expect(href).not.toBe("/vi/docs");
  expect(href).not.toBe("/en/docs");
}

test("desktop quick qa: homepage/footer/contextual cta", async ({ page }) => {
  await page.goto("/vi");
  await assertHomepageClean(page);
  await assertFooterBridge(page, "Ấp Đà Lạt");

  await page.goto("/en");
  await assertFooterBridge(page, "Ap Dalat");

  await page.goto("/vi/join");
  await assertContextualCta(page);

  await page.goto("/vi/contact");
  await assertContextualCta(page);
});

test("mobile quick qa: homepage/footer/overflow/contextual cta", async ({ browser }) => {
  const context = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await context.newPage();

  await page.goto("/vi");
  await assertHomepageClean(page);
  await assertFooterBridge(page, "Ấp Đà Lạt");
  const header = page.locator(".runtime-header");

  await expect(page.locator(".runtime-mobile-menu")).toBeVisible();
  await expect(header.getByRole("link", { name: "Trang chủ" })).toHaveCount(0);

  await page.locator(".runtime-mobile-menu-toggle").click();
  await expect(page.locator(".runtime-mobile-menu-panel")).toBeVisible();
  await expect(header.locator(".runtime-mobile-menu-panel").getByRole("link", { name: "Trang chủ" })).toBeVisible();
  await expect(header.locator(".runtime-mobile-menu-panel").getByRole("link", { name: "Bắt đầu từ đây" })).toBeVisible();

  const horizontalOverflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth - doc.clientWidth;
  });
  expect(horizontalOverflow).toBeLessThanOrEqual(1);

  await page.goto("/en");
  await assertFooterBridge(page, "Ap Dalat");

  await page.goto("/vi/join");
  await assertContextualCta(page);

  await context.close();
});
