<script lang="ts" setup>
const router = useRouter();
// console.log("login loaded");
useSeoMeta({
  title: "Login",
});
const user = ref({
  username: "",
  password: "",
});
const authStore = useAuthStore();
// console.log(authStore.getIsAuthenticated);

const handleLogin = () => {
  authStore.login({
    username: user.value.username,
    password: user.value.password,
  });
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
          v-model="user.username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          v-model="user.password"
          placeholder="Password"
          required
        />
        <div class="button__group">
          <button type="submit">Login</button>
          <button @click="router.push('/registration')">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
