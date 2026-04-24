import { expect, test } from "@playwright/test";

const localeMetadataCases = [
  {
    path: "/privacy",
    vi: {
      title: "Quyền riêng tư Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/privacy"
    },
    en: {
      title: "Om Dalat Privacy",
      canonical: "https://omdalat.com/en/privacy"
    }
  },
  {
    path: "/terms",
    vi: {
      title: "Điều khoản Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/terms"
    },
    en: {
      title: "Om Dalat Terms",
      canonical: "https://omdalat.com/en/terms"
    }
  },
  {
    path: "/docs",
    vi: {
      title: "Hướng dẫn Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/docs"
    },
    en: {
      title: "Om Dalat Guides",
      canonical: "https://omdalat.com/en/docs"
    }
  },
  {
    path: "/docs/getting-started",
    vi: {
      title: "Bắt đầu với Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/docs/getting-started"
    },
    en: {
      title: "Getting Started with Om Dalat",
      canonical: "https://omdalat.com/en/docs/getting-started"
    }
  },
  {
    path: "/docs/how-it-works",
    vi: {
      title: "Cách hệ vận hành",
      canonical: "https://omdalat.com/vi/docs/how-it-works"
    },
    en: {
      title: "How Om Dalat Works",
      canonical: "https://omdalat.com/en/docs/how-it-works"
    }
  },
  {
    path: "/docs/stay-guide",
    vi: {
      title: "Hướng dẫn ở lại",
      canonical: "https://omdalat.com/vi/docs/stay-guide"
    },
    en: {
      title: "Om Dalat Stay Guide",
      canonical: "https://omdalat.com/en/docs/stay-guide"
    }
  },
  {
    path: "/docs/work-guide",
    vi: {
      title: "Hướng dẫn làm việc",
      canonical: "https://omdalat.com/vi/docs/work-guide"
    },
    en: {
      title: "Om Dalat Work Guide",
      canonical: "https://omdalat.com/en/docs/work-guide"
    }
  },
  {
    path: "/docs/community-rules",
    vi: {
      title: "Quy tắc cộng đồng Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/docs/community-rules"
    },
    en: {
      title: "Om Dalat Community Rules",
      canonical: "https://omdalat.com/en/docs/community-rules"
    }
  },
  {
    path: "/docs/faq",
    vi: {
      title: "Câu hỏi thường gặp của Ôm Đà Lạt",
      canonical: "https://omdalat.com/vi/docs/faq"
    },
    en: {
      title: "FAQ for Om Dalat",
      canonical: "https://omdalat.com/en/docs/faq"
    }
  }
] as const;

const viRouteBlockers = [
  { path: "/vi/work", blocked: ["Remote work", "freelance", "deadline"] },
  { path: "/vi/learning", blocked: ["output"] },
  { path: "/vi/community", blocked: ["toxic", "drama", "review định kỳ"] },
  { path: "/vi/stay", blocked: ["Dorm", "Private"] },
  { path: "/vi/join", blocked: ["Chờ review"] },
  { path: "/vi/docs", blocked: ["Docs"] },
  { path: "/vi/docs/getting-started", blocked: ["Docs", "Public layer"] },
  { path: "/vi/docs/how-it-works", blocked: ["public hiểu đúng", "member hiểu sâu", "có review"] },
  { path: "/vi/docs/work-guide", blocked: ["Remote work", "freelance", "output"] },
  { path: "/vi/docs/community-rules", blocked: ["toxic", "drama"] },
  { path: "/vi/docs/faq", blocked: ["FAQ cho người mới"] },
  { path: "/vi/privacy", blocked: ["moderation", "trust"] },
  { path: "/vi/articles/remote-work-da-lat", blocked: ["Remote work ở Đà Lạt"] }
] as const;

test.describe("Public locale metadata and clean Vietnamese copy", () => {
  for (const route of localeMetadataCases) {
    for (const locale of ["vi", "en"] as const) {
      test(`${locale}${route.path}: localized metadata stays correct`, async ({ page }) => {
        await page.goto(`/${locale}${route.path}`);

        await expect(page).toHaveTitle(route[locale].title);
        await expect(page.locator("head link[rel='canonical']")).toHaveAttribute("href", route[locale].canonical);
        await expect(page.locator("meta[property='og:title']")).toHaveAttribute("content", route[locale].title);
        await expect(page.locator("meta[name='description']")).not.toHaveAttribute("content", "");
      });
    }
  }

  test("Vietnamese public routes avoid blocked English phrases", async ({ page }) => {
    for (const route of viRouteBlockers) {
      await page.goto(route.path);
      const visibleText = await page.locator("body").innerText();

      for (const phrase of route.blocked) {
        expect(visibleText).not.toContain(phrase);
      }
    }

    await page.goto("/vi");
    await expect(page.locator("header .runtime-nav").first()).toHaveAttribute("aria-label", "Điều hướng chính");
  });

  test("articles page copy matches the number of public articles", async ({ page }) => {
    await page.goto("/vi/articles");

    const cards = page.locator(".runtime-card-grid .runtime-link-card");
    const articleCount = await cards.count();

    await expect(page.locator("article.runtime-page > p").nth(1)).toContainText(`${articleCount} bài nền`);

    await page.goto("/en/articles");
    await expect(page.locator("article.runtime-page > p").nth(1)).toContainText(`${articleCount} foundational public articles`);
  });
});
