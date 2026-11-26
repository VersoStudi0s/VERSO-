import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";

const base = process.env.TEST_BASE_URL || "http://localhost:4190";
await mkdir("docs/screenshots/team", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const errors = [];
const members = ["Renata", "João Gustavo", "David", "Isaque"];
try {
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.route("https://api.github.com/**", async (route) =>
      route.fulfill({
        json: JSON.parse(
          await readFile("scripts/fixtures/github-public.json", "utf8"),
        ),
      }),
    );
    await page.goto(base, { waitUntil: "networkidle" });
    const about = page.locator("#sobre");
    await about.scrollIntoViewIfNeeded();
    const text = await about.innerText();
    for (const name of members) assert.ok(text.includes(name), name);
    assert.equal(await about.locator(".team-card").count(), 4);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const axe = await new AxeBuilder({ page })
      .include("#sobre")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
    await about.screenshot({ path: `docs/screenshots/team/${width}-sobre.png` });
    await context.close();
  }
  assert.equal(errors.length, 0, errors.join("\n"));
  console.log("4 widths: team of 4 listed, no overflow, no axe violations.");
} finally {
  await browser.close();
}
