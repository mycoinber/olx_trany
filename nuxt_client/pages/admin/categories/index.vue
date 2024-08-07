<template>
  <section>
    <h1>All Categories</h1>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else>
      <div v-for="category in data" :key="category._id">
        <h2>
          <NuxtLink :to="`/admin/categories/${category._id}`">{{
            category.title
          }}</NuxtLink>
        </h2>
        <p>{{ category.description }}</p>
        <!-- <img :src="category.photo" alt="Category photo" v-if="category.photo" /> -->

        <hr />
        <!-- Разделитель между категориями -->

        <!-- Other content here -->
      </div>
    </div>
    <button @click="goToAddCategoryPage">Add Category</button>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: "admin",
  });

  import { useQuery } from "@tanstack/vue-query";
  import instance from "~/utils/axios"; // ваш экземпляр axios

  const router = useRouter();

  const goToAddCategoryPage = () => {
    router.push("/admin/categories/add"); // Путь к странице добавления категории
  };

  const fetchCategories = async () => {
    const response = await instance.get("/category");
    return response.data;
  };

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
</script>
