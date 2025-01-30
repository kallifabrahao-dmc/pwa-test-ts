<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import PWABadge from "./components/PWABadge.vue";
import SplashScreen from "./components/SplashScreen.vue";
</script>

<template>
  <SplashScreen />

  <div class="container">
    <h1>Testando aplicação pwa para o projeto DMC 3.0</h1>
    <span>✅ Notificações</span>
    <span>✅ Background Sync</span>
    <span>✅ Local storage</span>
    <span>✅ SplashScreen</span>

    <HelloWorld msg="pwa-teste-ts" />
  </div>
  <PWABadge />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
