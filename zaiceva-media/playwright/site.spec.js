import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];

for (const viewport of viewports) {
  test(`${viewport.name}: layout, assets and console`, async ({ page }) => {
    const consoleErrors = [];
    const pageErrors = [];
    const failedLocalRequests = [];

    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("requestfailed", (request) => {
      if (request.url().startsWith("http://127.0.0.1:4178")) failedLocalRequests.push(request.url());
    });

    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveTitle(/Zaiceva Media/);
    await expect(page.locator("h1")).toContainText("Zaiceva");
    await expect(page.locator(".hero-image-frame img")).toHaveJSProperty("complete", true);
    await expect(page.locator(".project-card")).toHaveCount(5);

    const overflow = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));
    expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);

    for (const sectionId of ["services", "formats", "projects", "process", "about"]) {
      const section = page.locator(`#${sectionId}`);
      await section.scrollIntoViewIfNeeded();
      await expect(section).toBeVisible();
    }

    expect(consoleErrors).toEqual([]);
    expect(pageErrors).toEqual([]);
    expect(failedLocalRequests).toEqual([]);
  });
}

test("accessibility: no serious or critical violations", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact));
  expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
});

test("mobile menu opens, navigates and closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const toggle = page.locator(".menu-toggle");
  const nav = page.locator("#site-nav");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await expect(nav).toHaveClass(/is-open/);
  await nav.getByRole("link", { name: "Услуги", exact: true }).click();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page).toHaveURL(/#services$/);

  await toggle.click();
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
});

test("project carousel works with controls and keyboard", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  const viewport = page.locator(".project-viewport");
  const counter = page.locator(".carousel-counter");
  await viewport.scrollIntoViewIfNeeded();
  await expect(counter).toHaveText("01 / 05");
  await page.locator(".carousel-next").click();
  await expect(counter).toHaveText("02 / 05");
  await viewport.focus();
  await page.keyboard.press("ArrowRight");
  await expect(counter).toHaveText("03 / 05");
});
