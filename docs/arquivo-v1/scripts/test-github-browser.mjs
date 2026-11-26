import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4190";
const api =
  "https://api.github.com/users/renataaap/repos?sort=updated&per_page=100";
const fixture = JSON.parse(
  await readFile("scripts/fixtures/github-public.json", "utf8"),
);
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const report = { widths: [], cases: [], checks: [], axe: [], errors: [] };
await mkdir("docs/screenshots/github", { recursive: true });
try {
  const live = await browser.newPage();
  let liveResponse;
  live.on("response", (r) => {
    if (r.url() === api) liveResponse = r.status();
  });
  await live.goto(base, { waitUntil: "networkidle" });
  await live.locator("#github .repository-row").first().waitFor();
  assert.equal(liveResponse, 200);
  assert.equal(await live.locator("#github .repository-row").count(), 3);
  report.checks.push(
    "Real unauthenticated GitHub API returned 200 and three eligible repositories",
  );
  await live.close();
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
    const context = await browser.newContext({
      viewport: { width, height: width < 768 ? 844 : 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    await page.route("https://api.github.com/**", (r) =>
      r.fulfill({ json: fixture }),
    );
    page.on("pageerror", (e) => report.errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") report.errors.push(m.text());
    });
    await page.goto(base, { waitUntil: "networkidle" });
    for (
      let y = 0;
      y < (await page.evaluate(() => document.body.scrollHeight));
      y += 800
    ) {
      await page.evaluate((y) => scrollTo(0, y), y);
      await page.waitForTimeout(35);
    }
    await page.evaluate(() => scrollTo(0, 0));
    assert.equal(await page.locator(".project-card").count(), 5);
    assert.deepEqual(
      await page
        .locator(".project-card")
        .evaluateAll((els) => els.map((e) => e.dataset.project)),
      ["versary", "gymflow", "ritmo-fitness", "syntax-studio", "cafe-aurora"],
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    assert.deepEqual(
      await page.evaluate(() =>
        [...document.images]
          .filter((i) => !i.complete || !i.naturalWidth)
          .map((i) => i.src),
      ),
      [],
    );
    assert.equal(await page.locator('a[href*="saep"]').count(), 0);
    report.widths.push(width);
    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({
        path: `docs/screenshots/github/${width}-home.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `docs/screenshots/github/${width}-hero.png`,
      });
      for (const section of ["projetos", "github"]) {
        const box = await page.locator("#" + section).boundingBox();
        await page.screenshot({
          path: `docs/screenshots/github/${width}-${section}.png`,
          fullPage: true,
          clip: box,
        });
      }
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      report.axe.push({ width, violations: axe.violations });
      assert.equal(axe.violations.length, 0);
    }
    if (width === 390 || width === 1440) {
      await page.locator(".technology-filter select").selectOption("Expo");
      assert.equal(await page.locator(".project-card").count(), 1);
      await page.locator(".technology-filter select").selectOption("Todas");
      await page.locator("#github input").fill("doesnotexist");
      assert.equal(await page.locator(".repository-row").count(), 0);
      assert.ok(await page.locator("#github .empty").isVisible());
      await page.locator("#github input").fill("gymflow");
      assert.equal(await page.locator(".repository-row").count(), 1);
      for (const slug of [
        "versary",
        "gymflow",
        "ritmo-fitness",
        "syntax-studio",
        "cafe-aurora",
      ]) {
        await page.goto(`${base}/projetos/${slug}`, {
          waitUntil: "networkidle",
        });
        await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(150);
        await page.evaluate(() => scrollTo(0, 0));
        assert.ok(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        );
        const code = page.getByRole("link", { name: /Ver código/ });
        assert.equal(
          await code.count(),
          ["versary", "gymflow", "ritmo-fitness"].includes(slug) ? 1 : 0,
        );
        if (await code.count())
          assert.equal(
            await code.getAttribute("href"),
            `https://github.com/renataaap/${slug === "ritmo-fitness" ? "app_fitness" : slug}`,
          );
        assert.equal(
          await page
            .getByRole("link", { name: "Ver projeto", exact: true })
            .count(),
          0,
        );
        await page.screenshot({
          path: `docs/screenshots/github/${width}-case-${slug}.png`,
          fullPage: true,
        });
        report.cases.push({ width, slug });
      }
    }
    await context.close();
  }
  const emptyContext = await browser.newContext();
  const emptyPage = await emptyContext.newPage();
  let release;
  const gate = new Promise((r) => (release = r));
  await emptyPage.route("https://api.github.com/**", async (r) => {
    await gate;
    await r.fulfill({ json: [] });
  });
  await emptyPage.goto(base, { waitUntil: "domcontentloaded" });
  await emptyPage.getByRole("button", { name: "Consultando…" }).waitFor();
  release();
  await emptyPage.locator("#github .empty").waitFor();
  report.checks.push("Loading and empty API states");
  await emptyContext.close();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  let records = fixture;
  let fail = false;
  let requests = 0;
  await page.route("https://api.github.com/**", async (r) => {
    requests++;
    if (fail) await r.abort();
    else await r.fulfill({ json: records });
  });
  await page.goto(base, { waitUntil: "networkidle" });
  const before = requests;
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(requests, before);
  report.checks.push("Browser reload uses valid cache");
  records = fixture.map((r) =>
    r.name === "versary"
      ? { ...r, description: "Metadata refreshed after expiration" }
      : r,
  );
  await page.evaluate(() => {
    const key = "verso:github:public:v1",
      cache = JSON.parse(localStorage.getItem(key));
    cache.fetchedAt -= 10800001;
    localStorage.setItem(key, JSON.stringify(cache));
  });
  await page.reload({ waitUntil: "networkidle" });
  assert.ok(
    await page
      .getByText("Metadata refreshed after expiration", { exact: true })
      .isVisible(),
  );
  report.checks.push("Expired browser cache loads changed metadata");
  fail = true;
  await page.getByRole("button", { name: "Atualizar GitHub" }).click();
  await page.locator("#github [role=alert]").waitFor();
  assert.equal(await page.locator(".repository-row").count(), 3);
  assert.equal(await page.locator(".project-card").count(), 5);
  report.checks.push(
    "API offline retains cached repositories and five editorial cases",
  );
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#github [role=alert]").waitFor();
  assert.equal(await page.locator(".project-card").count(), 5);
  assert.equal(await page.locator(".repository-row").count(), 0);
  await page.screenshot({
    path: "docs/screenshots/github/390-offline.png",
    fullPage: true,
  });
  report.checks.push(
    "Cold offline state retains editorial layout and recovery action",
  );
  await page.goto(base + "/projetos/estoque-saep", {
    waitUntil: "networkidle",
  });
  assert.equal(await page.locator(".case-heading").count(), 0);
  report.checks.push("Removed case unavailable");
  await context.close();
  assert.equal(report.errors.length, 0);
  console.log(
    JSON.stringify({
      widths: report.widths.length,
      cases: report.cases.length,
      checks: report.checks,
      axe: report.axe.length,
      errors: report.errors,
    }),
  );
} finally {
  await writeFile(
    "docs/github-browser-results.json",
    JSON.stringify(report, null, 2),
  );
  await browser.close();
}
