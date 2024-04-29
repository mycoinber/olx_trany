<template>
  <div>
    <div v-if="isLoading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>{{ data }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { useQuery } from "@tanstack/vue-query";
  import { onServerPrefetch } from "vue";
  import instance from "../utils/axios";

  const { data, isLoading, error, refetch, suspense } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await instance.get("/user");
      if (response.status !== 200) {
        throw new Error("Network response was not ok");
      }
      return response.data;
    },
  });

  onServerPrefetch(suspense);
</script>
