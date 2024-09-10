<template>
  <section class="locations">
    <div class="container">
      <h2 class="locations__title">Top Locations</h2>
      <div class="locations__list">
        <Item
          v-for="(item, index) in items"
          :key="index"
          :imageSrc="item.imageSrc"
          :title="item.title"
          :subtitle="item.subtitle"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import Item from "./item.vue";

  interface Item {
    imageSrc: string;
    title: string;
    subtitle: string;
  }

  const items = ref<Item[]>([
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
    {
      imageSrc:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      title: "Barcelona",
      subtitle: "1536 ads",
    },
  ]);
</script>

<style scoped lang="scss">
  .locations {
    background: #f4f4f4;
    padding: 6.667rem 0;
    overflow: hidden;
    margin-left: 2.222rem;
    max-width: 100%;

    &__list {
      display: flex;
      gap: 0.889rem;
      overflow-x: scroll;
      width: 100%;
    }
    &__title {
      color: #141414;
      font-size: 2.444rem;
      line-height: 2.933rem;
      text-align: center;
      margin-bottom: 2.389rem;
      font-weight: 500;
    }
  }
</style>
