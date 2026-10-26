import { chromium, expect } from "@playwright/test";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const checks = [];
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "no-preference",
  });
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:4180", {
    waitUntil: "networkidle",
  });
  await page.locator("#lab").scrollIntoViewIfNeeded();
  for (const mode of ["Forma", "Tipo", "Composição"]) {
    await page.getByRole("button", { name: mode, exact: true }).click();
    if (
      await page
        .getByRole("button", { name: "Ativar movimento", exact: true })
        .isVisible()
    )
      await page
        .getByRole("button", { name: "Ativar movimento", exact: true })
        .click();
    await page.locator(".lab-stage").evaluate((el) => {
      const animation = el
        .getAnimations({ subtree: true })
        .find((animation) => animation instanceof CSSAnimation);
      if (!animation) throw new Error("Visual animation missing");
      animation.finish();
    });
    for (let repetition = 1; repetition <= 2; repetition++) {
      await expect(
        page.getByRole("button", { name: "Ativar movimento", exact: true }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Ativar movimento", exact: true })
        .click();
      const restarted = await page.locator(".lab-stage").evaluate((el) => {
        const animation = el
          .getAnimations({ subtree: true })
          .find((animation) => animation instanceof CSSAnimation);
        return {
          playState: animation.playState,
          currentTime: Number(animation.currentTime),
        };
      });
      assert.equal(restarted.playState, "running");
      assert.ok(
        restarted.currentTime < 1000,
        `Animation restarted at the beginning: ${mode}`,
      );
      checks.push({ mode, repetition, animationRestarted: true });
      await page
        .getByRole("button", { name: "Pausar movimento", exact: true })
        .click();
      assert.equal(
        await page
          .locator(".lab-stage")
          .evaluate(
            (el) =>
              el
                .getAnimations({ subtree: true })
                .find((animation) => animation instanceof CSSAnimation)
                .playState,
          ),
        "paused",
      );
      await page
        .getByRole("button", { name: "Ativar movimento", exact: true })
        .click();
      await page.locator(".lab-stage").evaluate((el) =>
        el
          .getAnimations({ subtree: true })
          .find((animation) => animation instanceof CSSAnimation)
          .finish(),
      );
    }
  }
  await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:4180", {
    waitUntil: "networkidle",
  });
  await page.locator("#lab").scrollIntoViewIfNeeded();
  await expect(
    page.getByRole("button", { name: "Pausar movimento", exact: true }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(
    page.getByRole("button", { name: "Movimento reduzido pelo sistema" }),
  ).toBeDisabled();
  assert.ok(
    await page
      .locator(".lab-stage")
      .evaluate((el) => el.getAnimations({ subtree: true }).length === 0),
  );
  checks.push({ systemReducedMotionStopsAnimation: true });
  console.log(
    "Three LAB modes: two real animation restarts each, pause/resume, route re-entry and system reduced motion passed.",
  );
} finally {
  await writeFile(
    "docs/curation-motion-results.json",
    JSON.stringify({ checks }, null, 2),
  );
  await browser.close();
}
