import { createSSRApp } from "vue";
import { renderToString } from "@vue/server-renderer";
import App from "./App.vue";
import { createAppRouter } from "./router";
import { projects } from "./data/projects";
import { pageMetadata } from "./data/metadata";

export const siteOrigin = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");

export const staticRoutes = [
  "/",
  ...projects.map((project) => `/projetos/${project.slug}`),
  "/privacidade",
];

export async function render(url: string) {
  const app = createSSRApp(App);
  const router = createAppRouter();
  app.use(router);
  await router.push(url);
  await router.isReady();
  return {
    html: await renderToString(app),
    ...pageMetadata(url),
  };
}
