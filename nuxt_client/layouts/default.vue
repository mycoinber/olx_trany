<script lang="ts" setup>
  import { onMounted } from "vue";

  const auth = useAuthStore();
  const { isMobile } = useDevice();

  onMounted(async () => {
    await auth.initialize();
  });
</script>

<template>
  <LayoutHeader v-if="!isMobile" />
  <LayoutMobileHeader v-if="isMobile" />
  <div>
    <slot />
  </div>

  <LayoutFooter class="container" />
</template>

<style scoped>
  .container {
    width: 75.556rem;
    margin: 0 auto;
    max-width: 100%;
  }
  /* .grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
  } */
</style>
