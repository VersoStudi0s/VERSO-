// Native Vue SSR at build time; output is static and hydrated by the client.
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { render, staticRoutes as routes, siteOrigin } from "../.prerender/entry-server.js";
const root = resolve("dist");
const template = await readFile(resolve(root, "index.html"), "utf8");
const files = await readdir(resolve(root, "assets"));
const fonts = files.filter(
  (file) =>
    /woff2$/.test(file) &&
    /barlow-condensed-latin-(300|700)|cormorant-garamond-latin-500-italic/.test(
      file,
    ),
);
const preload = fonts
  .map(
    (file) =>
      `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`,
  )
  .join("");
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const origin = siteOrigin;
for (const route of routes) {
  const page = await render(route);
  let html = template
    .replace(
      '<html lang="pt-BR">',
      `<html lang="pt-BR" data-prerendered data-route="${route}">`,
    )
    .replace('<div id="app"></div>', `<div id="app">${page.html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
    .replace(
      /(<meta name="description" content=")[^"]*/,
      `$1${escape(page.description)}`,
    )
    .replace(
      /(<meta property="og:title" content=")[^"]*/,
      `$1${escape(page.title)}`,
    )
    .replace(
      /(<meta property="og:description" content=")[^"]*/,
      `$1${escape(page.description)}`,
    )
    .replace("</head>", `${preload}</head>`);
  if (origin && /^https:\/\//.test(origin)) {
    html = html
      .replace(
        "</head>",
        `<link rel="canonical" href="${escape(new URL(route, origin).href)}"></head>`,
      )
      .replace(
        'content="/images/verso-social.jpg"',
        `content="${escape(origin)}/images/verso-social.jpg"`,
      );
  }
  const target = route === "/" ? root : resolve(root, `.${route}`);
  await mkdir(target, { recursive: true });
  await writeFile(resolve(target, "index.html"), html);
  console.log(`Pre-rendered ${route}`);
}
if (origin && /^https:\/\//.test(origin)) {
  await writeFile(
    resolve(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map((route) => `<url><loc>${escape(new URL(route, origin).href)}</loc></url>`).join("")}</urlset>`,
  );
  await writeFile(
    resolve(root, "robots.txt"),
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
}
await writeFile(
  resolve(root, "_redirects"),
  `${routes
    .filter((route) => route !== "/")
    .map((route) => `${route} ${route}/index.html 200`)
    .join("\n")}\n/* /index.html 200\n`,
);
