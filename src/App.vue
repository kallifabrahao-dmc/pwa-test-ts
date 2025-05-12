<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import PWABadge from "./components/PWABadge.vue";
import SplashScreen from "./components/SplashScreen.vue";
</script>

<template>
  <SplashScreen />

  <div class="container">
    <h1>Testando aplicação pwa</h1>
    <span>✅ Notificações</span>
    <span>✅ Background Sync</span>
    <span>✅ Local storage</span>
    <span>✅ SplashScreen</span>
    <span>✅ Uso da câmera nativa</span>

    <HelloWorld msg="pwa-teste-ts" />
  </div>
  <PWABadge />
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
