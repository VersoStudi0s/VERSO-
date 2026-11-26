// Teste de ponta a ponta do build de produção.
// Uso: npm run build && npm run preview  (em outro terminal)  →  npm test
// TEST_BASE_URL muda o endereço (padrão http://127.0.0.1:4180).
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import { existsSync } from "node:fs";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:4180";
const executablePath =
  process.env.CHROMIUM_PATH ?? (existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined);
const browser = await chromium.launch({ executablePath });
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
};

const newPage = async (viewport, options = {}) => {
  const context = await browser.newContext({ viewport, ...options });
  const page = await context.newPage();
  const errors = [];
  const thirdParty = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => message.type() === "error" && errors.push(message.text()));
  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!url.href.startsWith(base) && url.protocol.startsWith("http")) thirdParty.push(url.host);
  });
  // Nada sai para a internet durante os testes.
  await context.route(/^(?!http:\/\/127\.0\.0\.1)/, (route) => route.fulfill({ status: 204, body: "" }));
  return { context, page, errors, thirdParty };
};

// 1. Larguras: sem rolagem horizontal, sem erros, CTA principal visível sem rolar.
for (const [width, height] of [
  [320, 640],
  [360, 740],
  [390, 844],
  [768, 1024],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
]) {
  const { context, page, errors } = await newPage({ width, height });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.evaluate(() => document.querySelector(".consent")?.remove());
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  const cta = await page.locator(".hero a[data-channel]").first().boundingBox();
  check(`${width}px sem rolagem horizontal`, overflow <= 0, `excesso ${overflow}px`);
  check(`${width}px CTA do protótipo acima da dobra`, cta !== null && cta.y + cta.height <= height, `base em ${Math.round((cta?.y ?? 0) + (cta?.height ?? 0))}px`);
  check(`${width}px sem erros no console`, errors.length === 0, errors.join(" | "));
  await context.close();
}

// 2. Página inicial no celular: seções, imagens, links e menu.
{
  const { context, page, thirdParty } = await newPage({ width: 390, height: 844 }, { hasTouch: true, isMobile: true });
  await page.goto(base, { waitUntil: "networkidle" });
  const ids = await page.$$eval("main section[id]", (sections) => sections.map((section) => section.id));
  check("Seis blocos na ordem", ids.join(",") === "inicio,servicos,projetos,como-funciona,sobre,contato", ids.join(","));
  check("Nenhum terceiro carregado antes do consentimento", thirdParty.length === 0, thirdParty.join(","));
  check("Banner de consentimento visível", await page.locator(".consent").isVisible());

  // Rola até o fim para disparar lazy-load e revelações.
  for (let y = 0; y < 16000; y += 600) await page.evaluate((top) => window.scrollTo(0, top), y).then(() => page.waitForTimeout(60));
  await page.waitForLoadState("networkidle");
  const broken = await page.$$eval("img", (images) =>
    images.filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.currentSrc || image.src),
  );
  check("Todas as imagens carregadas", broken.length === 0, broken.join(", "));
  const faded = await page.$$eval("main *", (elements) => elements.filter((element) => getComputedStyle(element).opacity === "0").length);
  check("Nada fica invisível esperando rolagem", faded === 0, `${faded} invisíveis`);

  const hrefs = await page.$$eval("a[href]", (links) => links.map((link) => link.getAttribute("href")));
  const external = hrefs.filter((href) => /^https?:|^mailto:/.test(href));
  check("Links do Instagram corretos", external.some((href) => href === "https://www.instagram.com/versostudioss/"));
  check("Link de e-mail presente", external.some((href) => href.startsWith("mailto:")));
  check(
    "Canal de conversa configurado",
    external.some((href) => href.startsWith("https://wa.me/") || href === "https://ig.me/m/versostudioss"),
  );
  check("Sem links vazios ou #", hrefs.every((href) => href && href !== "#"));

  const internal = [...new Set(hrefs.filter((href) => href.startsWith("/") && !href.startsWith("//")))];
  for (const href of internal) {
    const path = href.split("#")[0].split("?")[0] || "/";
    const response = await page.request.get(new URL(path, base).href);
    check(`Rota ${path} responde`, response.ok(), String(response.status()));
  }

  // Botão flutuante aparece depois do início e some no contato.
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.locator(".consent button", { hasText: "Recusar" }).click();
  await page.waitForTimeout(300);
  check("Botão flutuante visível no meio da página", await page.locator(".floating.is-visible").isVisible());
  await page.locator("#contato").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  check("Botão flutuante some no contato", (await page.locator(".floating.is-visible").count()) === 0);

  // Menu mobile.
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.locator(".header__menu-btn").click();
  check("Menu abre", await page.locator("#menu-mobile").isVisible());
  await page.keyboard.press("Escape");
  check("Menu fecha com Esc", !(await page.locator("#menu-mobile").isVisible()));
  await page.locator(".header__menu-btn").click();
  await page.locator("#menu-mobile a", { hasText: "Como funciona" }).click();
  await page.waitForTimeout(1800);
  const processTop = await page.locator("#como-funciona").evaluate((element) => element.getBoundingClientRect().top);
  check("Link do menu leva à seção", Math.abs(processTop) < 120, `topo em ${Math.round(processTop)}px`);
  await context.close();
}

// 3. Formulário: validação, serviço pela URL, mensagem montada e canal aberto.
{
  const { context, page } = await newPage({ width: 390, height: 844 });
  await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: base });
  await page.goto(`${base}/?servico=landing#contato`, { waitUntil: "networkidle" });
  await page.evaluate(() => {
    window.__opened = [];
    window.open = (url) => (window.__opened.push(String(url)), null);
    window.__events = [];
    window.addEventListener("verso:track", (event) => window.__events.push(event.detail.event));
  });
  check("Serviço pré-selecionado pela URL", (await page.locator("#f-service").inputValue()) === "landing");
  await page.locator(".form button[type=submit]").click();
  check("Erros de validação exibidos", (await page.locator(".field__error").count()) === 3);
  check("Foco vai para o primeiro erro", (await page.evaluate(() => document.activeElement?.id)) === "f-name");
  check("Campo inválido marcado", (await page.locator("#f-name").getAttribute("aria-invalid")) === "true");
  check(
    "Campos com limite de tamanho",
    (await page.locator("#f-name").getAttribute("maxlength")) === "80" &&
      (await page.locator("#f-contact").getAttribute("maxlength")) === "120" &&
      (await page.locator("#f-description").getAttribute("maxlength")) === "800",
  );
  await page.fill("#f-name", "Maria Teste");
  await page.fill("#f-contact", "abc123");
  await page.fill("#f-description", "Quero uma landing page para divulgar meus bolos.");
  await page.locator(".form button[type=submit]").click();
  check("Contato inválido é rejeitado", (await page.locator("#e-contact").count()) === 1);
  check("Nada abre com contato inválido", (await page.evaluate(() => window.__opened.length)) === 0);
  await page.fill("#f-contact", "maria@exemplo.com");
  await page.fill("#f-description", "Quero uma landing page para divulgar meus bolos.");
  await page.locator(".form button[type=submit]").click();
  await page.waitForTimeout(300);
  const opened = await page.evaluate(() => window.__opened);
  const events = await page.evaluate(() => window.__events);
  check("Canal aberto ao enviar", opened.length === 1 && /wa\.me|ig\.me/.test(opened[0] ?? ""), opened.join(","));
  check("Evento formulario_enviado registrado", events.includes("formulario_enviado"));
  const status = await page.locator(".form__status").innerText();
  check("Confirmação exibida", status.length > 10, status);
  await page.locator(".form button[type=submit]").click();
  await page.waitForTimeout(200);
  check("Limite de tentativas: segundo envio imediato bloqueado", (await page.evaluate(() => window.__opened.length)) === 1);
  check("Aviso de espera exibido", (await page.locator(".form__status").innerText()).includes("Aguarde"));
  if (opened[0]?.includes("ig.me")) {
    const clip = await page.evaluate(() => navigator.clipboard.readText());
    check("Mensagem copiada com nome, serviço e contato", clip.includes("Maria Teste") && clip.includes("Landing page") && clip.includes("maria@exemplo.com"));
  } else {
    const text = decodeURIComponent(opened[0]?.split("text=")[1] ?? "");
    check("Mensagem do WhatsApp com nome, serviço e contato", text.includes("Maria Teste") && text.includes("Landing page"));
  }
  await context.close();
}

// 4. Consentimento: ao aceitar, o Metricool é solicitado.
{
  const { context, page, thirdParty } = await newPage({ width: 1280, height: 800 });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.locator(".consent button", { hasText: "Aceitar" }).click();
  await page.waitForTimeout(500);
  check("Metricool carrega só após aceitar", thirdParty.includes("tracker.metricool.com"), thirdParty.join(","));
  await page.reload({ waitUntil: "networkidle" });
  check("Escolha lembrada", (await page.locator(".consent").count()) === 0);
  await context.close();
}

// 5. Conteúdo sem JavaScript (pré-renderizado) e metadados.
{
  const { context, page } = await newPage({ width: 1280, height: 800 }, { javaScriptEnabled: false });
  for (const path of ["/", "/projetos/versary", "/projetos/gymflow", "/projetos/ritmo-fitness", "/projetos/cafe-aurora", "/privacidade"]) {
    await page.goto(new URL(path, base).href);
    const h1 = await page.locator("h1").first().innerText().catch(() => "");
    const meta = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content ?? "",
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? "",
      og: document.querySelector('meta[property="og:image"]')?.content ?? "",
    }));
    check(`${path} tem conteúdo sem JS`, h1.length > 2, h1.replace(/\n/g, " "));
    check(`${path} tem metadados`, meta.title.includes("VERSO*") && meta.description.length > 50 && meta.canonical.endsWith(path === "/" ? "/" : path) && meta.og.startsWith("https://"));
  }
  await context.close();
}

// 6. Hidratação limpa e página de projeto.
{
  const { context, page, errors } = await newPage({ width: 1280, height: 800 });
  const warnings = [];
  page.on("console", (message) => /hydrat/i.test(message.text()) && warnings.push(message.text()));
  await page.goto(`${base}/projetos/gymflow`, { waitUntil: "networkidle" });
  check("Estudo de caso hidrata sem avisos", warnings.length === 0 && errors.length === 0, [...warnings, ...errors].join(" | "));
  await page.locator(".case__cta a", { hasText: "Próximo" }).click();
  await page.waitForURL(/projetos\//);
  check("Navegação entre estudos", !page.url().endsWith("gymflow"), page.url());
  check("Título atualizado na navegação", (await page.title()).includes("|"), await page.title());
  await context.close();
}

// 7. Acessibilidade automatizada (axe) em celular e desktop.
for (const [path, width] of [
  ["/", 390],
  ["/", 1440],
  ["/projetos/versary", 390],
  ["/privacidade", 1280],
]) {
  const { context, page } = await newPage({ width, height: 900 }, { reducedMotion: "reduce" });
  await page.goto(new URL(path, base).href, { waitUntil: "networkidle" });
  const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  check(
    `axe ${path} @${width}px`,
    violations.length === 0,
    violations.map((violation) => `${violation.id} (${violation.nodes.length})`).join(", "),
  );
  await context.close();
}

await browser.close();
const failed = results.filter((result) => !result.ok);
console.log(`\n${results.length - failed.length}/${results.length} verificações aprovadas.`);
process.exit(failed.length ? 1 : 0);
