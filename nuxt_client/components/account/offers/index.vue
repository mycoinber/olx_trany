<script setup>
  import { ref } from "vue";
  import { useMutation, useQuery } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();
  const config = useRuntimeConfig();

  const formData = ref({});
  const validationErrors = ref({});
  const reset = ref(false);

  const baseURL = process.server
    ? "http://odito_back:3000"
    : config.public.backHost;

  const notification = useNotificationStore();

  const fetchOffers = async () => {
    const response = await $axios.get("/offer/get-my-offers");
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: computed(() => ["offers"]),
    queryFn: () => fetchOffers(),
  });

  const authStore = useAuthStore();
</script>

<template>
  <div class="container">
    <div class="list" v-if="isLoading && authStore.isAuthenticated">
      Loadding...
    </div>
    <div class="list" v-if="data">
      <div class="offer" v-for="item in data" :key="item._id">
        <AccountOffer :offer="item" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container,
  .details,
  .confirmation {
    display: flex;
    flex-direction: column;
    gap: 0.889rem;
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 0.889rem;
  }

  .offer {
    width: 59.78rem;
    height: 16.28rem;
    background-color: $white;
    border-radius: 0.28rem;
  }
</style>
