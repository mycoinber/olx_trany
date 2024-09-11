<script setup>
  import { ref } from "vue";
  import { onClickOutside } from "@vueuse/core";
  import { details } from "./data"; // Импорт данных

  // Объекты для хранения состояний выбранных элементов
  const selectedItems = ref([]);

  // Инициализация данных и состояний для каждой категории
  const emit = defineEmits(["update:formData"]);

  watch(selectedItems, () => {
    const result = selectedItems.value.map((item) => {
      return item;
    });
    emit("update:formData", { features: result });
  });

  const props = defineProps({
    reset: {
      type: Boolean,
      default: false,
    },
  });

  const { reset } = toRefs(props);

  watch(reset, () => {
    selectedItems.value = [];
  });
</script>

<template>
  <div class="wrapper">
    <div class="headline">
      <h2>Features</h2>
      <span>7/8</span>
    </div>

    <div class="apiliance">
      <!-- Динамическое создание групп чекбоксов -->
      <div
        v-for="(category, categoryIndex) in details"
        :key="categoryIndex"
        class="group checkboxes"
      >
        <div class="title">
          <span>{{ category.title }}</span>
        </div>
        <div class="checkbox-list">
          <!-- Динамическое создание чекбоксов для каждой категории -->
          <label
            v-for="(item, itemIndex) in category.features"
            :key="itemIndex"
            class="checkbox-item"
          >
            <input type="checkbox" :value="item.slug" v-model="selectedItems" />
            <span class="custom-checkbox"></span>
            <span class="label-text">{{ item.title }}</span>
          </label>
        </div>
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

    .apiliance {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      justify-content: space-between;
      gap: 2rem;
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
    .checkboxes {
      width: fit-content;

      .checkbox-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .checkbox-item {
          display: flex;
          align-items: center;
          cursor: pointer;

          input[type="checkbox"] {
            display: none;
          }

          .custom-checkbox {
            width: 1rem;
            height: 1rem;
            border: 1px solid #000;
            display: inline-block;
            margin-right: 0.5rem;
            position: relative;
            border-radius: 0.3rem;
          }

          input[type="checkbox"]:checked + .custom-checkbox {
            background-color: #000;
          }

          input[type="checkbox"]:checked + .custom-checkbox::after {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0.5rem;
            height: 0.5rem;
            background-color: #fff;
            transform: translate(-50%, -50%);
            border-radius: 0.1rem;
          }

          .label-text {
            font-size: 0.875rem;
            color: $color-02;
            text-transform: uppercase;
            opacity: 0.2;
            transition: opacity 0.3s;
          }

          input[type="checkbox"]:checked + .custom-checkbox + .label-text {
            opacity: 1;
          }
        }
      }
    }
  }
</style>
