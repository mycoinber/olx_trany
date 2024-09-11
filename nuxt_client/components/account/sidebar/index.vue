<script setup>
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { MENU_DATA } from "./data";

  const route = useRoute();

  const isActive = (url) => route.path === url;
</script>

<template>
  <div class="wrapper">
    <div class="menu">
      <div
        v-for="item in MENU_DATA"
        :key="item.url"
        :class="[
          'menu__item',
          isActive(item.url) ? 'menu__item--active' : 'menu__item--disabled',
        ]"
      >
        <a :href="item.url" class="menu__link">{{ item.name }}</a>
      </div>

      <!-- Лог-аут рендерится отдельно -->
      <div class="menu__item">
        <a href="#" class="menu__link">Log Out</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .menu__item {
    &--active .menu__link {
      color: $color-02;
      font-weight: bold;
    }

    &--disabled .menu__link {
      color: $color-05; /* светло-серый цвет */
    }
  }

  .menu__link {
    text-decoration: none;
    color: inherit;
    font-size: 0.78rem;
    text-transform: uppercase;
  }
</style>
