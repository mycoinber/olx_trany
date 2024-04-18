<script lang="ts" setup>
</script>

<template>
  <section class="grid">
    <LayoutSidebar />
    <slot />
  </section>
</template>

<style scoped>
.grid {
    display: grid;
  grid-template-columns: 1fr 6fr;
}
</style>


