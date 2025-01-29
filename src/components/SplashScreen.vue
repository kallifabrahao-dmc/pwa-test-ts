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
      <img src=" /avatar-comerc.png" alt="Logo" class="fade-in" />
    </div>

    <div class="name" v-if="showName">
      <h1 class="fade-in">DMC<span>View</span></h1>
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
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

span {
  color: #60ab56;
}

.name h1 {
  width: 100%;
  animation: fadeIn 1.5s ease-in-out;
}

.logo img {
  width: 150px;
  height: auto;
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
