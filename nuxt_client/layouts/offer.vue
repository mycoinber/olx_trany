<template>
  <div class="wrapper">
    <LayoutHeader />

    <main class="container">
      <h1>Hello {{ auth.getUser?.name }}</h1>
      <div class="content">
        <AccountSidebar class="sidebar" />
        <slot />
      </div>
    </main>

    <Notification />
    <LayoutFooter class="container" />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted } from "vue";

  const auth = useAuthStore();

  onMounted(async () => {
    await auth.initialize();
  });
</script>

<style scoped>
  /* Устанавливаем высоту на всю высоту окна */
  html,
  body,
  .wrapper {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  /* Основная обертка с использованием flexbox */
  .wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Высота экрана */
  }

  /* Контент растягивается, заполняя оставшееся пространство */
  .container {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 75.556rem;
    margin: 0 auto;
    max-width: 100%;

    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }

  /* Футер остается внизу */
  footer {
    margin-top: auto;
  }

  h1 {
    margin-top: 2.222rem;
    margin-bottom: 2.222rem;
    font-size: 2.44rem;
  }
</style>
