self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nova notificação",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/badge-72x72.png",
  };

  event.waitUntil(
    self.registration.showNotification("Título da Notificação", options)
  );
});
