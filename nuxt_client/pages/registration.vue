<script lang="ts" setup>
  console.log("registration loaded");
  useSeoMeta({
    title: "Registration",
  });
  const authStore = useAuthStore();
  console.log(authStore.getIsAuthenticated);

  const usernameRef = ref("");
  const passwordRef = ref("");
  const firstNameRef = ref("");
  const lastNameRef = ref("");
  const emailRef = ref("");
  const phoneRef = ref("");

  const resetForm = () => {
    usernameRef.value = "";
    passwordRef.value = "";
    firstNameRef.value = "";
    lastNameRef.value = "";
    emailRef.value = "";
    phoneRef.value = "";
  };

  const handleRegister = async () => {
    const response = await authStore.register(
      usernameRef.value,
      emailRef.value,
      passwordRef.value,
      phoneRef.value,
      firstNameRef.value,
      lastNameRef.value
    );
    if (response) {
      resetForm();
    }
  };
</script>

<template>
  <div class="auth auth-register">
    <div class="auth__form">
      <h1 class="auth__title">Register</h1>

      <form action="" @submit.prevent="handleRegister">
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
        <input
          type="text"
          v-model="firstNameRef"
          placeholder="First Name"
          required
        />
        <input
          type="text"
          v-model="lastNameRef"
          placeholder="Last Name"
          required
        />
        <input type="email" v-model="emailRef" placeholder=" Email" required />
        <input type="tel" v-model="phoneRef" placeholder="Phone" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
