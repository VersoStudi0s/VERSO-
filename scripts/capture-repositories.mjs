import { chromium } from "playwright";
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});
for (const [name, url, width, height] of [
  ["versary", "http://localhost:4201/dashboard", 1440, 1000],
  ["gymflow", "http://127.0.0.1:4203", 1440, 1000],
  ["ritmo-fitness", "http://127.0.0.1:4202/login", 390, 844],
]) {
  const page = await browser.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  if (name === "gymflow")
    await page.route("**/api/state", (r) =>
      r.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ error: "Entre na sua conta para continuar." }),
      }),
    );
  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(1500);
  if (name === "versary") {
    await page.addStyleTag({
      content: "nextjs-portal{display:none !important}",
    });
    const skip = page.getByRole("button", { name: "Pular", exact: true });
    if (await skip.isVisible()) await skip.click();
    await page.waitForTimeout(2500);
  }
  if (name === "versary")
    await page
      .getByText("Carregando a operação", { exact: true })
      .waitFor({ state: "hidden" });
  console.log(name, await page.locator("body").innerText());
  await page.screenshot({ path: `docs/screenshots/github/source-${name}.png` });
  if (name === "versary") {
    await page.setViewportSize({ width: 1920, height: 1200 });
    await page.goto("http://localhost:4201/pareto", {
      waitUntil: "networkidle",
    });
    await page.addStyleTag({
      content: "nextjs-portal{display:none !important}",
    });
  }
  if (name === "gymflow")
    await page.setViewportSize({ width: 390, height: 844 });
  if (name === "ritmo-fitness")
    await page.goto("http://127.0.0.1:4202/cadastro", {
      waitUntil: "networkidle",
    });
  await page.waitForTimeout(1800);
  await page.screenshot({
    path: `docs/screenshots/github/source-${name}-detail.png`,
  });
  await page.close();
}
await browser.close();
