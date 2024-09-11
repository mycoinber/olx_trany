<template>
  <div class="filter__gap">
    <span class="filter__name">Category:</span>
    <div
      v-for="(category, index) in categories"
      :key="index"
      class="custom-checkbox"
    >
      <input
        type="radio"
        :value="category"
        v-model="selected"
        :id="`category-${index}`"
        name="category"
      />
      <!-- Добавляем динамический класс для изменения цвета текста при выборе -->
      <label
        :for="`category-${index}`"
        :class="{ 'selected-label': selected === category }"
      >
        {{ category }}
      </label>
    </div>
  </div>
</template>

<script setup>
  import { ref } from "vue";

  const router = useRouter();

  const props = defineProps({
    selected: {
      type: String,
      default: "",
    },
  });

  const categories = ["Rent", "Sale"];
  const selected = ref(props.selected || ""); // Переменная для хранения выбранной категории

  watch(selected, (newValue) => {
    if (newValue === "Rent") {
      router.push({
        params: {
          category: "to-rent",
          slug: router.currentRoute.value.params.slug,
        },
      });
    } else {
      router.push({
        params: {
          category: "for-sale",
          slug: router.currentRoute.value.params.slug,
        },
      });
    }
  });
</script>

<style scoped lang="scss">
  .filter {
    max-width: 15.056rem;
    width: 100%;

    &__name {
      font-weight: 500;
      font-size: 0.7rem;
      line-height: 0.84rem;
      color: #8a7d80;
      display: block;
      margin-bottom: 0.8rem;
    }

    &__gap {
      margin-bottom: 0.8rem;
      label {
        color: #8a7d80;
        font-weight: 500;
        font-size: 0.7rem;
        line-height: 0.84rem;
        text-transform: uppercase;
      }
      .selected-label {
        color: #141414;
      }
    }

    .custom-checkbox {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    input[type="radio"] {
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      width: 1rem;
      height: 1rem;
      background-color: transparent;
      cursor: pointer;
      margin-right: 0.5rem;
    }

    input[type="radio"]::before {
      content: "";
      position: absolute;
      width: 0.5rem; /* Увеличен размер */
      height: 0.5rem; /* Увеличен размер */
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #141414;
      opacity: 0;
      border-radius: 50%;
      transition: opacity 0.2s;
    }

    input[type="radio"]:checked::before {
      opacity: 1;
    }
  }
</style>
