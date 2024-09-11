<template>
  <section class="hero" v-if="OFFER_DATA && OFFER_DATA.length > 0">
    <div class="container">
      <div class="hero-wrapper">
        <OfferCard :type="'type1'" :data="OFFER_DATA[0]" />
        <div class="hero-wrapper__small" v-if="OFFER_DATA.length > 2">
          <OfferCard :type="'type2'" :data="OFFER_DATA[1]" />
          <OfferCard :type="'type2'" :data="OFFER_DATA[2]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useQuery } from "@tanstack/vue-query";
  import instance from "~/utils/axios"; // ваш экземпляр axios

  // Определение функции для загрузки данных об офферах с сервера
  const fetchOffers = async () => {
    const response = await instance.get("/offer?block=hero&limit=3"); // Предполагается, что на сервере есть маршрут для получения всех офферов

    const resp = response.data.map((offer: any) => ({
      title: offer.title,
      _id: offer._id,
      image: offer.images[0] ? `http://localhost:3001/${offer.images[0]}` : "",
      price: offer.price.toString(),
      location: offer.category.title,
      date: "3 days ago",
      square: offer.metadata.find((field: any) => field.fieldName === "square")
        .values[0],
    }));

    return resp;
  };

  // Запрос к серверу для загрузки данных об офферах
  const {
    data: OFFER_DATA,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["hero"],
    queryFn: fetchOffers,
  });
</script>

<style lang="scss">
  .hero {
    padding-top: 3.333rem;
    margin-bottom: 7.222rem;
    &-wrapper {
      display: grid;
      grid-template-columns: 50% 1fr;
      gap: 0.889rem;

      &__small {
        display: flex;
        flex-direction: column;
        gap: 0.889rem;
      }
    }
  }
</style>
