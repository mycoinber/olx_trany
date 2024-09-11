<script lang="ts" setup>
  const router = useRouter();

  useSeoMeta({
    title: "Registration",
  });
  definePageMeta({
    layout: "auth",
  });
  const authStore = useAuthStore();

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
      router.push("/confirm-email");
    }
  };
</script>

<template>
  <div class="container">
    <div class="another-header">
      <span class="another-header__button">Back</span>
      <NuxtLink to="/" class="logo">
        <NuxtImg src="/logo.svg" alt="logo" width="20px" height="20px" />
      </NuxtLink>
    </div>
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
          <input
            type="email"
            v-model="emailRef"
            placeholder=" Email"
            required
          />
          <input type="tel" v-model="phoneRef" placeholder="Phone" required />
          <button type="submit" class="button__group-send">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .another-header {
    position: relative;
    z-index: 1;
    display: flex;
    padding: 2.222rem 0;
    &-button {
      color: black;

      font-size: 1rem;
    }
  }
</style>
