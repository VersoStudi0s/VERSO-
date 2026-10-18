import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { writeFile, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";
import assert from "node:assert/strict";

await mkdir("docs/screenshots", { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
const report = {
  breakpoints: [],
  interactions: [],
  accessibility: [],
  errors: [],
  requestsFailed: [],
  motion: {},
};
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
let configuredServer;
const check = (name, value) => {
  assert.ok(value, name);
  report.interactions.push({ name, passed: true });
};
async function open(
  width = 1440,
  height = 1000,
  origin = base,
  reducedMotion = "reduce",
) {
  const context = await browser.newContext({
    viewport: { width, height },
    reducedMotion,
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") report.errors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400 && !response.url().includes("/api/contact"))
      report.requestsFailed.push({
        url: response.url(),
        status: response.status(),
      });
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  return page;
}
async function loadImages(page) {
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 700
  ) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(150);
}
try {
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440, 1920]) {
    const page = await open(width, width < 768 ? 844 : 1000);
    await loadImages(page);
    const bounds = await page.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images]
        .filter((img) => !img.complete || !img.naturalWidth)
        .map((img) => img.src),
      title: (() => {
        const el = document.querySelector(".reality-mask em");
        return {
          width: el.getBoundingClientRect().width,
          scrollWidth: el.scrollWidth,
          right: el.getBoundingClientRect().right,
        };
      })(),
    }));
    assert.ok(bounds.scrollWidth <= width, `Horizontal overflow at ${width}`);
    assert.equal(bounds.brokenImages.length, 0, `Images at ${width}`);
    assert.ok(
      bounds.title.right <= width + 1,
      `Title clipped at ${width}: ${bounds.title.right}`,
    );
    report.breakpoints.push(bounds);
    if ([390, 768, 1440].includes(width)) {
      await page.screenshot({
        path: `docs/screenshots/${width}-full.png`,
        fullPage: true,
      });
      await page.screenshot({ path: `docs/screenshots/${width}-hero.png` });
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();
      report.accessibility.push({
        width,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          description: v.description,
          nodes: v.nodes.map((n) => ({
            target: n.target,
            failureSummary: n.failureSummary,
          })),
        })),
      });
    }
    if (width === 390) {
      await page.getByRole("button", { name: "Abrir menu" }).click();
      check(
        "Mobile menu opens and traps focus",
        (await page.locator("#mobile-menu").isVisible()) &&
          (await page.locator("#main-content").getAttribute("inert")) !== null,
      );
      await page.screenshot({ path: "docs/screenshots/390-menu.png" });
      await page.keyboard.press("Escape");
      check(
        "Escape closes menu and returns focus",
        await page
          .getByRole("button", { name: "Abrir menu" })
          .evaluate((el) => el === document.activeElement),
      );
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page
        .locator("#mobile-menu")
        .getByRole("link", { name: /Projetos/ })
        .click();
      check(
        "Menu navigation closes overlay",
        (await page.locator("#mobile-menu").count()) === 0,
      );
      await page.getByRole("button", { name: "Abrir menu" }).click();
      await page.setViewportSize({ width: 1280, height: 1000 });
      check(
        "Resizing closes mobile menu",
        (await page.locator("#mobile-menu").count()) === 0 &&
          (await page.locator("body").getAttribute("class")) !== "menu-open",
      );
    }
    await page.close();
  }
  const page = await open();
  for (const [name, count] of [
    ["Websites", 2],
    ["UI/UX", 2],
    ["Identidade", 1],
    ["Experimentos", 1],
    ["Todos", 4],
  ]) {
    await page.getByRole("button", { name, exact: true }).click();
    check(
      `Filter ${name}: ${count} cards`,
      (await page.locator(".project-card").count()) === count,
    );
  }
  await page.locator(".project-card").first().click();
  await page.waitForURL("**/projetos/versary");
  await page.getByRole("heading", { name: "VERSARY", exact: true }).waitFor();
  check(
    "VERSARY case route opens",
    /projetos\/versary/.test(page.url()) &&
      (await page
        .getByRole("heading", { name: "VERSARY", exact: true })
        .isVisible()),
  );
  await page.screenshot({
    path: "docs/screenshots/1440-case.png",
    fullPage: true,
  });
  for (let i = 0; i < 4; i++) {
    const current = page.url();
    await page.locator(".next-project").click();
    await page.waitForURL((url) => url.href !== current);
    await page.locator(".next-project").waitFor();
    check(`Next project navigation ${i + 1}`, page.url() !== current);
  }
  const caseAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.accessibility.push({
    route: "/projetos/versary",
    violations: caseAxe.violations,
  });
  await page.getByRole("link", { name: "Voltar aos projetos" }).click();
  check("Case returns to gallery", new URL(page.url()).hash === "#projetos");
  await page.locator(".service-row").first().click();
  check(
    "Service CTA preselects contact type",
    (await page.locator("#contact-type").inputValue()) === "website",
  );
  await page
    .getByRole("button", { name: "Enviar mensagem", exact: true })
    .click();
  check(
    "Required errors are accessible and focus name",
    (await page.locator("[aria-invalid=true]").count()) >= 3 &&
      (await page
        .locator("#contact-name")
        .evaluate((el) => el === document.activeElement)),
  );
  await page.locator("#contact-name").fill("Teste de interface");
  await page.locator("#contact-email").fill("teste@example.com");
  await page
    .locator("#contact-message")
    .fill("Mensagem de teste local, sem envio para terceiros.");
  await page
    .getByRole("button", { name: "Enviar mensagem", exact: true })
    .click();
  check(
    "Unconfigured form reports real unavailability",
    (await page.getByRole("alert").textContent()).includes(
      "Nenhuma mensagem foi enviada",
    ),
  );
  check(
    "Failed form preserves user data",
    (await page.locator("#contact-message").inputValue()).length > 20,
  );
  await page.getByRole("button", { name: "Conhecer minha trajetória" }).click();
  check("Trajectory expands", await page.locator("#trajectory").isVisible());
  await page
    .getByRole("button", { name: "Desenvolvendo", exact: true })
    .click();
  check(
    "Skills groups change",
    await page
      .locator(".skill-list")
      .getByText("TypeScript", { exact: true })
      .isVisible(),
  );
  for (const mode of ["Tipo", "Composição", "Forma"]) {
    await page.getByRole("button", { name: mode, exact: true }).click();
    check(
      `Lab mode ${mode}`,
      (await page
        .getByRole("button", { name: mode, exact: true })
        .getAttribute("aria-pressed")) === "true",
    );
  }
  check(
    "Reduced motion disables animation control",
    await page
      .getByRole("button", { name: "Movimento reduzido pelo sistema" })
      .isDisabled(),
  );
  await page.getByRole("link", { name: "Privacidade & créditos" }).click();
  await page.waitForURL("**/privacidade");
  await page.locator(".privacy-page").waitFor();
  check(
    "Privacy route opens",
    await page
      .getByRole("heading", { name: "Privacidade & créditos." })
      .isVisible(),
  );
  const privacyAxe = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.accessibility.push({
    route: "/privacidade",
    violations: privacyAxe.violations,
  });
  await page.goto(`${base}/pagina-ausente`);
  check(
    "404 route is usable",
    await page.getByRole("link", { name: "Explorar projetos" }).isVisible(),
  );
  await page.goto(base);
  await page.keyboard.press("Tab");
  check(
    "Skip link is first keyboard target",
    await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement),
  );
  check(
    "No cookies or storage created",
    (await page.context().cookies()).length === 0 &&
      (await page.evaluate(
        () => localStorage.length === 0 && sessionStorage.length === 0,
      )),
  );
  await page.close();
  const motionPage = await open(1440, 1000, base, "no-preference");
  await motionPage.waitForTimeout(1700);
  check(
    "Animated hero reveals its CTA",
    await motionPage
      .locator(".hero-description")
      .evaluate((el) => Number(getComputedStyle(el).opacity) > 0.99),
  );
  await motionPage.getByRole("button", { name: "Pausar movimento" }).click();
  check(
    "Lab motion can be paused",
    await motionPage
      .getByRole("button", { name: "Ativar movimento" })
      .isVisible(),
  );
  await motionPage.getByRole("button", { name: "Ativar movimento" }).click();
  check(
    "Lab motion can restart",
    await motionPage
      .getByRole("button", { name: "Pausar movimento" })
      .isVisible(),
  );
  await motionPage.close();
  // Separate local server with an explicit adapter endpoint; all email requests are intercepted.
  configuredServer = spawn(
    "npm",
    ["run", "dev", "--", "--port", "4174", "--strictPort"],
    {
      env: { ...process.env, VITE_CONTACT_ENDPOINT: "/api/contact" },
      stdio: "ignore",
      detached: true,
    },
  );
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch("http://127.0.0.1:4174")).ok) break;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  const formPage = await open(390, 844, "http://127.0.0.1:4174");
  await formPage.locator("#contact-name").fill("Teste local");
  await formPage.locator("#contact-email").fill("local@example.com");
  await formPage.locator("#contact-type").selectOption("website");
  await formPage
    .locator("#contact-message")
    .fill("Conteúdo de teste interceptado, sem envio real.");
  let respond;
  await formPage.route("**/api/contact", async (route) => {
    await new Promise((resolve) => {
      respond = resolve;
    });
    await route.fulfill({ json: { sent: true } });
  });
  await formPage
    .getByRole("button", { name: "Enviar mensagem", exact: true })
    .click();
  check(
    "Real request loading disables submit",
    await formPage.getByRole("button", { name: "Enviando" }).isDisabled(),
  );
  respond();
  await formPage
    .getByRole("status")
    .filter({ hasText: "Mensagem enviada" })
    .waitFor();
  check(
    "Success requires explicit adapter confirmation (intercepted test)",
    (await formPage.locator("#contact-name").inputValue()) === "",
  );
  await formPage.unroute("**/api/contact");
  await formPage.route("**/api/contact", (route) =>
    route.fulfill({ json: { success: true } }),
  );
  await formPage.locator("#contact-name").fill("Teste local");
  await formPage.locator("#contact-email").fill("local@example.com");
  await formPage.locator("#contact-type").selectOption("uiux");
  await formPage
    .locator("#contact-message")
    .fill("Outro teste local, sem mensagem para destinatários.");
  await formPage.getByRole("button", { name: "Enviar outra mensagem" }).click();
  await formPage.getByRole("alert").waitFor();
  check(
    "Unconfirmed response never shows success",
    (await formPage.getByRole("alert").textContent()).includes("não confirmou"),
  );
  await formPage.close();
  assert.equal(report.errors.length, 0, "No browser errors");
  assert.equal(report.requestsFailed.length, 0, "No asset loading errors");
  await writeFile("docs/browser-results.json", JSON.stringify(report, null, 2));
  const violations = report.accessibility.flatMap((audit) => audit.violations);
  assert.equal(
    violations.length,
    0,
    `Axe violations found; see docs/browser-results.json: ${violations.map((v) => v.id).join(", ")}`,
  );
  console.log(
    `Passed ${report.interactions.length} interaction checks, ${report.breakpoints.length} widths, ${report.accessibility.length} axe audits. No browser errors.`,
  );
} finally {
  await writeFile("docs/browser-results.json", JSON.stringify(report, null, 2));
  if (configuredServer?.pid) {
    try {
      process.kill(-configuredServer.pid, "SIGTERM");
    } catch {}
  }
  await browser.close();
}
