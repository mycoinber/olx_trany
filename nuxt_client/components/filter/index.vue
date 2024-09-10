<template>
  <div class="container">
    <div class="filter" v-if="screenWidth > 541">
      <h2 class="filter__title">Filters</h2>

      <div class="filter__setup">
        <span
          class="filter__setup-rounds"
          v-for="(value, key) in filteredSelectedFilters"
          :key="key"
        >
          {{ value }}
          <span class="filter__close" @click="removeFilter(key)">&#10005;</span>
        </span>
      </div>

      <FilterLocations
        :cities="filterResult?.cities || []"
        @citySelected="citySelected"
      />
      <span class="filter__line"></span>
      <FilterCategory :selected="filters.category" />
      <span class="filter__line"></span>
    </div>
    <div class="results results__container">
      <div class="results__headline">
        <div class="results__count">1,268,817 ads Stuff for Sale</div>
        <div class="results__sort">Most recent first</div>
      </div>
      <div
        v-if="filterResult"
        :class="`results__items results__items_${tablet}`"
      >
        <div
          v-for="(item, index) in filterResult?.offers"
          class="results__item"
        >
          <OfferCard
            :key="index"
            :type="tablet === 'grid' ? 'type4' : 'type2'"
            :offer="item"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, watch, onMounted } from "vue";
  import { useQuery } from "@tanstack/vue-query";

  const route = useRoute();
  const router = useRouter();
  const { $axios } = useNuxtApp();
  const tablet = ref("grid");

  // Добавляем реактивное свойство для ширины экрана
  const screenWidth = ref(542);

  // Функция для обновления ширины экрана
  const updateScreenWidth = () => {
    screenWidth.value = window.innerWidth;
  };

  // Проверяем, выполняется ли код на клиенте, и только тогда добавляем слушатель
  onMounted(() => {
    if (process.client) {
      screenWidth.value = window.innerWidth; // Инициализируем ширину экрана при монтировании
      window.addEventListener("resize", updateScreenWidth);
    }
  });

  onBeforeUnmount(() => {
    if (process.client) {
      window.removeEventListener("resize", updateScreenWidth);
    }
  });

  // Примерные категории и другие данные для фильтров
  const categories = ref(["Apartment", "House", "Condo"]);
  const propertyTypes = ref(["Residential", "Commercial", "Land"]);
  const roomNumbers = ref(["1", "2", "3", "4+"]);
  const sellerTypes = ref(["Owner", "Agent", "Developer"]);

  const min = 100;
  const max = 10000;

  const minValue = ref(min);
  const maxValue = ref(max);

  const categoryMapping = {
    "to-rent": "Rent",
    "for-sale": "Sale",
  };

  const selectedCategory = ref(categoryMapping[route.params.category] || "");

  const formatLocation = (slug) => {
    return slug
      .split("-") // Разделение строки по дефисам
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Перевод первого символа каждого слова в верхний регистр
      .join(" "); // Объединение слов без дефисов
  };

  const filters = ref({
    location: formatLocation(route.params.slug[0] || ""),
    category: selectedCategory.value,
    propertyType: [],
    bedrooms: [],
    sellerType: [],
    minSalePrice: "",
    maxSalePrice: "",
    minTotalArea: "",
    maxTotalArea: "",
    minLendArea: "",
    maxLendArea: "",
    minFloorArea: "",
    maxFloorArea: "",
    bathrooms: [],
    parkings: [],
    furnishings: "",
    typeOfHouse: "",
    features: [],
  });

  // Выбранные фильтры
  const selectedFilters = computed(() => ({
    Location: filters.value.location,
  }));

  const filteredSelectedFilters = computed(() =>
    Object.fromEntries(
      Object.entries(selectedFilters.value).filter(
        ([, value]) => value && value !== ""
      )
    )
  );

  // Удаление фильтра
  const removeFilter = (key) => {
    if (key === "Location") {
      filters.value.location = "";
      refetch();
    }
  };

  // Функция обработки выбора города
  const citySelected = (city) => {
    filters.value.location = city.value;

    const currentSlug = router.currentRoute.value.params.slug || [];
    const newSlug = currentSlug.slice(1); // Удаляем старый slug
    newSlug.unshift(city.slug); // Добавляем новый slug

    router.push({
      params: {
        category: router.currentRoute.value.params.category,
        slug: newSlug,
      },
    });
  };

  // Извлечение slug из маршрута и настройка фильтров
  const updateLocationFromSlug = () => {
    const currentSlug = router.currentRoute.value.params.slug || [];

    if (currentSlug.length) {
      const slug = currentSlug[0]; // Первый элемент slug — это город
      const city = filterResult.value?.cities?.find(
        (city) => city.slug === slug
      );
      if (city) {
        filters.value.location = city.value; // Устанавливаем фильтр на основании slug
      }
    }
  };

  // Обновление данных на основании slug после загрузки
  onMounted(() => {
    updateLocationFromSlug();
  });

  // Обновляем фильтры при изменении slug
  watch(
    () => route.params.slug,
    () => {
      updateLocationFromSlug();
    }
  );

  // Запрос данных с сервера для фильтрации
  const fetchOffers = async ({ queryKey }) => {
    const [
      _key,
      {
        limit,
        category,
        propertyType,
        minSalePrice,
        maxSalePrice,
        minTotalArea,
        maxTotalArea,
        minLendArea,
        maxLendArea,
        minFloorArea,
        maxFloorArea,
        bedrooms,
        bathrooms,
        parkings,
        furnishings,
        typeOfHouse,
        features,
        location,
      },
    ] = queryKey;

    const response = await $axios.get(`/offer/get-filters`, {
      params: {
        limit,
        category,
        propertyType,
        minSalePrice,
        maxSalePrice,
        minTotalArea,
        maxTotalArea,
        minLendArea,
        maxLendArea,
        minFloorArea,
        maxFloorArea,
        bedrooms,
        bathrooms,
        parkings,
        furnishings,
        typeOfHouse,
        features,
        location,
      },
    });
    return response.data;
  };

  // Использование useQuery для получения данных
  const {
    data: filterResult,
    refetch,
    suspense,
  } = useQuery({
    queryKey: computed(() => [
      "offers",
      {
        limit: 20,
        category: filters.value.category,
        propertyType: filters.value.propertyType,
        minSalePrice: filters.value.minSalePrice,
        maxSalePrice: filters.value.maxSalePrice,
        minTotalArea: filters.value.minTotalArea,
        maxTotalArea: filters.value.maxTotalArea,
        minLendArea: filters.value.minLendArea,
        maxLendArea: filters.value.maxLendArea,
        minFloorArea: filters.value.minFloorArea,
        maxFloorArea: filters.value.maxFloorArea,
        bedrooms: filters.value.bedrooms,
        bathrooms: filters.value.bathrooms,
        parkings: filters.value.parkings,
        furnishings: filters.value.furnishings,
        typeOfHouse: filters.value.typeOfHouse,
        features: filters.value.features,
        location: filters.value.location,
      },
    ]),
    queryFn: fetchOffers,
  });

  onServerPrefetch(async () => {
    await suspense();
  });

  // Обновляем фильтры и данные при изменении других фильтров
  watch(
    filters,
    () => {
      refetch();
    },
    { deep: true }
  );
</script>

<style scoped lang="scss">
  .container {
    width: 75.556rem;
    margin: 0 auto;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    gap: 3.056rem;
  }
  .filter {
    max-width: 12.722rem;
    width: 100%;

    &__title {
      font-weight: 500;
      font-size: 0.778rem;
      line-height: 0.933rem;
      color: #8a7d80;
      margin-bottom: 1.333rem;
    }

    &__line {
      border-bottom: 0.056rem solid #141414;
      display: block;
      opacity: 0.3;
      margin-bottom: 0.889rem;
    }

    &__reset {
      background: none;
      outline: none;
      font-weight: 500;
      font-size: 0.778rem;
      line-height: 0.933rem;
      color: #8a7d80;
      text-transform: uppercase;
      border: none;
      text-decoration: underline;
      cursor: pointer;
      margin-bottom: 1.333rem;
    }

    &__search {
      margin-bottom: 0.889rem;
      #location {
        padding: 0.889rem;
        background: #ffffff;
        border: none;
        width: 100%;
      }
    }

    &__setup {
      margin-bottom: 0.889rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem;

      &-rounds {
        border-radius: 7rem;
        border: 0.05rem solid #1414141a;
        padding: 0.25rem 0.5rem;
        font-weight: 500;
        color: #141414;
        font-size: 0.7rem;
        line-height: 0.84rem;
        margin-right: 0.25rem;
        display: flex;
        align-items: center;
      }

      .filter__close {
        margin-left: 0.5rem;
        cursor: pointer;
        font-size: 0.8rem;
        color: #981e32;
      }
    }

    .range-slider {
      position: relative;
      width: 100%;
    }

    input[type="range"] {
      position: absolute;
      width: 100%;
      pointer-events: none;
      -webkit-appearance: none;
    }

    .range-slider input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.3rem;
      cursor: pointer;
      background: #981e32;
      border-radius: 0.15rem;
    }

    input[type="range"]::-webkit-slider-thumb {
      pointer-events: all;
      position: relative;
      z-index: 2;
      -webkit-appearance: none;
      appearance: none;
      width: 0.8rem;
      height: 0.8rem;
      background: #981e32;
      cursor: pointer;
      border-radius: 50%;
      margin-top: -0.25rem;
      position: relative;
      z-index: 2;
    }

    input[type="range"]::-moz-range-thumb {
      pointer-events: all;
      position: relative;
      z-index: 2;
    }

    &__gap {
      margin-bottom: 0.8rem;
      label {
        color: #8a7d80;
        font-weight: 500;
        font-size: 0.7rem;
        line-height: 0.84rem;
      }
    }

    &__name {
      font-weight: 500;
      font-size: 0.7rem;
      line-height: 0.84rem;
      color: #8a7d80;
      display: block;
      margin-bottom: 0.8rem;
    }

    .custom-checkbox {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    input[type="checkbox"] {
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      width: 1rem;
      height: 1rem;
      background-color: transparent;
      border: 0.1rem solid transparent;
      border-radius: 0.2rem;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    input[type="checkbox"]::before {
      content: "";
      position: absolute;
      width: 0.3rem;
      height: 0.3rem;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #141414;
      opacity: 0;
      border-radius: 0.1rem;
      transition: opacity 0.2s;
      border-radius: 50%;
    }

    input[type="checkbox"]:checked::before {
      opacity: 1;
    }

    label {
      color: #8a7d80;
      font-weight: 500;
      font-size: 0.7rem;
      line-height: 0.84rem;
      cursor: pointer;
    }

    &__range {
      margin-bottom: 1.88rem;
      &-names {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.4rem;
      }
    }
  }

  .results {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1.333rem;

    &__headline {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    &__items {
      &_grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr); // 3 колонки
        gap: 0.889rem;
      }
    }
  }
</style>
