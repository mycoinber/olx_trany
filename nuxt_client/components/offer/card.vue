//card.vue
<template>
  <a :class="['card', `card--${type}`]" href="#">
    <div v-if="offer.badge" class="badge">{{ offer.badge }}</div>
    <div class="card-image">
      <NuxtImg
        provider="myCustom"
        :src="props.offer.media[0].filename"
        :alt="props.offer.title"
        width="200"
        height="100"
        loading="lazy"
      />
    </div>
    <div class="card-details">
      <div class="card-details__top">
        <h2 class="card-details__title">{{ offer.title }}</h2>
        <p class="card-details__price">
          {{ offer.salePrice }} {{ offer.currency }}
        </p>
      </div>
      <div class="card-details__bottom">
        <div class="card-details__inner">
          <span
            >{{ offer.city.toponymName || "" }},
            {{ offer.city.countryName || "" }}</span
          >
          <span>{{ offer.date }}</span>
        </div>

        <div v-if="offer.totalArea" class="card-square">
          <Icon class="icon" name="ph:unite-square" />
          <span>{{ offer.totalArea }}м²</span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup>
  const props = defineProps({
    offer: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      default: "",
    },
  });

  const { type, offer } = props;

  const config = useRuntimeConfig();

  const baseURL = config.public.backHost;
</script>

<style lang="scss">
  .card {
    background: #ffffff;
    border-radius: 0.6rem;
    position: relative;

    .badge {
      border-radius: 0.22rem;
      padding: 0.38rem 0.44rem;
      backdrop-filter: blur(7.733333110809326px);
      background: $color-06;
      z-index: 10;
      position: absolute;
      left: 0.889rem;
      top: 0.889rem;
      font-weight: 700;
      font-size: 0.78rem;
      text-transform: uppercase;
      color: $white;
    }

    img {
      width: 100%;
      object-fit: cover;
      height: 100%;
    }
    &-square {
      display: flex;
      gap: 0.222rem;
      align-items: center;
    }
    &-details {
      padding: 0.889rem;
      &__bottom {
        span {
          font-weight: 500;
          font-size: 0.778rem;
          line-height: 0.933rem;
          color: #8a7d80;

          @include media(mobile) {
            font-size: 1rem;
            line-height: 1.214rem;
          }
        }
      }

      &__inner {
        display: flex;
        gap: 0.4rem;
      }

      &__title {
        font-size: 1.333rem;
        font-weight: 500;
        line-height: 1.6rem;
        color: $color-02;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;

        @include media(mobile) {
          font-size: 1.14rem;
        }
      }

      &__price {
        font-size: 1.333rem;
        font-weight: 700;
        line-height: 1.6rem;
        color: $color-02;

        @include media(mobile) {
          font-size: 1.14rem;
          font-weight: 600;
        }
      }
    }
  }

  .card--type1 {
    width: 40.5rem;
    height: 33rem;

    @include media(mobile) {
      width: 23.93rem;
      height: 31.29rem;
      max-width: 23.93rem;
    }
    .card-image {
      width: 100%;
      height: 24.111rem;
      @include media(mobile) {
        height: 22.429rem;
      }

      img {
        border-radius: 0.6rem 0.6rem 0 0;
        height: 100%;
      }
    }
    .card-details {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 8.857rem;
      gap: 1.778rem;
      &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media(mobile) {
          align-items: flex-start;
        }
      }
      &__title {
        max-width: 70%;
      }
    }
  }

  .card--type2 {
    width: 34.17rem;
    height: 16.06rem;
    display: flex;

    .card-image {
      width: 16.056rem;
      min-width: 16.056rem;
      height: 16.056rem;
      img {
        height: 100%;
        width: 100%;
        border-radius: 0.6rem 0 0 0.6rem;
      }
    }
    .card-details {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      &__title {
        margin-bottom: 0.889rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* Ограничение до двух строк */
        overflow: hidden; /* Обрезает текст, который выходит за пределы блока */
        text-overflow: ellipsis; /* Добавляет многоточие в конце обрезанного текста */
        line-height: 1.2em; /* Высота строки */
        max-height: 2.4em; /* Ограничение высоты текста, чтобы он занимал не более двух строк */
        word-wrap: break-word;
      }
    }
  }
  .card--type3 {
    border-radius: 0.6rem;
    max-width: 30.611rem;
    width: 100%;

    .card-image {
      width: 100%;
      height: 21.056rem;

      img {
        border-radius: 0.6rem 0.6rem 0 0;
        height: 100%;
      }
    }
    .card-details {
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      border-radius: 0 0 0.6rem 0.6rem;
      gap: 2.222rem;
      height: 11.833rem;
      &__title {
        margin-bottom: 0.889rem;
      }
    }
  }

  .card--type4 {
    border-radius: 0.22rem;
    max-width: 19.33rem;
    width: 100%;

    .card-image {
      width: 100%;
      height: 17.278rem;

      img {
        border-radius: 0.22rem 0.22rem 0 0;
        height: 100%;
      }
    }
    .card-details {
      background: #ffffff;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      border-radius: 0 0 0.22rem 0.22rem;
      gap: 0.889rem;
      height: 9.778rem;
      &__title {
        margin-bottom: 0.889rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* Ограничение до двух строк */
        overflow: hidden; /* Обрезает текст, который выходит за пределы блока */
        text-overflow: ellipsis; /* Добавляет многоточие в конце обрезанного текста */
        line-height: 1.2em; /* Высота строки */
        max-height: 2.4em; /* Ограничение высоты текста, чтобы он занимал не более двух строк */
        word-wrap: break-word;
        font-size: 1rem;
      }

      &__price {
        font-size: 1rem;
      }
    }
  }

  .card--type5 {
    background-color: $color-01;
    width: 40.5rem;
    height: 33rem;

    @include media(mobile) {
      width: 23.93rem;
      height: 31.29rem;
      max-width: 23.93rem;
    }
    .card-image {
      width: 100%;
      height: 24.111rem;
      @include media(mobile) {
        height: 22.429rem;
      }

      img {
        border-radius: 0.6rem 0.6rem 0 0;
        height: 100%;
      }
    }
    .card-details {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 8.857rem;
      gap: 1.778rem;
      &__top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media(mobile) {
          align-items: flex-start;
        }
      }
      &__title {
        max-width: 70%;
      }
    }
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.875rem;
    color: #8a7d80;
    .icon {
      display: flex;
      margin-right: 0.4rem;
      align-items: center;

      svg {
        width: 1.2rem;
        height: 1.2rem;
        color: $color-04;
      }
    }
  }
</style>
