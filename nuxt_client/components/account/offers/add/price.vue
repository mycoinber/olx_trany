<script setup>
  import { ref } from "vue";
  import { onClickOutside } from "@vueuse/core";

  const props = defineProps({
    errors: {
      type: Object,
      default: () => ({}),
    },
    reset: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "Sale",
    },
  });

  const currency = ["PGK", "USD", "AUD"];
  const selectedCurrency = ref("PGK");
  const isOpen = ref(false);
  const category = ref(props.category);

  const formData = ref({
    currency: "PGK",
    salePrice: "",
    pricePm: "",
    rentPrice: "",
    rentPm: "",
  });

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const selectCategory = (category, event) => {
    event.stopPropagation(); // Предотвращает дальнейшее распространение события
    selectedCurrency.value = category;
    isOpen.value = false;
    formData.value.currency = category;
  };

  const dropdownRef = ref(null);
  onClickOutside(dropdownRef, () => {
    isOpen.value = false;
  });

  const emit = defineEmits(["update:formData"]);

  watch(
    formData,
    () => {
      emit("update:formData", formData.value);
    },
    { deep: true }
  );

  const priceRef = ref(null);

  watch(
    () => props.errors,
    (newErrors) => {
      if (
        Object.keys(newErrors).length > 0 &&
        Object.keys(newErrors).findIndex(
          (key) => key === "salePrice" || key === "pricePm"
        ) === 0
      ) {
        nextTick(() => {
          priceRef.value?.scrollIntoView({ behavior: "smooth" });
        });
      }
    },
    { immediate: true, deep: true }
  );

  watch(
    () => props.category,
    (newCat) => {
      category.value = newCat;
    },
    { immediate: true, deep: true }
  );

  const { reset } = toRefs(props);

  watch(reset, () => {
    formData.value.salePrice = "";
    formData.value.pricePm = "";
  });
</script>

<template>
  <div class="wrapper" ref="priceRef">
    <div class="headline">
      <h2>Price*</h2>
      <span>4/8</span>
    </div>
    <div v-if="category !== 'Rent'" class="row">
      <div class="col">
        <div class="title">
          <div class="icon">
            <Icon name="carbon:requirement-usage" />
            <span v-if="props.errors.salePrice" class="error-message">
              {{ props.errors.salePrice }}
            </span>
            <span v-else>Sale price:</span>
          </div>
        </div>

        <div class="group group__price">
          <input
            type="number"
            id="nameInput"
            placeholder="price"
            v-model="formData.salePrice"
          />
        </div>
      </div>
      <div class="col">
        <div class="title">
          <div class="icon">
            <Icon name="carbon:requirement-usage" />
            <span v-if="props.errors.pricePm" class="error-message">
              {{ props.errors.pricePm }}
            </span>
            <span v-else>Price per м²:</span>
          </div>
        </div>

        <div class="group group__price">
          <input
            type="number"
            id="nameInput"
            placeholder="price"
            v-model="formData.pricePm"
          />
        </div>
      </div>
      <div class="group group__currency" ref="dropdownRef">
        <div class="custom-select" @click="toggleDropdown">
          <div class="selected">
            <span>{{ selectedCurrency || "Choose category" }}</span>
            <div class="icon" :class="{ rotate: isOpen }">
              <Icon name="oui:arrow-down" />
            </div>
          </div>
          <ul v-if="isOpen" class="options">
            <li
              v-for="category in currency"
              :key="category"
              @click="selectCategory(category, $event)"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="category !== 'Sale'" class="row">
      <div class="col">
        <div class="title">
          <div class="icon">
            <Icon name="carbon:requirement-usage" />
            <span v-if="props.errors.salePrice" class="error-message">
              {{ props.errors.salePrice }}
            </span>
            <span v-else>Rent price:</span>
          </div>
        </div>

        <div class="group group__price">
          <input
            type="number"
            id="nameInput"
            placeholder="price"
            v-model="formData.rentPrice"
          />
        </div>
      </div>
      <div class="col">
        <div class="title">
          <div class="icon">
            <Icon name="carbon:requirement-usage" />
            <span v-if="props.errors.pricePm" class="error-message">
              {{ props.errors.pricePm }}
            </span>
            <span v-else>Rent price per м²:</span>
          </div>
        </div>

        <div class="group group__price">
          <input
            type="number"
            id="nameInput"
            placeholder="price"
            v-model="formData.rentPm"
          />
        </div>
      </div>
      <div class="group group__currency" ref="dropdownRef">
        <div class="custom-select" @click="toggleDropdown">
          <div class="selected">
            <span>{{ selectedCurrency || "Choose category" }}</span>
            <div class="icon" :class="{ rotate: isOpen }">
              <Icon name="oui:arrow-down" />
            </div>
          </div>
          <ul v-if="isOpen" class="options">
            <li
              v-for="category in currency"
              :key="category"
              @click="selectCategory(category, $event)"
            >
              {{ category }}
            </li>
          </ul>
        </div>
      </div>
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

    .row {
      display: flex;
      flex-direction: row;
      gap: 0.444rem;
      height: 2.72rem;
      align-items: flex-end;
    }

    .col {
      display: flex;
      flex-direction: column;
      gap: 0.444rem;
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      font-size: 0.78rem;

      &__price {
        width: 20.526rem;

        input {
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
      }

      &__currency {
        width: 5.89rem;

        .custom-select {
          position: relative;

          color: black;
          padding: 0.889rem;
          border-radius: 0.313rem;
          background-color: #f4f4f4;
          cursor: pointer;

          span {
            font-size: 0.78rem;
            line-height: 1rem;
          }

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
