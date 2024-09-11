<template>
  <section class="commercial" v-if="rentData && rentData.length > 0">
    <div class="container">
      <h2 class="rent-title">Top Commercial</h2>
      <div class="rent-wrapper" v-if="isMobile">
        <Swiper
          :slidesPerView="'auto'"
          :modules="modules"
          :navigation="{
            nextEl: '.com-right',
            prevEl: '.com-left',
          }"
        >
          <SwiperSlide v-for="(offer, index) in rentData" :key="index">
            <OfferCard :type="'type1'" :offer="offer" />
          </SwiperSlide>
        </Swiper>
        <div class="control">
          <div class="control__button control__button-left com-left">
            <Icon name="weui:arrow-outlined" />
          </div>
          <div class="control_pag">1-4</div>
          <div class="control__button control__button-right com-right">
            <Icon name="weui:arrow-outlined" />
          </div>
        </div>
      </div>

      <div class="rent-wrapper" v-if="!isMobile">
        <OfferCard
          v-for="(item, index) in rentData"
          :key="index"
          :type="'type3'"
          :offer="item"
        />
      </div>
      <button class="rent-button">See more</button>
    </div>
  </section>
</template>

<script setup>
  import { useQuery } from "@tanstack/vue-query";
  const { $axios } = useNuxtApp();

  import { Navigation } from "swiper/modules";

  const modules = [Navigation];
  const { isMobile } = useDevice();

  const fetchOfers = async ({ queryKey }) => {
    const [_key, { limit, category, propertyType }] = queryKey;

    try {
      const response = await $axios.get(`/offer`, {
        params: { category, limit, propertyType },
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
    data: rentData,
    isError,
    refetch,
    suspense,
  } = useQuery({
    queryKey: computed(() => [
      "offers",
      {
        category: "",
        propertyType: "commercial",
        limit: 4,
      },
    ]),
    queryFn: fetchOfers,
    suspense: true,
  });

  onServerPrefetch(async () => {
    await suspense();
  });
</script>

<style lang="scss">
  .commercial {
    padding: 6.667rem 0;

    @include media(mobile) {
      padding: 2.143rem 0;
    }

    &-title {
      text-align: center;
      margin-bottom: 2.222rem;
      color: #141414;
      line-height: 2.933rem;
      font-weight: 500;
      font-size: 2.444rem;
    }

    &-wrapper {
      display: flex;
      gap: 0.889rem;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.222rem;
      @include media(mobile) {
        flex-direction: column;
        gap: 1.714rem;
      }
    }

    &-button {
      text-transform: uppercase;
      color: #ffffff;
      font-weight: 500;
      font-size: 0.778rem;
      line-height: 0.933rem;
      border: none;
      outline: none;
      padding: 0.889rem 1.806rem;
      background: #981e32;
      border-radius: 0.278rem;
      cursor: pointer;
      margin: 0 auto;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      margin-bottom: 5.667rem;
      width: 9.61rem;
      height: 2.72rem;

      &::after {
        transition: transform 0.3s ease;
        content: "";
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' fill='none'%3E%3Cpath stroke='%23fff' d='m7.5 10.5 5-5m0 0-5-5m5 5H.5'/%3E%3C/svg%3E");
        width: 0.9rem;
        height: 0.6rem;
      }

      &:hover::after {
        transform: translateX(0.2rem);
        -webkit-transform: translateX(0.2rem);
        -moz-transform: translateX(0.2rem);
        -ms-transform: translateX(0.2rem);
        -o-transform: translateX(0.2rem);
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
