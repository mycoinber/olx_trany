<template>
  <div class="filter">
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

    <button class="filter__reset" @click="resetFilters">Reset filters</button>

    <div class="filter__search">
      <label for="location">
        <input
          id="location"
          v-model="filters.location"
          placeholder="LOCATION"
        />
      </label>
    </div>

    <span class="filter__line"></span>

    <div class="filter__gap">
      <span class="filter__name">Category:</span>
      <div
        v-for="category in categories"
        :key="category"
        class="custom-checkbox"
      >
        <input
          type="checkbox"
          :value="category"
          v-model="filters.category"
          id="category-{{ category }}"
        />
        <label for="category-{{ category }}">{{ category }}</label>
      </div>
    </div>

    <span class="filter__line"></span>

    <div class="filter__gap">
      <span class="filter__name">Property Type:</span>
      <div v-for="type in propertyTypes" :key="type" class="custom-checkbox">
        <input
          type="checkbox"
          :value="type"
          v-model="filters.propertyType"
          id="property-type-{{ type }}"
        />
        <label for="property-type-{{ type }}">{{ type }}</label>
      </div>
    </div>

    <span class="filter__line"></span>

    <div class="filter__gap">
      <span class="filter__name">Rooms Number:</span>
      <div v-for="rooms in roomNumbers" :key="rooms" class="custom-checkbox">
        <input
          type="checkbox"
          :value="rooms"
          v-model="filters.rooms"
          id="rooms-{{ rooms }}"
        />
        <label for="rooms-{{ rooms }}">{{ rooms }}</label>
      </div>
    </div>

    <span class="filter__line"></span>

    <div class="filter__gap">
      <span class="filter__name">Seller Type:</span>
      <div v-for="seller in sellerTypes" :key="seller" class="custom-checkbox">
        <input
          type="checkbox"
          :value="seller"
          v-model="filters.sellerType"
          id="seller-{{ seller }}"
        />
        <label for="seller-{{ seller }}">{{ seller }}</label>
      </div>
    </div>

    <span class="filter__line"></span>

    <div class="filter__range filter__gap">
      <span class="filter__name">Price :</span>
      <div class="filter__range-names">
        <label>{{ minValue }} PGK</label>
        <label> {{ maxValue }} PGK</label>
      </div>
      <div class="range-slider">
        <input
          type="range"
          v-model.number="minValue"
          :min="min"
          :max="max"
          @input="updateMinValue"
        />
        <input
          type="range"
          v-model.number="maxValue"
          :min="min"
          :max="max"
          @input="updateMaxValue"
        />
      </div>
    </div>

    <span class="filter__line"></span>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const categories = ref(["Apartment", "House", "Condo"]);
  const propertyTypes = ref(["Residential", "Commercial", "Land"]);
  const roomNumbers = ref(["1", "2", "3", "4+"]);
  const sellerTypes = ref(["Owner", "Agent", "Developer"]);

  const min = 100;
  const max = 10000;

  const minValue = ref(min);
  const maxValue = ref(max);

  const filters = ref({
    location: "",
    category: [],
    propertyType: [],
    rooms: [],
    sellerType: [],
    minPrice: minValue.value,
    maxPrice: maxValue.value,
  });

  const selectedFilters = computed(() => ({
    Location: filters.value.location,
    Category: filters.value.category.join(", "),
    "Property Type": filters.value.propertyType.join(", "),
    "Rooms Number": filters.value.rooms.join(", "),
    "Seller Type": filters.value.sellerType.join(", "),
    "Price Range":
      minValue.value !== min || maxValue.value !== max
        ? `${minValue.value} PGK - ${maxValue.value} PGK`
        : "",
  }));

  const filteredSelectedFilters = computed(() =>
    Object.fromEntries(
      Object.entries(selectedFilters.value).filter(
        ([, value]) => value && value !== ""
      )
    )
  );

  const resetFilters = () => {
    filters.value = {
      location: "",
      category: [],
      propertyType: [],
      rooms: [],
      sellerType: [],
      minPrice: min,
      maxPrice: max,
    };
    minValue.value = min;
    maxValue.value = max;
  };

  const removeFilter = (key) => {
    switch (key) {
      case "Location":
        filters.value.location = "";
        break;
      case "Category":
        filters.value.category = [];
        break;
      case "Property Type":
        filters.value.propertyType = [];
        break;
      case "Rooms Number":
        filters.value.rooms = [];
        break;
      case "Seller Type":
        filters.value.sellerType = [];
        break;
      case "Price Range":
        minValue.value = min;
        maxValue.value = max;
        break;
    }
  };
</script>

<style scoped lang="scss">
  .filter {
    max-width: 15.056rem;
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
</style>
