import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4180";
const directory = "docs/screenshots/curation";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const report = {
  geometry: [],
  cases: [],
  accessibility: [],
  errors: [],
  legacyRequests: [],
};
const slugs = [
  "versary",
  "cafe-aurora",
  "syntax-studio",
  "gymflow",
  "ritmo-fitness",
];
try {
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.route("https://api.github.com/**", async (route) =>
      route.fulfill({
        json: JSON.parse(
          await readFile("scripts/fixtures/github-public.json", "utf8"),
        ),
      }),
    );
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("request", (r) => {
      if (
        /\/images\/(hero-editorial|retrato-editorial|escultura-cromada|textura-editorial|projeto-|olho-editorial)/.test(
          r.url(),
        )
      )
        report.legacyRequests.push(r.url());
    });
    await page.goto(base, { waitUntil: "networkidle" });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 650
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(35);
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.mouse.move(0, 0);
    await page.waitForTimeout(100);
    await expect(page.locator(".project-card")).toHaveCount(5);
    const geometry = await page.evaluate(() => ({
      width: innerWidth,
      overflow: document.documentElement.scrollWidth > innerWidth,
      images: [...document.querySelectorAll(".project-visual")].map((el) => ({
        box: el.getBoundingClientRect().width,
        image: el.querySelector("img").getBoundingClientRect().width,
        loaded: el.querySelector("img").naturalWidth > 0,
      })),
      broken: [...document.images]
        .filter((i) => !i.complete || !i.naturalWidth)
        .map((i) => i.src),
    }));
    assert.equal(geometry.overflow, false);
    assert.equal(geometry.broken.length, 0);
    for (const a of geometry.images)
      assert.ok(a.loaded && a.image <= a.box + 1, `Clipped study at ${width}`);
    report.geometry.push(geometry);
    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({ path: `${directory}/${width}-after-hero.png` });
      await page.screenshot({
        path: `${directory}/${width}-after-full.png`,
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
        const box = await page.locator("#" + id).boundingBox();
        await page.screenshot({
          path: `${directory}/${width}-after-${id}.png`,
          fullPage: true,
          clip: box,
        });
      }
    }
    if (width === 1440 && process.env.UPDATE_SOCIAL === "1")
      await page.screenshot({
        path: "public/images/verso-social.jpg",
        type: "jpeg",
        quality: 90,
        clip: { x: 0, y: 0, width: 1440, height: 756 },
      });
    await context.close();
  }
  for (const slug of slugs) {
    for (const width of [390, 1440]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 390 ? 844 : 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      await page.route("https://api.github.com/**", async (route) =>
        route.fulfill({
          json: JSON.parse(
            await readFile("scripts/fixtures/github-public.json", "utf8"),
          ),
        }),
      );
      await page.goto(`${base}/projetos/${slug}`, { waitUntil: "networkidle" });
      await expect(page.locator(".case-cover img")).toBeVisible();
      await page.locator(".case-gallery").scrollIntoViewIfNeeded();
      await page.locator(".case-gallery img").evaluate((i) => i.decode());
      await expect(page.locator(".visual-source")).toHaveAttribute(
        "href",
        ["versary", "gymflow", "ritmo-fitness"].includes(slug)
          ? `/images/github-${slug}-detail.webp`
          : `/images/studies/${slug}-detail.svg`,
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({
        path: `${directory}/${width}-case-${slug}.png`,
        fullPage: true,
      });
      if (width === 390) {
        const audit = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        report.accessibility.push({
          slug,
          violations: audit.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
        assert.equal(audit.violations.length, 0);
      }
      report.cases.push({ slug, width, coverAndDetailLoaded: true });
      await context.close();
    }
  }
  assert.equal(report.legacyRequests.length, 0);
  assert.equal(report.errors.length, 0);
  console.log(
    "8 widths: unclipped project art; 10 case layouts; 5 additional axe audits; no legacy art requests or page errors.",
  );
} finally {
  await writeFile(
    "docs/curation-visual-results.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
