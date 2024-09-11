<script setup>
  definePageMeta({
    layout: "account",
    middleware: "auth",
  });
</script>

<template>
  <div>
    <h1>Edit an offer</h1>
    <AccountOffersEdit />
  </div>
</template>

<style scoped>
  h1 {
    margin-top: 2.222rem;
    margin-bottom: 2.222rem;
    font-size: 2.44rem;
  }
</style>
