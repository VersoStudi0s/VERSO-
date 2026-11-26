import { createApp, createSSRApp } from "vue";
import "@fontsource/anton/latin-400.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-600-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/utilities.css";
import App from "./App.vue";
import { createAppRouter } from "./router";
import { initAnalytics } from "./lib/analytics";

document.documentElement.classList.add("js");

// Hidrata o HTML pré-renderizado quando ele corresponde à rota atual.
const path = location.pathname.replace(/\/$/, "") || "/";
const prerendered = document.documentElement.dataset.route === path;
const app = prerendered ? createSSRApp(App) : createApp(App);
const router = createAppRouter();
app.use(router);
router.isReady().then(() => {
  app.mount("#app");
  initAnalytics();
});
