<template>
  <section class="hero" v-if="heroData && heroData.length > 0">
    <div class="container">
      <div class="hero-wrapper" v-if="isMobile">
        <Swiper
          :slidesPerView="'auto'"
          :modules="modules"
          :navigation="{
            nextEl: '.control__button-right',
            prevEl: '.control__button-left',
          }"
        >
          <SwiperSlide v-for="(offer, index) in heroData" :key="index">
            <OfferCard :type="'type1'" :offer="offer" />
          </SwiperSlide>
        </Swiper>
        <div class="control">
          <div class="control__button control__button-left">
            <Icon name="weui:arrow-outlined" />
          </div>
          <div class="control_pag">1-3</div>
          <div class="control__button control__button-right">
            <Icon name="weui:arrow-outlined" />
          </div>
        </div>
      </div>

      <div class="hero-wrapper" v-else>
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
  import { Navigation } from "swiper/modules";

  const modules = [Navigation];

  const { $axios } = useNuxtApp();

  const { isMobile } = useDevice();

  const fetchServices = async ({ queryKey }) => {
    const [_key, { limit, category }] = queryKey;

    try {
      const response = await $axios.get(`/offer`, {
        params: { category, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching services:", error);
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

  // onServerPrefetch(async () => {
  //   await suspense();
  // });

  onMounted(() => {
    refetch();
  });
</script>

<style lang="scss">
  .hero {
    padding-top: 1.143rem;
    padding-bottom: 7.222rem;
    @include media(mobile) {
      padding-bottom: 2.143rem;
    }
    &-wrapper {
      display: flex;
      flex-direction: row;
      gap: 0.889rem;
      @include media(mobile) {
        flex-direction: column;
        gap: 1.714rem;
      }

      &__small {
        display: flex;
        flex-direction: column;
        gap: 0.889rem;
      }
    }
  }

  @include media(mobile) {
    .swiper-pagination-bullet {
      background-color: #000;
    }

    .swiper {
      width: 100%;
      padding-left: 1.143rem;
    }

    .swiper-slide {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 23.93rem;
      margin-right: 0.571rem;
    }

    .control {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 1.143rem;
      width: 100%;

      &__button {
        width: 1.3rem;
        height: 1.3rem;

        svg {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        &-left {
          svg {
            transform: rotate(180deg);
          }
        }
      }
    }

    .custom-pagination {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    .custom-pagination .swiper-pagination-bullet {
      background-color: #000;
      width: 10px;
      height: 10px;
      margin: 0 5px;
    }
  }
</style>
