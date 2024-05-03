<script lang="ts" setup>
  import { defineProps } from "vue";

  // Определите пропс 'type'
  const props = defineProps({
    type: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <!-- Используйте пропс 'type' для динамического применения класса CSS -->
  <div :class="['card', `card--${props.type}`]">
    <!-- Содержимое карточки -->
  </div>
</template>

<style scoped>
  .card {
    /* Общие стили для всех карточек */
  }

  .card--type1 {
    /* Стили для карточек типа 1 */
  }

  .card--type2 {
    /* Стили для карточек типа 2 */
  }

  .card--type3 {
    /* Стили для карточек типа 3 */
  }
</style>
