import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const phase = process.env.CAPTURE_PHASE || "after";
const directory = "docs/screenshots/editorial";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const dimensions = [];
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    await page.goto("http://127.0.0.1:4180", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 650
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(70);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(150);
    await page.screenshot({ path: `${directory}/${width}-${phase}-hero.png` });
    await page.screenshot({
      path: `${directory}/${width}-${phase}-full.png`,
      fullPage: true,
    });
    for (const id of [
      "inicio",
      "projetos",
      "servicos",
      "sobre",
      "lab",
      "contato",
    ]) {
      const box = await page.locator(`#${id}`).boundingBox();
      if (box)
        await page.screenshot({
          path: `${directory}/${width}-${phase}-${id}.png`,
          fullPage: true,
          clip: box,
        });
    }
    dimensions.push({
      width,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
    await page.close();
  }
  console.log(phase, dimensions);
} finally {
  await writeFile(
    `docs/editorial-${phase}-capture.json`,
    JSON.stringify(dimensions, null, 2),
  );
  await browser.close();
}
