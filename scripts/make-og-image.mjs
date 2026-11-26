// Gera public/images/verso-og.jpg (1200×630), public/favicon.png e public/apple-touch-icon.png.
// Uso: npm run og-image
import { chromium } from "playwright";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

// Data URLs: a página é carregada com setContent, sem acesso a file://.
const dataUrl = (path, type) => `data:${type};base64,${readFileSync(path).toString("base64")}`;
const font = (pkg, file) => dataUrl(resolve("node_modules/@fontsource", pkg, "files", file), "font/woff2");
const image = (name) => dataUrl(resolve("public/images", name), "image/webp");
const executablePath = existsSync("/opt/pw-browsers/chromium") ? "/opt/pw-browsers/chromium" : undefined;

const fonts = `
@font-face{font-family:Anton;src:url(${font("anton", "anton-latin-400-normal.woff2")})}
@font-face{font-family:Corm;font-style:italic;font-weight:600;src:url(${font("cormorant-garamond", "cormorant-garamond-latin-600-italic.woff2")})}
@font-face{font-family:CormN;font-weight:600;src:url(${font("cormorant-garamond", "cormorant-garamond-latin-600-normal.woff2")})}
@font-face{font-family:Mono;src:url(${font("ibm-plex-mono", "ibm-plex-mono-latin-400-normal.woff2")})}
*{margin:0;box-sizing:border-box}`;

const og = `<html><style>${fonts}
body{width:1200px;height:630px;background:#0b0b0d;color:#f7f0eb;position:relative;overflow:hidden;font-family:Mono}
.paper{position:absolute;right:40px;top:50px;width:470px;height:470px;transform:rotate(-3deg);
clip-path:polygon(3% 6%,18% 0,31% 5%,47% 1%,63% 6%,80% 0,97% 4%,100% 22%,96% 41%,100% 60%,97% 81%,100% 97%,79% 100%,61% 95%,43% 100%,24% 96%,6% 100%,0 82%,4% 61%,0 40%,3% 21%);
background:url(${image("textura-editorial-960.webp")}) center/cover}
.chrome{position:absolute;right:190px;bottom:-50px;width:350px;filter:drop-shadow(0 20px 30px #000)}
.logo{position:absolute;left:72px;top:64px;font:600 54px/1 CormN}.logo b{color:#e54858;font:400 40px Arial;vertical-align:top}
.kicker{position:absolute;left:72px;top:170px;font-size:18px;letter-spacing:.14em;text-transform:uppercase;color:#a9a2a4}
h1{position:absolute;left:68px;top:210px;font:400 104px/0.92 Anton;text-transform:uppercase}
h1 em{font:italic 600 120px/0.8 Corm;color:#e54858;text-transform:none}
.foot{position:absolute;left:72px;bottom:56px;font-size:20px;color:#c9c2be}
.stamp{position:absolute;right:56px;top:40px;background:#f7f0eb;color:#0b0b0d;font:400 26px/1 Anton;padding:12px 16px;transform:rotate(6deg);text-transform:uppercase}
</style><body>
<div class="paper"></div><img class="chrome" src="${image("escultura-cromada-960.webp")}">
<div class="logo">VERSO<b>*</b></div><p class="kicker">Creative Digital Studio ✦ 100% remoto</p>
<h1>Seu negócio<br>merece ser<br><em>visto.</em></h1>
<p class="foot">Sites · Identidade visual · Redes sociais</p>
<div class="stamp">Protótipo<br>grátis ✦</div></body></html>`;

const icon = (size) => `<html><style>${fonts}
body{width:${size}px;height:${size}px;background:#0b0b0d;display:grid;place-items:center;border-radius:${size * 0.18}px}
span{font:400 ${size * 0.78}px/1 Anton;color:#f7f0eb;position:relative;top:${size * 0.02}px}
b{position:absolute;right:-${size * 0.2}px;top:-${size * 0.05}px;font:700 ${size * 0.5}px/1 Arial;color:#e54858}
</style><body><span>V<b>*</b></span></body></html>`;

const browser = await chromium.launch({ executablePath });
const shot = async (html, width, height, path, type) => {
  const page = await browser.newPage({ viewport: { width, height } });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, type, quality: type === "jpeg" ? 86 : undefined, omitBackground: type === "png" });
  await page.close();
};
await shot(og, 1200, 630, "public/images/verso-og.jpg", "jpeg");
await shot(icon(64), 64, 64, "public/favicon.png", "png");
await shot(icon(180), 180, 180, "public/apple-touch-icon.png", "png");
await browser.close();
console.log("OG image e ícones gerados.");
