<script lang="ts" setup>
  const auth = useAuthStore();

  onMounted(async () => {
    await auth.initialize();
  });
</script>

<template>
  <LayoutHeader />
  <div>
    <slot />
  </div>

  <LayoutFooter class="container" />
</template>

<style scoped lang="scss">
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
