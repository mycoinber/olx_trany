<script lang="ts" setup>
  import { ADMIN_MENU_DATA } from "./menu.data";
</script>

<template>
  <aside>
    <NuxtLink v-for="item in ADMIN_MENU_DATA" :key="item.name" :to="item.url">
      <Icon :name="item.icon"
        ><span>{{ item.name }}</span></Icon
      >
    </NuxtLink>
  </aside>
</template>

<style></style>
