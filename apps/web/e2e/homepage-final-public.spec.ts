import { expect, test } from "@playwright/test";

test.describe("Homepage final public version", () => {
  test("Vietnamese homepage follows the locked public copy", async ({ page }) => {
    await page.goto("/vi");

    await expect(page).toHaveTitle("Ôm Đà Lạt | Sống, làm và ở lại tại Đà Lạt");
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt, nơi bạn có thể ở lại, làm việc, học từ trải nghiệm và xây một nhịp sống có thể đi đường dài."
    );

    await expect(page.getByRole("heading", { level: 1, name: "Ôm Đà Lạt" })).toBeVisible();
    await expect(page.getByText("Một nơi để sống, làm, học và xây dựng cuộc đời theo cách thật.")).toBeVisible();
    await expect(page.getByText("Đây không phải là nơi để ghé qua.")).toBeVisible();
    await expect(page.getByText("Mà để sống đủ lâu để thấy điều gì thật sự phù hợp.")).toBeVisible();

    for (const heading of [
      "Ôm Đà Lạt là gì",
      "Bốn phần chính của hệ",
      "Ai phù hợp với Ôm Đà Lạt",
      "Không gian sống và làm",
      "Bắt đầu như thế nào",
      "Ấp Đà Lạt",
      "Câu hỏi thường gặp"
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(page.getByRole("link", { name: "Bắt đầu từ đây" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Xem cách tham gia" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Gửi hồ sơ" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Đọc hướng dẫn" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Mở Ấp Đà Lạt" })).toBeVisible();

    await expect(page.getByText("Ở lại hoặc rời đi. Nhưng hiểu rõ trước.")).toBeVisible();
    await expect(page.locator("footer")).toContainText(
      "Ôm Đà Lạt là một hệ sống thực địa tại Đà Lạt. Nơi con người có thể ở lại, làm việc và xây một nhịp sống có thể đi đường dài."
    );

    for (const removed of ["Bài viết mới", "Dành cho thành viên đã đăng ký", "Vào Ấp Đà Lạt"]) {
      await expect(page.getByText(removed)).toHaveCount(0);
    }
  });

  test("English homepage follows the locked public copy", async ({ page }) => {
    await page.goto("/en");

    await expect(page).toHaveTitle("Om Dalat | Live and work in Dalat");
    await expect(page.locator("meta[name='description']")).toHaveAttribute(
      "content",
      "Om Dalat is a real-life living system in Dalat where people can stay, work, learn from experience, and build a life that lasts."
    );

    await expect(page.getByRole("heading", { level: 1, name: "Om Dalat" })).toBeVisible();
    await expect(page.getByText("A place to live, work, learn, and build a real life in Dalat.")).toBeVisible();
    await expect(page.getByText("This is not a place to pass through.")).toBeVisible();
    await expect(page.getByText("But to stay long enough to see what truly fits.")).toBeVisible();

    for (const heading of [
      "What is Om Dalat",
      "Four core parts of the system",
      "Who is this for",
      "Living and working spaces",
      "How to begin",
      "Ap Dalat",
      "FAQ"
    ]) {
      await expect(page.getByRole("heading", { name: heading })).toBeVisible();
    }

    await expect(page.getByRole("link", { name: "Start here" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "See how to join" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Send application" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Read the guide" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Explore Ap Dalat" })).toBeVisible();

    await expect(page.getByText("Stay or leave. But understand clearly first.")).toBeVisible();
    await expect(page.locator("footer")).toContainText(
      "Om Dalat is a real-life living system in Dalat. A place where people can stay, work, and build a life that lasts."
    );

    for (const removed of ["Latest articles", "For registered members", "Enter Ap Dalat"]) {
      await expect(page.getByText(removed)).toHaveCount(0);
    }
  });
});
