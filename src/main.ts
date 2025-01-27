import { createApp } from "vue";
import App from "./App.vue";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker registrado com sucesso:", registration);
    })
    .catch((error) => {
      console.error("Falha ao registrar o Service Worker:", error);
    });
}

createApp(App).mount("#app");
