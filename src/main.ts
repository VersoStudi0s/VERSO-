import { createApp, createSSRApp } from "vue";
import "@fontsource/barlow-condensed/latin-300.css";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/barlow-condensed/latin-700.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import App from "./App.vue";
import router from "./router";
import "./styles/tokens.css";
import "./styles/global.css";

const path = location.pathname.replace(/\/$/, "") || "/";
const canHydrate = document.documentElement.dataset.route === path;
const app = canHydrate ? createSSRApp(App) : createApp(App);
app.use(router);
router.isReady().then(() => app.mount("#app"));
