<template>
  <main>
    <MainHero class="container" />
    <MainRent class="container" />
    <MainSale class="container" />
    <MainCommercial class="container" />
    <MainAd />
    <MainLocation />
    <MainBlog />
    <MainAbout />
  </main>
</template>

<script setup>
  import { useQuery } from "@tanstack/vue-query";
  import { useNuxtApp, useRuntimeConfig } from "#app";
  import { onServerPrefetch } from "vue";
  const { $axios } = useNuxtApp();
</script>

<style scoped lang="scss">
  .container {
    width: 75.556rem;
    margin: 0 auto;
    max-width: 100%;
  }
</style>
