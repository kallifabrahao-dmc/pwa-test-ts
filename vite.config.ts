import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
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
