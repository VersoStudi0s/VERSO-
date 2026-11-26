// Usado só na build: renderiza cada rota em HTML estático (scripts/prerender.mjs).
import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import App from "./App.vue";
import { createAppRouter } from "./router";
import { projects } from "./content/projects";
import { absoluteUrl, organizationJsonLd, pageMeta } from "./lib/seo";
import { site } from "./config/site";

export const siteUrl = site.url;
export const staticRoutes = ["/", ...projects.map((project) => `/projetos/${project.slug}`), "/privacidade", "/404"];

export const render = async (url: string) => {
  const app = createSSRApp(App);
  const router = createAppRouter();
  app.use(router);
  await router.push(url);
  await router.isReady();
  const meta = pageMeta(url);
  return {
    html: await renderToString(app),
    ...meta,
    url: absoluteUrl(meta.path),
    imageUrl: absoluteUrl(meta.image),
    jsonLd: url === "/" ? organizationJsonLd() : "",
  };
};
