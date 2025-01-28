import { createApp } from "vue";
import App from "./App.vue";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.ts")
    .then((registration) => {
      console.log("Service Worker registrado com sucesso:", registration);
    })
    .catch((error) => {
      console.error("Falha ao registrar o Service Worker:", error);
    });
}

// Exemplo de uso

createApp(App).mount("#app");
