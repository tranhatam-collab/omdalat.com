import { expect, test } from "@playwright/test";

const locales = ["vi", "en"] as const;

const publicRoutes = [
  "/",
  "/about",
  "/life",
  "/work",
  "/learning",
  "/community",
  "/stay",
  "/articles",
  "/join",
  "/contact",
  "/docs",
  "/privacy",
  "/terms"
] as const;

const ctaLock = {
  "/": {
    vi: ["Bắt đầu từ đây", "Xem cách tham gia"],
    en: ["Start here", "See how to join"]
  },
  "/join": {
    vi: ["Đăng ký thành viên", "Đọc hướng dẫn trước"],
    en: ["Register as a member", "Read the guide first"]
  },
  "/contact": {
    vi: ["Xem cách ở lại"],
    en: ["See stay options"]
  }
} as const;

test.describe("Public intro/H1/CTA lock", () => {
  for (const locale of locales) {
    for (const route of publicRoutes) {
      test(`${locale}${route}: has locked H1 + intro`, async ({ page }) => {
        const target = route === "/" ? `/${locale}` : `/${locale}${route}`;
        await page.goto(target);

        const article = page.locator("article").first();
        await expect(article).toBeVisible();

        const h1 = article.locator("h1").first();
        await expect(h1).toBeVisible();
        await expect(h1).not.toHaveText(/^\\s*$/);

        const intro = article.locator("h1 + p").first();
        await expect(intro).toBeVisible();
        await expect(intro).not.toHaveText(/^\\s*$/);
      });
    }

    for (const [route, labels] of Object.entries(ctaLock)) {
      test(`${locale}${route}: has locked CTA`, async ({ page }) => {
        const target = route === "/" ? `/${locale}` : `/${locale}${route}`;
        await page.goto(target);

        for (const label of labels[locale]) {
          await expect(page.getByRole("link", { name: label }).first()).toBeVisible();
        }
      });
    }
  }
});
