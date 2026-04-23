import { expect, test } from "@playwright/test";

test.describe("Contact language and sitemap lock", () => {
  test("contact form stays in Vietnamese on /vi/contact", async ({ page }) => {
    await page.goto("/vi/contact");

    await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", "https://omdalat.com/vi/contact");
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", "Liên hệ Ôm Đà Lạt");
    await expect(page.getByLabel("Tên của bạn")).toBeVisible();
    await expect(page.getByLabel("Nội dung")).toBeVisible();
    await expect(page.getByRole("button", { name: "Gửi liên hệ" })).toBeVisible();

    const formText = await page.locator("form.runtime-form").innerText();
    expect(formText).not.toContain("Your name");
    expect(formText).not.toContain("Send message");
    expect(formText).not.toContain("Sending");
    await expect(page.getByText("Tên của bạn / Your name")).toHaveCount(0);
    await expect(page.getByText("Gửi liên hệ / Send message")).toHaveCount(0);
    await expect(page.getByText("onboarding và tham gia")).toHaveCount(0);
    await expect(page.getByText("luồng app và thông báo")).toHaveCount(0);
    await expect(page.getByText("luồng trust và bằng chứng")).toHaveCount(0);

    const docsHref = await page.locator("article.runtime-page > .runtime-actions a").first().getAttribute("href");
    expect(docsHref).toBe("/vi/docs/getting-started");
  });

  test("contact form and metadata stay in English on /en/contact", async ({ page }) => {
    await page.goto("/en/contact");

    await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", "https://omdalat.com/en/contact");
    await expect(page.locator("head link[rel='alternate'][hreflang='vi-VN']")).toHaveAttribute(
      "href",
      "https://omdalat.com/vi/contact"
    );
    await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", "Contact Om Dalat");
    await expect(page.locator("meta[property='og:description']")).toHaveAttribute(
      "content",
      "The official contact channel for Om Dalat support, partnerships, participation, and operations questions."
    );
    await expect(page.locator("meta[property='og:locale']")).toHaveAttribute("content", "en_US");
    await expect(page.getByLabel("Your name")).toBeVisible();
    await expect(page.getByLabel("Message")).toBeVisible();
    await expect(page.getByRole("button", { name: "Send message" })).toBeVisible();

    const formText = await page.locator("form.runtime-form").innerText();
    expect(formText).not.toContain("Tên của bạn");
    expect(formText).not.toContain("Gửi liên hệ");
    expect(formText).not.toContain("Đang gửi");
    await expect(page.getByText("Tên của bạn / Your name")).toHaveCount(0);
    await expect(page.getByText("Gửi liên hệ / Send message")).toHaveCount(0);

    const docsHref = await page.locator("article.runtime-page > .runtime-actions a").first().getAttribute("href");
    expect(docsHref).toBe("/en/docs/getting-started");
  });

  test("homepage keeps Vietnamese-only locked labels on /vi", async ({ page }) => {
    await page.goto("/vi");

    const sectionKickers = page.locator(".runtime-home-section-head .runtime-kicker");

    await expect(page.getByText("Ôm Đà Lạt / Om Dalat")).toHaveCount(0);
    await expect(page.getByText("Life / Work / Learning / Community")).toHaveCount(0);
    await expect(page.getByText("Fit")).toHaveCount(0);
    await expect(sectionKickers.filter({ hasText: "Sống / Làm / Học / Cộng đồng" })).toHaveCount(1);
    await expect(sectionKickers.filter({ hasText: "Phù hợp" })).toHaveCount(1);
  });

  test("homepage image alt and loading attributes follow current locale", async ({ page }) => {
    await page.goto("/en");

    const primaryImage = page.locator(".runtime-home-hero-primary img").first();
    await expect(primaryImage).toHaveAttribute("alt", "A wide view of Dalat in the early mist");
    await expect(primaryImage).toHaveAttribute("fetchpriority", "high");
    await expect(primaryImage).toHaveAttribute("loading", "eager");
    await expect(primaryImage).toHaveAttribute("width", "1800");
    await expect(primaryImage).toHaveAttribute("height", "1200");

    const lazyImages = page.locator(".runtime-home-hero-secondary img, .runtime-home-gallery img");
    const lazyCount = await lazyImages.count();
    expect(lazyCount).toBeGreaterThanOrEqual(6);
    for (let index = 0; index < lazyCount; index++) {
      await expect(lazyImages.nth(index)).toHaveAttribute("loading", "lazy");
    }
  });

  test("sitemap includes primary localized pages and hreflang keys", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();

    const xml = await response.text();
    for (const path of ["/vi/life", "/en/life", "/vi/docs", "/en/docs"]) {
      expect(xml).toContain(`https://omdalat.com${path}`);
    }

    expect(xml).toContain('hreflang="vi-VN"');
    expect(xml).toContain('hreflang="en"');
    expect(xml).not.toMatch(/hreflang="vi"(?!-)/);
  });
});
