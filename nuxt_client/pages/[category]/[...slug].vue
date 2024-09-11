<script setup>
  definePageMeta({
    layout: "category",
  });
  const authStore = useAuthStore();

  const route = useRoute();

  const categoryMapping = {
    "to-rent": "Rent",
    "for-sale": "Sale",
  };

  const selectedCategory = ref(categoryMapping[route.params.category] || "");
</script>

<template>
  <div>
    <div class="container">
      <NavigationBreadcrumbs />
      <div class="rents__text">
        <h1 class="rents__title">For {{ selectedCategory }}</h1>
        <span class="rents__desc"
          >Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. 
        </span>
      </div>
    </div>

    <div class="wrapper">
      <div>
        <Filter />
      </div>
    </div>
  </div>
  <MainAbout />
</template>

<style scoped lang="scss">
  .wrapper {
    width: 100%;
    background: $color-01;
    padding: 2.222rem 0;
  }

  .container {
    width: 75.556rem;
    margin: 0 auto;
    max-width: 100%;
  }
  .rents {
    &__text {
      max-width: 18rem;
      width: 100%;
      margin-bottom: 2.222rem;
    }
    &__title {
      color: #141414;
      font-weight: 500;
      font-size: 2.444rem;
      line-height: 2.933rem;
      margin-bottom: 0.889rem;
    }
    &__desc {
      color: #8a7d80;
      font-size: 0.778rem;
    }
  }
</style>
