<script lang="ts" setup>
console.log("registration loaded");
useSeoMeta({
  title: "Register",
});
const authStore = useAuthStore();
console.log(authStore.getIsAuthenticated);
const usernameRef = ref("");
const passwordRef = ref("");



const handleRegister = () => {
  // Ваша логика для обработки нажатия кнопки "Register"
};
</script>

<template>
  <div class="auth auth-register">
    <div class="auth__form">
    <h1 class="auth__title">Register</h1>

    <form action="" @submit.prevent="handleLogin">
      <input type="text" v-model="usernameRef" placeholder="Username" required />
      <input type="password" v-model="passwordRef" placeholder="Password" required />
      <input type="text" placeholder="First Name" required />
      <input type="text" placeholder="Last Name" required />
      <input type="email" placeholder=" Email" required />
      <input type="tel" placeholder="Phone" required />
      <button type="submit">Register</button>
    </form>
  </div>
</div>
</template>

<style  scoped >
</style>


