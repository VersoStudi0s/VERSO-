import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import { absoluteUrl, pageMeta } from "./lib/seo";

const setMeta = (selector: string, attribute: string, value: string) =>
  document.querySelector(selector)?.setAttribute(attribute, value);

export const createAppRouter = () => {
  const router = createRouter({
    history: typeof window === "undefined" ? createMemoryHistory() : createWebHistory(),
    routes: [
      { path: "/", component: HomePage },
      { path: "/projetos/:slug", component: () => import("./pages/ProjectPage.vue") },
      { path: "/privacidade", component: () => import("./pages/PrivacyPage.vue") },
      { path: "/:pathMatch(.*)*", component: () => import("./pages/NotFoundPage.vue") },
    ],
    scrollBehavior(to, from, saved) {
      if (saved) return saved;
      if (to.hash) {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        return { el: to.hash, behavior: reduce || from.path !== to.path ? "instant" : "smooth" };
      }
      if (to.path === from.path) return false;
      return { top: 0 };
    },
  });

  router.afterEach((to, from) => {
    if (typeof document === "undefined" || to.path === from.path) return;
    const meta = pageMeta(to.path);
    document.title = meta.title;
    setMeta('meta[name="description"]', "content", meta.description);
    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", absoluteUrl(meta.path));
    setMeta('link[rel="canonical"]', "href", absoluteUrl(meta.path));
  });

  return router;
};
