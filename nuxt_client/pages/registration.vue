<script lang="ts" setup>
console.log("registration loaded");
useSeoMeta({
  title: "Register",
});
const authStore = useAuthStore();
console.log(authStore.getIsAuthenticated);

const user = ref({
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const handleRegister = () => {
  authStore.register({
    username: user.value.username,
    password: user.value.password,
    firstName: user.value.firstName,
    lastName: user.value.lastName,
    email: user.value.email,
    phone: user.value.phone,
  });
};
</script>

<template>
  <div class="auth auth-register">
    <div class="auth__form">
      <h1 class="auth__title">Register</h1>

      <form action="" @submit.prevent="handleRegister">
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
        <input
          type="text"
          v-model="user.firstName"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          v-model="user.lastName"
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          v-model="user.email"
          placeholder=" Email"
          required
        />
        <input type="tel" v-model="user.phone" placeholder="Phone" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
