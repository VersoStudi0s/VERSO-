// Gera HTML estático por rota com o renderizador SSR do Vue (o conteúdo aparece sem JavaScript),
// além de sitemap.xml e robots.txt. Saída em dist/, pronta para o Cloudflare Pages.
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { render, siteUrl, staticRoutes } from "../.prerender/entry-server.js";

const dist = resolve("dist");
const template = await readFile(resolve(dist, "index.html"), "utf8");

// Pré-carrega só as fontes usadas acima da dobra.
const assets = await readdir(resolve(dist, "assets"));
const preload = assets
  .filter((file) => /^(anton-latin-400-normal|cormorant-garamond-latin-600-italic)-.*\.woff2$/.test(file))
  .map((file) => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`)
  .join("");

const escape = (value) =>
  String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const setAttr = (html, pattern, value) => html.replace(pattern, (_match, start) => `${start}${escape(value)}`);

for (const route of staticRoutes) {
  const page = await render(route);
  let html = template
    .replace('<html lang="pt-BR">', `<html lang="pt-BR" data-route="${route}">`)
    .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`);
  html = setAttr(html, /(<meta name="description" content=")[^"]*/, page.description);
  html = setAttr(html, /(<meta property="og:title" content=")[^"]*/, page.title);
  html = setAttr(html, /(<meta property="og:description" content=")[^"]*/, page.description);
  html = setAttr(html, /(<meta property="og:url" content=")[^"]*/, page.url);
  html = setAttr(html, /(<meta property="og:image" content=")[^"]*/, page.imageUrl);
  html = setAttr(html, /(<link rel="canonical" href=")[^"]*/, page.url);
  const extraHead = [
    preload,
    page.noindex ? '<meta name="robots" content="noindex">' : "",
    page.jsonLd ? `<script type="application/ld+json">${page.jsonLd}</script>` : "",
  ].join("");
  html = html.replace("</head>", `${extraHead}</head>`);

  if (route === "/404") {
    html = html.replace(' data-route="/404"', "").replace(/<link rel="canonical"[^>]*>/, "");
    await writeFile(resolve(dist, "404.html"), html);
  } else {
    const dir = route === "/" ? dist : resolve(dist, `.${route}`);
    await mkdir(dir, { recursive: true });
    await writeFile(resolve(dir, "index.html"), html);
  }
  console.log(`pré-renderizado ${route}`);
}

const indexable = staticRoutes.filter((route) => route !== "/404");
await writeFile(
  resolve(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((route) => `  <url><loc>${escape(new URL(route, siteUrl).href)}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
await writeFile(resolve(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
await rm(resolve(".prerender"), { recursive: true, force: true });
