import { expect, test } from "@playwright/test";

const locales = ["vi", "en"] as const;
const primaryRoutes = ["life", "work", "learning", "community", "stay", "join", "articles"] as const;
const articleSmokeSlugs = ["song-o-da-lat-la-gi", "lam-viec-o-da-lat-co-thuc-te-khong"] as const;
const legacyRouteRedirects = [
  { from: "what-is-omdalat", to: "about" },
  { from: "free-member", to: "join" },
  { from: "packages", to: "stay" },
  { from: "vision", to: "about" },
  { from: "creative-economy", to: "learning" },
  { from: "trust", to: "community" },
  { from: "proofs", to: "articles" },
  { from: "events", to: "community" },
  { from: "places", to: "stay" },
  { from: "hosts", to: "community" },
  { from: "experts", to: "work" },
  { from: "communities", to: "community" },
  { from: "work-and-opportunity", to: "work" },
  { from: "city-signals", to: "community" },
  { from: "requests", to: "work" },
  { from: "help", to: "docs" },
  { from: "vitals", to: "about" },
  { from: "how-it-works", to: "docs/how-it-works" },
  { from: "faq", to: "docs/faq" }
] as const;
const legacyDetailRouteRedirects = [
  { from: "events/legacy-session", to: "community" },
  { from: "places/legacy-space", to: "stay" },
  { from: "hosts/legacy-host", to: "community" },
  { from: "experts/legacy-expert", to: "work" },
  { from: "communities/legacy-circle", to: "community" },
  { from: "proofs/legacy-proof", to: "articles" }
] as const;

test.describe("Locale smoke checks", () => {
  for (const locale of locales) {
    test(`homepage loads and has canonical/hreflang for /${locale}`, async ({ page }) => {
      await page.goto(`/${locale}`);
      await expect(page).toHaveURL(new RegExp(`/${locale}$`));

      const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
      expect(canonicalHref).toBe(`https://omdalat.com/${locale}`);

      const viHref = await page.locator("head link[rel='alternate'][hreflang='vi-VN']").getAttribute("href");
      const enHref = await page.locator("head link[rel='alternate'][hreflang='en']").getAttribute("href");
      const xDefaultHref = await page.locator("head link[rel='alternate'][hreflang='x-default']").getAttribute("href");

      expect(viHref).toBe("https://omdalat.com/vi");
      expect(enHref).toBe("https://omdalat.com/en");
      expect(xDefaultHref).toBe("https://omdalat.com/vi");
    });

    for (const route of primaryRoutes) {
      test(`primary route ${route} loads on /${locale}`, async ({ page }) => {
        await page.goto(`/${locale}/${route}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/${route}$`));

        const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
        expect(canonicalHref).toBe(`https://omdalat.com/${locale}/${route}`);
      });
    }

    for (const redirectCase of legacyRouteRedirects) {
      test(`legacy route ${redirectCase.from} redirects to ${redirectCase.to} on /${locale}`, async ({ page }) => {
        await page.goto(`/${locale}/${redirectCase.from}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/${redirectCase.to}$`));

        const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
        expect(canonicalHref).toBe(`https://omdalat.com/${locale}/${redirectCase.to}`);
      });
    }

    for (const redirectCase of legacyDetailRouteRedirects) {
      test(`legacy detail route ${redirectCase.from} redirects to ${redirectCase.to} on /${locale}`, async ({ page }) => {
        await page.goto(`/${locale}/${redirectCase.from}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/${redirectCase.to}$`));

        const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
        expect(canonicalHref).toBe(`https://omdalat.com/${locale}/${redirectCase.to}`);
      });
    }

    for (const slug of articleSmokeSlugs) {
      test(`article detail page /${locale}/articles/${slug} is indexable and has internal links`, async ({ page }) => {
        await page.goto(`/${locale}/articles/${slug}`);
        await expect(page).toHaveURL(new RegExp(`/${locale}/articles/${slug}$`));

        const canonicalHref = await page.locator("head link[rel='canonical']").getAttribute("href");
        expect(canonicalHref).toBe(`https://omdalat.com/${locale}/articles/${slug}`);

        const viHref = await page.locator("head link[rel='alternate'][hreflang='vi-VN']").getAttribute("href");
        const enHref = await page.locator("head link[rel='alternate'][hreflang='en']").getAttribute("href");
        const xDefaultHref = await page.locator("head link[rel='alternate'][hreflang='x-default']").getAttribute("href");

        expect(viHref).toBe(`https://omdalat.com/vi/articles/${slug}`);
        expect(enHref).toBe(`https://omdalat.com/en/articles/${slug}`);
        expect(xDefaultHref).toBe(`https://omdalat.com/vi/articles/${slug}`);

        const jsonLdPayloads = await page.locator("script[type='application/ld+json']").allTextContents();
        expect(jsonLdPayloads.some((payload) => payload.includes('"@type":"Article"'))).toBeTruthy();

        const internalLinks = page.locator(".runtime-article-links a");
        const linkCount = await internalLinks.count();
        expect(linkCount).toBeGreaterThanOrEqual(3);

        for (let index = 0; index < linkCount; index++) {
          const href = await internalLinks.nth(index).getAttribute("href");
          expect(href).toBeTruthy();
          expect(href).toMatch(new RegExp(`^/${locale}/`));
        }
      });
    }
  }
});
