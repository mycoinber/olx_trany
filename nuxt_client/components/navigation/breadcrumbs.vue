<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="breadcrumb-item"
        :class="{ active: index === breadcrumbs.length - 1 }"
      >
        <a v-if="index < breadcrumbs.length - 1" :href="crumb.link">{{
          crumb.text
        }}</a>
        <span v-else>{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";

interface Breadcrumb {
  text: string;
  link?: string;
}

const breadcrumbs = ref<Breadcrumb[]>([
  { text: "Home", link: "|" },
  { text: "" },
]);

onMounted(() => {
  const pageTitle = document.title || "Current Page";
  breadcrumbs.value[1].text = pageTitle;
});
</script>

<style scoped lang="scss">
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  list-style: none;
  margin: 2.222rem 0;
}

.breadcrumb-item {
  & + .breadcrumb-item::before {
    content: "|";
    padding: 0 0.1rem;
    color: #8a7d80;
  }

  &.active {
    color: #8a7d80;
    font-weight: 500;
    font-size: 0.778rem;
    line-height: 0.933rem;
  }

  a {
    color: #8a7d80;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.778rem;
    line-height: 0.933rem;
  }
}
</style>
