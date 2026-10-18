import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
} from "vue-router";
import HomePage from "./pages/HomePage.vue";
import { pageMetadata } from "./data/metadata";

export function createAppRouter() {
  const router = createRouter({
    history:
      typeof window === "undefined"
        ? createMemoryHistory()
        : createWebHistory(),
    routes: [
      { path: "/", component: HomePage },
      {
        path: "/projetos/:slug",
        component: () => import("./pages/ProjectPage.vue"),
      },
      {
        path: "/privacidade",
        component: () => import("./pages/PrivacyPage.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        component: () => import("./pages/NotFoundPage.vue"),
      },
    ],
    scrollBehavior(to, _from, saved) {
      if (saved) return saved;
      if (to.hash)
        return {
          el: to.hash,
          top: 100,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        };
      return { top: 0 };
    },
  });
  router.afterEach((to) => {
    if (typeof document === "undefined") return;
    const meta = pageMetadata(to.path);
    document.title = meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", meta.description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", meta.description);
    const site = import.meta.env.VITE_SITE_URL?.replace(/\/$/, "");
    if (site && /^https:\/\//.test(site)) {
      let canonical = document.querySelector<HTMLLinkElement>(
        'link[rel="canonical"]',
      );
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = `${site}${to.path}`;
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute("content", `${site}/images/verso-social.jpg`);
    }
  });
  return router;
}
export default createAppRouter();
