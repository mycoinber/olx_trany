<script lang="ts" setup>
  import { onMounted } from "vue";
  const authStore = useAuthStore();
  const router = useRouter();

  onMounted(async () => {
    await authStore.initialize();
    if (!authStore.getIsAuthenticated) {
      router.push("/login"); // Перенаправление на страницу входа
    }
    if (authStore.getIsAuthenticated && authStore.getUser?.role !== "admin") {
      router.push("/"); // Перенаправление на страницу входа
      alert("Доступ разрешен только для администраторов");
    }

    console.log(authStore.getIsAuthenticated);
    console.log(authStore.getUser);
  });
</script>

<template>
  <section class="grid">
    <AdminSidebar />
    <slot />
  </section>
</template>

<style scoped>
  .grid {
    display: grid;
    grid-template-columns: 1fr 6fr;
  }
</style>
