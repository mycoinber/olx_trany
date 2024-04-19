<script lang="ts" setup>
  console.log("test");
  useSeoMeta({
    title: "Login 1",
    description: "some dessc",
  });
  const authStore = useAuthStore();
  console.log(authStore.getIsAuthenticated);
  const usernameRef = ref("");
  const passwordRef = ref("");
</script>

<template>
  <div class="auth auth--login">
    <div class="auth__form">
      <h1 class="auth__title">Login</h1>

      <form action="">
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
          <button type="submit">Login</button>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
