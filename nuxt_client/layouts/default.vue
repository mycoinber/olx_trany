<script lang="ts" setup>
  import { onMounted } from "vue";

  const auth = useAuthStore();

  onMounted(async () => {
    await auth.initialize();
  });
</script>

<template>
  <LayoutHeader />
  <section class="grid">
  
    <slot />
  </section>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
  }
</style>
