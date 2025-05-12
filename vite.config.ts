import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      injectRegister: "auto",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "PWA",
        short_name: "PWA",
        description: "PWA",
        theme_color: "#004415",
        icons: [
          {
            src: "/PWA.jpg",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/PWA.jpg",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/PWA.jpg",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/index.html",
        suppressWarnings: true,
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url, request }) => {
              const isApiRequest = /\/api\/.*\/*.json/.test(url.pathname);

              const isTargetMethod = ["POST", "PUT", "DELETE"].includes(
                request.method
              );
              return isApiRequest && isTargetMethod;
            },
            handler: "NetworkOnly",
            options: {
              backgroundSync: {
                name: "myQueueName",
                options: {
                  maxRetentionTime: 24 * 60, // Tempo máximo de retenção em minutos (neste caso, 24 horas)
                },
              },
            },
          },
        ],
      },
    }),
  ],
});
