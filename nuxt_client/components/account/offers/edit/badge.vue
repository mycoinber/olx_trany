<script setup>
  import { ref } from "vue";
  import { onClickOutside } from "@vueuse/core";

  const props = defineProps({
    reset: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  });

  const formData = ref({
    badge: props.data.badge || "",
  });

  // Массивы категорий
  const badges = [
    { slug: "price_negotiable", title: "Price Negotiable" },
    { slug: "urgent_sale", title: "Urgent Sale" },
    { slug: "ready_to_move_in", title: "Ready to Move In" },
    { slug: "price_reduced", title: "Price Reduced" },
    { slug: "luxury_property", title: "Luxury Property" },
    { slug: "tenders_open", title: "Tenders Open" },
    { slug: "under_market_value", title: "Under Market Value" },
  ];

  // Объекты для хранения состояний dropdown
  const dropdownStates = ref({
    badge: {
      isOpen: false,
      selected: props.data.badge || "",
    },
  });

  // Функция для переключения состояния dropdown
  const toggleDropdown = (dropdownKey) => {
    dropdownStates.value[dropdownKey].isOpen =
      !dropdownStates.value[dropdownKey].isOpen;
  };

  // Функция для выбора элемента из dropdown
  const selectItem = (dropdownKey, item, event) => {
    event.stopPropagation();
    dropdownStates.value[dropdownKey].selected = item.title;
    dropdownStates.value[dropdownKey].isOpen = false;
    formData.value.badge = item.slug;
  };

  // Закрытие dropdown при клике вне его области
  const dropdownRef = ref(null);
  onClickOutside(dropdownRef, () => {
    dropdownStates.value.badge.isOpen = false;
  });

  const emit = defineEmits(["update:formData"]);

  watch(
    formData,
    () => {
      emit("update:formData", formData.value);
    },
    { deep: true }
  );

  const { reset } = toRefs(props);

  watch(reset, () => {
    formData.value.badge = "";
  });
</script>

<template>
  <div class="wrapper">
    <div class="headline">
      <h2>Add a badge</h2>
      <span>2/8</span>
    </div>

    <div class="group">
      <div class="title">
        <span>Badge</span>
      </div>
      <div class="custom-select" @click="toggleDropdown('badge')">
        <div class="selected" ref="dropdownRef">
          <span>{{ dropdownStates.badge.selected || "Choose" }}</span>
          <div class="icon" :class="{ rotate: dropdownStates.badge.isOpen }">
            <Icon name="oui:arrow-down" />
          </div>
        </div>
        <ul v-if="dropdownStates.badge.isOpen" class="options">
          <li
            v-for="(badge, index) in badges"
            :key="index"
            @click="selectItem('badge', badge, $event)"
          >
            {{ badge.title }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

      .bussines {
        display: flex;
        flex-direction: row;
        gap: 0.889rem;

        div {
          width: 16rem;
        }

        input[type="radio"] {
          display: none;
        }

        /* Label as a button */
        label {
          display: flex;
          border-radius: 0.28rem;
          justify-content: center;
          width: 100%;
          font-size: 0.78rem;
          background-color: #f0f0f0;
          cursor: pointer;
          text-transform: uppercase;
          transition: background-color 0.3s, border-color 0.3s;
          color: #333;
          padding: 0.889rem;
        }

        /* Change appearance when the radio input is checked */
        input[type="radio"]:checked + label {
          background-color: $color-04; /* Green background when selected */
          color: white;
        }

        /* Hover effect */
        label:hover {
          background-color: #e0e0e0;
          border-color: #bbb;
        }

        /* Active (clicked) state */
        label:active {
          background-color: #d0d0d0;
        }
      }

      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 0.875rem;
        color: #8a7d80;
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

      .custom-select {
        position: relative;
        font-size: 0.875rem;
        color: black;
        padding: 1rem;
        border-radius: 0.313rem;
        background-color: #f4f4f4;
        cursor: pointer;

        .selected {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .icon {
            transition: transform 0.3s; /* Анимация поворота */

            /* Поворот на 180 градусов при добавлении класса .rotate */
            &.rotate {
              transform: rotate(180deg);
            }

            svg {
              width: 0.556rem;
              object-fit: contain;
            }
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
  }
</style>
