import { chromium } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4180";
const routes = [
  "/",
  "/projetos/versary",
  "/projetos/cafe-aurora",
  "/projetos/syntax-studio",
  "/projetos/lab-movimento",
  "/privacidade",
];
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const results = [],
  errors = [];
try {
  for (const path of routes) {
    const plain = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
    });
    const staticPage = await plain.newPage();
    await staticPage.goto(base + path);
    assert.equal(await staticPage.locator("h1").count(), 1);
    assert.equal(
      await staticPage.locator("html").getAttribute("data-route"),
      path,
    );
    assert.ok((await staticPage.locator("h1").textContent()).trim().length > 0);
    await plain.close();
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("console", (message) => {
      if (["error", "warning"].includes(message.type()))
        errors.push({ path, message: message.text() });
    });
    page.on("pageerror", (error) =>
      errors.push({ path, message: error.message }),
    );
    await page.goto(base + path, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").count(), 1);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    if (path === "/projetos/versary")
      await page.screenshot({
        path: "docs/screenshots/390-case.png",
        fullPage: true,
      });
    results.push({
      path,
      staticContentWithoutJavaScript: true,
      hydrated: true,
    });
    await context.close();
  }
  assert.equal(errors.length, 0, "Hydration/console errors");
  console.log(
    "Six production routes: content available without JavaScript, hydrated without warnings, no mobile overflow.",
  );
} finally {
  await writeFile(
    "docs/production-results.json",
    JSON.stringify({ base, routes: results, errors }, null, 2),
  );
  await browser.close();
}
