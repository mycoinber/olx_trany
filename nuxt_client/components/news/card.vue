//card-blog.vue
<template>
  <a :class="['card-blog', `card-blog__${type}`]" href="#">
    <div class="card-blog__image">
      <img :src="data.image" alt="CardBlog Image" />
    </div>
    <div class="card-blog__details">
      <h2 class="card-blog__title">{{ data.title }}</h2>
      <span class="card-blog__data">{{ data.date }}</span>
    </div>
  </a>
</template>

<script setup lang="ts">
  interface Blog {
    title: string;
    _id: string;
    image: string;
    date: string;
  }

  const props = defineProps<{
    type: string;
    data: Blog;
  }>();

  const { type, data } = props;
</script>

<style lang="scss">
  .card-blog {
    width: 24.61rem;
    height: 25.78rem;

    &__image {
      height: 19.389rem;
      margin-bottom: 0.889rem;

      img {
        height: 100%;
        object-fit: cover;
        border-radius: 0.4rem;
      }
    }

    &__title {
      font-weight: 500;
      font-size: 1.333rem;
      line-height: 1.6rem;
      margin-bottom: 1.333rem;
    }
    &__data {
      font-weight: 500;
      color: #8a7d80;
      line-height: 0.933rem;
      font-size: 0.778rem;
    }
  }
</style>
