import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { projects } from "./src/data/projects";

export default defineConfig({
  plugins: [
    vue(),
    {
      name: "serve-prerendered-routes",
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const [path, query] = (request.url || "/").split("?");
          if (
            [
              ...projects.map((project) => `/projetos/${project.slug}`),
              "/privacidade",
            ].includes(path.replace(/\/$/, ""))
          ) {
            request.url = `${path.replace(/\/$/, "")}/index.html${query ? `?${query}` : ""}`;
          }
          next();
        });
      },
    },
  ],
  server: { host: "0.0.0.0", port: 4173, allowedHosts: ["terminal.local"] },
  build: { target: "es2022", cssCodeSplit: true },
});
