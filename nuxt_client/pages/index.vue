<script lang="ts" setup>
  import { useQuery } from "@tanstack/vue-query";

  const fetchPosts = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const { data: posts, isLoading, error } = useQuery("posts", fetchPosts);
</script>

<template>
  <section class="grid">
    <h1>crm system</h1>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
  }
</style>
