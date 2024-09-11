<template>
  <div class="item__location">
    <div class="item__location-image">
      <img :src="imageSrc" alt="location-image" />
    </div>
    <div class="item__location-text">
      <h1 class="item__location-title">{{ title }}</h1>
      <h2 class="item__location-subtitle">{{ subtitle }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { defineProps } from "vue";

  const props = defineProps<{
    imageSrc: string;
    title: string;
    subtitle: string;
  }>();
</script>

<style scoped lang="scss">
  .item__location {
    display: flex;
    gap: 0.889rem;
    border-radius: 18.333rem;
    background: $white;
    align-items: center;
    padding: 0.222rem;

    &-image {
      width: 9.833rem;
      height: 6.833rem;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    &-text {
      max-width: 9.444rem;
      width: 100%;
    }

    &-title {
      font-size: 1.333rem;
      font-weight: 500;
      line-height: 1.6rem;
      color: #141414;
    }

    &-subtitle {
      font-size: 0.778rem;
      color: #8a7d80;
      line-height: 0.933rem;
      font-weight: 500;
    }
  }
</style>
