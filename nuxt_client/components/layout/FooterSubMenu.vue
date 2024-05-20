<script lang="ts" setup>
import { FOOTER_SUB_DATA } from "./footersub.data";
</script>

<template>
  <nav class="navigation">
    <NuxtLink v-for="item in FOOTER_SUB_DATA" :key="item.name" :to="item.url">
      <span>{{ item.name }}</span>
    </NuxtLink>
  </nav>
</template>

<style>
.navigation {
  display: flex;
  gap: 9.722rem;
  a {
    text-transform: uppercase;
    font-weight: 500;
    line-height: 0.933rem;
    font-size: 0.778rem;
  }
}
</style>
