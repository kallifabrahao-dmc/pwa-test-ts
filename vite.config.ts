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
        name: "Teste pwa",
        short_name: "Pwa",
        description: "testando pwa",
        theme_color: "#45D32D",
        icons: [
          {
            src: "src/assets/img1.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/img2.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
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
