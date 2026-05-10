import { expect, test } from "@playwright/test";

const locales = ["vi", "en"] as const;
const listingRoutes = ["places", "hosts", "experts", "communities", "events", "proofs"] as const;

test.describe("Locale smoke checks", () => {
  for (const locale of locales) {
    test(`homepage loads and has canonical/hreflang for /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));

      const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
      expect(canonicalHref).toBe(`https://omdalat.com/${locale}`);

      const viHref = await page.locator("head link[rel='alternate'][hreflang='vi']").getAttribute("href");
      const enHref = await page.locator("head link[rel='alternate'][hreflang='en']").getAttribute("href");
      const xDefaultHref = await page.locator("head link[rel='alternate'][hreflang='x-default']").getAttribute("href");

      expect(viHref).toBe("https://omdalat.com/vi");
      expect(enHref).toBe("https://omdalat.com/en");
      expect(xDefaultHref).toBe("https://omdalat.com/vi");
    });

    for (const route of listingRoutes) {
      test(`click-through ${route} listing to detail on /${locale}`, async ({ page }) => {
        await page.goto(`/${locale}/${route}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/${route}$`));

        const detailLink = page.locator(`a[href^='/${locale}/${route}/']`).first();
        await expect(detailLink).toBeVisible();
        await detailLink.click();

        await expect(page).toHaveURL(new RegExp(`/${locale}/${route}/[^/]+$`));

        const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
        expect(canonicalHref).toContain(`/${locale}/${route}/`);
      });
    }
  }
});
