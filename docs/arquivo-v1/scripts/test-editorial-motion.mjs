import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const checks = [];
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4180";
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  await page.goto(base, { waitUntil: "networkidle" });
  for (const id of ["inicio", "lab"]) {
    const surface = page.locator(`#${id}`);
    await surface.scrollIntoViewIfNeeded();
    if (id === "lab") await expect(surface).toHaveAttribute("data-visible", "");
    const box = await surface.boundingBox();
    await page.mouse.move(box.x + box.width * 0.75, box.y + box.height * 0.4);
    await expect
      .poll(() =>
        surface.evaluate((el) => el.style.getPropertyValue("--depth-x")),
      )
      .not.toBe("");
    const depth = await surface.evaluate((el) =>
      parseFloat(el.style.getPropertyValue("--depth-x")),
    );
    assert.ok(Math.abs(depth) <= 10);
    await page.mouse.move(0, 0);
    await expect
      .poll(() =>
        surface.evaluate((el) => el.style.getPropertyValue("--depth-x")),
      )
      .toBe("");
    checks.push({ surface: id, boundedPointerDepthAndReset: true });
  }

  for (const row of await page.locator(".service-row").all()) {
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    await expect(row).toHaveClass(/service-active/);
    await expect(row).toHaveAttribute("data-visible", "");
    await expect(row).toHaveCSS("opacity", "1");
  }
  await page.locator(".service-row").first().locator("a").first().focus();
  await expect(page.locator(".service-row").first()).toHaveClass(
    /service-active/,
  );
  checks.push({ servicesRemainVisibleAfterHoverAndKeyboardFocus: true });

  for (const category of ["Experimentos", "Todos", "Identidade", "Todos"]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    for (const card of await page.locator(".project-card").all()) {
      await card.scrollIntoViewIfNeeded();
      await expect(card).toHaveAttribute("data-visible", "");
      await expect(card).toHaveCSS("opacity", "1");
      await expect(card.locator(".media-reveal")).toHaveCSS(
        "clip-path",
        /^(none|polygon\()/,
      );
    }
  }
  checks.push({ filteredAndReinsertedCardsRevealWithMotionEnabled: true });

  await page.locator('.project-card[href="/projetos/versary"]').click();
  await expect(page.locator(".project-page")).toBeVisible();
  assert.ok(
    await page
      .locator(".case-cover")
      .evaluate((el) =>
        el.getAnimations().some((a) => a instanceof CSSAnimation),
      ),
  );
  await page.goBack();
  await page.locator("#lab").scrollIntoViewIfNeeded();
  await expect(page.locator("#lab")).toHaveAttribute("data-visible", "");
  checks.push({ caseEntranceAndHomeRevealAfterRouteReturn: true });

  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const id of ["inicio", "lab"]) {
    const surface = page.locator(`#${id}`);
    await surface.scrollIntoViewIfNeeded();
    await surface.dispatchEvent("pointermove", {
      pointerType: "mouse",
      clientX: 300,
      clientY: 300,
    });
    await expect
      .poll(() =>
        surface.evaluate((el) => el.style.getPropertyValue("--depth-x")),
      )
      .toBe("");
  }
  checks.push({ reducedMotionDisablesPointerDepth: true });

  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.locator("#inicio").scrollIntoViewIfNeeded();
  await page.locator("#inicio").dispatchEvent("pointermove", {
    pointerType: "touch",
    clientX: 300,
    clientY: 300,
  });
  assert.equal(
    await page
      .locator("#inicio")
      .evaluate((el) => el.style.getPropertyValue("--depth-x")),
    "",
  );
  checks.push({ touchDoesNotActivatePointerDepth: true });
  console.log(
    "Seven editorial motion checks passed: pointer depth, services, filtered reveals, route return, reduced motion and touch.",
  );
} finally {
  await writeFile(
    "docs/curation-interaction-results.json",
    JSON.stringify({ checks }, null, 2),
  );
  await browser.close();
}
