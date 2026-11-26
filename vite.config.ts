import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// O preview serve as rotas pré-renderizadas (/projetos/x → /projetos/x/index.html),
// imitando o comportamento do Cloudflare Pages.
export default defineConfig({
  plugins: [
    vue(),
    {
      name: "serve-prerendered-routes",
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const [path = "/", query] = (request.url ?? "/").split("?");
          if (path !== "/" && !path.includes(".")) {
            request.url = `${path.replace(/\/$/, "")}/index.html${query ? `?${query}` : ""}`;
          }
          next();
        });
      },
    },
  ],
  server: { host: "0.0.0.0", port: 4173 },
  // Vue Router 5 lê __VUE_OPTIONS_API__ em tempo de execução; incluí-lo no bundle SSR
  // aplica os mesmos defines do cliente na pré-renderização.
  ssr: { noExternal: ["vue-router"] },
  build: { target: "es2022", cssCodeSplit: true },
});
