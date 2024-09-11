<script setup>
  definePageMeta({
    layout: "offer",
    middleware: "auth",
  });
  const authStore = useAuthStore();
</script>

<template>
  <div>
    <div v-if="authStore.isAuthenticated">
      <AccountOffers />
    </div>
  </div>
</template>

<style scoped></style>
