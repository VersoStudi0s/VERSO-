import { chromium, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4180";
const checks = [],
  accessibility = [],
  errors = [];
try {
  for (const width of [320, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 844 },
      isMobile: true,
      hasTouch: true,
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page
      .getByRole("link", {
        name: "Pedir orçamento de Design para Redes Sociais",
        exact: true,
      })
      .tap();
    await expect(page.locator("#contact-type")).toHaveValue("social");
    await page
      .getByRole("button", { name: "Gerar mensagem de orçamento", exact: true })
      .tap();
    await expect(page.locator("#contact-name")).toBeFocused();
    await page.locator("#contact-name").fill("Teste mobile");
    await page.locator("#contact-email").fill("mobile@example.com");
    await page
      .locator("#contact-message")
      .fill("Gostaria de organizar os materiais visuais da minha marca.");
    await page
      .getByRole("button", { name: "Gerar mensagem de orçamento", exact: true })
      .tap();
    await expect(page.locator("#budget-message")).toHaveValue(
      /Design para Redes Sociais/,
    );
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    checks.push({ width, flow: "service-to-local-budget", passed: true });
    await page.locator("#lab").scrollIntoViewIfNeeded();
    for (const mode of ["Tipo", "Composição", "Forma"]) {
      await page.getByRole("button", { name: mode, exact: true }).tap();
      await expect(
        page.getByRole("button", { name: mode, exact: true }),
      ).toHaveAttribute("aria-pressed", "true");
    }
    await page.locator(".lab-stage").scrollIntoViewIfNeeded();
    await page.locator(".lab-object img").evaluate((img) => img.decode());
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    const controlBounds = await page
      .locator(".lab-controls")
      .evaluate((el) =>
        [...el.querySelectorAll("button")].map((button) =>
          button.getBoundingClientRect().toJSON(),
        ),
      );
    assert.ok(
      controlBounds.every(
        (box) => box.height >= 44 && box.left >= 0 && box.right <= width,
      ),
    );
    checks.push({
      width,
      flow: "all-lab-modes-by-touch",
      touchTargetsAtLeast44: true,
      passed: true,
    });
    const axe = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    accessibility.push({
      width,
      state: "lab-open-and-budget-generated",
      violations: axe.violations,
    });
    assert.equal(axe.violations.length, 0);
    if (width === 390)
      await page.screenshot({
        path: "docs/screenshots/editorial/390-lab-controls.png",
      });
    await page.locator("#lab").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: "Abrir menu" }).tap();
    await page
      .locator("#mobile-menu")
      .getByRole("link", { name: /Projetos/ })
      .tap();
    await page.locator(".project-card").first().tap();
    await page.waitForURL("**/projetos/versary");
    await page
      .getByRole("link", { name: "Voltar aos projetos", exact: true })
      .tap();
    await expect(page.locator(".project-card")).toHaveCount(4);
    await page.setViewportSize({ width: 1280, height: 1000 });
    await expect(page.locator(".desktop-nav")).toBeVisible();
    checks.push({ width, flow: "case-return-and-resize", passed: true });
    await context.close();
  }
  assert.equal(errors.length, 0);
  console.log(
    "Six touch flows passed at 320/390px; two additional axe audits, no overflow or browser exceptions.",
  );
} finally {
  await writeFile(
    "docs/editorial-mobile-results.json",
    JSON.stringify({ checks, accessibility, errors }, null, 2),
  );
  await browser.close();
}
