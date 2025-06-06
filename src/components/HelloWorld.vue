<template>
  <div class="container-hello">
    <div class="container-btn">
      <button v-if="installPrompt" @click="installPWA">Instalar PWA</button>
      <button @click="sendPostRequest">Enviar POST</button>
      <button @click="sendPutRequest">Enviar PUT</button>
      <button @click="triggerNativeCamera">Abrir Câmera Nativa</button>
      <button @click="sendDeleteRequest">Enviar DELETE</button>
      <button @click="saveToLocalStorage">Salvar no Local Storage</button>
      <button @click="loadFromLocalStorage">Carregar do Local Storage</button>
    </div>
    <p v-if="isSending">Enviando...</p>
    <p v-if="errorMessage" class="error">Erro: {{ errorMessage }}</p>
    <p v-if="isSynced">Dados sincronizados com sucesso!</p>
    <p v-if="offline">
      Você está offline. A requisição será sincronizada assim que a conexão for
      restabelecida.
    </p>
    <p v-if="storedData">Dado armazenado: {{ storedData }}</p>

    <div class="camera-feed" v-if="isCameraOpen">
      <video ref="cameraVideo" autoplay></video>
      <button @click="capturePhoto">Capturar Foto</button>
      <button @click="closeCamera">Fechar Câmera</button>
    </div>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      capture="environment"
      style="display: none"
      @change="handleFileChange"
    />
    <div v-if="capturedImage" class="image-preview">
      <img :src="capturedImage" alt="Imagem Capturada" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const isSending = ref(false);
const installPrompt = ref<Event | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const isCameraOpen = ref(false);
const cameraVideo = ref<HTMLVideoElement | null>(null);
const errorMessage = ref("");
const isSynced = ref(false);
const offline = ref(false);
const apiUrl = "https://reqres.in/api/users";
const storedData = ref<string | null>(null);
const localStorageKey = "meuDado";
const capturedImage = ref<string | null>(null);

const saveToLocalStorage = () => {
  const dataToSave = "Este é um dado de exemplo";
  localStorage.setItem(localStorageKey, dataToSave);
  alert("Dado salvo no Local Storage.");
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem(localStorageKey);
  if (data) {
    storedData.value = data;
    alert("Dado carregado do Local Storage.");
  } else {
    alert("Nenhum dado encontrado no Local Storage.");
  }
};

interface NotificationAction {
  action: string;
  title: string;
  icon?: string;
}

interface ExtendedNotificationOptions extends NotificationOptions {
  actions?: NotificationAction[];
}

function exibirNotificacao(msg: string, title: string) {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then((registration) => {
      const options: ExtendedNotificationOptions = {
        body: msg,
        icon: "/PWA.jpg",
        // actions: [
        //   { action: "confirmar", title: "Confirmar" },
        //   { action: "cancelar", title: "Cancelar" },
        // ],
      };
      registration.showNotification(title, options);
    });
  }
}

const sendRequest = async (
  method: string,
  data: object | null = null,
  url: string
) => {
  if (!navigator.onLine) {
    offline.value = true;
    exibirNotificacao(
      "Você está offline. A requisição será sincronizada assim que a conexão for restabelecida.",
      "Conexão"
    );

    return;
  }

  isSending.value = true;
  errorMessage.value = "";
  isSynced.value = false;

  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres-free-v1",
      },
      body: data ? JSON.stringify(data) : null,
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    if (response.status === 204) {
      isSynced.value = true;
      exibirNotificacao("Operação realizada com sucesso!", "Sucesso");

      return;
    }

    await response.json();
    isSynced.value = true;
    exibirNotificacao("Dados enviados com sucesso!", "Sucesso");
  } catch (error) {
    errorMessage.value = "Falha ao enviar os dados!";
    exibirNotificacao("Falha ao enviar os dados!", "Erro");
  } finally {
    isSending.value = false;
  }
};

const sendPostRequest = () => {
  sendRequest(
    "POST",
    {
      name: "John Doe",
      job: "Developer",
    },
    apiUrl
  );
};

const sendPutRequest = () => {
  sendRequest(
    "PUT",
    {
      name: "morpheus",
      job: "zion resident",
    },
    `${apiUrl}/2`
  );
};

const sendDeleteRequest = () => {
  sendRequest("DELETE", null, `${apiUrl}/2`);
};

const solicitarPermissao = async () => {
  if (!("Notification" in window)) {
    console.error("Este navegador não suporta notificações.");
    return;
  }
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.error("Permissão para notificações negada.");
  }
};

window.addEventListener("online", () => {
  if (offline.value) {
    sendPostRequest();
    offline.value = false;
  }
});

const triggerBackgroundNotification = async () => {
  if (Notification.permission === "granted") {
    try {
      const registration = await navigator.serviceWorker.ready;
      registration.active?.postMessage({
        action: "triggerNotification",
        title: "Notificação em Segundo Plano",
        message: "Esta é uma notificação emitida em segundo plano.",
      });
    } catch (err) {
      console.error("Erro ao acessar o Service Worker:", err);
    }
  } else {
    console.warn("Permissão para notificações não concedida.");
  }
};

onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    installPrompt.value = e;
  });
  solicitarPermissao();

  triggerBackgroundNotification();
});

const installPWA = () => {
  if (installPrompt.value) {
    (installPrompt.value as any).prompt();

    (installPrompt.value as any).userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === "accepted") {
        console.log("PWA instalado");
      } else {
        console.log("PWA não instalado");
      }
      installPrompt.value = null;
    });
  }
};

const capturePhoto = () => {
  if (cameraVideo.value) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = cameraVideo.value.videoWidth;
    canvas.height = cameraVideo.value.videoHeight;
    context?.drawImage(cameraVideo.value, 0, 0, canvas.width, canvas.height);
    capturedImage.value = canvas.toDataURL("image/png");
  }
};

const closeCamera = () => {
  if (cameraVideo.value && cameraVideo.value.srcObject) {
    const stream = cameraVideo.value.srcObject as MediaStream;
    stream.getTracks().forEach((track) => track.stop());
  }
  isCameraOpen.value = false;
};

const triggerNativeCamera = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      capturedImage.value = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
};
</script>

<style scoped>
.error {
  color: red;
}

.container-btn {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 100%;
}

button {
  background: #004415;
  border: none;
  color: #fff;
  cursor: pointer;
  padding: 10px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.container-hello {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border: 1px solid #ddd;
  padding: 5px;
  border-radius: 5px;
}
</style>
