<template>
  <div>
    <h1>Email Confirmation</h1>
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="!token">
      На вашу почту отправлена ссылка для подтверждения регистрации
    </p>
    <p v-else>Email confirmed successfully!</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import instance from "~/utils/axios";

  const route = useRoute();
  const loading = ref(true);
  const error = ref(null);
  const token = ref(null);

  onMounted(async () => {
    token.value = route.query.token;
    if (!token.value) {
      loading.value = false;
      return;
    }

    try {
      const response = await instance.post("/user/confirm-email", {
        token: token.value,
      });
      loading.value = false;
      // Handle response...
    } catch (err) {
      loading.value = false;
      error.value = err.message;
    }
  });
</script>
