<template>
  <section class="blog">
    <div class="container">
      <h2 class="blog-title">Blog</h2>
      <div class="blog-wrapper">
        <NewsCard :type="'type1'" :data="BLOG_DATA[0]" />
        <NewsCard :type="'type1'" :data="BLOG_DATA[1]" />
        <NewsCard :type="'type1'" :data="BLOG_DATA[2]" />
      </div>
      <button class="blog-button">See more</button>
    </div>
  </section>
</template>

<script setup lang="ts">
  const BLOG_DATA: Blog[] = [
    {
      title: "Complex 'Respublika' is located in Goloseevsky district",
      _id: "1",
      image:
        "https://focus.ua/static/storage/thumbs/920x465/4/5e/bc0a65ee-45612a2a2f58a1de340f5ba4ffc985e4.jpg?v=2045_1",
      date: "13 days ago",
    },
    {
      title: "Complex Respublika is located in Goloseevsky district",
      _id: "2",
      image:
        "https://s0.rbk.ru/v6_top_pics/media/img/2/32/346939922953322.jpeg",
      date: "2 years ago",
    },
    {
      title: "Respublika is located in Goloseevsky district",
      _id: "3",
      image:
        "https://s0.rbk.ru/v6_top_pics/media/img/6/16/346898632338166.webp",
      date: "2 days ago",
    },
  ];
</script>

<style lang="scss">
  .blog {
    padding: 6.667rem 0;
    background: $white;
    &-title {
      text-align: center;
      margin-bottom: 2.222rem;
      color: #141414;
      line-height: 2.933rem;
      font-weight: 500;
      font-size: 2.444rem;
    }

    .container {
      width: 75.556rem;
      margin: 0 auto;
      max-width: 100%;
    }

    &-wrapper {
      display: flex;
      gap: 0.889rem;
      align-items: center;
      justify-content: center;
      margin-bottom: 2.222rem;
    }

    &-button {
      text-transform: uppercase;
      color: #ffffff;
      font-weight: 500;
      font-size: 0.778rem;
      line-height: 0.933rem;
      border: none;
      outline: none;
      padding: 0.889rem 1.806rem;
      background: #981e32;
      border-radius: 0.278rem;
      cursor: pointer;
      margin: 0 auto;
      display: flex;
      gap: 0.4rem;
      align-items: center;
      margin-bottom: 5.667rem;
      width: 9.61rem;
      height: 2.72rem;

      &::after {
        transition: transform 0.3s ease;
        content: "";
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='11' fill='none'%3E%3Cpath stroke='%23fff' d='m7.5 10.5 5-5m0 0-5-5m5 5H.5'/%3E%3C/svg%3E");
        width: 0.9rem;
        height: 0.6rem;
      }

      &:hover::after {
        transform: translateX(0.2rem);
        -webkit-transform: translateX(0.2rem);
        -moz-transform: translateX(0.2rem);
        -ms-transform: translateX(0.2rem);
        -o-transform: translateX(0.2rem);
      }
    }
  }
</style>
