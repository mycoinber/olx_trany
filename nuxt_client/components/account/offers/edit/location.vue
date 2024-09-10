<script setup>
  import { ref, computed } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { useQuery } from "@tanstack/vue-query";
  import { useNuxtApp } from "#app";

  const { $axios } = useNuxtApp();

  const props = defineProps({
    errors: {
      type: Object,
      default: () => ({}),
    },
    reset: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const isOpen = ref(false);
  const cityInput = ref(
    `${props.data.city.name}, ${props.data.city.countryName}` || ""
  );
  const dropdownRef = ref(null);
  const cityData = ref(null);

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const selectCategory = (city) => {
    cityInput.value = `${city.name}, ${city.countryName}`;
    isOpen.value = false;
    cityData.value = city;
  };

  const fetchCities = async ({ queryKey }) => {
    const [_key, { query }] = queryKey;
    const response = await $axios.get("/cities/search", {
      params: { query },
    });
    return response.data;
  };

  const { data: cities, refetch } = useQuery({
    queryKey: computed(() => ["cities", { query: cityInput.value }]),
    queryFn: fetchCities,
    enabled: false, // Disable automatic fetching
    cacheTime: 5 * 60 * 1000, // Cache time (e.g., 5 minutes)
    staleTime: 1 * 60 * 1000, // Stale time (e.g., 1 minute)
  });

  const onInput = () => {
    if (cityInput.value.length >= 3) {
      refetch();
    }
  };

  onClickOutside(dropdownRef, () => {
    isOpen.value = false;
  });

  const emit = defineEmits(["update:formData"]);

  watch(
    cityData,
    () => {
      emit("update:formData", { city: { ...cityData.value } });
    },
    { deep: true }
  );

  const locationRef = ref(null);

  watch(
    () => props.errors,
    (newErrors) => {
      if (
        Object.keys(newErrors).length > 0 &&
        Object.keys(newErrors).indexOf("city") === 0
      ) {
        nextTick(() => {
          locationRef.value?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    { immediate: true, deep: true }
  );

  const { reset } = toRefs(props);

  watch(reset, () => {
    cityInput.value = "";
    cityData.value = null;
  });
</script>

<template>
  <div class="wrapper" ref="locationRef">
    <div class="headline">
      <h2>Location*</h2>
      <span>8/8</span>
    </div>

    <div class="group">
      <div class="title">
        <div class="icon">
          <Icon name="carbon:requirement-usage" />
          <span v-if="props.errors.city" class="error-message">
            {{ props.errors.city }}
          </span>
          <span v-else>Start typing city name</span>
        </div>
      </div>
      <input
        type="text"
        id="cityInput"
        placeholder="City"
        v-model="cityInput"
        @input="onInput"
        @focus="toggleDropdown"
      />
      <ul
        v-if="isOpen && cities?.geonames.length"
        ref="dropdownRef"
        class="options"
      >
        <li
          v-for="city in cities.geonames"
          :key="city.geonameId"
          @click="selectCategory(city)"
        >
          {{ city.name }}, {{ city.countryName }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .error-message {
    color: red;
  }
  .wrapper {
    width: 100%;
    padding: 2.222rem;
    background-color: #fff;
    border-radius: 0.313rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    .headline {
      font-size: 1.33rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .group {
      width: 47.778rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      position: relative;

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

      input {
        font-size: 0.875rem;
        color: black;
        padding: 0.889rem;
        border-radius: 0.313rem;
        background-color: #f4f4f4;

        &::placeholder {
          color: #141414;
          text-transform: uppercase;
          font-weight: 500;
        }
      }

      .options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 0.313rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        margin-top: 0.5rem;
        z-index: 10;

        li {
          padding: 1rem;
          cursor: pointer;
          &:hover {
            background-color: #f4f4f4;
          }
        }
      }
    }
  }
</style>
