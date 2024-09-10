<template>
  <section class="hero" v-if="heroData && heroData.length > 0">
    <div class="container">
      <div class="hero-wrapper">
        <OfferCard :type="'type1'" :offer="heroData[0]" />
        <div class="hero-wrapper__small" v-if="heroData.length > 2">
          <OfferCard :type="'type2'" :offer="heroData[1]" />
          <OfferCard :type="'type2'" :offer="heroData[2]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useQuery } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();

  const fetchServices = async ({ queryKey }) => {
    const [_key, { limit, category }] = queryKey;

    try {
      const response = await $axios.get(`/offer`, {
        params: { category, limit },
      });
      return response.data; // Возвращаем данные, если запрос успешен
    } catch (error) {
      // Обрабатываем ошибку и выводим ее в консоль
      console.error("Error fetching services:", error);

      // Можно вернуть пустой массив или значение по умолчанию, чтобы избежать ошибок в компоненте
      return [];
    }
  };

  const {
    data: heroData,
    isError,
    refetch,
    suspense,
  } = useQuery({
    queryKey: computed(() => [
      "offers",
      {
        category: "",
        limit: 3,
      },
    ]),
    queryFn: fetchServices,
    suspense: true,
  });

  onServerPrefetch(async () => {
    await suspense();
  });
</script>

<style lang="scss">
  .hero {
    padding-top: 3.333rem;
    margin-bottom: 7.222rem;
    &-wrapper {
      display: flex;
      flex-direction: row;
      gap: 0.889rem;

      &__small {
        display: flex;
        flex-direction: column;
        gap: 0.889rem;
      }
    }
  }
</style>
