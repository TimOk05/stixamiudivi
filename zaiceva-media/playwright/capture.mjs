import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const outputDir = resolve("../outputs/zaiceva-playwright");
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
for (const viewport of [
  { name: "390", width: 390, height: 844 },
  { name: "768", width: 768, height: 1024 },
  { name: "1440", width: 1440, height: 1000 },
]) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: "reduce" });
  await page.goto("http://127.0.0.1:4177/", { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: resolve(outputDir, `zaiceva-${viewport.name}.png`), fullPage: true });
  await page.close();
}
await browser.close();
console.log(outputDir);
