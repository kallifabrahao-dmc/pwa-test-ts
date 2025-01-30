<script setup lang="ts">
import { ref, onMounted } from "vue";

const isLoading = ref(true);
const showName = ref(false);

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 5500);

  setTimeout(() => {
    showName.value = true;
  }, 3000);
});
</script>

<template>
  <div v-if="isLoading" class="splash-screen">
    <div class="logo" v-if="!showName">
      <img src=" /avatar-comerc.png" alt="Logo" class="fade-in" width="300" />
    </div>

    <div class="name" v-if="showName">
      <h1>DMC-<span>View</span></h1>
      <img src="/dmc-view.svg" alt="icones" height="45" />
    </div>
  </div>
</template>

<style scoped>
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

h1 {
  color: #004415;
  font-size: 3rem;
}
span {
  color: #60ab56;
  font-size: 3rem;
  margin-right: 2px;
}

.name {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes waveReveal {
  0% {
    clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
  }
  20% {
    clip-path: polygon(0% 0%, 80% 0%, 70% 80%, 0% 100%);
  }
  40% {
    clip-path: polygon(0% 0%, 80% 0%, 85% 100%, 0% 100%);
  }
  60% {
    clip-path: polygon(0% 0%, 85% 0%, 90% 100%, 0% 100%);
  }
  80% {
    clip-path: polygon(0% 0%, 90% 0%, 95% 100%, 0% 100%);
  }
  100% {
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
}

.logo img {
  width: 100%;
  height: auto;
  animation: waveReveal 2s cubic-bezier(0.3, 0, 0.2, 0.3) normal,
    fadeIn 2s ease-in-out forwards;
}

.fade-in {
  color: #141414;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
