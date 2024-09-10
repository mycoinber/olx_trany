<template>
  <div class="filter__search">
    <label for="location">
      <input
        id="location"
        v-model="selectedCity"
        placeholder="LOCATION"
        @input="filterCities"
        @focus="showDropdown = true"
      />
    </label>
    <ul v-if="showDropdown && filteredCities.length" class="city-dropdown">
      <li
        v-for="(city, index) in filteredCities"
        :key="index"
        @click="selectCity(city)"
      >
        {{ city.title }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  const props = defineProps({
    cities: {
      type: Array,
      default: () => [],
    },
  });

  const emit = defineEmits(["citySelected"]);

  const selectedCity = ref("");
  const filteredCities = ref([...props.cities]); // Инициализация с копией городов
  const showDropdown = ref(false);

  const filterCities = () => {
    if (selectedCity.value) {
      // Фильтруем только если есть ввод
      filteredCities.value = props.cities.filter((city) =>
        city.title.toLowerCase().includes(selectedCity.value.toLowerCase())
      );
    } else {
      // Если поле пустое, показываем все города
      filteredCities.value = [...props.cities];
    }
  };

  const selectCity = (city) => {
    selectedCity.value = city.title; // Устанавливаем выбранный город в поле инпута
    showDropdown.value = false; // Закрываем выпадающий список
    emit("citySelected", city); // Отправляем событие
  };

  // Обрабатываем изменение пропсов, чтобы обновить города, если они меняются
  watch(
    () => props.cities,
    (newCities) => {
      filteredCities.value = [...newCities];
    },
    { immediate: true } // Обновляем сразу при загрузке компонента
  );
</script>

<style scoped lang="scss">
  .filter {
    max-width: 15.056rem;
    width: 100%;

    &__search {
      position: relative;
      margin-bottom: 0.889rem;
      font-size: 0.78rem;

      #location {
        padding: 0.889rem;
        padding-left: 2rem;
        background: #ffffff;
        border: none;
        width: 100%;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='17' viewBox='0 0 12 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5.95 0C2.6605 0 0 2.6605 0 5.95C0 10.4125 5.95 17 5.95 17C5.95 17 11.9 10.4125 11.9 5.95C11.9 2.6605 9.2395 0 5.95 0ZM5.95 8.075C4.777 8.075 3.825 7.123 3.825 5.95C3.825 4.777 4.777 3.825 5.95 3.825C7.123 3.825 8.075 4.777 8.075 5.95C8.075 7.123 7.123 8.075 5.95 8.075Z' fill='%238a7d80'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 0.7rem center;
        background-size: 0.667rem;
      }

      .city-dropdown {
        position: absolute;
        top: 2.5rem;
        width: 100%;
        max-height: 10rem;
        overflow-y: auto;
        background: white;
        border: 1px solid #ccc;
        list-style: none;
        padding: 0;
        margin: 0;
        z-index: 10;

        li {
          padding: 0.5rem;
          cursor: pointer;

          &:hover {
            background-color: #f0f0f0;
          }
        }
      }
    }
  }
</style>
