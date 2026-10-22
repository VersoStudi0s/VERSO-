import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4180";
const directory = "docs/screenshots/commercial";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const results = [];
try {
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
    const page = await browser.newPage({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const bounds = await page.evaluate(() => {
      const hero = document.querySelector(".hero").getBoundingClientRect();
      const actions = document
        .querySelector(".hero-actions")
        .getBoundingClientRect();
      const lines = [
        ...document.querySelectorAll(
          ".hero-lead, .hero-bridge, .reality-mask em",
        ),
      ].map((el) => ({
        right: el.getBoundingClientRect().right,
        scrollWidth: el.scrollWidth,
        width: el.clientWidth,
      }));
      return {
        width: innerWidth,
        heroBottom: hero.bottom,
        ctaBottom: actions.bottom,
        lines,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    assert.ok(
      !bounds.overflow &&
        bounds.lines.every(
          (line) => line.right < width && line.scrollWidth <= line.width + 1,
        ),
      `Unclipped hero at ${width}`,
    );
    assert.ok(
      bounds.ctaBottom < bounds.heroBottom - 60,
      `CTA inside hero at ${width}`,
    );
    if (width < 768)
      assert.ok(
        bounds.ctaBottom < 844,
        `Mobile CTA visible before artwork at ${width}`,
      );
    results.push(bounds);
    if ([390, 768, 1440].includes(width)) {
      for (
        let y = 0;
        y < (await page.evaluate(() => document.body.scrollHeight));
        y += 650
      ) {
        await page.evaluate((y) => scrollTo(0, y), y);
        await page.waitForTimeout(80);
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(180);
      await page.screenshot({ path: `${directory}/${width}-after-hero.png` });
      await page.screenshot({
        path: `${directory}/${width}-after-full.png`,
        fullPage: true,
      });
      for (const [id, label] of [
        ["servicos", "services"],
        ["contato", "contact"],
      ]) {
        const clip = await page.locator(`#${id}`).boundingBox();
        // Crop from the document at scroll zero; fixed navigation stays at the page top.
        await page.screenshot({
          path: `${directory}/${width}-after-${label}.png`,
          fullPage: true,
          clip,
        });
      }
    }
    await page.close();
  }
  console.log(
    "Commercial hero passed all eight widths; mobile CTAs in first viewport. Desktop/tablet/mobile captures saved.",
  );
} finally {
  await writeFile(
    "docs/commercial-visual-results.json",
    JSON.stringify({ base, results }, null, 2),
  );
  await browser.close();
}
