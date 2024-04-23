<script lang="ts" setup>
  console.log("login loaded");
  useSeoMeta({
    title: "Login",
  });
  definePageMeta({
    layout: "auth",
  });
  const authStore = useAuthStore();
  const router = useRouter();

  console.log(authStore.getIsAuthenticated);
  const username = ref("");
  const password = ref("");

  const handleLogin = async () => {
    const response = await authStore.login(username.value, password.value);
    if (response) {
      router.push("/");
    }
  };

  const handleRegister = () => {
    router.push("/registration");
  };
</script>

<template>
  <div class="auth auth--login">
    <div class="auth__form">
      <h1 class="auth__title">Login</h1>

      <form @submit.prevent="handleLogin">
        <input type="text" v-model="username" placeholder="Username" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <div class="button__group">
          <button type="submit">Login</button>
          <button @click="handleRegister">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
