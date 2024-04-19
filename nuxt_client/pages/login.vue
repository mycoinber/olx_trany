<script lang="ts" setup>
  console.log("login loaded");
  useSeoMeta({
    title: "Login",
  });
  const authStore = useAuthStore();
  console.log(authStore.getIsAuthenticated);
  const usernameRef = ref("");
  const passwordRef = ref("");

  const handleLogin = () => {
    authStore.login(usernameRef.value, passwordRef.value);
  };

  const handleRegister = () => {
    // Ваша логика для обработки нажатия кнопки "Register"
  };
</script>

<template>
  <div class="auth auth--login">
    <div class="auth__form">
      <h1 class="auth__title">Login</h1>

      <form action="" @submit.prevent="handleLogin">
        <input
          type="text"
          v-model="usernameRef"
          placeholder="Username"
          required
        />
        <input
          type="password"
          v-model="passwordRef"
          placeholder="Password"
          required
        />
        <div class="button__group">
          <button type="submit" @click="handleLogin">Login</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
