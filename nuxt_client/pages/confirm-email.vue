<template>
  <div>
    <h1>Email Confirmation</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="token === null">
      На вашу почту отправлена ссылка для подтверждения регистрации
    </p>
    <p v-else>Email confirmed successfully!</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";

  const route = useRoute();
  const loading = ref(true);
  const error = ref("");
  const token = ref("");

  const authStore = useAuthStore(); // Используем стор

  onMounted(async () => {
    token.value = route.query.token ? String(route.query.token) : null;
    if (token.value === null) {
      loading.value = false;
      return;
    }

    try {
      await authStore.confirmEmail(token.value); // Вызываем метод подтверждения email из стора
      loading.value = false;
    } catch (err) {
      loading.value = false;
      error.value = err.message;
    }
  });
</script>
