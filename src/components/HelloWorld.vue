<template>
  <div>
    <button @click="sendPostRequest">Enviar POST</button>
    <button @click="sendPutRequest">Enviar PUT</button>
    <button @click="sendDeleteRequest">Enviar DELETE</button>

    <button @click="saveToLocalStorage">Salvar no Local Storage</button>
    <button @click="loadFromLocalStorage">Carregar do Local Storage</button>

    <p v-if="isSending">Enviando...</p>
    <p v-if="errorMessage" class="error">Erro: {{ errorMessage }}</p>
    <p v-if="isSynced">Dados sincronizados com sucesso!</p>
    <p v-if="offline">
      Você está offline. A requisição será sincronizada assim que a conexão for
      restabelecida.
    </p>

    <p v-if="storedData">Dado armazenado: {{ storedData }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

const isSending = ref(false);
const errorMessage = ref("");
const isSynced = ref(false);
const offline = ref(false);

const apiUrl = "https://reqres.in/api/users";

const storedData = ref<string | null>(null);
const localStorageKey = "meuDado";

// Função para salvar um dado no localStorage
const saveToLocalStorage = () => {
  const dataToSave = "Este é um dado de exemplo";
  localStorage.setItem(localStorageKey, dataToSave);
  alert("Dado salvo no Local Storage.");
};

// Função para carregar o dado do localStorage
const loadFromLocalStorage = () => {
  const data = localStorage.getItem(localStorageKey);
  if (data) {
    storedData.value = data;
    alert("Dado carregado do Local Storage.");
  } else {
    alert("Nenhum dado encontrado no Local Storage.");
  }
};

const sendRequest = async (
  method: string,
  data: object | null = null,
  url: string
) => {
  if (!navigator.onLine) {
    offline.value = true;

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
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro: ${response.statusText}`);
    }

    if (response.status === 204) {
      isSynced.value = true;

      return;
    }

    const responseData = await response.json();
    console.log(responseData);
    isSynced.value = true;
  } catch (error: any) {
    console.error("Error:", error);
    errorMessage.value = `Falha ao enviar os dados, ${error.message}`;
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

// Detectando a conexão ao voltar online
window.addEventListener("online", () => {
  if (offline.value) {
    sendPostRequest();
    offline.value = false;
  }
});

onMounted(() => {
  solicitarPermissao();
});
</script>

<style scoped>
.error {
  color: red;
}
</style>
